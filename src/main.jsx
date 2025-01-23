import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the main app component
import './styles/index.css'; // Updated import path for global styles

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App /> {/* Render App into the root DOM element */}
    </React.StrictMode>
);
