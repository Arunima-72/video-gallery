import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import Sidebar from "./Sidebar";
import CommonNav from "./CommonNav";
import axiosInstance from "./axiosInterceptor";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [userType, setUserType] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserType(role);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!form.newPassword) newErrors.newPassword = "New password is required";
    else if (form.newPassword.length < 6)
      newErrors.newPassword = "New password must be at least 6 characters";
    if (form.confirmPassword !== form.newPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosInstance.put("change/change-password", form);
      setMessage(res.data.message);
      setAlertType("success");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error changing password");
      setAlertType("error");
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  return (
    <>
      <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Box sx={{ display: "flex", backgroundColor: "#f9f9f9" }}>
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} userType={userType} />

        {/* Main Content */}
        <Box
          sx={{
            
            flexGrow: 1,
            p: 3,
            marginTop: "64px",
            marginLeft: sidebarOpen ? "-200px" : "60px",
            transition: "margin-left 0.3s",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 4,
              width: "70%",
              maxWidth: 600,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight:"lighter", mb: 2 }}
            >
              Change Password
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {message && (
              <Alert severity={alertType} sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Current Password */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Current Password"
                    name="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    fullWidth
                    value={form.currentPassword}
                    onChange={handleChange}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {/* <IconButton onClick={() => togglePasswordVisibility("current")}>
                            {showPassword.current ? <VisibilityOff /> : <Visibility />}
                          </IconButton> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* New Password */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="New Password"
                    name="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    fullWidth
                    value={form.newPassword}
                    onChange={handleChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {/* <IconButton onClick={() => togglePasswordVisibility("new")}>
                            {showPassword.new ? <VisibilityOff /> : <Visibility />}
                          </IconButton> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    fullWidth
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {/* <IconButton onClick={() => togglePasswordVisibility("confirm")}>
                            {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Save Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    px: 5,
                    py: 1.3,
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;