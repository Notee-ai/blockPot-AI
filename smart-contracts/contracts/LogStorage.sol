// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LogStorage {
    struct Log {
        string ip;
        string command;
        string threatLevel;
        uint256 timestamp;
    }

    Log[] public logs;

    event LogSaved(uint index, string ip, string command, string threatLevel, uint256 timestamp);

    function saveLog(string memory ip, string memory command, string memory threatLevel) public {
        Log memory newLog = Log(ip, command, threatLevel, block.timestamp);
        logs.push(newLog);
        emit LogSaved(logs.length - 1, ip, command, threatLevel, block.timestamp);
    }

    function getLog(uint index) public view returns (string memory, string memory, string memory, uint256) {
        require(index < logs.length, "Invalid index");
        Log memory l = logs[index];
        return (l.ip, l.command, l.threatLevel, l.timestamp);
    }

    function getTotalLogs() public view returns (uint256) {
        return logs.length;
    }
}
