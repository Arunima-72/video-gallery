// // UploadForm.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// // import './UploadForm.css'; // Optional styling

// const VideoForm = () => {
//   const [form, setForm] = useState({
//     title: '',
//     category: '',
//     subcategory: '',
//     stack: '',
//     github: '',
//     description: '',
//   });

//   const [videoFile, setVideoFile] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [pdfOverview, setPdfOverview] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     for (let key in form) {
//       formData.append(key, form[key]);
//     }
//     formData.append('video', videoFile);
//     formData.append('thumbnail', thumbnail);
//     formData.append('pdf', pdfOverview);

//     try {
//       const res = await axios.post('http://localhost:3000/admin/videos/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('Upload successful!');
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Upload failed.');
//     }
//   };

//   return (
//     <form className="upload-form" onSubmit={handleSubmit} encType="multipart/form-data">
//       <h2>Upload Project Video</h2>

//       <label>Title:</label>
//       <input type="text" name="title" value={form.title} onChange={handleChange} required />

//       <label>Category:</label>
//       <input type="text" name="category" value={form.category} onChange={handleChange} required />

//       <label>Sub Category:</label>
//       <input type="text" name="subcategory" value={form.subcategory} onChange={handleChange} required />

//       <label>Stack:</label>
//       <input type="text" name="stack" value={form.stack} onChange={handleChange} required />

//       <label>GitHub URL:</label>
//       <input type="url" name="github" value={form.github} onChange={handleChange} required />

//       <label>Description:</label>
//       <textarea name="description" value={form.description} onChange={handleChange} required />

//       <label>Upload Video:</label>
//       <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />

//       <label>Upload Thumbnail:</label>
//       <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} required />

//       <label>Upload Project Overview PDF:</label>
//       <input type="file" accept="application/pdf" onChange={(e) => setPdfOverview(e.target.files[0])} required />

//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default VideoForm;
// import React, { useState } from "react";
// import axios from "axios";

// const VideoUploadForm = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !videoFile || !pdfFile) {
//       setUploadStatus("Please fill all fields and upload both files.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("video", videoFile);
//     formData.append("overview", pdfFile); // PDF file

//     try {
//       const response = await axios.post("http://localhost:5000/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setUploadStatus("Upload successful!");
//       setTitle("");
//       setDescription("");
//       setVideoFile(null);
//       setPdfFile(null);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadStatus("Upload failed. Try again.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Upload Video Project</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <label style={styles.label}>Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <label style={styles.label}>Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={styles.textarea}
//           required
//         />

//         <label style={styles.label}>Upload Video</label>
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setVideoFile(e.target.files[0])}
//           style={styles.input}
//           required
//         />

//         <label style={styles.label}>Upload Project Overview (PDF)</label>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={(e) => setPdfFile(e.target.files[0])}
//           style={styles.input}
//           required
//         />

//         <button type="submit" style={styles.button}>Upload</button>
//         {uploadStatus && <p style={styles.status}>{uploadStatus}</p>}
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "500px",
//     margin: "30px auto",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     fontFamily: "Arial, sans-serif",
//   },
//   header: {
//     textAlign: "center",
//     color: "#333",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   label: {
//     fontWeight: "bold",
//   },
//   input: {
//     padding: "8px",
//     fontSize: "14px",
//   },
//   textarea: {
//     padding: "8px",
//     fontSize: "14px",
//     minHeight: "80px",
//   },
//   button: {
//     padding: "10px",
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   status: {
//     marginTop: "10px",
//     textAlign: "center",
//     color: "#555",
//   },
// };

// export default VideoUploadForm;
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   Grid,
//   TextField,
//   Typography,
//   InputLabel,
// } from "@mui/material";
// import axios from "axios";
// import Sidebar from "../Sidebar"; // Adjust the import path
// import CommonNav from "../CommonNav"; // Adjust the import path

// const VideoUploadForm = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !videoFile || !pdfFile) {
//       setUploadStatus("Please fill all fields and upload both files.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("file", videoFile);
//     formData.append("overviewPdf", pdfFile);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post("http://localhost:3000/admin/video", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUploadStatus("Upload successful!");
//       setTitle("");
//       setDescription("");
//       setVideoFile(null);
//       setPdfFile(null);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadStatus("Upload failed. Try again.");
//     }
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* Navbar */}
//       <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//       {/* Sidebar */}
//       <Sidebar open={sidebarOpen} userType="admin" />

//       {/* Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
//         <Container maxWidth="sm">
//           <Typography variant="h5" align="center" gutterBottom>
//             Upload New Video
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Project Title"
//                   fullWidth
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   label="Description"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <InputLabel>Upload Video</InputLabel>
//                 <input
//                   type="file"
//                   accept="video/*"
//                   onChange={(e) => setVideoFile(e.target.files[0])}
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <InputLabel>Upload Project Overview (PDF)</InputLabel>
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   onChange={(e) => setPdfFile(e.target.files[0])}
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Button variant="contained" color="primary" fullWidth type="submit">
//                   Submit
//                 </Button>
//               </Grid>

//               {uploadStatus && (
//                 <Grid item xs={12}>
//                   <Typography align="center" color="textSecondary">
//                     {uploadStatus}
//                   </Typography>
//                 </Grid>
//               )}
//             </Grid>
//           </form>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default VideoUploadForm;
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Sidebar from "../Sidebar"; // Adjust path
import CommonNav from "../CommonNav"; // Adjust path

const VideoUploadForm = () => {
  const [stack, setStack] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stack || !category || !subCategory || !title || !description || !videoFile || !pdfFile) {
      setUploadStatus("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("stack", stack);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", videoFile);
    formData.append("overviewPdf", pdfFile);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/admin/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUploadStatus("Upload successful!");
      // Clear form
      setStack("");
      setCategory("");
      setSubCategory("");
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setPdfFile(null);
    } catch (error) {
      console.error(error);
      setUploadStatus("Upload failed. Try again.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} userType="admin" />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" gutterBottom>
            Upload New Video
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Stack Dropdown */}
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Select Stack"
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  required
                >
                  <MenuItem value="MERN">MERN</MenuItem>
                  <MenuItem value="MEAN">MEAN</MenuItem>
                  <MenuItem value="Python-Django">Python-Django</MenuItem>
                </TextField>
              </Grid>

              {/* Category Dropdown */}
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Select Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <MenuItem value="E-Commerce">E-Commerce</MenuItem>
                  <MenuItem value="Portfolio">Portfolio</MenuItem>
                  <MenuItem value="Admin Dashboard">Admin Dashboard</MenuItem>
                </TextField>
              </Grid>

              {/* Subcategory Dropdown */}
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Sub Category"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                >
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Tech">Tech</MenuItem>
                </TextField>
              </Grid>

              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  label="Project Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>

              {/* Upload Video */}
              <Grid item xs={12}>
                <InputLabel>Upload Video</InputLabel>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  required
                />
              </Grid>

              {/* Upload PDF */}
              <Grid item xs={12}>
                <InputLabel>Upload Project Overview (PDF)</InputLabel>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  required
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0056b3",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>

              {/* Status Message */}
              {uploadStatus && (
                <Grid item xs={12}>
                  <Typography align="center" color="textSecondary">
                    {uploadStatus}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default VideoUploadForm;
