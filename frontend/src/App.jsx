import React, { useState, useEffect } from "react";
import FakeLoginPanel from "./components/FakeLoginPanel"; // Fake login panel for the hacker
import FakeTerminal from "./components/FakeTerminal"; // Fake terminal for the hacker
import Dashboard from "./components/Dashboard"; // Dashboard to view logs

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logs, setLogs] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = new WebSocket("ws://localhost:5000");

    // Set up the WebSocket connection
    newSocket.onopen = () => {
      console.log("WebSocket connected!");
    };

    // Listen for incoming messages from the server
    newSocket.onmessage = (event) => {
      const log = JSON.parse(event.data);
      setLogs((prevLogs) => [...prevLogs, log]); // Add new log to the state
    };

    // Handle WebSocket close
    newSocket.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close(); // Cleanup when the component unmounts
    };
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status); // Set the login status
  };

  const handleCommandSubmit = (command) => {
    if (socket) {
      // Send log command to backend via WebSocket
      socket.send(
        JSON.stringify({
          command: command,
        })
      );
    }
  };

  return (
    <div>
      <h1>BlockPot AI - Hacker Simulation</h1>

      {/* Conditional render: Login vs Dashboard */}
      {!isLoggedIn ? (
        <FakeLoginPanel onLogin={handleLogin} />
      ) : (
        <div>
          <FakeTerminal onCommandSubmit={handleCommandSubmit} />

          {/* Displaying the Dashboard */}
          <Dashboard logs={logs} />
        </div>
      )}
    </div>
  );
};

export default App;
