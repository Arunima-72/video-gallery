
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearAllIcon from "@mui/icons-material/DeleteSweep";

import axiosInstance from "../axiosInterceptor";
import CommonNav from "../CommonNav";
import Sidebar from "../Sidebar";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:3000/save/contact");
      setContacts(res.data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:3000/save/contact/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all contact entries?")) {
      try {
        await axiosInstance.delete("http://localhost:3000/save/all");
        setContacts([]);
      } catch (err) {
        console.error("Error clearing all contacts:", err);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Box sx={{ display: "flex" }}>
        <Sidebar open={sidebarOpen} userType="admin" />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "white",
            minHeight: "100vh",
            p: 4,
            mt: 8,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4"  sx={{
    fontWeight: 700,
    fontSize: '1.8rem',
    color: '#3f7cb5ff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    letterSpacing: '0.5px',
    fontFamily: 'Poppins',
    mb: 3,
  }} >Contact Submissions</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ClearAllIcon />}
              onClick={handleClearAll}
              size="small"
            >
              Clear All
            </Button>
          </Box>

          <TextField
            label="Search "
            fontFamily="Poppins"
            // variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2,'& .MuiOutlinedInput-root': {
      borderRadius: '50px',       // makes the corners rounded
      backgroundColor: 'rgba(245, 245, 245, 1)', // light gray background
      paddingLeft: '12px',
      fontFamily: 'Poppins', 

    }, }}
          />

          {loading ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontFamily:'Poppins'}}><strong>Name</strong></TableCell>
                    <TableCell style={{fontFamily:'Poppins'}}><strong>Email</strong></TableCell>
                    <TableCell style={{fontFamily:'Poppins'}}><strong>Message</strong></TableCell>
                    <TableCell style={{fontFamily:'Poppins'}}><strong>Submitted At</strong></TableCell>
                    <TableCell style={{fontFamily:'Poppins'}}><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                      <TableRow key={contact._id}>
                        <TableCell style={{fontFamily:'Poppins'}}>{contact.name}</TableCell>
                        <TableCell style={{fontFamily:'Poppins'}}>{contact.email}</TableCell>
                        <TableCell style={{fontFamily:'Poppins'}}>{contact.message}</TableCell>
                        <TableCell>
                          {new Date(contact.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(contact._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No matching contacts found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AdminContact;
