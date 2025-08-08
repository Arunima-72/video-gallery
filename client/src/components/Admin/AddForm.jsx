
import React, { useState, useEffect } from "react"; // updated as per 07/08/2025
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../axiosInterceptor";

const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const MAX_FILE_SIZE_MB = 5;
  const VALID_IMAGE_TYPES = ["image/jpeg", "image/png"];

  // Fetch categories for sub-category form
  useEffect(() => {
    if (type === "sub-category") {
      axiosInstance
        .get("http://localhost:3000/admin/category", { headers })
        .then((res) => setCategoryOptions(res.data || []))
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [type]);

  // Fetch item in edit mode
  useEffect(() => {
    if (mode === "edit" && itemId) {
      axiosInstance
        .get(`http://localhost:3000/admin/${type}/${itemId}`, { headers })
        .then((res) => {
          const data = res.data;
          setName(data.name);
          setCurrentImage(`http://localhost:3000/uploads/${data.image}`);
          if (type === "sub-category") {
            setCategoryId(data.category);
          }
        })
        .catch((err) => console.error("Error fetching item:", err));
    }
  }, [mode, itemId, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    if (type === "sub-category") formData.append("category", categoryId);

    const apiUrl =
      mode === "add"
        ? `http://localhost:3000/admin/${type}`
        : `http://localhost:3000/admin/edit/${type}/${itemId}`;

    try {
      const method = mode === "add" ? axiosInstance.post : axiosInstance.put;
      await method(apiUrl, formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });

      setSnack({
        open: true,
        message: `${type} ${mode === "add" ? "added" : "updated"} successfully`,
        severity: "success",
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      setSnack({
        open: true,
        message: `Failed to ${mode} ${type}`,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4} px={2}>
      <Paper
        elevation={3}
        sx={{
          width: { xs: "100%", sm: "100%", md: 500 },
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          align="center"
          mb={2}
          fontFamily="Poppins"
        >
          {mode === "add" ? `Add ${type}` : `Edit ${type}`}
        </Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label={`Enter ${type} Name`}
            fullWidth
            size="small"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {type === "sub-category" && (
            <FormControl fullWidth margin="normal" size="small" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId}
                label="Category"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {mode === "edit" && currentImage && (
            <Box textAlign="center" mt={2}>
              <Typography variant="subtitle2">Current Image:</Typography>
              <Box
                component="img"
                src={currentImage}
                alt="Current"
                sx={{
                  width: "100%",
                  maxHeight: 150,
                  borderRadius: 2,
                  mt: 1,
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          <Box mt={3} mb={2}>
            <Typography variant="subtitle2" mb={1} fontFamily="Poppins">
              Upload Image
            </Typography>
            <Box
              onClick={() =>
                document.getElementById(`${type}ImageUpload`).click()
              }
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                height: 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "#fafafa",
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: "#f0f8ff",
                },
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
                alt="Upload"
                style={{ width: 28, marginBottom: 6, opacity: 0.6 }}
              />
              <Typography variant="body2" fontFamily="Poppins">
                Browse files
              </Typography>
              <input
                type="file"
                id={`${type}ImageUpload`}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  if (!VALID_IMAGE_TYPES.includes(file.type)) {
                    setSnack({
                      open: true,
                      message: "Only JPG and PNG image files are allowed.",
                      severity: "error",
                    });
                    return;
                  }

                  const fileSizeMB = file.size / (1024 * 1024);
                  if (fileSizeMB > MAX_FILE_SIZE_MB) {
                    setSnack({
                      open: true,
                      message: "Image must be less than 5MB.",
                      severity: "error",
                    });
                    return;
                  }

                  setImage(file);
                }}
              />
            </Box>
            {image && (
              <Typography variant="body2" mt={1}>
                Selected: <strong>{image.name}</strong>
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} />
            ) : mode === "add" ? (
              "Add"
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddForm;

