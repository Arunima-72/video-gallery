
// // import React, { useEffect, useState } from 'react';
// // import CommonNav from '../CommonNav';
// // import Sidebar from '../Sidebar';
// // import { useNavigate } from 'react-router-dom';

// // const UserDashboard = ({ children }) => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar initially hidden

// //   const onToggleSidebar = () => {
// //     setIsSidebarOpen(prev => !prev);
// //   };

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     const userRole = localStorage.getItem('role');

// //     if (!token || userRole !== 'user') {
// //       navigate('/');
// //     }
// //   }, [navigate]);

// //   return (
// //     <div className="flex flex-col h-screen">
// //       {/* Top Navbar */}
// //       <CommonNav onToggleSidebar={onToggleSidebar} />

// //       {/* Sidebar Drawer */}
// //       <Sidebar open={isSidebarOpen} toggleSidebar={onToggleSidebar} userType="user" />

// //       {/* Main Content */}
// //       <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
// //         <h1 className="text-2xl font-semibold mb-4">Welcome User Dashboard</h1>
// //         {children}
// //       </main>
// //     </div>
// //   );
// // };

// // export default UserDashboard;
// import React, { useEffect, useState } from 'react';
// import CommonNav from '../CommonNav';
// import Sidebar from '../Sidebar';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Stack
// } from '@mui/material';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const appBarHeight = 64;

// const UserDashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [videos, setVideos] = useState([]);
//   const navigate = useNavigate();

//   const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');

//     if (!token || userRole !== 'user') {
//       navigate('/');
//     }

//     // Simulate no videos found
//     setVideos([]);
//   }, [navigate]);

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
//       {/* Navbar */}
//       <CommonNav onToggleSidebar={onToggleSidebar} />

//       {/* Sidebar */}
//       <Sidebar open={isSidebarOpen} userType="user" />

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           pt: `calc(${appBarHeight}px + 16px)`,
//           ml: isSidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin-left 0.3s',
//           backgroundColor: '#f7f9fa',
//           minHeight: '100vh',
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" mb={3}>
//           Welcome to Your Dashboard
//         </Typography>

//         {/* Search & Filter Section */}
//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
//           <TextField
//             label="Search videos"
//             variant="outlined"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{ flexGrow: 1 }}
//           />
//           <Button variant="outlined" color="primary">
//             All
//           </Button>
//           <Button variant="contained" color="success">
//             Stack
//           </Button>
//         </Stack>

//         {/* Video Results */}
//         {videos.length === 0 ? (
//           <Typography variant="subtitle1" color="text.secondary">
//             🔍 No videos found.
//           </Typography>
//         ) : (
//           <Box>{/* Display videos here */}</Box>
//         )}

//         {/* Injected Page Content */}
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default UserDashboard;

import React, { useEffect, useState } from 'react';//updated dashboard 20/7
import CommonNav from '../CommonNav';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Collapse,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const appBarHeight = 64;

const UserDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [stacks, setStacks] = useState([]);
  const [showStacks, setShowStacks] = useState(false);
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const name = localStorage.getItem('username') || 'User';

    if (!token || userRole !== 'user') {
      navigate('/');
    }

    setUsername(name);

    // Simulate fetching videos/stacks (replace with real APIs)
    setVideos([]); // e.g., fetch('/api/videos')
    setStacks([]); // e.g., fetch('/api/stacks')
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <CommonNav onToggleSidebar={onToggleSidebar} />

      {/* Sidebar */}
      <Sidebar open={isSidebarOpen} userType="user" />

      {/* Main Content */}
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
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: 2,
        }}
      >
        {/* Welcome Message */}
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Welcome {username}
        </Typography>

        {/* Search Bar */}
        <TextField
          placeholder="Search videos..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: '100%',
            maxWidth: 400,
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            },
          }}
        />

        {/* Filter Buttons */}
        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant={!showStacks ? 'contained' : 'outlined'}
            onClick={() => setShowStacks(false)}
          >
            All
          </Button>
          <Button
            variant={showStacks ? 'contained' : 'outlined'}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={() => setShowStacks((prev) => !prev)}
          >
            Stack
          </Button>
        </Stack>

        {/* Conditional Content */}
        <Collapse in={showStacks}>
          {stacks.length > 0 ? (
            <Stack spacing={1}>
              {stacks.map((stack, index) => (
                <Typography key={index}>{stack}</Typography>
              ))}
            </Stack>
          ) : (
            <Typography>No stacks found</Typography>
          )}
        </Collapse>

        {!showStacks && (
          videos.length > 0 ? (
            <Stack spacing={1}>
              {videos.map((video, index) => (
                <Typography key={index}>{video.title}</Typography>
              ))}
            </Stack>
          ) : (
            <Typography>No videos found</Typography>
          )
        )}

        {/* Extra content */}
        {children}
      </Box>
    </Box>
  );
};

export default UserDashboard;
