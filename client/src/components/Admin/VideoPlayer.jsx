import React, { useEffect, useState } from 'react'; //last working code 4/08
import {
  Box, Typography, CircularProgress, IconButton, Avatar,
  TextField, Button, Toolbar, Tooltip, Card, CardMedia,
  Menu, MenuItem, Divider,
  Chip
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './VideoPlayer.css';

import Sidebar from '../Sidebar';
import CommonNav from '../CommonNav';
import axiosInstance from '../axiosInterceptor';
import SendIcon from "@mui/icons-material/Send";
dayjs.extend(relativeTime);
import VisibilityIcon from '@mui/icons-material/Visibility';

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const getEmailColor = (email) => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 45%)`; // HSL generates vibrant color
  return color;
};
const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [anchorEls, setAnchorEls] = useState({});
  const [showFullDesc, setShowFullDesc] = useState(false);
   const [views, setViews] = useState([]);
const [hasTrackedView, setHasTrackedView] = useState(false);

  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('role');
  let currentUserEmail = '', currentUserId = '';

  try {
    const decoded = jwt_decode(token);
    currentUserEmail = decoded.email;
    currentUserId = decoded.userId || decoded.id;
  } catch {}

  useEffect(() => {
    fetchVideo();
    fetchLikes();
    fetchComments();
    checkIfSaved();
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

  const checkIfSaved = async () => {
    try {
      const res = await axiosInstance.get(`save/saved/check/${id}`);
      setSaved(res.data.isSaved);
    } catch (err) {
      console.error('Failed to check saved status:', err);
    }
  };

  const userLiked = likes.some((like) => like.user?.email === currentUserEmail);

  const handleLike = async () => {
    try {
      if (userLiked) {
        await axiosInstance.delete(`/admin/${id}/likes/${currentUserEmail}`);
      } else {
        await axiosInstance.post(`/admin/${id}/likes`, { email: currentUserEmail });
        await axiosInstance.post(`/activity/like/${id}`);
      }
      fetchLikes();
    } catch (err) {
      console.error('Like/unlike error:', err);
    }
  };

  const toggleLikesView = () => {
    setShowLikes((prev) => !prev);
    setShowComments(false);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      if (editingCommentId) {
        await axiosInstance.put(`/admin/${id}/comments/${editingCommentId}`, { text: commentText.trim() });
        setEditingCommentId(null);
      } else {
        await axiosInstance.post(`/admin/${id}/comments`, {
          email: currentUserEmail,
          text: commentText.trim(),
        });
        await axiosInstance.post(`/activity/comment/${id}`, { text: commentText.trim() });
      }

      setCommentText('');
      fetchComments();
    } catch (err) {
      console.error('Comment error:', err);
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

  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setCommentText(comment.text);
  };

  const handleToggleSave = async () => {
    try {
      if (saved) {
        await axiosInstance.delete(`save/saved/${id}`);
      } else {
        await axiosInstance.post(`save/saved/${id}`);
      }
      setSaved(!saved);
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };
useEffect(() => {
  const fetchViews = async () => {
    try {
      const res = await axiosInstance.get(`/view/video/${id}`);
      setViews(res.data);
    } catch (err) {
      console.error('Error fetching views:', err);
    }
  };

  fetchViews();
}, [id]);
const trackVideoView = async () => {
  if (hasTrackedView || !currentUserId) return;

  try {
    await axiosInstance.post(`view/video/${id}/track`, {
      userId: currentUserId
    });
    setHasTrackedView(true);
  } catch (err) {
    console.error('Failed to record view:', err);
  }
};

  const handleMenuOpen = (event, commentId) => {
    setAnchorEls((prev) => ({ ...prev, [commentId]: event.currentTarget }));
  };

  const handleMenuClose = (commentId) => {
    setAnchorEls((prev) => ({ ...prev, [commentId]: null }));
  };

  if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;
  if (!video) return <Typography mt={10} ml={10}>Video not found</Typography>;

  const videoUrl = `http://localhost:3000/${video.fileUrl.replace(/\\/g, '/')}`;
  const pdfUrl = video.overviewPdf && `http://localhost:3000/${video.overviewPdf}`;
  const cardLeft = sidebarOpen ? drawerWidthOpen + 16 : drawerWidthClosed + 16;
const getInitials = (nameOrEmail) => {
  const name = nameOrEmail?.split('@')[0] || '';
  const words = name.split(/[.\s_-]+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
};
const getEmailColor = (email, alpha = 1) => {
  if (!email) return `rgba(150,150,150,${alpha})`; // default gray

  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  const [r, g, b] = hslToRgb(hue / 360, 0.6, 0.7); // light color

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Convert HSL to RGB
const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} userType={userType} />
      <Box sx={{ flexGrow: 1, ml: `${cardLeft}px`, transition: 'margin 0.3s' }}>
        <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Toolbar />
        <Box sx={{ display: 'flex', p: 2, gap: 2 , ml: sidebarOpen ? -28 : 8, mt: 4, px: 3 }}>
          <Card sx={{ width: '50%', padding: 2, borderRadius: 3, background: '#fff', height: 'auto' }}>
            <CardMedia
              component="video"
              src={videoUrl}
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            //   onPlay={() => axiosInstance.post(`/activity/watched/${id}`)
            // }
            onPlay={() => {
  axiosInstance.post(`/activity/watched/${id}`);
  trackVideoView(); // ✅ Call view tracking logic
}}

              sx={{ borderRadius: 2, height: 250 }}
            />
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
  {/* Left Group: Views, Likes, Comments */}
  <Box display="flex" alignItems="center" gap={1}>
    {/* 👁 Views */}
    <Box display="flex" alignItems="center" gap={0.5}>
      <Typography variant="body2" fontFamily="Poppins" sx={{ color: '#757575' }}>
        {views.length} view{views.length === 1 ? '' : 's'}
      </Typography>
    </Box>

    {/* 👍 Like */}
    <Box display="flex" alignItems="center" gap={0.5}>
      <IconButton onClick={handleLike}>
        <ThumbUpIcon color={userLiked ? 'primary' : 'action'} />
      </IconButton>
      <Typography sx={{ cursor: 'pointer' }} onClick={toggleLikesView}>
        {likes.length}
      </Typography>
    </Box>

    {/* 💬 Comment */}
    <Box display="flex" alignItems="center" gap={0.5}>
      <IconButton onClick={() => {
        setShowComments(true);
        setShowLikes(false);
      }}>
        <ChatBubbleOutlineIcon color={showComments ? 'primary' : 'action'} />
      </IconButton>
      <Typography>{comments.length}</Typography>
    </Box>
  </Box>

  {/* Right: Bookmark for users */}
  {userType === 'user' && (
    <Tooltip title={saved ? 'Unsave' : 'Save'}>
      <IconButton onClick={handleToggleSave}>
        {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
      </IconButton>
    </Tooltip>
  )}
</Box>


            <Typography variant="h6" fontWeight="bold" fontFamily='Poppins' mt={1}>{video.title}</Typography>
            {/* <Box display="flex" gap={1} mt={1}>
  {video.stack && (
    <Chip
      label={video.stack}
      size="small"
      sx={{ fontFamily: 'Poppins', bgcolor: '#e3f2fd', color: '#1976d2' }}
    />
  )}
  {video.category && (
    <Chip
      label={video.category}
      size="small"
      sx={{ fontFamily: 'Poppins', bgcolor: '#fce4ec', color: '#d81b60' }}
    />
  )}
</Box> */}
<Box display="flex" gap={1} mt={1}>
  {video.stack?.name && (
    <Chip
      label={video.stack.name}
      size="small"
      sx={{ fontFamily: 'Poppins', bgcolor: '#e3f2fd', color: '#457fb9ff' }}
    />
  )}
  {video.category?.name && (
    <Chip
      label={video.category.name}
      size="small"
      sx={{ fontFamily: 'Poppins', bgcolor: '#fce4ec', color: '#a84c6eff' }}
    />
  )}
</Box>

            <Box sx={{ mt: 1, bgcolor: 'rgba(0,0,0,0.04)', p: 2, borderRadius: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: showFullDesc ? 'block' : '-webkit-box',
                  WebkitLineClamp: showFullDesc ? 'none' : 3,
                  WebkitBoxOrient: 'vertical',
                  fontFamily:'Poppins'
                }}
              >
                {video.description}
              </Typography>
              {video.description?.length > 100 && (
                <Button onClick={() => setShowFullDesc(!showFullDesc)} size="small" sx={{ mt: 1 ,fontFamily:'Poppins'}}>
                  {showFullDesc ? 'Show Less' : 'View More'}
                </Button>
              )}
              {/* {video.videoUrl && (
  <Typography mt={1} variant="body2" fontFamily="Poppins">
    <strong>Video URL:</strong>{' '}
    <a
      href={`http://localhost:3000/${video.videoUrl?.replace(/\\/g, '/')}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#1976d2', textDecoration: 'none' }}
    >
      {video.videoUrl}
    </a>
  </Typography>
)} */}
{/* {video.videoUrl && (
  <Typography mt={1} variant="body2"   fontWeight="normal"fontFamily="Poppins">
    Video URL:{' '}
    <a
      href={
        video.videoUrl.startsWith('http')
          ? video.videoUrl
          : `http://localhost:3000/${video.videoUrl.replace(/\\/g, '/')}`
      }
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#1976d2', textDecoration: 'none' }}
    >
      {video.videoUrl}
    </a>
  </Typography>
)} */}
<Typography mt={1} variant="body2" fontWeight="normal" fontFamily="Poppins">
   Video URL:{' '}
  <a
    href={
      video.videoUrl.startsWith('http')
        ? video.videoUrl
        : `http://localhost:3000/${video.videoUrl.replace(/\\/g, '/')}`
    }
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: '#1976d2', textDecoration: 'none' }}
  >
      Reference Link
  </a>
</Typography>

              {/* {pdfUrl && (
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
)} */}

   {/* {pdfUrl && (
  <Typography mt={1} variant="body2" fontFamily='Poppins'>
    <strong>Project Document:</strong>{' '}
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#1976d2', textDecoration: 'none', marginRight: 10 }}
    >
      View PDF
    </a>
    |
    <a
      href={pdfUrl}
      download
      style={{ color: '#1976d2', textDecoration: 'none', marginLeft: 10 }}
    >
      Download
    </a>
  </Typography>
)} */}
       {pdfUrl && (
  <Typography mt={1} variant="body2" fontFamily="Poppins"  fontWeight="normal">
    Project Document:{' '}
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
 
            </Box>
          </Card>

          <Box sx={{ flex: 1 }}>
            {showLikes && (
              <>
                <Typography variant="h6" style={{fontFamily:'Poppins'}}>Liked by</Typography>
                {likes.map((like, i) => (
                  <Box key={i} display="flex" alignItems="center" mt={1}>
                    
                    <Avatar
  sx={{
    width: 30,
    height: 30,
    bgcolor: getEmailColor(like.user?.email || '', 1), // Light background with 20% opacity
    // color: getEmailColor(cm.user?.email || ''),        // Strong color for initials
    fontSize: '0.8rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  }}
>
  {getInitials(like.user?.name || like.user?.email)}
</Avatar>
                    <Typography ml={1}>{like.user?.name || like.user?.email}</Typography>
                  </Box>
                ))}
              </>
            )}
            
            {showComments && (
              <>
            <Typography variant="h6" style={{fontFamily:'Poppins'}}>{comments.length} Comments</Typography>
              <TextField fullWidth placeholder="Add a comment..." size="small" style={{fontFamily:'Poppins'}} value={commentText} onChange={(e) => setCommentText(e.target.value)} sx={{ my: 1 }} />
                {/* <Button onClick={handleCommentSubmit} variant="contained" size="small">{editingCommentId ? 'Update' : 'Post'}</Button> */}
                <Button
  onClick={handleCommentSubmit}
  variant="contained"
  size="small"
  
  endIcon={<SendIcon />}
> 
  {editingCommentId ? 'Update' : 'Post'}
</Button>

                {comments.map((cm) => (
                  <Box key={cm._id} mt={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        {/* <Avatar sx={{ width: 30, height: 30 }} /> */}
                        {/* <Avatar
  sx={{
    width: 30,
    height: 30,
    bgcolor: getEmailColor(cm.user?.email || ''),
    fontSize: '0.8rem',
    fontWeight: 'bold',
  }}
>
  {getInitials(cm.user?.name || cm.user?.email)}
</Avatar> */}
<Avatar
  sx={{
    width: 30,
    height: 30,
    bgcolor: getEmailColor(cm.user?.email || '', 1), // Light background with 20% opacity
    // color: getEmailColor(cm.user?.email || ''),        // Strong color for initials
    fontSize: '0.8rem',
    fontWeight: 'bold',
  }}
>
  {getInitials(cm.user?.name || cm.user?.email)}
</Avatar>


                        <Typography ml={1} fontWeight="bold">{cm.user?.name || cm.user?.email}</Typography>
                        <Typography ml={1} variant="caption" color="text.secondary">• {dayjs(cm.createdAt).fromNow()}</Typography>
                      </Box>


                      
                      {(cm.user?.email === currentUserEmail || userType === 'admin') && (
  <>
    <IconButton onClick={(e) => handleMenuOpen(e, cm._id)}>
      <MoreVertIcon fontSize="small" />
    </IconButton>
    <Menu
      anchorEl={anchorEls[cm._id]}
      open={Boolean(anchorEls[cm._id])}
      onClose={() => handleMenuClose(cm._id)}
    >
      {/* Only show "Edit" if current user is the owner */}
      {cm.user?.email === currentUserEmail && (
        <MenuItem
          onClick={() => {
            handleEditComment(cm);
            handleMenuClose(cm._id);
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
      )}

      {/* Show "Delete" if admin or owner */}
      <MenuItem
        onClick={() => {
          handleDeleteComment(cm._id);
          handleMenuClose(cm._id);
        }}
      >
        <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
      </MenuItem>
    </Menu>
  </>
)}

                     
                    </Box>
                    <Typography ml={4}>{cm.text}</Typography>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;









