
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaEnvelope, FaLock } from "react-icons/fa";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5005/api/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("jwtToken", token); // Save token in localStorage

      const decodedToken = jwtDecode(token); // Decode the token
      if (decodedToken.role === "admin") {
        window.location.href = "/dashboard";
      } else if (decodedToken.role === "client") {
        window.location.href = `/client/${decodedToken.clientId}`;
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
   <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit-btn" type="submit">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
