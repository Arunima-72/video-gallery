
import React, { useState } from 'react';   // updated login 20/7
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
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/download.png';

const Login = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required.';
    if (!formData.password) errors.password = 'Password is required.';
    return errors;
  };

  const handleLogin = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/user/login', formData);
      const { token, role } = response.data;

      // Store token and role in localStorage (default)
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
localStorage.setItem('userId', response.data.userId);
      handleClose();
      navigate(role === 'admin' ? '/admin/dashboard' : '/admin/videos');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          p: 4,
          width: 400,
          textAlign: 'center',
          position: 'relative',
          borderRadius: 4,
        }}
      >
        {/* Close Button */}
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        {/* Logo */}
        {/* <Box sx={{ mb: 2 }}>
          <img
            src={logo}
            alt="App Logo"
            width={100}
            height={100}
            style={{ borderRadius: '12px' }}
          />
        </Box> */}
       <Box sx={{ mb: 2, width: 120, height: 120, mx: 'auto' }}>
  <img
    src={logo}
    alt="App Logo"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '12px',
    }}
  />
</Box>

        {/* Title */}
        {/* <Typography variant="h4" fontWeight="bold" style={{fontFamily:'-moz-initial',color: '#4facfe'}}  gutterBottom>
          Login
        </Typography> */}
<Typography
  variant="h4"
  fontWeight="bold"
  sx={{
    fontFamily: 'Poppins',
    background: 'linear-gradient(to right, #2182d6ff, #09afb8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
  }}
  gutterBottom
>
  Login
</Typography>

        {/* Server Error */}
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        {/* Email */}
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="standard"
          fullWidth
          error={!!formErrors.email}
          helperText={formErrors.email}
          sx={{ mb: 2 }}
        />

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="standard"
          fullWidth
          error={!!formErrors.password}
          helperText={formErrors.password}
          sx={{ mb: 2 }}
        />

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mb: 2,
            height: 44,
            borderRadius: 8,
            background: 'linear-gradient(to right, #4facfe, #17d9e4ff)',
            '&:hover': {
              background: 'linear-gradient(to right, #3f88fc, #00d9ea)',
            },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Login'}
        </Button>

        {/* Forgot Password */}
        <Box sx={{ textAlign: 'right', fontSize: 14 ,fontFamily: 'Poppins' }}>
          <Link href="/forgot-password" underline="hover">
            Forgot password?
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Login;

