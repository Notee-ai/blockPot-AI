import React from 'react';
import ReactDOM from 'react-dom/client';  // Importing from react-dom/client
import App from './App';  // Import your App component

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
