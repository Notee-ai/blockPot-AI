<div align="center">
  <img src="https://images.unsplash.com/photo-1639762681485-074b7f4eccd5?q=80&w=2000&auto=format&fit=crop" alt="BlockPot-AI Banner" width="100%" height="300" style="object-fit: cover;" />

  <h1>🛡️ BlockPot-AI</h1>
  <p><strong>Intelligent Terminal Command Classification & Blockchain Defense System</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black" alt="Solidity" />
  </p>
</div>

## 📖 About The Project

**BlockPot-AI** is an advanced cybersecurity and machine learning ecosystem designed to classify Linux terminal commands as **Safe, Suspicious, or Malicious**. By combining Natural Language Processing (NLP) with Recurrent Neural Networks (RNN), alongside a React-based frontend and a Solidity/Hardhat-powered blockchain backend, this project creates an intelligent threat-detection environment.

### 🧠 Core AI Capabilities
*   **NLP Preprocessing:** Utilizes `spaCy` to analyze and tokenize attacker-style commands.
*   **Deep Learning Models:** Trained a robust RNN using `TensorFlow` to understand command behavior patterns over time.
*   **Threat Detection:** Can effectively catch anomalies like:
    *   `wget`, `curl` → *Malware download*
    *   `rm`, `shred` → *Log deletion / Evasion*
    *   `sudo`, `passwd` → *Privilege escalation*

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **AI / Machine Learning** | Python, spaCy, TensorFlow, Pandas, Matplotlib |
| **Frontend** | React, Vite, JavaScript, HTML, CSS |
| **Blockchain / Smart Contracts** | Solidity, Hardhat, Web3 |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### 1. Clone the repository
```bash
git clone https://github.com/Notee-ai/blockPot-AI.git
cd blockPot-AI
```

### 2. Frontend Setup
Navigate to the frontend directory to run the React UI:
```bash
cd frontend
npm install
npm run dev
```

### 3. Blockchain / Smart Contract Setup
Navigate to the Hardhat directory to test or deploy your smart contracts:
```bash
cd blockpot-backend/blockchain
npm install
npx hardhat compile
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js --network localhost
```

### 4. AI Model Setup
Ensure you have Python installed, then set up the AI dependencies:
```bash
pip install tensorflow spacy pandas matplotlib
python -m spacy download en_core_web_sm
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are highly appreciated! Feel free to check out the [issues page](https://github.com/Notee-ai/blockPot-AI/issues). Open to feedback and suggestions from the community!

## 📄 Recognition
*Grateful for all the learning during this journey. #CyberSecurity #MachineLearning #NLP #RNN #DeepLearning #TensorFlow #spaCy #HackTheBox*

---
<div align="center">
  <i>Developed with ❤️ for the Cybersecurity and Web3 communities.</i>
</div>