

// export default VideoPlayer;
// import React, { useEffect, useState } from 'react';                                       // working one
// import {
//   Box, Typography, CircularProgress, IconButton,
//   Avatar, TextField, Button, Toolbar
// } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';
// import axiosInstance from '../axiosInterceptor';

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
//   const [showComments, setShowComments] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [commentText, setCommentText] = useState('');
//   const [currentTime, setCurrentTime] = useState(Date.now());

//   // ✅ Decode token to get user email
//   const token = localStorage.getItem('token');
//   let currentUserEmail = '';
//   try {
//     const decoded = jwt_decode(token);
//     currentUserEmail = decoded.email;
//   } catch (err) {
//     console.error('Invalid token');
//   }

//   // ⏳ Update time every 30 seconds for live comment time
//   useEffect(() => {
//     const interval = setInterval(() => setCurrentTime(Date.now()), 30000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     fetchVideo();
//     fetchLikes();
//     fetchComments();
//   }, [id]);

//   const fetchVideo = async () => {
//     try {
//       const res = await axiosInstance.get(`http://localhost:3000/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLikes = async () => {
//     try {
//       const res = await axiosInstance.get(`http://localhost:3000/admin/${id}/likes`);
//       setLikes(res.data);
//     } catch (err) {
//       console.error('Failed to load likes:', err);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const res = await axiosInstance.get(`http://localhost:3000/admin/${id}/comments`);
//       setComments(res.data);
//     } catch (err) {
//       console.error('Failed to load comments:', err);
//     }
//   };

//   const userLiked = likes.some((like) => like.user?.email === currentUserEmail);

//   // ✅ Toggle like/unlike
//   const handleLike = async () => {
//     try {
//       if (userLiked) {
//         const userLike = likes.find((like) => like.user?.email === currentUserEmail);
//         await axiosInstance.delete(`http://localhost:3000/admin/${id}/likes/${currentUserEmail}`);
//       } else {
//         await axiosInstance.post(`http://localhost:3000/admin/${id}/likes`, {
//           email: currentUserEmail,
//         });
//       }
//       fetchLikes();
//     } catch (err) {
//       console.error('Like/unlike error:', err);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (!commentText.trim()) return;
//     try {
//       await axiosInstance.post(`http://localhost:3000/admin/${id}/comments`, {
//         email: currentUserEmail,
//         text: commentText.trim(),
//       });
//       setCommentText('');
//       fetchComments();
//     } catch (err) {
//       console.error('Comment post error:', err);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axiosInstance.delete(`http://localhost:3000/admin/${id}/comments/${commentId}`, {
//         data: { email: currentUserEmail },
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
//           {/* Left: Video and actions */}
//           <Box sx={{ flex: 3 }}>
//             <Typography variant="h5">{video.title}</Typography>
//             {videoUrl && (
//               <video width="100%" height="auto" controls src={videoUrl} />
//             )}
//             <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//               <IconButton
//                 onClick={() => {
//                   handleLike();
//                   setShowLikes((prev) => !prev);
//                   setShowComments(false);
//                 }}
//               >
//                 <ThumbUpIcon color={userLiked ? 'primary' : 'action'} />
//                 <Typography ml={1}>{likes.length}</Typography>
//               </IconButton>
//               <IconButton
//                 onClick={() => {
//                   setShowComments((prev) => !prev);
//                   setShowLikes(false);
//                 }}
//               >
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
//                   <Box key={cm._id} sx={{ mt: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ width: 30, height: 30 }} />
//                       <Typography ml={1} fontWeight="bold">
//                         {cm.user?.name || cm.user?.email || 'Unknown'}
//                       </Typography>
//                       <Typography ml={1} variant="caption" color="text.secondary">
//                         • {dayjs(cm.createdAt).from(currentTime)}
//                       </Typography>
//                       {cm.user?.email === currentUserEmail && (
//                         <IconButton
//                           size="small"
//                           onClick={() => handleDeleteComment(cm._id)}
//                         >
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

// import React, { useEffect, useState } from 'react';                                       // working for admin user comment like,delete
// import {
//   Box, Typography, CircularProgress, IconButton,
//   Avatar, TextField, Button, Toolbar
// } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useParams } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';
// import axiosInstance from '../axiosInterceptor';

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
//   const [showComments, setShowComments] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [commentText, setCommentText] = useState('');
//   const [currentTime, setCurrentTime] = useState(Date.now());

//   // ✅ Get user role and email
//   const token = localStorage.getItem('token');
//   const userType = localStorage.getItem('role'); // admin or user
//   let currentUserEmail = '';
//   try {
//     const decoded = jwt_decode(token);
//     currentUserEmail = decoded.email;
//   } catch (err) {
//     console.error('Invalid token');
//   }

//   // ⏳ Update relative comment time
//   useEffect(() => {
//     const interval = setInterval(() => setCurrentTime(Date.now()), 30000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     fetchVideo();
//     fetchLikes();
//     fetchComments();
//   }, [id]);

//   const fetchVideo = async () => {
//     try {
//       const res = await axiosInstance.get(`/admin/video/${id}`);
//       setVideo(res.data);
//     } catch (err) {
//       console.error('Failed to load video:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLikes = async () => {
//     try {
//       const res = await axiosInstance.get(`/admin/${id}/likes`);
//       setLikes(res.data);
//     } catch (err) {
//       console.error('Failed to load likes:', err);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const res = await axiosInstance.get(`/admin/${id}/comments`);
//       setComments(res.data);
//     } catch (err) {
//       console.error('Failed to load comments:', err);
//     }
//   };

//   const userLiked = likes.some((like) => like.user?.email === currentUserEmail);

//   const handleLike = async () => {
//     try {
//       if (userLiked) {
//         await axiosInstance.delete(`/admin/${id}/likes/${currentUserEmail}`);
//       } else {
//         await axiosInstance.post(`/admin/${id}/likes`, { email: currentUserEmail });
//       }
//       fetchLikes();
//     } catch (err) {
//       console.error('Like/unlike error:', err);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (!commentText.trim()) return;
//     try {
//       await axiosInstance.post(`/admin/${id}/comments`, {
//         email: currentUserEmail,
//         text: commentText.trim(),
//       });
//       setCommentText('');
//       fetchComments();
//     } catch (err) {
//       console.error('Comment post error:', err);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axiosInstance.delete(`/admin/${id}/comments/${commentId}`, {
//         data: { email: currentUserEmail },
//       });
// //       await axiosInstance.delete(`/admin/${id}/comments/${commentId}`, {
// //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// // });
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
//       {/* ✅ Role-based Sidebar */}
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
//         <Box sx={{ display: 'flex', p: 3 }}>
//           {/* Left: Video and actions */}
//           <Box sx={{ flex: 3 }}>
//             <Typography variant="h5">{video.title}</Typography>
//             {videoUrl && (
//               <video
//                 width="100%"
//                 height="auto"
//                 controls
//                 controlsList="nodownload"   // 🚫 disable download
//                 onContextMenu={(e) => e.preventDefault()} // 🚫 disable right-click
//                 src={videoUrl}
//               />
//             )}
//             <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//               <IconButton
//                 onClick={() => {
//                   handleLike();
//                   setShowLikes((prev) => !prev);
//                   setShowComments(false);
//                 }}
//               >
//                 <ThumbUpIcon color={userLiked ? 'primary' : 'action'} />
//                 <Typography ml={1}>{likes.length}</Typography>
//               </IconButton>
//               <IconButton
//                 onClick={() => {
//                   setShowComments((prev) => !prev);
//                   setShowLikes(false);
//                 }}
//               >
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
//                   <Box key={cm._id} sx={{ mt: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ width: 30, height: 30 }} />
//                       <Typography ml={1} fontWeight="bold">
//                         {cm.user?.name || cm.user?.email || 'Unknown'}
//                       </Typography>
//                       <Typography ml={1} variant="caption" color="text.secondary">
//                         • {dayjs(cm.createdAt).from(currentTime)}
//                       </Typography>
//                       {cm.user?.email === currentUserEmail && (
//                         <IconButton
//                           size="small"
//                           onClick={() => handleDeleteComment(cm._id)}
//                         >
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


import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress, IconButton,
  Avatar, TextField, Button, Toolbar
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Sidebar from '../Sidebar';
import CommonNav from '../CommonNav';
import axiosInstance from '../axiosInterceptor';

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

  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('role');
  let currentUserEmail = '';
  let currentUserId = '';

  try {
    const decoded = jwt_decode(token);
    currentUserEmail = decoded.email;
    currentUserId = decoded.userId || decoded.id;
  } catch (err) {
    console.error('Invalid token');
  }

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
      const res = await axiosInstance.get(`/admin/video/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error('Failed to load video:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikes = async () => {
    try {
      const res = await axiosInstance.get(`/admin/${id}/likes`);
      setLikes(res.data);
    } catch (err) {
      console.error('Failed to load likes:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/admin/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  const userLiked = likes.some((like) => like.user?.email === currentUserEmail);

  // ✅ Like and track in user activity
  const handleLike = async () => {
    try {
      if (userLiked) {
        await axiosInstance.delete(`/admin/${id}/likes/${currentUserEmail}`);
      } else {
        await axiosInstance.post(`/admin/${id}/likes`, { email: currentUserEmail });
        await axiosInstance.post(`/activity/like/${id}`); // Track like
      }
      fetchLikes();
    } catch (err) {
      console.error('Like/unlike error:', err);
    }
  };

  // ✅ Comment and track in user activity
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await axiosInstance.post(`/admin/${id}/comments`, {
        email: currentUserEmail,
        text: commentText.trim(),
      });
      await axiosInstance.post(`/activity/comment/${id}`, { text: commentText.trim() }); // Track comment
      setCommentText('');
      fetchComments();
    } catch (err) {
      console.error('Comment post error:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/admin/${id}/comments/${commentId}`, {
        data: { email: currentUserEmail },
      });
      fetchComments();
    } catch (err) {
      console.error('Delete comment failed:', err);
    }
  };

  // ✅ Track watched video when play starts
  const handleVideoPlay = async () => {
    try {
      await axiosInstance.post(`/activity/watched/${id}`);
    } catch (err) {
      console.error('Failed to track watched video:', err);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
  if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

  const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} userType={userType} />
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
          <Box sx={{ flex: 3 }}>
            <Typography variant="h5">{video.title}</Typography>
            {videoUrl && (
              <video
                width="100%"
                height="auto"
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                src={videoUrl}
                onPlay={handleVideoPlay} // 🔥 Track watched
              />
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
