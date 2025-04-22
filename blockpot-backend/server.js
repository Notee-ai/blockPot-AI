require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { ethers } = require('ethers');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Blockchain setup
const ABI = require('./blockchain/abi/LogStorage.json').abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// In-memory cache to store logs for REST API
let cachedLogs = [];

// WebSocket for live updates from frontend
wss.on('connection', (ws) => {
    console.log('Frontend connected via WebSocket');

    ws.on('message', async (data) => {
        const log = JSON.parse(data);
        const { ip, command, threatLevel, timestamp } = log;

        try {
            const tx = await contract.storeLog(ip, command, threatLevel, timestamp);
            await tx.wait();
            console.log('Stored on blockchain:', tx.hash);
            cachedLogs.push({ ip, command, threatLevel, timestamp, txHash: tx.hash });

            ws.send(JSON.stringify({ status: 'stored', txHash: tx.hash }));
        } catch (err) {
            console.error('Blockchain error:', err);
            ws.send(JSON.stringify({ status: 'error', message: err.message }));
        }
    });
});

// REST endpoint for frontend dashboard
app.get('/api/logs', (req, res) => {
    res.json(cachedLogs);
});

// Serve frontend (optional for deployment)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
