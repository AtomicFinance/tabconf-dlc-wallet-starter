import Client from "@atomicfinance/client";
import {
  EnumEventDescriptorV0,
  DigitDecompositionEventDescriptorV0,
  MessageType,
  OracleAnnouncementV0,
  OracleAttestationV0,
  OracleEventV0,
} from "@node-dlc/messaging";
import { sha256 } from "@node-lightning/crypto";
import { BitcoinNetwork } from "bitcoin-networks";
import { randomBytes } from "crypto";
import { Cfdjs, SchnorrSignRequest } from '../types/cfdJs'

// https://github.com/bitcoin-s/bitcoin-s/blob/441937238f058004f4934bf5ef4239745b53ed04/dlc-oracle/src/main/scala/org/bitcoins/dlc/oracle/DLCOracle.scala#L522-L523
const R_VAL_PURPOSE = 585;

export default class Oracle {
  client: Client;
  network: BitcoinNetwork;
  cfdJs: Cfdjs;

  publicKey?: Buffer;
  privateKey?: Buffer;

  constructor(network: BitcoinNetwork, client: Client, cfdJs: Cfdjs) {
    this.client = client;
    this.network = network;
    this.cfdJs = cfdJs;
  }

  public static async BuildOracle(
    network: BitcoinNetwork,
    client: Client,
    cfdJs: Cfdjs,
    significantDigits: number = 1,
  ) {
    const oracle = new Oracle(network, client, cfdJs);

    const derivationPath = `${MessageType.DlcOfferV0}'/${network.coinType}'/0'/0/0`;
    const keyPair = await client.getMethod("keyPair")(derivationPath);

    oracle.privateKey = Buffer.from(keyPair.privateKey);
    oracle.publicKey = Buffer.from(
      (await cfdJs.GetSchnorrPubkeyFromPrivkey({ privkey: Buffer.from(keyPair.privateKey).toString('hex') })).pubkey,
      "hex"
    );

    return oracle;
  }

  public async createEnumOracleAnnouncement(
    eventId: string,
    eventMaturityEpoch: number,
    eventDescriptor: EnumEventDescriptorV0
  ) {
    const event = new OracleEventV0();

    const rValues = [];

    for (let i = 0; i < eventDescriptor.outcomes.length; i++) {
      const kValue = await this.getKValue(eventId, i);
      rValues.push(((await this.cfdJs.GetSchnorrPubkeyFromPrivkey(kValue)).pubkey));
    }

    event.oracleNonces = rValues.map((rValue) => Buffer.from(rValue, "hex"));
    event.eventMaturityEpoch = eventMaturityEpoch;
    event.eventDescriptor = eventDescriptor;
    event.eventId = eventId;

    if (!this.publicKey) throw Error("Public key is undefined");

    const announcement = new OracleAnnouncementV0();
    announcement.announcementSig = (await this.signOracleEvent(event));
    announcement.oraclePubkey = this.publicKey;
    announcement.oracleEvent = event;

    return announcement;
  }

  public async createNewOracleEventAnnouncement(
    eventId: string,
    eventMaturityEpoch: number,
    eventDescriptor: DigitDecompositionEventDescriptorV0
  ) {
    eventDescriptor.validate();

    const event = new OracleEventV0();
    const noncesNeeded =
      eventDescriptor.nbDigits + (eventDescriptor.isSigned ? 1 : 0);

    const rValues = [];

    for (let i = 0; i < noncesNeeded; i++) {
      const kValue = await this.getKValue(eventId, i);
      rValues.push(((await this.cfdJs.GetSchnorrPubkeyFromPrivkey(kValue)).pubkey));
    }

    event.oracleNonces = rValues.map((rValue) => Buffer.from(rValue, "hex"));
    event.eventMaturityEpoch = eventMaturityEpoch;
    event.eventDescriptor = eventDescriptor;
    event.eventId = eventId;

    if (!this.publicKey) throw Error("Public key is undefined");

    const announcement = new OracleAnnouncementV0();
    announcement.announcementSig = (await this.signOracleEvent(event));
    announcement.oraclePubkey = this.publicKey;
    announcement.oracleEvent = event;

    return announcement;
  }

  public async schnorrSign(privkey: Buffer, message: Buffer): Promise<Buffer> {
    const req: SchnorrSignRequest = {
      privkey: privkey.toString("hex"),
      nonceOrAux: randomBytes(32).toString("hex"),
      message: message.toString("hex"),
      isHashed: true,
    };
  
    return Buffer.from((await this.cfdJs.SchnorrSign(req)).hex, "hex");
  }

  public async SchnorrSignWithNonce(
    privkey: Buffer,
    message: Buffer,
    nonce: Buffer
  ): Promise<Buffer> {
    const req: SchnorrSignRequest = {
      privkey: privkey.toString("hex"),
      nonceOrAux: nonce.toString("hex"),
      message: message.toString("hex"),
      isHashed: true,
      isNonce: true,
    };
  
    return Buffer.from((await this.cfdJs.SchnorrSign(req)).hex, "hex");
  }

  public signOracleEvent(oracleEvent: OracleEventV0) {
    if (!this.privateKey) throw Error('Private Key is undefined');

    return this.schnorrSign(this.privateKey, getTaggedHash(
      "DLC/oracle/announcement/v0",
      oracleEvent.serialize()
    ))
  }

  /**
   * Returns the kValue for the given eventId and index by deriving the private key from the index and tweaking the nonce
   *
   * @param eventId The eventId of the event to create the attestation for
   * @param index
   * @returns private key for the nonce
   */
  public async getKValue(eventId: string, index: number) {
    const privateKey = await this.getPrivkeyForIndex(index);
    const nonceTweak = await this.calcNonceTweak(eventId, privateKey);

    if (!this.privateKey) {
      throw new Error("Private key is undefined");
    }

    return this.cfdJs.TweakAddPrivkey({
        privkey: this.privateKey.toString('hex'),
        tweak: nonceTweak.toString('hex'),
      }
    );
  }

  /**
   * Returns the private key for the given nonce index
   *
   * @param index The index of the nonce to get the private key for
   * @returns
   */
  private async getPrivkeyForIndex(index: number) {
    const derivationPath = `${R_VAL_PURPOSE}'/${this.network.coinType}'/0'/0/${index}`;
    const keyPair = await this.client.getMethod("keyPair")(derivationPath);

    return keyPair.privateKey;
  }

    // // Sign a given message using the private key and the R value.
    // public GetSignature(message: string, significantDigit = 1) {
    //   const signRequest: cfdjs.SchnorrSignRequest = {
    //     privkey: this.privateKey,
    //     message,
    //     nonceOrAux: this.kValues[significantDigit - 1],
    //     isNonce: true,
    //     isHashed: true,
    //   };
  
    //   return cfdjs.SchnorrSign(signRequest).hex;
    // }

    //================================================================================

    // const oracleInfo = oracle.GetOracleInfo();

    // const sigs: Buffer[] = [];
  
    // const m = math
    //   .taggedHash('DLC/oracle/attestation/v0', outcome)
    //   .toString('hex');
    // sigs.push(Buffer.from(oracle.GetSignature(m), 'hex'));
  
    // const oracleAttestation = new OracleAttestationV0();
    // oracleAttestation.eventId = eventId;
    // oracleAttestation.oraclePubkey = Buffer.from(oracleInfo.publicKey, 'hex');
    // oracleAttestation.signatures = sigs;
    // oracleAttestation.outcomes = [outcome];
  
    // return oracleAttestation;

  /**
   * Calculates the nonce tweak for the given eventId and private key
   *
   * @param eventId The eventId of the event to nonce tweak for
   * @param privateKey
   * @returns
   */
  private async calcNonceTweak(eventId: string, privateKey: Buffer): Promise<Buffer> {
    const nonceTweak = Buffer.from((await this.cfdJs.GetSchnorrPubkeyFromPrivkey({ privkey: privateKey.toString('hex') })).pubkey, 'hex');
    const bytes = Buffer.concat([nonceTweak, Buffer.from(eventId)]);

    return getTaggedHash("DLC/oracle/nonce/v0", bytes);
  }

  public async createEnumAttestation(oracleEvent: OracleEventV0, outcome: string) {
    if (!this.publicKey) throw Error("Public key is undefined");

    oracleEvent.validate();

    if (
      oracleEvent.eventDescriptor.type !==
      MessageType.EnumEventDescriptorV0
    )
      throw Error(
        "Only EnumEventDescriptorV0 currently supported"
      );

    const eventId = oracleEvent.eventId;

    const attestation = new OracleAttestationV0();
    attestation.oraclePubkey = this.publicKey;
    attestation.eventId = oracleEvent.eventId;

    const rValue = oracleEvent.oracleNonces[0];
    const kValue = await this.getKValue(eventId, 0);

    const rederivedRValue = Buffer.from((await this.cfdJs.GetSchnorrPubkeyFromPrivkey(kValue)).pubkey, "hex");

    if (rValue.compare(rederivedRValue) !== 0) {
      throw Error(
        `Oracle nonce does not match rederived value ${rederivedRValue}`
      );
    }

    const sigs = [];
    sigs.push(await this.signOracleOutcome(Buffer.from(kValue.privkey, 'hex'), sha256(Buffer.from(outcome, 'utf8')).toString('hex')));

    attestation.signatures = sigs;
    attestation.outcomes = [outcome];

    return attestation;
  }

  public async signOracleOutcome(kValue: Buffer, outcome: string) {
    if (!this.privateKey) throw Error("Private key is undefined");

    return this.SchnorrSignWithNonce(
      this.privateKey,
      this.getOutcomeHash(outcome),
      kValue
    );
  }

  private getOutcomeHash(outcome: string) {
    return getTaggedHash("DLC/oracle/attestation/v0", outcome);
  }

  // public async createNewOracleEventAnnouncement(
  //   eventId: string,
  //   eventMaturityEpoch: number,
  //   eventDescriptor: DigitDecompositionEventDescriptorV0
  // ) {
  //   eventDescriptor.validate();

  //   const event = new OracleEventV0();
  //   const noncesNeeded =
  //     eventDescriptor.nbDigits + (eventDescriptor.isSigned ? 1 : 0);

  //   const rValues = [];

  //   for (let i = 0; i < noncesNeeded; i++) {
  //     const kValue = await this.getKValue(eventId, i);
  //     rValues.push(CfdUtils.GetSchnorrPubkeyFromPrivkey(kValue));
  //   }

  //   event.oracleNonces = rValues.map((rValue) => Buffer.from(rValue, "hex"));
  //   event.eventMaturityEpoch = eventMaturityEpoch;
  //   event.eventDescriptor = eventDescriptor;
  //   event.eventId = eventId;

  //   const announcement = new OracleAnnouncementV0();
  //   announcement.announcementSig = this.signOracleEvent(event);
  //   announcement.oraclePubkey = this.publicKey;
  //   announcement.oracleEvent = event;

  //   return announcement;
  // }

  // public signOracleEvent(oracleEvent: OracleEventV0) {
  //   return CfdUtils.SchnorrSign(
  //     this.privateKey,
  //     getTaggedHash("DLC/oracle/announcement/v0", oracleEvent.serialize())
  //   );
  // }

  // private getOutcomeHash(outcome: string) {
  //   return getTaggedHash("DLC/oracle/attestation/v0", outcome);
  // }

  // public signOracleOutcome(kValue: Buffer, outcome: string) {
  //   return CfdUtils.SchnorrSignWithNonce(
  //     this.privateKey,
  //     this.getOutcomeHash(outcome),
  //     kValue
  //   );
  // }

  // public verifyAttestation(
  //   oracleAnnouncement: OracleAnnouncementV0,
  //   oracleAttestationTLV: OracleAttestationV0
  // ) {
  //   const outcomes = oracleAttestationTLV.outcomes;
  //   const attestations = oracleAttestationTLV.signatures;
  //   const nonces = oracleAnnouncement.oracleEvent.oracleNonces;

  //   if (nonces.length !== attestations.length) return false;
  //   if (
  //     Buffer.compare(
  //       oracleAnnouncement.oraclePubkey,
  //       oracleAttestationTLV.oraclePubkey
  //     ) !== 0
  //   )
  //     return false;

  //   if (
  //     oracleAnnouncement.oracleEvent.eventDescriptor.type !==
  //     MessageType.DigitDecompositionEventDescriptorV0
  //   )
  //     throw Error(
  //       "Only DigitDecompositionEventDescriptorV0 currently supported"
  //     );

  //   const eventDescriptor = oracleAnnouncement.oracleEvent
  //     .eventDescriptor as DigitDecompositionEventDescriptorV0;

  //   if (eventDescriptor.isSigned)
  //     throw Error("Signed events not yet supported");

  //   for (const [index, attestation] of attestations.entries()) {
  //     const outcomeHash = this.getOutcomeHash(outcomes[index]);
  //     if (
  //       !CfdUtils.SchnorrVerify(
  //         oracleAnnouncement.oraclePubkey,
  //         outcomeHash,
  //         attestation
  //       )
  //     ) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }
}

export function getTaggedHash(
  tag: string | Buffer,
  data: string | Buffer
): Buffer {
  const tagHash = sha256(Buffer.from(tag));
  return sha256(Buffer.concat([tagHash, tagHash, Buffer.from(data)]));
}
