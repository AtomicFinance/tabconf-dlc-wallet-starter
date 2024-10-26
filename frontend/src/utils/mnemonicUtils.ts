import * as bip39 from 'bip39';
import CryptoJS from 'crypto-js';

export function generateMnemonic(): string {
  return bip39.generateMnemonic();
}

export function encryptMnemonic(mnemonic: string, password: string): string {
  return CryptoJS.AES.encrypt(mnemonic, password).toString();
}

export function decryptMnemonic(encryptedMnemonic: string, password: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, password);
  return bytes.toString(CryptoJS.enc.Utf8);
}
