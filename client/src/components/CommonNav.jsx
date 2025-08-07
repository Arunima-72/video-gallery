// // components/DashboardNavbar.jsx
// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   Button,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link, useNavigate } from "react-router-dom";

// const DashboardNavbar = ({ toggleSidebar }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // or however you store auth
//     navigate("/login");
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
//           ICT Academy
//         </Typography>
//         <Box>
//           <Button color="inherit" component={Link} to="/">
//             Home
//           </Button>
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default DashboardNavbar;
// import React from 'react';
// import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate } from 'react-router-dom';

// const CommonNav = ({ onToggleSidebar }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         <IconButton edge="start" color="inherit" onClick={onToggleSidebar}>
//           <MenuIcon />
//         </IconButton>

//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           📺 ICT Video Portal
//         </Typography>

//         <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
//         <Button color="inherit" onClick={handleLogout}>Logout</Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default CommonNav;
// import React from 'react';
// import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate } from 'react-router-dom';
// import logo from "../assets/download.png";
// import HomeIcon from "@mui/icons-material/Home"
// import LogOutIcon from "@mui/icons-material/LogOut"
// const CommonNav = ({ onToggleSidebar }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor: "#B2E0FB" }}  >
//       <Toolbar>
//         <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
//           <MenuIcon />
//         </IconButton>
 
//           <img
//             src={logo}
//             alt="ICT Academy"
//             style={{ height: 40, marginRight: 16 }}
//           />
//         {/* Just the icon/logo, no text */}
//         {/* <span style={{ fontSize: '24px', marginRight: 'auto' }}>📺</span> */}

//         {/* <Button color="" onClick={() => navigate('/')}>Home</Button>
//         <Button color="" onClick={handleLogout}>Logout</Button> */}
//         <Button startIcon={<HomeIcon />}
//          onClick={() => navigate('/')}>
//         Home</Button>
          
         
//           {/* <Button
//             startIcon={<LogOutIcon />}
//             onClick={handleLogout}
//           >
//             Login
//           </Button> */}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default CommonNav;


// import React from 'react';
// import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';             //working
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useNavigate } from 'react-router-dom';
// import logo from "../assets/download.png";

// const CommonNav = ({ onToggleSidebar }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor: "#B2E0FB"}}>
//       <Toolbar>

//         {/* Menu Button */}
//         <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
//           <MenuIcon />
//         </IconButton>

//         {/* Logo */}
//         <img
//           src={logo}
//           alt="ICT Academy"
//           style={{ height: 40, marginRight: 16 }}
//         />

//         {/* Spacer to push other items to the right */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Home and Logout Buttons */}
//         <Button startIcon={<HomeIcon />} onClick={() => navigate('/')}>
//           Home
//         </Button>
//         <Button  startIcon={<LogoutIcon />} onClick={handleLogout}>                  
//           Logout
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default CommonNav;


// import React from 'react';                                                  //4/8  working 
// import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import logo from "../assets/download.png";

// const CommonNav = ({ onToggleSidebar }) => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     try {
//       await axios.post('http://localhost:3000/user/logout', { userId }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       // ✅ Clear all session data
//       localStorage.clear();

//       navigate('/'); // Redirect to login
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         backgroundColor: "#B2E0FB"
//       }}
//     >
//       <Toolbar>
//         {/* Sidebar Menu Button */}
//         <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
//           <MenuIcon />
//         </IconButton>

//         {/* Logo */}
//         <img
//           src={logo}
//           alt="ICT Academy"
//           style={{ height: 40, marginRight: 16 }}
//         />

//         {/* Spacer */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Home Button */}
//         <Button startIcon={<HomeIcon />} onClick={() => navigate('/')}>
//           Home
//         </Button>

//         {/* Logout Button */}
//         <Button startIcon={<LogoutIcon />} onClick={handleLogout}>
//           Logout
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default CommonNav;
// import React, { useState } from 'react';
// import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import logo from "../assets/download.png";

// const CommonNav = ({ onToggleSidebar }) => {
//   const navigate = useNavigate();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const handleLogout = async () => {
//     if (isLoggingOut) return;
//     setIsLoggingOut(true);

//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     try {
//       // Server logout
//       await axios.post('http://localhost:3000/user/logout', { userId }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//     } catch (error) {
//       console.error('Logout failed:', error);
//       // Still proceed to clear
//     } finally {
//       // ✅ Clear all data and redirect
//       localStorage.clear();
//       sessionStorage.clear();
//       setIsLoggingOut(false);
//       navigate('/', { replace: true });
//     }
//   };

//   const handleHome = () => {
//     const role = localStorage.getItem('role');
//     if (role === 'admin') navigate('/admin/dashboard');
//     else if (role === 'user') navigate('/admin/videos');
//     else navigate('/');
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         backgroundColor: "#B2E0FB"
//       }}
//     >
//       <Toolbar>
//         {/* Sidebar Toggle Button */}
//         <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
//           <MenuIcon />
//         </IconButton>

//         {/* Logo */}
//         <img src={logo} alt="ICT Academy" style={{ height: 40, marginRight: 16 }} />

//         {/* Spacer */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Home Button */}
//         <Button startIcon={<HomeIcon />} onClick={handleHome}>
//           Home
//         </Button>

//         {/* Logout Button */}
//         <Button startIcon={<LogoutIcon />} onClick={handleLogout}>
//           Logout
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default CommonNav;
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/download.png"; // Ensure this path is correct

const CommonNav = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      await axios.post(
        "http://localhost:3000/user/logout",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(to right, #4886b8ff, #21CBF3)",
        color: "#fff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        {/* Sidebar Toggle Button */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={onToggleSidebar}
          sx={{
            mr: 2,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="ICT Academy"
            style={{ height: 40, marginRight: 10 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Home Button */}
        <Button
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            color: "#fff",
            textTransform: "none",
            fontSize: "16px",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
          }}
        >
          Home
        </Button>

        {/* Logout Button */}
        <Button
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            ml: 2,
            color: "#fff",
            textTransform: "none",
            fontSize: "16px",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CommonNav;