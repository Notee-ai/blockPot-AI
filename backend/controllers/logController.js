// backend/controllers/logController.js

const { contract } = require("../utils/blockchain");
const { wss } = require("../server"); // Import the WebSocket server

const addLog = async (req, res) => {
  try {
    const { ip, command, threatLevel } = req.body;

    if (!ip || !command || !threatLevel) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const tx = await contract.saveLog(ip, command, threatLevel);
    await tx.wait();

    // Broadcast log to all WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            ip,
            command,
            threatLevel,
            timestamp: Date.now(),
            blockchainHash: tx.hash,
          })
        );
      }
    });

    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("Add log error:", err);
    res.status(500).json({ error: "Failed to store log" });
  }
};

module.exports = { addLog };
