
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../utils/auth"; // Import the updated logout function



// const Header = () => {
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const token = localStorage.getItem("jwtToken");
//   const isAuthenticated = !!token;

//   // Decode the token to check the role (assuming the token has the role info)
//   const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
//   const isClient = decodedToken?.role === 'client';

//   const handleLogout = () => {
//     logout(navigate); // Redirect to home page after logout
//   };

//   const toggleDropdown = () => {
//     setShowDropdown((prev) => !prev);
//   };

//   // Close dropdown after selecting an option
//   const closeDropdown = () => {
//     setShowDropdown(false);
//   };

//   return (
//     <header style={headerStyle}>
//       <div>
//         <h1>Client Management System</h1>
//       </div>
//       <nav>
//         {isAuthenticated ? (
//           <>
//             {isClient ? (
//               <>
//                 <button onClick={() => navigate(`/client/${decodedToken.clientId}`)} style={linkStyle}>
//                   Client Profile
//                 </button>
//                 <button onClick={() => navigate(`/contract-management/${decodedToken.clientId}`)} style={linkStyle}>
//                   Contract Management
//                 </button>
//                 <button onClick={() => navigate(`/activity-tracking`)} style={linkStyle}>
//                   Activity Tracking
//                 </button>
//               </>
//             ) : (
//               <button onClick={() => navigate(`/dashboard`)} style={linkStyle}>
//                 Dashboard
//               </button>
//             )}
//             <button onClick={handleLogout} style={linkStyle}>Logout</button>
//           </>
//         ) : (
//           <div style={{ position: 'relative', display: 'inline-block' }}>
//             <button onClick={toggleDropdown} style={linkStyle}>
//               Login
//             </button>
//             {showDropdown && (
//               <div style={dropdownStyle}>
//                 <button 
//                   onClick={() => { navigate('/admin-login'); closeDropdown(); }} 
//                   style={dropdownItemStyle}
//                 >
//                   Login as Admin
//                 </button>
//                 <button 
//                   onClick={() => { navigate('/client-login'); closeDropdown(); }} 
//                   style={dropdownItemStyle}
//                 >
//                   Login as Client
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// const headerStyle = {
//   backgroundColor: '#000',
//   color: '#fff',
//   padding: '10px 20px',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// };

// const linkStyle = {
//   color: '#fff',
//   textDecoration: 'none',
//   fontSize: '16px',
//   margin: '0 10px',
//   cursor: 'pointer',
// };

// const dropdownStyle = {
//   position: 'absolute',
//   top: '110%',
//   right: '10%',
//   backgroundColor: '#fff',
//   boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//   borderRadius: '12px',
//   zIndex: 1000,
//   minWidth: '150px',
// };

// const dropdownItemStyle = {
//   padding: '10px 15px',
//   color: '#000',
//   textAlign: 'left',
//   width: '100%',
//   border: 'none',
//   background: 'none',
//   cursor: 'pointer',
//   textDecoration: 'none',
// };

// export default Header;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth"; // Import the updated logout function

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const isAuthenticated = !!token;

  // Decode the token to check the role (assuming the token has the role info)
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const isClient = decodedToken?.role === "client";
  const isAdmin = decodedToken?.role === "admin";

  const handleLogout = () => {
    logout(navigate); // Redirect to home page after logout
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown after selecting an option
  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header style={headerStyle}>
      <div>
        <h1>Client Management System</h1>
      </div>
      <nav>
        {isAuthenticated ? (
          <>
            {isClient && (
              <>
                <button
                  onClick={() => navigate(`/client/${decodedToken.clientId}`)}
                  style={linkStyle}
                >
                  Client Profile
                </button>
                <button
                  onClick={() =>
                    navigate(`/contract-management/${decodedToken.clientId}`)
                  }
                  style={linkStyle}
                >
                  Contract Management
                </button>
                
              </>
            )}

            {isAdmin && (
              <>
                <button
                  onClick={() => navigate(`/dashboard`)}
                  style={linkStyle}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate(`/activity-tracking`)}
                  style={linkStyle}
                >
                  Activity Tracking
                </button>
                <button
                  onClick={() => navigate(`/admin/projects`)}
                  style={linkStyle}
                >
                  Projects
                </button>
                


              </>
            )}

            <button onClick={handleLogout} style={linkStyle}>
              Logout
            </button>
          </>
        ) : (
          <div style={{ position: "relative", display: "inline-block" }}>
            <button onClick={toggleDropdown} style={linkStyle}>
              Login
            </button>
            {showDropdown && (
              <div style={dropdownStyle}>
                <button
                  onClick={() => {
                    navigate("/admin-login");
                    closeDropdown();
                  }}
                  style={dropdownItemStyle}
                >
                  Login as Admin
                </button>
                <button
                  onClick={() => {
                    navigate("/client-login");
                    closeDropdown();
                  }}
                  style={dropdownItemStyle}
                >
                  Login as Client
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
  margin: "0 10px",
  cursor: "pointer",
};

const dropdownStyle = {
  position: "absolute",
  top: "110%",
  right: "10%",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  zIndex: 1000,
  minWidth: "150px",
};

const dropdownItemStyle = {
  padding: "10px 15px",
  color: "#000",
  textAlign: "left",
  width: "100%",
  border: "none",
  background: "none",
  cursor: "pointer",
  textDecoration: "none",
};

export default Header;
