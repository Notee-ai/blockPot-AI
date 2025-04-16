require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0", // match this to your contract pragma
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts:[`0x${process.env.PRIVATE_KEY}`]

    }
  }
};
