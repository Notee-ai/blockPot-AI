const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Path to Cowrie JSON log file
const logFilePath = '/cowrie/var/log/cowrie/cowrie.json'; // UPDATE THIS!

const readStream = fs.createReadStream(logFilePath, {
  encoding: 'utf8',
  tail: true,
});

const rl = readline.createInterface({
  input: readStream,
});

rl.on('line', (line) => {
  try {
    const logEntry = JSON.parse(line);
    console.log('[COWRIE LOG]', logEntry);
    // TODO: Trigger blockchain store or send to server.js
  } catch (err) {
    console.error('Invalid JSON:', line);
  }
});
