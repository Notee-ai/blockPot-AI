// backend/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logRoutes = require("./routes/logs");
const WebSocket = require("ws");

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// WebSocket Setup
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection established.");

  ws.on("message", (message) => {
    console.log("Received message:", message);
  });

  // You can send a message to the client like this
  // ws.send("Welcome to the WebSocket server!");
});

// Upgrade HTTP server to support WebSocket connections
app.server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

app.server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

// Routes setup
app.use("/api/logs", logRoutes);

module.exports = app; // Export app if needed elsewhere
