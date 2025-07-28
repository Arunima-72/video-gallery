import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Card, CardMedia, CardContent, IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommonNav from '../CommonNav';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosInterceptor';

const AdminVideo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [videos, setVideos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const res = await axiosInstance.get('http://localhost:3000/admin/videos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('logintoken')}`
        }
      });
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleMoreClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedVideoId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVideoId(null);
  };

  const handleEdit = () => {
    navigate(`/admin/edit-video/${selectedVideoId}`);
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/video/${selectedVideoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('logintoken')}`
        }
      });
      fetchVideos();
    } catch (err) {
      console.error('Error deleting video:', err);
    }
    handleMenuClose();
  };

  return (
    <>
      <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} userType="admin" />

      <Box sx={{ ml: sidebarOpen ? 30 : 8, mt: 10, px: 3 }}>
        <Typography variant="h5" gutterBottom>All Videos</Typography>
        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video._id}>
              <Card
                sx={{ cursor: 'pointer', position: 'relative', maxWidth: 300 }}
                onClick={() => navigate(`/admin/video/${video._id}`)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image="https://www.rlogical.com/wp-content/uploads/2020/12/MERN.webp" // Replace with actual preview if available
                  alt={video.title}
                />
                <CardContent>
                  <Typography variant="subtitle1">{video.title}</Typography>
                </CardContent>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // prevent navigation
                    handleMoreClick(e, video._id);
                  }}
                  sx={{ position: 'absolute', top: 5, right: 5 }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default AdminVideo;
