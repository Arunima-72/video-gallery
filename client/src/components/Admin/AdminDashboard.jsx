// import React, { useEffect, useState } from 'react';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const onToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//      const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role'); // Or get from decoded JWT

//     if (!token || userRole !== 'admin') {
//       navigate('/user/login');
//     }
//   }, [navigate]);
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <div className="w-64 bg-white border-r shadow-md">
//           <Sidebar userType="admin" />
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <CommonNav onToggleSidebar={onToggleSidebar} />
        
//         <main className="flex-1 p-6 overflow-y-auto">
//           <h1 className="text-2xl font-semibold mb-4">Welcome Admin Dashboard</h1>
//           {/* Placeholder for content */}
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from 'react';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // initially hidden

//   const onToggleSidebar = () => {
//     setIsSidebarOpen(prev => !prev);
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');

//     if (!token || userRole !== 'admin') {
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Top Navbar */}
//       <CommonNav onToggleSidebar={onToggleSidebar} />

//       {/* Sidebar Drawer */}
//       <Sidebar open={isSidebarOpen} toggleSidebar={onToggleSidebar} userType="admin" />

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
//         <h1 className="text-2xl font-semibold mb-4">Welcome Admin Dashboard</h1>
//         {children}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from 'react';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const onToggleSidebar = () => {
//     setIsSidebarOpen(prev => !prev);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');

//     if (!token || userRole !== 'admin') {
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar open={isSidebarOpen} toggleSidebar={onToggleSidebar} userType="admin" />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Navbar */}
//         <CommonNav onToggleSidebar={onToggleSidebar} />

//         {/* Content */}
//         <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
//           {/* Welcome Card */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex items-center justify-between">
//             <h1 className="text-2xl font-bold">Welcome Admin Dashboard</h1>
//             <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow">
//               Add
//             </button>
//           </div>

//           {/* Page Content */}
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from 'react';//edited dashboard 18/7
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default
//   const navigate = useNavigate();

//   const onToggleSidebar = () => {
//     setIsSidebarOpen(prev => !prev);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');

//     if (!token || userRole !== 'admin') {
//       navigate('/');
//     }
//   }, [navigate]);

//   // Sidebar width in Tailwind units
//   const sidebarWidth = isSidebarOpen ? 60 : 16; // in pixels (MUI uses px not Tailwind units)

//   return (
//     <div>
//       {/* Navbar */}
//       <CommonNav onToggleSidebar={onToggleSidebar} />

//       {/* Sidebar */}
//       <div
//         className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
//         style={{ width: isSidebarOpen ? 240 : 60 }}
//       >
//         <Sidebar open={isSidebarOpen} userType="admin" />
//       </div>

//       {/* Main Content */}
//       <main
//         className="p-6 bg-gray-100 min-h-screen transition-all"
//         style={{
//           marginLeft: isSidebarOpen ? 240 : 60, // Adjust based on sidebar state
//           marginTop: 64 // Navbar height
//         }}
//       >
//         {/* Welcome Card */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Welcome Admin Dashboard</h1>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow">
//             Add
//           </button>
//         </div>

//         {/* Page Content */}
//         {children}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from 'react'; //updated 21/            working
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CardMedia,
//   Box,
// } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

// const API = 'http://localhost:3000/admin';
// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const AdminDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchAll = async () => {
//     try {
//       const [stackRes, catRes, subCatRes] = await Promise.all([
//         axios.get(`${API}/stack`, { headers }),
//         axios.get(`${API}/category`, { headers }),
//         axios.get(`${API}/sub-category`, { headers }),
//       ]);
//       setStacks(Array.isArray(stackRes.data) ? stackRes.data : []);
//       setCategories(Array.isArray(catRes.data) ? catRes.data : []);
//       setSubCategories(Array.isArray(subCatRes.data) ? subCatRes.data : []);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (!token || role !== 'admin') navigate('/');
//     else fetchAll();
//   }, [navigate]);

//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   // const handleAdd = (type) => {                                         // working one  21/7
//   //   switch (type) {
//   //     case 'stack':
//   //       navigate('/admin/add-stack');
//   //       break;
//   //     case 'category':
//   //       navigate('/admin/add-category');
//   //       break;
//   //     case 'sub-category':
//   //       navigate('/admin/add-sub-category');
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   // };


// const handleAdd = (type) => {
//   navigate(`/admin/add/${type}`);
// };



//   const handleViewMore = (type) => alert(`View more ${type}`);

//   const renderSection = (title, items, type) => (
//     <Box mb={6}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight={600}>
//           {title}
//         </Typography>

//         <Box display="flex" alignItems="center" gap={2}>
//           <Button
//             variant="contained"
//             startIcon={<AddCircleIcon />}
//             onClick={() => handleAdd(type)}
//             size="small"
//           >
//             Add
//           </Button>
//           <Button
//             endIcon={<ArrowForwardIcon />}
//             onClick={() => handleViewMore(type)}
//             size="small"
//             sx={{ color: 'primary.main', textTransform: 'none' }}
//           >
//             View More
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//         {Array.isArray(items) && items.length > 0 ? (
//           items.slice(0, 6).map((item) => (
//             <Grid item xs={6} sm={4} md={3} lg={2} key={item._id}>
//               <Card
//                 sx={{
//                   height: 200,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   borderRadius: 2,
//                   boxShadow: 3,
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="120"
//                   image={`http://localhost:3000/uploads/${item.image}`}
//                   alt={item.name}
//                   sx={{ objectFit: 'cover', width: '100%' }}
//                 />
//                 <CardContent
//                   sx={{
//                     flexGrow: 1,
//                     textAlign: 'center',
//                     p: 1,
//                     height: 80,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     fontWeight={500}
//                     textAlign="center"
//                     noWrap
//                     sx={{ width: '100%' }}
//                   >
//                     {item.name}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body2" color="text.secondary" ml={2}>
//             No {title.toLowerCase()} found.
//           </Typography>
//         )}
//       </Grid>
//     </Box>
//   );

//   return (
//     <Box>
//       <CommonNav onToggleSidebar={onToggleSidebar} />

//       <Box
//         className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
//         sx={{ width: isSidebarOpen ? 240 : 60 }}
//       >
//         <Sidebar open={isSidebarOpen} userType="admin" />
//       </Box>

//       <Box
//         component="main"
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
//       >
//         <Box
//           sx={{
//             backgroundColor: '#fff',
//             p: 3,
//             mb: 4,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight={700}>
//             Welcome Admin Dashboard
//           </Typography>
//         </Box>

//         {renderSection('Stacks', stacks, 'stack')}
//         {renderSection('Categories', categories, 'category')}
//         {renderSection('Sub-Categories', subCategories, 'sub-category')}

//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CardMedia,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const API = 'http://localhost:3000/admin';
// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const AdminDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchAll = async () => {
//     try {
//       const [stackRes, catRes, subCatRes] = await Promise.all([
//         axios.get(`${API}/stack`, { headers }),
//         axios.get(`${API}/category`, { headers }),
//         axios.get(`${API}/sub-category`, { headers }),
//       ]);
//       setStacks(Array.isArray(stackRes.data) ? stackRes.data : []);
//       setCategories(Array.isArray(catRes.data) ? catRes.data : []);
//       setSubCategories(Array.isArray(subCatRes.data) ? subCatRes.data : []);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (!token || role !== 'admin') navigate('/');
//     else fetchAll();
//   }, [navigate]);

//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const handleAdd = (type) => {
//     navigate(`/admin/add/${type}`);
//   };

//   const handleViewMore = (type) => alert(`View more ${type}`);

//   const handleMenuOpen = (event, item, type) => {
//     setMenuAnchor(event.currentTarget);
//     setSelectedItem({ ...item, type });
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//     setSelectedItem(null);
//   };

//   const handleDelete = async () => {
//     if (!selectedItem) return;

//     const { _id, type } = selectedItem;
//     try {
//       await axios.delete(`${API}/${type}/${_id}`, { headers });
//       if (type === 'stack') {
//         setStacks((prev) => prev.filter((item) => item._id !== _id));
//       } else if (type === 'category') {
//         setCategories((prev) => prev.filter((item) => item._id !== _id));
//       } else if (type === 'sub-category') {
//         setSubCategories((prev) => prev.filter((item) => item._id !== _id));
//       }
//     } catch (err) {
//       console.error(`Error deleting ${type}:`, err);
//     }
//     handleMenuClose();
//   };

//   const renderSection = (title, items, type) => (
//     <Box mb={6}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight={600}>
//           {title}
//         </Typography>

//         <Box display="flex" alignItems="center" gap={2}>
//           <Button
//             variant="contained"
//             startIcon={<AddCircleIcon />}
//             onClick={() => handleAdd(type)}
//             size="small"
//           >
//             Add
//           </Button>
//           <Button
//             endIcon={<ArrowForwardIcon />}
//             onClick={() => handleViewMore(type)}
//             size="small"
//             sx={{ color: 'primary.main', textTransform: 'none' }}
//           >
//             View More
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//         {Array.isArray(items) && items.length > 0 ? (
//           items.slice(0, 6).map((item) => (
//             <Grid item xs={6} sm={4} md={3} lg={2} key={item._id}>
//               <Card
//                 sx={{
//                   height: 200,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   borderRadius: 2,
//                   boxShadow: 3,
//                   position: 'relative',
//                 }}
//               >
//                 <IconButton
//                   sx={{ position: 'absolute', top: 5, right: 5 }}
//                   onClick={(event) => handleMenuOpen(event, item, type)}
//                 >
//                   <MoreVertIcon />
//                 </IconButton>

//                 <CardMedia
//                   component="img"
//                   height="120"
//                   image={`http://localhost:3000/uploads/${item.image}`}
//                   alt={item.name}
//                   sx={{ objectFit: 'cover', width: '100%' }}
//                 />
//                 <CardContent
//                   sx={{
//                     flexGrow: 1,
//                     textAlign: 'center',
//                     p: 1,
//                     height: 80,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     fontWeight={500}
//                     textAlign="center"
//                     noWrap
//                     sx={{ width: '100%' }}
//                   >
//                     {item.name}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body2" color="text.secondary" ml={2}>
//             No {title.toLowerCase()} found.
//           </Typography>
//         )}
//       </Grid>
//     </Box>
//   );

//   return (
//     <Box>
//       <CommonNav onToggleSidebar={onToggleSidebar} />

//       <Box
//         className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
//         sx={{ width: isSidebarOpen ? 240 : 60 }}
//       >
//         <Sidebar open={isSidebarOpen} userType="admin" />
//       </Box>

//       <Box
//         component="main"
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
//       >
//         <Box
//           sx={{
//             backgroundColor: '#fff',
//             p: 3,
//             mb: 4,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight={700}>
//             Welcome Admin Dashboard
//           </Typography>
//         </Box>

//         {renderSection('Stacks', stacks, 'stack')}
//         {renderSection('Categories', categories, 'category')}
//         {renderSection('Sub-Categories', subCategories, 'sub-category')}

//         {children}

//         {/* Menu for 3-dot options */}
//         <Menu
//           anchorEl={menuAnchor}
//           open={Boolean(menuAnchor)}
//           onClose={handleMenuClose}
//           anchorOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//         >
//           <MenuItem onClick={handleDelete}>Delete</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;


// import React, { useEffect, useState } from 'react';                                 // last edited
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CardMedia,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const API = 'http://localhost:3000/admin';
// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const AdminDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchAll = async () => {
//     try {
//       const [stackRes, catRes, subCatRes] = await Promise.all([
//         axios.get(`${API}/stack`, { headers }),
//         axios.get(`${API}/category`, { headers }),
//         axios.get(`${API}/sub-category`, { headers }),
//       ]);
//       setStacks(Array.isArray(stackRes.data) ? stackRes.data : []);
//       setCategories(Array.isArray(catRes.data) ? catRes.data : []);
//       setSubCategories(Array.isArray(subCatRes.data) ? subCatRes.data : []);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (!token || role !== 'admin') navigate('/');
//     else fetchAll();
//   }, [navigate]);

//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const handleAdd = (type) => {
//     navigate(`/admin/add/${type}`);
//   };

//   const handleViewMore = (type) => alert(`View more ${type}`);

//   const handleMenuOpen = (event, item, type) => {
//     setMenuAnchor(event.currentTarget);
//     setSelectedItem({ ...item, type });
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//     setSelectedItem(null);
//   };

//   const handleDelete = async () => {
//     if (!selectedItem) return;

//     const { _id, type } = selectedItem;
//     const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${API}/${type}/${_id}`, { headers });
//       if (type === 'stack') {
//         setStacks((prev) => prev.filter((s) => s._id !== _id));
//       } else if (type === 'category') {
//         setCategories((prev) => prev.filter((c) => c._id !== _id));
//       } else if (type === 'sub-category') {
//         setSubCategories((prev) => prev.filter((sc) => sc._id !== _id));
//       }
//     } catch (err) {
//       console.error(`Error deleting ${type}:`, err);
//     }
//     handleMenuClose();
//   };

//   const handleEdit = () => {
//     if (!selectedItem) return;
//     const { _id, type } = selectedItem;
//     navigate(`/admin/edit/${type}/${_id}`);
//     handleMenuClose();
//   };

//   const renderSection = (title, items, type) => (
//     <Box mb={6}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight={600}>
//           {title}
//         </Typography>

//         <Box display="flex" alignItems="center" gap={2}>
//           <Button
//             variant="contained"
//             startIcon={<AddCircleIcon />}
//             onClick={() => handleAdd(type)}
//             size="small"
//           >
//             Add
//           </Button>
//           <Button
//             endIcon={<ArrowForwardIcon />}
//             onClick={() => handleViewMore(type)}
//             size="small"
//             sx={{ color: 'primary.main', textTransform: 'none' }}
//           >
//             View More
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//         {Array.isArray(items) && items.length > 0 ? (
//           items.slice(0, 6).map((item) => (
//             <Grid item xs={6} sm={4} md={3} lg={2} key={item._id}>
//               <Card
//                 sx={{
//                   height: 200,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   borderRadius: 2,
//                   boxShadow: 3,
//                   position: 'relative',
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="120"
//                   image={`http://localhost:3000/uploads/${item.image}`}
//                   alt={item.name}
//                   sx={{ objectFit: 'cover', width: '100%' }}
//                 />
//                 <CardContent
//                   sx={{
//                     flexGrow: 1,
//                     textAlign: 'center',
//                     p: 1,
//                     height: 80,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     position: 'relative',
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     fontWeight={500}
//                     textAlign="center"
//                     noWrap
//                     sx={{ width: '100%' }}
//                   >
//                     {item.name}
//                   </Typography>

//                   {/* 3-dot menu at bottom-right */}
//                   <IconButton
//                     sx={{
//                       position: 'absolute',
//                       bottom: 4,
//                       right: 4,
//                       backgroundColor: '#f5f5f5',
//                       '&:hover': { backgroundColor: '#e0e0e0' },
//                     }}
//                     onClick={(event) => handleMenuOpen(event, item, type)}
//                   >
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body2" color="text.secondary" ml={2}>
//             No {title.toLowerCase()} found.
//           </Typography>
//         )}
//       </Grid>
//     </Box>
//   );

//   return (
//     <Box>
//       <CommonNav onToggleSidebar={onToggleSidebar} />

//       <Box
//         className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
//         sx={{ width: isSidebarOpen ? 240 : 60 }}
//       >
//         <Sidebar open={isSidebarOpen} userType="admin" />
//       </Box>

//       <Box
//         component="main"
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
//       >
//         <Box
//           sx={{
//             backgroundColor: '#fff',
//             p: 3,
//             mb: 4,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight={700}>
//             Welcome Admin Dashboard
//           </Typography>
//         </Box>

//         {renderSection('Stacks', stacks, 'stack')}
//         {renderSection('Categories', categories, 'category')}
//         {renderSection('Sub-Categories', subCategories, 'sub-category')}

//         {children}

//         {/* Menu for 3-dot options */}
//         <Menu
//           anchorEl={menuAnchor}
//           open={Boolean(menuAnchor)}
//           onClose={handleMenuClose}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//         >
//           <MenuItem onClick={handleEdit}>
//             <ListItemIcon>
//               <EditIcon fontSize="small" />
//             </ListItemIcon>
//             <ListItemText>Edit</ListItemText>
//           </MenuItem>
//           <MenuItem onClick={handleDelete}>
//             <ListItemIcon>
//               <DeleteIcon fontSize="small" color="error" />
//             </ListItemIcon>
//             <ListItemText>Delete</ListItemText>
//           </MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from 'react';                      // current working one
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CardMedia,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const API = 'http://localhost:3000/admin';
// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const AdminDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Track which sections are expanded
//   const [showAll, setShowAll] = useState({
//     stack: false,
//     category: false,
//     'sub-category': false,
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchAll = async () => {
//     try {
//       const [stackRes, catRes, subCatRes] = await Promise.all([
//         axios.get(`${API}/stack`, { headers }),
//         axios.get(`${API}/category`, { headers }),
//         axios.get(`${API}/sub-category`, { headers }),
//       ]);
//       setStacks(Array.isArray(stackRes.data) ? stackRes.data : []);
//       setCategories(Array.isArray(catRes.data) ? catRes.data : []);
//       setSubCategories(Array.isArray(subCatRes.data) ? subCatRes.data : []);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (!token || role !== 'admin') navigate('/');
//     else fetchAll();
//   }, [navigate]);

//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const handleAdd = (type) => {
//     navigate(`/admin/add/${type}`);
//   };

//   const handleToggleShowAll = (type) => {
//     setShowAll((prev) => ({
//       ...prev,
//       [type]: !prev[type],
//     }));
//   };

//   const handleMenuOpen = (event, item, type) => {
//     setMenuAnchor(event.currentTarget);
//     setSelectedItem({ ...item, type });
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//     setSelectedItem(null);
//   };

//   const handleDelete = async () => {
//     if (!selectedItem) return;
//     const { _id, type } = selectedItem;
//     const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${API}/${type}/${_id}`, { headers });
//       if (type === 'stack') setStacks((prev) => prev.filter((s) => s._id !== _id));
//       if (type === 'category') setCategories((prev) => prev.filter((c) => c._id !== _id));
//       if (type === 'sub-category') setSubCategories((prev) => prev.filter((sc) => sc._id !== _id));
//     } catch (err) {
//       console.error(`Error deleting ${type}:`, err);
//     }
//     handleMenuClose();
//   };

//   const handleEdit = () => {
//     if (!selectedItem) return;
//     const { _id, type } = selectedItem;
//     navigate(`/admin/edit/${type}/${_id}`);
//     handleMenuClose();
//   };

//   const renderSection = (title, items, type) => (
//     <Box mb={6}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight={600}>
//           {title}
//         </Typography>
//         <Box display="flex" alignItems="center" gap={2}>
//           <Button
//             variant="contained"
//             startIcon={<AddCircleIcon />}
//             onClick={() => handleAdd(type)}
//             size="small"
//           >
//             Add
//           </Button>
//           <Button
//             endIcon={<ArrowForwardIcon />}
//             onClick={() => handleToggleShowAll(type)}
//             size="small"
//             sx={{ color: 'primary.main', textTransform: 'none' }}
//           >
//             {showAll[type] ? 'Show Less' : 'View More'}
//           </Button>
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           display: 'flex',
//           gap: 2,
//           overflowX: showAll[type] ? 'auto' : 'hidden',
//           flexWrap: showAll[type] ? 'nowrap' : 'wrap',
//         }}
//       >
//         {Array.isArray(items) && items.length > 0 ? (
//           (showAll[type] ? items : items.slice(0, 6)).map((item) => (
//             <Card
//               key={item._id}
//               sx={{
//                 width: 160,
//                 minWidth: 160,
//                 height: 215,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 position: 'relative',
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="120"
//                 image={`http://localhost:3000/uploads/${item.image}`}
//                 alt={item.name}
//                 sx={{ objectFit: 'cover', width: '100%' }}
//               />
//               <CardContent
//                 sx={{
//                   flexGrow: 1,
//                   textAlign: 'center',
//                   p: 1,
//                   height: 80,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   position: 'relative',
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   fontWeight={500}
//                   textAlign="center"
//                   noWrap
//                   sx={{ width: '100%' }}
//                 >
//                   {item.name}
//                 </Typography>
//                 <IconButton
//                   sx={{
//                     position: 'absolute',
//                     bottom: 4,
//                     right: 4,
//                     backgroundColor: '#f5f5f5',
//                     '&:hover': { backgroundColor: '#e0e0e0' },
//                   }}
//                   onClick={(event) => handleMenuOpen(event, item, type)}
//                 >
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography variant="body2" color="text.secondary" ml={2}>
//             No {title.toLowerCase()} found.
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );

//   return (
//     <Box>
//       <CommonNav onToggleSidebar={onToggleSidebar} />
//       <Box
//         className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
//         sx={{ width: isSidebarOpen ? drawerWidthOpen : drawerWidthClosed }}
//       >
//         <Sidebar open={isSidebarOpen} userType="admin" />
//       </Box>

//       <Box
//         component="main"
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
//       >
//         <Box
//           sx={{
//             backgroundColor: '#fff',
//             p: 3,
//             mb: 4,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight={700}>
//             Welcome Admin Dashboard
//           </Typography>
//         </Box>

//         {renderSection('Stacks', stacks, 'stack')}
//         {renderSection('Categories', categories, 'category')}
//         {renderSection('Sub-Categories', subCategories, 'sub-category')}

//         {children}

//         {/* 3-dot menu */}
//         <Menu
//           anchorEl={menuAnchor}
//           open={Boolean(menuAnchor)}
//           onClose={handleMenuClose}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//           <MenuItem onClick={handleEdit}>
//             <ListItemIcon>
//               <EditIcon fontSize="small" />
//             </ListItemIcon>
//             <ListItemText>Edit</ListItemText>
//           </MenuItem>
//           <MenuItem onClick={handleDelete}>
//             <ListItemIcon>
//               <DeleteIcon fontSize="small" color="error" />
//             </ListItemIcon>
//             <ListItemText>Delete</ListItemText>
//           </MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const API = 'http://localhost:3000/admin';
// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   // Fetch stacks, categories, sub-categories
//   const fetchAll = async () => {
//     try {
//       const [stackRes, catRes, subCatRes] = await Promise.all([
//         axios.get(`${API}/stack`, { headers }),
//         axios.get(`${API}/category`, { headers }),
//         axios.get(`${API}/sub-category`, { headers }),
//       ]);
//       setStacks(Array.isArray(stackRes.data) ? stackRes.data : []);
//       setCategories(Array.isArray(catRes.data) ? catRes.data : []);
//       setSubCategories(Array.isArray(subCatRes.data) ? subCatRes.data : []);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (!token || role !== 'admin') navigate('/');
//     else fetchAll();
//   }, [navigate]);

//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const handleAdd = (type) => {
//     navigate(`/admin/add/${type}`);
//   };

//   const handleMenuOpen = (event, item, type) => {
//     setMenuAnchor(event.currentTarget);
//     setSelectedItem({ ...item, type });
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//     setSelectedItem(null);
//   };

//   const handleEdit = () => {
//     if (!selectedItem) return;
//     const { _id, type } = selectedItem;
//     navigate(`/admin/edit/${type}/${_id}`);
//     handleMenuClose();
//   };

//   const handleDelete = async () => {
//     if (!selectedItem) return;

//     const { _id, type } = selectedItem;
//     const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${API}/${type}/${_id}`, { headers });
//       if (type === 'stack') {
//         setStacks((prev) => prev.filter((s) => s._id !== _id));
//       } else if (type === 'category') {
//         setCategories((prev) => prev.filter((c) => c._id !== _id));
//       } else if (type === 'sub-category') {
//         setSubCategories((prev) => prev.filter((sc) => sc._id !== _id));
//       }
//     } catch (err) {
//       console.error(`Error deleting ${type}:`, err);
//     }
//     handleMenuClose();
//   };

//   const renderSection = (title, items, type) => {
//     const scrollRef = useRef(null);

//     const scrollRight = () => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollBy({
//           left: 300, // Adjust scroll distance
//           behavior: 'smooth',
//         });
//       }
//     };

//     return (
//       <Box mb={6}>
//         {/* Section Header */}
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h6" fontWeight={600}>
//             {title}
//           </Typography>

//           <Box display="flex" alignItems="center" gap={2}>
//             <Button
//               variant="contained"
//               startIcon={<AddCircleIcon />}
//               onClick={() => handleAdd(type)}
//               size="small"
//             >
//               Add
//             </Button>
//             <Button
//               endIcon={<ArrowForwardIcon />}
//               onClick={scrollRight}
//               size="small"
//               sx={{ color: 'primary.main', textTransform: 'none' }}
//             >
//               View More
//             </Button>
//           </Box>
//         </Box>

//         {/* Horizontal Scrollable Cards */}
//         <Box
//           ref={scrollRef}
//           sx={{
//             display: 'flex',
//             overflowX: 'auto',
//             gap: 2,
//             pb: 1,
//             "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
//             scrollbarWidth: "none", // Firefox
//           }}
//         >
//           {Array.isArray(items) && items.length > 0 ? (
//             items.map((item) => (
//               <Card
//                 key={item._id}
//                 sx={{
//                   width: 160,
//                   minWidth: 160,
//                   height: 220,
//                   flexShrink: 0,
//                   borderRadius: 2,
//                   boxShadow: 3,
//                   position: 'relative',
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="120"
//                   image={`http://localhost:3000/uploads/${item.image}`}
//                   alt={item.name}
//                   sx={{ objectFit: 'cover', width: '100%' }}
//                 />
//                 <CardContent
//                   sx={{
//                     textAlign: 'center',
//                     p: 1,
//                     height: 100,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     position: 'relative',
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     fontWeight={500}
//                     textAlign="center"
//                     noWrap
//                   >
//                     {item.name}
//                   </Typography>

//                   {/* 3-dot Menu Button */}
//                   <IconButton
//                     sx={{
//                       position: 'absolute',
//                       bottom: 4,
//                       right: 4,
//                       backgroundColor: '#f5f5f5',
//                       '&:hover': { backgroundColor: '#e0e0e0' },
//                     }}
//                     onClick={(event) => handleMenuOpen(event, item, type)}
//                   >
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>

                  
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary" ml={2}>
//               No {title.toLowerCase()} found.
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     );
//   };

//   return (
//     <Box>
//       {/* Navbar */}
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
//           pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
//           pr: 4,
//           pb: 4,
//           backgroundColor: '#f7f9fa',
//           minHeight: '100vh',
//           transition: 'padding 0.3s ease',
//         }}
//       >
//         {/* Dashboard Title */}
//         <Box
//           sx={{
//             backgroundColor: '#fff',
//             p: 3,
//             mb: 4,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight={700}>
//             Welcome Admin Dashboard
//           </Typography>
//         </Box>

//         {/* Sections */}
//         {renderSection('Stacks', stacks, 'stack')}
//         {renderSection('Categories', categories, 'category')}
//         {renderSection('Sub-Categories', subCategories, 'sub-category')}

//         {/* 3-dot Menu */}
//         <Menu
//           anchorEl={menuAnchor}
//           open={Boolean(menuAnchor)}
//           onClose={handleMenuClose}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//           <MenuItem onClick={handleEdit}>
//             <ListItemIcon>
//               <EditIcon fontSize="small" />
//             </ListItemIcon>
//             <ListItemText>Edit</ListItemText>
//           </MenuItem>
//           <MenuItem onClick={handleDelete}>
//             <ListItemIcon>
//               <DeleteIcon fontSize="small" color="error" />
//             </ListItemIcon>
//             <ListItemText>Delete</ListItemText>
//           </MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const API = 'http://localhost:3000/admin';
// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [stacks, setStacks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchAll = async () => {
//     try {
//       const [stackRes, catRes, subCatRes] = await Promise.all([
//         axios.get(`${API}/stack`, { headers }),
//         axios.get(`${API}/category`, { headers }),
//         axios.get(`${API}/sub-category`, { headers }),
//       ]);
//       setStacks(Array.isArray(stackRes.data) ? stackRes.data : []);
//       setCategories(Array.isArray(catRes.data) ? catRes.data : []);
//       setSubCategories(Array.isArray(subCatRes.data) ? subCatRes.data : []);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (!token || role !== 'admin') navigate('/');
//     else fetchAll();
//   }, [navigate]);

//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const handleAdd = (type) => {
//     navigate(`/admin/add/${type}`);
//   };

//   const handleMenuOpen = (event, item, type) => {
//     setMenuAnchor(event.currentTarget);
//     setSelectedItem({ ...item, type });
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//     setSelectedItem(null);
//   };

//   const handleEdit = () => {
//     if (!selectedItem) return;
//     const { _id, type } = selectedItem;
//     navigate(`/admin/edit/${type}/${_id}`);
//     handleMenuClose();
//   };

//   const handleDelete = async () => {
//     if (!selectedItem) return;
//     const { _id, type } = selectedItem;
//     const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${API}/${type}/${_id}`, { headers });
//       if (type === 'stack') setStacks((prev) => prev.filter((s) => s._id !== _id));
//       else if (type === 'category') setCategories((prev) => prev.filter((c) => c._id !== _id));
//       else if (type === 'sub-category') setSubCategories((prev) => prev.filter((sc) => sc._id !== _id));
//     } catch (err) {
//       console.error(`Error deleting ${type}:`, err);
//     }
//     handleMenuClose();
//   };

//   const renderSection = (title, items, type) => {
//     const scrollRef = useRef(null);

//     const scrollRight = () => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollBy({
//           left: 300,
//           behavior: 'smooth',
//         });
//       }
//     };

//     return (
//       <Box mb={6}>
//         {/* Section Header */}
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h6" fontWeight={600}>
//             {title}
//           </Typography>

//           <Box display="flex" alignItems="center" gap={2}>
//             <Button
//               variant="contained"
//               startIcon={<AddCircleIcon />}
//               onClick={() => handleAdd(type)}
//               size="small"
//             >
//               Add
//             </Button>
//             <Button
//               endIcon={<ArrowForwardIcon />}
//               onClick={scrollRight}
//               size="small"
//               sx={{ color: 'primary.main', textTransform: 'none' }}
//             >
//               View More
//             </Button>
//           </Box>
//         </Box>

//         {/* Horizontal Scrollable Cards */}
//         <Box
//           ref={scrollRef}
//           sx={{
//             display: 'flex',
//             overflowX: 'auto',
//             gap: 2,
//             pb: 1,
//             "&::-webkit-scrollbar": { display: "none" },
//             scrollbarWidth: "none",
//           }}
//         >
//           {Array.isArray(items) && items.length > 0 ? (
//             items.map((item) => (
//               <Card
//                 key={item._id}
//                 sx={{
//                   width: 160,
//                   minWidth: 160,
//                   height: 180,
//                   flexShrink: 0,
//                   borderRadius: 2,
//                   boxShadow: 3,
//                   position: 'relative',
//                 }}
//               >
//                 {/* Image */}
//                 <CardMedia
//                   component="img"
//                   height="100"
//                   image={`http://localhost:3000/uploads/${item.image}`}
//                   alt={item.name}
//                   sx={{ objectFit: 'cover', width: '100%' }}
//                 />

//                 {/* Name and 3-dots */}
//                 <CardContent
//                   sx={{
//                     textAlign: 'center',
//                     p: 1,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     position: 'relative',
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     fontWeight={500}
//                     noWrap
//                     sx={{ maxWidth: '80%' }}
//                   >
//                     {item.name}
//                   </Typography>

//                   {/* 3-dot Menu */}
//                   <IconButton
//                     size="small"
//                     onClick={(event) => handleMenuOpen(event, item, type)}
//                     sx={{
//                       backgroundColor: '#f5f5f5',
//                       '&:hover': { backgroundColor: '#e0e0e0' },
//                     }}
//                   >
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary" ml={2}>
//               No {title.toLowerCase()} found.
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     );
//   };

//   return (
//     <Box>
//       {/* Navbar */}
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
//           pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
//           pr: 4,
//           pb: 4,
//           backgroundColor: '#f7f9fa',
//           minHeight: '100vh',
//           transition: 'padding 0.3s ease',
//         }}
//       >
//         {/* Dashboard Title */}
//         <Box
//           sx={{
//             backgroundColor: '#fff',
//             p: 3,
//             mb: 4,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight={700}>
//             Welcome 
//           </Typography>
//         </Box>

//         {/* Sections */}
//         {renderSection('Stacks', stacks, 'stack')}
//         {renderSection('Categories', categories, 'category')}
//         {renderSection('Sub-Categories', subCategories, 'sub-category')}

//         {/* 3-dot Menu */}
//         <Menu
//           anchorEl={menuAnchor}
//           open={Boolean(menuAnchor)}
//           onClose={handleMenuClose}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//           <MenuItem onClick={handleEdit}>
//             <ListItemIcon>
//               <EditIcon fontSize="small" />
//             </ListItemIcon>
//             <ListItemText>Edit</ListItemText>
//           </MenuItem>
//           <MenuItem onClick={handleDelete}>
//             <ListItemIcon>
//               <DeleteIcon fontSize="small" color="error" />
//             </ListItemIcon>
//             <ListItemText>Delete</ListItemText>
//           </MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import CommonNav from '../CommonNav';
import Sidebar from '../Sidebar';
import AddForm from './AddForm'; // import the form component

const API = 'http://localhost:3000/admin';
const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const appBarHeight = 64;

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stacks, setStacks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [dialogType, setDialogType] = useState('stack');
  const [editItemId, setEditItemId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    try {
      const [stackRes, catRes, subCatRes] = await Promise.all([
        axios.get(`${API}/stack`, { headers }),
        axios.get(`${API}/category`, { headers }),
        axios.get(`${API}/sub-category`, { headers }),
      ]);
      setStacks(stackRes.data || []);
      setCategories(catRes.data || []);
      setSubCategories(subCatRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') navigate('/');
    else fetchAll();
  }, [navigate]);

  const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAdd = (type) => {
    setDialogMode('add');
    setDialogType(type);
    setEditItemId(null);
    setDialogOpen(true);
  };

  const handleEdit = () => {
    if (!selectedItem) return;
    setDialogMode('edit');
    setDialogType(selectedItem.type);
    setEditItemId(selectedItem._id);
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    const { _id, type } = selectedItem;
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${type}/${_id}`, { headers });
      fetchAll(); // reload list
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
    handleMenuClose();
  };

  const handleMenuOpen = (event, item, type) => {
    setMenuAnchor(event.currentTarget);
    setSelectedItem({ ...item, type });
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedItem(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTimeout(() => fetchAll(), 500); // refresh list
  };

  const renderSection = (title, items, type) => {
    const scrollRef = useRef(null);
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    return (
      <Box mb={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600} style={{fontFamily:'Poppins'}}>{title}</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="contained"  sx={{
    fontFamily: 'Poppins',
    color: '"#41596eff"',  }} startIcon={<AddCircleIcon />} size="small" onClick={() => handleAdd(type)}>
              Add
            </Button>
            <Button endIcon={<ArrowForwardIcon />} onClick={scrollRight} size="small">
              View More
            </Button>
          </Box>
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            pb: 1,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {items.length > 0 ? items.map((item) => (
            <Card key={item._id}
              sx={{ width: 200, minWidth: 160, height: 180, flexShrink: 0, borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000/uploads/${item.image}`}
                alt={item.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent
                sx={{
                  textAlign: 'center',
                  p: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2"  style={{fontFamily:'Poppins'}} fontWeight={500} noWrap sx={{ maxWidth: '80%' }}>
                  {item.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(event) => handleMenuOpen(event, item, type)}
                  sx={{ backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          )) : (
            <Typography variant="body2" ml={2}>No {title.toLowerCase()} found.</Typography>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <CommonNav onToggleSidebar={onToggleSidebar} />
      <Box
        className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
        sx={{ width: isSidebarOpen ? drawerWidthOpen : drawerWidthClosed }}
      >
        <Sidebar open={isSidebarOpen} userType="admin" />
      </Box>

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
        {/* <Box sx={{ backgroundColor: '#fff', p: 3, mb: 4, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h5" fontWeight={700}>Welcome</Typography>
        </Box> */}

        {renderSection('Stacks', stacks, 'stack')}
        {renderSection('Categories', categories, 'category')}
        {renderSection('Sub-Categories', subCategories, 'sub-category')}

        {/* Menu for Edit/Delete */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>

        {/* Form Dialog for Add/Edit */}
        <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
  <DialogContent>
    <AddForm
      type={dialogType}
      mode={dialogMode}
      itemId={editItemId}
      onSuccess={handleDialogClose}
    />
  </DialogContent>
</Dialog>

        {/* <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>{dialogMode === 'add' ? `Add ${dialogType}` : `Edit ${dialogType}`}</DialogTitle>
          <DialogContent>
            <AddForm
              type={dialogType}
              mode={dialogMode}
              itemId={editItemId}
              onSuccess={handleDialogClose}
            />
          </DialogContent>
        </Dialog> */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
