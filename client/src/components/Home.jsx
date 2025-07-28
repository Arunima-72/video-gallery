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
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Typography,
//   Box,
//   Snackbar,
//   Modal,
//   IconButton,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import LoginIcon from "@mui/icons-material/Login";

// import logo from "../assets/download.png"; // make sure logo exists
// import { useNavigate } from "react-router-dom";
// import Login from "../components/Login"; // path to your dialog component

// const Home = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   const [toastOpen, setToastOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loginDialogOpen, setLoginDialogOpen] = useState(false);

//   const handleExplore = () => {
//     if (isLoggedIn) {
//       setModalOpen(true);
//     } else {
//       setToastOpen(true);
//     }
//   };

//   const handleModalConfirm = () => {
//     setModalOpen(false);
//     if (userRole === "admin") {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/user/dashboard");
//     }
//   };

//   const handleLogin = ({ username, role }) => {
//     setIsLoggedIn(true);
//     setUserRole(role);
//   };

//   return (
//     <Box>
//       {/* Navbar */}
//       <AppBar position="static" sx={{ backgroundColor: "#B2E0FB" }}>
//         <Toolbar>
//           <img
//             src={logo}
//             alt="ICT Academy"
//             style={{ height: 40, marginRight: 16 }}
//           />
//           <Box sx={{ flexGrow: 1 }} />
//           <Button startIcon={<HomeIcon />}>Home</Button>
//           <Button startIcon={<InfoIcon />}>About</Button>
//           <Button startIcon={<ContactMailIcon />}>Contact</Button>
//           <Button
//             startIcon={<LoginIcon />}
//             onClick={() => setLoginDialogOpen(true)}
//           >
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           p: { xs: 2, md: 4 },
//           mt: 5,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           animation: "fadeIn 1.5s ease-in-out",
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

//         <Button variant="contained" onClick={handleExplore}>
//           Explore Videos
//         </Button>
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
//           <Button variant="outlined" onClick={() => setModalOpen(false)}>
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       {/* Login Dialog */}
//       <Login
//         open={loginDialogOpen}
//         handleClose={() => setLoginDialogOpen(false)}
//         handleLogin={handleLogin}
//       />

//       {/* Animation styles */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default Home;




// import React, { useState } from "react";  // updated on 2025-07-20
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Typography,
//   Box,
//   Snackbar,
//   Modal,
//   IconButton,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import MailIcon from "@mui/icons-material/Mail";
// import LoginIcon from "@mui/icons-material/Login";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
//    import { motion } from "framer-motion";
// import logo from "../assets/download.png";
// import img1 from "../assets/techstack1.jpg";
// import img2 from "../assets/techstack1.jpg";
// import img3 from "../assets/techstack1.jpg";
// import img4 from "../assets/techstack1.jpg";
// import { useNavigate } from "react-router-dom";
// import Login from "../components/Login";

// const Home = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [toastOpen, setToastOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loginDialogOpen, setLoginDialogOpen] = useState(false);

//   const [galleryImages, setGalleryImages] = useState([
//     { src: img1, title: "MERN Stack" },
//     { src: img2, title: "Spring Boot" },
//     { src: img3, title: "Django Web App" },
//     { src: img4, title: "MEAN Stack" },
//   ]);

//   const handleExplore = () => {
//     if (isLoggedIn) {
//       setModalOpen(true);
//     } else {
//       setToastOpen(true);
//     }
//   };

//   const handleModalConfirm = () => {
//     setModalOpen(false);
//     navigate(userRole === "admin" ? "/admin/dashboard" : "/user/dashboard");
//   };

//   const handleLogin = ({ username, role }) => {
//     setIsLoggedIn(true);
//     setUserRole(role);
//   };

//   const branchBgColor = "#f0f7fb";
//   const branchHoverColor = "#d6eaf7";

//   return (
//     <Box>
//       {/* Navbar */}
//       <AppBar position="static" sx={{ backgroundColor: "#B2E0FB" }}>
//         <Toolbar>
//           <img src={logo} alt="ICT Academy" style={{ height: 40, marginRight: 16 }} />
//           <Box sx={{ flexGrow: 1 }} />
//           <Button startIcon={<HomeIcon />}>Home</Button>
//           <Button startIcon={<InfoIcon />}>About</Button>
//           <Button startIcon={<MailIcon />}>Contact</Button>
//           <Button startIcon={<LoginIcon />} onClick={() => setLoginDialogOpen(true)}>
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section with Cards */}
//       <Box sx={{ px: { xs: 3, md: 10 }, py: 6, backgroundColor: "#ffffff" }}>
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           sx={{ color: "#004b8d", mb: 4, textAlign: "center" ,fontFamily:'-moz-initial'}}
//         >
//           FSD VIDEO GALLERY
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{ color: "#333", mb: 5, textAlign: "center", maxWidth: 800, mx: "auto" ,fontFamily:'-moz-initial'}}
//         >
//           Explore alumni project video presentations using stacks like MERN, MEAN, Django,
//           Spring Boot, and more. Learn from practical applications and real-world scenarios.
//         </Typography>


        
   

// <Grid container spacing={3}>
//   {galleryImages.map((img, index) => (
//     <Grid item xs={12} sm={6} md={3} key={index}>
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.1 }}
//         viewport={{ once: true }}
//       >
//         <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//           <CardMedia
//             component="img"
//             height="180"
//             image={img.src}
//             alt={img.title}
//             sx={{
//               objectFit: "cover",
//               transition: "transform 0.4s ease-in-out",
//               "&:hover": {
//                 transform: "scale(1.1)",
//               },
//             }}
//           />
//           <CardContent>
//             <Typography
//               variant="subtitle1"
//               fontWeight="bold"
//               textAlign="center"
//               sx={{ color: "#003b6f" }}
//             >
//               {img.title}
//             </Typography>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </Grid>
//   ))}
// </Grid>

// {/* 
//         <Grid container spacing={3}>
//           {galleryImages.map((img, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//                 <CardMedia
//                   component="img"
//                   height="180"
//                   image={img.src}
//                   alt={img.title}
//                   sx={{ objectFit: "cover" }}
//                 />
//                 <CardContent>
//                   <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
//                     {img.title}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid> */}

//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <Button
//             variant="contained"
//             onClick={handleExplore}
//             sx={{
//               backgroundColor: "#0056b3",
//               color: "white",
//               fontWeight: "bold",
//               px: 4,
//               py: 1.5,
//               ":hover": { backgroundColor: "#007bff" },
//               fontFamily: '-moz-initial',
//             }}
//           >
//             Explore Videos
//           </Button>
//         </Box>
//       </Box>


//       {/* Toast Notification */}
       

//       {/* Branch Info */}
//       <Box
//         sx={{
//           backgroundColor: branchBgColor,
//           px: { xs: 3, md: 10 },
//           py: 5,
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 4,
//           justifyContent: "space-between",
//         }}
//       >
//         {/* <Box sx={{ minWidth: 200 }}>
//           <img src={logo} alt="ICT Logo" style={{ height: 60 }} />
//           <Typography fontWeight="bold" mt={1} sx={{ color: "#003b6f" }}>
//             ICT ACADEMY OF KERALA
//           </Typography>
//         </Box> */}
//         <Box sx={{ display: "flex", alignItems: "center", minWidth: 200 }}>
//   {/* Logo on the left */}
//   <img src={logo} alt="ICT Logo" style={{ height: 60 }} />

//   {/* Vertical word stack on the right */}
//   <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
//     <Typography fontWeight="bold" sx={{ color: "#003b6f" }}>
//       ICT
//     </Typography>
//     <Typography fontWeight="bold" sx={{ color: "#003b6f" }}>
//       ACADEMY
//     </Typography>
//     <Typography fontWeight="bold" sx={{ color: "#003b6f" }}>
//      OF KERALA
//     </Typography>
//   </Box>
// </Box>


//         {[
//           {
//             title: "Head Quarters",
//             address:
//               "G1, Ground Floor, Thejaswini, Technopark Campus, Thiruvananthapuram, Kerala – 695 581",
//             phone: "+91 471 270 0811",
//           },
//           {
//             title: "Regional Centre (Central)",
//             address:
//               "B-Wing, Kanikonna Villa, Infopark Campus, Koratty, Thrissur, Kerala – 680 308",
//             phone: "+91 480 273 1050",
//           },
//           {
//             title: "Regional Centre (North)",
//             address:
//               "2nd Floor, UL Cyberpark Building, Nellikode Post, Kozhikode, Kerala – 673 016",
//             phone: "+91 495 243 1432",
//           },
//         ].map((branch, index) => (
//           <Box
//             key={index}
//             sx={{
//               p: 2,
//               transition: "all 0.3s",
//               ":hover": { backgroundColor: branchHoverColor },
//               backgroundColor: branchBgColor,
//               flex: 1,
//               color: "#003b6f",
//               borderRadius: 2,
//             }}
//           >
//             <Typography fontWeight="bold" gutterBottom>
//               <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
//               {branch.title}
//             </Typography>
//             <Typography fontSize={14}>{branch.address}</Typography>
//             <Typography fontSize={14} sx={{ mt: 1 }}>
//               Phone: {branch.phone}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       {/* Footer */}
//       <Box sx={{ backgroundColor: "#031E34", color: "white", py: 3 }}>
//         <Typography align="center" fontSize={14}>
//           © 2024 ICT Academy of Kerala
//         </Typography>
//         <Typography align="center" fontSize={13}>
//           Terms of Use | Privacy & Security | Cookie Policy
//         </Typography>
//         <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
//           <IconButton href="https://www.linkedin.com" target="_blank" color="inherit">
//             <LinkedInIcon />
//           </IconButton>
//           <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
//             <FacebookIcon />
//           </IconButton>
//           <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
//             <InstagramIcon />
//           </IconButton>
//           <IconButton href="https://www.youtube.com" target="_blank" color="inherit">
//             <YouTubeIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Toast */}
//       <Snackbar

//         open={toastOpen}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         onClose={() => setToastOpen(false)}
//         message="Please login to explore videos"

//       /> 
      

//         autoHideDuration={3000}
//         sx={{
//           "& .MuiSnackbarContent-root": {
//             backgroundColor: "#e0f2ff",
//             color: "#004b8d",
//             fontWeight: 500,
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           },
//         }}
      


//       {/* Modal */}
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
//           <Button variant="contained" sx={{ mr: 1 }} onClick={handleModalConfirm}>
//             Yes
//           </Button>
//           <Button variant="outlined" onClick={() => setModalOpen(false)}>
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       {/* Login Dialog */}
//       <Login
//         open={loginDialogOpen}
//         handleClose={() => setLoginDialogOpen(false)}
//         handleLogin={handleLogin}
//       />
//     </Box>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react"; // updated on 2025-07-20
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Snackbar,
  Modal,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import LoginIcon from "@mui/icons-material/Login";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
   import { motion } from "framer-motion";
import logo from "../assets/download.png";
import img1 from "../assets/techstack1.jpg";
import img2 from "../assets/techstack1.jpg";
import img3 from "../assets/techstack1.jpg";
import img4 from "../assets/techstack1.jpg";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const [galleryImages, setGalleryImages] = useState([
    { src: img1, title: "MERN Stack" },
    { src: img2, title: "Spring Boot" },
    { src: img3, title: "Django Web App" },
    { src: img4, title: "MEAN Stack" },
  ]);

  const handleExplore = () => {
    if (isLoggedIn) {
      setModalOpen(true);
    } else {
      setToastOpen(true);
    }
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    navigate(userRole === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  const handleLogin = ({ username, role }) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const branchBgColor = "#f0f7fb";
  const branchHoverColor = "#d6eaf7";

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#B2E0FB" }}>
        <Toolbar>
          <img src={logo} alt="ICT Academy" style={{ height: 40, marginRight: 16 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Button startIcon={<HomeIcon />}>Home</Button>
          <Button startIcon={<InfoIcon />}>About</Button>
          <Button startIcon={<MailIcon />}>Contact</Button>
          <Button startIcon={<LoginIcon />} onClick={() => setLoginDialogOpen(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Cards */}
      <Box sx={{ px: { xs: 3, md: 10 }, py: 6, backgroundColor: "#ffffff" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#004b8d", mb: 4, textAlign: "center" ,fontFamily:'-moz-initial'}}
        >
          FSD VIDEO GALLERY
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#333", mb: 5, textAlign: "center", maxWidth: 800, mx: "auto" ,fontFamily:'-moz-initial'}}
        >
          Explore alumni project video presentations using stacks like MERN, MEAN, Django,
          Spring Boot, and more. Learn from practical applications and real-world scenarios.
        </Typography>


        
   

<Grid container spacing={3}>
  {galleryImages.map((img, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="180"
            image={img.src}
            alt={img.title}
            sx={{
              objectFit: "cover",
              transition: "transform 0.4s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <CardContent>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              sx={{ color: "#003b6f" }}
            >
              {img.title}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  ))}
</Grid>

{/* 
        <Grid container spacing={3}>
          {galleryImages.map((img, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={img.src}
                  alt={img.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
                    {img.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="contained"
            onClick={handleExplore}
            sx={{
              backgroundColor: "#0056b3",
              color: "white",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              ":hover": { backgroundColor: "#007bff" },
              fontFamily: '-moz-initial',
            }}
          >
            Explore Videos
          </Button>
        </Box>
      </Box>

      {/* Branch Info */}
      <Box
        sx={{
          backgroundColor: branchBgColor,
          px: { xs: 3, md: 10 },
          py: 5,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        {/* <Box sx={{ minWidth: 200 }}>
          <img src={logo} alt="ICT Logo" style={{ height: 60 }} />
          <Typography fontWeight="bold" mt={1} sx={{ color: "#003b6f" }}>
            ICT ACADEMY OF KERALA
          </Typography>
        </Box> */}
        <Box sx={{ display: "flex", alignItems: "center", minWidth: 200 }}>
  {/* Logo on the left */}
  <img src={logo} alt="ICT Logo" style={{ height: 60 }} />

  {/* Vertical word stack on the right */}
  <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
    <Typography fontWeight="bold" sx={{ color: "#003b6f" }}>
      ICT
    </Typography>
    <Typography fontWeight="bold" sx={{ color: "#003b6f" }}>
      ACADEMY
    </Typography>
    <Typography fontWeight="bold" sx={{ color: "#003b6f" }}>
     OF KERALA
    </Typography>
  </Box>
</Box>


        {[
          {
            title: "Head Quarters",
            address:
              "G1, Ground Floor, Thejaswini, Technopark Campus, Thiruvananthapuram, Kerala – 695 581",
            phone: "+91 471 270 0811",
          },
          {
            title: "Regional Centre (Central)",
            address:
              "B-Wing, Kanikonna Villa, Infopark Campus, Koratty, Thrissur, Kerala – 680 308",
            phone: "+91 480 273 1050",
          },
          {
            title: "Regional Centre (North)",
            address:
              "2nd Floor, UL Cyberpark Building, Nellikode Post, Kozhikode, Kerala – 673 016",
            phone: "+91 495 243 1432",
          },
        ].map((branch, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              transition: "all 0.3s",
              ":hover": { backgroundColor: branchHoverColor },
              backgroundColor: branchBgColor,
              flex: 1,
              color: "#003b6f",
              borderRadius: 2,
            }}
          >
            <Typography fontWeight="bold" gutterBottom>
              <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              {branch.title}
            </Typography>
            <Typography fontSize={14}>{branch.address}</Typography>
            <Typography fontSize={14} sx={{ mt: 1 }}>
              Phone: {branch.phone}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#031E34", color: "white", py: 3 }}>
        <Typography align="center" fontSize={14}>
          © 2024 ICT Academy of Kerala
        </Typography>
        <Typography align="center" fontSize={13}>
          Terms of Use | Privacy & Security | Cookie Policy
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton href="https://www.linkedin.com" target="_blank" color="inherit">
            <LinkedInIcon />
          </IconButton>
          <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://www.youtube.com" target="_blank" color="inherit">
            <YouTubeIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Toast */}
      <Snackbar
        open={toastOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setToastOpen(false)}
        message="Please login to explore videos"
        autoHideDuration={3000}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#e0f2ff",
            color: "#004b8d",
            fontWeight: 500,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        }}
      />

      {/* Modal */}
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
          <Button variant="contained" sx={{ mr: 1 }} onClick={handleModalConfirm}>
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
    </Box>
  );
};

export default Home;
