
import React, { useEffect, useRef, useState } from 'react';                  // 04/08/2025 9.
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack,
  Alert, IconButton, Pagination, Chip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import axiosInstance from '../axiosInterceptor';
import Sidebar from '../Sidebar';
import CommonNav from '../CommonNav';

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const appBarHeight = 64;

const AddUser = () => {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [displayTable, setDisplayTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const onToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile?.name.endsWith('.xlsx')) {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Only .xlsx files are supported');
    }
  };

  const handleIconClick = () => fileInputRef.current.click();
const [skippedUsers, setSkippedUsers] = useState([]);
  // const handleUpload = async () => {
  //   if (!file) return setMessage('Please select a file.');

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const res = await axiosInstance.post('/upload/upload-users', formData);
  //     const { existingUsers = [], failedEmails = [], successCount = 0 } = res.data;

  //     let statusMsg = `${successCount} email(s) sent successfully.`;
  //     if (existingUsers.length) statusMsg += ` ${existingUsers.length} already existed.`;
  //     if (failedEmails.length) statusMsg += ` ${failedEmails.length} failed to send.`;

  //     setMessage(statusMsg);
  //     setFile(null);
  //     fetchUsers(); // reload after upload
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || 'Upload failed.');
  //   }
  // };
const handleUpload = async () => {
  if (!file) return setMessage('Please select a file.');

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axiosInstance.post('/upload/upload-users', formData);
    const { created = [], skipped = [] } = res.data;

    setSkippedUsers(skipped); // 👈 Save skipped emails

    let statusMsg = `${created.length} user(s) uploaded successfully. ${skipped.length} skipped.`;
    setMessage(statusMsg);
    setFile(null);
    fetchUsers(); // Reload users
  } catch (error) {
    setMessage(error.response?.data?.message || 'Upload failed.');
  }
};
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/upload/get-users');
      setUsers(res.data.users || []);
      setDisplayTable(true);
      setMessage('');
    } catch {
      setMessage('Failed to fetch users');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/upload/deleteuser/${userId}`);
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch {
      setMessage('Failed to delete user');
    }
  };

  const handleClearAll = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all users?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete('/upload/clear-all-users');
      setUsers([]);
      setMessage('All users deleted successfully');
    } catch {
      setMessage('Failed to delete all users');
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await axiosInstance.put(`/upload/toggle-status/${userId}`, { isActive: !currentStatus });
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, isActive: !currentStatus } : user
        )
      );
    } catch {
      setMessage('Failed to toggle user status');
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const currentUsers = users.slice(indexOfLastRow - rowsPerPage, indexOfLastRow);

  useEffect(() => {
    fetchUsers(); // load on first mount
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CommonNav onToggleSidebar={onToggleSidebar} />
      <Sidebar open={isSidebarOpen} userType="admin" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: `${appBarHeight + 24}px`,
          pl: isSidebarOpen ? `${drawerWidthOpen + 24}px` : `${drawerWidthClosed + 24}px`,
          pr: 4,
          pb: 4,
          backgroundColor: 'white',
          minHeight: '100vh',
          transition: 'padding 0.3s ease',
           ml: isSidebarOpen ? 9 : 8, mt: 2, px: 3 
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold"  color=''style={{ fontFamily: 'Poppins' }} sx={{
    fontWeight: 600,
    fontSize: '1.7rem',
    color: '#3f7cb5ff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    letterSpacing: '0.5px',
    mb: 3,
  }}>
          Add User
        </Typography>

        {/* Upload Box */}
        <Box
          sx={{
            border: '1px solid grey',
            borderRadius: '12px',
            p: 3,
            mb: 2,
            maxWidth: 400,
            backgroundColor: '#fff',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={handleIconClick}
        >
          <Stack spacing={1} alignItems="center">
            <IconButton>
              <CloudUploadIcon sx={{ fontSize: 40, color: '#888' }} />
            </IconButton>
            <Typography style={{fontFamily:'Poppins'}}>{file ? file.name : 'Browse files'}</Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Stack>
        </Box>

        {/* Upload + Display + Clear */}
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" onClick={handleUpload} sx={{ borderRadius: '24px', px: 3, fontFamily: 'Poppins' }} >Add Users</Button>
          <Button variant="contained" onClick={fetchUsers} sx={{ borderRadius: '24px', px: 3, fontFamily: 'Poppins' }}>Display Users</Button>
          <Button variant="outlined" color="error" onClick={handleClearAll}  startIcon={<ClearAllIcon />} sx={{ borderRadius: '24px', px: 3, fontFamily: 'Poppins' }}>
            Clear All
          </Button>
        </Stack>

        {message && (
          <Alert severity="info" sx={{ mb: 2, maxWidth: 600 }}>
            {message}
          </Alert>
        )}

        {/* User Table */}
        {displayTable && (
          <TableContainer component={Paper} sx={{ maxWidth: 900 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                  <TableCell style={{fontFamily:'Poppins'}}><strong>Sl No</strong></TableCell>
                  <TableCell style={{fontFamily:'Poppins'}}><strong>Name</strong></TableCell>
                  <TableCell style={{fontFamily:'Poppins'}}><strong>Email</strong></TableCell>
                  <TableCell style={{fontFamily:'Poppins'}}><strong>Status</strong></TableCell>
                  <TableCell style={{fontFamily:'Poppins'}}><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUsers.map((user, index) => (
                  <TableRow key={user._id || index}>
                    <TableCell style={{fontFamily:'Poppins'}}>{indexOfLastRow - rowsPerPage + index + 1}</TableCell>
                    <TableCell style={{fontFamily:'Poppins'}}>{user.name}</TableCell>
                    <TableCell style={{fontFamily:'Poppins'}}>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.isActive ? 'Active' : 'Inactive'}
                        color={user.isActive ? 'success' : 'default'}
                        size="small"
                        style={{fontFamily:'Poppins'}}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => handleToggleStatus(user._id, user.isActive)}>
                          {user.isActive ? <ToggleOffIcon color="primary" /> : <ToggleOnIcon color="primary" />}
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteUser(user._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="center" my={2}>
              <Pagination
                count={Math.ceil(users.length / rowsPerPage)}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </TableContainer>
        )}
        {skippedUsers.length > 0 && (
  <>
    <Typography variant="h6" sx={{ mt: 4, fontFamily: 'Poppins', color: 'black' }}>
      Skipped Users (Already Exists or Invalid)
    </Typography>
    <TableContainer component={Paper} sx={{ maxWidth: 900, mt: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
            <TableCell style={{ fontFamily: 'Poppins' }}><strong>Sl No</strong></TableCell>
            <TableCell style={{ fontFamily: 'Poppins' }}><strong>Email</strong></TableCell>
            <TableCell style={{ fontFamily: 'Poppins' }}><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skippedUsers.map((email, index) => (
            <TableRow key={email}>
              <TableCell style={{ fontFamily: 'Poppins' }}>{index + 1}</TableCell>
              <TableCell style={{ fontFamily: 'Poppins' }}>{email}</TableCell>
              <TableCell>
                <Chip
                  label="Skipped"
                  color="error"
                  size="small"
                  style={{ fontFamily: 'Poppins' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)}

      </Box>
    </Box>
  );
};

export default AddUser;
