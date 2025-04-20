import os
import sys
import json
from datetime import datetime
import hashlib
import uuid

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import our modules
from i_model.model import CommandClassifier
from i_model.nlp_processor import CommandNLPAnalyzer

class ThreatEvaluator:
    def __init__(self, model_path="trained_command_classifier", blockchain_enabled=True):
        """
        Initialize the threat evaluator with ML and NLP components
        
        Args:
            model_path: Path to the trained ML model
            blockchain_enabled: Whether to use blockchain recording
        """
        # Initialize ML classifier
        try:
            self.classifier = CommandClassifier(model_path)
            self.model_loaded = True
        except Exception as e:
            print(f"Error loading ML model: {e}")
            self.classifier = None
            self.model_loaded = False
        
        # Initialize NLP analyzer
        try:
            self.nlp_analyzer = CommandNLPAnalyzer()
            self.nlp_loaded = True
        except Exception as e:
            print(f"Error initializing NLP analyzer: {e}")
            self.nlp_analyzer = None
            self.nlp_loaded = False
        
        self.blockchain_enabled = blockchain_enabled
        
        # This is just a placeholder - in a real implementation, this would connect to 
        # a blockchain interface like Web3.py for Ethereum or Hyperledger Fabric SDK
        if self.blockchain_enabled:
            try:
                # Initialize blockchain connector (placeholder)
                print("Initializing blockchain connector...")
                # self.blockchain = BlockchainConnector()
                self.blockchain_available = True
            except Exception as e:
                print(f"Error initializing blockchain: {e}")
                self.blockchain_available = False
        else:
            self.blockchain_available = False
    
    def evaluate_command(self, command_event):
        """
        Evaluate a command event using ML and NLP
        
        Args:
            command_event: Dict containing command and metadata
        
        Returns:
            Dict with threat evaluation results
        """
        command = command_event['command']
        
        # Default result structure
        result = {
            'command': command,
            'timestamp': command_event.get('timestamp', datetime.now().isoformat()),
            'src_ip': command_event.get('src_ip', 'unknown'),
            'session': command_event.get('session', 'unknown'),
            'username': command_event.get('username', 'unknown'),
            'geo': command_event.get('geo', {
                'country': 'Unknown',
                'city': 'Unknown',
                'latitude': 0,
                'longitude': 0
            }),
            'classification': {
                'threat_level': 'unknown',
                'confidence': 0,
                'probabilities': {
                    'safe': 0.0,
                    'suspicious': 0.0,
                    'malicious': 0.0
                }
            },
            'nlp_analysis': {
                'risk_score': 0,
                'intent': 'unknown',
                'actions': []
            },
            'id': str(uuid.uuid4()),
            'blockchain_hash': None
        }
        
        # Run ML classification if available
        if self.model_loaded and command:
            try:
                ml_result = self.classifier.predict(command)
                result['classification'] = {
                    'threat_level': ml_result['classification'],
                    'confidence': ml_result['confidence'],
                    'probabilities': ml_result['probabilities']
                }
            except Exception as e:
                print(f"Error during ML classification: {e}")
        
        # Run NLP analysis if available
        if self.nlp_loaded and command:
            try:
                nlp_result = self.nlp_analyzer.analyze_intent(command)
                result['nlp_analysis'] = {
                    'risk_score': nlp_result['risk_score'],
                    'intent': nlp_result['intent_classification'],
                    'actions': nlp_result['actions']
                }
            except Exception as e:
                print(f"Error during NLP analysis: {e}")
        
        # Generate combined threat score based on both ML and NLP
        if self.model_loaded and self.nlp_loaded:
            # Map ML classification to numeric value
            ml_score_map = {
                'safe': 0,
                'suspicious': 5,
                'malicious': 10
            }
            ml_score = ml_score_map.get(result['classification']['threat_level'], 0)
            
            # Get NLP risk score (already 0-10)
            nlp_score = result['nlp_analysis']['risk_score']
            
            # Weighted average (60% ML, 40% NLP)
            combined_score = (ml_score * 0.6) + (nlp_score * 0.4)
            
            # Map back to threat level
            if combined_score >= 7:
                combined_