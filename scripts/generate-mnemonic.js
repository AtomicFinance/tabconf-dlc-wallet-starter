const bip39 = require('bip39');
const fs = require('fs');
const path = require('path');

const generateMnemonics = () => {
  const mnemonics = {
    oracle: bip39.generateMnemonic(),
    alice: bip39.generateMnemonic(),
    bob: bip39.generateMnemonic()
  };
  const envPath = path.join(__dirname, '..', '.env');

  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Remove existing mnemonic entries
  const mnemonicRegex = /^REACT_APP_.*_MNEMONIC=.*/gm;
  let newEnvContent = envContent.replace(mnemonicRegex, '').trim();

  // Add new mnemonic entries
  newEnvContent += `
REACT_APP_ORACLE_MNEMONIC="${mnemonics.oracle}"
REACT_APP_ALICE_MNEMONIC="${mnemonics.alice}"
REACT_APP_BOB_MNEMONIC="${mnemonics.bob}"
`;

  fs.writeFileSync(envPath, newEnvContent);

  console.log('New mnemonics generated and added to .env file:');
  console.log('Oracle:', mnemonics.oracle);
  console.log('Alice:', mnemonics.alice);
  console.log('Bob:', mnemonics.bob);
};

generateMnemonics();
