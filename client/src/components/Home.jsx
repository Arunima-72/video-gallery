

import React, { useState, useEffect, useRef } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/LOGO_ICTAK-ENG-.png";
import img1 from "../assets/techstack1.jpg";
import img2 from "../assets/img1.jpg"; // Add a second image
import img3 from "../assets/img2.webp"; // Add a third image
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactModal from "../components/ContactModal"; 
const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [img1, img2];

  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // const handleExplore = () => {
  //       const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // };
const handleExplore = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "user") {
      navigate("/admin/videos");
    } else {
      navigate("/"); // fallback
    }
  } else {
    // navigate("/login");
      alert("Please log in to explore the gallery.");
  }
};

const [contactModalOpen, setContactModalOpen] = useState(false);
const [openModal, setOpenModal] = useState(false);
  const handleModalConfirm = () => {
    setModalOpen(false);
    navigate(userRole === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  const handleLogin = ({ username, role }) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const branchBgColor = "#f0f7fb";
  const branchHoverColor = "#d6eaf7";

  return (
    <Box>
      {/* AppBar */}
      <AppBar
        position="static"
        sx={{
          // background: "linear-gradient(to right, #4886b8ff, #21CBF3)",
               background: "linear-gradient(to right, #bed9efff, #227ae5ff)",
          color: "#fff",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ px: 3 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="ICT Academy" style={{ height: 40, marginRight: 10 }} />
            
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
         
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Button startIcon={<HomeIcon />} onClick={() => navigate("/")} sx={{ color: "#fff",fontFamily: 'Poppins' }}>
            Home
          </Button>
          <Button startIcon={<InfoIcon />} onClick={() => scrollToSection(aboutRef)} sx={{ color: "#fff",fontFamily: 'Poppins' }}>
            About
          </Button>
          {/* <Button startIcon={<MailIcon />} onClick={() => scrollToSection(contactRef)} sx={{ color: "#fff" }}>
            Contact
          </Button> */}
              {/* <Button startIcon={<MailIcon />}  sx={{ color: "#fff" }}>
            Contact
          </Button> */}
              <Button
        startIcon={<MailIcon />}
        onClick={() => setOpenModal(true)}
        
        sx={{  color: "#fff",borderRadius: "20px",fontFamily: 'Poppins' }}
      >
        Contact
      </Button>

      <ContactModal open={openModal} onClose={() => setOpenModal(false)} />
          <Button startIcon={<LoginIcon />} onClick={() => setLoginDialogOpen(true)} sx={{ color: "#fff", ml: 1 ,fontFamily: 'Poppins' }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          px: { xs: 3, md: 10 },
          py: 10,
          backgroundColor: "white",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
   
{/* <Typography
  variant="h3"
  fontWeight="bold"
  sx={{
    color: "#1a5292ff",
    mb: 2,
    fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
    textShadow: `
      1px 1px 0 #ccc,
      2px 2px 0 #bbb,
      3px 3px 0 #aaa
    `,
    letterSpacing: "1px",
    lineHeight: 1.2,
  }}
>
  Explore. Learn. Grow.
</Typography> */}
<Typography
  variant="h3"
  fontWeight="bold"
  sx={{
    mb: 2,
    fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
    background: "linear-gradient(90deg, #1a5292, #3b82f6, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: `
      3px 2px 4px rgba(51, 96, 133, 0.2),
      6px 4px 7px rgba(12, 9, 9, 0.15)
    `,
    letterSpacing: "1px",
    lineHeight: 1.2,
  }}
>
  Explore. Learn. Grow.
</Typography>

            <Typography variant="h5" fontWeight={500} sx={{ color: "#004080", mb: 2 ,fontFamily:'Poppins'}}>
              FSD VIDEO GALLERY
            </Typography>
            <Typography variant="body1" sx={{ color: "#555", mb: 3, maxWidth: 500 ,fontFamily:'Poppins'}}>
              Explore alumni project video presentations using stacks like MERN, MEAN, Django,
              Spring Boot, and more. Learn from real-world applications and build your skills.
            </Typography>
            {/* <Button
              variant="contained"
              onClick={handleExplore}
              sx={{
                backgroundColor: "#007bff",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.2,
                ":hover": { backgroundColor: "#0056b3" },
              }}
            >
              Explore Videos
            </Button> */}
            <Button
  variant="contained"
  onClick={handleExplore}
  sx={{
    backgroundColor: "#4187d8ff",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    px: 4,
    py: 1.2,
    borderRadius: "50px", // 👈 Rounded button
    ":hover": {
      backgroundColor: "#3271b9ff",
      fontFamily: 'Poppins',
    },
  }}
>
  Explore Videos
</Button>

          </motion.div>
        </Box>

        {/* Animated Image Slider */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", minHeight: 300 ,overflow: "hidden"}}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt="hero"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </AnimatePresence>
        </Box>
      </Box>

      {/* About Section */}
      {/* <Box ref={aboutRef} sx={{ px: { xs: 3, md: 10 }, py: 8, backgroundColor: "#ffffff" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#003b6f", mb: 2 }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, color: "#333" }}>
          The FSD Video Gallery is a curated platform showcasing real-world projects by alumni,
          developed using various full-stack technologies. It empowers learners to gain practical
          insights and motivation through peer-built solutions and presentations.
        </Typography>
      </Box> */}
      {/* About Section */}
<Box
  ref={aboutRef}
  sx={{
    px: { xs: 2, sm: 4, md: 10 },
    py: 10,
    backgroundColor: "white",
    position: "relative",
  }}
>
  <Card
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      p: { xs: 2, sm: 4 },
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      overflow: "visible",
      position: "relative",
    }}
  >
    {/* Left Image */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginBottom: { xs: "2rem", md: 0 },
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "100%" },
          position: { md: "absolute" },
          left: { md: "-60px" },
          top: { md: "50%" },
          transform: { md: "translateY(-50%)" },
        }}
      >
        <img
          src={img3}
          alt="About FSD"
          style={{
            width: "80%",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        />
      </Box>
    </motion.div>

    {/* Right Text Content */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <CardContent>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#3c88caff", mb: 2 ,fontFamily:'Poppins'}}
        >
          About the Gallery
        </Typography>
        <Typography variant="body1" sx={{ color: "black", mb: 2 ,fontFamily:'Poppins'}}>
          The <strong>FSD Video Gallery</strong> is a learning hub that showcases
          real-world project presentations from full-stack development alumni.
          Projects cover major tech stacks such as <strong>MERN, MEAN, Django, Spring Boot</strong>,
          and more.
        </Typography>
        <Typography variant="body1" sx={{ color: "#333",fontFamily:'Poppins' }}>
          Whether you're an aspiring developer or seasoned professional, these
          video resources offer practical insights, coding best practices, and
          project workflows straight from the classroom to production-level
          applications.
        </Typography>
      </CardContent>
    </motion.div>
  </Card>
</Box>


      {/* Contact Section */}
      <Box ref={contactRef}>
        {/* Branch Info (already styled in your code) */}
        <Box
          sx={{
            backgroundColor: branchBgColor,
            px: { xs: 3, md: 10 },
            py: 5,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "space-between",
            fontFamily: 'Poppins',
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", minWidth: 200 }}>
            <img src={logo} alt="ICT Logo" style={{ height: 60 }} />
            <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
              
            </Box>
          </Box>

          {[
            {
              title: "Head Quarters",
              address: "G1, Ground Floor, Thejaswini, Technopark Campus, Thiruvananthapuram, Kerala – 695 581",
              phone: "+91 471 270 0811",
            },
            {
              title: "Regional Centre (Central)",
              address: "B-Wing, Kanikonna Villa, Infopark Campus, Koratty, Thrissur, Kerala – 680 308",
              phone: "+91 480 273 1050",
            },
            {
              title: "Regional Centre (North)",
              address: "2nd Floor, UL Cyberpark Building, Nellikode Post, Kozhikode, Kerala – 673 016",
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
              <Typography fontWeight="bold" gutterBottom style={{ fontFamily: 'Poppins' }}>
                <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                {branch.title}
              </Typography>
              <Typography fontSize={14} style={{fontFamily:'Poppins'}}>{branch.address}</Typography>
              <Typography fontSize={14} sx={{ mt: 1 ,fontFamily:'Poppins' }}>
                Phone: {branch.phone}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#031E34", color: "white", py: 3 }}>
        <Typography align="center" fontSize={14} fontFamily={'Poppins'}>© 2024 ICT Academy of Kerala</Typography>
        <Typography align="center" fontSize={13} fontFamily={'Poppins'}>Terms of Use | Privacy & Security | Cookie Policy</Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton href="https://www.linkedin.com" target="_blank" color="inherit"><LinkedInIcon /></IconButton>
          <IconButton href="https://www.facebook.com" target="_blank" color="inherit"><FacebookIcon /></IconButton>
          <IconButton href="https://www.instagram.com" target="_blank" color="inherit"><InstagramIcon /></IconButton>
          <IconButton href="https://www.youtube.com" target="_blank" color="inherit"><YouTubeIcon /></IconButton>
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
          <Typography variant="h6" gutterBottom>Ready to explore videos?</Typography>
          <Button variant="contained" sx={{ mr: 1 }} onClick={handleModalConfirm}>Yes</Button>
          <Button variant="outlined" onClick={() => setModalOpen(false)}>Cancel</Button>
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
