/* eslint-disable max-len */
/* eslint-disable indent */
/**
 * Multisig input data to add to tx.
 * @property {boolean} isElements? - elements transaction flag.
 * @property {string} tx - transaction hex
 * @property {AddMultisigSignTxInRequest} txin - transaction input data
 */
export interface AddMultisigSignRequest {
  isElements?: boolean;
  tx: string;
  txin: AddMultisigSignTxInRequest;
}

/**
* Multisig signature input data.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {PubkeySignData[]} signParams - pubkey signature data.
* @property {string} redeemScript? - (required for P2SH or P2SH-P2WSH) redeem script for unlocking script
* @property {string} witnessScript? - (required for P2WSH or P2SH-P2WSH) witness script for witness stack
* @property {string} hashType - hash type. (p2sh, p2wsh or p2sh-p2wsh)
* @property {boolean} clearStack? - Clear the stack before addSign. If txinType is p2sh, clearStack is forced to be true.
*/
export interface AddMultisigSignTxInRequest {
  txid: string;
  vout: number;
  signParams: PubkeySignData[];
  redeemScript?: string;
  witnessScript?: string;
  hashType: string;
  clearStack?: boolean;
}

/**
* request for add psbt data.
* @property {string} psbt - psbt data (hex or base64)
* @property {PsbtAddInputRequest[]} inputs? - request for add psbt input.
* @property {PsbtAddOutputRequest[]} outputs? - request for add psbt output.
*/
export interface AddPsbtDataRequest {
  psbt: string;
  inputs?: PsbtAddInputRequest[];
  outputs?: PsbtAddOutputRequest[];
}

/**
* pubkey hash input data to add to tx.
* @property {boolean} isElements? - elements transaction flag.
* @property {string} tx - transaction hex
* @property {AddPubkeyHashSignTxInRequest} txin - transaction input data
*/
export interface AddPubkeyHashSignRequest {
  isElements?: boolean;
  tx: string;
  txin: AddPubkeyHashSignTxInRequest;
}

/**
* pubkey hash input data
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {PubkeySignData} signParam - sign parameter.
* @property {string} pubkey - public key.
* @property {string} hashType - hash type. (p2pkh, p2wpkh or p2sh-p2wpkh)
*/
export interface AddPubkeyHashSignTxInRequest {
  txid: string;
  vout: number;
  signParam: PubkeySignData;
  pubkey: string;
  hashType: string;
}

/**
* The data added to the transaction.
* @property {string} tx - transaction hex
* @property {TxInRequest[]} txins? - The data added to the transaction input.
* @property {TxOutRequest[]} txouts? - The data added to the transaction output.
*/
export interface AddRawTransactionRequest {
  tx: string;
  txins?: TxInRequest[];
  txouts?: TxOutRequest[];
}

/**
* address prefix customize data.
* @property {string} nettype - network type (mainnet, testnet, regtest, liquidv1, elementsregtest, custom)
* @property {string} p2pkh - p2pkh prefix
* @property {string} p2sh - p2sh prefix
* @property {string} bech32 - bech32 prefix
* @property {string} blinded? - (elements only) blinded p2pkh prefix
* @property {string} blindedP2sh? - (elements only) blinded p2sh prefix. If not set, use blinded.
* @property {string} blech32? - (elements only) blind bech32 prefix
*/
export interface AddressPrefixCustomizeData {
  nettype: string;
  p2pkh: string;
  p2sh: string;
  bech32: string;
  blinded?: string;
  blindedP2sh?: string;
  blech32?: string;
}

/**
* script hash input data to add to tx.
* @property {boolean} isElements? - elements transaction flag.
* @property {string} tx - transaction hex
* @property {AddScriptHashSignTxInRequest} txin - transaction input data
*/
export interface AddScriptHashSignRequest {
  isElements?: boolean;
  tx: string;
  txin: AddScriptHashSignTxInRequest;
}

/**
* script hash input data
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {SignData[]} signParams - The sign data.
* @property {SignData[]} signParam? - The sign data.
* @property {string} redeemScript - redeem script.
* @property {string} hashType - hash type. (p2sh, p2wsh or p2sh-p2wsh)
*/
export interface AddScriptHashSignTxInRequest {
  txid: string;
  vout: number;
  signParams: SignData[];
  signParam?: SignData[];
  redeemScript: string;
  hashType: string;
}

/**
* Sign input data to add to tx.
* @property {boolean} isElements? - elements transaction flag.
* @property {string} tx - transaction hex
* @property {AddSignTxInRequest} txin - transaction input data
*/
export interface AddSignRequest {
  isElements?: boolean;
  tx: string;
  txin: AddSignTxInRequest;
}

/**
* Sign input data.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {boolean} isWitness? - use witness stack flag.
* @property {SignData[]} signParams - The sign data.
* @property {SignData[]} signParam? - The sign data.
* @property {boolean} clearStack? - Clear the stack before addSign. If isWitness is false, clearStack is forced to be true.
*/
export interface AddSignTxInRequest {
  txid: string;
  vout: number;
  isWitness?: boolean;
  signParams: SignData[];
  signParam?: SignData[];
  clearStack?: boolean;
}

/**
* taproot input data to add to tx.
* @property {boolean} isElements? - elements transaction flag.
* @property {string} tx - transaction hex
* @property {AddTaprootSchnorrSignTxInRequest} txin - transaction input data
*/
export interface AddTaprootSchnorrSignRequest {
  isElements?: boolean;
  tx: string;
  txin: AddTaprootSchnorrSignTxInRequest;
}

/**
* taprootinput data
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {string} signature - sign hex.
* @property {string} sighashType? - signature hash type. (default, all, none or single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag.
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
* @property {string} annex? - taproot annex bytes.
*/
export interface AddTaprootSchnorrSignTxInRequest {
  txid: string;
  vout: number;
  signature: string;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
  annex?: string;
}

/**
* tapscript input data to add to tx.
* @property {boolean} isElements? - elements transaction flag.
* @property {string} tx - transaction hex
* @property {AddTapscriptSignTxInRequest} txin - transaction input data
*/
export interface AddTapscriptSignRequest {
  isElements?: boolean;
  tx: string;
  txin: AddTapscriptSignTxInRequest;
}

/**
* tapscript input data
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {TapScriptSignData[]} signParams - tapscript sign data.
* @property {string} tapscript - tapscript.
* @property {string} controlBlock - tapscript control block.
* @property {string} annex? - taproot annex bytes.
*/
export interface AddTapscriptSignTxInRequest {
  txid: string;
  vout: number;
  signParams: TapScriptSignData[];
  tapscript: string;
  controlBlock: string;
  annex?: string;
}

/**
* TapScript tree information
* @property {TapScriptTreeItem[]} branches - TapScript tree item
*/
export interface AnalyzeTapScriptTreeInfo {
  branches: TapScriptTreeItem[];
}

/**
* Request for get TapBranch info.
* @property {string} network? - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {boolean} isElements? - elements transaction flag.
* @property {string} treeString - tree serialize string. (cfd format)
*/
export interface AnalyzeTapScriptTreeRequest {
  network?: string;
  isElements?: boolean;
  treeString: string;
}

/**
* The output descriptor request data.
* @property {string} descriptor - output descriptor.
* @property {boolean} isElements? - elements transaction flag.
*/
export interface AppendDescriptorChecksumRequest {
  descriptor: string;
  isElements?: boolean;
}

/**
* base64 data
* @property {string} base64 - base64 data
*/
export interface Base64Data {
  base64: string;
}

/**
* Response of blinding key.
* @property {string} blindingKey - blinding key
*/
export interface BlindingKeyResponse {
  blindingKey: string;
}

/**
* Tx input issuance data for blinding.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {string} assetBlindingKey - asset blinding key.
* @property {string} tokenBlindingKey? - token blinding key. Used when issue transaction.
*/
export interface BlindIssuanceRequest {
  txid: string;
  vout: number;
  assetBlindingKey: string;
  tokenBlindingKey?: string;
}

/**
* Request blind the transaction.
* @property {string} tx - transaction hex
* @property {BlindTxInRequest[]} txins - Tx input data for blinding.
* @property {BlindTxOutRequest[]} txouts? - Tx output data for blinding.
* @property {string[]} txoutConfidentialAddresses? - Confidential address list. Use instead of txouts.
* @property {BlindIssuanceRequest[]} issuances? - Tx input issuance data for blinding.
* @property {bigint | number} minimumRangeValue? - rangeproof minimum value.
* @property {number} exponent? - An exponential value that guarantees a range of rangeproof.
* @property {number} minimumBits? - minimum bits of rangeproof.
* @property {boolean} collectBlinder? - collect blinder data. (blinders and issuanceBlinders)
*/
export interface BlindRawTransactionRequest {
  tx: string;
  txins: BlindTxInRequest[];
  txouts?: BlindTxOutRequest[];
  txoutConfidentialAddresses?: string[];
  issuances?: BlindIssuanceRequest[];
  minimumRangeValue?: bigint | number;
  exponent?: number;
  minimumBits?: number;
  collectBlinder?: boolean;
}

/**
* The output blind transaction data.
* @property {string} hex - transaction hex.
* @property {UnblindOutput[]} blinders? - unblind txout
* @property {UnblindIssuanceOutput[]} issuanceBlinders? - unblind issuance data
*/
export interface BlindTransactionResponse {
  hex: string;
  blinders?: UnblindOutput[];
  issuanceBlinders?: UnblindIssuanceOutput[];
}

/**
* Tx input data for blinding.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {string} asset - asset hex.
* @property {string} blindFactor? - amount blinder.
* @property {string} assetBlindFactor? - asset blinder.
* @property {bigint | number} amount - satoshi amount.
*/
export interface BlindTxInRequest {
  txid: string;
  vout: number;
  asset: string;
  blindFactor?: string;
  assetBlindFactor?: string;
  amount: bigint | number;
}

/**
* Tx output data for blinding.
* @property {number} index - target txout index.
* @property {string} confidentialKey - confidential key.
* @property {string} blindPubkey? - (deprecated field)
*/
export interface BlindTxOutRequest {
  index: number;
  confidentialKey: string;
  blindPubkey?: string;
}

/**
* block data.
* @property {boolean} isElements? - elements transaction flag.
* @property {string} block - block hex
*/
export interface BlockData {
  isElements?: boolean;
  block: string;
}

/**
* The output block information.
* @property {string} blockHash - block hash.
* @property {string[]} tx - txid list.
* @property {number} version - version.
* @property {string} versionHex - version hex.
* @property {string} previousblockhash - previous block hash.
* @property {string} merkleroot - merkleroot.
* @property {number} time - block time.
* @property {number} bits - bits.
* @property {number} nonce - nonce.
*/
export interface BlockInformation {
  blockHash: string;
  tx: string[];
  version: number;
  versionHex: string;
  previousblockhash: string;
  merkleroot: string;
  time: number;
  bits: number;
  nonce: number;
}

/**
* The output block transaction data.
* @property {string} tx - tx hex.
* @property {string} txoutproof - txout proof.
*/
export interface BlockTxData {
  tx: string;
  txoutproof: string;
}

/**
* Request by block and txid.
* @property {boolean} isElements? - elements transaction flag.
* @property {string} block - block hex
* @property {string} txid - txid
*/
export interface BlockTxRequest {
  isElements?: boolean;
  block: string;
  txid: string;
}

/**
* request ec signature data.
* @property {string} sighash - signature hash.
* @property {PrivkeyData} privkeyData? - private key data.
* @property {boolean} isGrindR? - Grind-R flag
*/
export interface CalculateEcSignatureRequest {
  sighash: string;
  privkeyData?: PrivkeyData;
  isGrindR?: boolean;
}

/**
* tweak pubkey data
* @property {string} pubkey - tweaked schnorr public key
* @property {boolean} parity - y-parity flag
* @property {string} basePubkey - tweak based schnorr public key
* @property {string} tweak - 32-byte tweak data
*/
export interface CheckTweakedSchnorrPubkeyRequest {
  pubkey: string;
  parity: boolean;
  basePubkey: string;
  tweak: string;
}

/**
* fee information.
* @property {bigint | number} txFeeAmount? - Tx fee amount excluding txin.
* @property {number} feeRate? - network fee rate
* @property {number} longTermFeeRate? - network long-term fee rate
* @property {number} knapsackMinChange? - knapsack minimum change amount. (knapsack logic's threshold. Recommended value is 1.)
* @property {string} feeAsset? - fee asset (This field is available only elements.)
* @property {number} exponent? - blind exponent (This field is available only elements.)
* @property {number} minimumBits? - blind minimum bits (This field is available only elements.)
*/
export interface CoinSelectionFeeInformationField {
  txFeeAmount?: bigint | number;
  feeRate?: number;
  longTermFeeRate?: number;
  knapsackMinChange?: number;
  feeAsset?: string;
  exponent?: number;
  minimumBits?: number;
}

/**
* Request for compute sigpoint on schnorr
* @property {string} message - message data. (32-byte hash, or text message.)
* @property {boolean} isHashed? - is 32-byte hashed message.
* @property {string} nonce - 32-byte nonce data.
* @property {string} schnorrPubkey - xonly public key.
*/
export interface ComputeSigPointRequest {
  message: string;
  isHashed?: boolean;
  nonce: string;
  schnorrPubkey: string;
}

/**
* Request AES data.
* @property {boolean} isEncrypt - aes encrypt flag. true is encrypt, false is decrypt
* @property {string} mode? - AES mode. (for feature) (cbc only)
* @property {string} key - key data (32 byte: 64 char hex)
* @property {string} iv? - initial vector (16 byte: 32 char hex) (using by cbc mode only.)
* @property {string} data - crypto target data
*/
export interface ConvertAesRequest {
  isEncrypt: boolean;
  mode?: string;
  key: string;
  iv?: string;
  data: string;
}

/**
* The data converted by AES.
* @property {string} hex - encrypted or decrypted data
*/
export interface ConvertAesResponse {
  hex: string;
}

/**
* Request's data for converting entropy to mnemonic.
* @property {string} entropy - entropy hex
* @property {string} language? - mnemonic's language. (support [en es fr it jp zhs zht])
*/
export interface ConvertEntropyToMnemonicRequest {
  entropy: string;
  language?: string;
}

/**
* Response data of converting entropy to mnemonic.
* @property {string[]} mnemonic - mnemonic word list.
*/
export interface ConvertEntropyToMnemonicResponse {
  mnemonic: string[];
}

/**
* Request's data for converting mnemonic to seed.
* @property {string[]} mnemonic - mnemonic words
* @property {string} passphrase - passphrase
* @property {boolean} strictCheck? - Check mnemonic words strictly
* @property {string} language? - mnemonic language (support [en]. Other languages are not working properly.)
* @property {boolean} useIdeographicSpace? - Currently, this flag is valid only the language is set "jp".
*/
export interface ConvertMnemonicToSeedRequest {
  mnemonic: string[];
  passphrase: string;
  strictCheck?: boolean;
  language?: string;
  useIdeographicSpace?: boolean;
}

/**
* Response data of converting mnemonic to seed.
* @property {string} seed - mnemonic word list
* @property {string} entropy? - mnemonic's entropy. This field is only set if "language" is set in the request
*/
export interface ConvertMnemonicToSeedResponse {
  seed: string;
  entropy?: string;
}

/**
* Request for ConvertToPsbt.
* @property {string} tx - transaction hex
* @property {boolean} permitSigData? - If true, any signatures in the input will be discarded and conversion will continue. If false, this function will fail if any signatures are present.
*/
export interface ConvertToPsbtRequest {
  tx: string;
  permitSigData?: boolean;
}

/**
* Request data for creating address.
* @property {boolean} isElements? - elements transaction flag.
* @property {HashKeyData} keyData? - address's base data.
* @property {string} network - network type. (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {string} hashType - hash type. (p2wpkh, p2wsh, p2pkh, p2sh, p2sh-p2wpkh, p2sh-p2wsh, taproot)
*/
export interface CreateAddressRequest {
  isElements?: boolean;
  keyData?: HashKeyData;
  network: string;
  hashType: string;
}

/**
* Response data of creating address.
* @property {string} address - address string.
* @property {string} lockingScript - (redeem script or pubkey) locking script
* @property {string} redeemScript? - (required for P2SH-P2WPKH or P2SH-P2WSH) redeem script for unlocking script
*/
export interface CreateAddressResponse {
  address: string;
  lockingScript: string;
  redeemScript?: string;
}

/**
* descriptor's key data.
* @property {string} key - pubkey or extpubkey.
* @property {string} parentExtkey? - parent extpubkey.
* @property {string} keyPathFromParent? - bip32 path from parent key.
*/
export interface CreateDescriptorKeyRequest {
  key: string;
  parentExtkey?: string;
  keyPathFromParent?: string;
}

/**
* Request data for creating descriptor.
* @property {string} scriptType - Script types are joined by '-'. (ex. p2sh-p2wsh-multi)
* @property {CreateDescriptorKeyRequest[]} keyInfoList? - descriptor's key data.
* @property {number} requireNum? - multisig require num.
*/
export interface CreateDescriptorRequest {
  scriptType: string;
  keyInfoList?: CreateDescriptorKeyRequest[];
  requireNum?: number;
}

/**
* Request for create destroy amount transaction
* @property {number} version? - transaction version
* @property {number} locktime? - locktime
* @property {TxInRequest[]} txins? - The data added to the transaction input.
* @property {ElementsTxOut[]} txouts? - adding txout data
* @property {ElementsDestroyAmount} destroy - destroy amount txout
* @property {ElementsTxOutFee} fee? - Transaction fee data.
*/
export interface CreateDestroyAmountRequest {
  version?: number;
  locktime?: number;
  txins?: TxInRequest[];
  txouts?: ElementsTxOut[];
  destroy: ElementsDestroyAmount;
  fee?: ElementsTxOutFee;
}

/**
* Request for create signature hash.
* @property {string} tx - transaction hex
* @property {CreateElementsSignatureHashTxIn} txin - txin data
*/
export interface CreateElementsSignatureHashRequest {
  tx: string;
  txin: CreateElementsSignatureHashTxIn;
}

/**
* txin data
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {HashKeyData} keyData - key data
* @property {bigint | number} amount? - satoshi amount (need either amount or confidentialValueCommitment)
* @property {string} confidentialValueCommitment? - value commitment (need either amount or confidentialValueCommitment)
* @property {string} hashType - hash type (p2wpkh, p2wsh, p2pkh, p2sh, p2sh-p2wpkh, p2sh-p2wsh)
* @property {string} sighashType? - signature hash type. (all, none, single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag.
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
*/
export interface CreateElementsSignatureHashTxIn {
  txid: string;
  vout: number;
  keyData: HashKeyData;
  amount?: bigint | number;
  confidentialValueCommitment?: string;
  hashType: string;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
}

/**
* Request data for creating extkey from parent's key.
* @property {string} network - network type (mainnet, testnet or regtest)
* @property {string} extkeyType? - extkey type (extPrivkey or extPubkey)
* @property {string} bip32FormatType? - bip32 format type (bip32, bip49, bip84)
* @property {string} parentKey - parent key (pubkey or privkey)
* @property {number} parentDepth - parent depth
* @property {string} parentChainCode - parent chain code
* @property {number} childNumber - bip32 child number.
* @property {boolean} hardened? - hardened flag. (true is extPrivkey only.)
*/
export interface CreateExtkeyFromParentKeyRequest {
  network: string;
  extkeyType?: string;
  bip32FormatType?: string;
  parentKey: string;
  parentDepth: number;
  parentChainCode: string;
  childNumber: number;
  hardened?: boolean;
}

/**
* Request data for creating extkey from parent.
* @property {string} extkey - parent extkey
* @property {string} network - network type (mainnet, testnet or regtest)
* @property {string} extkeyType - extkey type (extPrivkey or extPubkey)
* @property {number[]} childNumberArray? - bip32 child number array. (hardened is logical sum 0x80000000)
* @property {string} path? - bip32 path. (child number string. if exist path, disable childNumberArray. ex) 44'/0h/2.)
*/
export interface CreateExtkeyFromParentPathRequest {
  extkey: string;
  network: string;
  extkeyType: string;
  childNumberArray?: number[];
  path?: string;
}

/**
* Request data for creating extkey from parent.
* @property {string} extkey - parent extkey
* @property {string} network - network type (mainnet, testnet or regtest)
* @property {string} extkeyType - extkey type (extPrivkey or extPubkey)
* @property {number} childNumber - bip32 child number.
* @property {boolean} hardened? - hardened flag. (true is extPrivkey only.)
*/
export interface CreateExtkeyFromParentRequest {
  extkey: string;
  network: string;
  extkeyType: string;
  childNumber: number;
  hardened?: boolean;
}

/**
* Request data for creating extkey from seed.
* @property {string} seed - seed hex data
* @property {string} network - network type (mainnet, testnet or regtest)
* @property {string} extkeyType? - extkey type (extPrivkey or extPubkey)
* @property {string} bip32FormatType? - bip32 format type (bip32, bip49, bip84)
*/
export interface CreateExtkeyFromSeedRequest {
  seed: string;
  network: string;
  extkeyType?: string;
  bip32FormatType?: string;
}

/**
* Request data for creating extkey.
* @property {string} network - network type (mainnet, testnet or regtest)
* @property {string} extkeyType? - extkey type (extPrivkey or extPubkey)
* @property {string} bip32FormatType? - bip32 format type (bip32, bip49, bip84)
* @property {string} parentKey? - parent key
* @property {string} parentFingerprint? - parent key's fingerprint.
* @property {string} key - key hex. (pubkey or privkey)
* @property {number} depth - depth
* @property {string} chainCode - chain code
* @property {number} childNumber - bip32 child number.
* @property {boolean} hardened? - hardened flag. (true is extPrivkey only.)
*/
export interface CreateExtkeyRequest {
  network: string;
  extkeyType?: string;
  bip32FormatType?: string;
  parentKey?: string;
  parentFingerprint?: string;
  key: string;
  depth: number;
  chainCode: string;
  childNumber: number;
  hardened?: boolean;
}

/**
* Response of creating extkey.
* @property {string} extkey - extkey
*/
export interface CreateExtkeyResponse {
  extkey: string;
}

/**
* Request data for creating extpubkey from extprivkey.
* @property {string} extkey - extkey
* @property {string} network - network type (mainnet, testnet or regtest)
*/
export interface CreateExtPubkeyRequest {
  extkey: string;
  network: string;
}

/**
* Request data for creating keypair.
* @property {boolean} wif - Set the privkey format to wif.
* @property {string} network? - network type (mainnet, testnet or regtest)
* @property {boolean} isCompressed? - pubkey compressed flag
*/
export interface CreateKeyPairRequest {
  wif: boolean;
  network?: string;
  isCompressed?: boolean;
}

/**
* Response data of creating keypair.
* @property {string} privkey - privkey
* @property {string} pubkey - pubkey
*/
export interface CreateKeyPairResponse {
  privkey: string;
  pubkey: string;
}

/**
* Request for create multisig address and script
* @property {number} nrequired - require signature num.
* @property {string[]} keys - pubkey list
* @property {boolean} isElements? - elements mode flag.
* @property {string} network - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {string} hashType - hash type (p2sh, p2wsh, p2sh-p2wsh)
*/
export interface CreateMultisigRequest {
  nrequired: number;
  keys: string[];
  isElements?: boolean;
  network: string;
  hashType: string;
}

/**
* Response of create multisig address and script
* @property {string} address - address
* @property {string} redeemScript? - (required for P2SH or P2SH-P2WSH) redeem script for unlocking script
* @property {string} witnessScript? - (required for P2WSH or P2SH-P2WSH) witness script for witness stack
*/
export interface CreateMultisigResponse {
  address: string;
  redeemScript?: string;
  witnessScript?: string;
}

/**
* Request for creating multisig's scriptsig.
* @property {PubkeySignData[]} signParams? - pubkey signature data.
* @property {string} redeemScript - multisig script
*/
export interface CreateMultisigScriptSigRequest {
  signParams?: PubkeySignData[];
  redeemScript: string;
}

/**
* Request data. If unlock pegin tx, sign to p2wpkh or p2wsh format.
* @property {string} fedpegscript - fedpeg script (fedpegscript comes from 'getsidechaininfo' rpc command.)
* @property {string} pubkey - pubkey related to unlocking peg-in utxo. (This field is only available when lockingScript is empty.)
* @property {string} redeemScript? - default is empty. set claim script to direct.
* @property {string} network? - network type. (mainnet, testnet or regtest)
* @property {string} hashType? - hash type (p2wsh, p2sh-p2wsh, p2sh)
*/
export interface CreatePegInAddressRequest {
  fedpegscript: string;
  pubkey: string;
  redeemScript?: string;
  network?: string;
  hashType?: string;
}

/**
* Response data of creating pegin address.
* @property {string} mainchainAddress - mainchain address
* @property {string} claimScript - claim script.
* @property {string} tweakFedpegscript - tweaked fedpeg script
*/
export interface CreatePegInAddressResponse {
  mainchainAddress: string;
  claimScript: string;
  tweakFedpegscript: string;
}

/**
* Request for CreatePegoutAddress.
* @property {string} network? - mainchain network type. (mainnet, testnet or regtest)
* @property {string} elementsNetwork? - elements network type. (liquidv1, elementsregtest)
* @property {string} descriptor - output descriptor or xpub
* @property {bigint | number} bip32Counter? - bip32 derive counter. (0 to 2147483647.)
* @property {string} hashType? - pubkey hash type (p2pkh, p2sh-p2pkh, p2wpkh)
*/
export interface CreatePegoutAddressRequest {
  network?: string;
  elementsNetwork?: string;
  descriptor: string;
  bip32Counter?: bigint | number;
  hashType?: string;
}

/**
* Response data of creating pegout address.
* @property {string} mainchainAddress - mainchain address
* @property {string} baseDescriptor - base output descriptor
*/
export interface CreatePegoutAddressResponse {
  mainchainAddress: string;
  baseDescriptor: string;
}

/**
* Request for create pegin transaction
* @property {number} version? - transaction version
* @property {number} locktime? - locktime
* @property {ElementsPeginTxIn[]} txins - Pegin's txin data
* @property {ElementsTxOut[]} txouts? - adding txout data
* @property {ElementsTxOutFee} fee? - Transaction fee data.
* @property {boolean} isRandomSortTxOut? - txout random sort after adding transaction
*/
export interface CreateRawPeginRequest {
  version?: number;
  locktime?: number;
  txins: ElementsPeginTxIn[];
  txouts?: ElementsTxOut[];
  fee?: ElementsTxOutFee;
  isRandomSortTxOut?: boolean;
}

/**
* Request for create pegout transaction
* @property {number} version? - transaction version
* @property {number} locktime? - locktime
* @property {TxInRequest[]} txins? - The data added to the transaction input.
* @property {ElementsTxOut[]} txouts? - adding txout data
* @property {ElementsPegoutTxOut} pegout - pegout txout
* @property {ElementsTxOutFee} fee? - fee data
*/
export interface CreateRawPegoutRequest {
  version?: number;
  locktime?: number;
  txins?: TxInRequest[];
  txouts?: ElementsTxOut[];
  pegout: ElementsPegoutTxOut;
  fee?: ElementsTxOutFee;
}

/**
* Response of create pegout transaction.
* @property {string} hex - transaction hex
*/
export interface CreateRawPegoutResponse {
  hex: string;
  btcAddress?: string;
}

/**
* Request for create transaction
* @property {number} version? - transaction version
* @property {number} locktime? - locktime
* @property {TxInRequest[]} txins? - The data added to the transaction input.
* @property {TxOutRequest[]} txouts? - The data added to the transaction output.
*/
export interface CreateRawTransactionRequest {
  version?: number;
  locktime?: number;
  txins?: TxInRequest[];
  txouts?: TxOutRequest[];
}

/**
* Request for creating script.
* @property {string[]} items - item array accepts string of op_code, binary hex or number
*/
export interface CreateScriptRequest {
  items: string[];
}

/**
* Request for create signature hash.
* @property {string} tx - transaction hex
* @property {CreateSignatureHashTxInRequest} txin - txin data
*/
export interface CreateSignatureHashRequest {
  tx: string;
  txin: CreateSignatureHashTxInRequest;
}

/**
* Response of create signature hash.
* @property {string} sighash - sighash
*/
export interface CreateSignatureHashResponse {
  sighash: string;
}

/**
* txin data
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {HashKeyData} keyData - key data
* @property {bigint | number} amount - satoshi amount
* @property {string} hashType - hash type (p2wpkh, p2wsh, p2pkh, p2sh, p2sh-p2wpkh, p2sh-p2wsh)
* @property {string} sighashType? - signature hash type. (all, none, single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag.
*/
export interface CreateSignatureHashTxInRequest {
  txid: string;
  vout: number;
  keyData: HashKeyData;
  amount: bigint | number;
  hashType: string;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
}

/**
* Request for decode base58
* @property {string} data - base58 data
* @property {boolean} hasChecksum? - use checksum mode.
*/
export interface DecodeBase58Request {
  data: string;
  hasChecksum?: boolean;
}

/**
* Response of decode base58
* @property {string} hex - decoded data byte hex
*/
export interface DecodeBase58Response {
  hex: string;
}

/**
* Request for decode signature.
* @property {string} signature - der signature
*/
export interface DecodeDerSignatureToRawRequest {
  signature: string;
}

/**
* locking script data
* @property {string} asm? - script asm string
* @property {string} hex? - script hex
* @property {number} reqSigs? - require signature num
* @property {string} type? - script type
* @property {string[]} addresses? - address list
*/
export interface DecodeLockingScript {
  asm?: string;
  hex?: string;
  reqSigs?: number;
  type?: string;
  addresses?: string[];
}

/**
* psbt input data
* @property {string} non_witness_utxo_hex? - If hasDetail is true, tx hex for not witness set.
* @property {DecodeRawTransactionResponse} non_witness_utxo? - utxo for not witness. If hasDetail and hasSimple are true, this field is disabled.
* @property {DecodePsbtUtxo} witness_utxo? - utxo for witness
* @property {PsbtSignatureData[]} partial_signatures? - psbt signature data.
* @property {string} sighash? - sighash type (ALL, SINGLE, NONE)
* @property {PsbtScriptData} redeem_script? - redeem script
* @property {PsbtScriptData} witness_script? - witness script
* @property {PsbtBip32Data[]} bip32_derivs? - psbt script data
* @property {DecodeUnlockingScript} final_scriptsig? - final scriptsig
* @property {string[]} final_scriptwitness? - final witness stack
* @property {PsbtMapData[]} unknown? - psbt map data.
*/
export interface DecodePsbtInput {
  non_witness_utxo_hex?: string;
  non_witness_utxo?: DecodeRawTransactionResponse;
  witness_utxo?: DecodePsbtUtxo;
  partial_signatures?: PsbtSignatureData[];
  sighash?: string;
  redeem_script?: PsbtScriptData;
  witness_script?: PsbtScriptData;
  bip32_derivs?: PsbtBip32Data[];
  final_scriptsig?: DecodeUnlockingScript;
  final_scriptwitness?: string[];
  unknown?: PsbtMapData[];
}

/**
* @property {string} asm? - script asm string
* @property {string} hex? - script hex
* @property {string} type? - script type
* @property {string} address? - address
*/
export interface DecodePsbtLockingScript {
  asm?: string;
  hex?: string;
  type?: string;
  address?: string;
}

/**
* psbt output data
* @property {PsbtScriptData} redeem_script? - redeem script
* @property {PsbtScriptData} witness_script? - witness script
* @property {PsbtBip32Data[]} bip32_derivs? - psbt script data
* @property {PsbtMapData[]} unknown? - psbt map data.
*/
export interface DecodePsbtOutput {
  redeem_script?: PsbtScriptData;
  witness_script?: PsbtScriptData;
  bip32_derivs?: PsbtBip32Data[];
  unknown?: PsbtMapData[];
}

/**
* request for decode psbt.
* @property {string} psbt - psbt data (hex or base64)
* @property {string} network? - network type (mainnet, testnet, regtest)
* @property {boolean} hasDetail? - detail dump option.
* @property {boolean} hasSimple? - simple dump option.
*/
export interface DecodePsbtRequest {
  psbt: string;
  network?: string;
  hasDetail?: boolean;
  hasSimple?: boolean;
}

/**
* response data of decode psbt.
* @property {DecodeRawTransactionResponse} tx? - transaction data. If hasDetail and hasSimple are true, this field is disabled.
* @property {string} tx_hex? - If hasDetail is true, tx hex set.
* @property {PsbtGlobalXpub[]} xpubs? - psbt global xpub data
* @property {number} version? - If hasDetail is true, psbt version set. (remove from global unknown)
* @property {PsbtMapData[]} unknown? - psbt map data.
* @property {DecodePsbtInput[]} inputs - psbt input data
* @property {DecodePsbtOutput[]} outputs - psbt output data
* @property {bigint} fee? - If all utxos filled, this field has set fee amount.
*/
export interface DecodePsbtResponse {
  tx?: DecodeRawTransactionResponse;
  tx_hex?: string;
  xpubs?: PsbtGlobalXpub[];
  version?: number;
  unknown?: PsbtMapData[];
  inputs: DecodePsbtInput[];
  outputs: DecodePsbtOutput[];
  fee?: bigint;
}

/**
* psbt witness utxo
* @property {bigint} amount - psbt witness utxo
*/
export interface DecodePsbtUtxo {
  amount: bigint;
  scriptPubKey?: DecodePsbtLockingScript;
}

/**
* Request for decode transaction.
* @property {string} hex - transaction hex
* @property {string} network? - network type
* @property {boolean} iswitness? - dump witness (unused)
*/
export interface DecodeRawTransactionRequest {
  hex: string;
  network?: string;
  iswitness?: boolean;
}

/**
* @property {string} txid - txid
* @property {string} hash - transaction hash (txid or wtxid)
* @property {number} version - transaction version
* @property {number} size - transaction size
* @property {number} vsize - transaction vsize
* @property {number} weight - weight
* @property {number} locktime - locktime
* @property {DecodeRawTransactionTxIn[]} vin? - decode txin data
* @property {DecodeRawTransactionTxOut[]} vout? - txout data
*/
export interface DecodeRawTransactionResponse {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin?: DecodeRawTransactionTxIn[];
  vout?: DecodeRawTransactionTxOut[];
}

/**
* decode txin data
* @property {string} coinbase? - coinbase flag (coinbase is only)
* @property {string} txid? - utxo txid
* @property {number} vout? - utxo vout
* @property {DecodeUnlockingScript} scriptSig? - scriptsig
* @property {string[]} txinwitness? - txin witness stack
* @property {number} sequence? - sequence number
*/
export interface DecodeRawTransactionTxIn {
  coinbase?: string;
  txid?: string;
  vout?: number;
  scriptSig?: DecodeUnlockingScript;
  txinwitness?: string[];
  sequence?: number;
}

/**
* txout data
* @property {bigint} value? - satoshi amount
* @property {number} n - vout number
* @property {DecodeLockingScript} scriptPubKey? - locking script
*/
export interface DecodeRawTransactionTxOut {
  value?: bigint;
  n: number;
  scriptPubKey?: DecodeLockingScript;
}

/**
* script data
* @property {string} asm - script asm string
* @property {string} hex - script hex
*/
export interface DecodeUnlockingScript {
  asm: string;
  hex: string;
}

/**
* Request for decrypt signature on ecdsa adaptor.
* @property {string} adaptorSignature - adaptor signature hex.
* @property {string} secret - secret data
*/
export interface DecryptEcdsaAdaptorRequest {
  adaptorSignature: string;
  secret: string;
}

/**
* @property {string} keyType - contain key type (pubkey, extPubkey, extPrivkey, schnorrPubkey)
* @property {string} key - key value (hex or base58)
*/
export interface DescriptorKeyJson {
  keyType: string;
  key: string;
}

/**
* descriptor item.
* @property {number} depth - descriptor depth
* @property {string} lockingScript - locking script
* @property {string} address - address
* @property {string} hashType - hash type (p2wpkh, p2wsh, p2pkh, p2sh, p2sh-p2wpkh, p2sh-p2wsh)
* @property {string} redeemScript? - redeem script for script hash. (This field is only available when hashType is p2wsh, p2sh, or p2sh-p2wsh.)
* @property {string} keyType? - contain key type (pubkey, extPubkey, extPrivkey, schnorrPubkey)
* @property {string} key? - key value (hex or base58) (This field is only available when hashType is taproot, p2wpkh, p2pkh, or p2pk. taproot is xonly-pubkey.)
* @property {DescriptorKeyJson[]} keys? - keys included in multisig
* @property {number} reqNum? - number of required signatures to solve multisig script.
*/
export interface DescriptorScriptJson {
  depth: number;
  lockingScript: string;
  address: string;
  hashType: string;
  redeemScript?: string;
  keyType?: string;
  key?: string;
  keys?: DescriptorKeyJson[];
  reqNum?: number;
}

/**
* ecdsa adaptor signature
* @property {string} adaptorSignature - adaptor signature hex.
*/
export interface EcdsaAdaptorSignature {
  adaptorSignature: string;
}

/**
* Pegin's witness stack
* @property {bigint | number} amount - pegin amount
* @property {string} asset - pegin asset
* @property {string} mainchainGenesisBlockHash - mainchain genesis block hash.
* @property {string} claimScript - claim script
* @property {string} mainchainRawTransaction - mainchain transaction hex
* @property {string} mainchainTxoutproof - mainchain txoutproof
*/
export interface ElementsAddPeginWitness {
  amount: bigint | number;
  asset: string;
  mainchainGenesisBlockHash: string;
  claimScript: string;
  mainchainRawTransaction: string;
  mainchainTxoutproof: string;
}

/**
* Request for adding transaction
* @property {string} tx - transaction hex
* @property {TxInRequest[]} txins? - The data added to the transaction input.
* @property {ElementsPeginTxIn[]} peginTxins? - Pegin's txin data
* @property {ElementsTxOut[]} txouts? - adding txout data
* @property {ElementsDestroyAmount[]} destroyAmountTxouts? - adding destroy amount txout data
* @property {ElementsPegoutTxOut[]} pegoutTxouts? - adding pegout txout data
* @property {ElementsTxOutFee} fee? - Transaction fee data.
* @property {boolean} isRandomSortTxOut? - txout random sort after adding transaction
*/
export interface ElementsAddRawTransactionRequest {
  tx: string;
  txins?: TxInRequest[];
  peginTxins?: ElementsPeginTxIn[];
  txouts?: ElementsTxOut[];
  destroyAmountTxouts?: ElementsDestroyAmount[];
  pegoutTxouts?: ElementsPegoutTxOut[];
  fee?: ElementsTxOutFee;
  isRandomSortTxOut?: boolean;
}

/**
* Response of adding transaction.
* @property {string} hex - transaction hex
* @property {string[]} btcAddresses? - pegout address list.
*/
export interface ElementsAddRawTransactionResponse {
  hex: string;
  btcAddresses?: string[];
}

/**
* Request for create transaction
* @property {number} version? - transaction version
* @property {number} locktime? - locktime
* @property {TxInRequest[]} txins? - The data added to the transaction input.
* @property {ElementsTxOut[]} txouts? - adding txout data
* @property {ElementsTxOutFee} fee? - fee data
*/
export interface ElementsCreateRawTransactionRequest {
  version?: number;
  locktime?: number;
  txins?: TxInRequest[];
  txouts?: ElementsTxOut[];
  fee?: ElementsTxOutFee;
}

/**
* issuance data
* @property {string} assetBlindingNonce - utxo asset blinder
* @property {string} assetEntropy - asset entropy
* @property {string} contractHash? - issue original entropy data.
* @property {boolean} isreissuance - reissuance flag
* @property {string} token? - token asset
* @property {string} asset? - issued asset
* @property {bigint} assetamount? - issued satoshi amount
* @property {string} assetamountcommitment? - issued amountcommitment
* @property {bigint} tokenamount? - token amount
* @property {string} tokenamountcommitment? - token amountcommitment
* @property {string} assetRangeproof? - asset rangeproof (Displayed only when the full dump option is used.)
* @property {string} tokenRangeproof? - token rangeproof (Displayed only when the full dump option is used.)
*/
export interface ElementsDecodeIssuance {
  assetBlindingNonce: string;
  assetEntropy: string;
  contractHash?: string;
  isreissuance: boolean;
  token?: string;
  asset?: string;
  assetamount?: bigint;
  assetamountcommitment?: string;
  tokenamount?: bigint;
  tokenamountcommitment?: string;
  assetRangeproof?: string;
  tokenRangeproof?: string;
}

/**
* locking script data
* @property {string} asm? - script asm string
* @property {string} hex? - script hex
* @property {number} reqSigs? - require signature num
* @property {string} type - script type
* @property {string[]} addresses? - address list
* @property {string} pegout_chain? - pegout chain hex
* @property {string} pegout_asm? - pegout script asm string
* @property {string} pegout_hex? - pegout script hex
* @property {number} pegout_reqSigs? - pegout require signature num
* @property {string} pegout_type? - pegout script type
* @property {string[]} pegout_addresses? - pegout address list
*/
export interface ElementsDecodeLockingScript {
  asm?: string;
  hex?: string;
  reqSigs?: number;
  type: string;
  addresses?: string[];
  pegout_chain?: string;
  pegout_asm?: string;
  pegout_hex?: string;
  pegout_reqSigs?: number;
  pegout_type?: string;
  pegout_addresses?: string[];
}

/**
* Request for decode transaction.
* @property {string} hex - transaction hex
* @property {string} network? - elements network type (liquidv1, regtest)
* @property {string} mainchainNetwork? - mainchain network type (mainnet, testnet, regtest or blank. Must be set for pegout transactions.)
* @property {boolean} iswitness? - dump witness (unused)
* @property {boolean} fullDump? - tx data all dump option.
*/
export interface ElementsDecodeRawTransactionRequest {
  hex: string;
  network?: string;
  mainchainNetwork?: string;
  iswitness?: boolean;
  fullDump?: boolean;
}

/**
* Response of decode transaction.
* @property {string} txid - txid
* @property {string} hash - transaction hash
* @property {string} wtxid - witness txid
* @property {string} withash - withash
* @property {number} version - transaction version
* @property {number} size - transaction size
* @property {number} vsize - transaction vsize
* @property {number} weight - weight
* @property {number} locktime - locktime
* @property {ElementsDecodeRawTransactionTxIn[]} vin? - decode txin data
* @property {ElementsDecodeRawTransactionTxOut[]} vout? - txout data
*/
export interface ElementsDecodeRawTransactionResponse {
  txid: string;
  hash: string;
  wtxid: string;
  withash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin?: ElementsDecodeRawTransactionTxIn[];
  vout?: ElementsDecodeRawTransactionTxOut[];
}

/**
* decode txin data
* @property {string} coinbase? - coinbase flag (coinbase is only)
* @property {string} txid? - utxo txid
* @property {number} vout? - utxo vout
* @property {DecodeUnlockingScript} scriptSig? - scriptsig
* @property {boolean} is_pegin? - pegin flag
* @property {bigint} sequence? - sequence number
* @property {string[]} txinwitness? - txin witness stack
* @property {string[]} pegin_witness? - pegin witness stack
* @property {ElementsDecodeIssuance} issuance? - issuance data
*/
export interface ElementsDecodeRawTransactionTxIn {
  coinbase?: string;
  txid?: string;
  vout?: number;
  scriptSig?: DecodeUnlockingScript;
  is_pegin?: boolean;
  sequence?: bigint;
  txinwitness?: string[];
  pegin_witness?: string[];
  issuance?: ElementsDecodeIssuance;
}

/**
* txout data
* @property {bigint} value? - satoshi amount
* @property {bigint} 'value-minimum?' - blind minimum value
* @property {bigint} 'value-maximum?' - blind maximum value
* @property {number} 'ct-exponent?' - blinding exponent
* @property {number} 'ct-bits?' - blinding bits
* @property {string} surjectionproof? - surjectionproof
* @property {string} valuecommitment? - valuecommitment
* @property {string} asset? - asset
* @property {string} assetcommitment? - assetcommitment
* @property {string} commitmentnonce? - confidentialKey or commitmentnonce
* @property {boolean} commitmentnonce_fully_valid? - valid nonce
* @property {number} n - vout number
* @property {ElementsDecodeLockingScript} scriptPubKey? - locking script
* @property {string} rangeproof? - value rangeproof (Displayed only when the full dump option is used.)
*/
export interface ElementsDecodeRawTransactionTxOut {
  value?: bigint;
  'value-minimum?': bigint;
  'value-maximum?': bigint;
  'ct-exponent?': number;
  'ct-bits?': number;
  surjectionproof?: string;
  valuecommitment?: string;
  asset?: string;
  assetcommitment?: string;
  commitmentnonce?: string;
  commitmentnonce_fully_valid?: boolean;
  n: number;
  scriptPubKey?: ElementsDecodeLockingScript;
  rangeproof?: string;
}

/**
* adding destroy amount txout data
* @property {bigint | number} amount - satoshi amount
* @property {string} asset - asset
* @property {string} directNonce? - nonce for confidential key
*/
export interface ElementsDestroyAmount {
  amount: bigint | number;
  asset: string;
  directNonce?: string;
}

/**
* Pegin's txin data
* @property {boolean} isPegin? - pegin flag
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {number} sequence? - sequence number
* @property {ElementsAddPeginWitness} peginwitness - pegin witness data
* @property {boolean} isRemoveMainchainTxWitness? - (deprecated) remove mainchain txhex's witness data. (It is necessary to set true for Elements v0.18 or higher.)
*/
export interface ElementsPeginTxIn {
  isPegin?: boolean;
  txid: string;
  vout: number;
  sequence?: number;
  peginwitness: ElementsAddPeginWitness;
  isRemoveMainchainTxWitness?: boolean;
}

/**
* adding pegout txout data
* @property {bigint | number} amount - satoshi amount
* @property {string} asset - asset
* @property {string} network - mainchain network type (mainnet, testnet or regtest)
* @property {string} elementsNetwork - elements network type (liquidv1, regtest)
* @property {string} mainchainGenesisBlockHash - mainchain genesis block hash
* @property {string} btcAddress? - bitcoin address
* @property {string} onlinePubkey - online pubkey.
* @property {string} masterOnlineKey - master online privkey.
* @property {string} bitcoinDescriptor - output descriptor for pegout
* @property {number} bip32Counter - descriptor's bip32 counter.
* @property {string} whitelist - whitelist
*/
export interface ElementsPegoutTxOut {
  amount: bigint | number;
  asset: string;
  network: string;
  elementsNetwork: string;
  mainchainGenesisBlockHash: string;
  btcAddress?: string;
  onlinePubkey: string;
  masterOnlineKey: string;
  bitcoinDescriptor: string;
  bip32Counter: number;
  whitelist: string;
}

/**
* adding txout data
* @property {string} address - address
* @property {bigint | number} amount - satoshi amount
* @property {string} asset - asset
* @property {string} directLockingScript? - locking script
* @property {string} directNonce? - nonce for confidential key
* @property {boolean} isRemoveNonce? - remove nonce flag
*/
export interface ElementsTxOut {
  address: string;
  amount: bigint | number;
  asset: string;
  directLockingScript?: string;
  directNonce?: string;
  isRemoveNonce?: boolean;
}

/**
* Transaction fee data.
* @property {bigint | number} amount - satoshi amount
* @property {string} asset - asset
*/
export interface ElementsTxOutFee {
  amount: bigint | number;
  asset: string;
}

/**
* Request for encode base58
* @property {string} hex - base58 target byte hex
*/
export interface EncodeBase58Request {
  hex: string;
  hasChecksum?: boolean;
}

/**
* Response of encode base58
* @property {string} data - encoded data
*/
export interface EncodeBase58Response {
  data: string;
}

/**
* Request for encode signature.
* @property {string} signature - signature
* @property {string} sighashType - sighash type (all, none, single)
* @property {boolean} sighashAnyoneCanPay? - sighash anyone can pay
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
*/
export interface EncodeSignatureByDerRequest {
  signature: string;
  sighashType: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
}

/**
* Response of encode signature.
* @property {string} signature - encoded signature
*/
export interface EncodeSignatureByDerResponse {
  signature: string;
}

/**
* Request for encrypt on ecdsa adaptor
* @property {string} message - message data. (32-byte hash, or text message.)
* @property {boolean} isHashed? - is 32-byte hashed message.
* @property {string} privkey - private key.
* @property {string} encryptionKey - adaptor encryption key.
*/
export interface EncryptEcdsaAdaptorRequest {
  message: string;
  isHashed?: boolean;
  privkey: string;
  encryptionKey: string;
}

/**
* Error response base interface
* @property {InnerErrorResponse} error - Inner error information
*/
export interface ErrorResponse {
  error: InnerErrorResponse;
}

/**
* Request for estimate fee
* @property {SelectUtxoData[]} selectUtxos? - Select utxo
* @property {number} feeRate - network fee rate
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag. (require when you set the transaction field)
* @property {boolean} isBlind? - blind flag (This field is available only elements.)
* @property {string} feeAsset? - fee asset (This field is available only elements.)
* @property {number} exponent? - blind exponent. (This field is available only elements.)
* @property {number} minimumBits? - blind minimum bits. (This field is available only elements.)
*/
export interface EstimateFeeRequest {
  selectUtxos?: SelectUtxoData[];
  feeRate: number;
  tx: string;
  isElements?: boolean;
  isBlind?: boolean;
  feeAsset?: string;
  exponent?: number;
  minimumBits?: number;
}

/**
* Response of estimate fee
* @property {bigint} feeAmount - tx fee amount. (txoutFeeAmount + utxoFeeAmount)
* @property {bigint} txFeeAmount? - (deprecated: rename to txoutFeeAmount)
* @property {bigint} txoutFeeAmount? - fee of tx output & base area.
* @property {bigint} utxoFeeAmount? - fee of tx inputs utxo.
*/
export interface EstimateFeeResponse {
  feeAmount: bigint;
  txFeeAmount?: bigint;
  txoutFeeAmount?: bigint;
  utxoFeeAmount?: bigint;
}

/**
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {string} reason - error reason.
*/
export interface FailSignTxIn {
  txid: string;
  vout: number;
  reason: string;
}

/**
* Finalized psbt input data.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {string} finalScriptsig? - final scriptsig
* @property {string[]} final_scriptwitness? - final witness stack
*/
export interface FinalizedPsbtInputData {
  txid: string;
  vout: number;
  finalScriptsig?: string;
  final_scriptwitness?: string[];
}

/**
* Finalize PSBT input request
* @property {string} psbt - psbt data (hex or base64)
* @property {FinalizedPsbtInputData[]} inputs - Finalized psbt input data.
*/
export interface FinalizePsbtInputRequest {
  psbt: string;
  inputs: FinalizedPsbtInputData[];
}

/**
* Finalize and extract PSBT request
* @property {string} psbt - psbt (hex or base64)
* @property {boolean} extract? - If true and the transaction is complete, extract and return the complete transaction in normal network serialization instead of the PSBT.
*/
export interface FinalizePsbtRequest {
  psbt: string;
  extract?: boolean;
}

/**
* The output finalize psbt data.
* @property {string} psbt - base64 encoded psbt.
* @property {string} hex - psbt hex
* @property {string} tx - If extracted, the transaction hex is set.
* @property {boolean} complete - If the transaction has a complete set of signatures.
*/
export interface FinalizePsbtResponse {
  psbt: string;
  hex: string;
  tx: string;
  complete: boolean;
}

/**
* target amount data
* @property {string} asset - target asset
* @property {bigint | number} amount - Amount more than the specified amount is set in txout. default is 0 (disable).
* @property {string} reserveAddress - This address use when append TxOut. Also serves as a change address. (This field is available only bitcoin.)
*/
export interface FundAmountMapData {
  asset: string;
  amount: bigint | number;
  reserveAddress: string;
}

/**
* fee information
* @property {number} feeRate - network fee rate
* @property {number} longTermFeeRate? - network long-term fee rate
* @property {bigint | number} knapsackMinChange? - knapsack minimum change amount. (knapsack logic's threshold. Recommended value is 1.)
* @property {number} dustFeeRate? - excess amount to include in the fee
* @property {string} feeAsset? - fee asset (This field is available only elements.)
* @property {boolean} isBlindEstimateFee? - calculate fee on blinding tx (This field is available only elements.)
* @property {number} exponent? - blind exponent (This field is available only elements.)
* @property {number} minimumBits? - blind minimum bits (This field is available only elements.)
*/
export interface FundFeeInformation {
  feeRate: number;
  longTermFeeRate?: number;
  knapsackMinChange?: bigint | number;
  dustFeeRate?: number;
  feeAsset?: string;
  isBlindEstimateFee?: boolean;
  exponent?: number;
  minimumBits?: number;
}

/**
* Request data for fund psbt.
* @property {string} psbt - psbt (hex or base64)
* @property {FundUtxoJsonData[]} utxos - utxo data.
* @property {string} network? - network type. (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {string} reservedDescriptor? - This descriptor use when append TxOut. Also serves as a change address descriptor. (This field is available only bitcoin.)
* @property {FundFeeInformation} feeInfo? - fee information
*/
export interface FundPsbtRequest {
  psbt: string;
  utxos: FundUtxoJsonData[];
  network?: string;
  reservedDescriptor?: string;
  feeInfo?: FundFeeInformation;
}

/**
* Response data of fund transaction.
* @property {string} psbt - base64 encoded psbt.
* @property {string} hex - psbt hex
* @property {string[]} usedAddresses? - This address list was used to add TxOut.
* @property {bigint} feeAmount? - fee amount.
*/
export interface FundPsbtResponse {
  psbt: string;
  hex: string;
  usedAddresses?: string[];
  feeAmount?: bigint;
}

/**
* Request data for fund transaction.
* @property {FundUtxoJsonData[]} utxos - utxo data.
* @property {FundSelectUtxoData[]} selectUtxos? - Txin's utxo data.
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag. (require when you set the transaction field)
* @property {string} network? - network type. (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {bigint | number} targetAmount? - Amount more than the specified amount is set in txout. default is 0 (disable). (This field is available only bitcoin.)
* @property {string} reserveAddress? - This address use when append TxOut. Also serves as a change address. (This field is available only bitcoin.)
* @property {FundAmountMapData[]} targets? - target amount data
* @property {FundFeeInformation} feeInfo? - fee information
*/
export interface FundRawTransactionRequest {
  utxos: FundUtxoJsonData[];
  selectUtxos?: FundSelectUtxoData[];
  tx: string;
  isElements?: boolean;
  network?: string;
  targetAmount?: bigint | number;
  reserveAddress?: string;
  targets?: FundAmountMapData[];
  feeInfo?: FundFeeInformation;
}

/**
* Response data of fund transaction.
* @property {string} hex - transaction hex
* @property {string[]} usedAddresses? - This address list was used to add TxOut.
* @property {bigint} feeAmount? - fee amount.
*/
export interface FundRawTransactionResponse {
  hex: string;
  usedAddresses?: string[];
  feeAmount?: bigint;
}

/**
* Txin's utxo data.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {string} address - address
* @property {bigint | number} amount - satoshi amount.
* @property {string} asset? - asset id. (This field is available only elements utxo.)
* @property {string} redeemScript? - redeem script (This field is available only p2sh or p2wsh.)
* @property {string} descriptor? - output descriptor. (descriptor is required, you needs to consider fee amount)
* @property {boolean} isIssuance? - use issuance (This field is available only elements.)
* @property {boolean} isBlindIssuance? - use issuance's blind (This field is available only elements.)
* @property {boolean} isPegin? - use pegin (This field is available only elements.)
* @property {number} peginBtcTxSize? - pegin's btc transaction size (This field is available only elements.)
* @property {number} peginTxOutProofSize? - pegin's btc txoutproof size (This field is available only elements.)
* @property {string} claimScript? - claim script (This field is available only elements.)
* @property {string} fedpegScript? - (deprecated)fedpeg script
* @property {string} scriptSigTemplate? - ScriptSig template is for scriptHash calculation fee.
*/
export interface FundSelectUtxoData {
  txid: string;
  vout: number;
  address: string;
  amount: bigint | number;
  asset?: string;
  redeemScript?: string;
  descriptor?: string;
  isIssuance?: boolean;
  isBlindIssuance?: boolean;
  isPegin?: boolean;
  peginBtcTxSize?: number;
  peginTxOutProofSize?: number;
  claimScript?: string;
  fedpegScript?: string;
  scriptSigTemplate?: string;
}

/**
* utxo data.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {string} address - address
* @property {bigint | number} amount - satoshi amount.
* @property {string} asset? - asset id. (This field is available only elements utxo.)
* @property {string} descriptor? - output descriptor. (descriptor is required, you needs to consider fee amount)
* @property {string} scriptSigTemplate? - ScriptSig template is for scriptHash calculation fee.
*/
export interface FundUtxoJsonData {
  txid: string;
  vout: number;
  address: string;
  amount: bigint | number;
  asset?: string;
  descriptor?: string;
  scriptSigTemplate?: string;
}

/**
* Request for get addresses from multisig script.
* @property {boolean} isElements? - elements transaction flag.
* @property {string} redeemScript - redeem script on multisig
* @property {string} network? - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {string} hashType? - hash type. (p2wpkh, p2pkh, p2sh-p2wpkh)
*/
export interface GetAddressesFromMultisigRequest {
  isElements?: boolean;
  redeemScript: string;
  network?: string;
  hashType?: string;
}

/**
* Response of get addresses from multisig script.
* @property {string[]} addresses - address list
* @property {string[]} pubkeys - pubkey list
* @property {number} requireNum - multisig script's require signature num.
*/
export interface GetAddressesFromMultisigResponse {
  addresses: string[];
  pubkeys: string[];
  requireNum: number;
}

/**
* Request for get address information.
* @property {string} address - address text
* @property {boolean} isElements? - elements transaction flag.
*/
export interface GetAddressInfoRequest {
  address: string;
  isElements?: boolean;
}

/**
* Response of get address information.
* @property {string} lockingScript - locking script
* @property {string} network - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {string} hashType - hash type (p2wpkh, p2pkh, p2wsh, p2sh(contain p2sh-segwit), taproot)
* @property {number} witnessVersion? - witness version. (none:field empty, versionX:X(0 - 16))
* @property {string} hash? - pubkey-hash or script-hash. p2wsh:32byte, other:20byte
*/
export interface GetAddressInfoResponse {
  lockingScript: string;
  network: string;
  hashType: string;
  witnessVersion?: number;
  hash?: string;
}

/**
* Request for get commitment.
* @property {bigint | number} amount - satoshi amount
* @property {string} asset - asset
* @property {string} assetBlindFactor - asset blind factor
* @property {string} blindFactor - amount blind factor
*/
export interface GetCommitmentRequest {
  amount: bigint | number;
  asset: string;
  assetBlindFactor: string;
  blindFactor: string;
}

/**
* Response of get commitment.
* @property {string} assetCommitment - asset commitment
* @property {string} amountCommitment - amount commitment
*/
export interface GetCommitmentResponse {
  assetCommitment: string;
  amountCommitment: string;
}

/**
* Request for get confidential address.
* @property {string} unblindedAddress - unblinded address
* @property {string} key - confidential key
*/
export interface GetConfidentialAddressRequest {
  unblindedAddress: string;
  key: string;
}

/**
* Response of get confidential address.
* @property {string} confidentialAddress - confidential address
*/
export interface GetConfidentialAddressResponse {
  confidentialAddress: string;
}

/**
* Request for get default blinding key.
* @property {string} masterBlindingKey - master blinding key
* @property {string} lockingScript? - locking script
* @property {string} address? - use if empty locking script.
*/
export interface GetDefaultBlindingKeyRequest {
  masterBlindingKey: string;
  lockingScript?: string;
  address?: string;
}

/**
* Request extkey.
* @property {string} extkey - extkey
*/
export interface GetExtkeyInfoRequest {
  extkey: string;
}

/**
* Response of get extkey information.
* @property {string} network - network type
* @property {string} version - version information
* @property {number} depth - depth
* @property {string} fingerprint - fingerprint
* @property {number} childNumber - bip32 child number
* @property {string} chainCode - chain code
* @property {string} keyType - extkey type (extpubkey, extprivkey)
*/
export interface GetExtkeyInfoResponse {
  network: string;
  version: string;
  depth: number;
  fingerprint: string;
  childNumber: number;
  chainCode: string;
  keyType: string;
}

/**
* @property {number} index - index (on the first)
* @property {number[]} indexes? - index list
*/
export interface GetIndexData {
  index: number;
  indexes?: number[];
}

/**
* Request for get issuance blinding key.
* @property {string} masterBlindingKey - master blinding key
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
*/
export interface GetIssuanceBlindingKeyRequest {
  masterBlindingKey: string;
  txid: string;
  vout: number;
}

/**
* Request for get mnemonic word list
* @property {string} language - mnemonic language (support [en es fr it jp zhs zht])
*/
export interface GetMnemonicWordlistRequest {
  language: string;
}

/**
* Response of get mnemonic word list
* @property {string[]} wordlist - mnemonic word list
*/
export interface GetMnemonicWordlistResponse {
  wordlist: string[];
}

/**
* Request for get privkey from extkey
* @property {string} extkey - extkey
* @property {string} network - network type (mainnet, testnet or regtest)
* @property {boolean} wif - use wallet import format
* @property {boolean} isCompressed? - compressed flag
*/
export interface GetPrivkeyFromExtkeyRequest {
  extkey: string;
  network: string;
  wif: boolean;
  isCompressed?: boolean;
}

/**
* Response of get privkey from extkey
* @property {string} privkey - privkey (wif or hex)
*/
export interface GetPrivkeyFromExtkeyResponse {
  privkey: string;
}

/**
* Request for get pubkey from extkey.
* @property {string} extkey - extkey
* @property {string} network - network type (mainnet, testnet or regtest)
*/
export interface GetPubkeyFromExtkeyRequest {
  extkey: string;
  network: string;
}

/**
* Request for get pubkey from privkey.
* @property {string} privkey - privkey (wif or hex)
* @property {boolean} isCompressed? - compressed pubkey flag
*/
export interface GetPubkeyFromPrivkeyRequest {
  privkey: string;
  isCompressed?: boolean;
}

/**
* Request to get a Schnorr pubkey from privkey.
* @property {string} privkey - privkey (wif or hex)
*/
export interface GetSchnorrPubkeyFromPrivkeyRequest {
  privkey: string;
}

/**
* Request for get signature hash.
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {GetSighashTxIn} txin - txin data
* @property {UtxoObject[]} utxos - UTXO data.
* @property {string} genesisBlockHash? - genesis block hash (for elements taproot)
*/
export interface GetSighashRequest {
  tx: string;
  isElements?: boolean;
  txin: GetSighashTxIn;
  utxos: UtxoObject[];
  genesisBlockHash?: string;
}

/**
* txin data
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {HashKeyData} keyData - key data
* @property {string} hashType - hash type (taproot, p2wpkh, p2wsh, p2pkh, p2sh, p2sh-p2wpkh, p2sh-p2wsh)
* @property {string} sighashType? - signature hash type. (default(for taproot), all, none, single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag.
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
* @property {string} annex? - taproot annex bytes.
* @property {bigint | number} codeSeparatorPosition? - (for tapscript) OP_CODESEPARATOR position.
*/
export interface GetSighashTxIn {
  txid: string;
  vout: number;
  keyData: HashKeyData;
  hashType: string;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
  annex?: string;
  codeSeparatorPosition?: bigint | number;
}

/**
* Request for get supported function.
* @property {boolean} bitcoin - bitcoin support flag
* @property {boolean} elements - elements support flag
*/
export interface GetSupportedFunctionResponse {
  bitcoin: boolean;
  elements: boolean;
}

/**
* Request for get TapBranch info.
* @property {string} network? - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {boolean} isElements? - elements transaction flag.
* @property {string} treeString - tree serialize string. (cfd format)
* @property {string} tapscript? - tapscript hex.
* @property {string[]} nodes? - target tapbranches hash list. If exist the same tapscript in this tree, you can search for the target tapscript by specifying a hash list of tapbranches.
* @property {number} index - branch index.
*/
export interface GetTapBranchInfoRequest {
  network?: string;
  isElements?: boolean;
  treeString: string;
  tapscript?: string;
  nodes?: string[];
  index: number;
}

/**
* Request for get tapscript info.
* @property {string} network? - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {boolean} isElements? - elements transaction flag.
* @property {string} internalPubkey? - internal schnorr pubkey.
* @property {string} internalPrivkey? - internal privkey. Specify only when it is necessary to calculate.
* @property {TapBranchData[]} tree - TapBranch data.
*/
export interface GetTapScriptTreeInfoRequest {
  network?: string;
  isElements?: boolean;
  internalPubkey?: string;
  internalPrivkey?: string;
  tree: TapBranchData[];
}

/**
* Request for get txin index.
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
*/
export interface GetTxInIndexRequest {
  tx: string;
  isElements?: boolean;
  txid: string;
  vout: number;
}

/**
* Request for get txout index.
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {string} address? - target address
* @property {string} directLockingScript? - target locking script
*/
export interface GetTxOutIndexRequest {
  tx: string;
  isElements?: boolean;
  address?: string;
  directLockingScript?: string;
}

/**
* Request for get unblind data.
* @property {string} blindingKey - blinding key
* @property {string} lockingScript - locking script
* @property {string} assetCommitment - asset commitment
* @property {string} valueCommitment - value commitment
* @property {string} commitmentNonce - nonce
* @property {string} rangeproof - rangeproof
*/
export interface GetUnblindDataRequest {
  blindingKey: string;
  lockingScript: string;
  assetCommitment: string;
  valueCommitment: string;
  commitmentNonce: string;
  rangeproof: string;
}

/**
* Request for get unblinded address.
* @property {string} confidentialAddress - confidential address
*/
export interface GetUnblindedAddressRequest {
  confidentialAddress: string;
}

/**
* Response of get unblinded address.
* @property {string} unblindedAddress - unblinded address
* @property {string} confidentialKey - confidential key
*/
export interface GetUnblindedAddressResponse {
  unblindedAddress: string;
  confidentialKey: string;
}

/**
* Request for get witness stack count.
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {TxInRequest} txin - target txin
*/
export interface GetWitnessStackNumRequest {
  tx: string;
  isElements?: boolean;
  txin: TxInRequest;
}

/** @property {number} count - witness stack count */
export interface GetWitnessStackNumResponse {
  count: number;
}

/**
* Hash data based key
* @property {string} hex - hex data
* @property {string} type - data type. (pubkey or redeem_script)
*/
export interface HashKeyData {
  hex: string;
  type: string;
}

/**
* Request for hash message
* @property {string} algorithm - hash algorithm. (hash160, hash256, sha256, ripemd160)
* @property {string} message - Set hex string or text string.
* @property {boolean} hasText? - Specify true if the message is text string. (default: false)
*/
export interface HashMessageRequest {
  algorithm: string;
  message: string;
  hasText?: boolean;
}

/**
* Hex data.
* @property {string} hex - hex string
*/
export interface HexData {
  hex: string;
}

/**
* Inner error information
* @property {number} code - require
* @property {string} type - require
* @property {string} message - error message
*/
export interface InnerErrorResponse {
  code: number;
  type: string;
  message: string;
}

/**
* Request to check finalized input.
* @property {string} psbt - psbt data (hex or base64)
* @property {OutPoint[]} outPointList? - OutPoint data.
*/
export interface IsFinalizedPsbtRequest {
  psbt: string;
  outPointList?: OutPoint[];
}

/**
* The output finalized check.
* @property {boolean} success - target all finalized flag.
* @property {boolean} finalizedAll - all finalized flag.
* @property {OutPoint[]} failInputs? - OutPoint data.
*/
export interface IsFinalizedPsbtResponse {
  success: boolean;
  finalizedAll: boolean;
  failInputs?: OutPoint[];
}

/**
* issuance data
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {bigint | number} assetAmount - asset amount
* @property {string} assetAddress - send asset address
* @property {bigint | number} tokenAmount - token amount
* @property {string} tokenAddress - send token address
* @property {boolean} isBlind? - blind issue/reissue
* @property {string} contractHash? - contract hash
* @property {boolean} isRemoveNonce? - remove nonce flag.
*/
export interface IssuanceDataRequest {
  txid: string;
  vout: number;
  assetAmount: bigint | number;
  assetAddress: string;
  tokenAmount: bigint | number;
  tokenAddress: string;
  isBlind?: boolean;
  contractHash?: string;
  isRemoveNonce?: boolean;
}

/**
* issuance data
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {string} asset - issued asset
* @property {string} entropy - issuance entropy
* @property {string} token? - token asset
*/
export interface IssuanceDataResponse {
  txid: string;
  vout: number;
  asset: string;
  entropy: string;
  token?: string;
}

/**
* key prefix customize data.
* @property {string} IsMainnet? - mainnet flag. true is 'true' or empty.
* @property {string} wif - wif prefix
* @property {string} bip32xpub - bip32xpub version
* @property {string} bip32xprv - bip32xprv version
* @property {string} bip49ypub? - bip49ypub version
* @property {string} bip49yprv? - bip49yprv version
* @property {string} bip84zpub? - bip84zpub version
* @property {string} bip84zprv? - bip84zprv version
*/
export interface KeyPrefixCustomizeData {
  IsMainnet?: string;
  wif: string;
  bip32xpub: string;
  bip32xprv: string;
  bip49ypub?: string;
  bip49yprv?: string;
  bip84zpub?: string;
  bip84zprv?: string;
}

/**
* OutPoint data.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
*/
export interface OutPoint {
  txid: string;
  vout: number;
}

/**
* The data containing output descriptor.
* @property {string} descriptor - output descriptor.
*/
export interface OutputDescriptorResponse {
  descriptor: string;
}

/**
* privkey data.
* @property {string} privkey - privkey hex
*/
export interface OutputPrivkeyData {
  privkey: string;
}

/**
* Request for parse output descriptor.
* @property {boolean} isElements? - elements flag.
* @property {string} descriptor - output descriptor
* @property {string} network? - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {string} bip32DerivationPath? - bip32 derive path
*/
export interface ParseDescriptorRequest {
  isElements?: boolean;
  descriptor: string;
  network?: string;
  bip32DerivationPath?: string;
}

/**
* Response of parse output descriptor.
* @property {string} type - descriptor type.
* @property {string} address? - address (This field is only available for types other than `raw`.)
* @property {string} lockingScript - locking script
* @property {string} hashType? - hash type (p2wpkh, p2wsh, p2pkh, p2sh, p2sh-p2wpkh, p2sh-p2wsh, taproot)
* @property {string} redeemScript? - redeem script on script hash. (This field is only available when hashType is p2wsh, p2sh, or p2sh-p2wsh.)
* @property {boolean} includeMultisig - multisig flag (whether multisig descriptor is included in scripts stack)
* @property {string} treeString? - taproot script tree serialize string. (cfd format)
* @property {string} tapTweak? - tapTweak by scriptTree & internalPubkey.
* @property {DescriptorKeyJson[]} keys? - key list
* @property {DescriptorScriptJson[]} scripts? - descriptor item.
*/
export interface ParseDescriptorResponse {
  type: string;
  address?: string;
  lockingScript: string;
  hashType?: string;
  redeemScript?: string;
  includeMultisig: boolean;
  treeString?: string;
  tapTweak?: string;
  keys?: DescriptorKeyJson[];
  scripts?: DescriptorScriptJson[];
}

/**
* Request for parse script
* @property {string} script - script hex.
*/
export interface ParseScriptRequest {
  script: string;
}

/**
* Response of parse script
* @property {string[]} scriptItems - parse script item. (First level's item only)
*/
export interface ParseScriptResponse {
  scriptItems: string[];
}

/**
* private key data.
* @property {string} privkey - private key. set is wif or hex.
* @property {boolean} wif? - use wif flag. true is wif, false is hex.
* @property {string} network? - wif network type. (mainnet, testnet or regtest)
* @property {boolean} isCompressed? - wif compressed flag
*/
export interface PrivkeyData {
  privkey: string;
  wif?: boolean;
  network?: string;
  isCompressed?: boolean;
}

/**
* Response of get privkey from wif.
* @property {string} hex - privkey hex.
* @property {string} network - network type (mainnet, testnet or regtest)
* @property {boolean} isCompressed - compressed pubkey flag
*/
export interface PrivkeyHexData {
  hex: string;
  network: string;
  isCompressed: boolean;
}

/**
* Request for get privkey from wif.
* @property {string} wif - Wallet Import Format
*/
export interface PrivkeyWifData {
  wif: string;
}

/**
* request for add psbt input.
* @property {TxInRequest} txin - This is added to the transaction input.
* @property {PsbtInputRequestData} input - psbt input data
*/
export interface PsbtAddInputRequest {
  txin: TxInRequest;
  input: PsbtInputRequestData;
}

/**
* request for add psbt output.
* @property {TxOutRequest} txout - This is added to the transaction output.
* @property {PsbtOutputRequestData} output - psbt output data
*/
export interface PsbtAddOutputRequest {
  txout: TxOutRequest;
  output: PsbtOutputRequestData;
}

/**
* psbt script data
* @property {string} pubkey - pubkey hex
* @property {string} master_fingerprint - master pubkey fingerprint.
* @property {string} path - bip32 path.
* @property {string} descriptor? - If hasDetail is true, the descriptor pubkey string is set.
*/
export interface PsbtBip32Data {
  pubkey: string;
  master_fingerprint: string;
  path: string;
  descriptor?: string;
}

/**
* psbt bip32 pubkey data
* @property {string} descriptor? - the descriptor pubkey string.
* @property {string} pubkey? - pubkey hex. If the descriptor set, this field not reference.
* @property {string} master_fingerprint? - master pubkey fingerprint. If the descriptor set, this field not reference.
* @property {string} path? - bip32 path. If the descriptor set, this field not reference.
*/
export interface PsbtBip32PubkeyInput {
  descriptor?: string;
  pubkey?: string;
  master_fingerprint?: string;
  path?: string;
}

/**
* psbt global request data.
* @property {PsbtGlobalXpubInput[]} xpubs? - psbt global xpub data
* @property {PsbtMapData[]} unknown? - psbt map data.
*/
export interface PsbtGlobalRequestData {
  xpubs?: PsbtGlobalXpubInput[];
  unknown?: PsbtMapData[];
}

/**
* psbt global xpub data
* @property {XpubData} xpub - xpub data
* @property {string} master_fingerprint - master pubkey fingerprint.
* @property {string} path - bip32 path.
* @property {string} descriptorXpub - the descriptor xpub string.
*/
export interface PsbtGlobalXpub {
  xpub: XpubData;
  master_fingerprint: string;
  path: string;
  descriptorXpub: string;
}

/**
* psbt global xpub data
* @property {string} descriptorXpub? - the descriptor xpub string.
* @property {string} xpub? - xpub (base58 or hex). If the descriptor set, this field not reference.
* @property {string} master_fingerprint? - master pubkey fingerprint. If the descriptor set, this field not reference.
* @property {string} path? - bip32 path. If the descriptor set, this field not reference.
*/
export interface PsbtGlobalXpubInput {
  descriptorXpub?: string;
  xpub?: string;
  master_fingerprint?: string;
  path?: string;
}

/**
* psbt input request.
* @property {OutPoint} outpoint? - outpoint.
* @property {number} index? - psbt input index. If the outpoint set, this field not reference.
* @property {PsbtInputRequestData} input - psbt input data
*/
export interface PsbtInputRequest {
  outpoint?: OutPoint;
  index?: number;
  input: PsbtInputRequestData;
}

/**
* psbt input request data.
* @property {string} utxoFullTx? - utxo full tx hex. (for not witness utxo.)
* @property {TxOutRequest} witnessUtxo? - witness utxo data.
* @property {string} redeemScript? - redeem script or witness script
* @property {PsbtBip32PubkeyInput[]} bip32Derives? - psbt bip32 pubkey data
* @property {string} sighash? - sighash type (ALL, SINGLE, NONE, 'ALL|ANYONECANPAY', 'SINGLE|ANYONECANPAY', 'NONE|ANYONECANPAY')
* @property {PsbtSignatureData[]} partialSignature? - psbt signature data.
* @property {PsbtMapData[]} unknown? - psbt map data.
*/
export interface PsbtInputRequestData {
  utxoFullTx?: string;
  witnessUtxo?: TxOutRequest;
  redeemScript?: string;
  bip32Derives?: PsbtBip32PubkeyInput[];
  sighash?: string;
  partialSignature?: PsbtSignatureData[];
  unknown?: PsbtMapData[];
}

/**
* psbt List.
* @property {string[]} psbts - psbt list data (hex or base64)
*/
export interface PsbtList {
  psbts: string[];
}

/**
* psbt map data.
* @property {string} key - key hex
* @property {string} value - value hex
*/
export interface PsbtMapData {
  key: string;
  value: string;
}

/**
* psbt output data.
* @property {string} psbt - base64 encoded psbt.
* @property {string} hex - psbt hex
*/
export interface PsbtOutputData {
  psbt: string;
  hex: string;
}

/**
* psbt output request.
* @property {number} index - psbt output index.
* @property {PsbtOutputRequestData} output - psbt output data
*/
export interface PsbtOutputRequest {
  index: number;
  output: PsbtOutputRequestData;
}

/**
* psbt output request data.
* @property {string} redeemScript? - redeem script or witness script
* @property {PsbtBip32PubkeyInput[]} bip32Derives? - psbt bip32 pubkey data
* @property {PsbtMapData[]} unknown? - psbt map data.
*/
export interface PsbtOutputRequestData {
  redeemScript?: string;
  bip32Derives?: PsbtBip32PubkeyInput[];
  unknown?: PsbtMapData[];
}

/**
* psbt record data.
* @property {number} index? - psbt input/output index. If type is global, this field not reference.
* @property {string} type - field type. (global, input, output)
* @property {string} key - key hex
* @property {string} value - value hex
*/
export interface PsbtRecordData {
  index?: number;
  type: string;
  key: string;
  value: string;
}

/**
* psbt script data
* @property {string} asm - script asm string
* @property {string} hex - script hex
* @property {string} type? - script type
*/
export interface PsbtScriptData {
  asm: string;
  hex: string;
  type?: string;
}

/**
* psbt signature data.
* @property {string} pubkey? - pubkey hex
* @property {string} signature? - signature hex
*/
export interface PsbtSignatureData {
  pubkey?: string;
  signature?: string;
}

/**
* Response pubkey data.
* @property {string} pubkey - pubkey
*/
export interface PubkeyData {
  pubkey: string;
}

/**
* pubkey list data
* @property {string[]} pubkeys - public key list
*/
export interface PubkeyListData {
  pubkeys: string[];
}

/**
* pubkey signature data.
* @property {string} hex - signature hex
* @property {string} type? - hex data type (sign only)
* @property {boolean} derEncode? - use der-encode
* @property {string} sighashType? - sighash type (all, none or single)
* @property {boolean} sighashAnyoneCanPay? - sighash anyone can pay flag
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
* @property {string} relatedPubkey? - related pubkey
*/
export interface PubkeySignData {
  hex: string;
  type?: string;
  derEncode?: boolean;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
  relatedPubkey?: string;
}

/**
* The output transaction data.
* @property {string} hex - transaction hex.
*/
export interface RawTransactionResponse {
  hex: string;
}

/**
* Request for recover secret data on ecdsa adaptor.
* @property {string} adaptorSignature - adaptor signature hex.
* @property {string} signature - signature hex.
* @property {string} encryptionKey - adaptor encryption key
*/
export interface RecoverEcdsaAdaptorRequest {
  adaptorSignature: string;
  signature: string;
  encryptionKey: string;
}

/**
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {bigint | number} amount - asset amount
* @property {string} address - send asset address
* @property {string} assetBlindingNonce - utxo asset blinder
* @property {string} assetEntropy - issuance entropy
* @property {boolean} isRemoveNonce? - remove nonce flag.
*/
export interface ReissuanceDataRequest {
  txid: string;
  vout: number;
  amount: bigint | number;
  address: string;
  assetBlindingNonce: string;
  assetEntropy: string;
  isRemoveNonce?: boolean;
}

/**
* schnorr pubkey data.
* @property {string} pubkey - schnorr public key
* @property {boolean} parity - y-parity flag
* @property {string} privkey - privkey hex
*/
export interface SchnorrKeyPairData {
  pubkey: string;
  parity: boolean;
  privkey: string;
}

/**
* Schnorr pubkey data.
* @property {string} pubkey - schnorr public key
* @property {boolean} parity - y-parity flag
*/
export interface SchnorrPubkeyData {
  pubkey: string;
  parity: boolean;
}

/** Request for creating a Schnorr signature. */
export interface SchnorrSignRequest {
  privkey: string;
  message: string;
  isHashed?: boolean;
  nonceOrAux: string;
  isNonce?: boolean;
}

/**
* Contains the generated Schnorr signature.
* @property {string} hex - signature hex.
*/
export interface SchnorrSignResponse {
  hex: string;
}

/**
* Contains the validation result
* @property {boolean} valid - whether the signature is valid.
*/
export interface SchnorrVerifyResponse {
  valid: boolean;
}

/** The data containing script. */
export interface ScriptDataResponse {
  hex: string;
}

/**
* Response of extract secret.
* @property {string} secret - secret data
*/
export interface SecretData {
  secret: string;
}

/**
* Select utxo
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {string} asset? - asset (This field is available only elements utxo.)
* @property {string} redeemScript? - redeem script (This field is available only p2sh or p2wsh.)
* @property {string} descriptor? - output descriptor (descriptor is required, you needs to consider fee amount)
* @property {boolean} isIssuance? - issuance flag (This field is available only elements.)
* @property {boolean} isBlindIssuance? - blind issuance flag. (This field is available only elements.)
* @property {boolean} isPegin? - use pegin utxo. (This field is available only elements.)
* @property {bigint | number} peginBtcTxSize? - pegin btc transaction size (This field is available only elements.)
* @property {number} peginTxOutProofSize? - pegin's btc txoutproof size (This field is available only elements.)
* @property {string} claimScript? - claim script (This field is available only elements.)
* @property {string} fedpegScript? - (deprecated)fedpeg script
* @property {string} scriptSigTemplate? - ScriptSig template is for scriptHash calculation fee.
*/
export interface SelectUtxoData {
  txid: string;
  vout: number;
  asset?: string;
  redeemScript?: string;
  descriptor?: string;
  isIssuance?: boolean;
  isBlindIssuance?: boolean;
  isPegin?: boolean;
  peginBtcTxSize?: bigint | number;
  peginTxOutProofSize?: number;
  claimScript?: string;
  fedpegScript?: string;
  scriptSigTemplate?: string;
}

/**
* Request data for selecting utxo.
* @property {UtxoJsonData[]} utxos - utxo data.
* @property {bigint | number} targetAmount? - Amount more than the specified amount is set in txout. default is 0 (disable). (This field is available only bitcoin.)
* @property {boolean} isElements? - elements transaction flag.
* @property {TargetAmountMapData[]} targets? - target amount data.
* @property {CoinSelectionFeeInformationField} feeInfo? - fee information.
*/
export interface SelectUtxosRequest {
  utxos: UtxoJsonData[];
  targetAmount?: bigint | number;
  isElements?: boolean;
  targets?: TargetAmountMapData[];
  feeInfo?: CoinSelectionFeeInformationField;
}

/**
* Response data of selecting utxo.
* @property {UtxoJsonData[]} utxos - utxo list.
* @property {bigint} selectedAmount? - selected amount.
* @property {TargetAmountMapData[]} selectedAmounts? - target amount data.
* @property {bigint} feeAmount? - fee amount. (This field is available only searched by BnB algorithm.)
* @property {bigint} utxoFeeAmount - utxo's fee amount.
*/
export interface SelectUtxosResponse {
  utxos: UtxoJsonData[];
  selectedAmount?: bigint;
  selectedAmounts?: TargetAmountMapData[];
  feeAmount?: bigint;
  utxoFeeAmount: bigint;
}

/**
* Request for serialize ledger format.
* @property {string} tx - transaction hex
* @property {SerializeLedgerFormatTxOut[]} txouts? - Txout data.
* @property {boolean} skipWitness? - skip witness flag.
* @property {boolean} isAuthorization - authorization flag.
*/
export interface SerializeLedgerFormatRequest {
  tx: string;
  txouts?: SerializeLedgerFormatTxOut[];
  skipWitness?: boolean;
  isAuthorization: boolean;
}

/**
* Response of serialize ledger format.
* @property {string} serialize - (unused) serialized value.
* @property {string} sha256 - sha256 hashed value.
*/
export interface SerializeLedgerFormatResponse {
  serialize: string;
  sha256: string;
}

/**
* Txout data.
* @property {number} index - txout index
* @property {string} asset - asset
* @property {bigint | number} amount - satoshi amount
*/
export interface SerializeLedgerFormatTxOut {
  index: number;
  asset: string;
  amount: bigint | number;
}

/**
* Request for custom prefix setting.
* @property {AddressPrefixCustomizeData[]} addressJsonDatas? - address prefix customize data.
* @property {KeyPrefixCustomizeData[]} keyJsonDatas? - key prefix customize data.
*/
export interface SetCustomPrefixRequest {
  addressJsonDatas?: AddressPrefixCustomizeData[];
  keyJsonDatas?: KeyPrefixCustomizeData[];
}

/**
* request for set psbt record
* @property {string} psbt - psbt data (hex or base64)
* @property {PsbtRecordData[]} records - psbt record data.
*/
export interface SetPsbtRecordRequest {
  psbt: string;
  records: PsbtRecordData[];
}

/**
* request for set psbt data.
* @property {string} psbt - psbt data (hex or base64)
* @property {PsbtInputRequest[]} inputs? - psbt input request.
* @property {PsbtOutputRequest[]} outputs? - psbt output request.
* @property {PsbtGlobalRequestData} global? - psbt global data
*/
export interface SetPsbtRequest {
  psbt: string;
  inputs?: PsbtInputRequest[];
  outputs?: PsbtOutputRequest[];
  global?: PsbtGlobalRequestData;
}

/**
* Request for set issue asset.
* @property {string} tx - transaction hex
* @property {boolean} isRandomSortTxOut? - txout random sort after adding transaction
* @property {IssuanceDataRequest[]} issuances - issuance data
*/
export interface SetRawIssueAssetRequest {
  tx: string;
  isRandomSortTxOut?: boolean;
  issuances: IssuanceDataRequest[];
}

/**
* Response of set issue asset.
* @property {string} hex - transaction hex
* @property {IssuanceDataResponse[]} issuances - issuance data
*/
export interface SetRawIssueAssetResponse {
  hex: string;
  issuances: IssuanceDataResponse[];
}

/**
* Request for set reissue asset.
* @property {string} tx - transaction hex
* @property {boolean} isRandomSortTxOut? - txout random sort after adding transaction
* @property {ReissuanceDataRequest[]} issuances - reissuance txin data
*/
export interface SetRawReissueAssetRequest {
  tx: string;
  isRandomSortTxOut?: boolean;
  issuances: ReissuanceDataRequest[];
}

/**
* Response of set reissue asset.
* @property {string} hex - transaction hex
* @property {IssuanceDataResponse[]} issuances - issuance data
*/
export interface SetRawReissueAssetResponse {
  hex: string;
  issuances: IssuanceDataResponse[];
}

/**
* The data containing signature.
* @property {string} signature - signature
*/
export interface SignatureDataResponse {
  signature: string;
}

/**
* The sign data.
* @property {string} hex - If the type is auto or op_code, character string input is enabled. Others are hex byte array only.
* @property {string} type? - parameter type. (binary, sign)
* @property {boolean} derEncode? - der encode option flag. Valid when type is auto or sign.
* @property {string} sighashType? - signature hash type. (all, none, single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag.
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
*/
export interface SignData {
  hex: string;
  type?: string;
  derEncode?: boolean;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
}

/**
* Request for sign message.
* @property {string} privkey - private key. set is wif or hex.
* @property {string} message - message
* @property {string} magic? - message magic word. default is empty (set bitcoin magic word.)
*/
export interface SignMessageRequest {
  privkey: string;
  message: string;
  magic?: string;
}

/**
* Response of signed message.
* @property {string} signature - signature
* @property {string} base64 - base64 encoded signature
*/
export interface SignMessageResponse {
  signature: string;
  base64: string;
}

/**
* Sign psbt data.
* @property {string} psbt - psbt data (hex or base64)
* @property {string} privkey - private key. hex or wif format.
* @property {boolean} hasGrindR? - grind-r option
*/
export interface SignPsbtRequest {
  psbt: string;
  privkey: string;
  hasGrindR?: boolean;
}

/**
* Request for add sign with privkey
* @property {boolean} isElements? - elements transaction flag.
* @property {string} tx - transaction hex
* @property {UtxoObject[]} utxos? - UTXO data.
* @property {string} genesisBlockHash? - genesis block hash (for elements taproot)
*/
export interface SignWithPrivkeyRequest {
  isElements?: boolean;
  tx: string;
  txin?: SignWithPrivkeyTxInRequest;
  utxos?: UtxoObject[];
  genesisBlockHash?: string;
}

/**
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {string} privkey - private key. hex or wif format.
* @property {string} pubkey? - public key. if empty, generate from privkey.
* @property {string} hashType - hash type (taproot, p2pkh, p2wpkh or p2sh-p2wpkh)
* @property {string} sighashType? - signature hash type. (default(for taproot), all, none or single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag.
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
* @property {bigint | number} amount? - satoshi amount. Use only when utxos is not set. (need either amount or confidentialValueCommitment)
* @property {string} confidentialValueCommitment? - value commitment. Use only when utxos is not set. (need either amount or confidentialValueCommitment)
* @property {boolean} isGrindR? - grind-R flag
* @property {string} auxRand? - taproot signed random 32byte nonce.
* @property {string} annex? - taproot annex bytes.
*/
export interface SignWithPrivkeyTxInRequest {
  txid: string;
  vout: number;
  privkey: string;
  pubkey?: string;
  hashType: string;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
  amount?: bigint | number;
  confidentialValueCommitment?: string;
  isGrindR?: boolean;
  auxRand?: string;
  annex?: string;
}

/**
* add txout data for split
* @property {bigint | number} amount - satoshi amount
* @property {string} address? - target address (or confidential address)
* @property {string} directLockingScript? - target locking script
* @property {string} directNonce? - add nonce data (elements only)
*/
export interface SplitTxOutData {
  amount: bigint | number;
  address?: string;
  directLockingScript?: string;
  directNonce?: string;
}

/**
* Request for split txout.
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {number} index - split target txout index.
* @property {SplitTxOutData[]} txouts - add txout data for split
*/
export interface SplitTxOutRequest {
  tx: string;
  isElements?: boolean;
  index: number;
  txouts: SplitTxOutData[];
}

/**
* TapBranch data.
* @property {string} tapscript? - tapscript hex.
* @property {string} branchHash? - tapbranch hash only. (to hide the tapscript)
* @property {string} treeString? - tree serialize string. (cfd format)
*/
export interface TapBranchData {
  tapscript?: string;
  branchHash?: string;
  treeString?: string;
}

/**
* TapBranch information
* @property {string} topBranchHash - branch hash on the top.
* @property {string[]} nodes? - tapbranch list in this tree.
* @property {string} treeString - tree serialize string. (cfd format)
*/
export interface TapBranchInfo {
  topBranchHash: string;
  nodes?: string[];
  treeString: string;
}

/**
* Request for get tapscript info.
* @property {string} network? - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {boolean} isElements? - elements transaction flag.
* @property {string} treeString - tree serialize string. (cfd format)
* @property {string} tapscript? - tapscript hex.
* @property {string} internalPubkey? - internal schnorr pubkey.
* @property {string} internalPrivkey? - internal privkey. Specify only when it is necessary to calculate.
* @property {string[]} nodes? - target tapbranches hash list. If exist the same tapscript in this tree, you can search for the target tapscript by specifying a hash list of tapbranches.
*/
export interface TapScriptFromStringRequest {
  network?: string;
  isElements?: boolean;
  treeString: string;
  tapscript?: string;
  internalPubkey?: string;
  internalPrivkey?: string;
  nodes?: string[];
}

/**
* TapScript information
* @property {string} tapLeafHash? - tapleaf hash
* @property {string} topBranchHash - branch hash on the top.
* @property {string} tweakedPubkey? - tweaked schnorr pubkey with internal pubkey.
* @property {string} tweakedPrivkey? - tweaked privkey with internal privkey.
* @property {string} address? - address
* @property {string} lockingScript? - locking script
* @property {string} controlBlock? - control block
* @property {string} tapscript? - tapscript
* @property {string[]} nodes? - tapbranch list in this tree.
* @property {string} treeString - tree serialize string. (cfd format)
*/
export interface TapScriptInfo {
  tapLeafHash?: string;
  topBranchHash: string;
  tweakedPubkey?: string;
  tweakedPrivkey?: string;
  address?: string;
  lockingScript?: string;
  controlBlock?: string;
  tapscript?: string;
  nodes?: string[];
  treeString: string;
}

/**
* Request for get tapscript info.
* @property {string} network? - network type (bitcoin:'mainnet, testnet, regtest'. elements:'liquidv1, regtest')
* @property {boolean} isElements? - elements transaction flag.
* @property {string} tapscript - tapscript hex.
* @property {string} controlBlock - control block.
* @property {string} internalPrivkey? - internal privkey. Specify only when it is necessary to calculate.
*/
export interface TapScriptInfoByControlRequest {
  network?: string;
  isElements?: boolean;
  tapscript: string;
  controlBlock: string;
  internalPrivkey?: string;
}

/**
* tapscript sign data.
* @property {string} hex - sign hex.
* @property {string} type? - parameter type. (binary, sign)
* @property {string} sighashType? - signature hash type. Valid only when type is sign. (default, all, none or single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag. Valid only when type is sign.
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
*/
export interface TapScriptSignData {
  hex: string;
  type?: string;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
}

/**
* TapScript tree item
* @property {number} depth - branch depth
* @property {string} tapBranchHash - tapbranch hash or tapleaf hash.
* @property {string} tapscript? - tapscript hex.
* @property {bigint} leafVersion? - tapleaf version.
* @property {string[]} relatedBranchHash? - related tapbranch hash
*/
export interface TapScriptTreeItem {
  depth: number;
  tapBranchHash: string;
  tapscript?: string;
  leafVersion?: bigint;
  relatedBranchHash?: string[];
}

/**
* target amount data.
* @property {string} asset? - target asset.
* @property {bigint | number} amount - Amount more than the specified amount is set in txout. default is 0 (disable).
*/
export interface TargetAmountMapData {
  asset?: string;
  amount: bigint | number;
}

/**
* tweak privkey data
* @property {string} privkey - privkey (wif or hex)
* @property {string} tweak - 32-byte tweak data
*/
export interface TweakPrivkeyData {
  privkey: string;
  tweak: string;
}

/**
* tweak pubkey data
* @property {string} pubkey - public key
* @property {string} tweak - 32-byte tweak data
*/
export interface TweakPubkeyData {
  pubkey: string;
  tweak: string;
}

/**
* The data added to the transaction input.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {number} sequence? - sequence number.
*/
export interface TxInRequest {
  txid: string;
  vout: number;
  sequence?: number;
}

/**
* The data added to the transaction output.
* @property {string} address - bitcoin address.
* @property {bigint | number} amount - satoshi amount.
* @property {string} directLockingScript? - Set to locking script. (When using a script that cannot be expressed as an address)
*/
export interface TxOutRequest {
  address: string;
  amount: bigint | number;
  directLockingScript?: string;
}

/**
* issuance blinding key data
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {string} assetBlindingKey? - asset blinding key
* @property {string} tokenBlindingKey? - token blinding key
*/
export interface UnblindIssuance {
  txid: string;
  vout: number;
  assetBlindingKey?: string;
  tokenBlindingKey?: string;
}

/**
* unblind issuance data
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {string} asset? - asset
* @property {bigint} assetamount? - asset amount
* @property {string} token? - token
* @property {bigint} tokenamount? - token amount
* @property {string} assetValueBlindFactor? - asset amount blind factor
* @property {string} tokenValueBlindFactor? - token amount blind factor
*/
export interface UnblindIssuanceOutput {
  txid: string;
  vout: number;
  asset?: string;
  assetamount?: bigint;
  token?: string;
  tokenamount?: bigint;
  assetValueBlindFactor?: string;
  tokenValueBlindFactor?: string;
}

/**
* unblind txout
* @property {number} index - vout
* @property {string} asset - asset
* @property {string} blindFactor - amount blind factor
* @property {string} assetBlindFactor - asset blind factor
* @property {bigint} amount - satoshi amount
*/
export interface UnblindOutput {
  index: number;
  asset: string;
  blindFactor: string;
  assetBlindFactor: string;
  amount: bigint;
}

/**
* Request for unblind transaction.
* @property {string} tx - transaction hex
* @property {UnblindTxOut[]} txouts? - txout list
* @property {UnblindIssuance[]} issuances? - issuance blinding key data
*/
export interface UnblindRawTransactionRequest {
  tx: string;
  txouts?: UnblindTxOut[];
  issuances?: UnblindIssuance[];
}

/**
* Response of unblind transaction.
* @property {string} hex - unblinded transaction hex
* @property {UnblindOutput[]} outputs? - unblind txout
* @property {UnblindIssuanceOutput[]} issuanceOutputs? - unblind issuance data
*/
export interface UnblindRawTransactionResponse {
  hex: string;
  outputs?: UnblindOutput[];
  issuanceOutputs?: UnblindIssuanceOutput[];
}

/**
* @property {number} index - vout
* @property {string} blindingKey - blinding key
*/
export interface UnblindTxOut {
  index: number;
  blindingKey: string;
}

/**
* Request for update sequence number
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {number} sequence - sequence number
*/
export interface UpdateTxInSequenceRequest {
  tx: string;
  isElements?: boolean;
  txid: string;
  vout: number;
  sequence: number;
}

/**
* target txout
* @property {bigint | number} amount - satoshi amount
* @property {number} index? - txout index
* @property {string} address? - target address (top only)
* @property {string} directLockingScript? - target locking script (top only)
*/
export interface UpdateTxOutAmountData {
  amount: bigint | number;
  index?: number;
  address?: string;
  directLockingScript?: string;
}

/**
* Request for update txout amount.
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {UpdateTxOutAmountData[]} txouts - target txout
*/
export interface UpdateTxOutAmountRequest {
  tx: string;
  isElements?: boolean;
  txouts: UpdateTxOutAmountData[];
}

/**
* Request for update witness stack
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {UpdateWitnessStackTxInRequest} txin - target txin
*/
export interface UpdateWitnessStackRequest {
  tx: string;
  isElements?: boolean;
  txin: UpdateWitnessStackTxInRequest;
}

/**
* update target txin
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {WitnessStackData} witnessStack - witness stack
*/
export interface UpdateWitnessStackTxInRequest {
  txid: string;
  vout: number;
  witnessStack: WitnessStackData;
}

/**
* utxo data.
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {bigint | number} amount - satoshi amount.
* @property {string} asset? - asset id. (This field is available only elements utxo.)
* @property {string} descriptor? - output descriptor. (descriptor is required, you needs to consider fee amount)
* @property {string} scriptSigTemplate? - ScriptSig template is for scriptHash calculation fee.
*/
export interface UtxoJsonData {
  txid: string;
  vout: number;
  amount: bigint | number;
  asset?: string;
  descriptor?: string;
  scriptSigTemplate?: string;
}

/**
* The utxo list data.
* @property {FundUtxoJsonData[]} utxos - utxo data.
*/
export interface UtxoListData {
  utxos: FundUtxoJsonData[];
}

/**
* UTXO data.
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {string} address? - txout address. Set either the address or the locking script or the descriptor.
* @property {string} lockingScript? - txout locking script. Set either the address or the locking script or the descriptor.
* @property {bigint | number} amount? - satoshi amount (need either amount or confidentialValueCommitment)
* @property {string} confidentialValueCommitment? - value commitment (need either amount or confidentialValueCommitment)
* @property {string} asset? - asset hex.
* @property {string} confidentialAssetCommitment? - asset commitment
* @property {string} blindFactor? - amount blinder.
* @property {string} assetBlindFactor? - asset blinder.
* @property {string} scriptSigTemplate? - ScriptSig template is for scriptHash calculation fee.
*/
export interface UtxoObject {
  txid: string;
  vout: number;
  address?: string;
  lockingScript?: string;
  descriptor?: string;
  amount?: bigint | number;
  confidentialValueCommitment?: string;
  asset?: string;
  confidentialAssetCommitment?: string;
  blindFactor?: string;
  assetBlindFactor?: string;
  scriptSigTemplate?: string;
}

/**
* Request for verify signature
* @property {string} adaptorSignature - adaptor signature hex.
* @property {string} encryptionKey - adaptor encryption key.
* @property {string} message - message data. (32-byte hash, or text message.)
* @property {boolean} isHashed? - is 32-byte hashed message.
* @property {string} pubkey - public key.
*/
export interface VerifyEcdsaAdaptorRequest {
  adaptorSignature: string;
  encryptionKey: string;
  message: string;
  isHashed?: boolean;
  pubkey: string;
}

/**
* Request for verify message.
* @property {string} signature - message signature. hex or base64.
* @property {string} pubkey - public key.
* @property {string} message - message
* @property {string} magic? - message magic word. default is empty (set bitcoin magic word.)
* @property {boolean} ignoreError? - ignore error option. If set to true, response success is true/false.
*/
export interface VerifyMessageRequest {
  signature: string;
  pubkey: string;
  message: string;
  magic?: string;
  ignoreError?: boolean;
}

/**
* Response of verify message.
* @property {boolean} success - signature
* @property {string} pubkey? - recovered public key
*/
export interface VerifyMessageResponse {
  success: boolean;
  pubkey?: string;
}

/**
* Request to verify psbt sign.
* @property {string} psbt - psbt data (hex or base64)
* @property {OutPoint[]} outPointList? - OutPoint data.
*/
export interface VerifyPsbtSignRequest {
  psbt: string;
  outPointList?: OutPoint[];
}

/**
* Request for verify signature
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {VerifySignatureTxInRequest} txin - txin data
* @property {UtxoObject[]} utxos? - UTXO data.
* @property {string} genesisBlockHash? - genesis block hash (for elements taproot)
*/
export interface VerifySignatureRequest {
  tx: string;
  isElements?: boolean;
  txin: VerifySignatureTxInRequest;
  utxos?: UtxoObject[];
  genesisBlockHash?: string;
}

/**
* Contains the validation result
* @property {boolean} success - verify result (true only. If it fails, an error is thrown.)
*/
export interface VerifySignatureResponse {
  success: boolean;
}

/**
* @property {string} txid - utxo txid.
* @property {number} vout - utxo vout.
* @property {string} signature - signature
* @property {string} pubkey - The pubkey associated with the signature.
* @property {string} redeemScript? - The pubkey associated with the signature. (hashType is p2sh or p2wsh, taproot)
* @property {string} hashType - hash type. (p2pkh, p2sh, p2wpkh, p2wsh, taproot)
* @property {string} sighashType? - signature hash type. (all, none, single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag.
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
* @property {bigint | number} amount? - satoshi amount. Use only when utxos is not set. (Only when using witness. Need either amount or confidentialValueCommitment)
* @property {string} confidentialValueCommitment? - value commitment. Use only when utxos is not set. (Only when using witness. Need either amount or confidentialValueCommitment)
* @property {string} annex? - taproot annex bytes.
* @property {bigint | number} codeSeparatorPosition? - (for tapscript) OP_CODESEPARATOR position.
*/
export interface VerifySignatureTxInRequest {
  txid: string;
  vout: number;
  signature: string;
  pubkey: string;
  redeemScript?: string;
  hashType: string;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
  amount?: bigint | number;
  confidentialValueCommitment?: string;
  annex?: string;
  codeSeparatorPosition?: bigint | number;
}

/**
* Request for verify signature.
* @property {string} pubkey - public key (ecdsa or x-only schnorr)
*/
export interface VerifySignatureWithPubkeyRequest {
  pubkey: string;
  message: string;
  isHashed?: boolean;
  signature: string;
}

/**
* Request data for verification
* @property {string} tx - transaction hex
* @property {boolean} isElements? - elements transaction flag.
* @property {VerifySignTxInUtxoData[]} txins - target txin list
* @property {UtxoObject[]} utxos? - UTXO data.
* @property {string} genesisBlockHash? - genesis block hash (for elements taproot)
*/
export interface VerifySignRequest {
  tx: string;
  isElements?: boolean;
  txins: VerifySignTxInUtxoData[];
  utxos?: UtxoObject[];
  genesisBlockHash?: string;
}

/**
* Response data of verification
* @property {boolean} success - verification result
* @property {FailSignTxIn[]} failTxins? - failed txin list
*/
export interface VerifySignResponse {
  success: boolean;
  failTxins?: FailSignTxIn[];
}

/**
* @property {string} txid - utxo txid
* @property {number} vout - utxo vout
* @property {string} address - address
* @property {bigint | number} amount - satoshi amount
* @property {string} descriptor? - output descriptor.
* @property {string} lockingScript? - txout locking script. Set either the address or the locking script or the descriptor.
* @property {string} confidentialValueCommitment? - elements value commitment.
*/
export interface VerifySignTxInUtxoData {
  txid: string;
  vout: number;
  address: string;
  amount: bigint | number;
  descriptor?: string;
  lockingScript?: string;
  confidentialValueCommitment?: string;
}

/**
* Request for void function.
* @property {boolean} success - success flag
*/
export interface VoidFunctionResponse {
  success: boolean;
}

/**
* Updating WitnessStack data. Only index and hex are used in UpdatePeginWitnessStack.
* @property {number} index - stack index
* @property {string} hex - update data
* @property {string} type? - parameter type. (binary, sign, pubkey, redeem_script)
* @property {boolean} derEncode? - der encode option flag. Valid when type is auto or sign.
* @property {string} sighashType? - signature hash type. (all, none, single)
* @property {boolean} sighashAnyoneCanPay? - sighashType anyone can pay flag.
* @property {boolean} sighashRangeproof? - (for Elements) sighash rangeproof
*/
export interface WitnessStackData {
  index: number;
  hex: string;
  type?: string;
  derEncode?: boolean;
  sighashType?: string;
  sighashAnyoneCanPay?: boolean;
  sighashRangeproof?: boolean;
}

/**
* xpub data
* @property {string} base58 - xpub base58 string
* @property {string} hex - xpub hex string
*/
export interface XpubData {
  base58: string;
  hex: string;
}

/** function definition class. */
export class Cfdjs {
  /**
   * Add multisig signatures to the transaction.
   * @param {AddMultisigSignRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  AddMultisigSign(jsonObject: AddMultisigSignRequest): Promise<RawTransactionResponse>;
  /**
   * Add psbt input/output data.
   * @param {AddPsbtDataRequest} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  AddPsbtData(jsonObject: AddPsbtDataRequest): Promise<PsbtOutputData>;
  /**
   * Add a signature and pubkey to the transaction.
   * @param {AddPubkeyHashSignRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  AddPubkeyHashSign(jsonObject: AddPubkeyHashSignRequest): Promise<RawTransactionResponse>;
  /**
   * Add tx inputs and tx outputs to the transaction.
   * @param {AddRawTransactionRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  AddRawTransaction(jsonObject: AddRawTransactionRequest): Promise<RawTransactionResponse>;
  /**
   * Add a signature and redeem script to the transaction.
   * @param {AddScriptHashSignRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  AddScriptHashSign(jsonObject: AddScriptHashSignRequest): Promise<RawTransactionResponse>;
  /**
   * Add a sign data to the transaction.
   * @param {AddSignRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  AddSign(jsonObject: AddSignRequest): Promise<RawTransactionResponse>;
  /**
   * Add a signature and pubkey to the transaction.
   * @param {AddTaprootSchnorrSignRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  AddTaprootSchnorrSign(jsonObject: AddTaprootSchnorrSignRequest): Promise<RawTransactionResponse>;
  /**
   * Add a signature and redeem script to the transaction.
   * @param {AddTapscriptSignRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  AddTapscriptSign(jsonObject: AddTapscriptSignRequest): Promise<RawTransactionResponse>;
  /**
   * Analyze TapScript tree.
   * @param {AnalyzeTapScriptTreeRequest} jsonObject - request data.
   * @return {Promise<AnalyzeTapScriptTreeInfo>} - response data.
   */
  AnalyzeTapScriptTree(jsonObject: AnalyzeTapScriptTreeRequest): Promise<AnalyzeTapScriptTreeInfo>;
  /**
   * Get output descriptor added checksum.
   * @param {AppendDescriptorChecksumRequest} jsonObject - request data.
   * @return {Promise<OutputDescriptorResponse>} - response data.
   */
  AppendDescriptorChecksum(jsonObject: AppendDescriptorChecksumRequest): Promise<OutputDescriptorResponse>;
  /**
   * blind the transaction.
   * @param {BlindRawTransactionRequest} jsonObject - request data.
   * @return {Promise<BlindTransactionResponse>} - response data.
   */
  BlindRawTransaction(jsonObject: BlindRawTransactionRequest): Promise<BlindTransactionResponse>;
  /**
   * calculate ec signature.
   * @param {CalculateEcSignatureRequest} jsonObject - request data.
   * @return {Promise<SignatureDataResponse>} - response data.
   */
  CalculateEcSignature(jsonObject: CalculateEcSignatureRequest): Promise<SignatureDataResponse>;
  /**
   * check tweakadd schnorr pubkey.
   * @param {CheckTweakedSchnorrPubkeyRequest} jsonObject - request data.
   * @return {Promise<VerifySignatureResponse>} - response data.
   */
  CheckTweakedSchnorrPubkey(jsonObject: CheckTweakedSchnorrPubkeyRequest): Promise<VerifySignatureResponse>;
  /**
   * Clear custom prefix function.
   * @return {Promise<VoidFunctionResponse>} - response data.
   */
  ClearCustomPrefix(): Promise<VoidFunctionResponse>;
  /**
   * Combine psbt.
   * @param {PsbtList} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  CombinePsbt(jsonObject: PsbtList): Promise<PsbtOutputData>;
  /**
   * Combine pubkey.
   * @param {PubkeyListData} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  CombinePubkey(jsonObject: PubkeyListData): Promise<PubkeyData>;
  /**
   * compute sigpoint on schnorr pubkey.
   * @param {ComputeSigPointRequest} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  ComputeSigPointSchnorrPubkey(jsonObject: ComputeSigPointRequest): Promise<PubkeyData>;
  /**
   * Encode/Decode AES.
   * @param {ConvertAesRequest} jsonObject - request data.
   * @return {Promise<ConvertAesResponse>} - response data.
   */
  ConvertAes(jsonObject: ConvertAesRequest): Promise<ConvertAesResponse>;
  /**
   * Get mnemonic from entropy.
   * @param {ConvertEntropyToMnemonicRequest} jsonObject - request data.
   * @return {Promise<ConvertEntropyToMnemonicResponse>} - response data.
   */
  ConvertEntropyToMnemonic(jsonObject: ConvertEntropyToMnemonicRequest): Promise<ConvertEntropyToMnemonicResponse>;
  /**
   * Get seed from mnemonic.
   * @param {ConvertMnemonicToSeedRequest} jsonObject - request data.
   * @return {Promise<ConvertMnemonicToSeedResponse>} - response data.
   */
  ConvertMnemonicToSeed(jsonObject: ConvertMnemonicToSeedRequest): Promise<ConvertMnemonicToSeedResponse>;
  /**
   * Convert transaction to PSBT.
   * @param {ConvertToPsbtRequest} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  ConvertToPsbt(jsonObject: ConvertToPsbtRequest): Promise<PsbtOutputData>;
  /**
   * Create address.
   * @param {CreateAddressRequest} jsonObject - request data.
   * @return {Promise<CreateAddressResponse>} - response data.
   */
  CreateAddress(jsonObject: CreateAddressRequest): Promise<CreateAddressResponse>;
  /**
   * create output descriptor.
   * @param {CreateDescriptorRequest} jsonObject - request data.
   * @return {Promise<OutputDescriptorResponse>} - response data.
   */
  CreateDescriptor(jsonObject: CreateDescriptorRequest): Promise<OutputDescriptorResponse>;
  /**
   * Create destroy amount transaction
   * @param {CreateDestroyAmountRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  CreateDestroyAmount(jsonObject: CreateDestroyAmountRequest): Promise<RawTransactionResponse>;
  /**
   * Create signature hash.
   * @param {CreateElementsSignatureHashRequest} jsonObject - request data.
   * @return {Promise<CreateSignatureHashResponse>} - response data.
   */
  CreateElementsSignatureHash(jsonObject: CreateElementsSignatureHashRequest): Promise<CreateSignatureHashResponse>;
  /**
   * Create extkey.
   * @param {CreateExtkeyRequest} jsonObject - request data.
   * @return {Promise<CreateExtkeyResponse>} - response data.
   */
  CreateExtkey(jsonObject: CreateExtkeyRequest): Promise<CreateExtkeyResponse>;
  /**
   * Create extkey from parent.
   * @param {CreateExtkeyFromParentRequest} jsonObject - request data.
   * @return {Promise<CreateExtkeyResponse>} - response data.
   */
  CreateExtkeyFromParent(jsonObject: CreateExtkeyFromParentRequest): Promise<CreateExtkeyResponse>;
  /**
   * Create extkey from parent's key.
   * @param {CreateExtkeyFromParentKeyRequest} jsonObject - request data.
   * @return {Promise<CreateExtkeyResponse>} - response data.
   */
  CreateExtkeyFromParentKey(jsonObject: CreateExtkeyFromParentKeyRequest): Promise<CreateExtkeyResponse>;
  /**
   * Create extkey from parent with path.
   * @param {CreateExtkeyFromParentPathRequest} jsonObject - request data.
   * @return {Promise<CreateExtkeyResponse>} - response data.
   */
  CreateExtkeyFromParentPath(jsonObject: CreateExtkeyFromParentPathRequest): Promise<CreateExtkeyResponse>;
  /**
   * Create extkey from seed.
   * @param {CreateExtkeyFromSeedRequest} jsonObject - request data.
   * @return {Promise<CreateExtkeyResponse>} - response data.
   */
  CreateExtkeyFromSeed(jsonObject: CreateExtkeyFromSeedRequest): Promise<CreateExtkeyResponse>;
  /**
   * Create extpubkey.
   * @param {CreateExtPubkeyRequest} jsonObject - request data.
   * @return {Promise<CreateExtkeyResponse>} - response data.
   */
  CreateExtPubkey(jsonObject: CreateExtPubkeyRequest): Promise<CreateExtkeyResponse>;
  /**
   * Create keypair.
   * @param {CreateKeyPairRequest} jsonObject - request data.
   * @return {Promise<CreateKeyPairResponse>} - response data.
   */
  CreateKeyPair(jsonObject: CreateKeyPairRequest): Promise<CreateKeyPairResponse>;
  /**
   * Create multisig address and script
   * @param {CreateMultisigRequest} jsonObject - request data.
   * @return {Promise<CreateMultisigResponse>} - response data.
   */
  CreateMultisig(jsonObject: CreateMultisigRequest): Promise<CreateMultisigResponse>;
  /**
   * Create multisig's scriptsig
   * @param {CreateMultisigScriptSigRequest} jsonObject - request data.
   * @return {Promise<ScriptDataResponse>} - response data.
   */
  CreateMultisigScriptSig(jsonObject: CreateMultisigScriptSigRequest): Promise<ScriptDataResponse>;
  /**
   * create pegin address.
   * @param {CreatePegInAddressRequest} jsonObject - request data.
   * @return {Promise<CreatePegInAddressResponse>} - response data.
   */
  CreatePegInAddress(jsonObject: CreatePegInAddressRequest): Promise<CreatePegInAddressResponse>;
  /**
   * create pegout address.
   * @param {CreatePegoutAddressRequest} jsonObject - request data.
   * @return {Promise<CreatePegoutAddressResponse>} - response data.
   */
  CreatePegOutAddress(jsonObject: CreatePegoutAddressRequest): Promise<CreatePegoutAddressResponse>;
  /**
   * Create transaction
   * @param {CreateRawTransactionRequest} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  CreatePsbt(jsonObject: CreateRawTransactionRequest): Promise<PsbtOutputData>;
  /**
   * Create pegin transaction
   * @param {CreateRawPeginRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  CreateRawPegin(jsonObject: CreateRawPeginRequest): Promise<RawTransactionResponse>;
  /**
   * Create pegout transaction
   * @param {CreateRawPegoutRequest} jsonObject - request data.
   * @return {Promise<CreateRawPegoutResponse>} - response data.
   */
  CreateRawPegout(jsonObject: CreateRawPegoutRequest): Promise<CreateRawPegoutResponse>;
  /**
   * Create transaction
   * @param {CreateRawTransactionRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  CreateRawTransaction(jsonObject: CreateRawTransactionRequest): Promise<RawTransactionResponse>;
  /**
   * Create script.
   * @param {CreateScriptRequest} jsonObject - request data.
   * @return {Promise<ScriptDataResponse>} - response data.
   */
  CreateScript(jsonObject: CreateScriptRequest): Promise<ScriptDataResponse>;
  /**
   * Create signature hash.
   * @param {CreateSignatureHashRequest} jsonObject - request data.
   * @return {Promise<CreateSignatureHashResponse>} - response data.
   */
  CreateSignatureHash(jsonObject: CreateSignatureHashRequest): Promise<CreateSignatureHashResponse>;
  /**
   * Decode base58.
   * @param {DecodeBase58Request} jsonObject - request data.
   * @return {Promise<DecodeBase58Response>} - response data.
   */
  DecodeBase58(jsonObject: DecodeBase58Request): Promise<DecodeBase58Response>;
  /**
   * decode base64
   * @param {Base64Data} jsonObject - request data.
   * @return {Promise<HexData>} - response data.
   */
  DecodeBase64(jsonObject: Base64Data): Promise<HexData>;
  /**
   * Decode der-encoded signature.
   * @param {DecodeDerSignatureToRawRequest} jsonObject - request data.
   * @return {Promise<SignatureDataResponse>} - response data.
   */
  DecodeDerSignatureToRaw(jsonObject: DecodeDerSignatureToRawRequest): Promise<SignatureDataResponse>;
  /**
   * @param {DecodePsbtRequest} jsonObject - request data.
   * @return {Promise<DecodePsbtResponse>} - response data.
   */
  DecodePsbt(jsonObject: DecodePsbtRequest): Promise<DecodePsbtResponse>;
  /**
   * Decode transaction
   * @param {DecodeRawTransactionRequest} jsonObject - request data.
   * @return {Promise<DecodeRawTransactionResponse>} - response data.
   */
  DecodeRawTransaction(jsonObject: DecodeRawTransactionRequest): Promise<DecodeRawTransactionResponse>;
  /**
   * Decrypt signature on ecdsa adaptor.
   * @param {DecryptEcdsaAdaptorRequest} jsonObject - request data.
   * @return {Promise<SignatureDataResponse>} - response data.
   */
  DecryptEcdsaAdaptor(jsonObject: DecryptEcdsaAdaptorRequest): Promise<SignatureDataResponse>;
  /**
   * Add raw transaction.
   * @param {ElementsAddRawTransactionRequest} jsonObject - request data.
   * @return {Promise<ElementsAddRawTransactionResponse>} - response data.
   */
  ElementsAddRawTransaction(jsonObject: ElementsAddRawTransactionRequest): Promise<ElementsAddRawTransactionResponse>;
  /**
   * Create transaction for Elements.
   * @param {ElementsCreateRawTransactionRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  ElementsCreateRawTransaction(jsonObject: ElementsCreateRawTransactionRequest): Promise<RawTransactionResponse>;
  /**
   * Decode Elements transaction
   * @param {ElementsDecodeRawTransactionRequest} jsonObject - request data.
   * @return {Promise<ElementsDecodeRawTransactionResponse>} - response data.
   */
  ElementsDecodeRawTransaction(jsonObject: ElementsDecodeRawTransactionRequest): Promise<ElementsDecodeRawTransactionResponse>;
  /**
   * encode base58
   * @param {EncodeBase58Request} jsonObject - request data.
   * @return {Promise<EncodeBase58Response>} - response data.
   */
  EncodeBase58(jsonObject: EncodeBase58Request): Promise<EncodeBase58Response>;
  /**
   * encode base64
   * @param {HexData} jsonObject - request data.
   * @return {Promise<Base64Data>} - response data.
   */
  EncodeBase64(jsonObject: HexData): Promise<Base64Data>;
  /**
   * Encode signature by der.
   * @param {EncodeSignatureByDerRequest} jsonObject - request data.
   * @return {Promise<EncodeSignatureByDerResponse>} - response data.
   */
  EncodeSignatureByDer(jsonObject: EncodeSignatureByDerRequest): Promise<EncodeSignatureByDerResponse>;
  /**
   * sign on ecdsa adaptor.
   * @param {EncryptEcdsaAdaptorRequest} jsonObject - request data.
   * @return {Promise<EcdsaAdaptorSignature>} - response data.
   */
  EncryptEcdsaAdaptor(jsonObject: EncryptEcdsaAdaptorRequest): Promise<EcdsaAdaptorSignature>;
  /**
   * Estimate fee.
   * @param {EstimateFeeRequest} jsonObject - request data.
   * @return {Promise<EstimateFeeResponse>} - response data.
   */
  EstimateFee(jsonObject: EstimateFeeRequest): Promise<EstimateFeeResponse>;
  /**
   * Finalize and extract PSBT.
   * @param {FinalizePsbtRequest} jsonObject - request data.
   * @return {Promise<FinalizePsbtResponse>} - response data.
   */
  FinalizePsbt(jsonObject: FinalizePsbtRequest): Promise<FinalizePsbtResponse>;
  /**
   * Finalize PSBT with input.
   * @param {FinalizePsbtInputRequest} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  FinalizePsbtInput(jsonObject: FinalizePsbtInputRequest): Promise<PsbtOutputData>;
  /**
   * Fund psbt.
   * @param {FundPsbtRequest} jsonObject - request data.
   * @return {Promise<FundPsbtResponse>} - response data.
   */
  FundPsbt(jsonObject: FundPsbtRequest): Promise<FundPsbtResponse>;
  /**
   * Fund transaction.
   * @param {FundRawTransactionRequest} jsonObject - request data.
   * @return {Promise<FundRawTransactionResponse>} - response data.
   */
  FundRawTransaction(jsonObject: FundRawTransactionRequest): Promise<FundRawTransactionResponse>;
  /**
   * Get addresses from multisig script.
   * @param {GetAddressesFromMultisigRequest} jsonObject - request data.
   * @return {Promise<GetAddressesFromMultisigResponse>} - response data.
   */
  GetAddressesFromMultisig(jsonObject: GetAddressesFromMultisigRequest): Promise<GetAddressesFromMultisigResponse>;
  /**
   * Get address information.
   * @param {GetAddressInfoRequest} jsonObject - request data.
   * @return {Promise<GetAddressInfoResponse>} - response data.
   */
  GetAddressInfo(jsonObject: GetAddressInfoRequest): Promise<GetAddressInfoResponse>;
  /**
   * Get block header and txid list.
   * @param {BlockData} jsonObject - request data.
   * @return {Promise<BlockInformation>} - response data.
   */
  GetBlockInfo(jsonObject: BlockData): Promise<BlockInformation>;
  /**
   * Get commitment.
   * @param {GetCommitmentRequest} jsonObject - request data.
   * @return {Promise<GetCommitmentResponse>} - response data.
   */
  GetCommitment(jsonObject: GetCommitmentRequest): Promise<GetCommitmentResponse>;
  /**
   * Get compressed pubkey.
   * @param {PubkeyData} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  GetCompressedPubkey(jsonObject: PubkeyData): Promise<PubkeyData>;
  /**
   * Get confidential address.
   * @param {GetConfidentialAddressRequest} jsonObject - request data.
   * @return {Promise<GetConfidentialAddressResponse>} - response data.
   */
  GetConfidentialAddress(jsonObject: GetConfidentialAddressRequest): Promise<GetConfidentialAddressResponse>;
  /**
   * Get default blinding key.
   * @param {GetDefaultBlindingKeyRequest} jsonObject - request data.
   * @return {Promise<BlindingKeyResponse>} - response data.
   */
  GetDefaultBlindingKey(jsonObject: GetDefaultBlindingKeyRequest): Promise<BlindingKeyResponse>;
  /**
   * Get extkey information.
   * @param {GetExtkeyInfoRequest} jsonObject - request data.
   * @return {Promise<GetExtkeyInfoResponse>} - response data.
   */
  GetExtkeyInfo(jsonObject: GetExtkeyInfoRequest): Promise<GetExtkeyInfoResponse>;
  /**
   * Get issuance blinding key.
   * @param {GetIssuanceBlindingKeyRequest} jsonObject - request data.
   * @return {Promise<BlindingKeyResponse>} - response data.
   */
  GetIssuanceBlindingKey(jsonObject: GetIssuanceBlindingKeyRequest): Promise<BlindingKeyResponse>;
  /**
   * Get mnemonic word list
   * @param {GetMnemonicWordlistRequest} jsonObject - request data.
   * @return {Promise<GetMnemonicWordlistResponse>} - response data.
   */
  GetMnemonicWordlist(jsonObject: GetMnemonicWordlistRequest): Promise<GetMnemonicWordlistResponse>;
  /**
   * Get privkey from extkey.
   * @param {GetPrivkeyFromExtkeyRequest} jsonObject - request data.
   * @return {Promise<GetPrivkeyFromExtkeyResponse>} - response data.
   */
  GetPrivkeyFromExtkey(jsonObject: GetPrivkeyFromExtkeyRequest): Promise<GetPrivkeyFromExtkeyResponse>;
  /**
   * Get privkey from wif.
   * @param {PrivkeyWifData} jsonObject - request data.
   * @return {Promise<PrivkeyHexData>} - response data.
   */
  GetPrivkeyFromWif(jsonObject: PrivkeyWifData): Promise<PrivkeyHexData>;
  /**
   * Get privkey on wif.
   * @param {PrivkeyHexData} jsonObject - request data.
   * @return {Promise<PrivkeyWifData>} - response data.
   */
  GetPrivkeyWif(jsonObject: PrivkeyHexData): Promise<PrivkeyWifData>;
  /**
   * Get psbt utxo list.
   * @param {DecodePsbtRequest} jsonObject - request data.
   * @return {Promise<UtxoListData>} - response data.
   */
  GetPsbtUtxos(jsonObject: DecodePsbtRequest): Promise<UtxoListData>;
  /**
   * Get pubkey from extkey.
   * @param {GetPubkeyFromExtkeyRequest} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  GetPubkeyFromExtkey(jsonObject: GetPubkeyFromExtkeyRequest): Promise<PubkeyData>;
  /**
   * Get pubkey from privkey.
   * @param {GetPubkeyFromPrivkeyRequest} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  GetPubkeyFromPrivkey(jsonObject: GetPubkeyFromPrivkeyRequest): Promise<PubkeyData>;
  /**
   * Get a Schnorr pubkey from a privkey.
   * @param {GetSchnorrPubkeyFromPrivkeyRequest} jsonObject - request data.
   * @return {Promise<SchnorrPubkeyData>} - response data.
   */
  GetSchnorrPubkeyFromPrivkey(jsonObject: GetSchnorrPubkeyFromPrivkeyRequest): Promise<SchnorrPubkeyData>;
  /**
   * get schnorr pubkey from pubkey.
   * @param {PubkeyData} jsonObject - request data.
   * @return {Promise<SchnorrPubkeyData>} - response data.
   */
  GetSchnorrPubkeyFromPubkey(jsonObject: PubkeyData): Promise<SchnorrPubkeyData>;
  /**
   * Get signature hash.
   * @param {GetSighashRequest} jsonObject - request data.
   * @return {Promise<CreateSignatureHashResponse>} - response data.
   */
  GetSighash(jsonObject: GetSighashRequest): Promise<CreateSignatureHashResponse>;
  /**
   * Get supported function.
   * @return {Promise<GetSupportedFunctionResponse>} - response data.
   */
  GetSupportedFunction(): Promise<GetSupportedFunctionResponse>;
  /**
   * Get TapBranch info from tree.
   * @param {GetTapBranchInfoRequest} jsonObject - request data.
   * @return {Promise<TapBranchInfo>} - response data.
   */
  GetTapBranchInfo(jsonObject: GetTapBranchInfoRequest): Promise<TapBranchInfo>;
  /**
   * Get TapScript tree from string.
   * @param {TapScriptFromStringRequest} jsonObject - request data.
   * @return {Promise<TapScriptInfo>} - response data.
   */
  GetTapScriptTreeFromString(jsonObject: TapScriptFromStringRequest): Promise<TapScriptInfo>;
  /**
   * Get TapScript tree info.
   * @param {GetTapScriptTreeInfoRequest} jsonObject - request data.
   * @return {Promise<TapScriptInfo>} - response data.
   */
  GetTapScriptTreeInfo(jsonObject: GetTapScriptTreeInfoRequest): Promise<TapScriptInfo>;
  /**
   * Get TapScript tree info by control block.
   * @param {TapScriptInfoByControlRequest} jsonObject - request data.
   * @return {Promise<TapScriptInfo>} - response data.
   */
  GetTapScriptTreeInfoByControlBlock(jsonObject: TapScriptInfoByControlRequest): Promise<TapScriptInfo>;
  /**
   * Get block header and txid list.
   * @param {BlockTxRequest} jsonObject - request data.
   * @return {Promise<BlockTxData>} - response data.
   */
  GetTxDataFromBlock(jsonObject: BlockTxRequest): Promise<BlockTxData>;
  /**
   * Get TxIn Index.
   * @param {GetTxInIndexRequest} jsonObject - request data.
   * @return {Promise<GetIndexData>} - response data.
   */
  GetTxInIndex(jsonObject: GetTxInIndexRequest): Promise<GetIndexData>;
  /**
   * Get TxOut Index.
   * @param {GetTxOutIndexRequest} jsonObject - request data.
   * @return {Promise<GetIndexData>} - response data.
   */
  GetTxOutIndex(jsonObject: GetTxOutIndexRequest): Promise<GetIndexData>;
  /**
   * Get unblind data.
   * @param {GetUnblindDataRequest} jsonObject - request data.
   * @return {Promise<UnblindOutput>} - response data.
   */
  GetUnblindData(jsonObject: GetUnblindDataRequest): Promise<UnblindOutput>;
  /**
   * Get unblinded address.
   * @param {GetUnblindedAddressRequest} jsonObject - request data.
   * @return {Promise<GetUnblindedAddressResponse>} - response data.
   */
  GetUnblindedAddress(jsonObject: GetUnblindedAddressRequest): Promise<GetUnblindedAddressResponse>;
  /**
   * Get uncompressed pubkey.
   * @param {PubkeyData} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  GetUncompressedPubkey(jsonObject: PubkeyData): Promise<PubkeyData>;
  /**
   * Get witness stack count.
   * @param {GetWitnessStackNumRequest} jsonObject - request data.
   * @return {Promise<GetWitnessStackNumResponse>} - response data.
   */
  GetWitnessStackNum(jsonObject: GetWitnessStackNumRequest): Promise<GetWitnessStackNumResponse>;
  /**
   * hash message
   * @param {HashMessageRequest} jsonObject - request data.
   * @return {Promise<HexData>} - response data.
   */
  HashMessage(jsonObject: HashMessageRequest): Promise<HexData>;
  /**
   * Is finalized psbt.
   * @param {IsFinalizedPsbtRequest} jsonObject - request data.
   * @return {Promise<IsFinalizedPsbtResponse>} - response data.
   */
  IsFinalizedPsbt(jsonObject: IsFinalizedPsbtRequest): Promise<IsFinalizedPsbtResponse>;
  /**
   * Join psbt.
   * @param {PsbtList} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  JoinPsbts(jsonObject: PsbtList): Promise<PsbtOutputData>;
  /**
   * Negate privkey.
   * @param {PrivkeyData} jsonObject - request data.
   * @return {Promise<OutputPrivkeyData>} - response data.
   */
  NegatePrivkey(jsonObject: PrivkeyData): Promise<OutputPrivkeyData>;
  /**
   * Negate pubkey.
   * @param {PubkeyData} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  NegatePubkey(jsonObject: PubkeyData): Promise<PubkeyData>;
  /**
   * Parse output descriptor.
   * @param {ParseDescriptorRequest} jsonObject - request data.
   * @return {Promise<ParseDescriptorResponse>} - response data.
   */
  ParseDescriptor(jsonObject: ParseDescriptorRequest): Promise<ParseDescriptorResponse>;
  /**
   * Parse script from hex.
   * @param {ParseScriptRequest} jsonObject - request data.
   * @return {Promise<ParseScriptResponse>} - response data.
   */
  ParseScript(jsonObject: ParseScriptRequest): Promise<ParseScriptResponse>;
  /**
   * Recover secret data on ecdsa adaptor.
   * @param {RecoverEcdsaAdaptorRequest} jsonObject - request data.
   * @return {Promise<SecretData>} - response data.
   */
  RecoverEcdsaAdaptor(jsonObject: RecoverEcdsaAdaptorRequest): Promise<SecretData>;
  /**
   * Create a Schnorr signature for a given message
   * @param {SchnorrSignRequest} jsonObject - request data.
   * @return {Promise<SchnorrSignResponse>} - response data.
   */
  SchnorrSign(jsonObject: SchnorrSignRequest): Promise<SchnorrSignResponse>;
  /**
   * Verify a Schnorr signature for a given message
   * @param {VerifySignatureWithPubkeyRequest} jsonObject - request data.
   * @return {Promise<SchnorrVerifyResponse>} - response data.
   */
  SchnorrVerify(jsonObject: VerifySignatureWithPubkeyRequest): Promise<SchnorrVerifyResponse>;
  /**
   * Select coins.
   * @param {SelectUtxosRequest} jsonObject - request data.
   * @return {Promise<SelectUtxosResponse>} - response data.
   */
  SelectUtxos(jsonObject: SelectUtxosRequest): Promise<SelectUtxosResponse>;
  /**
   * Serialize to ledger format.
   * @param {SerializeLedgerFormatRequest} jsonObject - request data.
   * @return {Promise<SerializeLedgerFormatResponse>} - response data.
   */
  SerializeLedgerFormat(jsonObject: SerializeLedgerFormatRequest): Promise<SerializeLedgerFormatResponse>;
  /**
   * set customize prefix.
   * @param {SetCustomPrefixRequest} jsonObject - request data.
   * @return {Promise<VoidFunctionResponse>} - response data.
   */
  SetCustomPrefix(jsonObject: SetCustomPrefixRequest): Promise<VoidFunctionResponse>;
  /**
   * Set psbt data.
   * @param {SetPsbtRequest} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  SetPsbtData(jsonObject: SetPsbtRequest): Promise<PsbtOutputData>;
  /**
   * Set psbt records.
   * @param {SetPsbtRecordRequest} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  SetPsbtRecord(jsonObject: SetPsbtRecordRequest): Promise<PsbtOutputData>;
  /**
   * Set issue asset.
   * @param {SetRawIssueAssetRequest} jsonObject - request data.
   * @return {Promise<SetRawIssueAssetResponse>} - response data.
   */
  SetRawIssueAsset(jsonObject: SetRawIssueAssetRequest): Promise<SetRawIssueAssetResponse>;
  /**
   * Set reissue asset.
   * @param {SetRawReissueAssetRequest} jsonObject - request data.
   * @return {Promise<SetRawReissueAssetResponse>} - response data.
   */
  SetRawReissueAsset(jsonObject: SetRawReissueAssetRequest): Promise<SetRawReissueAssetResponse>;
  /**
   * Sign bitcoin message.
   * @param {SignMessageRequest} jsonObject - request data.
   * @return {Promise<SignMessageResponse>} - response data.
   */
  SignMessage(jsonObject: SignMessageRequest): Promise<SignMessageResponse>;
  /**
   * Sign psbt with privkey.
   * @param {SignPsbtRequest} jsonObject - request data.
   * @return {Promise<PsbtOutputData>} - response data.
   */
  SignPsbt(jsonObject: SignPsbtRequest): Promise<PsbtOutputData>;
  /**
   * Add sign and set pubkey hash input
   * @param {SignWithPrivkeyRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  SignWithPrivkey(jsonObject: SignWithPrivkeyRequest): Promise<RawTransactionResponse>;
  /**
   * Split txout.
   * @param {SplitTxOutRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  SplitTxOut(jsonObject: SplitTxOutRequest): Promise<RawTransactionResponse>;
  /**
   * TweakAdd privkey.
   * @param {TweakPrivkeyData} jsonObject - request data.
   * @return {Promise<OutputPrivkeyData>} - response data.
   */
  TweakAddPrivkey(jsonObject: TweakPrivkeyData): Promise<OutputPrivkeyData>;
  /**
   * TweakAdd pubkey.
   * @param {TweakPubkeyData} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  TweakAddPubkey(jsonObject: TweakPubkeyData): Promise<PubkeyData>;
  /**
   * TweakAdd schnorr pubkey from privkey.
   * @param {TweakPrivkeyData} jsonObject - request data.
   * @return {Promise<SchnorrKeyPairData>} - response data.
   */
  TweakAddSchnorrPubkeyFromPrivkey(jsonObject: TweakPrivkeyData): Promise<SchnorrKeyPairData>;
  /**
   * TweakAdd schnorr pubkey from pubkey.
   * @param {TweakPubkeyData} jsonObject - request data.
   * @return {Promise<SchnorrPubkeyData>} - response data.
   */
  TweakAddSchnorrPubkeyFromPubkey(jsonObject: TweakPubkeyData): Promise<SchnorrPubkeyData>;
  /**
   * TweakMul privkey.
   * @param {TweakPrivkeyData} jsonObject - request data.
   * @return {Promise<OutputPrivkeyData>} - response data.
   */
  TweakMulPrivkey(jsonObject: TweakPrivkeyData): Promise<OutputPrivkeyData>;
  /**
   * TweakMul pubkey.
   * @param {TweakPubkeyData} jsonObject - request data.
   * @return {Promise<PubkeyData>} - response data.
   */
  TweakMulPubkey(jsonObject: TweakPubkeyData): Promise<PubkeyData>;
  /**
   * Unblind transaction.
   * @param {UnblindRawTransactionRequest} jsonObject - request data.
   * @return {Promise<UnblindRawTransactionResponse>} - response data.
   */
  UnblindRawTransaction(jsonObject: UnblindRawTransactionRequest): Promise<UnblindRawTransactionResponse>;
  /**
   * Update Pegin witness stack. isElements not reference (force true).
   * @param {UpdateWitnessStackRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  UpdatePeginWitnessStack(jsonObject: UpdateWitnessStackRequest): Promise<RawTransactionResponse>;
  /**
   * Update sequence number
   * @param {UpdateTxInSequenceRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  UpdateTxInSequence(jsonObject: UpdateTxInSequenceRequest): Promise<RawTransactionResponse>;
  /**
   * Update txout amount.
   * @param {UpdateTxOutAmountRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  UpdateTxOutAmount(jsonObject: UpdateTxOutAmountRequest): Promise<RawTransactionResponse>;
  /**
   * Update witness stack
   * @param {UpdateWitnessStackRequest} jsonObject - request data.
   * @return {Promise<RawTransactionResponse>} - response data.
   */
  UpdateWitnessStack(jsonObject: UpdateWitnessStackRequest): Promise<RawTransactionResponse>;
  /**
   * Verify signature on ecdsa adaptor.
   * @param {VerifyEcdsaAdaptorRequest} jsonObject - request data.
   * @return {Promise<VerifySignatureResponse>} - response data.
   */
  VerifyEcdsaAdaptor(jsonObject: VerifyEcdsaAdaptorRequest): Promise<VerifySignatureResponse>;
  /**
   * Verify bitcoin message.
   * @param {VerifyMessageRequest} jsonObject - request data.
   * @return {Promise<VerifyMessageResponse>} - response data.
   */
  VerifyMessage(jsonObject: VerifyMessageRequest): Promise<VerifyMessageResponse>;
  /**
   * Verify the sign of psbt.
   * @param {VerifyPsbtSignRequest} jsonObject - request data.
   * @return {Promise<VerifySignResponse>} - response data.
   */
  VerifyPsbtSign(jsonObject: VerifyPsbtSignRequest): Promise<VerifySignResponse>;
  /**
   * Verify transaction sign. (only pubkey hash or multisig script.)
   * @param {VerifySignRequest} jsonObject - request data.
   * @return {Promise<VerifySignResponse>} - response data.
   */
  VerifySign(jsonObject: VerifySignRequest): Promise<VerifySignResponse>;
  /**
   * Verify signature
   * @param {VerifySignatureRequest} jsonObject - request data.
   * @return {Promise<VerifySignatureResponse>} - response data.
   */
  VerifySignature(jsonObject: VerifySignatureRequest): Promise<VerifySignatureResponse>;
  /**
   * Verify signature with pubkey.
   * @param {VerifySignatureWithPubkeyRequest} jsonObject - request data.
   * @return {Promise<VerifySignatureResponse>} - response data.
   */
  VerifySignatureWithPubkey(jsonObject: VerifySignatureWithPubkeyRequest): Promise<VerifySignatureResponse>;
}

/**
* Add initialized listener.
* @param {() => Promise<void>} func - callback function.
*/
export function addInitializedListener(func: () => Promise<void>): void;

/**
* Get cfd-js-wasm object.
* @return {Cfdjs} - Cfdjs data.
*/
export function getCfd(): Cfdjs;

/**
* Has wasm loading check.
* @return {boolean} - boolean data.
*/
export function hasLoadedWasm(): boolean;

/** error class. */
export class CfdError extends Error {
  /**
   * constructor.
   * @param {string} message - Error message.
   * @param {InnerErrorResponse} errorInformation - Error information data.
   * @param {Error} cause - Cause of the error.
   */
  constructor(message: string, errorInformation: InnerErrorResponse, cause: Error);
  /**
   * get error string.
   * @return {string} - string data.
   */
  toString(): string;
  /**
   * get error information.
   * @return {InnerErrorResponse} - InnerErrorResponse data.
   */
  getErrorInformation(): InnerErrorResponse;
  /**
   * get error cause.
   * @return {Error} - Error data.
   */
  getCause(): Error;
}
