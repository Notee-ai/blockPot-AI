// backend/utils/blockchain.js

const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Load contract ABI (Application Binary Interface)
let contractJSON;
try {
  contractJSON = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../smart-contracts/artifacts/contracts/LogStorage.sol/LogStorage.json"))
  );
} catch (error) {
  console.error("Error loading contract ABI:", error);
  process.exit(1);  // Exit the process if ABI loading fails
}

// Set up Ethereum provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract address from environment variables (replace with your deployed contract address)
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractJSON.abi, signer);

// WebSocket setup for real-time communication
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: process.env.WS_PORT || 4000 });  // Default WebSocket port 4000

// Broadcast function to send updates to connected clients
function broadcastMessage(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// Listen for 'LogSaved' events emitted by the smart contract
contract.on("LogSaved", (index, ip, command, threatLevel, timestamp) => {
  console.log("[Blockchain] New log event:", { index, ip, command, threatLevel, timestamp });
  broadcastMessage({
    event: "LogSaved",
    data: { index, ip, command, threatLevel, timestamp },
  });
});

// Export the provider, signer, contract, and WebSocket server
module.exports = { provider, signer, contract, wss };
