const fs = require('fs');
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3001');

ws.on('open', () => {
    console.log('Connected to backend WebSocket');
});

const logPath = '/home/cowrie/cowrie/var/log/cowrie/cowrie.json';

fs.watchFile(logPath, { interval: 1000 }, () => {
    const data = fs.readFileSync(logPath, 'utf8');
    const lines = data.trim().split('\n');
    const last = lines[lines.length - 1];

    try {
        const log = JSON.parse(last);

        if (log.eventid === 'command.input') {
            const payload = {
                ip: log.src_ip,
                command: log.input,
                threatLevel: 'Suspicious',
                timestamp: new Date().toISOString()
            };
            ws.send(JSON.stringify(payload));
            console.log('Sent log:', payload);
        }
    } catch (e) {
        console.error('Parse error:', e);
    }
});
