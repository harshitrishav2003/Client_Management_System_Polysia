import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import { useNavigate } from "react-router-dom"; // Use navigate to redirect
import LoginForm from "./LoginForm";

const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5005/api/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);

      const decodedToken = jwtDecode(token); // Corrected usage of jwtDecode
      if (decodedToken.role === "client") {
        window.location.href = `/client/${decodedToken.clientId}`;
      } else {
        setError("Unauthorized access.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/client-register"); // Redirect to the client registration page
  };

  return (
    <div>
      <LoginForm
        onSubmit={handleSubmit}
        onChange={(e, field) => (field === "email" ? setEmail(e.target.value) : setPassword(e.target.value))}
        email={email}
        password={password}
        error={error}
      />
      <div style={buttonWrapperStyle}>
        <button onClick={handleRegisterRedirect} style={linkStyle}>
          Register as Client
        </button>
      </div>
    </div>
  );
};

const linkStyle = {
    
    marginTop: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '12px',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    borderRadius: '20px',
    textDecoration: 'none',
    width: '20%', // Ensure the button takes full width
  };
  const buttonWrapperStyle = {
    display: 'flex',
    justifyContent: 'center', // Centers the button horizontally
    width: '100%',
    marginTop: '10px',
  };
  
  

export default ClientLogin;
