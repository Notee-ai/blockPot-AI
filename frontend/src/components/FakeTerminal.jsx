import { useEffect, useRef, useState } from "react";

export default function FakeTerminal() {
  const [logs, setLogs] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3001");
  
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.command) {
        setLogs((prev) => [...prev, `> ${data.command}`]);
      } else if (data.status === 'stored') {
        setLogs((prev) => [...prev, `✔ Stored on blockchain: ${data.txHash}`]);
      }
    };
  
    return () => ws.current && ws.current.close();
  }, []);
  

  return (
    <div className="p-4 bg-black text-green-400 h-full overflow-auto font-mono">
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
}
