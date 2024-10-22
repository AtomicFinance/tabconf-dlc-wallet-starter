import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as cfd from "cfd-js-wasm";
import * as cfddlc from "cfd-dlc-js-wasm";
import BitcoinCfdProvider from "@atomicfinance/bitcoin-cfd-provider";
import BitcoinDlcProvider from "@atomicfinance/bitcoin-dlc-provider";
import { BitcoinEsploraApiProvider } from "@atomicfinance/bitcoin-esplora-api-provider";
import { BitcoinJsWalletProvider } from "@atomicfinance/bitcoin-js-wallet-provider";
import FinanceClient from "@atomicfinance/client";
import { bitcoin, TxInInfoRequest, TxOutRequest } from "@atomicfinance/types";
import { BitcoinNetworks } from "bitcoin-networks";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  useEffect(() => {
    async function test() {
      console.log("cfd", cfd);

      while (!cfd.hasLoadedWasm()) {
        console.log("waiting for cfd wasm to load");
        await sleep(10);
      }

      console.log("cfdhas loaded", cfd.getCfd());

      const client = new FinanceClient();
      const network = BitcoinNetworks.bitcoin_testnet;

      client.addProvider(
        new BitcoinEsploraApiProvider({
          url: "https://testnet-node.atomic.finance/testnet/api",
          network,
        })
      );

      client.addProvider(
        new BitcoinJsWalletProvider({
          network,
          mnemonic: process.env.REACT_APP_MNEMONIC || "",
          baseDerivationPath: `m/84'/${network.coinType}'/0'`,
          addressType: bitcoin.AddressType.BECH32,
        })
      );

      client.addProvider(new BitcoinCfdProvider(cfd.getCfd()));
      client.addProvider(new BitcoinDlcProvider(network, cfddlc.getCfddlc()));

      const localInputs: TxInInfoRequest[] = [
        {
          txid: "0000000000000000000000000000000000000000000000000000000000000001",
          vout: 0,
          maxWitnessLength: 108,
          inputSerialId: 0,
        },
      ];

      const localChange: TxOutRequest = {
        address: "bcrt1qlgmznucxpdkp5k3ktsct7eh6qrc4tju7ktjukn",
        amount: 4899999789,
      };

      const remoteInputs: TxInInfoRequest[] = [
        {
          txid: "0000000000000000000000000000000000000000000000000000000000000002",
          vout: 0,
          maxWitnessLength: 108,
          inputSerialId: 1,
        },
      ];

      const remoteChange: TxOutRequest = {
        address: "bcrt1qvh2dvgjctwh4z5w7sc93u7h4sug0yrdz2lgpqf",
        amount: 4899999789,
      };

      const test = await client.dlc.CreateFundTransaction({
        localPubkey: "020b0467b4217a1fee34f6d0e51eac89d67fc152172f42e17d263f7f94543b0bfd",
        remotePubkey: "03ec03f8e647306d7ddb5674f3d36665a304a77353a8592b586e29725d65485246",
        outputAmount: 200000170,
        localInputs,
        localChange,
        remoteInputs,
        remoteChange,
        feeRate: 100000000,
      });
      console.log("test", test);

      const address = await client.wallet.getUnusedAddress();
      console.log("address", address);
    }

    test();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
