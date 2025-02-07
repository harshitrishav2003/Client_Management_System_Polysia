import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import LoginForm from "./LoginForm";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5005/api/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);

      const decodedToken = jwtDecode(token); // Corrected usage of jwtDecode
      if (decodedToken.role === "admin") {
        window.location.href = "/dashboard";
      } else {
        setError("Unauthorized access.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      onChange={(e, field) => (field === "email" ? setEmail(e.target.value) : setPassword(e.target.value))}
      email={email}
      password={password}
      error={error}
    />
  );
};

export default AdminLogin;
