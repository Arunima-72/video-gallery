
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CircularProgress, Toolbar, IconButton, CardMedia
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';

// import axiosInstance from '../axiosInterceptor';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const SavedVideos = () => {
//   const [savedVideos, setSavedVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const userType = localStorage.getItem('role');

//   useEffect(() => {
//     if (!token) return;

//     const fetchSavedVideos = async () => {
//       try {
//         const res = await axiosInstance.get('save/saved');
//         setSavedVideos(res.data);
//       } catch (err) {
//         console.error('Failed to fetch saved videos:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSavedVideos();
//   }, [token]);

//   const handleUnsave = async (videoId) => {
//     try {
//       await axiosInstance.delete(`save/saved/${videoId}`);
//       setSavedVideos((prev) => prev.filter((v) => v._id !== videoId));
//     } catch (err) {
//       console.error('Failed to unsave video:', err);
//     }
//   };

//   if (!token) {
//     return <Typography mt={10} ml={10}>Please log in to view saved videos.</Typography>;
//   }

//   if (loading) {
//     return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   }

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar open={sidebarOpen} userType={userType} />
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s'
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Box sx={{ p: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             Saved Videos ({savedVideos.length})
//           </Typography>

//           {savedVideos.length === 0 ? (
//             <Typography>No saved videos yet.</Typography>
//           ) : (
//             <Box>
//               {savedVideos.map((video) => {
//                 const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;
//                 return (
//                   <Box
//                     key={video._id}
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       border: '1px solid #ddd',
//                       borderRadius: 2,
//                       mb: 2,
//                       overflow: 'hidden',
//                       backgroundColor: '#fff'
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       image={video.image || '/default-thumbnail.jpg'}
//                       alt={video.title}
//                       sx={{ width: 200, height: 130, objectFit: 'cover', cursor: 'pointer' }}
//                       onClick={() => navigate(`/video/${video._id}`)}
//                     />
//                     <Box sx={{ flex: 1, px: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         onClick={() => navigate(`/video/${video._id}`)}
//                         sx={{ cursor: 'pointer' }}
//                       >
//                         {video.title || 'Video name'}
//                       </Typography>
//                     </Box>
//                     <IconButton onClick={() => handleUnsave(video._id)}>
//                       <CloseIcon />
//                     </IconButton>
//                   </Box>
//                 );
//               })}
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SavedVideos;
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Toolbar,
  IconButton,
  CardMedia,
  Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../axiosInterceptor';
import Sidebar from '../Sidebar';
import CommonNav from '../CommonNav';

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const appBarHeight = 64;
const SavedVideos = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('role');

  useEffect(() => {
    if (!token) return;

    const fetchSavedVideos = async () => {
      try {
        const res = await axiosInstance.get('save/saved');
        setSavedVideos(res.data);
      } catch (err) {
        console.error('Failed to fetch saved videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedVideos();
  }, [token]);

  const handleUnsave = async (videoId) => {
    const confirmUnsave = window.confirm('Remove this video from saved list?');
    if (!confirmUnsave) return;

    try {
      await axiosInstance.delete(`save/saved/${videoId}`);
      setSavedVideos((prev) => prev.filter((v) => v._id !== videoId));
      setSnackbarMessage('Video removed from saved list');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to unsave video:', err);
    }
  };

  if (!token) {
    return <Typography mt={10} ml={10}>Please log in to view saved videos.</Typography>;
  }

  if (loading) {
    return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} userType={userType} />
      <Box
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
          transition: 'margin 0.3s',
        }}
      >
        <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Toolbar />
        <Box sx={{ 
          
          p: 3,
          ml: sidebarOpen ? -28 : 8, mt: 4, px: 3 }}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: 'lighter',fontFamily:'Poppins' }}>
            Saved Videos ({savedVideos.length})
          </Typography>

          {savedVideos.length === 0 ? (
            <Typography style={{fontFamily:'Poppins'}}>No saved videos yet.</Typography>
          ) : (
            <Box>
              {savedVideos.map((video) => {
                const imageUrl = video.image
                  ? `http://localhost:3000/${video.image.replace(/\\/g, '/')}`
                  : '/default-thumbnail.jpg';

                return (
                  <Box
                    key={video._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #ddd',
                      borderRadius: 2,
                      mb: 2,
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      width: '70%',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={imageUrl}
                      alt={video.title}
                      sx={{
                        width: 200,
                        height: 130,
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                    //   onClick={() => navigate(`admin/video/${video._id}`)}
                     onClick={() => navigate(`/admin/video/${video._id}`)}
                    />
                    <Box sx={{ flex: 1, px: 2 }}>
                      <Typography
                        variant="subtitle1"
                        onClick={() => navigate(`/video/${video._id}`)}
                        sx={{ cursor: 'pointer', fontWeight: 'bold',fontSize: '1.3rem' }}
                      >
                        {video.title || 'Video name'}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleUnsave(video._id)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>

      {/* ✅ Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default SavedVideos;
