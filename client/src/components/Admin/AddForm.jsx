

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   CircularProgress,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import axios from "axios";
// import CommonNav from "../CommonNav";
// import Sidebar from "../Sidebar";

// const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [currentImage, setCurrentImage] = useState(""); // For edit mode
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const [parentOptions, setParentOptions] = useState([]); // Stacks or Categories
//   const [parentId, setParentId] = useState(""); // Selected parent ID

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };
//   const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;



//   // Fetch parent options for dropdown
//   useEffect(() => {
//     if (type === "category") {
//       // Fetch stacks for category
//       axios
//         .get("http://localhost:3000/admin/stack", { headers })
//         .then((res) => setParentOptions(res.data))
//         .catch((err) => console.error("Error fetching stacks:", err));
//     } else if (type === "sub-category") {
//       // Fetch categories for sub-category
//       axios
//         .get("http://localhost:3000/admin/category", { headers })
//         .then((res) => setParentOptions(res.data))
//         .catch((err) => console.error("Error fetching categories:", err));
//     }
//   }, [type]);

//   // Fetch item for edit mode
//   useEffect(() => {
//     if (mode === "edit" && itemId) {
//       const fetchItem = async () => {
//         try {
//           const res = await axios.get(
//             `http://localhost:3000/admin/${type}/${itemId}`,
//             { headers }
//           );
//           setName(res.data.name);
//           setCurrentImage(`http://localhost:3000/uploads/${res.data.image}`);
//           if (type === "category") setParentId(res.data.stack);
//           if (type === "sub-category") setParentId(res.data.category);
//         } catch (err) {
//           console.error("Error fetching item:", err);
//         }
//       };
//       fetchItem();
//     }
//   }, [mode, itemId, type]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert("");

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);

//     // Add parentId for category or sub-category
//     if (type === "category") formData.append("stack", parentId); // send stack ID
//     if (type === "sub-category") formData.append("category", parentId); // send category ID

//     const apiUrl =
//       mode === "add"
//         ? `http://localhost:3000/admin/${type}`
//         : `http://localhost:3000/admin/edit/${type}/${itemId}`;

//     try {
//       if (mode === "add") {
//         await axios.post(apiUrl, formData, {
//           headers: { ...headers, "Content-Type": "multipart/form-data" },
//         });
//         setAlert(`${type} added successfully!`);
//       } else {
//         await axios.put(apiUrl, formData, {
//           headers: { ...headers, "Content-Type": "multipart/form-data" },
//         });
//         setAlert(`${type} updated successfully!`);
//       }
//       setTimeout(() => {
//         window.location.href = "/admin/dashboard"; // Redirect after success
//       }, 1000);
//     } catch (err) {
//       console.error(err);
//       setAlert(`Failed to ${mode} ${type}.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <CommonNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//       <Box
//         sx={{
//           display: "flex",
//           backgroundColor: "#f5f5f5",
//           minHeight: "100vh",
//         }}
//       >
//         <Sidebar open={isSidebarOpen} userType="admin" />
//         <Box
//           component="main"
//         sx={{
//           flexGrow: 1,
//           pt: `${appBarHeight + 24}px`,
//           pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
//           pr: 4,
//           pb: 4,
//           backgroundColor: '#f7f9fa',
//           minHeight: '100vh',
//           transition: 'padding 0.3s ease',
//         }}
//         >
//           <Paper sx={{ p: 4, maxWidth: 500, margin: "auto", borderRadius: 3 }}>
//             <Typography variant="h5" fontWeight={600} mb={3}>
//               {mode === "add" ? "Add" : "Edit"}{" "}
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </Typography>

//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//               <TextField
//                 label={`Enter ${type} Name`}
//                 fullWidth
//                 margin="normal"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />

//               {/* Parent Dropdown */}
//               {(type === "category" || type === "sub-category") && (
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>
//                     Select {type === "category" ? "Stack" : "Category"}
//                   </InputLabel>
//                   <Select
//                     value={parentId}
//                     onChange={(e) => setParentId(e.target.value)}
//                     required
//                   >
//                     {parentOptions.map((option) => (
//                       <MenuItem key={option._id} value={option._id}>
//                         {option.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               )}

//               {/* Current Image in Edit */}
//               {mode === "edit" && currentImage && (
//                 <Box mb={2} textAlign="center">
//                   <Typography variant="subtitle2" mb={1}>
//                     Current Image:
//                   </Typography>
//                   <img
//                     src={currentImage}
//                     alt="Current"
//                     style={{ width: "100%", borderRadius: 8 }}
//                   />
//                 </Box>
//               )}

//               {/* Image Upload */}
//               {/* <Box
//                 sx={{
//                   border: "1px dashed #ccc",
//                   p: 2,
//                   my: 2,
//                   textAlign: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() =>
//                   document.getElementById(`${type}ImageUpload`).click()
//                 }
//               >
//                 {image ? image.name : "Upload Image"}
//                 <input
//                   type="file"
//                   id={`${type}ImageUpload`}
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   onChange={(e) => setImage(e.target.files[0])}
//                 />
//               </Box> */}
//                 <Box mb={3}>
//   <Typography variant="subtitle1" fontWeight={600} mb={1}>
//     Upload Image
//   </Typography>

//   <Box
//     onClick={() => document.getElementById(`${type}ImageUpload`).click()}
//     sx={{
//       border: "2px dashed #ccc",
//       borderRadius: "12px",
//       height: 180,
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       cursor: "pointer",
//       backgroundColor: "#fafafa",
//       textAlign: "center",
//       transition: "0.3s",
//       "&:hover": {
//         borderColor: "#1976d2",
//         backgroundColor: "#f0f8ff",
//       },
//     }}
//   >
//     <img
//       src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//       alt="Upload Icon"
//       style={{ width: 40, marginBottom: 8, opacity: 0.6 }}
//     />
//     <Typography variant="body1" fontWeight={500}>
//       Browse files
//     </Typography>
//     <Typography variant="caption" color="textSecondary">
//       Drag and drop files here
//     </Typography>
//     <input
//       type="file"
//       id={`${type}ImageUpload`}
//       accept="image/*"
//       style={{ display: "none" }}
//       onChange={(e) => setImage(e.target.files[0])}
//     />
//   </Box>

//   {image && (
//     <Typography variant="body2" mt={1}>
//       Selected: <strong>{image.name}</strong>
//     </Typography>
//   )}
// </Box>

//               {/* Alert */}
//               {alert && (
//                 <Typography
//                   color={alert.includes("successfully") ? "green" : "red"}
//                   mb={2}
//                 >
//                   {alert}
//                 </Typography>
//               )}

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <CircularProgress size={24} />
//                 ) : mode === "add" ? (
//                   "Add"
//                 ) : (
//                   "Update"
//                 )}
//               </Button>
//             </form>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AddForm;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   CircularProgress,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import axios from "axios";
// import CommonNav from "../CommonNav";
// import Sidebar from "../Sidebar";

// const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [currentImage, setCurrentImage] = useState(""); // For edit mode
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const [parentOptions, setParentOptions] = useState([]); // Stacks or Categories
//   const [parentId, setParentId] = useState(""); // Selected parent ID

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };
//   const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;



//   // Fetch parent options for dropdown
//   useEffect(() => {
//     if (type === "category") {
//       // Fetch stacks for category
//       axios
//         .get("http://localhost:3000/admin/stack", { headers })
//         .then((res) => setParentOptions(res.data))
//         .catch((err) => console.error("Error fetching stacks:", err));
//     } else if (type === "sub-category") {
//       // Fetch categories for sub-category
//       axios
//         .get("http://localhost:3000/admin/category", { headers })
//         .then((res) => setParentOptions(res.data))
//         .catch((err) => console.error("Error fetching categories:", err));
//     }
//   }, [type]);

//   // Fetch item for edit mode
//   useEffect(() => {
//     if (mode === "edit" && itemId) {
//       const fetchItem = async () => {
//         try {
//           const res = await axios.get(
//             `http://localhost:3000/admin/${type}/${itemId}`,
//             { headers }
//           );
//           setName(res.data.name);
//           setCurrentImage(`http://localhost:3000/uploads/${res.data.image}`);
//           if (type === "category") setParentId(res.data.stack);
//           if (type === "sub-category") setParentId(res.data.category);
//         } catch (err) {
//           console.error("Error fetching item:", err);
//         }
//       };
//       fetchItem();
//     }
//   }, [mode, itemId, type]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert("");

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);

//     // Add parentId for category or sub-category
//     if (type === "category") formData.append("stack", parentId); // send stack ID
//     if (type === "sub-category") formData.append("category", parentId); // send category ID

//     const apiUrl =
//       mode === "add"
//         ? `http://localhost:3000/admin/${type}`
//         : `http://localhost:3000/admin/edit/${type}/${itemId}`;

//     try {
//       if (mode === "add") {
//         await axios.post(apiUrl, formData, {
//           headers: { ...headers, "Content-Type": "multipart/form-data" },
//         });
//         setAlert(`${type} added successfully!`);
//       } else {
//         await axios.put(apiUrl, formData, {
//           headers: { ...headers, "Content-Type": "multipart/form-data" },
//         });
//         setAlert(`${type} updated successfully!`);
//       }
//       setTimeout(() => {
//         window.location.href = "/admin/dashboard"; // Redirect after success
//       }, 1000);
//     } catch (err) {
//       console.error(err);
//       setAlert(`Failed to ${mode} ${type}.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <CommonNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//       <Box
//         sx={{
//           display: "flex",
//           backgroundColor: "#f5f5f5",
//           minHeight: "100vh",
//         }}
//       >
//         <Sidebar open={isSidebarOpen} userType="admin" />
//         <Box
//           component="main"
//         sx={{
//           flexGrow: 1,
//           pt: `${appBarHeight + 24}px`,
//           pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
//           pr: 4,
//           pb: 4,
//           backgroundColor: '#f7f9fa',
//           minHeight: '100vh',
//           transition: 'padding 0.3s ease',
//         }}
//         >
//           <Paper sx={{ p: 4, maxWidth: 500, margin: "auto", borderRadius: 3 }}>
//             <Typography variant="h5" fontWeight={600} mb={3}>
//               {mode === "add" ? "Add" : "Edit"}{" "}
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </Typography>

//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//               <TextField
//                 label={`Enter ${type} Name`}
//                 fullWidth
//                 margin="normal"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />

//               {/* Parent Dropdown */}
//               {(type === "category" || type === "sub-category") && (
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>
//                     Select {type === "category" ? "Stack" : "Category"}
//                   </InputLabel>
//                   <Select
//                     value={parentId}
//                     onChange={(e) => setParentId(e.target.value)}
//                     required
//                   >
//                     {parentOptions.map((option) => (
//                       <MenuItem key={option._id} value={option._id}>
//                         {option.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               )}

//               {/* Current Image in Edit */}
//               {mode === "edit" && currentImage && (
//                 <Box mb={2} textAlign="center">
//                   <Typography variant="subtitle2" mb={1}>
//                     Current Image:
//                   </Typography>
//                   <img
//                     src={currentImage}
//                     alt="Current"
//                     style={{ width: "100%", borderRadius: 8 }}
//                   />
//                 </Box>
//               )}

//               {/* Image Upload */}
//               {/* <Box
//                 sx={{
//                   border: "1px dashed #ccc",
//                   p: 2,
//                   my: 2,
//                   textAlign: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() =>
//                   document.getElementById(`${type}ImageUpload`).click()
//                 }
//               >
//                 {image ? image.name : "Upload Image"}
//                 <input
//                   type="file"
//                   id={`${type}ImageUpload`}
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   onChange={(e) => setImage(e.target.files[0])}
//                 />
//               </Box> */}
//                 <Box mb={3}>
//   <Typography variant="subtitle1" fontWeight={600} mb={1}>
//     Upload Image
//   </Typography>

//   <Box
//     onClick={() => document.getElementById(`${type}ImageUpload`).click()}
//     sx={{
//       border: "2px dashed #ccc",
//       borderRadius: "12px",
//       height: 180,
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       cursor: "pointer",
//       backgroundColor: "#fafafa",
//       textAlign: "center",
//       transition: "0.3s",
//       "&:hover": {
//         borderColor: "#1976d2",
//         backgroundColor: "#f0f8ff",
//       },
//     }}
//   >
//     <img
//       src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//       alt="Upload Icon"
//       style={{ width: 40, marginBottom: 8, opacity: 0.6 }}
//     />
//     <Typography variant="body1" fontWeight={500}>
//       Browse files
//     </Typography>
//     <Typography variant="caption" color="textSecondary">
//       Drag and drop files here
//     </Typography>
//     <input
//       type="file"
//       id={`${type}ImageUpload`}
//       accept="image/*"
//       style={{ display: "none" }}
//       onChange={(e) => setImage(e.target.files[0])}
//     />
//   </Box>

//   {image && (
//     <Typography variant="body2" mt={1}>
//       Selected: <strong>{image.name}</strong>
//     </Typography>
//   )}
// </Box>

//               {/* Alert */}
//               {alert && (
//                 <Typography
//                   color={alert.includes("successfully") ? "green" : "red"}
//                   mb={2}
//                 >
//                   {alert}
//                 </Typography>
//               )}

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <CircularProgress size={24} />
//                 ) : mode === "add" ? (
//                   "Add"
//                 ) : (
//                   "Update"
//                 )}
//               </Button>
//             </form>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AddForm;







// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import CommonNav from "../CommonNav";
// import Sidebar from "../Sidebar";

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const AddForm = ({ type, onSuccess }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert("");

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);

//     const apiUrl = `http://localhost:3000/admin/${type}`;

//     try {
//       await axios.post(apiUrl, formData, {
//         headers: {
//           ...headers,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setAlert(`${type} added successfully!`);
//       setName("");
//       setImage(null);
//       if (onSuccess) onSuccess(); // callback to refresh list or close form
//     } catch (err) {
//       console.error(err);
//       setAlert(`Failed to add ${type}.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   return (
//     <Box>
//       {/* Top Navbar */}
//       <CommonNav onToggleSidebar={onToggleSidebar} />

//       {/* Sidebar */}
//       <Box
//         className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
//         sx={{ width: isSidebarOpen ? drawerWidthOpen : drawerWidthClosed }}
//       >
//         <Sidebar open={isSidebarOpen} userType="admin" />
//       </Box>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           pt: `${appBarHeight + 24}px`,
//           pl: isSidebarOpen
//             ? `${drawerWidthOpen + 24}px`
//             : `${drawerWidthClosed + 24}px`,
//           pr: 4,
//           pb: 4,
//           backgroundColor: "#f7f9fa",
//           minHeight: "100vh",
//           transition: "padding 0.3s ease",
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "#fff",
//             p: 3,
//             borderRadius: 2,
//             boxShadow: 2,
//             maxWidth: 500,
//             margin: "0 auto",
//           }}
//         >
//           <Typography variant="h5" fontWeight={600} mb={3}>
//             Add {type.charAt(0).toUpperCase() + type.slice(1)}
//           </Typography>

//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <TextField
//               label={`Enter ${type} Name`}
//               fullWidth
//               margin="normal"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />

//             <Box
//               sx={{
//                 border: "1px dashed #ccc",
//                 p: 2,
//                 my: 2,
//                 textAlign: "center",
//                 cursor: "pointer",
//               }}
//               onClick={() =>
//                 document.getElementById(`${type}ImageUpload`).click()
//               }
//             >
//               {image ? image.name : "Upload Image"}
//               <input
//                 type="file"
//                 id={`${type}ImageUpload`}
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </Box>

//             {alert && (
//               <Typography
//                 color={alert.includes("successfully") ? "green" : "red"}
//                 mb={2}
//               >
//                 {alert}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : "Add"}
//             </Button>
//           </form>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AddForm;
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   CircularProgress,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import axios from "axios";
// import axiosInstance from "../axiosInterceptor";

// const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [currentImage, setCurrentImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState("");
//   const [parentOptions, setParentOptions] = useState([]);
//   const [parentId, setParentId] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const url =
//           type === "category"
//             ? "http://localhost:3000/admin/stack"
//             : "http://localhost:3000/admin/category";
//         const res = await axiosInstance.get(url, { headers });
//         setParentOptions(res.data || []);
//       } catch (err) {
//         console.error("Error fetching options:", err);
//       }
//     };
//     fetchOptions();
//   }, [type]);

//   useEffect(() => {
//     if (mode === "edit" && itemId) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/${type}/${itemId}`, { headers })
//         .then((res) => {
//           const data = res.data;
//           setName(data.name);
//           setCurrentImage(`http://localhost:3000/uploads/${data.image}`);
//           if (type === "category") setParentId(data.stack);
//           if (type === "sub-category") setParentId(data.category);
//         })
//         .catch((err) => console.error("Error fetching item:", err));
//     }
//   }, [mode, itemId, type]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert("");

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);
//     if (type === "category") formData.append("stack", parentId);
//     if (type === "sub-category") formData.append("category", parentId);

//     const apiUrl =
//       mode === "add"
//         ? `http://localhost:3000/admin/${type}`
//         : `http://localhost:3000/admin/edit/${type}/${itemId}`;

//     try {
//       const method = mode === "add" ? axios.post : axios.put;
//       await method(apiUrl, formData, {
//         headers: { ...headers, "Content-Type": "multipart/form-data" },
//       });
//       setAlert(`${type} ${mode === "add" ? "added" : "updated"} successfully!`);
//       onSuccess(); // Close modal
//     } catch (err) {
//       console.error(err);
//       setAlert(`Failed to ${mode} ${type}.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       mt={4}
//       px={2}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: { xs: "100%", sm: 420, md: 480 },
//           p: 3,
//           borderRadius: 2,
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           align="center"
//           mb={2}
//         >
//           {mode === "add" ? `Add ${type}` : `Edit ${type}`}
//         </Typography>

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <TextField
//             label={`Enter ${type} Name`}
//             fullWidth
//             size="small"
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           {(type === "category" || type === "sub-category") && (
//             <FormControl fullWidth margin="normal" size="small">
//               <InputLabel>{type === "category" ? "Stack" : "Category"}</InputLabel>
//               <Select
//                 value={parentId}
//                 onChange={(e) => setParentId(e.target.value)}
//                 required
//                 label={type === "category" ? "Stack" : "Category"}
//               >
//                 {parentOptions.map((option) => (
//                   <MenuItem key={option._id} value={option._id}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {mode === "edit" && currentImage && (
//             <Box textAlign="center" mt={2}>
//               <Typography variant="subtitle2">Current Image:</Typography>
//               <Box
//                 component="img"
//                 src={currentImage}
//                 alt="Current"
//                 sx={{
//                   width: "100%",
//                   maxHeight: 150,
//                   borderRadius: 2,
//                   mt: 1,
//                   objectFit: "cover",
//                 }}
//               />
//             </Box>
//           )}

//           <Box mt={3} mb={2}>
//             <Typography variant="subtitle2" mb={1}>
//               Upload Image
//             </Typography>
//             <Box
//               onClick={() =>
//                 document.getElementById(`${type}ImageUpload`).click()
//               }
//               sx={{
//                 border: "2px dashed #ccc",
//                 borderRadius: 2,
//                 height: 100,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 backgroundColor: "#fafafa",
//                 "&:hover": {
//                   borderColor: "#1976d2",
//                   backgroundColor: "#f0f8ff",
//                 },
//               }}
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//                 alt="Upload"
//                 style={{ width: 28, marginBottom: 6, opacity: 0.6 }}
//               />
//               <Typography variant="body2">Browse files</Typography>
//               <input
//                 type="file"
//                 id={`${type}ImageUpload`}
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </Box>
//             {image && (
//               <Typography variant="body2" mt={1}>
//                 Selected: <strong>{image.name}</strong>
//               </Typography>
//             )}
//           </Box>

//           {alert && (
//             <Typography
//               variant="body2"
//               color={alert.includes("successfully") ? "green" : "red"}
//               mb={2}
//             >
//               {alert}
//             </Typography>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={22} /> : mode === "add" ? "Add" : "Update"}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default AddForm;
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   CircularProgress,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import axiosInstance from "../axiosInterceptor";

// const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [currentImage, setCurrentImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [stackOptions, setStackOptions] = useState([]);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [stackId, setStackId] = useState("");
//   const [categoryId, setCategoryId] = useState("");

//   const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // Fetch stack options for category/sub-category
//   useEffect(() => {
//     if (type === "category" || type === "sub-category") {
//       axiosInstance
//         .get("http://localhost:3000/admin/stack", { headers })
//         .then((res) => setStackOptions(res.data || []))
//         .catch((err) => console.error("Error fetching stacks:", err));
//     }
//   }, [type]);

//   // Fetch category options when stack is selected (for sub-category only)
//   useEffect(() => {
//     if (type === "sub-category" && stackId) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/category?stackId=${stackId}`, { headers })
//         .then((res) => setCategoryOptions(res.data || []))
//         .catch((err) => console.error("Error fetching categories:", err));
//     }
//   }, [stackId]);

//   // Fetch existing item for edit mode
//   useEffect(() => {
//     if (mode === "edit" && itemId) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/${type}/${itemId}`, { headers })
//         .then((res) => {
//           const data = res.data;
//           setName(data.name);
//           setCurrentImage(`http://localhost:3000/uploads/${data.image}`);

//           if (type === "category") setStackId(data.stack);
//           if (type === "sub-category") {
//             setCategoryId(data.category);
//             setStackId(data.stack); // Ensure correct stack is set so categories load
//           }
//         })
//         .catch((err) => console.error("Error fetching item:", err));
//     }
//   }, [mode, itemId, type]);

//   // Submit logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);
//     if (type === "category") formData.append("stack", stackId);
//     if (type === "sub-category") {
//       formData.append("stack", stackId);
//       formData.append("category", categoryId);
//     }

//     const apiUrl =
//       mode === "add"
//         ? `http://localhost:3000/admin/${type}`
//         : `http://localhost:3000/admin/edit/${type}/${itemId}`;

//     try {
//       const method = mode === "add" ? axios.post : axios.put;
//       await method(apiUrl, formData, {
//         headers: { ...headers, "Content-Type": "multipart/form-data" },
//       });
//       setSnack({ open: true, message: `${type} ${mode}ed successfully`, severity: "success" });
//       onSuccess(); // Close modal or refresh
//     } catch (err) {
//       console.error(err);
//       setSnack({ open: true, message: `Failed to ${mode} ${type}`, severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box display="flex" justifyContent="center" mt={4} px={2}>
//       <Paper
//         elevation={3}
//         sx={{
//           width: { xs: "100%", sm: 420, md: 480 },
//           p: 3,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" align="center" mb={2}>
//           {mode === "add" ? `Add ${type}` : `Edit ${type}`}
//         </Typography>

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <TextField
//             label={`Enter ${type} Name`}
//             fullWidth
//             size="small"
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           {/* Stack Selector */}
//           {(type === "category" || type === "sub-category") && (
//             <FormControl fullWidth margin="normal" size="small" required>
//               <InputLabel>Stack</InputLabel>
//               <Select
//                 value={stackId}
//                 onChange={(e) => {
//                   setStackId(e.target.value);
//                   if (type === "sub-category") setCategoryId(""); // Reset category
//                 }}
//                 label="Stack"
//               >
//                 {stackOptions.map((option) => (
//                   <MenuItem key={option._id} value={option._id}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {/* Category Selector for Sub-category */}
//           {type === "sub-category" && (
//             <FormControl fullWidth margin="normal" size="small" required>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={categoryId}
//                 onChange={(e) => setCategoryId(e.target.value)}
//                 label="Category"
//               >
//                 {categoryOptions.map((option) => (
//                   <MenuItem key={option._id} value={option._id}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {/* Show current image in edit mode */}
//           {mode === "edit" && currentImage && (
//             <Box textAlign="center" mt={2}>
//               <Typography variant="subtitle2">Current Image:</Typography>
//               <Box
//                 component="img"
//                 src={currentImage}
//                 alt="Current"
//                 sx={{
//                   width: "100%",
//                   maxHeight: 150,
//                   borderRadius: 2,
//                   mt: 1,
//                   objectFit: "cover",
//                 }}
//               />
//             </Box>
//           )}

//           {/* Upload Image */}
//           <Box mt={3} mb={2}>
//             <Typography variant="subtitle2" mb={1}>
//               Upload Image
//             </Typography>
//             <Box
//               onClick={() => document.getElementById(`${type}ImageUpload`).click()}
//               sx={{
//                 border: "2px dashed #ccc",
//                 borderRadius: 2,
//                 height: 100,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 backgroundColor: "#fafafa",
//                 "&:hover": {
//                   borderColor: "#1976d2",
//                   backgroundColor: "#f0f8ff",
//                 },
//               }}
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//                 alt="Upload"
//                 style={{ width: 28, marginBottom: 6, opacity: 0.6 }}
//               />
//               <Typography variant="body2">Browse files</Typography>
//               <input
//                 type="file"
//                 id={`${type}ImageUpload`}
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </Box>
//             {image && (
//               <Typography variant="body2" mt={1}>
//                 Selected: <strong>{image.name}</strong>
//               </Typography>
//             )}
//           </Box>

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={22} /> : mode === "add" ? "Add" : "Update"}
//           </Button>
//         </form>
//       </Paper>

//       {/* Snackbar for Success/Error */}
//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack({ ...snack, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnack({ ...snack, open: false })}
//           severity={snack.severity}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {snack.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AddForm;

import React, { useState, useEffect } from "react"; //last updated 03/08/2025 7.11pm
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
import axios from "axios";
import axiosInstance from "../axiosInterceptor";

const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [stackOptions, setStackOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [stackId, setStackId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
const MAX_FILE_SIZE_MB = 5;
const VALID_IMAGE_TYPES = [ "image/jpeg", "image/png"];

  // Fetch stacks
  useEffect(() => {
    if (type === "category" || type === "sub-category") {
      axiosInstance
        .get("http://localhost:3000/admin/stack", { headers })
        .then((res) => setStackOptions(res.data || []))
        .catch((err) => console.error("Error fetching stacks:", err));
    }
  }, [type]);

  // Fetch categories for selected stack
  useEffect(() => {
    if (type === "sub-category" && stackId) {
      axiosInstance
        .get(`http://localhost:3000/admin/category?stackId=${stackId}`, {
          headers,
        })
        .then((res) => setCategoryOptions(res.data || []))
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [type, stackId]);

  // Fetch item data in edit mode
  useEffect(() => {
    if (mode === "edit" && itemId) {
      axiosInstance
        .get(`http://localhost:3000/admin/${type}/${itemId}`, { headers })
        .then((res) => {
          const data = res.data;
          setName(data.name);
          setCurrentImage(`http://localhost:3000/uploads/${data.image}`);

          if (type === "category") {
            setStackId(data.stack);
          }

          if (type === "sub-category") {
            setCategoryId(data.category);

            // fetch category to get associated stack
            axiosInstance
              .get(`http://localhost:3000/admin/category/${data.category}`, {
                headers,
              })
              .then((res) => {
                setStackId(res.data.stack);
              })
              .catch((err) =>
                console.error("Error fetching category's stack:", err)
              );
          }
        })
        .catch((err) => console.error("Error fetching item:", err));
    }
  }, [mode, itemId, type]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    if (type === "category") formData.append("stack", stackId);
    if (type === "sub-category") {
      formData.append("stack", stackId);
      formData.append("category", categoryId);
    }

    const apiUrl =
      mode === "add"
        ? `http://localhost:3000/admin/${type}`
        : `http://localhost:3000/admin/edit/${type}/${itemId}`;

    try {
      const method = mode === "add" ? axios.post : axios.put;
      await method(apiUrl, formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });

      setSnack({
        open: true,
        message: `${type} ${mode === "add" ? "added" : "updated"} successfully`,
        severity: "success",
      });

      onSuccess(); // callback to parent
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
        <Typography variant="h6" fontWeight="bold" align="center" mb={2} fontFamily={'Poppins'}>
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

          {(type === "category" || type === "sub-category") && (
            <FormControl fullWidth margin="normal" size="small" required>
              <InputLabel>Stack</InputLabel>
              <Select
                value={stackId}
                label="Stack"
                onChange={(e) => {
                  setStackId(e.target.value);
                  if (type === "sub-category") setCategoryId("");
                }}
              >
                {stackOptions.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

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
            <Typography variant="subtitle2" mb={1} fontFamily={"Poppins"}>
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
              <Typography variant="body2" fontFamily={'Poppins'}>Browse files</Typography>
              <input
                type="file"
                id={`${type}ImageUpload`}
                accept="image/*"
                style={{ display: "none" }}
                // onChange={(e) => setImage(e.target.files[0])}
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

      {/* Snackbar */}
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

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   CircularProgress,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import axios from "axios";
// import axiosInstance from "../axiosInterceptor";

// const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [currentImage, setCurrentImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState("");
//   const [parentOptions, setParentOptions] = useState([]);
//   const [parentId, setParentId] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     if (type === "category") {
//       axiosInstance
//         .get("http://localhost:3000/admin/stack", { headers })
//         .then((res) => setParentOptions(res.data || []))
//         .catch((err) => console.error("Error fetching stacks:", err));
//     } else if (type === "sub-category") {
//       axiosInstance
//         .get("http://localhost:3000/admin/category", { headers })
//         .then((res) => setParentOptions(res.data || []))
//         .catch((err) => console.error("Error fetching categories:", err));
//     }
//   }, [type]);

//   useEffect(() => {
//     if (mode === "edit" && itemId) {
//       axiosInstance
//         .get(`http://localhost:3000/admin/${type}/${itemId}`, { headers })
//         .then((res) => {
//           setName(res.data.name);
//           setCurrentImage(`http://localhost:3000/uploads/${res.data.image}`);
//           if (type === "category") setParentId(res.data.stack);
//           if (type === "sub-category") setParentId(res.data.category);
//         })
//         .catch((err) => console.error("Error fetching item:", err));
//     }
//   }, [mode, itemId, type]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert("");

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);
//     if (type === "category") formData.append("stack", parentId);
//     if (type === "sub-category") formData.append("category", parentId);

//     const apiUrl =
//       mode === "add"
//         ? `http://localhost:3000/admin/${type}`
//         : `http://localhost:3000/admin/edit/${type}/${itemId}`;

//     try {
//       const method = mode === "add" ? axios.post : axios.put;
//       await method(apiUrl, formData, {
//         headers: { ...headers, "Content-Type": "multipart/form-data" },
//       });
//       setAlert(`${type} ${mode === "add" ? "added" : "updated"} successfully!`);
//       onSuccess(); // Close modal
//     } catch (err) {
//       console.error(err);
//       setAlert(`Failed to ${mode} ${type}.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box display="flex" justifyContent="center">
//       <Paper
//         elevation={0}
//         sx={{
//           width: 400,
//           p: 2,
//         }}
//       >
//         <Typography
//           variant="h6"
//           align="center"
//           fontWeight="bold"
//           mb={2}
//         >
//           {mode === "add" ? `Add ${type}` : `Edit ${type}`}
//         </Typography>

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <TextField
//             label={`Enter ${type} Name`}
//             fullWidth
//             size="small"
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           {(type === "category" || type === "sub-category") && (
//             <FormControl fullWidth margin="normal" size="small">
//               <InputLabel>
//                 {type === "category" ? "Stack" : "Category"}
//               </InputLabel>
//               <Select
//                 value={parentId}
//                 onChange={(e) => setParentId(e.target.value)}
//                 required
//                 label={type === "category" ? "Stack" : "Category"}
//               >
//                 {parentOptions.map((option) => (
//                   <MenuItem key={option._id} value={option._id}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {mode === "edit" && currentImage && (
//             <Box mt={2} mb={2} textAlign="center">
//               <Typography variant="subtitle2" mb={1}>
//                 Current Image:
//               </Typography>
//               <Box
//                 sx={{
//                   width: 350,
//                   height: 120,
//                   mx: "auto",
//                   mb: 1,
//                   borderRadius: 2,
//                   overflow: "hidden",
//                 }}
//               >
//                 <img
//                   src={currentImage}
//                   alt="Current"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//               </Box>
//             </Box>
//           )}

//           {/* Image Upload */}
//           <Box mb={2}>
//             <Typography variant="subtitle2" mb={1}>
//               Upload Image
//             </Typography>
//             <Box
//               onClick={() =>
//                 document.getElementById(`${type}ImageUpload`).click()
//               }
//               sx={{
//                 border: "2px dashed #ccc",
//                 borderRadius: "8px",
//                 height: 100,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 backgroundColor: "#f9f9f9",
//                 "&:hover": {
//                   borderColor: "#1976d2",
//                   backgroundColor: "#f0f8ff",
//                 },
//               }}
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
//                 alt="Upload Icon"
//                 style={{ width: 30, marginBottom: 6, opacity: 0.6 }}
//               />
//               <Typography variant="body2" fontWeight={500}>
//                 Browse files
//               </Typography>
//               <input
//                 type="file"
//                 id={`${type}ImageUpload`}
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </Box>
//             {image && (
//               <Typography variant="body2" mt={1}>
//                 Selected: <strong>{image.name}</strong>
//               </Typography>
//             )}
//           </Box>

//           {alert && (
//             <Typography
//               variant="body2"
//               color={alert.includes("successfully") ? "green" : "red"}
//               mb={2}
//             >
//               {alert}
//             </Typography>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? (
//               <CircularProgress size={22} />
//             ) : mode === "add" ? (
//               "Add"
//             ) : (
//               "Update"
//             )}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default AddForm;
