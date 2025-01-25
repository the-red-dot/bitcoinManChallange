import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Auth from './components/Auth';
import BitcoinChallenge from './pages/BitcoinChallenge';

// Context for authentication
export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="app">
        <Router>
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Home page route */}
              <Route path="/" element={<BitcoinChallenge />} />

              {/* Specific path for BitcoinManChallange */}
              <Route path="/bitcoinManChallange" element={<BitcoinChallenge />} />

              {/* Authentication page */}
              <Route path="/auth" element={<Auth />} />

              {/* Catch-all route for unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

// NotFound component for unmatched routes
const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h1>404</h1>
    <p>העמוד שביקשת לא נמצא.</p>
  </div>
);

export default App;
