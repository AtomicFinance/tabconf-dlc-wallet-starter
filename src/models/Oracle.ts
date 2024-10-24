import Client from "@atomicfinance/client";
import {
  DigitDecompositionEventDescriptorV0,
  MessageType,
  OracleAnnouncementV0,
  OracleAttestationV0,
  OracleEventV0,
} from "@node-dlc/messaging";
import { BitcoinNetwork } from "bitcoin-networks";
import { Cfdjs } from '../types/cfdJs'

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

  // /**
  //  * Returns the private key for the given nonce index
  //  *
  //  * @param index The index of the nonce to get the private key for
  //  * @returns
  //  */
  // private async getPrivkeyForIndex(index: number) {
  //   const derivationPath = `${R_VAL_PURPOSE}'/${this.network.coinType}'/0'/0/${index}`;
  //   const keyPair = await this.client.getMethod("keyPair")(derivationPath);

  //   return keyPair.privateKey;
  // }

  // /**
  //  * Calculates the nonce tweak for the given eventId and private key
  //  *
  //  * @param eventId The eventId of the event to nonce tweak for
  //  * @param privateKey
  //  * @returns
  //  */
  // private calcNonceTweak(eventId: string, privateKey: Buffer): Buffer {
  //   const nonceTweak = CfdUtils.GetSchnorrPubkeyFromPrivkey(privateKey);
  //   const bytes = Buffer.concat([nonceTweak, Buffer.from(eventId)]);

  //   return getTaggedHash("DLC/oracle/nonce/v0", bytes);
  // }

  // /**
  //  * Returns the kValue for the given eventId and index by deriving the private key from the index and tweaking the nonce
  //  *
  //  * @param eventId The eventId of the event to create the attestation for
  //  * @param index
  //  * @returns private key for the nonce
  //  */
  // public async getKValue(eventId: string, index: number) {
  //   const privateKey = await this.getPrivkeyForIndex(index);
  //   const nonceTweak = this.calcNonceTweak(eventId, privateKey);

  //   return CfdUtils.TweakAddPrivkey(this.privateKey, nonceTweak);
  // }

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

  // public async createAttestation(oracleEvent: OracleEventV0, outcome: number) {
  //   oracleEvent.validate();

  //   if (
  //     oracleEvent.eventDescriptor.type !==
  //     MessageType.DigitDecompositionEventDescriptorV0
  //   )
  //     throw Error(
  //       "Only DigitDecompositionEventDescriptorV0 currently supported"
  //     );

  //   const eventDescriptor =
  //     oracleEvent.eventDescriptor as DigitDecompositionEventDescriptorV0;
  //   const eventId = oracleEvent.eventId;

  //   const nbDigits = eventDescriptor.nbDigits;
  //   const base = eventDescriptor.base;

  //   const outcomes = outcome.toString(base).padStart(nbDigits, "0").split("");

  //   if (nbDigits !== outcomes.length) {
  //     throw Error(
  //       `Outcome ${outcome} does not match event descriptor ${nbDigits} digits`
  //     );
  //   }

  //   if (eventDescriptor.isSigned) {
  //     throw Error("Signed events not yet supported");
  //   }

  //   const noncesNeeded =
  //     eventDescriptor.nbDigits + (eventDescriptor.isSigned ? 1 : 0);
  //   const rValues = oracleEvent.oracleNonces;

  //   const sigs = [];
  //   for (let i = 0; i < noncesNeeded; i++) {
  //     const kValue = await this.getKValue(eventId, i);
  //     const rederivedRValue = CfdUtils.GetSchnorrPubkeyFromPrivkey(kValue);

  //     if (rValues[i].compare(rederivedRValue) !== 0) {
  //       throw Error(
  //         `Oracle nonce ${i} does not match rederived value ${rederivedRValue}`
  //       );
  //     }

  //     sigs.push(this.signOracleOutcome(kValue, outcomes[i]));
  //   }

  //   const attestation = new OracleAttestationV0();
  //   attestation.oraclePubkey = this.publicKey;
  //   attestation.eventId = oracleEvent.eventId;
  //   attestation.signatures = sigs;
  //   attestation.outcomes = outcomes;

  //   return attestation;
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
