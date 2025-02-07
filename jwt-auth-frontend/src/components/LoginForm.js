import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import './Login.css';

const LoginForm = ({ onSubmit, onChange, email, password, error }) => (
  <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="input-wrapper">
          <FaEnvelope className="input-icon" />
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e, "email")}
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
            onChange={(e) => onChange(e, "password")}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  </div>
);

export default LoginForm;
