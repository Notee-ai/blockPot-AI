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

----
🚀 Improvements to Stand Out & Impress Judges:
✅ 1. Deploy a Fake SSH Server (Not Just a Web Terminal)

🛠 Use something like Cowrie or write a minimal fake SSH server.
🔍 When a hacker connects via terminal (e.g., ssh root@your-ip), you:

    Record every command

    Log the IP, session time

    Send each command to your NLP + ML classifier

➡️ Judges will love this because it mimics real hacker behavior.
✅ 2. Real-time AI Analysis (Live Threat Feedback)

📊 Show a real-time dashboard:

    IP & location of attacker

    Command typed: "wget virus.sh"

    NLP behavior summary: "Trying to download malware"

    ML threat label: Malicious

    Blockchain hash: ✅ Stored

➡️ Looks professional and enterprise-ready.
✅ 3. Make it Interactive in the Demo

During your pitch:

    Show how a hacker connects using their terminal.

    Type some hacking commands.

    BAM — it pops up live in your dashboard with the threat score.

➡️ Judges will be blown away by the live interaction.
✅ 4. Custom Rule Engine (Bonus Points)

Add your own rules like:

    If command contains rm, chmod, ssh, etc. → auto-flag

    Add alerting: send Slack/Email/SMS (can fake it for demo)

➡️ Shows you're thinking like a real security engineer.
✅ 5. Blockchain Visual Proof

Show a blockchain explorer view:

    Every log entry with hash + time

    Say: “Even if the attacker deletes everything, this log is permanent.”

➡️ Judges will be like: “This is perfect for forensic teams!”
🎁 Bonus Ideas (Pick only if time allows):

    Add GeoIP tracking (see where attacker is from)

    Add dark mode dashboard for hacker vibes 😎

    Integrate with VirusTotal API to scan URLs/files they try to use

    Add a threat heatmap (cool visuals)

They Want...	You Give Them...
Real-world application	SSH trap + NLP + blockchain logging
AI/ML usage	Real-time threat classification
Good UI/UX	Dashboard with live updates + visual logs
Innovation	Using honeypot + AI + blockchain together
