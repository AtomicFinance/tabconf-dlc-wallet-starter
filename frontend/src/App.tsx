import React, { useEffect, useState } from "react";
import { Box, Container, Heading, SimpleGrid, VStack, Image, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import * as cfd from "cfd-js-wasm";
import * as cfddlc from "cfd-dlc-js-wasm";
import BitcoinCfdProvider from "@atomicfinance/bitcoin-cfd-provider";
import BitcoinDlcProvider from "@atomicfinance/bitcoin-dlc-provider";
import { BitcoinEsploraApiProvider } from "@atomicfinance/bitcoin-esplora-api-provider";
import { BitcoinJsWalletProvider } from "@atomicfinance/bitcoin-js-wallet-provider";
import FinanceClient from "@atomicfinance/client";
import { bitcoin } from "@atomicfinance/types";
import Oracle from "./models/Oracle";
import MnemonicManager from "./components/MnemonicManager";
import ClientPage from "./pages/ClientPage";
import { useMnemonic } from "./context/MnemonicContext";
import OraclePage from "./pages/OraclePage";
import config from "./config";
import ExtendedWalletProvider from "./providers/ExtendedWalletProvider";
import ExtendedDlcProvider from "./providers/ExtendedDlcProvider";
import CounterpartyPage from "./pages/CounterpartyPage";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const { mnemonics } = useMnemonic();
  const [oracleClient, setOracleClient] = useState<Oracle | null>(null);
  const [aliceClient, setAliceClient] = useState<FinanceClient | null>(null);
  const [bobClient, setBobClient] = useState<FinanceClient | null>(null);

  useEffect(() => {
    if (!mnemonics) {
      console.log("Mnemonics not available. Please generate them.");
      return;
    }

    async function initializeClients() {
      while (!cfd.hasLoadedWasm()) {
        await sleep(10);
      }

      await (cfddlc as any).getCfddlc();

      const network = config.network;

      const createClient = async (mnemonic: string) => {
        const client = new FinanceClient();
        client.addProvider(
          new BitcoinEsploraApiProvider({
            url: "http://localhost:7777/signet/api",
            network,
          })
        );

        const bitcoinJsWalletProvider = new BitcoinJsWalletProvider({
          network,
          mnemonic,
          baseDerivationPath: `m/84'/${network.coinType}'/0'`,
          addressType: bitcoin.AddressType.BECH32,
        });

        const extendedWalletProvider = new ExtendedWalletProvider();

        bitcoinJsWalletProvider.getInputsForDualFunding =
          extendedWalletProvider.getInputsForDualFunding.bind(extendedWalletProvider);
        bitcoinJsWalletProvider.getInputsForAmount =
          extendedWalletProvider.getInputsForAmount.bind(extendedWalletProvider);
        bitcoinJsWalletProvider.getUnusedAddress = extendedWalletProvider.getUnusedAddress.bind(extendedWalletProvider);

        client.addProvider(bitcoinJsWalletProvider);
        client.addProvider(extendedWalletProvider);
        client.addProvider(new BitcoinCfdProvider(cfd.getCfd()));

        const dlcProvider = new BitcoinDlcProvider(network, (cfddlc as any).getCfddlc());
        const extendedDlcProvider = new ExtendedDlcProvider();

        dlcProvider.GetInputsForAmount = extendedDlcProvider.GetInputsForAmount.bind(extendedDlcProvider);

        client.addProvider(dlcProvider);
        client.addProvider(extendedDlcProvider);

        return client;
      };

      if (mnemonics) {
        const oracleClient = await createClient(mnemonics.oracle);
        const oracle = await Oracle.BuildOracle(network, oracleClient, cfd.getCfd());

        await oracleClient.getMethod("CfdLoaded")();

        setOracleClient(oracle);
        setAliceClient(await createClient(mnemonics.alice));
        setBobClient(await createClient(mnemonics.bob));
      }
    }

    initializeClients();
  }, [mnemonics]);

  return (
    <Box>
      <MnemonicManager />
      <Box bg="gray.100" py={8}>
        <Container maxW="container.xl">
          <VStack>
            <Heading size="xl" textAlign="center">
              Build a DLC Wallet to Bet on the Presidential Election
            </Heading>
            <Flex justifyContent="center" w="full">
              <SimpleGrid columns={2} spaceX={4}>
                <Image src="/trump.png" alt="Donald Trump" borderRadius="md" objectFit="cover" boxSize={"200px"} />
                <Image src="/kamala.png" alt="Kamala Harris" borderRadius="md" objectFit="cover" boxSize={"200px"} />
              </SimpleGrid>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {aliceClient && bobClient && oracleClient && (
        <Container maxW="container.xl" py={8}>
          <Routes>
            <Route path="/oracle" element={<OraclePage oracle={oracleClient} />} />
            <Route path="/client" element={<ClientPage client={aliceClient} />} />
            <Route path="/counterparty" element={<CounterpartyPage client={bobClient} />} />
          </Routes>
        </Container>
      )}
    </Box>
  );
}

export default App;
