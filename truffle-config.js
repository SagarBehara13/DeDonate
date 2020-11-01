require('babel-register');
require('babel-polyfill');
require('dotenv').config()
const fs = require('fs');

const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const kovanUrl = process.env.KOVAN_URL;
const privateKey = process.env.PRIVATE_KEY

const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 4444,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          [privateKey],
          kovanUrl
        )
      },
      network_id: 42
    },
    testnet: {
      provider: function() {
        return new HDWalletProvider(
          [privateKey],
          'https://public-node.testnet.rsk.co/2.0.1/'
        )
      },
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.6",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
