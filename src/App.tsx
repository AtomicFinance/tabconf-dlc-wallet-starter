import { useEffect, useState } from "react";
import { Box, Container, Heading, SimpleGrid, VStack, Image, Button } from "@chakra-ui/react";
import "./App.css";
import * as cfd from "cfd-js-wasm";
import * as cfddlc from "cfd-dlc-js-wasm";
import BitcoinCfdProvider from "@atomicfinance/bitcoin-cfd-provider";
import BitcoinDlcProvider from "@atomicfinance/bitcoin-dlc-provider";
import { BitcoinEsploraApiProvider } from "@atomicfinance/bitcoin-esplora-api-provider";
import { BitcoinJsWalletProvider } from "@atomicfinance/bitcoin-js-wallet-provider";
import FinanceClient from "@atomicfinance/client";
import { bitcoin } from "@atomicfinance/types";
import { BitcoinNetworks } from "bitcoin-networks";
import Oracle from "./models/Oracle";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [oracleClient, setOracleClient] = useState<Oracle | null>(null);
  const [aliceClient, setAliceClient] = useState<FinanceClient | null>(null);
  const [bobClient, setBobClient] = useState<FinanceClient | null>(null);

  useEffect(() => {
    async function initializeClients() {
      while (!cfd.hasLoadedWasm()) {
        await sleep(10);
      }

      const network = BitcoinNetworks.bitcoin_testnet;

      // Initialize three separate clients
      const createClient = (mnemonic: string) => {
        const client = new FinanceClient();
        client.addProvider(
          new BitcoinEsploraApiProvider({
            url: "https://testnet-node.atomic.finance/testnet/api",
            network,
          })
        );
        client.addProvider(
          new BitcoinJsWalletProvider({
            network,
            mnemonic,
            baseDerivationPath: `m/84'/${network.coinType}'/0'`,
            addressType: bitcoin.AddressType.BECH32,
          })
        );
        client.addProvider(new BitcoinCfdProvider(cfd.getCfd()));
        client.addProvider(new BitcoinDlcProvider(network, cfddlc.getCfddlc()));
        return client;
      };

      console.log("process.env.REACT_APP_ORACLE_MNEMONIC", process.env.REACT_APP_ORACLE_MNEMONIC);

      const oracleClient = createClient(process.env.REACT_APP_ORACLE_MNEMONIC || "");
      const oracle = await Oracle.BuildOracle(network, oracleClient, cfd.getCfd());

      setOracleClient(oracle);
      setAliceClient(createClient(process.env.REACT_APP_ALICE_MNEMONIC || ""));
      setBobClient(createClient(process.env.REACT_APP_BOB_MNEMONIC || ""));
    }

    initializeClients();
  }, []);

  return (
    <Box>
      {/* Header Section */}
      <Box bg="gray.100" py={8}>
        <Container maxW="container.xl">
          <VStack>
            <Heading size="xl" textAlign="center">
              Build a DLC Wallet to Bet on the Presidential Election
            </Heading>
            <SimpleGrid columns={2} w="full">
              <Image
                src="/trump.jpg" // Add actual image path
                alt="Donald Trump"
                borderRadius="md"
                objectFit="cover"
              />
              <Image
                src="/kamala.jpg" // Add actual image path
                alt="Kamala Harris"
                borderRadius="md"
                objectFit="cover"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Three Sections */}
      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={3}>
          {/* Oracle Section */}
          <Box p={6} borderWidth={1} borderRadius="lg">
            <VStack>
              <Heading size="lg">Oracle</Heading>
              <Button onClick={() => console.log("Oracle action")}>Initialize Oracle</Button>
              {/* Add more oracle-specific buttons/actions */}
            </VStack>
          </Box>

          {/* Alice Section */}
          <Box p={6} borderWidth={1} borderRadius="lg">
            <VStack>
              <Heading size="lg">Alice</Heading>
              <Button onClick={() => console.log("Alice action")}>Get Address</Button>
              {/* Add more Alice-specific buttons/actions */}
            </VStack>
          </Box>

          {/* Bob Section */}
          <Box p={6} borderWidth={1} borderRadius="lg">
            <VStack>
              <Heading size="lg">Bob</Heading>
              <Button onClick={() => console.log("Bob action")}>Get Address</Button>
              {/* Add more Bob-specific buttons/actions */}
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default App;
