// import React, { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`/api/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideo();
//   }, [id]);

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   return (
//     <Box sx={{ mt: 10, px: 3 }}>
//       <Typography variant="h5" gutterBottom>{video.title}</Typography>
//       <video
//         width="100%"
//         height="auto"
//         controls
//         src={`/${video.fileUrl.replace(/\\/g, '/')}`} // convert Windows path if needed
//       />
//       <Typography mt={2}>{video.description}</Typography>
//     </Box>
//   );
// };

// export default VideoPlayer;
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideo();
//   }, [id]);

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   return (
//     <Box sx={{ mt: 10, px: 3 }}>
//       <Typography variant="h5" gutterBottom>{video.title}</Typography>
//       <video
//         width="100%"
//         height="auto"
//         controls
//         src={video?.fileUrl ? `/${video.fileUrl.replace(/\\/g, '/')}` : ''}
//       />
//       <Typography mt={2}>{video.description}</Typography>
//     </Box>
//   );
// };

// export default VideoPlayer;
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideo();
//   }, [id]);

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

// //   const videoSrc = video?.fileUrl ? `/${video.fileUrl.replace(/\\/g, '/')}` : null;
// const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;

//   return (
//     <Box sx={{ mt: 10, px: 3 }}>
//       <Typography variant="h5" gutterBottom>{video.title}</Typography>
//       {videoUrl && (
//         <video
//           width="100%"
//           height="auto"
//           controls
//           src={videoUrl}
//         />
//       )}
//       <Typography mt={2}>{video.description}</Typography>
//     </Box>
//   );
// };

// export default VideoPlayer;
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CircularProgress, IconButton, Avatar, TextField, Button
// } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showLikes, setShowLikes] = useState(false);
//   const [showComments, setShowComments] = useState(true); // show comments by default

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideo();
//   }, [id]);

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;

//   const handleToggleLikes = () => {
//     setShowLikes(true);
//     setShowComments(false);
//   };

//   const handleToggleComments = () => {
//     setShowLikes(false);
//     setShowComments(true);
//   };

//   return (
//     <Box sx={{ display: 'flex', mt: 10, px: 3 }}>
//       {/* LEFT: Video and details */}
//       <Box sx={{ flex: 3 }}>
//         <Typography variant="h5" gutterBottom>{video.title}</Typography>

//         {videoUrl && (
//           <video width="100%" height="auto" controls src={videoUrl} />
//         )}

//         <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//           <IconButton onClick={handleToggleLikes}>
//             <ThumbUpIcon color={showLikes ? 'primary' : 'action'} />
//             <Typography ml={1}>{video.likes?.length || 0}</Typography>
//           </IconButton>

//           <IconButton onClick={handleToggleComments}>
//             <ChatBubbleOutlineIcon color={showComments ? 'primary' : 'action'} />
//             <Typography ml={1}>{video.comments?.length || 0}</Typography>
//           </IconButton>
//         </Box>

//         <Typography mt={2}>{video.description}</Typography>
//       </Box>

//       {/* RIGHT: Likes or Comments section */}
//       <Box sx={{ flex: 2, ml: 4, mt: 1 }}>
//         {showLikes && (
//           <>
//             <Typography variant="h6">Likes</Typography>
//             {video.likes?.map((user, index) => (
//               <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                 <Avatar sx={{ width: 30, height: 30 }} />
//                 <Typography ml={1}>{user.name}</Typography>
//               </Box>
//             ))}
//           </>
//         )}

//         {showComments && (
//           <>
//             <Typography variant="h6">{video.comments?.length || 0} comments</Typography>
//             <TextField
//               variant="outlined"
//               fullWidth
//               placeholder="Add a comment"
//               size="small"
//               sx={{ my: 1 }}
//             />
//             <Button variant="contained" size="small">Post</Button>
//             {video.comments?.map((comment, index) => (
//               <Box key={index} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <Avatar sx={{ width: 30, height: 30 }} />
//                   <Typography ml={1} fontWeight="bold">{comment.user}</Typography>
//                   <Typography ml={1} variant="caption">{comment.daysAgo} days ago</Typography>
//                 </Box>
//                 <Typography ml={4}>{comment.text}</Typography>
//               </Box>
//             ))}
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default VideoPlayer;
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CircularProgress, IconButton, Avatar, TextField, Button,
//   AppBar, Toolbar, Drawer
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar from '../Sidebar'; // Adjust path if needed

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showLikes, setShowLikes] = useState(false);
//   const [showComments, setShowComments] = useState(true); // default
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideo();
//   }, [id]);

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;

//   const handleToggleLikes = () => {
//     setShowLikes(true);
//     setShowComments(false);
//   };

//   const handleToggleComments = () => {
//     setShowLikes(false);
//     setShowComments(true);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       {/* Sidebar */}
//       <Sidebar open={sidebarOpen} userType="admin" />

//       {/* Main content area */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s',
//         }}
//       >
//         {/* AppBar */}
//         <AppBar
//           position="fixed"
//           sx={{
//             backgroundColor: '#fff',
//             color: '#000',
//             width: `calc(100% - ${sidebarOpen ? drawerWidthOpen : drawerWidthClosed}px)`,
//             ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//             transition: 'width 0.3s, margin 0.3s',
//             boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
//           }}
//         >
//           <Toolbar>
//             <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} edge="start" color="inherit">
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" sx={{ ml: 2 }}>
//               Video Gallery
//             </Typography>
//           </Toolbar>
//         </AppBar>

//         {/* Content under AppBar */}
//         <Toolbar /> {/* pushes content below AppBar */}
//         <Box sx={{ display: 'flex', p: 3 }}>
//           {/* LEFT: Video */}
//           <Box sx={{ flex: 3 }}>
//             <Typography variant="h5" gutterBottom>{video.title}</Typography>

//             {videoUrl && (
//               <video width="100%" height="auto" controls src={videoUrl} />
//             )}

//             <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//               <IconButton onClick={handleToggleLikes}>
//                 <ThumbUpIcon color={showLikes ? 'primary' : 'action'} />
//                 <Typography ml={1}>{video.likes?.length || 0}</Typography>
//               </IconButton>

//               <IconButton onClick={handleToggleComments}>
//                 <ChatBubbleOutlineIcon color={showComments ? 'primary' : 'action'} />
//                 <Typography ml={1}>{video.comments?.length || 0}</Typography>
//               </IconButton>
//             </Box>

//             <Typography mt={2}>{video.description}</Typography>
//           </Box>

//           {/* RIGHT: Comments or Likes */}
//           <Box sx={{ flex: 2, ml: 4 }}>
//             {showLikes && (
//               <>
//                 <Typography variant="h6">Likes</Typography>
//                 {video.likes?.map((user, index) => (
//                   <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Avatar sx={{ width: 30, height: 30 }} />
//                     <Typography ml={1}>{user.name}</Typography>
//                   </Box>
//                 ))}
//               </>
//             )}

//             {showComments && (
//               <>
//                 <Typography variant="h6">{video.comments?.length || 0} comments</Typography>
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   placeholder="Add a comment"
//                   size="small"
//                   sx={{ my: 1 }}
//                 />
//                 <Button variant="contained" size="small">Post</Button>
//                 {video.comments?.map((comment, index) => (
//                   <Box key={index} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ width: 30, height: 30 }} />
//                       <Typography ml={1} fontWeight="bold">{comment.user}</Typography>
//                       <Typography ml={1} variant="caption">{comment.daysAgo} days ago</Typography>
//                     </Box>
//                     <Typography ml={4}>{comment.text}</Typography>
//                   </Box>
//                 ))}
//               </>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoPlayer;
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CircularProgress, IconButton, Avatar,
//   TextField, Button, Toolbar
// } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// import Sidebar from '../Sidebar';       // Ensure correct relative path
// import CommonNav from '../CommonNav';   // Ensure correct relative path

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showLikes, setShowLikes] = useState(false);
//   const [showComments, setShowComments] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideo();
//   }, [id]);

//   const videoUrl = `http://localhost:3000/${video?.fileUrl?.replace(/\\/g, '/')}`;

//   const handleToggleLikes = () => {
//     setShowLikes(true);
//     setShowComments(false);
//   };

//   const handleToggleComments = () => {
//     setShowLikes(false);
//     setShowComments(true);
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       {/* Sidebar */}
//       <Sidebar open={sidebarOpen} userType="admin" />

//       {/* Main Content */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s',
//         }}
//       >
//         {/* AppBar */}
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//         {/* Push content below AppBar */}
//         <Toolbar />

//         {/* Page Content */}
//         <Box sx={{ display: 'flex', p: 3 }}>
//           {/* LEFT: Video section */}
//           <Box sx={{ flex: 3 }}>
//             <Typography variant="h5" gutterBottom>{video.title}</Typography>

//             {videoUrl && (
//               <video width="100%" height="auto" controls src={videoUrl} />
//             )}

//             <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//               <IconButton onClick={handleToggleLikes}>
//                 <ThumbUpIcon color={showLikes ? 'primary' : 'action'} />
//                 <Typography ml={1}>{video.likes?.length || 0}</Typography>
//               </IconButton>

//               <IconButton onClick={handleToggleComments}>
//                 <ChatBubbleOutlineIcon color={showComments ? 'primary' : 'action'} />
//                 <Typography ml={1}>{video.comments?.length || 0}</Typography>
//               </IconButton>
//             </Box>

//             <Typography mt={2}>{video.description}</Typography>
//           </Box>

//           {/* RIGHT: Likes or Comments section */}
//           <Box sx={{ flex: 2, ml: 4 }}>
//             {showLikes && (
//               <>
//                 <Typography variant="h6" gutterBottom>Likes</Typography>
//                 {video.likes?.map((user, index) => (
//                   <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Avatar sx={{ width: 30, height: 30 }} />
//                     <Typography ml={1}>{user.name}</Typography>
//                   </Box>
//                 ))}
//               </>
//             )}

//             {showComments && (
//               <>
//                 <Typography variant="h6">{video.comments?.length || 0} Comments</Typography>
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   placeholder="Add a comment"
//                   size="small"
//                   sx={{ my: 1 }}
//                 />
//                 <Button variant="contained" size="small">Post</Button>
//                 {video.comments?.map((comment, index) => (
//                   <Box key={index} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ width: 30, height: 30 }} />
//                       <Typography ml={1} fontWeight="bold">{comment.user}</Typography>
//                       <Typography ml={1} variant="caption">{comment.daysAgo} days ago</Typography>
//                     </Box>
//                     <Typography ml={4}>{comment.text}</Typography>
//                   </Box>
//                 ))}
//               </>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoPlayer;
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CircularProgress, IconButton,
//   Avatar, TextField, Button, Toolbar
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// dayjs.extend(relativeTime);

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [likes, setLikes] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [showLikes, setShowLikes] = useState(false);
//   const [showComments, setShowComments] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [commentText, setCommentText] = useState('');

//   useEffect(() => {
//     fetchVideo();
//     fetchLikes();
//     fetchComments();
//   }, [id]);

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLikes = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/${id}/likes`);
//       setLikes(res.data);
//     } catch (err) {
//       console.error('Failed to load likes:', err);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/${id}/comments`);
//       setComments(res.data);
//     } catch (err) {
//       console.error('Failed to load comments:', err);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       await axios.post(`http://localhost:3000/admin/${id}/likes`, {
//         email: "shaluanupama16@gmail.com"
//       });
//       fetchLikes();
//     } catch (err) {
//       console.error('Like toggle error:', err);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (!commentText.trim()) return;
//     try {
//       await axios.post(`http://localhost:3000/admin/${id}/comments`, {
//         email: "shaluanupama16@gmail.com",
//         text: commentText.trim()
//       });
//       setCommentText('');
//       fetchComments();
//     } catch (err) {
//       console.error('Adding comment failed:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar open={sidebarOpen} userType="admin" />
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s'
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Box sx={{ display: 'flex', p: 3 }}>
//           {/* Left: Video and actions */}
//           <Box sx={{ flex: 3 }}>
//             <Typography variant="h5">{video.title}</Typography>
//             {videoUrl && (
//               <video width="100%" height="auto" controls src={videoUrl} />
//             )}
//             <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//               <IconButton onClick={handleLike}>
//                 <ThumbUpIcon color={showLikes ? 'primary' : 'action'} />
//                 <Typography ml={1}>{likes.length}</Typography>
//               </IconButton>
//               <IconButton onClick={() => { setShowComments(true); setShowLikes(false); }}>
//                 <ChatBubbleOutlineIcon color={showComments ? 'primary' : 'action'} />
//                 <Typography ml={1}>{comments.length}</Typography>
//               </IconButton>
//             </Box>
//             <Typography mt={2}>{video.description}</Typography>
//           </Box>

//           {/* Right: Likes or Comments panel */}
//           <Box sx={{ flex: 2, ml: 4 }}>
//             {showLikes && (
//               <Box>
//                 <Typography variant="h6">Likes</Typography>
//                 {likes.map((like, idx) => (
//                   <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Avatar />
//                     <Typography ml={1}>
//                       {like.user?.name || like.user?.email || 'Unknown'}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}

//             {showComments && (
//               <Box>
//                 <Typography variant="h6">{comments.length} Comments</Typography>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Add a comment"
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   sx={{ my: 1 }}
//                 />
//                 <Button variant="contained" size="small" onClick={handleCommentSubmit}>
//                   Post
//                 </Button>
//                 {comments.map((cm, idx) => (
//                   <Box key={idx} sx={{ mt: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ width: 30, height: 30 }} />
//                       <Typography ml={1} fontWeight="bold">
//                         {cm.user?.name || cm.user?.email || 'Unknown'}
//                       </Typography>
//                       <Typography ml={1} variant="caption" color="text.secondary">
//                         • {dayjs(cm.createdAt).fromNow()}
//                       </Typography>
//                     </Box>
//                     <Typography ml={4}>{cm.text}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoPlayer;
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress, IconButton,
  Avatar, TextField, Button, Toolbar
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Sidebar from '../Sidebar';
import CommonNav from '../CommonNav';

dayjs.extend(relativeTime);

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());

  // ✅ Decode token to get user email
  const token = localStorage.getItem('token');
  let currentUserEmail = '';
  try {
    const decoded = jwt_decode(token);
    currentUserEmail = decoded.email;
  } catch (err) {
    console.error('Invalid token');
  }

  // ⏳ Update time every 30 seconds for live comment time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchVideo();
    fetchLikes();
    fetchComments();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error('Failed to load video:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikes = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/${id}/likes`);
      setLikes(res.data);
    } catch (err) {
      console.error('Failed to load likes:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  const userLiked = likes.some((like) => like.user?.email === currentUserEmail);

  // ✅ Toggle like/unlike
  const handleLike = async () => {
    try {
      if (userLiked) {
        const userLike = likes.find((like) => like.user?.email === currentUserEmail);
        await axios.delete(`http://localhost:3000/admin/${id}/likes/${currentUserEmail}`);
      } else {
        await axios.post(`http://localhost:3000/admin/${id}/likes`, {
          email: currentUserEmail,
        });
      }
      fetchLikes();
    } catch (err) {
      console.error('Like/unlike error:', err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(`http://localhost:3000/admin/${id}/comments`, {
        email: currentUserEmail,
        text: commentText.trim(),
      });
      setCommentText('');
      fetchComments();
    } catch (err) {
      console.error('Comment post error:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/${id}/comments/${commentId}`, {
        data: { email: currentUserEmail },
      });
      fetchComments();
    } catch (err) {
      console.error('Delete comment failed:', err);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
  if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

  const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} userType="admin" />
      <Box
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
          transition: 'margin 0.3s'
        }}
      >
        <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Toolbar />
        <Box sx={{ display: 'flex', p: 3 }}>
          {/* Left: Video and actions */}
          <Box sx={{ flex: 3 }}>
            <Typography variant="h5">{video.title}</Typography>
            {videoUrl && (
              <video width="100%" height="auto" controls src={videoUrl} />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <IconButton
                onClick={() => {
                  handleLike();
                  setShowLikes((prev) => !prev);
                  setShowComments(false);
                }}
              >
                <ThumbUpIcon color={userLiked ? 'primary' : 'action'} />
                <Typography ml={1}>{likes.length}</Typography>
              </IconButton>
              <IconButton
                onClick={() => {
                  setShowComments((prev) => !prev);
                  setShowLikes(false);
                }}
              >
                <ChatBubbleOutlineIcon color={showComments ? 'primary' : 'action'} />
                <Typography ml={1}>{comments.length}</Typography>
              </IconButton>
            </Box>
            <Typography mt={2}>{video.description}</Typography>
          </Box>

          {/* Right: Likes or Comments */}
          <Box sx={{ flex: 2, ml: 4 }}>
            {showLikes && (
              <Box>
                <Typography variant="h6">Liked by</Typography>
                {likes.map((like, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Avatar />
                    <Typography ml={1}>
                      {like.user?.name || like.user?.email || 'Unknown'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {showComments && (
              <Box>
                <Typography variant="h6">{comments.length} Comments</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  sx={{ my: 1 }}
                />
                <Button variant="contained" size="small" onClick={handleCommentSubmit}>
                  Post
                </Button>
                {comments.map((cm) => (
                  <Box key={cm._id} sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 30, height: 30 }} />
                      <Typography ml={1} fontWeight="bold">
                        {cm.user?.name || cm.user?.email || 'Unknown'}
                      </Typography>
                      <Typography ml={1} variant="caption" color="text.secondary">
                        • {dayjs(cm.createdAt).from(currentTime)}
                      </Typography>
                      {cm.user?.email === currentUserEmail && (
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteComment(cm._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                    <Typography ml={4}>{cm.text}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;

// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Box, Typography, CircularProgress, IconButton,
//   Avatar, TextField, Button, Toolbar
// } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// // import jwtDecode from 'jwt-decode';
// // import { jwtDecode } from "jwt-decode";
// import jwt_decode from "jwt-decode";


// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// dayjs.extend(relativeTime);
// const token = localStorage.getItem("token");

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;
// const decoded = jwt_decode(token);

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [likes, setLikes] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [showLikes, setShowLikes] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [commentText, setCommentText] = useState('');
//   const [deleteId, setDeleteId] = useState(null);
//   const holdTimer = useRef(null);

//   // ✅ Decode JWT to get user info
//   const token = localStorage.getItem('token');
//   let currentUserEmail = '';
//   try {
//     const decoded = jwtDecode(token);
//     currentUserEmail = decoded.email;
//   } catch (err) {
//     console.error('Invalid token or not logged in');
//   }

//   useEffect(() => {
//     fetchVideo();
//     fetchLikes();
//     fetchComments();
//   }, [id]);

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLikes = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/${id}/likes`);
//       setLikes(res.data);
//     } catch (err) {
//       console.error('Failed to load likes:', err);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/${id}/comments`);
//       setComments(res.data);
//     } catch (err) {
//       console.error('Failed to load comments:', err);
//     }
//   };

//   const userLiked = likes.some(like => like.user?.email === currentUserEmail);

//   const handleLike = async () => {
//     try {
//       await axios.post(`http://localhost:3000/admin/${id}/likes`, {
//         email: currentUserEmail
//       });
//       fetchLikes();
//     } catch (err) {
//       console.error('Like toggle error:', err);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (!commentText.trim()) return;
//     try {
//       await axios.post(`http://localhost:3000/admin/${id}/comments`, {
//         email: currentUserEmail,
//         text: commentText.trim()
//       });
//       setCommentText('');
//       fetchComments();
//     } catch (err) {
//       console.error('Adding comment failed:', err);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:3000/admin/${id}/comments/${commentId}`, {
//         data: { email: currentUserEmail }
//       });
//       setDeleteId(null);
//       fetchComments();
//     } catch (err) {
//       console.error('Delete comment failed:', err);
//     }
//   };

//   const handleCommentLongPress = (commentId) => {
//     setDeleteId(commentId);
//   };

//   const handleCommentRelease = () => {
//     setTimeout(() => {
//       setDeleteId(null);
//     }, 2000);
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar open={sidebarOpen} userType="admin" />
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s'
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Box sx={{ display: 'flex', p: 3 }}>
//           {/* Left: Video and actions */}
//           <Box sx={{ flex: 3 }}>
//             <Typography variant="h5">{video.title}</Typography>
//             {videoUrl && (
//               <video width="100%" height="auto" controls src={videoUrl} />
//             )}
//             <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//               <IconButton onClick={() => {
//                 handleLike();
//                 setShowLikes(true);
//                 setShowComments(false);
//               }}>
//                 <ThumbUpIcon color={userLiked ? 'primary' : 'action'} />
//                 <Typography ml={1}>{likes.length}</Typography>
//               </IconButton>
//               <IconButton onClick={() => {
//                 setShowComments(true);
//                 setShowLikes(false);
//               }}>
//                 <ChatBubbleOutlineIcon color={showComments ? 'primary' : 'action'} />
//                 <Typography ml={1}>{comments.length}</Typography>
//               </IconButton>
//             </Box>
//             <Typography mt={2}>{video.description}</Typography>
//           </Box>

//           {/* Right: Likes or Comments */}
//           <Box sx={{ flex: 2, ml: 4 }}>
//             {showLikes && (
//               <Box>
//                 <Typography variant="h6">Liked by</Typography>
//                 {likes.map((like, idx) => (
//                   <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Avatar />
//                     <Typography ml={1}>
//                       {like.user?.name || like.user?.email || 'Unknown'}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}

//             {showComments && (
//               <Box>
//                 <Typography variant="h6">{comments.length} Comments</Typography>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Add a comment"
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   sx={{ my: 1 }}
//                 />
//                 <Button variant="contained" size="small" onClick={handleCommentSubmit}>
//                   Post
//                 </Button>
//                 {comments.map((cm) => (
//                   <Box
//                     key={cm._id}
//                     onMouseDown={() => {
//                       if (cm.user?.email === currentUserEmail) {
//                         holdTimer.current = setTimeout(() => handleCommentLongPress(cm._id), 600);
//                       }
//                     }}
//                     onMouseUp={() => {
//                       clearTimeout(holdTimer.current);
//                       handleCommentRelease();
//                     }}
//                     sx={{ mt: 2 }}
//                   >
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ width: 30, height: 30 }} />
//                       <Typography ml={1} fontWeight="bold">
//                         {cm.user?.name || cm.user?.email || 'Unknown'}
//                       </Typography>
//                       <Typography ml={1} variant="caption" color="text.secondary">
//                         • {dayjs(cm.createdAt).fromNow()}
//                       </Typography>
//                       {deleteId === cm._id && cm.user?.email === currentUserEmail && (
//                         <IconButton size="small" onClick={() => handleDeleteComment(cm._id)}>
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       )}
//                     </Box>
//                     <Typography ml={4}>{cm.text}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoPlayer;




// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CircularProgress, IconButton,
//   Avatar, TextField, Button, Toolbar
// } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';

// dayjs.extend(relativeTime);

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const currentUserEmail = "shaluanupama16@gmail.com"; // Replace with dynamic user in real app

// const VideoPlayer = () => {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [likes, setLikes] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [showLikes, setShowLikes] = useState(false);
//   const [showComments, setShowComments] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [commentText, setCommentText] = useState('');

//   const userLiked = likes.some(like => like.user?.email === currentUserEmail);

//   useEffect(() => {
//     fetchVideo();
//     fetchLikes();
//     fetchComments();
//   }, [id]);

//   const fetchVideo = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLikes = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/${id}/likes`);
//       setLikes(res.data);
//     } catch (err) {
//       console.error('Failed to load likes:', err);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/${id}/comments`);
//       setComments(res.data);
//     } catch (err) {
//       console.error('Failed to load comments:', err);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       await axios.post(`http://localhost:3000/admin/${id}/likes`, {
//         email: currentUserEmail
//       });
//       fetchLikes();
//     } catch (err) {
//       console.error('Like toggle error:', err);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (!commentText.trim()) return;
//     try {
//       await axios.post(`http://localhost:3000/admin/${id}/comments`, {
//         email: currentUserEmail,
//         text: commentText.trim()
//       });
//       setCommentText('');
//       fetchComments();
//     } catch (err) {
//       console.error('Adding comment failed:', err);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:3000/admin/${id}/comments/${commentId}`, {
//         data: { email: currentUserEmail }
//       });
//       fetchComments();
//     } catch (err) {
//       console.error('Delete comment failed:', err);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
//   if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

//   const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar open={sidebarOpen} userType="admin" />
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: sidebarOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
//           transition: 'margin 0.3s'
//         }}
//       >
//         <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <Toolbar />
//         <Box sx={{ display: 'flex', p: 3 }}>
//           {/* Video and actions */}
//           <Box sx={{ flex: 3 }}>
//             <Typography variant="h5">{video.title}</Typography>
//             {videoUrl && (
//               <video width="100%" height="auto" controls src={videoUrl} />
//             )}
//             <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//               <IconButton onClick={handleLike}>
//                 <ThumbUpIcon color={userLiked ? 'primary' : 'action'} />
//                 <Typography ml={1}>{likes.length}</Typography>
//               </IconButton>
//               <IconButton onClick={() => { setShowComments(true); setShowLikes(false); }}>
//                 <ChatBubbleOutlineIcon color={showComments ? 'primary' : 'action'} />
//                 <Typography ml={1}>{comments.length}</Typography>
//               </IconButton>
//             </Box>
//             <Typography mt={2}>{video.description}</Typography>
//           </Box>

//           {/* Likes or Comments panel */}
//           <Box sx={{ flex: 2, ml: 4 }}>
//             {showLikes && (
//               <Box>
//                 <Typography variant="h6">Liked by</Typography>
//                 {likes.map((like, idx) => (
//                   <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Avatar />
//                     <Typography ml={1}>
//                       {like.user?.name || like.user?.email || 'Unknown'}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}

//             {showComments && (
//               <Box>
//                 <Typography variant="h6">{comments.length} Comments</Typography>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Add a comment"
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   sx={{ my: 1 }}
//                 />
//                 <Button variant="contained" size="small" onClick={handleCommentSubmit}>
//                   Post
//                 </Button>
//                 {comments.map((cm) => (
//                   <Box key={cm._id} sx={{ mt: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ width: 30, height: 30 }} />
//                       <Typography ml={1} fontWeight="bold">
//                         {cm.user?.name || cm.user?.email || 'Unknown'}
//                       </Typography>
//                       <Typography ml={1} variant="caption" color="text.secondary">
//                         • {dayjs(cm.createdAt).fromNow()}
//                       </Typography>
//                       {cm.user?.email === currentUserEmail && (
//                         <IconButton size="small" onClick={() => handleDeleteComment(cm._id)}>
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       )}
//                     </Box>
//                     <Typography ml={4}>{cm.text}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoPlayer;
