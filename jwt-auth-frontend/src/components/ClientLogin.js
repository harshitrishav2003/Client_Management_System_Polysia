// import React, { useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode"; // Corrected import statement
// import { useNavigate } from "react-router-dom"; // Use navigate to redirect
// import LoginForm from "./LoginForm";

// const ClientLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5005/api/login", { email, password });
//       const { token } = response.data;
//       localStorage.setItem("jwtToken", token);

//       const decodedToken = jwtDecode(token); // Corrected usage of jwtDecode
//       if (decodedToken.role === "client") {
//         window.location.href = `/client/${decodedToken.clientId}`;
//       } else {
//         setError("Unauthorized access.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid credentials. Please try again.");
//     }
//   };

//   const handleRegisterRedirect = () => {
//     navigate("/client-register"); // Redirect to the client registration page
//   };

//   return (
//     <div>
//       <LoginForm
//         onSubmit={handleSubmit}
//         onChange={(e, field) => (field === "email" ? setEmail(e.target.value) : setPassword(e.target.value))}
//         email={email}
//         password={password}
//         error={error}
//       />
//       <div style={buttonWrapperStyle}>
//         <button onClick={handleRegisterRedirect} style={linkStyle}>
//           Register as Client
//         </button>
//       </div>
//     </div>
//   );
// };

// const linkStyle = {
    
//     marginTop: '10px',
//     backgroundColor: '#4CAF50',
//     color: '#fff',
//     padding: '12px',
//     border: 'none',
//     fontSize: '1.1rem',
//     cursor: 'pointer',
//     borderRadius: '20px',
//     textDecoration: 'none',
//     width: '20%', // Ensure the button takes full width
//   };
//   const buttonWrapperStyle = {
//     display: 'flex',
//     justifyContent: 'center', // Centers the button horizontally
//     width: '100%',
//     marginTop: '10px',
//   };
  
  

// export default ClientLogin;
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Container, TextField, Button, Typography, Alert, Box, Card, CardContent, CircularProgress, Grid, Divider, InputAdornment } from "@mui/material";
import { motion } from "framer-motion";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post("http://localhost:5005/api/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);

      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "client") {
        window.location.href = `/client/${decodedToken.clientId}`;
      } else {
        setError("Unauthorized access.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/client-register");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ boxShadow: 8, borderRadius: 4, px: 5, py: 6, width: "500px" }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom align="center" color="primary">
              Client Login
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
              </motion.div>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ height: 48, fontSize: 18, fontWeight: "bold", textTransform: "none" }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={26} color="inherit" /> : "Sign In"}
                </Button>
              </motion.div>
            </Box>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Button onClick={handleRegisterRedirect} variant="text" color="primary">
                Register as Client
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ClientLogin;