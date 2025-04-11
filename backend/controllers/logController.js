const logs = [];

exports.getLogs = (req, res) => {
  res.json(logs);
};

exports.postLog = async (req, res) => {
  const { ip, command, threatLevel, timestamp, blockchainHash } = req.body;

  const newLog = {
    ip,
    command,
    threatLevel,
    timestamp: timestamp || new Date().toISOString(),
    blockchainHash: blockchainHash || '',
  };

  logs.push(newLog);

  console.log('[+] New Log:', newLog);

  res.status(201).json({ success: true, data: newLog });
};
