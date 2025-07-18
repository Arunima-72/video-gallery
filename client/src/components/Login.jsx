// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Box,
//   IconButton,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// // import './LoginDialog.css'; // optional for custom styling
// import logo from "../assets/download.png";
// const Login = ({ open, handleClose }) => {
//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogContent sx={{ p: 4, width: 400, textAlign: 'center' }}>
//         {/* Close Icon */}
//         <IconButton
//           onClick={handleClose}
//           sx={{ position: 'absolute', top: 8, right: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>

//         {/* Logo */}
//         <Box sx={{ mb: 2 }}>
//           <img
//             src={logo} // replace with your actual logo path
//             alt="ICT Academy"
//             width={100}
//             height={100}
//             style={{ borderRadius: '12px' }}
//           />
//         </Box>

//         {/* Title */}
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>

//         {/* Username */}
//         <TextField
//           label="Username"
//           variant="standard"
//           fullWidth
//           sx={{ mb: 2 }}
//         />

//         {/* Password */}
//         <TextField
//           label="Password"
//           type="password"
//           variant="standard"
//           fullWidth
//           sx={{ mb: 3 }}
//         />

//         {/* Login Button */}
//         <Button
//           variant="contained"
//           fullWidth
//           sx={{
//             mb: 2,
//             background: 'linear-gradient(to right, #4facfe, #00f2fe)',
//             borderRadius: 8,
//           }}
//         >
//           Login
//         </Button>

//         {/* Links */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             fontSize: 14,
//           }}
//         >
//           <Link href="#" underline="hover">
//             Create an account
//           </Link>
//           <Link href="#" underline="hover">
//             Forgot password?
//           </Link>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Box,
//   IconButton,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import logo from '../assets/download.png';

// const Login = ({ open, handleClose }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/user/login', formData);
//       const { user, token } = response.data;

//       // Store token in localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', user.role);

//       // Redirect based on role
//       if (user.role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/user/dashboard');
//       }

//       handleClose(); // Close the dialog
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Try again.');
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogContent sx={{ p: 4, width: 400, textAlign: 'center' }}>
//         {/* Close Icon */}
//         <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
//           <CloseIcon />
//         </IconButton>

//         {/* Logo */}
//         <Box sx={{ mb: 2 }}>
//           <img
//             src={logo}
//             alt="ICT Academy"
//             width={100}
//             height={100}
//             style={{ borderRadius: '12px' }}
//           />
//         </Box>

//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>

//         {/* Email */}
//         <TextField
//           label="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           variant="standard"
//           fullWidth
//           sx={{ mb: 2 }}
//         />

//         {/* Password */}
//         <TextField
//           label="Password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           variant="standard"
//           fullWidth
//           sx={{ mb: 3 }}
//         />

//         {/* Error */}
//         {error && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         {/* Login Button */}
//         <Button
//           onClick={handleLogin}
//           variant="contained"
//           fullWidth
//           sx={{
//             mb: 2,
//             background: 'linear-gradient(to right, #4facfe, #00f2fe)',
//             borderRadius: 8,
//           }}
//         >
//           Login
//         </Button>

//         {/* Links */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             fontSize: 14,
//           }}
//         >
//           <Link href="#" underline="hover">
//             Create an account
//           </Link>
//           <Link href="#" underline="hover">
//             Forgot password?
//           </Link>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  IconButton,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/download.png'; // Replace with your logo path

const Login = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    setError(''); // Clear any previous error

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/login', formData);
      const { token, role } = response.data;

      // Save token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }

      handleClose(); // Close the dialog after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ p: 4, width: 400, textAlign: 'center', position: 'relative' }}>
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Logo */}
        <Box sx={{ mb: 2 }}>
          <img
            src={logo}
            alt="App Logo"
            width={100}
            height={100}
            style={{ borderRadius: '12px' }}
          />
        </Box>

        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Email Input */}
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="standard"
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            background: 'linear-gradient(to right, #4facfe, #00f2fe)',
            borderRadius: 8,
          }}
        >
          Login
        </Button>

        {/* Links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 14,
          }}
        >
          <Link href="/signup" underline="hover">
            Create an account
          </Link>
          <Link href="/forgot-password" underline="hover">
            Forgot password?
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
