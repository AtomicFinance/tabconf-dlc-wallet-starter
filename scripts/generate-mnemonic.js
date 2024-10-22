const bip39 = require('bip39');
const fs = require('fs');
const path = require('path');

const generateMnemonic = () => {
  const mnemonic = bip39.generateMnemonic();
  const envPath = path.join(__dirname, '..', '.env');

  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  const mnemonicRegex = /^REACT_APP_MNEMONIC=.*/m;
  const newEnvContent = envContent.replace(mnemonicRegex, '').trim() + `\nREACT_APP_MNEMONIC="${mnemonic}"\n`;

  fs.writeFileSync(envPath, newEnvContent);

  console.log('New mnemonic generated and added to .env file:');
  console.log(mnemonic);
};

generateMnemonic();
