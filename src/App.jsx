// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Auth from './components/Auth';
import BitcoinChallenge from './pages/BitcoinChallenge';

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
              {/* 
                Example: If you just want your homepage to be the 
                challenge page, set path="/" to BitcoinChallenge 
              */}
              <Route path="/" element={<BitcoinChallenge />} />

              {/* If you still want Auth page: */}
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
