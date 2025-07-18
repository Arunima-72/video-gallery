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
