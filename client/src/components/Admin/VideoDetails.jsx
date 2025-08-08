
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
