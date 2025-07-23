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

import React, { useEffect, useState } from 'react'; //updated 21/7
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonNav from '../CommonNav';
import Sidebar from '../Sidebar';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const API = 'http://localhost:3000/admin';
const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const appBarHeight = 64;

const AdminDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stacks, setStacks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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
      setStacks(Array.isArray(stackRes.data) ? stackRes.data : []);
      setCategories(Array.isArray(catRes.data) ? catRes.data : []);
      setSubCategories(Array.isArray(subCatRes.data) ? subCatRes.data : []);
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
    switch (type) {
      case 'stack':
        navigate('/admin/add-stack');
        break;
      case 'category':
        navigate('/admin/add-category');
        break;
      case 'sub-category':
        navigate('/admin/add-sub-category');
        break;
      default:
        break;
    }
  };

  const handleViewMore = (type) => alert(`View more ${type}`);

  const renderSection = (title, items, type) => (
    <Box mb={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => handleAdd(type)}
            size="small"
          >
            Add
          </Button>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => handleViewMore(type)}
            size="small"
            sx={{ color: 'primary.main', textTransform: 'none' }}
          >
            View More
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {Array.isArray(items) && items.length > 0 ? (
          items.slice(0, 6).map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item._id}>
              <Card
                sx={{
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={`http://localhost:3000/uploads/${item.image}`}
                  alt={item.name}
                  sx={{ objectFit: 'cover', width: '100%' }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                    p: 1,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    textAlign="center"
                    noWrap
                    sx={{ width: '100%' }}
                  >
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" ml={2}>
            No {title.toLowerCase()} found.
          </Typography>
        )}
      </Grid>
    </Box>
  );

  return (
    <Box>
      <CommonNav onToggleSidebar={onToggleSidebar} />

      <Box
        className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
        sx={{ width: isSidebarOpen ? 240 : 60 }}
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
        <Box
          sx={{
            backgroundColor: '#fff',
            p: 3,
            mb: 4,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Welcome 
          </Typography>
        </Box>

        {renderSection('Stacks', stacks, 'stack')}
        {renderSection('Categories', categories, 'category')}
        {renderSection('Sub-Categories', subCategories, 'sub-category')}

        {children}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
