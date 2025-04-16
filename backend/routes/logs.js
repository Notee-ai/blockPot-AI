// backend/routes/logs.js

const express = require("express");
const { addLog } = require("../controllers/logController"); // Import your controller
const router = express.Router();

// Define routes correctly with handler functions
router.post("/", addLog);  // POST request to add a log
// You can add more routes for GET, DELETE, etc.
router.get("/", (req, res) => {
  res.json({ message: "Logs API working" });
});

module.exports = router;
