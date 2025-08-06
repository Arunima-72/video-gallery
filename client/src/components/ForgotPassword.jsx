import React, { useState } from "react";
import axiosInstance from "./axiosInterceptor";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState("email"); // "email" → "otp" → "reset"
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axiosInstance.post("/user/forgot-password", { email });
      setMessage(res.data.message);
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axiosInstance.post("/user/verify-otp", { email, otp });
      setMessage(res.data.message);
      setStep("reset");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 3: Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axiosInstance.post("/user/set-new-password", {
        email,
        newPassword,
        confirmPassword,
      });
      setMessage(res.data.message);

      // ✅ Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);

      setStep("done");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2} align="center" fontWeight="bold">
          Forgot Password
        </Typography>

        {/* Step 1: Email */}
        {step === "email" && (
          <form onSubmit={handleSendOtp}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <TextField
              label="Enter OTP"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </form>
        )}

        {/* Success Message */}
        {step === "done" && (
          <Typography color="green" mt={2} align="center">
            ✅ Password updated successfully! Redirecting to login...
          </Typography>
        )}

        {/* Alerts */}
        {message && (
          <Typography color="green" mt={2} align="center">
            {message}
          </Typography>
        )}
        {error && (
          <Typography color="error" mt={2} align="center">
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ForgotPassword;