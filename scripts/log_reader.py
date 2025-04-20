import os
import json
import time
import geoip2.database
import ipaddress
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class CowrieLogReader:
    def __init__(self, log_dir, json_log_filename="cowrie.json", 
                 geoip_db_path="GeoLite2-City.mmdb"):
        """
        Initialize the Cowrie log reader
        
        Args:
            log_dir: Directory where cowrie logs are stored
            json_log_filename: Name of the JSON log file
            geoip_db_path: Path to the GeoIP database
        """
        self.log_dir = log_dir
        self.json_log_file = os.path.join(log_dir, json_log_filename)
        self.geoip_db_path = geoip_db_path
        
        # Initialize GeoIP database if available
        try:
            if os.path.exists(self.geoip_db_path):
                self.geo_reader = geoip2.database.Reader(self.geoip_db_path)
            else:
                print(f"GeoIP database not found at {self.geoip_db_path}")
                self.geo_reader = None
        except Exception as e:
            print(f"Error initializing GeoIP database: {e}")
            self.geo_reader = None
        
        # Flag to keep track of processed log lines
        self.last_processed_position = 0
        if os.path.exists(self.json_log_file):
            self.last_processed_position = os.path.getsize(self.json_log_file)
    
    def _get_geo_location(self, ip):
        """Get geolocation info for an IP address"""
        if not self.geo_reader:
            return {
                "country": "Unknown",
                "city": "Unknown",
                "latitude": 0,
                "longitude": 0
            }
        
        try:
            # Check if IP is private
            if ipaddress.ip_address(ip).is_private:
                return {
                    "country": "Private Network",
                    "city": "Local",
                    "latitude": 0,
                    "longitude": 0
                }
            
            # Look up IP
            response = self.geo_reader.city(ip)
            return {
                "country": response.country.name if response.country.name else "Unknown",
                "city": response.city.name if response.city.name else "Unknown",
                "latitude": response.location.latitude if response.location.latitude else 0,
                "longitude": response.location.longitude if response.location.longitude else 0
            }
        except Exception as e:
            print(f"Error getting geolocation for IP {ip}: {e}")
            return {
                "country": "Unknown",
                "city": "Unknown",
                "latitude": 0,
                "longitude": 0
            }
    
    def _parse_command_event(self, event):
        """Parse a command execution event from cowrie"""
        if 'input' not in event:
            return None
        
        # Get source IP from session
        src_ip = event.get('src_ip', 'unknown')
        
        # Create a standardized event
        parsed_event = {
            'timestamp': event.get('timestamp', datetime.now().isoformat()),
            'session': event.get('session', 'unknown'),
            'src_ip': src_ip,
            'username': event.get('username', 'unknown'),
            'command': event.get('input', '').strip(),
            'success': event.get('success', False),
            'geo': self._get_geo_location(src_ip) if src_ip != 'unknown' else {
                "country": "Unknown",
                "city": "Unknown",
                "latitude": 0,
                "longitude": 0
            }
        }
        
        return parsed_event
    
    def read_new_logs(self):
        """Read and process new log entries"""
        if not os.path.exists(self.json_log_file):
            return []
        
        current_size = os.path.getsize(self.json_log_file)
        if current_size <= self.last_processed_position:
            # File hasn't changed or was truncated
            if current_size < self.last_processed_position:
                # File was truncated, reset position
                self.last_processed_position = 0
            return []
        
        # Open file and seek to last position
        command_events = []
        try:
            with open(self.json_log_file, 'r') as f:
                f.seek(self.last_processed_position)
                
                for line in f:
                    try:
                        event = json.loads(line)
                        
                        # We're only interested in command execution events
                        if event.get('eventid') == 'cowrie.command.input':
                            parsed = self._parse_command_event(event)
                            if parsed:
                                command_events.append(parsed)
                    except json.JSONDecodeError:
                        continue  # Skip malformed lines
            
            # Update last processed position
            self.last_processed_position = current_size
        except Exception as e:
            print(f"Error reading log file: {e}")
        
        return command_events
    
    def close(self):
        """Close any open resources"""
        if self.geo_reader:
            self.geo_reader.close()


class LogWatcher(FileSystemEventHandler):
    """Watch for changes to the log file and process new events"""
    
    def __init__(self, log_reader, callback):
        self.log_reader = log_reader
        self.callback = callback
        self.last_check_time = time.time()
        # Debounce period in seconds
        self.debounce_period = 1.0
    
    def on_modified(self, event):
        """Called when a file is modified"""
        # Only process JSON log file
        if event.src_path != self.log_reader.json_log_file:
            return
        
        # Debounce to avoid too frequent processing
        current_time = time.time()
        if current_time - self.last_check_time < self.debounce_period:
            return
        
        self.last_check_time = current_time
        new_events = self.log_reader.read_new_logs()
        if new_events:
            self.callback(new_events)


def watch_cowrie_logs(log_dir, callback, json_log_filename="cowrie.json"):
    """
    Set up a watcher for Cowrie logs and call the callback for new events
    
    Args:
        log_dir: Directory containing cowrie logs
        callback: Function to call with new events
        json_log_filename: Name of the JSON log file
    """
    log_reader = CowrieLogReader(log_dir, json_log_filename)
    
    # Process any existing logs first
    existing_events = log_reader.read_new_logs()
    if existing_events:
        callback(existing_events)
    
    # Set up the file watcher
    event_handler = LogWatcher(log_reader, callback)
    observer = Observer()
    observer.schedule(event_handler, log_dir, recursive=False)
    observer.start()
    
    try:
        print(f"Watching Cowrie logs in {log_dir}")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        log_reader.close()
    
    observer.join()


if __name__ == "__main__":
    # Example usage
    def process_events(events):
        for event in events:
            print(f"New command from {event['src_ip']} ({event['geo']['country']}): {event['command']}")
    
    # Replace with actual log directory
    cowrie_log_dir = "/var/log/cowrie"
    watch_cowrie_logs(cowrie_log_dir, process_events)
