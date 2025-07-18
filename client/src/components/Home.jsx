// import React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Container,
//   Paper,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";

// const Home = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box
//       sx={{
//         bgcolor: "#f5f5f5",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         py: 4,
//       }}
//     >
//       <Container maxWidth="md">
//         <Paper
//           elevation={3}
//           sx={{
//             p: { xs: 3, sm: 4, md: 6 },
//             textAlign: "center",
//             backgroundColor: "white",
//             borderRadius: 2,
//           }}
//         >
//           <Typography
//             variant={isMobile ? "h5" : "h4"}
//             fontWeight="bold"
//             color="primary"
//             gutterBottom
//           >
//             FSD VIDEO GALLERY
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{ mb: 4, fontSize: isMobile ? "0.95rem" : "1.1rem" }}
//           >
//             Subheading that sets up context, shares more info about the website,
//             or generally gets people psyched to keep scrolling.
//           </Typography>

//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               px: isMobile ? 3 : 5,
//               py: 1.5,
//               fontSize: isMobile ? "0.9rem" : "1rem",
//             }}
//           >
//             Explore Videos
//           </Button>

//           <Box mt={6} display="flex" justifyContent="center">
//             <img
//               src="/logo-placeholder.png"
//               alt="ICT Academy Kerala"
//               style={{
//                 maxWidth: isMobile ? "120px" : "200px",
//                 opacity: 0.08,
//               }}
//             />
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Home;
// pages/Home.jsx
// import React from "react";
// import { Box, Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Home = ({ isLoggedIn }) => {
//   const navigate = useNavigate();

//   const handleExplore = () => {
//     if (isLoggedIn) {
//       navigate("/user/dashboard");
//     }
//   };

//   return (
//     <Box sx={{ textAlign: "center", mt: 8 }}>
//       <Typography variant="h3" gutterBottom>
//         Welcome to FSD Video Gallery
//       </Typography>
//       <Typography variant="body1" sx={{ mb: 3 }}>
//         Explore various full stack development videos
//       </Typography>

//       {isLoggedIn ? (
//         <Button variant="contained" onClick={handleExplore}>
//           Explore Videos
//         </Button>
//       ) : (
//         <Typography color="error" fontWeight="bold">
//           Only logged-in users can explore videos.
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default Home;
// import React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Snackbar,
//   Modal,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
//  // 📌 Add your ICT logo in src/assets folder

// const Home = ({ isLoggedIn, handleLogout }) => {
//   const navigate = useNavigate();
//   const [toastOpen, setToastOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleExplore = () => {
//     if (isLoggedIn) {
//       setModalOpen(true);
//     } else {
//       setToastOpen(true);
//     }
//   };

//   const handleModalConfirm = () => {
//     setModalOpen(false);
//     navigate("/user/dashboard");
//   };

//   return (
//     <Box>
//       {/* Navbar */}
//       <AppBar position="static" sx={{ backgroundColor: "#B2E0FB" }}>
//             <Toolbar>
//               <img
//                 src={logo}
//                 alt="ICT Academy"
//                 style={{ height: 40, marginRight: 16 }}
//               />
//               <Box sx={{ flexGrow: 1 }} />
//               <Button startIcon={<HomeIcon />} >
//                 Home
//               </Button>
//               <Button startIcon={<InfoIcon />} >
//                 About
//               </Button>
//               <Button startIcon={<ContactMailIcon />} >
//                 Contact
//               </Button>
//               <Button startIcon={<LoginIcon />}  component={Link} to="/login">Login</Button>
//             </Toolbar>
//           </AppBar>
   

//       {/* Hero Section */}
//       <Box
//         sx={{
//           p: { xs: 2, md: 4 },
//           mt: 5,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           animation: "fadeIn 2s ease-in-out",
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           FSD VIDEO GALLERY
//         </Typography>
//         <Typography variant="subtitle1" sx={{ mb: 3 }}>
//           Subheading that sets up context, shares more info about the website,
//           or generally gets people psyched to keep scrolling.
//         </Typography>

//         {isLoggedIn ? (
//           <Button variant="contained" onClick={handleExplore}>
//             Explore Videos
//           </Button>
//         ) : (
//           <Typography color="error" fontWeight="bold">
//             Only logged-in users can explore videos.
//           </Typography>
//         )}
//       </Box>

//       {/* Toast Notification */}
//       <Snackbar
//         open={toastOpen}
//         autoHideDuration={3000}
//         onClose={() => setToastOpen(false)}
//         message="Please login to explore videos"
//       />

//       {/* Confirmation Modal */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box
//           sx={{
//             width: 300,
//             bgcolor: "background.paper",
//             p: 4,
//             mx: "auto",
//             my: "20%",
//             borderRadius: 2,
//             boxShadow: 24,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Ready to explore videos?
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ mr: 1 }}
//             onClick={handleModalConfirm}
//           >
//             Yes
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={() => setModalOpen(false)}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       {/* Fade-in animation keyframes */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default Home;
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Snackbar,
  Modal,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";

import logo from "../assets/download.png"; // make sure logo exists
import { useNavigate } from "react-router-dom";
import Login from "../components/Login"; // path to your dialog component

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleExplore = () => {
    if (isLoggedIn) {
      setModalOpen(true);
    } else {
      setToastOpen(true);
    }
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  const handleLogin = ({ username, role }) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#B2E0FB" }}>
        <Toolbar>
          <img
            src={logo}
            alt="ICT Academy"
            style={{ height: 40, marginRight: 16 }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button startIcon={<HomeIcon />}>Home</Button>
          <Button startIcon={<InfoIcon />}>About</Button>
          <Button startIcon={<ContactMailIcon />}>Contact</Button>
          <Button
            startIcon={<LoginIcon />}
            onClick={() => setLoginDialogOpen(true)}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          mt: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          animation: "fadeIn 1.5s ease-in-out",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          FSD VIDEO GALLERY
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Subheading that sets up context, shares more info about the website,
          or generally gets people psyched to keep scrolling.
        </Typography>

        <Button variant="contained" onClick={handleExplore}>
          Explore Videos
        </Button>
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message="Please login to explore videos"
      />

      {/* Confirmation Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            width: 300,
            bgcolor: "background.paper",
            p: 4,
            mx: "auto",
            my: "20%",
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Ready to explore videos?
          </Typography>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={handleModalConfirm}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Login Dialog */}
      <Login
        open={loginDialogOpen}
        handleClose={() => setLoginDialogOpen(false)}
        handleLogin={handleLogin}
      />

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Home;
