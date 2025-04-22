import { useEffect, useRef, useState } from "react";

export default function FakeTerminal() {
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3001");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.txHash) {
        setLogs((prev) => [...prev, `✔ Stored on Blockchain: ${data.txHash}`]);
      }
    };

    return () => ws.current && ws.current.close();
  }, []);

  const handleCommand = () => {
    if (!input.trim()) return;

    const log = {
      ip: "127.0.0.1", // Replace with actual IP (if available)
      command: input,
      threatLevel: "high", // You can change dynamically if needed
      timestamp: new Date().toISOString(),
    };

    ws.current.send(JSON.stringify(log));
    setLogs((prev) => [...prev, `> ${input}`]);
    setInput("");
  };

  return (
    <div className="p-4 bg-black text-green-400 h-full overflow-auto font-mono">
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
      <div className="flex">
        <span>&gt;</span>
        <input
          className="bg-black text-green-400 outline-none flex-1 ml-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand()}
          autoFocus
        />
      </div>
    </div>
  );
}
