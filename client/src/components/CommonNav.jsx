
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
import logo from "../assets/LOGO_ICTAK-ENG-.png"; // Ensure this path is correct

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
        // background: "linear-gradient(to right, #4886b8ff, #21CBF3)",
        background: "linear-gradient(to right, #bed9efff, #227ae5ff)",
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