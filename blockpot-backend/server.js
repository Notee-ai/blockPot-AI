require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { ethers } = require('ethers');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const ABI = require('./abi/LogStorage.json').abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

wss.on('connection', (ws) => {
    console.log('Frontend connected via WebSocket');

    ws.on('message', async (data) => {
        const log = JSON.parse(data);
        const { ip, command, threatLevel, timestamp } = log;

        try {
            const tx = await contract.storeLog(ip, command, threatLevel, timestamp);
            await tx.wait();
            console.log('Stored on blockchain:', tx.hash);
            ws.send(JSON.stringify({ status: 'stored', txHash: tx.hash }));
        } catch (err) {
            console.error('Blockchain error:', err);
        }
    });
});

server.listen(3001, () => console.log('Backend running on port 3001'));
