import {
  CoinSelectTarget,
  decodeRawTransaction, selectCoins
} from '@atomicfinance/bitcoin-utils';
import Provider from '@atomicfinance/provider';
import {
  Address,
  bitcoin as bT
} from '@atomicfinance/types';
import BigNumber from 'bignumber.js';
import { dualFundingCoinSelect } from '@node-dlc/core';
import config from '../config';

const ADDRESS_GAP = 5;

type UnusedAddressesBlacklist = {
  [address: string]: true;
};

export default class ExtendedWalletProvider extends Provider {
  private nonChangeAddressIndex: number = 1;
  private changeAddressIndex: number = 1;
  private unusedAddressesBlacklist: UnusedAddressesBlacklist = {};

  constructor() {
    super();
    this.loadUnusedAddressesBlacklist();
  }

  private loadUnusedAddressesBlacklist() {
    const storedBlacklist = localStorage.getItem('unusedAddressesBlacklist');
    if (storedBlacklist) {
      this.unusedAddressesBlacklist = JSON.parse(storedBlacklist);
    }
  }

  private saveUnusedAddressesBlacklist() {
    localStorage.setItem('unusedAddressesBlacklist', JSON.stringify(this.unusedAddressesBlacklist));
  }

  async getUnusedAddress(change = false, numAddressPerCall = 10) {
    const addressIndex = change ? this.changeAddressIndex : this.nonChangeAddressIndex;
    const address = (await this.getMethod('getAddresses')(addressIndex, 1, change))[0];

    // Increment the appropriate index
    if (change) {
      this.changeAddressIndex++;
    } else {
      this.nonChangeAddressIndex++;
    }

    // Mark the address as used
    this.unusedAddressesBlacklist[address] = true;
    this.saveUnusedAddressesBlacklist();

    return address;
  }

  async getInputsForDualFunding(
    collaterals: number[],
    feePerByte?: number,
    fixedInputs: bT.Input[] = [],
    numAddressPerCall = 10,
  ) {
    if (fixedInputs.length > 0) {
      const fixedUtxos: bT.UTXO[] = [];
      for (const input of fixedInputs) {
        const txHex = await this.getMethod('getRawTransactionByHash')(input.txid);
        const tx = decodeRawTransaction(txHex, config.network);
        const value = new BigNumber(tx.vout[input.vout].value).times(1e8).toNumber();
        const address = tx.vout[input.vout].scriptPubKey.addresses[0];
        const walletAddress = await this.getMethod('getWalletAddress')(address);
        const utxo = {
          ...input,
          value,
          address,
          derivationPath: walletAddress.derivationPath,
        };
        fixedUtxos.push(utxo);
      }

      const { fee, inputs } = dualFundingCoinSelect(
        fixedUtxos,
        collaterals.map((c) => BigInt(c)),
        BigInt(feePerByte || await this.getMethod('getFeePerByte')()),
      );

      if (inputs.length > 0) {
        return {
          inputs,
          fee,
        };
      }
    }

    let addressIndex = 0;
    let changeAddresses: Address[] = [];
    let externalAddresses: Address[] = [];
    const addressCountMap = {
      change: 0,
      nonChange: 0,
    };

    const feePerBytePromise = this.getMethod('getFeePerByte')();
    let utxos: bT.UTXO[] = [];

    while (
      addressCountMap.change < ADDRESS_GAP ||
      addressCountMap.nonChange < ADDRESS_GAP
    ) {
      let addrList: Address[] = [];

      if (addressCountMap.change < ADDRESS_GAP) {
        changeAddresses = await this.getMethod('getAddresses')(
          addressIndex,
          numAddressPerCall,
          true,
        );
        addrList = addrList.concat(changeAddresses);
      } else {
        changeAddresses = [];
      }

      if (addressCountMap.nonChange < ADDRESS_GAP) {
        externalAddresses = await this.getMethod('getAddresses')(
          addressIndex,
          numAddressPerCall,
          false,
        );
        addrList = addrList.concat(externalAddresses);
      }

      const _utxos: bT.UTXO[] = await this.getMethod('getUnspentTransactions')(addrList);
      utxos.push(
        ..._utxos.map((utxo) => {
          const addr = addrList.find((a) => a.address === utxo.address);
          return {
            ...utxo,
            derivationPath: addr?.derivationPath,
          };
        }),
      );

      const transactionCounts: bT.AddressTxCounts = await this.getMethod('getAddressTransactionCounts')(addrList);

      if (!feePerByte) feePerByte = await feePerBytePromise;
      const minRelayFee = await this.getMethod('getMinRelayFee')();
      if (!feePerByte) {
        throw new Error('Fee per byte is not set');
      }
      if (feePerByte < minRelayFee) {
        throw new Error(`Fee supplied (${feePerByte} sat/b) too low. Minimum relay fee is ${minRelayFee} sat/b`);
      }

      const { fee, inputs } = dualFundingCoinSelect(
        utxos,
        collaterals.map((c) => BigInt(c)),
        BigInt(feePerByte),
      );

      if (inputs.length > 0) {
        return {
          inputs,
          fee,
        };
      }

      for (const address of addrList) {
        const isUsed = transactionCounts[address.address];
        const isChangeAddress = changeAddresses.find((a) => address.address === a.address);
        const key = isChangeAddress ? 'change' : 'nonChange';

        if (isUsed) {
          addressCountMap[key] = 0;
          this.unusedAddressesBlacklist[address.address] = true; // Mark as used
        } else {
          addressCountMap[key]++;
        }
      }

      this.saveUnusedAddressesBlacklist(); // Save usage data
      addressIndex += numAddressPerCall;
    }

    throw new Error('Not enough balance for dual funding');
  }

  async getInputsForAmount(
    _targets: bT.OutputTarget[],
    feePerByte?: number,
    fixedInputs: bT.Input[] = [],
    numAddressPerCall = 10,
    sweep = false,
  ) {
    let addressIndex = 0;
    let changeAddresses: Address[] = [];
    let externalAddresses: Address[] = [];
    const addressCountMap = {
      change: 0,
      nonChange: 0,
    };

    const feePerBytePromise = this.getMethod('getFeePerByte')();
    let utxos: bT.UTXO[] = [];

    while (
      addressCountMap.change < ADDRESS_GAP ||
      addressCountMap.nonChange < ADDRESS_GAP
    ) {
      let addrList: Address[] = [];

      if (addressCountMap.change < ADDRESS_GAP) {
        changeAddresses = await this.getMethod('getAddresses')(
          addressIndex,
          numAddressPerCall,
          true,
        );
        addrList = addrList.concat(changeAddresses);
      } else {
        changeAddresses = [];
      }

      if (addressCountMap.nonChange < ADDRESS_GAP) {
        externalAddresses = await this.getMethod('getAddresses')(
          addressIndex,
          numAddressPerCall,
          false,
        );
        addrList = addrList.concat(externalAddresses);
      }

      const fixedUtxos: bT.UTXO[] = [];
      if (fixedInputs.length > 0) {
        for (const input of fixedInputs) {
          const txHex = await this.getMethod('getRawTransactionByHash')(input.txid);
          const tx = decodeRawTransaction(txHex, config.network);
          const value = new BigNumber(tx.vout[input.vout].value).times(1e8).toNumber();
          const address = tx.vout[input.vout].scriptPubKey.addresses[0];
          const walletAddress = await this.getMethod('getWalletAddress')(address);
          const utxo = {
            ...input,
            value,
            address,
            derivationPath: walletAddress.derivationPath,
          };
          fixedUtxos.push(utxo);
        }
      }

      if (!sweep || fixedUtxos.length === 0) {
        const _utxos: bT.UTXO[] = await this.getMethod('getUnspentTransactions')(addrList);
        utxos.push(
          ..._utxos.map((utxo) => {
            const addr = addrList.find((a) => a.address === utxo.address);
            return {
              ...utxo,
              derivationPath: addr?.derivationPath,
            };
          }),
        );
      } else {
        utxos = fixedUtxos;
      }

      const utxoBalance = utxos.reduce((a, b) => a + (b.value || 0), 0);

      const transactionCounts: bT.AddressTxCounts = await this.getMethod('getAddressTransactionCounts')(addrList);

      if (!feePerByte) feePerByte = await feePerBytePromise;
      if (!feePerByte) {
        throw new Error('Fee per byte is not set');
      }
      const minRelayFee = await this.getMethod('getMinRelayFee')();
      if (feePerByte < minRelayFee) {
        throw new Error(`Fee supplied (${feePerByte} sat/b) too low. Minimum relay fee is ${minRelayFee} sat/b`);
      }

      let targets: CoinSelectTarget[];
      if (sweep) {
        const outputBalance = _targets.reduce((a, b) => a + (b['value'] || 0), 0);

        const sweepOutputSize = 39;
        const paymentOutputSize = _targets.filter((t) => t.value && t.address).length * 39;
        const scriptOutputSize = _targets
          .filter((t) => !t.value && t.script)
          .reduce((size, t) => size + 39 + (t.script ? t.script.byteLength : 0), 0);

        const outputSize = sweepOutputSize + paymentOutputSize + scriptOutputSize;
        const inputSize = utxos.length * 153;

        const sweepFee = feePerByte * (inputSize + outputSize);
        const amountToSend = new BigNumber(utxoBalance).minus(sweepFee);

        targets = _targets.map((target) => ({
          id: 'main',
          value: target.value,
          script: target.script,
        }));
        targets.push({
          id: 'main',
          value: amountToSend.minus(outputBalance).toNumber(),
        });
      } else {
        targets = _targets.map((target) => ({
          id: 'main',
          value: target.value,
          script: target.script,
        }));
      }

      const { inputs, outputs, change, fee } = selectCoins(
        utxos,
        targets,
        Math.ceil(feePerByte),
        fixedUtxos,
      );

      if (inputs && outputs) {
        return {
          inputs,
          change,
          outputs,
          fee,
        };
      }

      for (const address of addrList) {
        const isUsed = transactionCounts[address.address];
        const isChangeAddress = changeAddresses.find((a) => address.address === a.address);
        const key = isChangeAddress ? 'change' : 'nonChange';

        if (isUsed) {
          addressCountMap[key] = 0;
          this.unusedAddressesBlacklist[address.address] = true; // Mark as used
        } else {
          addressCountMap[key]++;
        }
      }

      this.saveUnusedAddressesBlacklist(); // Save usage data
      addressIndex += numAddressPerCall;
    }

    throw new Error('Not enough balance');
  }
}
