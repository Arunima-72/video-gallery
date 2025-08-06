// src/components/ContactModal.jsx
// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const ContactModal = ({ open, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Optionally send to backend here
//     console.log("Submitted", formData);
//     alert("Thank you for contacting us!");
//     setFormData({ name: "", email: "", phone: "" });
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           width: 400,
//           bgcolor: "background.paper",
//           p: 4,
//           mx: "auto",
//           my: "10%",
//           borderRadius: 2,
//           boxShadow: 24,
//           position: "relative",
//         }}
//       >
//         <IconButton
//           onClick={onClose}
//           sx={{ position: "absolute", top: 8, right: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           Contact Us
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             name="name"
//             label="Name"
//             value={formData.name}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />
//           <TextField
//             fullWidth
//             name="email"
//             label="Email"
//             value={formData.email}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />
//           <TextField
//             fullWidth
//             name="phone"
//             label="Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             sx={{ mb: 3 }}
//           />
//           <Button type="submit" variant="contained" fullWidth>
//             Submit
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default ContactModal;
// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   IconButton,
//   Alert,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// const ContactModal = ({ open, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validatePhone = (phone) =>
//     phone === "" || /^[0-9]{10}$/.test(phone); // Optional but must be 10 digits if entered

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { name, email, phone } = formData;

//     if (!name || !email) {
//       setError("Name and Email are required");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("Invalid email format");
//       return;
//     }

//     if (!validatePhone(phone)) {
//       setError("Phone must be 10 digits (if provided)");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:3000/save/contact", formData); // Ensure proxy is set
//       setSuccess("Thank you for contacting us!");
//       setFormData({ name: "", email: "", phone: "" });

//       setTimeout(() => {
//         setSuccess("");
//         onClose();
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to send. Please try again.");
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           width: 400,
//           bgcolor: "background.paper",
//           p: 4,
//           mx: "auto",
//           my: "10%",
//           borderRadius: 2,
//           boxShadow: 24,
//           position: "relative",
//         }}
//       >
//         <IconButton
//           onClick={onClose}
//           sx={{ position: "absolute", top: 8, right: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           Contact Us
//         </Typography>

//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//         {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             name="name"
//             label="Name"
//             value={formData.name}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />
//           <TextField
//             fullWidth
//             name="email"
//             label="Email"
//             value={formData.email}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />
//           <TextField
//             fullWidth
//             name="phone"
//             label="Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             sx={{ mb: 3 }}
//           />
//           <Button type="submit" variant="contained" fullWidth>
//             Submit
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default ContactModal;
// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   IconButton,
//   Alert,
//   Divider,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import axios from "axios";

// const ContactModal = ({ open, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validatePhone = (phone) =>
//     phone === "" || /^[0-9]{10}$/.test(phone);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { name, email, phone, subject, message } = formData;

//     if (!name || !email || !subject || !message) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("Invalid email format");
//       return;
//     }

//     if (!validatePhone(phone)) {
//       setError("Phone must be 10 digits (if provided)");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:3000/save/contact", formData);
//       setSuccess("Message sent successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });

//       setTimeout(() => {
//         setSuccess("");
//         onClose();
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to send message.");
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           width: "80%",
//           maxWidth: 900,
//           bgcolor: "#fff",
//           display: "flex",
//           mx: "auto",
//           my: "8%",
//           borderRadius: 3,
//           boxShadow: 24,
//           overflow: "hidden",
//           position: "relative",
//         }}
//       >
//         {/* Contact Info Side */}
//         <Box
//           sx={{
//             bgcolor: "#00bcd4",
//             color: "#fff",
//             width: "35%",
//             p: 4,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Contact Information
//             </Typography>
//             <Typography mb={2}>
//               We’ll create high-quality linkable content and build at least 40 high-authority.
//             </Typography>
//             <Box display="flex" alignItems="center" mb={1}>
//               <PhoneIcon sx={{ mr: 1 }} /> +8801779176786
//             </Box>
//             <Box display="flex" alignItems="center" mb={1}>
//               <PhoneIcon sx={{ mr: 1 }} /> +988678363866
//             </Box>
//             <Box display="flex" alignItems="center" mb={1}>
//               <EmailIcon sx={{ mr: 1 }} /> support@uprangly.com
//             </Box>
//             <Box display="flex" alignItems="center">
//               <LocationOnIcon sx={{ mr: 1 }} /> New York, USA
//             </Box>
//           </Box>
//         </Box>

//         {/* Form Side */}
//         <Box sx={{ width: "65%", p: 4 }}>
//           <IconButton
//             onClick={onClose}
//             sx={{ position: "absolute", top: 8, right: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>

//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Get In Touch
//           </Typography>

//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//           {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//           <form onSubmit={handleSubmit}>
//             <Box display="flex" gap={2} mb={2}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <TextField
//                 fullWidth
//                 name="email"
//                 label="Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             {/* <TextField
//               fullWidth
//               name="subject"
//               label="Your Subject"
//               value={formData.subject}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             /> */}
//             <TextField
//               fullWidth
//               name="message"
//               label="Message"
//               multiline
//               rows={4}
//               value={formData.message}
//               onChange={handleChange}
//               required
//               sx={{ mb: 3 }}
//             />
//                  <Button
//           variant="contained"
          
//           sx={{ mt: 3, bgcolor: '#fff', color: '#00bcd4' }}
//           href="https://wa.me/7594839356?text=Hello, I would like to get in touch with you."
//           target="_blank"
//         >
//           Message Us on WhatsApp
//         </Button>
//             {/* <Button type="submit" variant="contained" fullWidth>
//               Send Message
//             </Button> */}
//           </form>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default ContactModal;
// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   IconButton,
//   Alert,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import axios from "axios";

// const ContactModal = ({ open, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // const handleWhatsAppSubmit = async () => {
//   //   setError("");
//   //   const { name, email } = formData;

//   //   if (!name || !email) {
//   //     setError("Please fill in both name and email.");
//   //     return;
//   //   }

//   //   if (!validateEmail(email)) {
//   //     setError("Invalid email format.");
//   //     return;
//   //   }

//   //   try {
//   //     // Send data to backend (only name and email)
//   //     await axios.post("http://localhost:3000/save/contact", {
//   //       name,
//   //       email,
//   //     });

//   //     // Build WhatsApp message and redirect
//   //     const message = `Hello, I am ${name} (${email}). I would like to get in touch with you.`;
//   //     const encodedMessage = encodeURIComponent(message);
//   //     const whatsappUrl = `https://wa.me/7594839356?text=${encodedMessage}`;
//   //     window.open(whatsappUrl, "_blank");

//   //     // Optionally reset form or close modal
//   //     setFormData({
//   //       name: "",
//   //       email: "",
//   //       phone: "",
//   //       subject: "",
//   //       message: "",
//   //     });
//   //     onClose();
//   //   } catch (err) {
//   //     console.error(err);
//   //     setError("Failed to send message.");
//   //   }
//   // };
// const handleSubmit = async () => {
//   setError("");
//   setSuccess("");
//   const { name, email, message } = formData;

//   if (!name || !email) {
//     setError("Please fill in both name and email.");
//     return;
//   }

//   if (!validateEmail(email)) {
//     setError("Invalid email format.");
//     return;
//   }

//   try {
//     // POST full data to /contact route
//     await axios.post("http://localhost:3000/save/contact", {
//       name,
//       email,
//       message,
//     });

//     setSuccess("Message sent successfully!");
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       subject: "",
//       message: "",
//     });

//     // Optionally close modal after success
//     onClose();
//   } catch (err) {
//     console.error(err);
//     setError("Failed to send message.");
//   }
// };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           width: "80%",
//           maxWidth: 900,
//           bgcolor: "#fff",
//           display: "flex",
//           mx: "auto",
//           my: "8%",
//           borderRadius: 3,
//           boxShadow: 24,
//           overflow: "hidden",
//           position: "relative",
//         }}
//       >
//         {/* Left Side Contact Info */}
//         <Box
//           sx={{
//             bgcolor: "#00bcd4",
//             color: "#fff",
//             width: "35%",
//             p: 4,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box >
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Contact Information
//             </Typography>
//             <Typography mb={2}>
//               We’re here to help you with your queries. Reach out to us for  inquiries, support, or collaborations.
//             </Typography>
//             <Box display="flex" alignItems="center" mb={1}>
//               <PhoneIcon sx={{ mr: 1 }} /> +91 7594839356
//             </Box>
//             <Box display="flex" alignItems="center" mb={1}>
//               <EmailIcon sx={{ mr: 1 }} /> arunimasuresh0072@gmail.com
//             </Box>
//             <Box display="flex" alignItems="center">
//               <LocationOnIcon sx={{ mr: 1 }} />  Head Quarters,
//                G1, Ground Floor, Thejaswini, Technopark Campus, Thiruvananthapuram, Kerala , 695 581,
              
//             </Box>
//           </Box>
//         </Box>

//         {/* Right Side Form */}
//         <Box sx={{ width: "65%", p: 4 }}>
//           <IconButton
//             onClick={onClose}
//             sx={{ position: "absolute", top: 8, right: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>

//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Get In Touch
//           </Typography>

//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//           {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//           <form>
//             <Box display="flex" gap={2} mb={2}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <TextField
//                 fullWidth
//                 name="email"
//                 label="Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>

//             <TextField
//               fullWidth
//               name="message"
//               label="Message "
//               multiline
//               rows={4}
//               value={formData.message}
//               onChange={handleChange}
//               sx={{ mb: 3 }}
//             /> 
//            {/* <Button
//   variant="contained"
//   onClick={handleWhatsAppSubmit}
//   sx={{
//     mt: 2,
//     bgcolor: "#00bcd4", // Blue color
//     color: "#fff",
//     borderRadius: "50px", // Rounded button
//     textTransform: "none", // Optional: disables all-caps
//     fontWeight: "bold",
//     py: 1.2, // Padding Y (vertical)
//     '&:hover': {
//       bgcolor: "#00bcd4" // Darker blue on hover
//     }
//   }}
// >
//   Send Message
// </Button> */}
// <Button
//   variant="contained"
//   onClick={handleSubmit}  // ← changed from handleWhatsAppSubmit
//   sx={{
//     mt: 2,
//     bgcolor: "#00bcd4",
//     color: "#fff",
//     borderRadius: "50px",
//     textTransform: "none",
//     fontWeight: "bold",
//     py: 1.2,
//     '&:hover': {
//       bgcolor: "#00bcd4"
//     }
//   }}
// >
//   Send Message
// </Button>


//             {/* <Button
//               variant="contained"
//               onClick={handleWhatsAppSubmit}
//               sx={{
//                 mt: 2,
//                 bgcolor: "#25D366", // WhatsApp green
//                 color: "#fff",
//                 '&:hover': {
//                   bgcolor: "#1DA851"
//                 }
//               }}
//             >
//                WhatsApp
//             </Button> */}
//           </form>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default ContactModal;

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
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Information
            </Typography>
            <Typography mb={2}>
              We’re here to help you with your queries. Reach out to us for inquiries, support, or collaborations.
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ mr: 1 }} /> +91 7594839356
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <EmailIcon sx={{ mr: 1 }} /> arunimasuresh0072@gmail.com
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ mr: 1 }} />
              Head Quarters, G1, Ground Floor, Thejaswini, Technopark Campus, Thiruvananthapuram, Kerala , 695 581
            </Box>
          </Box>
        </Box>

        {/* Right Side Form */}
        <Box sx={{ width: "65%", p: 4 }}>
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
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
              />
              <TextField
                fullWidth
                name="email"
                label="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
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
              sx={{ mb: 3 }}
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
                  bgcolor: "#00bcd4"
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
