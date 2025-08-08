
import React, { useEffect, useState } from 'react';                          // fully working code 7/8
import {
  Box, Grid, Typography, Card, CardMedia, CardContent,
  TextField, Button, Collapse, Select, InputLabel, FormControl,
  MenuItem, IconButton, Menu
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommonNav from '../CommonNav';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';
import Tooltip from '@mui/material/Tooltip';

const AdminVideo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const [stacks, setStacks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [selectedStack, setSelectedStack] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const [anchorElMap, setAnchorElMap] = useState({});
  const navigate = useNavigate();
  const userType = localStorage.getItem('role');

  useEffect(() => {
    fetchVideos();
    fetchStacks();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axiosInstance.get('/admin/videos');
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  const fetchStacks = async () => {
    try {
      const res = await axiosInstance.get('/admin/stacks');
      setStacks(res.data);
    } catch (err) {
      console.error('Error fetching stacks:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(`/admin/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axiosInstance.get(`/admin/sub-categories?categoryId=${categoryId}`);
      setSubcategories(res.data);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  };

  // const handleStackChange = async (e) => {
  //   const selected = e.target.value;
  //   setSelectedStack(selected);
  //   setSelectedCategory('');
  //   setSelectedSubcategory('');
  //   setCategories([]);
  //   setSubcategories([]);
  //   await fetchCategories(selected);
  // };
const handleStackChange = async (e) => {
  const selected = e.target.value;
  setSelectedStack(selected);
  setSelectedCategory('');
  setSelectedSubcategory('');
  setCategories([]);
  setSubcategories([]);

  if (selected) {
    await fetchCategories(selected); // Fetch all categories in the selected stack
  }
};
  // const handleCategoryChange = async (e) => {
  //   const selected = e.target.value;
  //   setSelectedCategory(selected);
  //   setSelectedSubcategory('');
  //   setSubcategories([]);
  //   await fetchSubcategories(selected);
  // };
const handleCategoryChange = async (e) => {
  const selected = e.target.value;
  setSelectedCategory(selected);
  setSelectedSubcategory('');
  setSubcategories([]);

  if (selected) {
    await fetchSubcategories(selected); // Fetch subcategories for selected category
  }
};




  const handleResetFilters = () => {
    setSelectedStack('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSearchTerm('');
    fetchVideos();
  };

  const filterVideos = () => {
    const search = searchTerm.toLowerCase();

    return videos.filter((video) => {
      const matchSearch =
        video.title?.toLowerCase().includes(search) ||
        video.stackName?.toLowerCase().includes(search) ||
        video.categoryName?.toLowerCase().includes(search) ||
        video.subcategoryName?.toLowerCase().includes(search);

      const matchStack = selectedStack ? video.stack === selectedStack : true;
      const matchCat = selectedCategory ? video.category === selectedCategory : true;
      const matchSubcat = selectedSubcategory ? video.subCategory === selectedSubcategory : true;

      return matchSearch && matchStack && matchCat && matchSubcat;
    });
  };

  const handleMenuOpen = (e, videoId) => {
    setAnchorElMap((prev) => ({ ...prev, [videoId]: e.currentTarget }));
  };

  const handleMenuClose = (videoId) => {
    setAnchorElMap((prev) => ({ ...prev, [videoId]: null }));
  };
const handleClearFilters = () => {
  setSelectedStack('');
  setSelectedCategory('');
  setSelectedSubcategory('');
  setSearchTerm('');
};

  return (
    <>
      <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} userType={userType} />

      <Box sx={{ ml: sidebarOpen ? 30 : 8, mt: 10, px: 3 }}>
        <Typography
  variant="h5"
  gutterBottom
  sx={{
    fontWeight: 700,
    fontSize: '1.8rem',
    color: '#3f7cb5ff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    letterSpacing: '0.5px',
    fontFamily: 'Poppins',
    mb: 3,
  }}
>
  {userType === 'admin' ? 'Videos' : 'Videos'}
</Typography>

        {/* <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold',color: 'cornflowerblue' }}>
          {userType === 'admin' ? ' Videos' : 'Videos'}
        </Typography> */}

        {/* Search + Buttons */}
        <TextField
  fullWidth
  variant="outlined"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px',       // makes the corners rounded
      backgroundColor: '#f5f5f5', // light gray background
      paddingLeft: '12px',
      fontFamily: 'Poppins', 

    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',             // removes the default border
    },
    '& .MuiInputBase-input': {
      padding: '10px 14px',
    },
  }}
/>

        {/* <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2}}
        /> */}

        {/* <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" onClick={handleResetFilters}>All Videos</Button>
          <Button variant="outlined" endIcon={<ExpandMoreIcon />} onClick={() => setFilterOpen(!filterOpen)}>
            Filter
          </Button>
        </Box> */}
{/* <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
  <Button
    variant="contained"
    onClick={handleResetFilters}
    sx={{
      borderRadius: '25px',
      backgroundColor: '#438edfff', // change to your primary theme color
      color: '#fff',
      textTransform: 'none',
      px: 3,
      '&:hover': {
        backgroundColor: '#0056b3',
      },
    }}
  >
    All Videos
  </Button>

  <Button
    variant="outlined"
    endIcon={<ExpandMoreIcon />}
    onClick={() => setFilterOpen(!filterOpen)}
    sx={{
      borderRadius: '25px',
      borderColor: '#527dacff',
      color: '#587ea7ff',
      textTransform: 'none',
      px: 3,
      '&:hover': {
        backgroundColor: '#e6f0ff',
        borderColor: '#769fccff',
        color: '#0056b3',
      },
    }}
  >
    Filter
  </Button>
</Box> */}
<Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Button
      variant="contained"
      onClick={handleResetFilters}
      sx={{
        borderRadius: '25px',
        backgroundColor: '#438edfff',
        color: '#fff',
        textTransform: 'none',
        px: 3,
        '&:hover': {
          backgroundColor: '#0056b3',
          fontFamily:'Poppins'
        },
      }}
    >
      All Videos
    </Button>

    <Button
      variant="outlined"
      endIcon={<ExpandMoreIcon />}
      onClick={() => setFilterOpen(!filterOpen)}
      sx={{
        borderRadius: '25px',
        borderColor: '#527dacff',
        color: '#587ea7ff',
        textTransform: 'none',
        px: 3,
        '&:hover': {
          backgroundColor: '#e6f0ff',
          borderColor: '#769fccff',
          color: '#0056b3',
        },
      }}
    >
      Filter
    </Button>
      {(selectedStack || selectedCategory || selectedSubcategory || searchTerm) && (
  <Button
    variant="outlined"
    onClick={handleClearFilters}
    sx={{
      ml: 2,
      borderRadius: '25px',
      borderColor: '#dc3545',
      color: '#dc3545',
      textTransform: 'none',
      px: 3,
      '&:hover': {
        backgroundColor: '#f8d7da',
        borderColor: '#c82333',
        color: '#a71d2a',
        fontFamily:'Poppins'
      },
    }}
  >
    Clear filter
  </Button>
)}


  </Box>
</Box>

        {/* Filters */}
   <Collapse in={filterOpen}>
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
      mb: 3,
      p: 2,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '10px',
    }}
  >
    {/* Stack Dropdown */}
    <FormControl sx={{ minWidth: 160 }} size="small">
      <InputLabel sx={{ fontFamily: 'Poppins' }}>Stack</InputLabel>
      <Select value={selectedStack} onChange={handleStackChange} label="Stack">
        {stacks.map((s) => (
          <MenuItem key={s._id} value={s._id}>
            {s.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Category Dropdown - show only if stack is selected */}
    {selectedStack && categories.length > 0 && (
      <FormControl sx={{ minWidth: 160 }} size="small">
        <InputLabel sx={{ fontFamily: 'Poppins' }}>Category</InputLabel>
        <Select value={selectedCategory} onChange={handleCategoryChange} label="Category">
          {categories.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}

    {/* Subcategory Dropdown - show only if category is selected */}
    {selectedCategory && subcategories.length > 0 && (
      <FormControl sx={{ minWidth: 160 }} size="small">
        <InputLabel sx={{ fontFamily: 'Poppins' }}>Subcategory</InputLabel>
        <Select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          label="Subcategory"
        >
          {subcategories.map((sub) => (
            <MenuItem key={sub._id} value={sub._id}>
              {sub.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  </Box>
</Collapse>


    <Grid container spacing={2} justifyContent="center">
  {filterVideos().map((video) => (
    <Grid item xs={12} sm={6} md={3} key={video._id}>
      <Card sx={{ width: 280,  width: 280,
    height: userType === 'admin' ? 230 : 230,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      cursor: 'pointer'
    }}}>
        <CardMedia
          component="img"
          height="160"
          image={`http://localhost:3000/${video.image}`}
          alt={video.title}
          onClick={() => navigate(`/admin/video/${video._id}`)}
          sx={{ cursor: 'pointer', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/220x120'; }}
        />
        
        <CardContent sx={{ p: 1 }}>
          <Tooltip title={video.title} arrow>
            <Typography 
  variant="subtitle2" 
  noWrap 
  sx={{ 
    fontWeight: 'bold',             // Strong bold
    color: '#313131ff',               // Deep gray for better readability
    fontFamily: 'Roboto, sans-serif', // Clean, professional font
    fontSize: '18px',            // Slightly larger for clarity
    letterSpacing: '0.2px',         // Tighter spacing
    textTransform: 'capitalize' ,
     // Capitalizes each word
  }}
>
  {video.title}
</Typography>

            {/* <Typography 
              variant="subtitle2" 
              noWrap 
              sx={{ fontWeight: 900, color: '#2c2b2bff',fontFamily:'-moz-initial' }} // enhanced styling
            >
              {video.title}
            </Typography> */}
          </Tooltip>

          {/* Only show stack name and 3-dot menu for admin */}
          {userType === 'admin' && (
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
              <Typography variant="caption" sx={{ color: '#555' }}>{video.stackName}</Typography>
              <IconButton size="small" onClick={(e) => handleMenuOpen(e, video._id)}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </CardContent>

        {/* Admin menu options */}
        {userType === 'admin' && (
          <Menu
            anchorEl={anchorElMap[video._id]}
            open={Boolean(anchorElMap[video._id])}
            onClose={() => handleMenuClose(video._id)}
          >
            <MenuItem onClick={() => {
              handleMenuClose(video._id);
              navigate(`/admin/videodetails/${video._id}`);
            }}>
              <VisibilityIcon fontSize="small" sx={{ mr: 1 ,fontFamily:'Poppins'}} />
              View Details
            </MenuItem>
            
          </Menu>
        )}
      </Card>
    </Grid>
  ))}
</Grid>  

       
      
        
      </Box>
    </>
  );
};

export default AdminVideo;





