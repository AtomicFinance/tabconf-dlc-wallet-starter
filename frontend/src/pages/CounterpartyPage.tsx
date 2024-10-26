import { useParams } from "react-router-dom";
import { Box, Container, Heading, VStack, Button, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { DlcOfferV0, DlcAcceptV0, DlcSignV0, DlcTransactionsV0, OracleAttestationV0 } from "@node-dlc/messaging";
import BN from "bignumber.js";
import FinanceClient from "@atomicfinance/client";
import { useMnemonic } from "@/context/MnemonicContext";
import { bitcoin, Input } from "@atomicfinance/types";

interface CounterpartyPageProps {
  client: FinanceClient | null;
}

function CounterpartyPage({ client }: CounterpartyPageProps) {
  const { clientName } = useParams<{ clientName: string }>();
  const { mnemonics } = useMnemonic();
  const [balance, setBalance] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [dlcOfferHex, setDlcOfferHex] = useState<string>("");
  const [dlcOfferJson, setDlcOfferJson] = useState<string>("");
  const [dlcAcceptHex, setDlcAcceptHex] = useState<string>("");
  const [dlcAcceptJson, setDlcAcceptJson] = useState<string>("");
  const [dlcTxsHex, setDlcTxsHex] = useState<string>("");
  const [dlcTxsJson, setDlcTxsJson] = useState<string>("");
  const [dlcSignHex, setDlcSignHex] = useState<string>("");
  const [fundingTransactionHex, setFundingTransactionHex] = useState<string>("");
  const [oracleAttestationHex, setOracleAttestationHex] = useState<string>("");
  const [cetHex, setCetHex] = useState<string>("");

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
      console.log(`Balance for ${clientName}:`, balance);
    }
  };

  const handleAcceptDlcOffer = async () => {
    if (client && dlcOfferHex) {
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

      const dlcOffer = DlcOfferV0.deserialize(Buffer.from(dlcOfferHex, "hex"));
      // Logic to accept the DLC offer using the provided hex
      console.log("DLC Offer Accepted:", dlcOfferHex);

      const dlcAcceptResponse = await client.dlc.acceptDlcOffer(dlcOffer, inputs);
      console.log("DLC Accept:", dlcAcceptResponse);

      setDlcAcceptHex(dlcAcceptResponse.dlcAccept.serialize().toString("hex"));
      setDlcAcceptJson(JSON.stringify(dlcAcceptResponse.dlcAccept.toJSON(), null, 2));
      setDlcTxsHex(dlcAcceptResponse.dlcTransactions.serialize().toString("hex"));
      setDlcTxsJson(JSON.stringify(dlcAcceptResponse.dlcTransactions.toJSON(), null, 2));
    }
  };

  const handleDlcOfferHexChange = (hex: string) => {
    console.log("hex", hex);
    setDlcOfferHex(hex);
    try {
      const dlcOffer = DlcOfferV0.deserialize(Buffer.from(hex, "hex"));
      setDlcOfferJson(JSON.stringify(dlcOffer.toJSON(), null, 2));
    } catch (error) {
      console.error("Failed to deserialize DLC Offer:", error);
      setDlcOfferJson("");
    }
  };

  const handleFinalizeDlcSign = async () => {
    if (client && dlcOfferHex && dlcAcceptHex && dlcSignHex) {
      try {
        const dlcOffer = DlcOfferV0.deserialize(Buffer.from(dlcOfferHex, "hex"));
        const dlcAccept = DlcAcceptV0.deserialize(Buffer.from(dlcAcceptHex, "hex"));
        const dlcSign = DlcSignV0.deserialize(Buffer.from(dlcSignHex, "hex"));
        const dlcTransactions = DlcTransactionsV0.deserialize(Buffer.from(dlcTxsHex, "hex"));

        const fundingTransaction = await client.dlc.finalizeDlcSign(dlcOffer, dlcAccept, dlcSign, dlcTransactions);

        console.log("Funding Transaction:", fundingTransaction);
        // You can set the funding transaction to state if needed
        setFundingTransactionHex(fundingTransaction.toHex());
      } catch (error) {
        console.error("Failed to finalize DLC Sign:", error);
      }
    }
  };

  const handleExecuteDlc = async () => {
    if (client && dlcOfferHex && dlcAcceptHex && dlcSignHex && oracleAttestationHex) {
      try {
        const dlcOffer = DlcOfferV0.deserialize(Buffer.from(dlcOfferHex, "hex"));
        const dlcAccept = DlcAcceptV0.deserialize(Buffer.from(dlcAcceptHex, "hex"));
        const dlcSign = DlcSignV0.deserialize(Buffer.from(dlcSignHex, "hex"));
        const dlcTransactions = DlcTransactionsV0.deserialize(Buffer.from(dlcTxsHex, "hex"));
        const oracleAttestation = OracleAttestationV0.deserialize(Buffer.from(oracleAttestationHex, "hex"));

        const cet = await client.dlc.execute(dlcOffer, dlcAccept, dlcSign, dlcTransactions, oracleAttestation, false);

        console.log("CET:", cet);
        // Handle the CET as needed

        setCetHex(cet.toHex());
      } catch (error) {
        console.error("Failed to execute DLC:", error);
      }
    }
  };

  return (
    <Box>
      {mnemonics ? (
        <Container maxW="container.xl" py={8}>
          <VStack>
            <Heading size="xl">Bob</Heading>
            <Button onClick={handleGetAddress} disabled={!client}>
              Get Address
            </Button>
            {address && <Text>Address: {address}</Text>}
            <Button onClick={handleGetBalance} disabled={!client}>
              Get Balance
            </Button>
            {balance && <Text>Balance: {balance}</Text>}
            <Textarea
              placeholder="Enter DLC Offer Hex"
              value={dlcOfferHex}
              onChange={(e) => handleDlcOfferHexChange(e.target.value)}
            />
            {dlcOfferJson && (
              <>
                <Text>DLC Offer (JSON):</Text>
                <Textarea value={dlcOfferJson} readOnly={true} />
              </>
            )}
            <Button onClick={handleAcceptDlcOffer} disabled={!client || !dlcOfferHex}>
              Accept DLC Offer
            </Button>
            {dlcAcceptHex && (
              <>
                <Text>DLC Accept (Hex):</Text>
                <Textarea value={dlcAcceptHex} readOnly={true} />
              </>
            )}
            {dlcAcceptJson && (
              <>
                <Text>DLC Accept (JSON):</Text>
                <Textarea value={dlcAcceptJson} readOnly={true} />
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
            <Textarea
              placeholder="Enter DLC Sign Hex"
              value={dlcSignHex}
              onChange={(e) => setDlcSignHex(e.target.value)}
            />
            <Button onClick={handleFinalizeDlcSign} disabled={!client || !dlcOfferHex || !dlcAcceptHex || !dlcSignHex}>
              Finalize DLC Sign
            </Button>
            {fundingTransactionHex && (
              <>
                <Text>Funding Transaction (Hex):</Text>
                <Textarea value={fundingTransactionHex} readOnly={true} />
              </>
            )}
            <Textarea
              placeholder="Enter Oracle Attestation Hex"
              value={oracleAttestationHex}
              onChange={(e) => setOracleAttestationHex(e.target.value)}
            />
            <Button
              onClick={handleExecuteDlc}
              disabled={!client || !dlcOfferHex || !dlcAcceptHex || !dlcSignHex || !oracleAttestationHex}
            >
              Execute DLC
            </Button>
            {cetHex && (
              <>
                <Text>CET (Hex):</Text>
                <Textarea value={cetHex} readOnly={true} />
              </>
            )}
          </VStack>
        </Container>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}

export default CounterpartyPage;
