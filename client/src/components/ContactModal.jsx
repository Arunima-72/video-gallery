

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";

const ContactModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // ✅ Snackbar control

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    const { name, email, message } = formData;

    if (!name || !email) {
      setError("Please fill in both name and email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/save/contact", {
        name,
        email,
        message,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setSnackbarOpen(true); // ✅ Show success snackbar

      // ✅ Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to send message.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "80%",
          maxWidth: 900,
          bgcolor: "#fff",
          display: "flex",
          mx: "auto",
          my: "8%",
          borderRadius: 3,
          boxShadow: 24,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left Side Contact Info */}
        <Box
          sx={{
            bgcolor: "#00bcd4",
            color: "#fff",
            width: "35%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom style={{ fontFamily: 'Poppins' }}>
              Contact Information
            </Typography>
            <Typography mb={2} style={{ fontFamily: 'Poppins' }}>
              We’re here to help you with your queries. Reach out to us for inquiries, support, or collaborations.
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ mr: 1 ,fontFamily:'Poppins'}} /> +91 7594839356
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <EmailIcon sx={{ mr: 1,fontFamily:'Poppins' }} /> arunimasuresh0072@gmail.com
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ mr: 1 ,fontFamily:'Poppins'}} />
           Technopark Campus, Thiruvananthapuram, Kerala 
            </Box>
          </Box>
        </Box>

        {/* Right Side Form */}
        <Box sx={{ width: "65%", p: 4 }}>
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" gutterBottom style={{ fontFamily: 'Poppins' }}>
            Get In Touch
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                fullWidth
                name="name"
                label="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ fontFamily: 'Poppins' }}
              />
              <TextField
                fullWidth
                name="email"
                label="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ fontFamily: 'Poppins' }}
              />
            </Box>

            <TextField
              fullWidth
              name="message"
              label="Message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              sx={{ mb: 3, fontFamily: 'Poppins' }}
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                bgcolor: "#00bcd4",
                color: "#fff",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: "bold",
                py: 1.2,
                '&:hover': {
                  bgcolor: "#00bcd4",
                  fontFamily: 'Poppins'
                }
              }}
            >
              Send Message
            </Button>
          </form>
        </Box>

        {/* ✅ Snackbar for success */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default ContactModal;
