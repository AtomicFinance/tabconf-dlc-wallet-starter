import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Heading, VStack, Button, Text, Textarea } from "@chakra-ui/react";
import {
  EnumEventDescriptorV0,
  OracleAnnouncementV0,
  OracleInfoV0,
  ContractDescriptorV0,
  ContractInfoV0,
  DlcOfferV0,
  DlcAcceptV0,
} from "@node-dlc/messaging";
import { bitcoin, Input } from "@atomicfinance/types";
import BN from "bignumber.js";
import { useMnemonic } from "../context/MnemonicContext";
import FinanceClient from "@atomicfinance/client";
import { sha256 } from "@node-lightning/crypto";

interface ClientPageProps {
  client: FinanceClient | null;
}

function ClientPage({ client }: ClientPageProps) {
  const { clientName } = useParams<{ clientName: string }>();
  const { mnemonics } = useMnemonic();
  const [balance, setBalance] = useState<string | null>(null);
  const [oracleAnnouncementHex, setOracleAnnouncementHex] = useState<string>("");
  const [address, setAddress] = useState<string | null>(null);
  const [outcomePayouts, setOutcomePayouts] = useState<{ [key: string]: bigint }>({});
  const [partyBetAmount, setPartyBetAmount] = useState<{ local: bigint; remote: bigint }>({
    local: BigInt(0),
    remote: BigInt(0),
  });
  const [dlcOfferHex, setDlcOfferHex] = useState<string>("");
  const [dlcOfferJson, setDlcOfferJson] = useState<string>("");
  const [dlcAcceptHex, setDlcAcceptHex] = useState<string>("");
  const [dlcSignHex, setDlcSignHex] = useState<string>("");
  const [dlcSignJson, setDlcSignJson] = useState<string>("");
  const [dlcTxsHex, setDlcTxsHex] = useState<string>("");
  const [dlcTxsJson, setDlcTxsJson] = useState<string>("");

  useEffect(() => {
    if (!mnemonics) {
      console.log("No mnemonics available. Please log in or sign up.");
    }
  }, [mnemonics]);

  const handleGetAddress = async () => {
    if (client) {
      const addresses = await client.wallet.getAddresses(0, 1);
      setAddress(addresses[0].address);
      console.log(`Address for ${clientName}:`, addresses[0]);
    }
  };

  const handleGetBalance = async () => {
    if (client) {
      const addresses = await client.wallet.getUsedAddresses();
      const balance = await client.chain.getBalance(addresses);
      setBalance(balance.toString());
      console.log(`Balance for ${clientName}:`, balance.toNumber());
    }
  };

  const handleCreateDlcOffer = async () => {
    if (client) {
      const usedAddresses = await client.wallet.getUsedAddresses();
      const utxos = await client.getMethod("getUnspentTransactions")(usedAddresses);

      const inputs: Input[] = utxos.map((utxo: bitcoin.UTXO) => ({
        txid: utxo.txid,
        vout: utxo.vout,
        address: utxo.address,
        amount: new BN(utxo.value).dividedBy(1e8).toNumber(), // in BTC
        value: utxo.value, // in Sats
        maxWitnessLength: 108,
        redeemScript: "",
        toUtxo: Input.prototype.toUtxo,
      }));

      const oracleAnnouncement = OracleAnnouncementV0.deserialize(Buffer.from(oracleAnnouncementHex, "hex"));

      const oracleInfo = new OracleInfoV0();
      oracleInfo.announcement = oracleAnnouncement;

      const contractDescriptor = new ContractDescriptorV0();
      contractDescriptor.outcomes = Object.entries(outcomePayouts).map(([outcome, payout]) => ({
        outcome: sha256(Buffer.from(outcome, "utf8")),
        localPayout: payout,
      }));

      const totalCollateral = partyBetAmount.local + partyBetAmount.remote;
      const contractInfo = new ContractInfoV0();
      contractInfo.totalCollateral = totalCollateral;
      contractInfo.contractDescriptor = contractDescriptor;
      contractInfo.oracleInfo = oracleInfo;

      const feeRatePerVb = BigInt(10);
      const cetLocktime = 1617170572;
      const refundLocktime = 1617170573;

      console.log("inputs", inputs);

      const dlcOffer = await client.dlc.createDlcOffer(
        contractInfo,
        partyBetAmount.local,
        feeRatePerVb,
        cetLocktime,
        refundLocktime,
        inputs
      );

      // const dlcOfferV0 = DlcOfferV0.deserialize(dlcOffer.serialize());
      // console.log("working");
      console.log("dlcOffer.serialize()", dlcOffer.serialize().toString("hex"));

      setDlcOfferHex(dlcOffer.serialize().toString("hex"));
      setDlcOfferJson(JSON.stringify(dlcOffer.toJSON(), null, 2));
      console.log("DLC Offer Created:", dlcOffer);
    }
  };

  const handleOracleAnnouncementChange = (hex: string) => {
    setOracleAnnouncementHex(hex);
    const outcomes = parseOutcomesFromAnnouncement(hex);
    const initialPayouts = Object.keys(outcomes).reduce((acc, outcome) => {
      acc[outcome] = BigInt(0);
      return acc;
    }, {} as { [key: string]: bigint });
    setOutcomePayouts(initialPayouts);
    setPartyBetAmount({ local: BigInt(0), remote: BigInt(0) });
  };

  const parseOutcomesFromAnnouncement = (hex: string): { [key: string]: bigint } => {
    const oracleAnnouncement = OracleAnnouncementV0.deserialize(Buffer.from(hex, "hex"));
    const outcomes = (oracleAnnouncement.oracleEvent.eventDescriptor as EnumEventDescriptorV0).outcomes;

    const outcomePayouts = outcomes.reduce((acc, outcome) => {
      acc[outcome.toString()] = BigInt(0);
      return acc;
    }, {} as { [key: string]: bigint });

    return outcomePayouts;
  };

  const handlePayoutChange = (outcome: string, value: string) => {
    setOutcomePayouts((prevPayouts) => ({
      ...prevPayouts,
      [outcome]: BigInt(value),
    }));
  };

  const handleSignDlcAccept = async () => {
    if (client && dlcAcceptHex) {
      try {
        const dlcOffer = DlcOfferV0.deserialize(Buffer.from(dlcOfferHex, "hex"));
        const dlcAccept = DlcAcceptV0.deserialize(Buffer.from(dlcAcceptHex, "hex"));

        const dlcSignResponse = await client.dlc.signDlcAccept(dlcOffer, dlcAccept);

        setDlcSignHex(dlcSignResponse.dlcSign.serialize().toString("hex"));
        setDlcSignJson(JSON.stringify(dlcSignResponse.dlcSign.toJSON(), null, 2));
        setDlcTxsHex(dlcSignResponse.dlcTransactions.serialize().toString("hex"));
        setDlcTxsJson(JSON.stringify(dlcSignResponse.dlcTransactions.toJSON(), null, 2));

        console.log("DLC Sign:", dlcSignResponse);
      } catch (error) {
        console.error("Failed to sign DLC Accept:", error);
      }
    }
  };

  return (
    <Box>
      {mnemonics ? (
        <Container maxW="container.xl" py={8}>
          <VStack>
            <Heading size="xl">Alice</Heading>
            <Button onClick={handleGetAddress} disabled={!client}>
              Get Address
            </Button>
            {address && <Text>Address: {address}</Text>}
            <Button onClick={handleGetBalance} disabled={!client}>
              Get Balance
            </Button>
            {balance && <Text>Balance: {balance}</Text>}
            <Textarea
              placeholder="Enter Oracle Announcement"
              value={oracleAnnouncementHex}
              onChange={(e) => handleOracleAnnouncementChange(e.target.value)}
            />
            {Object.keys(outcomePayouts).map((outcome) => (
              <Textarea
                key={outcome}
                placeholder={`Enter Payout for ${outcome}`}
                onChange={(e) => handlePayoutChange(outcome, e.target.value)}
              />
            ))}
            <Textarea
              placeholder="Enter Local Bet Amount"
              onChange={(e) => setPartyBetAmount({ ...partyBetAmount, local: BigInt(e.target.value) })}
            />
            <Textarea
              placeholder="Enter Remote Bet Amount"
              onChange={(e) => setPartyBetAmount({ ...partyBetAmount, remote: BigInt(e.target.value) })}
            />
            <Button onClick={handleCreateDlcOffer} disabled={!client || !oracleAnnouncementHex}>
              Create DLC Offer
            </Button>
            {dlcOfferHex && (
              <>
                <Text>DLC Offer (Hex):</Text>
                <Textarea value={dlcOfferHex} readOnly={true} />
              </>
            )}
            {dlcOfferJson && (
              <>
                <Text>DLC Offer (JSON):</Text>
                <Textarea value={dlcOfferJson} readOnly={true} />
              </>
            )}
            <Textarea
              placeholder="Enter DLC Accept Hex"
              value={dlcAcceptHex}
              onChange={(e) => setDlcAcceptHex(e.target.value)}
            />
            <Button onClick={handleSignDlcAccept} disabled={!client || !dlcAcceptHex}>
              Sign DLC Accept
            </Button>
            {dlcSignHex && (
              <>
                <Text>DLC Sign (Hex):</Text>
                <Textarea value={dlcSignHex} readOnly={true} />
              </>
            )}
            {dlcSignJson && (
              <>
                <Text>DLC Sign (JSON):</Text>
                <Textarea value={dlcSignJson} readOnly={true} />
              </>
            )}
            {dlcTxsHex && (
              <>
                <Text>DLC Transactions (Hex):</Text>
                <Textarea value={dlcTxsHex} readOnly={true} />
              </>
            )}
            {dlcTxsJson && (
              <>
                <Text>DLC Transactions (JSON):</Text>
                <Textarea value={dlcTxsJson} readOnly={true} />
              </>
            )}
          </VStack>
        </Container>
      ) : (
        <Text>Generate Oracle, Alice and Bob mnemonics to get started</Text>
      )}
    </Box>
  );
}

export default ClientPage;
