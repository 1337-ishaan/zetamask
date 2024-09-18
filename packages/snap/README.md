# ZetaMask Snap

## Overview
ZetaMask Snap allows users to interact with Bitcoin and ZetaChain through various JSON-RPC methods.


The ZetaMask Snap is a powerful tool that enhances the functionality of MetaMask, allowing users to seamlessly interact with both Bitcoin and ZetaChain. By providing a suite of JSON-RPC methods, this snap enables developers to build innovative applications that leverage the strengths of both ecosystems.

From a user's perspective, the ZetaMask Snap offers several benefits that enhance their interaction with the ZetaChain ecosystem:

*   **Seamless Bitcoin Integration**: The ZetaMask Snap allows users to easily access and manage their Bitcoin assets directly within MetaMask, making it simpler to engage with ZetaChain and its applications.
*   **Streamlined User Experience**: The snap's user-friendly interface and comprehensive features ensure a smooth and intuitive experience for users, encouraging them to explore and utilize the ZetaChain ecosystem more extensively.
*   **Expanded Access to ZetaChain**: By providing a convenient gateway to ZetaChain through MetaMask, the ZetaMask Snap enables users to discover and interact with a broader range of ZetaChain-based applications and services.

## Available Methods
**Note:** If an error occurs, the return type is a string. It is recommended to use the try-catch-finally pattern for better error handling.


### 0. `wallet_requestSnaps`
- **Description**: Installs the ZetaMask Snap, which is the first step required to use the below mentioned API methods.
- **Parameters**: None.
- **Implementation**:
```javascript
const result = await window.ethereum.request({
  method: 'wallet_requestSnaps',
  params: { [snapId]: {} }, // default [snapId] params = {} 
});
```

**Note:** If the user hasn't installed the MetaMask Snap, none of the API methods will function.



### 1. `derive-btc-wallet`
- **Description**: Creates a Bitcoin wallet address based on the provided BIP32 public key.
- **Parameters**: 
  - `isMainnet`: Boolean indicating whether to use the mainnet or testnet.
- **Implementation**:
```javascript
const btcWallet = await window.ethereum.request({
  method: 'wallet_snap',
  params: {
    snapId: defaultSnapOrigin,
    request: {
      method: 'derive-btc-wallet',
      params: [isMainnet]
    },
  },
});
```
- **Mock Successful Response**:
```JSON
    "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" |"tb1qex3zpp07a0ctu8x00ah4mnyess0900a2dklttr" // mainnet || testnet
```




### 2. `get-btc-utxo`
- **Description**: Fetches unspent transaction outputs (UTXOs) for the connected Bitcoin account.
- **Parameters**: None.
- **Implementation**:
```javascript
const btcUtxo = await window.ethereum.request({
  method: 'wallet_snap',
  params: {
    snapId: defaultSnapOrigin,
    request: {
      method: 'get-btc-utxo',
      params: [isMainnet]
    },
  },
});
```
- **Mock Successful Response**:
```JSON
{
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "total_received": 1000000,
  "total_sent": 500000,
  "balance": 500000,
  "unconfirmed_balance": 0,
  "final_balance": 500000,
  "n_tx": 2,
  "unconfirmed_n_tx": 0,
  "final_n_tx": 2,
  "txs": [
    {
      "block_hash": "00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa",
      "block_height": 589741,
      "hash": "b84a66c46e24fe71f9d8ab29b06374c7c53cfd989c4e06e81d1d4d120a973016",
      "addresses": ["bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"],
      "total": 500000,
      "fees": 1000,
      "size": 225,
      "vsize": 225,
      "preference": "high",
      "confirmed": "2019-07-24T11:11:45Z",
      "received": "2019-07-24T11:11:45Z",
      "ver": 1,
      "double_spend": false,
      "vin_sz": 1,
      "vout_sz": 2,
      "confirmations": 1,
      "inputs": [],
      "outputs": []
    }
  ]
}
```


### 3. `get-deposit-fees`
- **Description**: Retrieves the current Bitcoin deposit transaction fees 
```ZetaChain deposit fees = (high_priority_fees_in_kb * 0.001)vB * 68vB * 2```.
- **Parameters**: None.
- **Implementation**:
```javascript
const depositFees = await window.ethereum.request({
  method: 'wallet_snap',
  params: {
    snapId: defaultSnapOrigin,
    request: {
      method: 'get-deposit-fees',
    },
  },
});
```
- **Mock Successful Response**:
```JSON
    945910 // (sats)
```

### 4. `get-balance-and-rate`
- **Description**: Retrieves the balance for a given address and exchange rates for Zeta and Bitcoin.
- **Parameters**: 
  - `address`: The Zeta or Ethereum address to check.
- **Implementation**:
```javascript
const balanceAndRate = await window.ethereum.request({
  method: 'wallet_snap',
  params: {
    snapId: defaultSnapOrigin,
    request: {
      method: 'get-balance-and-rate',
      params: [evmAddress]
    },
  },
});
```
- **Mock Successful Response**:
```JSON
{
  "zeta": {
    "balances": [
      {
        "denom": "azeta",
        "amount": "2986347517451374218"
      }
    ],
    "pagination": {
      "next_key": null,
      "total": "1"
    }
  },
  "nonZeta": [
    {
      "token": {
        "address": "0xd97B1de3619ed2c6BEb3860147E30cA8A7dC9891",
        "decimals": "18",
        "name": "BNB-bsc_testnet",
        "symbol": "tBNB",
        "total_supply": "19825202226962956112776",
        "type": "ERC-20"
      },
      "value": "550000000000000"
    }
  ],
  "zetaPrice": 0.480197,
  "btcPrice": 59783
}
```

### 5. `transact-btc`
- **Description**: Executes a cross-chain swap transaction for Bitcoin.
- **Parameters**: 
  - `amount`: The amount to send.
  - `memo`: Optional memo for the transaction.
  - `fee`: Transaction fee.
- **Implementation**:
```javascript
const transactHash = await window.ethereum.request({
  method: 'wallet_snap',
  params: {
    snapId: defaultSnapOrigin,
    request: {
      method: 'transact-btc',
      params: [amount,memo,fee]
    },
  },
});
```
- **Mock Successful Response**:
```JSON
    "3ca3fe3e8f7f0e69abdf50ab2942b3109f88468601fedd79ea57e3e8491025bd" // transaction hash
```


### 6. `track-cctx`
- **Description**: Tracks a cross-chain transaction by its hash.
- **Parameters**: 
  - `transactionHash`: The hash of the transaction to track.
- **Implementation**:
```javascript
const transactHash = await window.ethereum.request({
  method: 'wallet_snap',
  params: {
    snapId: defaultSnapOrigin,
    request: {
      method: 'transact-btc',
      params: [transactionHash]
    },
  },
});
```
- **Mock Successful Response**:
```JSON
{
  "CrossChainTx": {
    "creator": "zeta167ns6zwczl9asjs47jwv3uhtkxfjcvx3dgf3ct",
    "index": "0x4607fa7805538dab320466e4bc0530fa9c5ca3686da68cb1822492acf9adeef1",
    "zeta_fees": "0",
    "relayed_message": "102fa443f05200bb74aba1c1f15f442dbef32ffb01d97b1de3619ed2c6beb3860147e30ca8a7dc989170991c20c7c4e0021ef0bd3685876cc3ac5251f0",
    "cctx_status": {
      "status": "OutboundMined",
      "status_message": "Outbound succeeded, mined",
      "lastUpdate_timestamp": "1725546253",
      "isAbortRefunded": false
    },
    "inbound_params": {
      "sender": "tb1qex3zpp07a0ctu8x00ah4mnyess0900a2dklttr",
      "sender_chain_id": "18332",
      "tx_origin": "tb1qex3zpp07a0ctu8x00ah4mnyess0900a2dklttr",
      "coin_type": "Gas",
      "asset": "",
      "amount": "4832",
      "observed_hash": "0e5f0285d0727d4ba5ebf33b1d2eb162959deeea1c665967a2fe3fb4cdf70504",
      "observed_external_height": "2903335",
      "ballot_index": "0x4607fa7805538dab320466e4bc0530fa9c5ca3686da68cb1822492acf9adeef1",
      "finalized_zeta_height": "6647368",
      "tx_finalization_status": "Executed"
    },
    "outbound_params": [
      {
        "receiver": "tb1qex3zpp07a0ctu8x00ah4mnyess0900a2dklttr",
        "receiver_chainId": "7001",
        "coin_type": "Gas",
        "amount": "0",
        "tss_nonce": "0",
        "gas_limit": "0",
        "gas_price": "",
        "gas_priority_fee": "",
        "hash": "0x4b5ea13e790b82edc9cf3db9a5ef11f98edb21d250f6ebb882de0168e10e23d0",
        "ballot_index": "",
        "observed_external_height": "6647368",
        "gas_used": "0",
        "effective_gas_price": "0",
        "effective_gas_limit": "0",
        "tss_pubkey": "zetapub1addwnpepq28c57cvcs0a2htsem5zxr6qnlvq9mzhmm76z3jncsnzz32rclangr2g35p",
        "tx_finalization_status": "Executed"
      }
    ]
  }
}
```

## Valid Origins
The snap only accepts requests from the following origins:
- `https://zetamask.com`
