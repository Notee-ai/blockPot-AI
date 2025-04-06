# 🚨 BlockPot AI  
### Honeypot + Blockchain + AI + NLP

---

## 🧠 What is it?

**BlockPot AI** is a smart honeypot system designed to trap hackers, analyze their behavior using **AI** and **Natural Language Processing (NLP)**, and securely store all activity logs on the **blockchain** for transparency and forensic investigation.

---

## ❓ What Problem Does It Solve?

- 🔍 Real-time threat detection is difficult for security teams.
- 🧾 Traditional logs can be modified or deleted — risking loss of evidence.
- 🧠 Hacker commands are often cryptic and time-consuming to analyze manually.

---

## ⚙️ What Does the Project Do?

### 🪤 1. Deploys a Fake System (Honeypot)
- Simulates a real server (e.g., SSH or Web login) to lure attackers.
- Captures attacker interactions: commands, tools used, and access attempts.

### 🗣️ 2. Uses NLP to Analyze Behavior
- Extracts meaning from typed attacker commands.
- Detects malicious keywords like `wget`, `chmod`, `root`, `malware`.
- Identifies possible attack intentions such as:
  - Installing viruses
  - Deleting system logs
  - Stealing credentials

### 🧠 3. Uses TensorFlow for Threat Classification
- AI model classifies attacker sessions as:
  - ✅ Safe
  - ⚠️ Suspicious
  - ❌ Malicious
- Based on command patterns and behavioral analysis.

### 🔐 4. Stores Data on Blockchain
- Logs attacker IP, command, threat score, and timestamp.
- Data is **immutable** and tamper-proof.
- Ideal for digital forensics, reporting, and compliance.

---

## 🖥️ What Does the User See?

A real-time dashboard with:
- 🌐 Live attack attempts
- 🌍 Attacker’s IP and geographic location
- 🧾 NLP summary of command behavior (e.g., *“attempting to download malware”*)
- 🔥 Threat level (Low / Medium / High)
- 🔗 Blockchain verification hash for each log

---

## 💡 In One Line:
> A smart trap system that catches hackers, reads what they type using NLP, predicts how dangerous they are using ML, and stores it securely forever using Blockchain.

---

## 🚀 Technologies Used

| Tech | Purpose |
|------|---------|
| 🐍 Python | Backend and data processing |
| 🧠 TensorFlow | AI model for threat classification |
| 📜 NLP (spaCy / Transformers) | Analyzing attacker commands |
| ⛓️ Ethereum / Hyperledger | Immutable log storage |
| 🐳 Docker | Isolated honeypot environment |
| 🌐 React.js / Flask | Dashboard and API |

---

## 📂 Future Enhancements
- 🛠️ Custom rule engine for dynamic honeypot responses
- 📊 Threat heatmap visualization
- 🧪 Integration with antivirus sandbox for file analysis

---

## 👨‍💻 Built For:
Hackathons • Cybersecurity Challenges • AI + Blockchain Showcases

---

