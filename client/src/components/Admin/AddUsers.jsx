
import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Alert,
  IconButton,
  Pagination,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CommonNav from '../CommonNav';
import Sidebar from '../Sidebar';
import axiosInstance from '../axiosInterceptor';

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

  const onToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Only .xlsx files are supported');
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Unauthorized. Please login again.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axiosInstance.post('http://localhost:3000/upload/upload-users', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || 'Upload successful.');
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Upload failed.');
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Unauthorized. Please login again.');
      return;
    }

    try {
      const res = await axiosInstance.get('http://localhost:3000/upload/get-users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users || []);
      setDisplayTable(true);
      setMessage('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch users');
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentUsers = users.slice(indexOfFirstRow, indexOfLastRow);

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
          backgroundColor: '#f7f9fa',
          minHeight: '100vh',
          transition: 'padding 0.3s ease',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontFamily: '-moz-initial', color: 'black' }}>
          Add User
        </Typography>

        {/* Upload Box */}
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: '12px',
            p: 3,
            mb: 2,
            maxWidth: 400,
            backgroundColor: '#fff',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}
          onClick={handleIconClick}
        >
          <Stack spacing={1} alignItems="center">
            <IconButton>
              <CloudUploadIcon sx={{ fontSize: 40, color: '#888' }} />
            </IconButton>
            <Typography variant="body1" fontWeight="500" fontFamily={'-moz-initial'}>
              {file ? file.name : 'Browse files'}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily={'-moz-initial'}>
              Drag and drop files here
            </Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Stack>
        </Box>

        {/* Upload Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ mb: 3, borderRadius: '24px', px: 4 ,fontFamily: '-moz-initial'}}
        >
          Add
        </Button>

        {/* Display Users */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Typography variant="h6" style={{fontFamily:'-moz-initial'}}>Display Added Users</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchUsers}
            sx={{ borderRadius: '24px', px: 3 ,fontFamily: '-moz-initial'}}
          >
            Display
          </Button>
        </Box>

        {/* Alert */}
        {message && (
          <Alert severity="info" sx={{ mt: 2, maxWidth: 600 }}>
            {message}
          </Alert>
        )}

        {/* User Table */}
        {displayTable && (
          <Box mt={5}>
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: 900,
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableCell><strong>Sl No</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Role</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUsers.map((user, index) => (
                    <TableRow key={user._id || index}>
                      <TableCell>{indexOfFirstRow + index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role || 'user'}</TableCell>
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
                  shape="rounded"
                />
              </Box>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddUser;
