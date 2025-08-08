

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import CommonNav from '../CommonNav';
import Sidebar from '../Sidebar';
import AddForm from './AddForm'; // import the form component

const API = 'http://localhost:3000/admin';
const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const appBarHeight = 64;

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stacks, setStacks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [dialogType, setDialogType] = useState('stack');
  const [editItemId, setEditItemId] = useState(null);

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
      setStacks(stackRes.data || []);
      setCategories(catRes.data || []);
      setSubCategories(subCatRes.data || []);
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
    setDialogMode('add');
    setDialogType(type);
    setEditItemId(null);
    setDialogOpen(true);
  };

  const handleEdit = () => {
    if (!selectedItem) return;
    setDialogMode('edit');
    setDialogType(selectedItem.type);
    setEditItemId(selectedItem._id);
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    const { _id, type } = selectedItem;
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${type}/${_id}`, { headers });
      fetchAll(); // reload list
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
    handleMenuClose();
  };

  const handleMenuOpen = (event, item, type) => {
    setMenuAnchor(event.currentTarget);
    setSelectedItem({ ...item, type });
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedItem(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTimeout(() => fetchAll(), 500); // refresh list
  };

  const renderSection = (title, items, type) => {
    const scrollRef = useRef(null);
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    return (
      <Box mb={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600} style={{fontFamily:'Poppins'}}>{title}</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="contained"  sx={{
    fontFamily: 'Poppins',
    color: '"#41596eff"',  }} startIcon={<AddCircleIcon />} size="small" onClick={() => handleAdd(type)}>
              Add
            </Button>
            <Button endIcon={<ArrowForwardIcon />} onClick={scrollRight} size="small">
              View More
            </Button>
          </Box>
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            pb: 1,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {items.length > 0 ? items.map((item) => (
            <Card key={item._id}
              sx={{ width: 200, minWidth: 160, height: 180, flexShrink: 0, borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000/uploads/${item.image}`}
                alt={item.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent
                sx={{
                  textAlign: 'center',
                  p: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2"  style={{fontFamily:'Poppins'}} fontWeight={500} noWrap sx={{ maxWidth: '80%' }}>
                  {item.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(event) => handleMenuOpen(event, item, type)}
                  sx={{ backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          )) : (
            <Typography variant="body2" ml={2}>No {title.toLowerCase()} found.</Typography>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <CommonNav onToggleSidebar={onToggleSidebar} />
      <Box
        className="fixed top-16 left-0 h-[calc(100%-64px)] z-10"
        sx={{ width: isSidebarOpen ? drawerWidthOpen : drawerWidthClosed }}
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
        {/* <Box sx={{ backgroundColor: '#fff', p: 3, mb: 4, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h5" fontWeight={700}>Welcome</Typography>
        </Box> */}

        {renderSection('Stacks', stacks, 'stack')}
        {renderSection('Categories', categories, 'category')}
        {renderSection('Sub-Categories', subCategories, 'sub-category')}

        {/* Menu for Edit/Delete */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>

        {/* Form Dialog for Add/Edit */}
        <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
  <DialogContent>
    <AddForm
      type={dialogType}
      mode={dialogMode}
      itemId={editItemId}
      onSuccess={handleDialogClose}
    />
  </DialogContent>
</Dialog>

        {/* <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>{dialogMode === 'add' ? `Add ${dialogType}` : `Edit ${dialogType}`}</DialogTitle>
          <DialogContent>
            <AddForm
              type={dialogType}
              mode={dialogMode}
              itemId={editItemId}
              onSuccess={handleDialogClose}
            />
          </DialogContent>
        </Dialog> */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
