# Tabconf DLC Wallet Starter Tutorial

Welcome to the Tabconf DLC Wallet Starter! This guide will walk you through the steps to set up and use the wallet for creating and executing Discreet Log Contracts (DLCs) on the Signet network.

## Prerequisites

- This application is for educational purposes only. Do not use it with real funds in production.

## Usage Guide

Open up 3 tabs
- https://tabconf.atomic.finance/oracle
- https://tabconf.atomic.finance/client
- https://tabconf.atomic.finance/counterparty

### Step 1: Generate Mnemonics

- Navigate to the application and generate mnemonics. These are encrypted and stored in local storage. **Note:** Do not use this for real funds in production!

### Step 2: Create Oracle Announcement

- Go to the `/oracle` page.
- Create an Oracle Announcement and copy the generated hex.

### Step 3: Client Setup

- Navigate to the `/client` page.
- Paste the Oracle Announcement hex.
- Get a new address and acquire Signet funds for this address.
- Check your balance (this may take up to 15 seconds).

### Step 4: Generate DLC Offer

- Generate a DLC Offer on the `/client` page.

### Step 5: Counterparty Setup

- Go to the `/counterparty` page.
- Paste the DLC Offer hex.
- Get a new address and receive funds there.
- Create a DLC Accept using the received funds.

### Step 6: Create DLC Sign Message

- Return to the `/client` page.
- Paste the DLC Accept hex to create the DLC Sign message.

### Step 7: Finalize DLC

- Go back to the `/counterparty` page.
- Paste the DLC Sign hex to finalize the DLC.

### Step 8: Broadcast Transaction

- Broadcast the finalized transaction on [mempool.space/signet](https://mempool.space/signet).

### Step 9: Create Oracle Attestation

- Navigate to the `/oracle` page.
- Create the Oracle Attestation.

### Step 10: Execute DLC

- Return to the `/counterparty` page.
- Execute the DLC using the Oracle Attestation.

## Conclusion

Congratulations! You have successfully created and executed a DLC on the Signet network using the Tabconf DLC Wallet Starter.
