// src/components/Auth.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css"; // Import the CSS file

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Success or error message
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = () => {
    // Mock signup logic
    if (email && password) {
      const mockUser = { email };
      setUser(mockUser);
      setMessage("Successfully registered!");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } else {
      setMessage("Please enter email and password.");
    }
  };

  const handleLogin = () => {
    // Mock login logic
    if (email && password) {
      const mockUser = { email };
      setUser(mockUser);
      setMessage("Successfully logged in!");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } else {
      setMessage("Please enter email and password.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Welcome to האתגר של איש הביטקוין</h1>
      <p>Track your health and progress with ease.</p>
      {message && <p className="auth-message">{message}</p>} {/* Display message */}
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="auth-buttons">
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
          <button type="button" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
