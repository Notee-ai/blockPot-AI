import React from "react";

const FakeTerminal = ({ onCommandSubmit }) => {
  const [command, setCommand] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommandSubmit(command); // Trigger the log submission
    setCommand(""); // Clear the command input
  };

  return (
    <div>
      <h2>Fake Terminal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command"
          required
        />
        <button type="submit">Submit Command</button>
      </form>
    </div>
  );
};

export default FakeTerminal;
