





// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Button, Card, CardMedia, CardContent, CircularProgress, Toolbar
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInterceptor';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoDetails = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const userType = localStorage.getItem('role');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVideo = async () => {
//       setLoading(true);
//       setVideo(null); // reset previous data
//       try {
//         const res = await axiosInstance.get(`/admin/videodetails/${id}`);
//         setVideo(res.data);
//       } catch (err) {
//         console.error('Failed to load video:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideo();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/admin/video/${id}`);
//       navigate('/admin/videos'); // Go back to list after deletion
//     } catch (err) {
//       console.error('Failed to delete video:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const thumbnailUrl = `http://localhost:3000/${video.thumbnail?.replace(/\\/g, '/')}`;
//   const pdfUrl = video.pdf ? `http://localhost:3000/${video.pdf.replace(/\\/g, '/')}` : null;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar open={sidebarOpen} userType={userType} />
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s',
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Box p={3}>
//           <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
//             {thumbnailUrl && (
//               <CardMedia
//                 component="img"
//                 image={thumbnailUrl}
//                 alt="Video Thumbnail"
//                 sx={{ width: 300, height: 200 }}
//               />
//             )}
//             <CardContent>
//               <Typography variant="h5" gutterBottom>{video.title}</Typography>
//               <Typography><strong>Stack:</strong> {video.stack?.name}</Typography>
//               <Typography><strong>Category:</strong> {video.category?.name}</Typography>
//               <Typography><strong>Subcategory:</strong> {video.subcategory?.name}</Typography>
//               <Typography mt={2}><strong>Description:</strong> {video.description}</Typography>
//               {pdfUrl && (
//                 <Typography mt={2}>
//                   <strong>PDF:</strong>{' '}
//                   <a href={pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
//                 </Typography>
//               )}
//               <Box mt={3} display="flex" gap={2}>
//                 <Button variant="contained" onClick={() => navigate(`/admin/edit-video/${video._id}`)}>Edit</Button>
//                 <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoDetails;

// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Button, Card, CardMedia, CardContent,
//   CircularProgress, Toolbar, Divider, Paper
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInterceptor';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoDetails = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const navigate = useNavigate();
//   const userType = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchVideo = async () => {
//       try {
//         setLoading(true);
//         const res = await axiosInstance.get(`/admin/videodetails/${id}`);
//         setVideo(res.data);
//       } catch (err) {
//         console.error('Failed to load video:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideo();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/admin/video/${id}`);
//       navigate('/admin/videos');
//     } catch (err) {
//       console.error('Failed to delete video:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const thumbnailUrl = video.thumbnail ? `http://localhost:3000/${video.thumbnail.replace(/\\/g, '/')}` : null;
//   const pdfUrl = video.pdf ? `http://localhost:3000/${video.pdf.replace(/\\/g, '/')}` : null;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar open={sidebarOpen} userType={userType} />
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s',
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Box p={3}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h4" gutterBottom>
//               {video.title}
//             </Typography>

//             <Divider sx={{ mb: 2 }} />

//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: { xs: 'column', md: 'row' },
//                 gap: 3,
//               }}
//             >
//               {/* Thumbnail */}
//               {thumbnailUrl ? (
//                 <CardMedia
//                   component="img"
//                   image={thumbnailUrl}
//                   alt="Video Thumbnail"
//                   sx={{
//                     width: { xs: '100%', md: 320 },
//                     height: 200,
//                     borderRadius: 1,
//                     objectFit: 'cover',
//                   }}
//                 />
//               ) : (
//                 <Typography variant="body2" color="text.secondary">
//                   Thumbnail not available
//                 </Typography>
//               )}

//               {/* Info */}
//               <Box>
//                 <Typography variant="subtitle1">
//                   <strong>Stack:</strong> {video.stack?.name || 'N/A'}
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   <strong>Category:</strong> {video.category?.name || 'N/A'}
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   <strong>Subcategory:</strong> {video.subcategory?.name || 'N/A'}
//                 </Typography>

//                 <Typography variant="body1" sx={{ mt: 2 }}>
//                   <strong>Description:</strong>
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
//                   {video.description || 'No description provided.'}
//                 </Typography>

//                 {/* PDF Viewer */}
//                 {pdfUrl ? (
//                   <Box mt={3}>
//                     <Typography variant="subtitle1" gutterBottom>
//                       <strong>PDF Preview:</strong>
//                     </Typography>
//                     <Box
//                       component="iframe"
//                       src={pdfUrl}
//                       sx={{
//                         width: '100%',
//                         maxWidth: '600px',
//                         height: '400px',
//                         border: '1px solid #ccc',
//                         borderRadius: 1,
//                       }}
//                     />
//                   </Box>
//                 ) : (
//                   <Typography mt={2} variant="body2" color="text.secondary">
//                     No PDF attached.
//                   </Typography>
//                 )}

//                 {/* Actions */}
//                 <Box mt={3} display="flex" gap={2}>
//                   <Button
//                     variant="contained"
//                     onClick={() => navigate(`/admin/edit-video/${video._id}`)}
//                   >
//                     Edit
//                   </Button>
//                   <Button variant="outlined" color="error" onClick={handleDelete}>
//                     Delete
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoDetails;
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CircularProgress,
//   Toolbar,
//   Divider,
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInterceptor';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoDetails = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const userType = localStorage.getItem('role');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVideo = async () => {
//       setLoading(true);
//       setVideo(null);
//       try {
//         const res = await axiosInstance.get(`/admin/videodetails/${id}`);
//         setVideo(res.data);
//       } catch (err) {
//         console.error('Failed to load video:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideo();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/admin/video/${id}`);
//       navigate('/admin/videos');
//     } catch (err) {
//       console.error('Failed to delete video:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const thumbnailUrl = video.image?.startsWith('http')
//     ? video.image
//     : `http://localhost:3000/${video.image?.replace(/\\/g, '/')}`;

//   const pdfUrl = video.pdf
//     ? (video.pdf.startsWith('http') ? video.pdf : `http://localhost:3000/${video.pdf.replace(/\\/g, '/')}`)
//     : null;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar open={sidebarOpen} userType={userType} />
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s',
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Box p={3}>
//           <Typography variant="h5" gutterBottom>
//             Video Details
//           </Typography>

//           <Card sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
//             {thumbnailUrl && (
//               <CardMedia
//                 component="img"
//                 image={thumbnailUrl}
//                 alt="Video Thumbnail"
//                 sx={{ width: 300, height: 200, objectFit: 'cover' }}
//               />
//             )}

//             <CardContent sx={{ flex: 1 }}>
//               <Typography variant="h6" gutterBottom>{video.title}</Typography>
//               <Divider sx={{ mb: 2 }} />

//               <Typography><strong>Stack:</strong> {video.stackName || 'N/A'}</Typography>
//               <Typography><strong>Category:</strong> {video.categoryName || 'N/A'}</Typography>
//               <Typography><strong>Subcategory:</strong> {video.subCategoryName || 'N/A'}</Typography>

//               <Typography mt={2}><strong>Description:</strong> {video.description}</Typography>

//               {pdfUrl && (
//                 <Box mt={3}>
//                   <Typography><strong>PDF Preview:</strong></Typography>
//                   <iframe
//                     src={pdfUrl}
//                     title="PDF Preview"
//                     width="100%"
//                     height="400px"
//                     style={{ border: '1px solid #ccc', borderRadius: '4px' }}
//                   ></iframe>
//                 </Box>
//               )}

//               <Box mt={3} display="flex" gap={2}>
//                 <Button
//                   variant="contained"
//                   onClick={() => navigate(`/admin/edit-video/${video._id}`)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoDetails;


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CircularProgress,
//   Toolbar,
//   Divider,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInterceptor';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoDetails = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showPdf, setShowPdf] = useState(false);
//   const userType = localStorage.getItem('role');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVideo = async () => {
//       setLoading(true);
//       setVideo(null);
//       try {
//         const res = await axiosInstance.get(`/admin/videodetails/${id}`);
//         setVideo(res.data);
//       } catch (err) {
//         console.error('Failed to load video:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideo();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/admin/video/${id}`);
//       navigate('/admin/videos');
//     } catch (err) {
//       console.error('Failed to delete video:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const baseUrl = 'http://localhost:3000';

//   const thumbnailUrl = video.image?.startsWith('http')
//     ? video.image
//     : `${baseUrl}/${video.image?.replace(/\\/g, '/')}`;

//   const videoUrl = video.videoUrl
//     ? (video.videoUrl.startsWith('http')
//       ? video.videoUrl
//       : `${baseUrl}/${video.videoUrl.replace(/\\/g, '/')}`)
//     : null;

//   const pdfUrl = video.overviewPdf
//     ? (video.overviewPdf.startsWith('http')
//       ? video.overviewPdf
//       : `${baseUrl}/${video.overviewPdf.replace(/\\/g, '/')}`)
//     : null;

//   const pdfFileName = video.overviewPdf ? video.overviewPdf.split('/').pop() : '';

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
//       <Sidebar open={sidebarOpen} userType={userType} />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s',
//           px: 3,
//           py: 2,
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Typography variant="h5" gutterBottom>
//           Video Details
//         </Typography>

//         <Card
//           sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column', md: 'row' },
//             gap: 3,
//             backgroundColor: 'white',
//             boxShadow: 2,
//             borderRadius: 2,
//             mt: 2,
//             p: 2,
//           }}
//         >
//           {thumbnailUrl && (
//             <CardMedia
//               component="img"
//               image={thumbnailUrl}
//               alt="Video Thumbnail"
//               sx={{ width: 260, height: 180, objectFit: 'cover', borderRadius: 1 }}
//             />
//           )}

//           <CardContent sx={{ flex: 1 }}>
//             <Typography variant="h6" gutterBottom>{video.title}</Typography>
//             <Divider sx={{ mb: 2 }} />

//             <Typography><strong>Stack:</strong> {video.stackName || 'N/A'}</Typography>
//             <Typography><strong>Category:</strong> {video.categoryName || 'N/A'}</Typography>
//             <Typography><strong>Subcategory:</strong> {video.subCategoryName || 'N/A'}</Typography>

//             <Typography mt={2}><strong>Description:</strong> {video.description || 'No description'}</Typography>

//             {videoUrl && (
//               <Box mt={3}>
//                 <Typography><strong>Video Preview:</strong></Typography>
//                 <video
//                   controls
//                   width="100%"
//                   style={{ borderRadius: 4, marginTop: 8 }}
//                   src={videoUrl}
//                 />
//               </Box>
//             )}

//             {pdfUrl && (
//               <Box mt={3}>
//                 <Typography><strong>PDF:</strong></Typography>
//                 <Tooltip title="Click to view PDF">
//                   <IconButton onClick={() => setShowPdf(!showPdf)} color="primary">
//                     <PictureAsPdfIcon />
//                     <Typography ml={1}>{pdfFileName}</Typography>
//                   </IconButton>
//                 </Tooltip>

//                 {showPdf && (
//                   <Box mt={2}>
//                     <iframe
//                       src={pdfUrl}
//                       title="PDF Preview"
//                       width="100%"
//                       height="400px"
//                       style={{ border: '1px solid #ccc', borderRadius: '4px' }}
//                     ></iframe>
//                   </Box>
//                 )}
//               </Box>
//             )}

//             <Box mt={4} display="flex" gap={2} flexWrap="wrap">
//               <Button
//                 variant="contained"
//                 onClick={() => navigate(`/admin/edit-video/${video._id}`)}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={handleDelete}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default VideoDetails;
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CircularProgress,
//   Toolbar,
//   Divider,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInterceptor';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoDetails = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showPdf, setShowPdf] = useState(false);
//   const navigate = useNavigate();
//   const userType = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchVideo = async () => {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(`/admin/videodetails/${id}`);
//         setVideo(res.data);
//       } catch (err) {
//         console.error('Error fetching video:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideo();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/admin/video/${id}`);
//       navigate('/admin/videos');
//     } catch (err) {
//       console.error('Failed to delete video:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const baseUrl = 'http://localhost:3000';

//   const thumbnailUrl = video.image
//     ? (video.image.startsWith('http') ? video.image : `${baseUrl}/${video.image.replace(/\\/g, '/')}`)
//     : null;

//   const videoUrl = video.videoUrl
//     ? (video.videoUrl.startsWith('http') ? video.videoUrl : `${baseUrl}/${video.videoUrl.replace(/\\/g, '/')}`)
//     : null;

//   const pdfUrl = video.overviewPdf
//     ? (video.overviewPdf.startsWith('http') ? video.overviewPdf : `${baseUrl}/${video.overviewPdf.replace(/\\/g, '/')}`)
//     : null;

//   const pdfFileName = video.overviewPdf ? video.overviewPdf.split('/').pop() : '';

//   return (
//     <Box sx={{ display: 'flex', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
//       <Sidebar open={sidebarOpen} userType={userType} />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           px: 3,
//           py: 2,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s ease',
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Typography variant="h5" gutterBottom>Video Details</Typography>

//         <Card
//           sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column', sm: 'row' },
//             gap: 3,
//             backgroundColor: 'white',
//             boxShadow: 2,
//             borderRadius: 2,
//             mt: 2,
//             width: '100%',
//             maxWidth: '1000px',
//             p: 2,
//           }}
//         >
//           {thumbnailUrl && (
//             <CardMedia
//               component="img"
//               image={thumbnailUrl}
//               alt="Video Thumbnail"
//               sx={{ width: 260, height: 180, objectFit: 'cover', borderRadius: 1 }}
//             />
//           )}

//           <CardContent sx={{ flex: 1 }}>
//             <Typography variant="h6" gutterBottom>{video.title}</Typography>
//             <Divider sx={{ mb: 2 }} />

//             <Typography><strong>Stack:</strong> {video.stackName || 'N/A'}</Typography>
//             <Typography><strong>Category:</strong> {video.categoryName || 'N/A'}</Typography>
//             <Typography><strong>Subcategory:</strong> {video.subCategoryName || 'N/A'}</Typography>
//             <Typography mt={2}><strong>Description:</strong> {video.description || 'No description'}</Typography>
//             <Typography mt={2}><strong>Video URL:</strong> {video.videoUrl || 'No Video URL'}</Typography>

//             {videoUrl && (
//               <Box mt={3}>
//                 <Typography><strong>Video Preview:</strong></Typography>
//                 <video
//                   controls
//                   width="100%"
//                   style={{ borderRadius: 4, marginTop: 8 }}
//                   src={videoUrl}
//                 />
//               </Box>
//             )}

//             {pdfUrl && (
//               <Box mt={3}>
//                 <Typography><strong>PDF:</strong></Typography>
//                 <Tooltip title="Click to view PDF">
//                   <IconButton onClick={() => setShowPdf(!showPdf)} color="primary">
//                     <PictureAsPdfIcon />
//                     <Typography ml={1}>{pdfFileName}</Typography>
//                   </IconButton>
//                 </Tooltip>
//                 {showPdf && (
//                   <Box mt={2}>
//                     <iframe
//                       src={pdfUrl}
//                       title="PDF Preview"
//                       width="100%"
//                       height="400px"
//                       style={{ border: '1px solid #ccc', borderRadius: '4px' }}
//                     ></iframe>
//                   </Box>
//                 )}
//               </Box>
//             )}

//             <Box mt={4} display="flex" gap={2} flexWrap="wrap">
//               <Button
//                 variant="contained"
//                 onClick={() => navigate(`/admin/edit-video/${video._id}`)}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={handleDelete}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default VideoDetails;
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CircularProgress,
//   Toolbar,
//   Divider,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
// } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInterceptor';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoDetails = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showPdf, setShowPdf] = useState(false);
//   const navigate = useNavigate();
//   const userType = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchVideo = async () => {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(`/admin/videodetails/${id}`);
//         setVideo(res.data);
//       } catch (err) {
//         console.error('Error fetching video:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideo();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/admin/video/${id}`);
//       navigate('/admin/videos');
//     } catch (err) {
//       console.error('Failed to delete video:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const baseUrl = 'http://localhost:3000';

//   const thumbnailUrl = video.image
//     ? (video.image.startsWith('http') ? video.image : `${baseUrl}/${video.image.replace(/\\/g, '/')}`)
//     : null;

//   const videoUrl = video.videoUrl
//     ? (video.videoUrl.startsWith('http') ? video.videoUrl : `${baseUrl}/${video.videoUrl.replace(/\\/g, '/')}`)
//     : null;

//   const pdfUrl = video.overviewPdf
//     ? (video.overviewPdf.startsWith('http') ? video.overviewPdf : `${baseUrl}/${video.overviewPdf.replace(/\\/g, '/')}`)
//     : null;

//   const pdfFileName = video.overviewPdf ? video.overviewPdf.split('/').pop() : '';

//   return (
//     <Box sx={{ display: 'flex', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
//       <Sidebar open={sidebarOpen} userType={userType} />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           px: 3,
//           py: 2,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s ease',
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Typography variant="h5" gutterBottom>Video Details</Typography>

//         <Card
//           sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column', sm: 'row' },
//             gap: 3,
//             backgroundColor: 'white',
//             boxShadow: 2,
//             borderRadius: 2,
//             mt: 2,
//             width: '100%',
//             maxWidth: '1000px',
//             p: 2,
//           }}
//         >
//           {thumbnailUrl && (
//             <CardMedia
//               component="img"
//               image={thumbnailUrl}
//               alt="Video Thumbnail"
//               sx={{ width: 260, height: 180, objectFit: 'cover', borderRadius: 1 }}
//             />
//           )}

//           <CardContent sx={{ flex: 1 }}>
//             <Typography variant="h6" gutterBottom>{video.title}</Typography>
//             <Divider sx={{ mb: 2 }} />

//             <Typography><strong>Stack:</strong> {video.stackName || 'N/A'}</Typography>
//             <Typography><strong>Category:</strong> {video.categoryName || 'N/A'}</Typography>
//             <Typography><strong>Subcategory:</strong> {video.subCategoryName || 'N/A'}</Typography>

//             <Typography mt={2}><strong>Description:</strong> {video.description || 'No description'}</Typography>

//             <Typography mt={2}><strong>Video URL :</strong> {video.videoUrl || 'No Video URL'}</Typography>

//             {videoUrl && (
//               <Box mt={3}>
//                 <Typography><strong>Video Preview:</strong></Typography>
//                 <video
//                   controls
//                   width="100%"
//                   style={{ borderRadius: 4, marginTop: 8 }}
//                   src={videoUrl}
//                 />
//               </Box>
//             )}

//             {pdfUrl && (
//               <Box mt={3}>
//                 <Typography><strong>Overview PDF:</strong></Typography>
//                 <Tooltip title="Click to view PDF in popup">
//                   <IconButton onClick={() => setShowPdf(true)} color="primary">
//                     <PictureAsPdfIcon />
//                     <Typography ml={1}>{pdfFileName}</Typography>
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//             )}

//             <Box mt={4} display="flex" gap={2} flexWrap="wrap">
//               <Button
//                 variant="contained"
//                 onClick={() => navigate(`/admin/edit-video/${video._id}`)}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={handleDelete}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* PDF Preview Modal */}
//         <Dialog open={showPdf} onClose={() => setShowPdf(false)} maxWidth="md" fullWidth>
//           <DialogTitle>{pdfFileName}</DialogTitle>
//           <DialogContent>
//             <iframe
//               src={pdfUrl}
//               title="PDF Preview"
//               width="100%"
//               height="500px"
//               style={{ border: 'none' }}
//             />
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };

// export default VideoDetails;
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CircularProgress,
//   Toolbar,
//   Divider,
//   IconButton,
//   Tooltip,
//   Modal,
// } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInterceptor';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '80%',
//   maxWidth: 900,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 2,
//   borderRadius: 2,
// };

// const VideoDetails = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showPdf, setShowPdf] = useState(false);
//   const navigate = useNavigate();
//   const userType = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchVideo = async () => {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(`/admin/videodetails/${id}`);
//         setVideo(res.data);
//       } catch (err) {
//         console.error('Error fetching video:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideo();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/admin/video/${id}`);
//       navigate('/admin/videos');
//     } catch (err) {
//       console.error('Failed to delete video:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const baseUrl = 'http://localhost:3000';

//   const thumbnailUrl = video.image
//     ? (video.image.startsWith('http') ? video.image : `${baseUrl}/${video.image.replace(/\\/g, '/')}`)
//     : null;

//   const pdfUrl = video.overviewPdf
//     ? (video.overviewPdf.startsWith('http') ? video.overviewPdf : `${baseUrl}/${video.overviewPdf.replace(/\\/g, '/')}`)
//     : null;

//   const pdfFileName = video.overviewPdf ? video.overviewPdf.split('/').pop() : '';

//   return (
//     <Box sx={{ display: 'flex', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
//       <Sidebar open={sidebarOpen} userType={userType} />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           px: 3,
//           py: 2,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s ease',
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />

//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'flex-start',
//             mt: 4,
//           }}
//         >
//           <Card
//             sx={{
//               width: '100%',
//               maxWidth: 900,
//               backgroundColor: 'white',
//               boxShadow: 3,
//               borderRadius: 2,
//               p: 3,
//             }}
//           >
//             <Typography variant="h5" gutterBottom sx={{
//     fontWeight: 700,
//     fontSize: '1.8rem',
//     color: '#3f7cb5ff',
//     textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
//     letterSpacing: '0.5px',
//     mb: 3,
//   }}>Video Details</Typography>
//             <Divider sx={{ mb: 2 }} />

//             <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
//               {thumbnailUrl && (
//                 <CardMedia
//                   component="img"
//                   image={thumbnailUrl}
//                   alt="Video Thumbnail"
//                   sx={{ width: 260, height: 180, objectFit: 'cover', borderRadius: 1 }}
//                 />
//               )}

//               <CardContent sx={{ flex: 1, p: 0 }}>
//                 <Typography variant="h6">{video.title}</Typography>
//                 <Typography mt={1}><strong>Description:</strong> {video.description || 'No description'}</Typography>
//                 <Typography mt={1}><strong>Video URL:</strong> {video.videoUrl || 'No Video URL'}</Typography>
//                 <Typography mt={1}><strong>Stack:</strong> {video.stackName || 'N/A'}</Typography>
//                 <Typography mt={1}><strong>Category:</strong> {video.categoryName || 'N/A'}</Typography>
//                 <Typography mt={1}><strong>Subcategory:</strong> {video.subCategoryName || 'N/A'}</Typography>

//                 {pdfUrl && (
//                   <Box mt={3}>
//                     <Typography><strong>PDF:</strong></Typography>
//                     <Tooltip title="Click to view PDF">
//                       <IconButton onClick={() => setShowPdf(true)} color="primary">
//                         <PictureAsPdfIcon />
//                         <Typography ml={1}>{pdfFileName}</Typography>
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 )}

//                 <Box mt={4} display="flex" gap={2} flexWrap="wrap">
//                   <Button
//                     variant="contained"
//                     onClick={() => navigate(`/admin/edit-video/${video._id}`)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={handleDelete}
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Box>
//           </Card>
//         </Box>
//       </Box>

//       {/* PDF Preview Modal */}
//       <Modal
//         open={showPdf}
//         onClose={() => setShowPdf(false)}
//         aria-labelledby="pdf-modal-title"
//         aria-describedby="pdf-modal-description"
//       >
//         <Box sx={modalStyle}>
//           <Typography variant="h6" mb={2}>PDF Preview: {pdfFileName}</Typography>
//           <iframe
//             src={pdfUrl}
//             title="PDF Preview"
//             width="100%"
//             height="500px"
//             style={{ border: '1px solid #ccc', borderRadius: '4px' }}
//           />
//           <Box mt={2} textAlign="right">
//             <Button onClick={() => setShowPdf(false)} variant="contained">Close</Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default VideoDetails;
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Card, CardMedia, CardContent,
  CircularProgress, Toolbar, Divider, IconButton, Tooltip, Modal
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';
import Sidebar from '../Sidebar';
import CommonNav from '../CommonNav';
import './VideoPlayer.css'; // ✅ External CSS

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPdf, setShowPdf] = useState(false);
  const navigate = useNavigate();
  const userType = localStorage.getItem('role');

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/admin/videodetails/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error('Error fetching video:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);
  
  const [showFullDescription, setShowFullDescription] = useState(false);

const toggleDescription = () => {
  setShowFullDescription(prev => !prev);
};
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/video/${id}`);
      navigate('/admin/videos');
    } catch (err) {
      console.error('Failed to delete video:', err);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
  if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

  const baseUrl = 'http://localhost:3000';
  const thumbnailUrl = video.image?.startsWith('http')
    ? video.image
    : `${baseUrl}/${video.image?.replace(/\\/g, '/')}`;
  const pdfUrl = video.overviewPdf?.startsWith('http')
    ? video.overviewPdf
    : `${baseUrl}/${video.overviewPdf?.replace(/\\/g, '/')}`;
  const pdfFileName = video.overviewPdf?.split('/').pop() || '';

  return (
    <Box sx={{ display: 'flex', backgroundColor: 'white', minHeight: '100vh' }}>
      <Sidebar open={sidebarOpen} userType={userType} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
          transition: 'padding 0.3s ease',
        }}
      >
        <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Toolbar />

        <Box className="video-details-container">
          <Card className="video-card">
            <Typography variant="h5" className="video-title"  sx={{fontFamily:'Poppins'}}>Video Details</Typography>
            <Divider sx={{ mb: 2 }} />

            <Box className="video-info-box">
              {thumbnailUrl && (
                <CardMedia
                  component="img"
                  image={thumbnailUrl}
                  alt="Thumbnail"
                  className="video-thumbnail"
                />
              )}

              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="h6"  sx={{fontFamily:'Poppins'}}>{video.title}</Typography>
                <Typography className="video-description"  sx={{fontFamily:'Poppins'}}>
  {showFullDescription
    ? video.description
    : video.description?.slice(0, 150) + (video.description?.length > 150 ? '...' : '')
  }
</Typography>
{video.description?.length > 150 && (
  <button className="description-toggle-btn" onClick={toggleDescription}>
    {showFullDescription ? "Show less" : "Show more"}
  </button>
)}
                {/* <Typography mt={1}><strong>Description:</strong> {video.description || 'No description'}</Typography> */}
                <Typography mt={1} sx={{fontFamily:'Poppins'}}><strong>Video URL:</strong> {video.videoUrl || 'No Video URL'}</Typography>
                <Typography mt={1}  sx={{fontFamily:'Poppins'}}><strong>Stack:</strong> {video.stackName || 'N/A'}</Typography>
                <Typography mt={1}  sx={{fontFamily:'Poppins'}}><strong>Category:</strong> {video.categoryName || 'N/A'}</Typography>
                <Typography mt={1}  sx={{fontFamily:'Poppins'}}><strong>Subcategory:</strong> {video.subCategoryName || 'N/A'}</Typography>

                {/* {pdfUrl && (
                  <Box mt={3}>
                    <Typography  sx={{fontFamily:'Poppins'}}><strong>Project Document:</strong></Typography>
                    <Tooltip title="Click to view PDF">
                      <IconButton onClick={() => setShowPdf(true)} color="primary">
                        <PictureAsPdfIcon />
                        <Typography ml={1}>{pdfFileName}</Typography>
                      </IconButton>
                    </Tooltip>
                  </Box> */}
                  {pdfUrl && (
                    <Typography mt={1} variant="body2" fontFamily='Poppins'>
                      <strong>Project Document:</strong>{' '}
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1976d2', textDecoration: 'none' }}
                      >
                        View PDF
                      </a>
                    </Typography>
                )}

                <Box className="action-buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/edit-video/${video._id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    className="delete-btn"
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Box>

        <Modal open={showPdf} onClose={() => setShowPdf(false)}>
          <Box sx={modalStyle}>
            <Typography variant="h6" mb={2}> Preview: {pdfFileName}</Typography>
            <iframe
              src={pdfUrl}
              title="PDF Preview"
              width="100%"
              height="500px"
              style={{ border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <Box mt={2} textAlign="right">
              <Button onClick={() => setShowPdf(false)} variant="contained">Close</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default VideoDetails;
