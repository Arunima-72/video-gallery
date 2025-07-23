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

// const AddForm = ({ type, onSuccess }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert("");

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);

//     // Dynamic API endpoint
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

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#f5f5f5",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper sx={{ p: 4, width: 400, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight={600} mb={3}>
//           Add {type.charAt(0).toUpperCase() + type.slice(1)}
//         </Typography>

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <TextField
//             label={`Enter ${type} Name`}
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <Box
//             sx={{
//               border: "1px dashed #ccc",
//               p: 2,
//               my: 2,
//               textAlign: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => document.getElementById(`${type}ImageUpload`).click()}
//           >
//             {image ? image.name : "Upload Image"}
//             <input
//               type="file"
//               id={`${type}ImageUpload`}
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </Box>

//           {alert && (
//             <Typography
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
//             {loading ? <CircularProgress size={24} /> : "Add"}
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
// } from "@mui/material";
// import axios from "axios";
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';

// const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [currentImage, setCurrentImage] = useState(""); // for showing old image in edit mode
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     if (mode === "edit" && itemId) {
//       // fetch existing data for edit
//       const fetchItem = async () => {
//         try {
//           const res = await axios.get(
//             `http://localhost:3000/admin/${type}/${itemId}`,
//             { headers }
//           );
//           setName(res.data.name);
//           setCurrentImage(`http://localhost:3000/uploads/${res.data.image}`);
//         } catch (err) {
//           console.error("Error fetching item:", err);
//         }
//       };
//       fetchItem();
//     }
//   }, [mode, itemId, type]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert("");

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);

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
//       setName("");
//       setImage(null);
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       console.error(err);
//       setAlert(`Failed to ${mode} ${type}.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#f5f5f5",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper sx={{ p: 4, width: 400, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight={600} mb={3}>
//           {mode === "add" ? "Add" : "Edit"}{" "}
//           {type.charAt(0).toUpperCase() + type.slice(1)}
//         </Typography>

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <TextField
//             label={`Enter ${type} Name`}
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           {mode === "edit" && currentImage && (
//             <Box mb={2} textAlign="center">
//               <Typography variant="subtitle2" mb={1}>
//                 Current Image:
//               </Typography>
//               <img
//                 src={currentImage}
//                 alt="Current"
//                 style={{ width: "100%", borderRadius: 8 }}
//               />
//             </Box>
//           )}

//           <Box
//             sx={{
//               border: "1px dashed #ccc",
//               p: 2,
//               my: 2,
//               textAlign: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => document.getElementById(`${type}ImageUpload`).click()}
//           >
//             {image ? image.name : "Upload Image"}
//             <input
//               type="file"
//               id={`${type}ImageUpload`}
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </Box>

//           {alert && (
//             <Typography
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
//               <CircularProgress size={24} />
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

// import React, { useState, useEffect } from "react";                       // last edited
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
//   const [currentImage, setCurrentImage] = useState(""); // for showing old image in edit mode
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const [parentOptions, setParentOptions] = useState([]); // Stacks or Categories
//   const [parentId, setParentId] = useState(""); // Selected parent ID

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

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

//   useEffect(() => {
//     if (mode === "edit" && itemId) {
//       // Fetch existing data for edit
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert("");

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);

//     // Add parentId for category or sub-category
//     if (type === "category") formData.append("stackId", parentId);
//     if (type === "sub-category") formData.append("categoryId", parentId);

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
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             transition: "margin 0.3s ease",
//             marginLeft: isSidebarOpen ? "240px" : "60px",
//           }}
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
//               <Box
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
//               </Box>

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

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";
import CommonNav from "../CommonNav";
import Sidebar from "../Sidebar";

const AddForm = ({ type, onSuccess, mode = "add", itemId }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // For edit mode
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [parentOptions, setParentOptions] = useState([]); // Stacks or Categories
  const [parentId, setParentId] = useState(""); // Selected parent ID

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const appBarHeight = 64;



  // Fetch parent options for dropdown
  useEffect(() => {
    if (type === "category") {
      // Fetch stacks for category
      axios
        .get("http://localhost:3000/admin/stack", { headers })
        .then((res) => setParentOptions(res.data))
        .catch((err) => console.error("Error fetching stacks:", err));
    } else if (type === "sub-category") {
      // Fetch categories for sub-category
      axios
        .get("http://localhost:3000/admin/category", { headers })
        .then((res) => setParentOptions(res.data))
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [type]);

  // Fetch item for edit mode
  useEffect(() => {
    if (mode === "edit" && itemId) {
      const fetchItem = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/admin/${type}/${itemId}`,
            { headers }
          );
          setName(res.data.name);
          setCurrentImage(`http://localhost:3000/uploads/${res.data.image}`);
          if (type === "category") setParentId(res.data.stack);
          if (type === "sub-category") setParentId(res.data.category);
        } catch (err) {
          console.error("Error fetching item:", err);
        }
      };
      fetchItem();
    }
  }, [mode, itemId, type]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert("");

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    // Add parentId for category or sub-category
    if (type === "category") formData.append("stack", parentId); // send stack ID
    if (type === "sub-category") formData.append("category", parentId); // send category ID

    const apiUrl =
      mode === "add"
        ? `http://localhost:3000/admin/${type}`
        : `http://localhost:3000/admin/edit/${type}/${itemId}`;

    try {
      if (mode === "add") {
        await axios.post(apiUrl, formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        });
        setAlert(`${type} added successfully!`);
      } else {
        await axios.put(apiUrl, formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        });
        setAlert(`${type} updated successfully!`);
      }
      setTimeout(() => {
        window.location.href = "/admin/dashboard"; // Redirect after success
      }, 1000);
    } catch (err) {
      console.error(err);
      setAlert(`Failed to ${mode} ${type}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <CommonNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Sidebar open={isSidebarOpen} userType="admin" />
        <Box
          component="main"
        sx={{
          flexGrow: 1,
          pt: `${appBarHeight + 24}px`,
          pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
          pr: 4,
          pb: 4,
          backgroundColor: '#f7f9fa',
          minHeight: '100vh',
          transition: 'padding 0.3s ease',
        }}
        >
          <Paper sx={{ p: 4, maxWidth: 500, margin: "auto", borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} mb={3}>
              {mode === "add" ? "Add" : "Edit"}{" "}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                label={`Enter ${type} Name`}
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* Parent Dropdown */}
              {(type === "category" || type === "sub-category") && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>
                    Select {type === "category" ? "Stack" : "Category"}
                  </InputLabel>
                  <Select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    required
                  >
                    {parentOptions.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Current Image in Edit */}
              {mode === "edit" && currentImage && (
                <Box mb={2} textAlign="center">
                  <Typography variant="subtitle2" mb={1}>
                    Current Image:
                  </Typography>
                  <img
                    src={currentImage}
                    alt="Current"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Box>
              )}

              {/* Image Upload */}
              <Box
                sx={{
                  border: "1px dashed #ccc",
                  p: 2,
                  my: 2,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() =>
                  document.getElementById(`${type}ImageUpload`).click()
                }
              >
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  id={`${type}ImageUpload`}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Box>

              {/* Alert */}
              {alert && (
                <Typography
                  color={alert.includes("successfully") ? "green" : "red"}
                  mb={2}
                >
                  {alert}
                </Typography>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : mode === "add" ? (
                  "Add"
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AddForm;





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
