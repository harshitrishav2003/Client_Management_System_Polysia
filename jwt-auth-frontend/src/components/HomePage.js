
// import React from "react";
// import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
// import { PlayCircleOutline, Settings, Person, Code } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const fadeIn = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
// };

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
// };

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "linear-gradient(to right, #1E3C72, #2A5298)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 4,
//         textAlign: "center",
//         color: "#fff",
//       }}
//     >
//       {/* Hero Section */}
//       <motion.div initial="hidden" animate="visible" variants={fadeIn}>
//       <motion.div initial="hidden" animate="visible" variants={fadeIn}>
//         <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: "#121212" }}>
//           Empower Your Business with CMS
//         </Typography>
//         <Typography variant="h5" sx={{ maxWidth: 700, mx: "auto", opacity: 0.9, color: "#1E1E1E" }}>
//           Transform the way you manage clients, track revenue, and automate workflows.
//         </Typography>
//         <Typography variant="body1" sx={{ mt: 1, maxWidth: 600, mx: "auto", opacity: 0.8, color: "#2D2D2D" }}>
//           Our intelligent dashboard helps you stay ahead with real-time analytics, secure data handling, and seamless integration.
//         </Typography>
//       </motion.div>

//         {/* CTA Button */}
//         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//           <Button
//             variant="contained"
//             color="secondary"
//             sx={{
//               mt: 4,
//               px: 5,
//               py: 1.5,
//               fontSize: "1.2rem",
//               bgcolor: "#FFC107",
//               color: "#000",
//               "&:hover": { bgcolor: "#FFB300" }
//             }}
//             onClick={() => navigate("/client-login")}
//           >
//             Get Started
//           </Button>
//         </motion.div>
//       </motion.div>

//       {/* Features Section */}
//       <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
//         {[
//           { icon: <PlayCircleOutline fontSize="large" />, text: "Quick Setup", desc: "Get started in minutes with our easy-to-use platform." },
//           { icon: <Settings fontSize="large" />, text: "Automation", desc: "Reduce manual tasks with AI-powered automation tools." },
//           { icon: <Person fontSize="large" />, text: "User Management", desc: "Manage clients and teams effortlessly." },
//           { icon: <Code fontSize="large" />, text: "Developer API", desc: "Integrate with existing tools using our API." }
//         ].map((feature, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <motion.div initial="hidden" animate="visible" variants={cardVariants}>
//               <Card sx={{ p: 3, textAlign: "center", boxShadow: 4, bgcolor: "#FFFFFF", color: "#000", borderRadius: 3 }}>
//                 {feature.icon}
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold">{feature.text}</Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.7 }}>{feature.desc}</Typography>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Footer */}
//       <Box sx={{ mt: 6, display: "flex", gap: 2, opacity: 0.8 }}>
//         <Typography variant="body2">© 2025 CMS. All rights reserved.</Typography>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Avatar,
  Divider,
} from "@mui/material";
import { PlayCircleOutline, Settings, Person, Code, Security, Dashboard, TrendingUp } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import Footer from '../components/Footer';
import Marquee from "react-fast-marquee";
import l1 from "../assets/l1.png";
import l2 from "../assets/l2.png";
import l3 from "../assets/l3.png";
import l4 from "../assets/l4.png";
import l5 from "../assets/l5.png";

const stats = [
  { label: "Clients", value: 2500 },
  { label: "Contracts Managed", value: 1200 },
  { label: "Revenue Tracked", value: "$10M+" }
];
const clientLogos = [l1, l2, l3, l4, l5];
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to right, #0D1B2A, #1B263B, #415A77)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#000",
        py: 6,
      }}
    >
      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Streamline Your Business with CMS
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: 700, mx: "auto", opacity: 0.9 }}>
          Smart client management, real-time analytics, and powerful automation tools.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, maxWidth: 600, mx: "auto", opacity: 0.8 }}>
          Elevate your productivity with AI-powered insights, secure data handling, and seamless integrations.
        </Typography>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              px: 5,
              py: 1.5,
              fontSize: "1.2rem",
              bgcolor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#FFC107" },
            }}
            onClick={() => navigate("/client-login")}
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { icon: <PlayCircleOutline fontSize="large" />, text: "Quick Setup", desc: "Start using CMS in minutes with an intuitive interface." },
            { icon: <Settings fontSize="large" />, text: "AI Automation", desc: "Automate workflows and reduce manual tasks." },
            { icon: <Dashboard fontSize="large" />, text: "Analytics Dashboard", desc: "Monitor business performance in real-time." },
            { icon: <Person fontSize="large" />, text: "Client Management", desc: "Organize and manage clients efficiently." },
            { icon: <TrendingUp fontSize="large" />, text: "Revenue Insights", desc: "Track earnings and optimize business strategies." },
            { icon: <Security fontSize="large" />, text: "Enterprise Security", desc: "Protect your data with top-notch security measures." },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div initial="hidden" animate="visible" variants={cardVariants}>
                <Card sx={{ p: 3, textAlign: "center", boxShadow: 4, bgcolor: "#1E1E1E", color: "#fff", borderRadius: 3 }}>
                  {feature.icon}
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{feature.text}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7,color: "#4FC3F7" }}>{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ mt: 8, width: "100%", overflow: "hidden", py: 4, bgcolor: "#fff" }}>
        <Typography variant="h4" fontWeight="bold" color="#000" textAlign="center" gutterBottom>
          Our Previous Clients
        </Typography>
        <Divider sx={{ bgcolor: "#FFD700", width: "50%", mx: "auto", mb: 3 }} />
        <Marquee gradient={false} speed={40}>
       

{clientLogos.map((logo, index) => (
  <Box key={index} sx={{ mx: 4 }}>
    <img src={logo} alt={`Client ${index + 1}`} style={{ height: 200, width: "auto" }} />
  </Box>
))}

        </Marquee>
      </Box>
      <section className="flex justify-around bg-gray-900 text-white py-16">
    {stats.map((stat, index) => (
      <motion.div
        key={index}
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <h2 className="text-4xl font-bold">{stat.value}</h2>
        <p className="text-lg text-gray-300">{stat.label}</p>
      </motion.div>
    ))}
  </section>
  
      {/* Testimonials Section */}
      <Box sx={{ mt: 10, maxWidth: 800 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          What Our Clients Say
        </Typography>
        <Divider sx={{ bgcolor: "#FFD700", width: "50%", mx: "auto", mb: 3 }} />
        <Grid container spacing={3}>
          {[
            { name: "John Doe", feedback: "CMS transformed our business with its automation and analytics.", role: "CEO, TechCorp" },
            { name: "Jane Smith", feedback: "Managing clients has never been this easy and secure.", role: "Operations Manager, FinServ" },
          ].map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ p: 3, bgcolor: "#1E1E1E", color: "#fff", borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="body1" sx={{ fontStyle: "italic", opacity: 0.9,color: "#FFD700" }}>
                    "{testimonial.feedback}"
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "#FFD700" }}>{testimonial.name[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">{testimonial.name}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>{testimonial.role}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call-to-Action Banner */}
      <Box
        sx={{
          mt: 10,
          width: "100%",
          py: 4,
          bgcolor: "#FFD700",
          textAlign: "center",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        <Typography variant="h5">
          Ready to take your business to the next level?
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, px: 4, bgcolor: "#000", color: "#FFD700", "&:hover": { bgcolor: "#222" } }}
          onClick={() => navigate("/client-login")}
        >
          Start Now
        </Button>
      </Box>
      <Footer />
    </Box>
    
  );
};

export default HomePage;
// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   Container,
//   Avatar,
//   Divider,
// } from "@mui/material";
// import {
//   PlayCircleOutline,
//   Settings,
//   Person,
//   Code,
//   Security,
//   Dashboard,
//   TrendingUp,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import "./HomePage.css";

// // Import Client Logos
// import company1 from "../assets/l1.png";
// import company2 from "../assets/l2.png";
// import company3 from "../assets/l3.png";
// import company4 from "../assets/l4.png";
// import company5 from "../assets/l5.png";

// const fadeIn = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
// };

// const slideAnimation = {
//   hidden: { opacity: 0, x: -100 },
//   visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
// };

// const clients = [company1, company2, company3, company4, company5];

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "linear-gradient(to right, #0D1B2A, #1B263B, #415A77)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         color: "#fff",
//         py: 6,
//       }}
//     >
//       {/* Hero Section */}
//       <motion.div initial="hidden" animate="visible" variants={fadeIn}>
//         <Typography variant="h3" fontWeight="bold" gutterBottom>
//           Streamline Your Business with CMS
//         </Typography>
//         <Typography variant="h5" sx={{ maxWidth: 700, mx: "auto", opacity: 0.9 }}>
//           Smart client management, real-time analytics, and powerful automation tools.
//         </Typography>
//         <Typography variant="body1" sx={{ mt: 1, maxWidth: 600, mx: "auto", opacity: 0.8 }}>
//           Elevate your productivity with AI-powered insights, secure data handling, and seamless integrations.
//         </Typography>

//         {/* CTA Button */}
//         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//           <Button
//             variant="contained"
//             sx={{
//               mt: 4,
//               px: 5,
//               py: 1.5,
//               fontSize: "1.2rem",
//               bgcolor: "#FFD700",
//               color: "#000",
//               fontWeight: "bold",
//               "&:hover": { bgcolor: "#FFC107" },
//             }}
//             onClick={() => navigate("/client-login")}
//           >
//             Get Started
//           </Button>
//         </motion.div>
//       </motion.div>

//       {/* Previous Clients Section */}
//       <Box sx={{ mt: 10, width: "100%", textAlign: "center" }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Our Previous Clients
//         </Typography>
//         <Divider sx={{ bgcolor: "#FFD700", width: "30%", mx: "auto", mb: 3 }} />

//         <Box sx={{ overflow: "hidden", width: "100%", display: "flex", justifyContent: "center" }}>
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={slideAnimation}
//             style={{
//               display: "flex",
//               gap: "50px",
//               whiteSpace: "nowrap",
//               animation: "scroll 10s linear infinite",
//             }}
//           >
//             {clients.map((logo, index) => (
//               <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
//                 <img src={logo} alt={`Client ${index + 1}`} style={{ width: "120px", height: "auto" }} />
//               </Box>
//             ))}
//           </motion.div>
//         </Box>
//       </Box>

//       {/* Testimonials Section */}
//       <Box sx={{ mt: 10, maxWidth: 800 }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           What Our Clients Say
//         </Typography>
//         <Divider sx={{ bgcolor: "#FFD700", width: "50%", mx: "auto", mb: 3 }} />
//         <Grid container spacing={3}>
//           {[
//             { name: "John Doe", feedback: "CMS transformed our business with its automation and analytics.", role: "CEO, TechCorp" },
//             { name: "Jane Smith", feedback: "Managing clients has never been this easy and secure.", role: "Operations Manager, FinServ" },
//           ].map((testimonial, index) => (
//             <Grid item xs={12} sm={6} key={index}>
//               <Card sx={{ p: 3, bgcolor: "#1E1E1E", color: "#fff", borderRadius: 3 }}>
//                 <CardContent>
//                   <Typography variant="body1" sx={{ fontStyle: "italic", opacity: 0.9, color: "#FFD700" }}>
//                     "{testimonial.feedback}"
//                   </Typography>
//                   <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
//                     <Avatar sx={{ bgcolor: "#FFD700" }}>{testimonial.name[0]}</Avatar>
//                     <Box>
//                       <Typography variant="subtitle1" fontWeight="bold">{testimonial.name}</Typography>
//                       <Typography variant="caption" sx={{ opacity: 0.7 }}>{testimonial.role}</Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* Call-to-Action Banner */}
//       <Box
//         sx={{
//           mt: 10,
//           width: "100%",
//           py: 4,
//           bgcolor: "#FFD700",
//           textAlign: "center",
//           color: "#000",
//           fontWeight: "bold",
//         }}
//       >
//         <Typography variant="h5">
//           Ready to take your business to the next level?
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ mt: 2, px: 4, bgcolor: "#000", color: "#FFD700", "&:hover": { bgcolor: "#222" } }}
//           onClick={() => navigate("/client-login")}
//         >
//           Start Now
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
