// frontend/src/components/Dashboard.jsx

import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs from the backend when the component is mounted
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/logs");
        const data = await response.json();
        setLogs(data.logs || []);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Display logs in a table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">IP Address</th>
            <th className="px-4 py-2 border-b">Command</th>
            <th className="px-4 py-2 border-b">Threat Level</th>
            <th className="px-4 py-2 border-b">Timestamp</th>
            <th className="px-4 py-2 border-b">Blockchain Hash</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{log.ip}</td>
              <td className="px-4 py-2 border-b">{log.command}</td>
              <td className="px-4 py-2 border-b">{log.threatLevel}</td>
              <td className="px-4 py-2 border-b">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">{log.blockchainHash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
