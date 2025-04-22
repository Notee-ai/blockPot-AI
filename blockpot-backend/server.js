require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { ethers } = require('ethers');
const cowrieEmitter = require('./cowrie-log-reader/cowrie-log-reader'); // Adjust path if needed

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Blockchain setup
const ABI = require('./blockchain/abi/LogStorage.json').abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// Store connected clients
let clients = [];

wss.on('connection', (ws) => {
    console.log('Frontend connected via WebSocket');
    clients.push(ws);

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

// Listen to Cowrie logs and broadcast/store
cowrieEmitter.on('cowrieLog', async ({ ip, command, threatLevel, timestamp }) => {
    const message = JSON.stringify({ command });

    // Send to frontend terminal
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });

    // Store on blockchain
    try {
        const tx = await contract.storeLog(ip, command, threatLevel, timestamp);
        await tx.wait();
        console.log('Stored on blockchain:', tx.hash);
    } catch (err) {
        console.error('Blockchain error:', err);
    }
});

server.listen(3001, () => console.log('Backend WebSocket + Blockchain running on port 3001'));
