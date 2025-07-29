

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Paper
// } from "@mui/material";
// import axiosInstance from "../axiosInterceptor";

// export default function UploadVideoForm() {
//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [selectedStack, setSelectedStack] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);

//   // ✅ Fetch stacks on load
//   useEffect(() => {
//     axiosInstance.get("http://localhost:3000/admin/stack")
//       .then(res => setStacks(res.data))
//       .catch(err => console.error("Error fetching stacks:", err));
//   }, []);

//   // ✅ Fetch categories when stack changes
//   useEffect(() => {
//     if (selectedStack) {
//       axiosInstance.get(`http://localhost:3000/admin/category?stackId=${selectedStack}`)
//         .then(res => setCategories(res.data))
//         .catch(err => console.error("Error fetching categories:", err));
//     } else {
//       setCategories([]);
//     }
//     setSelectedCategory("");
//     setSelectedSubCategory("");
//   }, [selectedStack]);

//   // ✅ Fetch subcategories when category changes
//   useEffect(() => {
//     if (selectedCategory) {
//       axiosInstance.get(`http://localhost:3000/admin/sub-category?categoryId=${selectedCategory}`)
//         .then(res => setSubCategories(res.data))
//         .catch(err => console.error("Error fetching subcategories:", err));
//     } else {
//       setSubCategories([]);
//     }
//     setSelectedSubCategory("");
//   }, [selectedCategory]);

//   // ✅ Submit video
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("stack", selectedStack);
//     formData.append("category", selectedCategory);
//     formData.append("subCategory", selectedSubCategory);
//     formData.append("file", videoFile);

//     try {
//       await axiosInstance.post("http://localhost:3000/admin/videos", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Video uploaded successfully");
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Error uploading video");
//     }
//   };

//   return (
//     <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
//       <Typography variant="h5" gutterBottom>
//         Upload New Video
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit}>
//         <TextField
//           select
//           fullWidth
//           label="Select Stack"
//           value={selectedStack}
//           onChange={(e) => setSelectedStack(e.target.value)}
//           sx={{ mb: 2 }}
//         >
//           {stacks.map((stack) => (
//             <MenuItem key={stack._id} value={stack._id}>
//               {stack.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           select
//           fullWidth
//           label="Select Category"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           sx={{ mb: 2 }}
//           disabled={!selectedStack}
//         >
//           {categories.map((cat) => (
//             <MenuItem key={cat._id} value={cat._id}>
//               {cat.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           select
//           fullWidth
//           label="Select Subcategory"
//           value={selectedSubCategory}
//           onChange={(e) => setSelectedSubCategory(e.target.value)}
//           sx={{ mb: 2 }}
//           disabled={!selectedCategory}
//         >
//           {subCategories.map((sub) => (
//             <MenuItem key={sub._id} value={sub._id}>
//               {sub.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           fullWidth
//           label="Project Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         <Button
//           variant="outlined"
//           component="label"
//           fullWidth
//           sx={{ mb: 2 }}
//         >
//           Upload Video
//           <input
//             type="file"
//             accept="video/*"
//             hidden
//             onChange={(e) => setVideoFile(e.target.files[0])}
//           />
//         </Button>

//         <TextField
//           fullWidth
//           label="Description"
//           value={description}
//           multiline
//           rows={3}
//           onChange={(e) => setDescription(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{ backgroundColor: "#3f51b5" }}
//         >
//           Submit
//         </Button>
//       </Box>
//     </Paper>
//   );
// }



// import React, { useEffect, useState } from "react";              // on ethat worked for stack cat sub
// import { TextField, MenuItem, Paper, Typography, Box } from "@mui/material";
// import axiosInstance from "../axiosInterceptor";

// export default function CategorySelector() {
//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [selectedStack, setSelectedStack] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   // Fetch stacks
//   useEffect(() => {
//     axiosInstance.get("http://localhost:3000/admin/stacks")
//       .then(res => setStacks(res.data))
//       .catch(err => console.error("Error fetching stacks:", err));
//   }, []);

//   // Fetch categories for selected stack
//   useEffect(() => {
//     if (selectedStack) {
//       axiosInstance.get(`http://localhost:3000/admin/categories?stackId=${selectedStack}`)
//         .then(res => setCategories(res.data))
//         .catch(err => console.error("Error fetching categories:", err));
//     } else {
//       setCategories([]);
//     }
//     setSelectedCategory("");
//     setSelectedSubCategory("");
//   }, [selectedStack]);

//   // Fetch subcategories for selected category
//   useEffect(() => {
//     if (selectedCategory) {
//       axiosInstance.get(`http://localhost:3000/admin/sub-categories?categoryId=${selectedCategory}`)
//         .then(res => setSubCategories(res.data))
//         .catch(err => console.error("Error fetching subcategories:", err));
//     } else {
//       setSubCategories([]);
//     }
//     setSelectedSubCategory("");
//   }, [selectedCategory]);

//   return (
//     <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
//       <Typography variant="h5" gutterBottom>
//         Select Category
//       </Typography>
//       <Box>
//         {/* Stack Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select Stack"
//           value={selectedStack}
//           onChange={(e) => setSelectedStack(e.target.value)}
//           sx={{ mb: 2 }}
//         >
//           {stacks.map((stack) => (
//             <MenuItem key={stack._id} value={stack._id}>
//               {stack.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Category Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select Category"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           sx={{ mb: 2 }}
//           disabled={!selectedStack}
//         >
//           {categories.map((cat) => (
//             <MenuItem key={cat._id} value={cat._id}>
//               {cat.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* SubCategory Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select SubCategory"
//           value={selectedSubCategory}
//           onChange={(e) => setSelectedSubCategory(e.target.value)}
//           sx={{ mb: 2 }}
//           disabled={!selectedCategory}
//         >
//           {subCategories.map((sub) => (
//             <MenuItem key={sub._id} value={sub._id}>
//               {sub.name}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Box>
//     </Paper>
//   );
// }



// import React, { useState, useEffect, useRef } from "react";                 // successfull upload video
// import {
//   Box,
//   Typography,
//   Button,
//   MenuItem,
//   Paper,
//   Stack,
//   TextField,
//   IconButton,
//   Alert,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CommonNav from "../CommonNav";
// import Sidebar from "../Sidebar";
// import axiosInstance from "../axiosInterceptor";

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const VideoForm = () => {
//   const videoInputRef = useRef();
//   const pdfInputRef = useRef();
//   const thumbnailInputRef = useRef();

//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [selectedStack, setSelectedStack] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [videoURL, setVideoURL] = useState("");
//   const [message, setMessage] = useState("");

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   // Fetch stacks
//   useEffect(() => {
//     axiosInstance
//       .get("http://localhost:3000/admin/stacks")
//       .then((res) => setStacks(res.data))
//       .catch((err) => console.error("Error fetching stacks:", err));
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     if (selectedStack) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/categories?stackId=${selectedStack}`)
//         .then((res) => setCategories(res.data))
//         .catch((err) => console.error("Error fetching categories:", err));
//     } else setCategories([]);
//     setSelectedCategory("");
//     setSelectedSubCategory("");
//   }, [selectedStack]);

//   // Fetch subcategories
//   useEffect(() => {
//     if (selectedCategory) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/sub-categories?categoryId=${selectedCategory}`)
//         .then((res) => setSubCategories(res.data))
//         .catch((err) => console.error("Error fetching subcategories:", err));
//     } else setSubCategories([]);
//     setSelectedSubCategory("");
//   }, [selectedCategory]);

//   const handleUpload = async () => {
//     if (!videoFile) {
//       setMessage("Please select a video file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("stack", selectedStack);
//     formData.append("category", selectedCategory);
//     formData.append("subCategory", selectedSubCategory);
//     formData.append("file", videoFile);
//     formData.append("overviewPdf", pdfFile);
//     formData.append("image", thumbnail);
//     formData.append("videoUrl", videoURL);

//     try {
//       const res = await axiosInstance.post("http://localhost:3000/admin/video", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage(res.data.message || "Video uploaded successfully");
//       setVideoFile(null);
//       setPdfFile(null);
//       setThumbnail(null);
//     } catch (error) {
//       console.error(error);
//       setMessage(error.response?.data?.error || "Upload failed.");
//     }
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CommonNav onToggleSidebar={onToggleSidebar} />
//       <Sidebar open={isSidebarOpen} userType="admin" />

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           pt: `${appBarHeight + 24}px`,
//           pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
//           pr: 4,
//           pb: 4,
//           backgroundColor: "#f7f9fa",
//           minHeight: "100vh",
//           transition: "padding 0.3s ease",
//         }}
//       >
//         <Typography variant="h5" gutterBottom sx={{ fontFamily: "-moz-initial", color: "black" }}>
//           Upload New Video
//         </Typography>

//         {/* Stack Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select Stack"
//           value={selectedStack}
//           onChange={(e) => setSelectedStack(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//         >
//           {stacks.map((stack) => (
//             <MenuItem key={stack._id} value={stack._id}>
//               {stack.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Category Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select Category"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//           disabled={!selectedStack}
//         >
//           {categories.map((cat) => (
//             <MenuItem key={cat._id} value={cat._id}>
//               {cat.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* SubCategory Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select SubCategory"
//           value={selectedSubCategory}
//           onChange={(e) => setSelectedSubCategory(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//           disabled={!selectedCategory}
//         >
//           {subCategories.map((sub) => (
//             <MenuItem key={sub._id} value={sub._id}>
//               {sub.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Title */}
//         <TextField
//           fullWidth
//           label="Project Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//         />

//         {/* Video Upload */}
//         <Box
//           sx={{
//             border: "2px dashed #ccc",
//             borderRadius: "12px",
//             p: 3,
//             mb: 2,
//             maxWidth: 400,
//             backgroundColor: "#fff",
//             textAlign: "center",
//             cursor: "pointer",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//           }}
//           onClick={() => videoInputRef.current.click()}
//         >
//           <Stack spacing={1} alignItems="center">
//             <IconButton>
//               <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
//             </IconButton>
//             <Typography>{videoFile ? videoFile.name : "Browse Video"}</Typography>
//             <input
//               ref={videoInputRef}
//               type="file"
//               accept="video/*"
//               style={{ display: "none" }}
//               onChange={(e) => setVideoFile(e.target.files[0])}
//             />
//           </Stack>
//         </Box>

//         {/* PDF Upload */}
//         <Box
//           sx={{
//             border: "2px dashed #ccc",
//             borderRadius: "12px",
//             p: 3,
//             mb: 2,
//             maxWidth: 400,
//             backgroundColor: "#fff",
//             textAlign: "center",
//             cursor: "pointer",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//           }}
//           onClick={() => pdfInputRef.current.click()}
//         >
//           <Stack spacing={1} alignItems="center">
//             <IconButton>
//               <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
//             </IconButton>
//             <Typography>{pdfFile ? pdfFile.name : "Upload PDF"}</Typography>
//             <input
//               ref={pdfInputRef}
//               type="file"
//               accept="application/pdf"
//               style={{ display: "none" }}
//               onChange={(e) => setPdfFile(e.target.files[0])}
//             />
//           </Stack>
//         </Box>

//         {/* Thumbnail Upload */}
//         <Box
//           sx={{
//             border: "2px dashed #ccc",
//             borderRadius: "12px",
//             p: 3,
//             mb: 2,
//             maxWidth: 400,
//             backgroundColor: "#fff",
//             textAlign: "center",
//             cursor: "pointer",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//           }}
//           onClick={() => thumbnailInputRef.current.click()}
//         >
//           <Stack spacing={1} alignItems="center">
//             <IconButton>
//               <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
//             </IconButton>
//             <Typography>{thumbnail ? thumbnail.name : "Upload Thumbnail"}</Typography>
//             <input
//               ref={thumbnailInputRef}
//               type="file"
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={(e) => setThumbnail(e.target.files[0])}
//             />
//           </Stack>
//         </Box>

//         {/* Video URL */}
//         <TextField
//           fullWidth
//           label="Video URL"
//           value={videoURL}
//           onChange={(e) => setVideoURL(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//         />

//         {/* Description */}
//         <TextField
//           fullWidth
//           label="Description"
//           value={description}
//           multiline
//           rows={3}
//           onChange={(e) => setDescription(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleUpload}
//           sx={{ mb: 3, borderRadius: "24px", px: 4 }}
//         >
//           Submit
//         </Button>

//         {message && (
//           <Alert severity="info" sx={{ mt: 2, maxWidth: 600 }}>
//             {message}
//           </Alert>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default VideoForm;


// import React, { useState, useEffect, useRef } from "react";              // working exept url,sub cat
// import {
//   Box, Typography, Button, MenuItem, Stack, TextField, IconButton, Alert
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CommonNav from "../CommonNav";
// import Sidebar from "../Sidebar";
// import axiosInstance from "../axiosInterceptor";
// import { useParams, useNavigate } from "react-router-dom";

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const VideoForm = () => {
//   const { id } = useParams(); // detect edit mode
//   const navigate = useNavigate();

//   const videoInputRef = useRef();
//   const pdfInputRef = useRef();
//   const thumbnailInputRef = useRef();

//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [selectedStack, setSelectedStack] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [videoURL, setVideoURL] = useState("");
//   const [message, setMessage] = useState("");

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const isEditMode = Boolean(id);

//   // Fetch stacks
//   useEffect(() => {
//     axiosInstance
//       .get("http://localhost:3000/admin/stacks")
//       .then((res) => setStacks(res.data))
//       .catch((err) => console.error("Error fetching stacks:", err));
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     if (selectedStack) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/categories?stackId=${selectedStack}`)
//         .then((res) => setCategories(res.data))
//         .catch((err) => console.error("Error fetching categories:", err));
//     } else setCategories([]);
//     setSelectedCategory("");
//     setSelectedSubCategory("");
//   }, [selectedStack]);

//   // Fetch subcategories
//   useEffect(() => {
//     if (selectedCategory) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/sub-categories?categoryId=${selectedCategory}`)
//         .then((res) => setSubCategories(res.data))
//         .catch((err) => console.error("Error fetching subcategories:", err));
//     } else setSubCategories([]);
//     setSelectedSubCategory("");
//   }, [selectedCategory]);

//   // Prefill for edit
//   useEffect(() => {
//     if (isEditMode) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/video/${id}`)
//         .then((res) => {
//           const v = res.data;
//           setTitle(v.title);
//           setDescription(v.description);
//           setSelectedStack(v.stack);
//           setSelectedCategory(v.category);
//           setSelectedSubCategory(v.subCategory);
//           setVideoURL(v.videoUrl || "");
//         })
//         .catch((err) => console.error("Error fetching video:", err));
//     }
//   }, [id]);

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("stack", selectedStack);
//     formData.append("category", selectedCategory);
//     formData.append("subCategory", selectedSubCategory);
//     if (videoFile) formData.append("file", videoFile);
//     if (pdfFile) formData.append("overviewPdf", pdfFile);
//     if (thumbnail) formData.append("image", thumbnail);
//     formData.append("videoUrl", videoURL);

//     try {
//       let res;
//       if (isEditMode) {
//         res = await axiosInstance.put(`http://localhost:3000/admin/video/${id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         res = await axiosInstance.post("http://localhost:3000/admin/video", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       setMessage(res.data.message);
//       setTimeout(() => navigate("/admin/videos"), 1000);
//     } catch (error) {
//       console.error("Upload error:", error);
//       setMessage(error.response?.data?.error || "Upload failed.");
//     }
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CommonNav onToggleSidebar={onToggleSidebar} />
//       <Sidebar open={isSidebarOpen} userType="admin" />

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           pt: `${appBarHeight + 24}px`,
//           pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
//           pr: 4,
//           pb: 4,
//           backgroundColor: "#f7f9fa",
//           minHeight: "100vh",
//           transition: "padding 0.3s ease",
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           {isEditMode ? "Edit Video" : "Upload New Video"}
//         </Typography>

//         {/* Stack Dropdown */}
//         <TextField select fullWidth label="Select Stack" value={selectedStack}
//           onChange={(e) => setSelectedStack(e.target.value)} sx={{ mb: 2, maxWidth: 400 }}>
//           {stacks.map((stack) => (
//             <MenuItem key={stack._id} value={stack._id}>{stack.name}</MenuItem>
//           ))}
//         </TextField>

//         {/* Category Dropdown */}
//         <TextField select fullWidth label="Select Category" value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)} sx={{ mb: 2, maxWidth: 400 }}
//           disabled={!selectedStack}>
//           {categories.map((cat) => (
//             <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
//           ))}
//         </TextField>

//         {/* SubCategory Dropdown */}
//         <TextField select fullWidth label="Select SubCategory" value={selectedSubCategory}
//           onChange={(e) => setSelectedSubCategory(e.target.value)} sx={{ mb: 2, maxWidth: 400 }}
//           disabled={!selectedCategory}>
//           {subCategories.map((sub) => (
//             <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>
//           ))}
//         </TextField>

//         {/* Title */}
//         <TextField fullWidth label="Project Title" value={title}
//           onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2, maxWidth: 400 }} />

//         {/* Video Upload */}
//         <Box sx={{ border: "2px dashed #ccc", borderRadius: "12px", p: 3, mb: 2, maxWidth: 400 }}
//           onClick={() => videoInputRef.current.click()}>
//           <Stack spacing={1} alignItems="center">
//             <IconButton><CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} /></IconButton>
//             <Typography>{videoFile ? videoFile.name : "Browse Video"}</Typography>
//             <input ref={videoInputRef} type="file" accept="video/*" style={{ display: "none" }}
//               onChange={(e) => setVideoFile(e.target.files[0])} />
//           </Stack>
//         </Box>

//         {/* PDF Upload */}
//         <Box sx={{ border: "2px dashed #ccc", borderRadius: "12px", p: 3, mb: 2, maxWidth: 400 }}
//           onClick={() => pdfInputRef.current.click()}>
//           <Stack spacing={1} alignItems="center">
//             <IconButton><CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} /></IconButton>
//             <Typography>{pdfFile ? pdfFile.name : "Upload PDF"}</Typography>
//             <input ref={pdfInputRef} type="file" accept="application/pdf" style={{ display: "none" }}
//               onChange={(e) => setPdfFile(e.target.files[0])} />
//           </Stack>
//         </Box>

//         {/* Thumbnail Upload */}
//         <Box sx={{ border: "2px dashed #ccc", borderRadius: "12px", p: 3, mb: 2, maxWidth: 400 }}
//           onClick={() => thumbnailInputRef.current.click()}>
//           <Stack spacing={1} alignItems="center">
//             <IconButton><CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} /></IconButton>
//             <Typography>{thumbnail ? thumbnail.name : "Upload Thumbnail"}</Typography>
//             <input ref={thumbnailInputRef} type="file" accept="image/*" style={{ display: "none" }}
//               onChange={(e) => setThumbnail(e.target.files[0])} />
//           </Stack>
//         </Box>

//         {/* Video URL */}
//         <TextField fullWidth label="Video URL" value={videoURL}
//           onChange={(e) => setVideoURL(e.target.value)} sx={{ mb: 2, maxWidth: 400 }} />

//         {/* Description */}
//         <TextField fullWidth label="Description" value={description} multiline rows={3}
//           onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2, maxWidth: 400 }} />

//         <Button variant="contained" color="primary" onClick={handleSubmit}
//           sx={{ mb: 3, borderRadius: "24px", px: 4 }}>
//           {isEditMode ? "Update" : "Submit"}
//         </Button>

//         {message && (
//           <Alert severity="info" sx={{ mt: 2, maxWidth: 600 }}>
//             {message}
//           </Alert>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default VideoForm;

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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CommonNav from "../CommonNav";
import Sidebar from "../Sidebar";
import axiosInstance from "../axiosInterceptor";
import { useParams, useNavigate } from "react-router-dom";

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

  // Fetch stacks
  useEffect(() => {
    axiosInstance
      .get("http://localhost:3000/admin/stacks")
      .then((res) => setStacks(res.data))
      .catch((err) => console.error("Error fetching stacks:", err));
  }, []);

  // Fetch categories based on stack
  useEffect(() => {
    if (selectedStack) {
      axiosInstance
        .get(`http://localhost:3000/admin/categories?stackId=${selectedStack}`)
        .then((res) => setCategories(res.data))
        .catch((err) => console.error("Error fetching categories:", err));
    } else {
      setCategories([]);
    }
    setSelectedCategory("");
    setSelectedSubCategory("");
  }, [selectedStack]);

  // Fetch subcategories based on category
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
  const handleSubmit = async () => {
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

      setMessage(res.data.message || "Operation successful");
      setTimeout(() => navigate("/admin/videos"), 1000);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Operation failed.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CommonNav onToggleSidebar={onToggleSidebar} />
      <Sidebar open={isSidebarOpen} userType="admin" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: `${appBarHeight + 24}px`,
          pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
          pr: 4,
          pb: 4,
          backgroundColor: "#f7f9fa",
          minHeight: "100vh",
          transition: "padding 0.3s ease",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isEditMode ? "Edit Video" : "Upload New Video"}
        </Typography>

        {/* Stack Dropdown */}
        <TextField
          select
          fullWidth
          label="Select Stack"
          value={selectedStack}
          onChange={(e) => setSelectedStack(e.target.value)}
          sx={{ mb: 2, maxWidth: 400 }}
        >
          {stacks.map((stack) => (
            <MenuItem key={stack._id} value={stack._id}>
              {stack.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Category Dropdown */}
        <TextField
          select
          fullWidth
          label="Select Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ mb: 2, maxWidth: 400 }}
          disabled={!selectedStack}
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        {/* SubCategory Dropdown */}
        <TextField
          select
          fullWidth
          label="Select SubCategory"
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          sx={{ mb: 2, maxWidth: 400 }}
          disabled={!selectedCategory}
        >
          {subCategories.map((sub) => (
            <MenuItem key={sub._id} value={sub._id}>
              {sub.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Title */}
        <TextField
          fullWidth
          label="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2, maxWidth: 400 }}
        />

        {/* Video URL */}
        <TextField
          fullWidth
          label="Video URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          sx={{ mb: 2, maxWidth: 400 }}
        />

        {/* Video Upload */}
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: "12px",
            p: 3,
            mb: 2,
            maxWidth: 400,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
          onClick={() => videoInputRef.current.click()}
        >
          <Stack spacing={1} alignItems="center">
            <IconButton>
              <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
            </IconButton>
            <Typography>{videoFile ? videoFile.name : "Browse Video"}</Typography>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </Stack>
        </Box>

        {/* PDF Upload */}
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: "12px",
            p: 3,
            mb: 2,
            maxWidth: 400,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
          onClick={() => pdfInputRef.current.click()}
        >
          <Stack spacing={1} alignItems="center">
            <IconButton>
              <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
            </IconButton>
            <Typography>{pdfFile ? pdfFile.name : "Upload PDF"}</Typography>
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </Stack>
        </Box>

        {/* Thumbnail Upload */}
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: "12px",
            p: 3,
            mb: 2,
            maxWidth: 400,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
          onClick={() => thumbnailInputRef.current.click()}
        >
          <Stack spacing={1} alignItems="center">
            <IconButton>
              <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
            </IconButton>
            <Typography>{thumbnail ? thumbnail.name : "Upload Thumbnail"}</Typography>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </Stack>
        </Box>

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          value={description}
          multiline
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2, maxWidth: 400 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mb: 3, borderRadius: "24px", px: 4 }}
        >
          {isEditMode ? "Update Video" : "Submit"}
        </Button>

        {message && (
          <Alert severity="info" sx={{ mt: 2, maxWidth: 600 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default VideoForm;


// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   MenuItem,
//   Paper,
//   Stack,
//   TextField,
//   IconButton,
//   Alert,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CommonNav from "../CommonNav";
// import Sidebar from "../Sidebar";
// import axiosInstance from "../axiosInterceptor";
// import { useParams, useNavigate } from "react-router-dom";

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const VideoForm = () => {
//   const videoInputRef = useRef();
//   const pdfInputRef = useRef();
//   const thumbnailInputRef = useRef();

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [selectedStack, setSelectedStack] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState("");
//   const [videoURL, setVideoURL] = useState("");
//   const [message, setMessage] = useState("");

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   // Fetch stacks
//   useEffect(() => {
//     axiosInstance
//       .get("http://localhost:3000/admin/stacks")
//       .then((res) => setStacks(res.data))
//       .catch((err) => console.error("Error fetching stacks:", err));
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     if (selectedStack) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/categories?stackId=${selectedStack}`)
//         .then((res) => setCategories(res.data))
//         .catch((err) => console.error("Error fetching categories:", err));
//     } else setCategories([]);
//     setSelectedCategory("");
//     setSelectedSubCategory("");
//   }, [selectedStack]);

//   // Fetch subcategories
//   useEffect(() => {
//     if (selectedCategory) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/sub-categories?categoryId=${selectedCategory}`)
//         .then((res) => setSubCategories(res.data))
//         .catch((err) => console.error("Error fetching subcategories:", err));
//     } else setSubCategories([]);
//     setSelectedSubCategory("");
//   }, [selectedCategory]);

//   // Fetch video details if editing
//   useEffect(() => {
//     if (id) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/video/${id}`)
//         .then((res) => {
//           const v = res.data;
//           setTitle(v.title);
//           setDescription(v.description);
//           setSelectedStack(v.stack);
//           setSelectedCategory(v.category);
//           setSelectedSubCategory(v.subCategory);
//           setVideoURL(v.videoUrl || "");
//           if (v.thumbnail) setThumbnailPreview(`http://localhost:3000/${v.thumbnail}`);
//         })
//         .catch((err) => console.error("Error fetching video:", err));
//     }
//   }, [id]);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("stack", selectedStack);
//     formData.append("category", selectedCategory);
//     formData.append("subCategory", selectedSubCategory);
//     formData.append("videoUrl", videoURL);

//     if (videoFile) formData.append("file", videoFile);
//     if (pdfFile) formData.append("overviewPdf", pdfFile);
//     if (thumbnail) formData.append("thumbnail", thumbnail);

//     try {
//       const url = id 
//         ? `http://localhost:3000/admin/video/${id}`
//         : "http://localhost:3000/admin/video";
//       const method = id ? "put" : "post";

//       const res = await axiosInstance[method](url, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(res.data.message);
//       navigate("/admin/videos"); // redirect after success
//     } catch (error) {
//       console.error(error);
//       setMessage(error.response?.data?.error || "Operation failed.");
//     }
//   };

//   const handleThumbnailChange = (file) => {
//     setThumbnail(file);
//     setThumbnailPreview(URL.createObjectURL(file));
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CommonNav onToggleSidebar={onToggleSidebar} />
//       <Sidebar open={isSidebarOpen} userType="admin" />

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           pt: `${appBarHeight + 24}px`,
//           pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
//           pr: 4,
//           pb: 4,
//           backgroundColor: "#f7f9fa",
//           minHeight: "100vh",
//           transition: "padding 0.3s ease",
//         }}
//       >
//         <Typography variant="h5" gutterBottom sx={{ fontFamily: "-moz-initial", color: "black" }}>
//           {id ? "Edit Video" : "Upload New Video"}
//         </Typography>

//         {/* Stack Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select Stack"
//           value={selectedStack}
//           onChange={(e) => setSelectedStack(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//         >
//           {stacks.map((stack) => (
//             <MenuItem key={stack._id} value={stack._id}>
//               {stack.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Category Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select Category"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//           disabled={!selectedStack}
//         >
//           {categories.map((cat) => (
//             <MenuItem key={cat._id} value={cat._id}>
//               {cat.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* SubCategory Dropdown */}
//         <TextField
//           select
//           fullWidth
//           label="Select SubCategory"
//           value={selectedSubCategory}
//           onChange={(e) => setSelectedSubCategory(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//           disabled={!selectedCategory}
//         >
//           {subCategories.map((sub) => (
//             <MenuItem key={sub._id} value={sub._id}>
//               {sub.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Title */}
//         <TextField
//           fullWidth
//           label="Project Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//         />

//         {/* Video Upload */}
//         <UploadBox
//           label={videoFile ? videoFile.name : "Browse Video"}
//           onClick={() => videoInputRef.current.click()}
//         />
//         <input
//           ref={videoInputRef}
//           type="file"
//           accept="video/*"
//           style={{ display: "none" }}
//           onChange={(e) => setVideoFile(e.target.files[0])}
//         />

//         {/* PDF Upload */}
//         <UploadBox
//           label={pdfFile ? pdfFile.name : "Upload PDF"}
//           onClick={() => pdfInputRef.current.click()}
//         />
//         <input
//           ref={pdfInputRef}
//           type="file"
//           accept="application/pdf"
//           style={{ display: "none" }}
//           onChange={(e) => setPdfFile(e.target.files[0])}
//         />

//         {/* Thumbnail Upload with Preview */}
//         <UploadBox
//           label={thumbnail ? thumbnail.name : "Upload Thumbnail"}
//           onClick={() => thumbnailInputRef.current.click()}
//         />
//         <input
//           ref={thumbnailInputRef}
//           type="file"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={(e) => handleThumbnailChange(e.target.files[0])}
//         />
//         {thumbnailPreview && (
//           <Box mt={2}>
//             <img src={thumbnailPreview} alt="Thumbnail Preview" width="150" />
//           </Box>
//         )}

//         {/* Video URL */}
//         <TextField
//           fullWidth
//           label="Video URL"
//           value={videoURL}
//           onChange={(e) => setVideoURL(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//         />

//         {/* Description */}
//         <TextField
//           fullWidth
//           label="Description"
//           value={description}
//           multiline
//           rows={3}
//           onChange={(e) => setDescription(e.target.value)}
//           sx={{ mb: 2, maxWidth: 400 }}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleUpload}
//           sx={{ mb: 3, borderRadius: "24px", px: 4 }}
//         >
//           {id ? "Update Video" : "Submit"}
//         </Button>

//         {message && (
//           <Alert severity="info" sx={{ mt: 2, maxWidth: 600 }}>
//             {message}
//           </Alert>
//         )}
//       </Box>
//     </Box>
//   );
// };

// // ✅ Reusable Upload Box Component
// const UploadBox = ({ label, onClick }) => (
//   <Box
//     sx={{
//       border: "2px dashed #ccc",
//       borderRadius: "12px",
//       p: 3,
//       mb: 2,
//       maxWidth: 400,
//       backgroundColor: "#fff",
//       textAlign: "center",
//       cursor: "pointer",
//       boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//     }}
//     onClick={onClick}
//   >
//     <Stack spacing={1} alignItems="center">
//       <IconButton>
//         <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
//       </IconButton>
//       <Typography>{label}</Typography>
//     </Stack>
//   </Box>
// );

// export default VideoForm;

