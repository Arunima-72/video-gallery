

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  IconButton,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CommonNav from "../CommonNav";
import Sidebar from "../Sidebar";
import axiosInstance from "../axiosInterceptor";
import { useParams, useNavigate } from "react-router-dom";
import './VideoPlayer.css';
const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const appBarHeight = 64;

const VideoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const videoInputRef = useRef();
  const pdfInputRef = useRef();
  const thumbnailInputRef = useRef();

  const [stacks, setStacks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedStack, setSelectedStack] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [prefillCategory, setPrefillCategory] = useState("");
  const [prefillSubCategory, setPrefillSubCategory] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [message, setMessage] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  
//   const MAX_VIDEO_SIZE_MB = 100;
// const MAX_PDF_SIZE_MB = 10;
// const MAX_IMAGE_SIZE_MB = 5;

// const validateFile = (file, type, maxSizeMB) => {
//   if (!file) return "";
//   const isValidType = file.type.startsWith(type);
//   const isValidSize = file.size <= maxSizeMB * 1024 * 1024;
//   if (!isValidType) return `Invalid file type. Expected ${type}/*.`;
//   if (!isValidSize) return `File too large. Max ${maxSizeMB}MB allowed.`;
//   return "";
// };
const MAX_VIDEO_SIZE_MB = 1024; // 1 GB
const MAX_PDF_SIZE_MB = 10;
const MAX_IMAGE_SIZE_MB = 5;

const validateFile = (file, allowedTypes, maxSizeMB) => {
  if (!file) return "";
  const isValidType = allowedTypes.includes(file.type);
  const isValidSize = file.size <= maxSizeMB * 1024 * 1024;
  if (!isValidType) return `Invalid file type. Allowed: ${allowedTypes.join(", ")}`;
  if (!isValidSize) return `File too large. Max ${maxSizeMB}MB allowed.`;
  return "";
};

const [errors, setErrors] = useState({});
const validateForm = () => {
  const newErrors = {};
  if (!selectedStack) newErrors.stack = "Stack is required";
  if (!selectedCategory) newErrors.category = "Category is required";
  if (!selectedSubCategory) newErrors.subCategory = "SubCategory is required";
  if (!title.trim()) newErrors.title = "Title is required";
  if (!description.trim()) newErrors.description = "Description is required";

  // Validate video file (only MP4 and max 1 GB)
  const videoErr = validateFile(videoFile, ["video/mp4"], MAX_VIDEO_SIZE_MB);
  if (videoErr) newErrors.videoFile = videoErr;

  // Validate PDF
  const pdfErr = validateFile(pdfFile, ["application/pdf"], MAX_PDF_SIZE_MB);
  if (pdfErr) newErrors.pdfFile = pdfErr;

  // Validate image (JPG or PNG)
  const thumbErr = validateFile(thumbnail, ["image/jpeg", "image/png"], MAX_IMAGE_SIZE_MB);
  if (thumbErr) newErrors.thumbnail = thumbErr;

  // At least one video source
  if (!videoURL.trim() && !videoFile) {
    newErrors.videoSource = "Either Video URL or Upload is required.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!selectedStack) newErrors.stack = "Stack is required";
  //   if (!selectedCategory) newErrors.category = "Category is required";
  //   if (!selectedSubCategory) newErrors.subCategory = "SubCategory is required";
  //   if (!title.trim()) newErrors.title = "Title is required";
  //   if (!description.trim()) newErrors.description = "Description is required";

  //   const videoErr = validateFile(videoFile, "video", MAX_VIDEO_SIZE_MB);
  //   if (videoErr) newErrors.videoFile = videoErr;

  //   const pdfErr = validateFile(pdfFile, "application", MAX_PDF_SIZE_MB);
  //   if (pdfErr) newErrors.pdfFile = pdfErr;

  //   const thumbErr = validateFile(thumbnail, "image", MAX_IMAGE_SIZE_MB);
  //   if (thumbErr) newErrors.thumbnail = thumbErr;

  //   if (!videoURL.trim() && !videoFile) {
  //     newErrors.videoSource = "Either Video URL or Upload is required.";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  // Fetch stacks
  useEffect(() => {
    axiosInstance
      .get("http://localhost:3000/admin/stacks")
      .then((res) => setStacks(res.data))
      .catch((err) => console.error("Error fetching stacks:", err));
  }, []);

  // Fetch categories based on stack
  // useEffect(() => {
  //   if (selectedStack) {
  //     axiosInstance
  //       .get(`http://localhost:3000/admin/categories?stackId=${selectedStack}`)
  //       .then((res) => setCategories(res.data))
  //       .catch((err) => console.error("Error fetching categories:", err));
  //   } else {
  //     setCategories([]);
  //   }
  //   setSelectedCategory("");
  //   setSelectedSubCategory("");
  // }, [selectedStack]);
useEffect(() => {
  axiosInstance
    .get("http://localhost:3000/admin/categories")
    .then((res) => setCategories(res.data))
    .catch((err) => console.error("Error fetching categories:", err));
}, []);

  // Fetch subcategories based on category
  // useEffect(() => {
  //   if (selectedCategory) {
  //     axiosInstance
  //       .get(`http://localhost:3000/admin/sub-categories?categoryId=${selectedCategory}`)
  //       .then((res) => setSubCategories(res.data))
  //       .catch((err) => console.error("Error fetching subcategories:", err));
  //   } else {
  //     setSubCategories([]);
  //   }
  //   setSelectedSubCategory("");
  // }, [selectedCategory]);
useEffect(() => {
  if (selectedCategory) {
    axiosInstance
      .get(`http://localhost:3000/admin/sub-categories?categoryId=${selectedCategory}`)
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.error("Error fetching subcategories:", err));
  } else {
    setSubCategories([]);
  }
  setSelectedSubCategory("");
}, [selectedCategory]);

  // Fetch video details if editing
  useEffect(() => {
    if (isEditMode) {
      axiosInstance
        .get(`http://localhost:3000/admin/video/${id}`)
        .then((res) => {
          const v = res.data;
          setTitle(v.title);
          setDescription(v.description);
          setVideoURL(v.videoUrl );
          setSelectedStack(v.stack?._id || v.stack);
          setPrefillCategory(v.category?._id || v.category);
          setPrefillSubCategory(v.subCategory?._id || v.subCategory);
        })
        .catch((err) => console.error("Error fetching video:", err));
    }
  }, [id]);

  // Set selectedCategory after categories load
  useEffect(() => {
    if (prefillCategory && categories.length > 0) {
      setSelectedCategory(prefillCategory);
    }
  }, [prefillCategory, categories]);

  // Set selectedSubCategory after subcategories load
  useEffect(() => {
    if (prefillSubCategory && subCategories.length > 0) {
      setSelectedSubCategory(prefillSubCategory);
    }
  }, [prefillSubCategory, subCategories]);

  // Handle upload or update
  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("stack", selectedStack);
  //   formData.append("category", selectedCategory);
  //   formData.append("subCategory", selectedSubCategory);
  //   formData.append("videoUrl", videoURL);

  //   if (videoFile) formData.append("file", videoFile);
  //   if (pdfFile) formData.append("overviewPdf", pdfFile);
  //   if (thumbnail) formData.append("image", thumbnail);

  //   try {
  //     let res;
  //     if (isEditMode) {
  //       res = await axiosInstance.put(`http://localhost:3000/admin/video/${id}`, formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });
  //     } else {
  //       res = await axiosInstance.post("http://localhost:3000/admin/video", formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });
  //     }

  //     setMessage(res.data.message || "Video uploaded successfully");
  //     setTimeout(() => navigate("/admin/videos"), 1000);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage(error.response?.data?.error || "Operation failed.");
  //   }
  // };
const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("stack", selectedStack);
    formData.append("category", selectedCategory);
    formData.append("subCategory", selectedSubCategory);
    formData.append("videoUrl", videoURL);

    if (videoFile) formData.append("file", videoFile);
    if (pdfFile) formData.append("overviewPdf", pdfFile);
    if (thumbnail) formData.append("image", thumbnail);

    try {
      let res;
      if (isEditMode) {
        res = await axiosInstance.put(`http://localhost:3000/admin/video/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axiosInstance.post("http://localhost:3000/admin/video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setMessage(res.data.message || "Video uploaded successfully");
      setTimeout(() => navigate("/admin/videos"), 1000);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Operation failed.");
    }
  };
    return (
    <Box sx={{ display: "flex", marginTop: "64px" }}>
      <CommonNav onToggleSidebar={onToggleSidebar} />
      <Sidebar open={isSidebarOpen} userType="admin" />
   <Box component="main" className="video-form-main">
  <Card className="video-form-card" elevation={3}>
    <CardContent>
      <Typography variant="h6" gutterBottom className="form-title" sx={{
    fontWeight: 500,
    fontSize: '1.8rem',
    color: '#2a82d4ff',
    fontFamily: 'Poppins',
    // textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    letterSpacing: '0.5px',
    mb: 3,
  }}>
        {isEditMode ? "Edit Video" : "Upload New Video"}
      </Typography>

      {/* Two-column grid */}
      <Box className="form-two-columns">
        <TextField
        style={{fontFamily: 'Poppins'}}
          select
          label="Select Stack"
          value={selectedStack}
          onChange={(e) => setSelectedStack(e.target.value)}
          error={!!errors.stack}
          helperText={errors.stack}
          className="form-field"
        >
          {stacks.map((stack) => (
            <MenuItem key={stack._id} value={stack._id} style={{ fontFamily: 'Poppins' }}>
              {stack.name}
            </MenuItem>
          ))}
        </TextField>
<TextField
  select
  label="Select Category"
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  error={!!errors.category}
  helperText={errors.category}
  className="form-field"
>
  {categories.map((cat) => (
    <MenuItem key={cat._id} value={cat._id} style={{ fontFamily: 'Poppins' }}>
      {cat.name}
    </MenuItem>
  ))}
</TextField>
        {/* <TextField
          select
          label="Select Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={!selectedStack}
          error={!!errors.category}
          helperText={errors.category}
          className="form-field"
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id} style={{ fontFamily: 'Poppins' }}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField> */}

        <TextField
          select
          label="Select SubCategory"
          font-famiyy='Poppins'
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          disabled={!selectedCategory}
          error={!!errors.subCategory}
          helperText={errors.subCategory}
          className="form-field"
        >
          {subCategories.map((sub) => (
            <MenuItem key={sub._id} value={sub._id} style={{ fontFamily: 'Poppins' }}>
              {sub.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          className="form-field"
        />

        <TextField
          label="Video URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          error={!!errors.videoSource}
          helperText={errors.videoSource}
          className="form-field"
          style={{ fontFamily: 'Poppins' }}
        />

        <TextField
          multiline
          rows={3}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          className="form-field full-width"
        />
      </Box>

      {/* Upload sections in two-column layout */}
      <Box className="upload-grid" >
        <Box className="upload-box" onClick={() => videoInputRef.current.click()}>
          <Stack spacing={1} alignItems="center">
            <IconButton><CloudUploadIcon className="upload-icon" /></IconButton>
            <Typography style={{fontFamily:'Poppins'}}>{videoFile ? videoFile.name : "Browse Video"}</Typography>
            <Typography fontSize="14px" color="text.secondary" style={{fontFamily:'Poppins'}}> Drag and drop here</Typography>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </Stack>
        </Box>
        {errors.videoFile && <Typography color="error" className="form-error" style={{fontFamily:'Poppins'}}>{errors.videoFile}</Typography>}

        <Box className="upload-box" onClick={() => pdfInputRef.current.click()}>
          <Stack spacing={1} alignItems="center">
            <IconButton><CloudUploadIcon className="upload-icon" /></IconButton>
            <Typography style={{fontFamily:'Poppins'}}>{pdfFile ? pdfFile.name : "Upload Document"}</Typography>
            <Typography fontSize="14px" color="text.secondary" style={{fontFamily:'Poppins'}}>Drag and drop here</Typography>
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </Stack>
        </Box>
        {errors.pdfFile && <Typography color="error" className="form-error" style={{fontFamily:'Poppins'}}>{errors.pdfFile}</Typography>}

        <Box className="upload-box" onClick={() => thumbnailInputRef.current.click()}>
          <Stack spacing={1} alignItems="center">
            <IconButton><CloudUploadIcon className="upload-icon" /></IconButton>
            <Typography style={{fontFamily:'Poppins'}}>{thumbnail ? thumbnail.name : "Upload Thumbnail"}</Typography>
            <Typography fontSize="14px" color="text.secondary" style={{fontFamily:'Poppins'}}>Drag and drop here</Typography>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </Stack>
        </Box>
        {errors.thumbnail && <Typography color="error" className="form-error" style={{fontFamily:'Poppins'}}>{errors.thumbnail}</Typography>}
      </Box>

      <Button variant="contained" onClick={handleSubmit} className="form-submit-btn" style={{fontFamily:'Poppins'}}>
        {isEditMode ? "Update Video" : "Submit"}
      </Button>

      {message && <Alert severity="info" className="form-alert" style={{fontFamily:'Poppins'}}>{message}</Alert>}
    </CardContent>
  </Card>
</Box>


    </Box>
  );
};

export default VideoForm;