



// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Avatar,
//   IconButton, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText,
//   Stack, Grid, Paper, TextField, Pagination, CardContent
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';
// import axiosInstance from '../axiosInterceptor';
// import { useNavigate } from 'react-router-dom';
// import './VideoPlayer.css';

// const ITEMS_PER_PAGE = 7;

// const UserActivity = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [sessions, setSessions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dateSearch, setDateSearch] = useState('');
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [summary, setSummary] = useState({ logins: 0, logouts: 0, watched: 0, likes: 0, comments: 0 });
//   const navigate = useNavigate();
//   const userType = localStorage.getItem('role');

//   useEffect(() => {
//     if (userType !== 'admin') {
//       navigate('/not-authorized');
//     } else {
//       fetchActivities();
//     }
//   }, []);

//   const fetchActivities = async () => {
//     try {
//       const res = await axiosInstance.get('/activity/all-activities');
//       const users = res.data.filter(user => user.role !== 'admin');

//       let logins = 0, logouts = 0, watched = 0, likes = 0, comments = 0;
//       const allSessions = [];

//       users.forEach(user => {
//         user.sessions.forEach(session => {
//           logins++;
//           if (session.logoutAt) logouts++;
//           watched += session.watchedVideos?.length || 0;
//           likes += session.likes?.length || 0;
//           comments += session.comments?.length || 0;

//           allSessions.push({ ...session, user });
//         });
//       });

//       setSummary({ logins, logouts, watched, likes, comments });
//       setSessions(allSessions);
//     } catch (err) {
//       console.error("Error fetching activity:", err);
//     }
//   };

//   const filteredSessions = sessions.filter(({ user, loginAt }) => {
//     const search = searchTerm.toLowerCase();
//     const matchesNameOrEmail =
//       user.name?.toLowerCase().includes(search) ||
//       user.email?.toLowerCase().includes(search);

//     const matchesDate = dateSearch
//       ? new Date(loginAt).toLocaleDateString() === new Date(dateSearch).toLocaleDateString()
//       : true;

//     return matchesNameOrEmail && matchesDate;
//   });

//   const paginatedSessions = filteredSessions.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handleViewSession = (session) => {
//     setSelectedSession(session);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedSession(null);
//   };

//   const summaryCards = [
//     { label: 'Logins', value: summary.logins, icon: <LoginIcon color="primary" fontSize="large" /> },
//     { label: 'Logouts', value: summary.logouts, icon: <LogoutIcon color="error" fontSize="large" /> },
//     { label: 'Watched Videos', value: summary.watched, icon: <PlayCircleOutlineIcon color="success" fontSize="large" /> },
//     { label: 'Likes', value: summary.likes, icon: <ThumbUpAltOutlinedIcon color="secondary" fontSize="large" /> }
//   ];

//   return (
//     <>
//       <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//       <Sidebar open={sidebarOpen} userType={userType} />

//       <Box className="user-activity-container">
//         <Typography variant="h5" gutterBottom>User Activity</Typography>

//         {/* Summary Cards */}
//         <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
//           {summaryCards.map((item, i) => (
//             <Grid item xs={12} sm={6} md={3} key={i}>
//               <Box className="summary-card">
//                 {item.icon}
//                 <CardContent sx={{ textAlign: 'right' }}>
//                   <Typography variant="h6">{item.value}</Typography>
//                   <Typography variant="body2">{item.label}</Typography>
//                 </CardContent>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Search Fields */}
//         <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={5} md={4}>
//             <TextField
//               label="Search by name or email"
//               fullWidth
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item xs={12} sm={5} md={4}>
//             <TextField
//               label="Search by date"
//               type="date"
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//               value={dateSearch}
//               onChange={(e) => setDateSearch(e.target.value)}
//               variant="outlined"
//             />
//           </Grid>
//         </Grid>

//         {/* User Sessions Table */}
//         <Paper className="user-activity-table">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name & Email</TableCell>
//                 <TableCell>Login Time</TableCell>
//                 <TableCell>Logout Time</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedSessions.map((session, i) => (
//                 <TableRow key={i}>
//                   <TableCell>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Avatar src={session.user.avatarUrl}>{session.user.name[0]}</Avatar>
//                       <Box>
//                         <Typography>{session.user.name}</Typography>
//                         <Typography variant="caption">{session.user.email}</Typography>
//                       </Box>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>{new Date(session.loginAt).toLocaleString()}</TableCell>
//                   <TableCell>
//                     {session.logoutAt
//                       ? new Date(session.logoutAt).toLocaleString()
//                       : <Typography color="warning.main">Active</Typography>}
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleViewSession(session)}>
//                       <VisibilityIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <Box display="flex" justifyContent="center" my={2}>
//             <Pagination
//               count={Math.ceil(filteredSessions.length / ITEMS_PER_PAGE)}
//               page={currentPage}
//               onChange={(e, value) => setCurrentPage(value)}
//               color="primary"
//             />
//           </Box>
//         </Paper>
//       </Box>

//       {/* Activity Modal */}
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Session Activities</DialogTitle>
//         <DialogContent dividers>
//           {selectedSession ? (
//             <List>
//               {selectedSession.watchedVideos.map((video, i) => (
//                 <ListItem key={`watch-${i}`}>
//                   <ListItemText
//                     primary={`Watched: ${video.title}`}
//                     secondary={new Date(video.watchedAt).toLocaleString()}
//                   />
//                 </ListItem>
//               ))}
//               {selectedSession.likes.map((video, i) => (
//                 <ListItem key={`like-${i}`}>
//                   <ListItemText
//                     primary={`Liked: ${video.title}`}
//                     secondary={new Date(video.likedAt).toLocaleString()}
//                   />
//                 </ListItem>
//               ))}
//               {selectedSession.comments.map((video, i) => (
//                 <ListItem key={`comment-${i}`}>
//                   <ListItemText
//                     primary={`Commented on: ${video.title}`}
//                     secondary={`${video.comment} — ${new Date(video.commentedAt).toLocaleString()}`}
//                   />
//                 </ListItem>
//               ))}
//               {(selectedSession.watchedVideos.length === 0 &&
//                 selectedSession.likes.length === 0 &&
//                 selectedSession.comments.length === 0) && (
//                   <Typography>No activity during this session.</Typography>
//                 )}
//             </List>
//           ) : null}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default UserActivity;
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Avatar,
//   IconButton, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText,
//   Stack, Grid, Paper, TextField, Pagination, Card, CardContent, Grow
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import Sidebar from '../Sidebar';
// import CommonNav from '../CommonNav';
// import axiosInstance from '../axiosInterceptor';
// import { useNavigate } from 'react-router-dom';

// const ITEMS_PER_PAGE = 7;

// const UserActivity = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [sessions, setSessions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dateSearch, setDateSearch] = useState('');
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [summary, setSummary] = useState({ logins: 0, logouts: 0, watched: 0, likes: 0, comments: 0 });
//   const navigate = useNavigate();
//   const userType = localStorage.getItem('role');

//   useEffect(() => {
//     if (userType !== 'admin') {
//       navigate('/not-authorized');
//     } else {
//       fetchActivities();
//     }
//   }, []);

//   const fetchActivities = async () => {
//     try {
//       const res = await axiosInstance.get('/activity/all-activities');
//       const users = res.data.filter(user => user.role !== 'admin');

//       let logins = 0, logouts = 0, watched = 0, likes = 0, comments = 0;
//       const allSessions = [];

//       users.forEach(user => {
//         user.sessions.forEach(session => {
//           logins++;
//           if (session.logoutAt) logouts++;
//           watched += session.watchedVideos?.length || 0;
//           likes += session.likes?.length || 0;
//           comments += session.comments?.length || 0;

//           allSessions.push({ ...session, user });
//         });
//       });

//       // Prioritize active sessions (logoutAt is null)
//       const sortedSessions = allSessions.sort((a, b) => {
//         if (!a.logoutAt && b.logoutAt) return -1;
//         if (a.logoutAt && !b.logoutAt) return 1;
//         return new Date(b.loginAt) - new Date(a.loginAt);
//       });

//       setSummary({ logins, logouts, watched, likes, comments });
//       setSessions(sortedSessions);
//     } catch (err) {
//       console.error("Error fetching activity:", err);
//     }
//   };

//   const filteredSessions = sessions.filter(({ user, loginAt }) => {
//     const search = searchTerm.toLowerCase();
//     const matchesNameOrEmail =
//       user.name?.toLowerCase().includes(search) ||
//       user.email?.toLowerCase().includes(search);

//     const matchesDate = dateSearch
//       ? new Date(loginAt).toLocaleDateString() === new Date(dateSearch).toLocaleDateString()
//       : true;

//     return matchesNameOrEmail && matchesDate;
//   });

//   const paginatedSessions = filteredSessions.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handleViewSession = (session) => {
//     setSelectedSession(session);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedSession(null);
//   };

//   const summaryCards = [
//     { label: 'Logins', value: summary.logins, icon: <LoginIcon sx={{ fontSize: 40, color: '#1976d2' }} /> },
//     { label: 'Logouts', value: summary.logouts, icon: <LogoutIcon sx={{ fontSize: 40, color: '#d32f2f' }} /> },
//     { label: 'Watched', value: summary.watched, icon: <PlayCircleOutlineIcon sx={{ fontSize: 40, color: '#2e7d32' }} /> },
//     { label: 'Likes', value: summary.likes, icon: <ThumbUpAltOutlinedIcon sx={{ fontSize: 40, color: '#9c27b0' }} /> },
//   ];

//   return (
//     <>
//       <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//       <Sidebar open={sidebarOpen} userType={userType} />

//       <Box className="user-activity-container" sx={{ ml: sidebarOpen ? 30 : 8, mt: 10, px: 3 }}>
//         <Typography variant="h5" gutterBottom>User Activity</Typography>

//         {/* Summary Cards with animation */}
//         <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
//           {summaryCards.map((item, i) => (
//             <Grid item xs={12} sm={6} md={3} key={i}>
//               <Grow in={true} timeout={500 + i * 200}>
//                 <Card sx={{ borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 2, minHeight: 110 }}>
//                   {item.icon}
//                   <CardContent sx={{ textAlign: 'right' }}>
//                     <Typography variant="h6">{item.value}</Typography>
//                     <Typography variant="body2">{item.label}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grow>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Search Inputs */}
//         <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={5} md={4}>
//             <TextField
//               label="Search by name or email"
//               fullWidth
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ borderRadius: 2 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5} md={4}>
//             <TextField
//               label="Search by date"
//               type="date"
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//               variant="outlined"
//               value={dateSearch}
//               onChange={(e) => setDateSearch(e.target.value)}
//               sx={{ borderRadius: 2 }}
//             />
//           </Grid>
//         </Grid>

//         {/* User Sessions Table */}
//         <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
//                 <TableCell><strong>User</strong></TableCell>
//                 <TableCell><strong>Login</strong></TableCell>
//                 <TableCell><strong>Logout</strong></TableCell>
//                 <TableCell align="center"><strong>Details</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedSessions.map((session, i) => (
//                 <TableRow key={i}>
//                   <TableCell>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Avatar>{session.user.name[0]}</Avatar>
//                       <Box>
//                         <Typography>{session.user.name}</Typography>
//                         <Typography variant="caption">{session.user.email}</Typography>
//                       </Box>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>{new Date(session.loginAt).toLocaleString()}</TableCell>
//                   <TableCell>
//                     {session.logoutAt
//                       ? new Date(session.logoutAt).toLocaleString()
//                       : <Typography color="warning.main">Active</Typography>}
//                   </TableCell>
//                   <TableCell align="center">
//                     <IconButton color="primary" onClick={() => handleViewSession(session)}>
//                       <VisibilityIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <Box display="flex" justifyContent="center" my={2}>
//             <Pagination
//               count={Math.ceil(filteredSessions.length / ITEMS_PER_PAGE)}
//               page={currentPage}
//               onChange={(e, value) => setCurrentPage(value)}
//               color="primary"
//             />
//           </Box>
//         </Paper>
//       </Box>

//       {/* Session Detail Dialog */}
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Session Activities</DialogTitle>
//         <DialogContent dividers>
//           {selectedSession ? (
//             <List>
//               {selectedSession.watchedVideos.map((video, i) => (
//                 <ListItem key={`watch-${i}`}>
//                   <ListItemText
//                     primary={`🎬 Watched: ${video.title}`}
//                     secondary={new Date(video.watchedAt).toLocaleString()}
//                   />
//                 </ListItem>
//               ))}
//               {selectedSession.likes.map((video, i) => (
//                 <ListItem key={`like-${i}`}>
//                   <ListItemText
//                     primary={`👍 Liked: ${video.title}`}
//                     secondary={new Date(video.likedAt).toLocaleString()}
//                   />
//                 </ListItem>
//               ))}
//               {selectedSession.comments.map((video, i) => (
//                 <ListItem key={`comment-${i}`}>
//                   <ListItemText
//                     primary={`💬 Commented: ${video.title}`}
//                     secondary={`${video.comment} — ${new Date(video.commentedAt).toLocaleString()}`}
//                   />
//                 </ListItem>
//               ))}
//               {(selectedSession.watchedVideos.length === 0 &&
//                 selectedSession.likes.length === 0 &&
//                 selectedSession.comments.length === 0) && (
//                   <Typography sx={{ mt: 2 }}>No activity during this session.</Typography>
//                 )}
//             </List>
//           ) : null}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default UserActivity;
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Avatar,
  IconButton, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText,
  Stack, Grid, Paper, TextField, Pagination, Card, CardContent, Grow, Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Sidebar from '../Sidebar';
import CommonNav from '../CommonNav';
import axiosInstance from '../axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import './VideoPlayer.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const ITEMS_PER_PAGE = 7;

const UserActivity = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [summary, setSummary] = useState({ logins: 0, logouts: 0, watched: 0, likes: 0, comments: 0 });
  const navigate = useNavigate();
  const userType = localStorage.getItem('role');

  useEffect(() => {
    if (userType !== 'admin') {
      navigate('/not-authorized');
    } else {
      fetchActivities();
    }
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await axiosInstance.get('/activity/all-activities');
      const users = res.data.filter(user => user.role !== 'admin');

      let logins = 0, logouts = 0, watched = 0, likes = 0, comments = 0;
      const allSessions = [];

      users.forEach(user => {
        user.sessions.forEach(session => {
          logins++;
          if (session.logoutAt) logouts++;
          watched += session.watchedVideos?.length || 0;
          likes += session.likes?.length || 0;
          comments += session.comments?.length || 0;

          allSessions.push({ ...session, user });
        });
      });

      const sortedSessions = allSessions.sort((a, b) => {
        if (!a.logoutAt && b.logoutAt) return -1;
        if (a.logoutAt && !b.logoutAt) return 1;
        return new Date(b.loginAt) - new Date(a.loginAt);
      });

      setSummary({ logins, logouts, watched, likes, comments });
      setSessions(sortedSessions);
    } catch (err) {
      console.error("Error fetching activity:", err);
    }
  };

  const filteredSessions = sessions.filter(({ user, loginAt }) => {
    const search = searchTerm.toLowerCase();
    const matchesNameOrEmail =
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search);

    const matchesDate = dateSearch
      ? new Date(loginAt).toLocaleDateString() === new Date(dateSearch).toLocaleDateString()
      : true;

    return matchesNameOrEmail && matchesDate;
  });
const exportToExcel = () => {
  const wsData = filteredSessions.map((session) => ({
    Name: session.user.name,
    Email: session.user.email,
    Login: new Date(session.loginAt).toLocaleString(),
    Logout: session.logoutAt ? new Date(session.logoutAt).toLocaleString() : 'Active',
    Watched: session.watchedVideos.length,
    Likes: session.likes.length,
    Comments: session.comments.length,
  }));

  const worksheet = XLSX.utils.json_to_sheet(wsData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'UserActivity');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'user-activity.xlsx');
};
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewSession = (session) => {
    setSelectedSession(session);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSession(null);
  };

  // const handleClear = () => {
  //   setSearchTerm('');
  //   setDateSearch('');
  // };
const handleClear = async () => {
  try {
    await axiosInstance.delete('/activity/clear-all');
    alert("All user activity cleared");
    fetchActivities(); // Refetch updated data
  } catch (err) {
    console.error(err);
    alert("Failed to clear activity");
  }
};

  // const csvData = filteredSessions.map((session, i) => ({
  //   Name: session.user.name,
  //   Email: session.user.email,
  //   Login: new Date(session.loginAt).toLocaleString(),
  //   Logout: session.logoutAt ? new Date(session.logoutAt).toLocaleString() : 'Active',
  //   Watched: session.watchedVideos.length,
  //   Likes: session.likes.length,
  //   Comments: session.comments.length,
  // }));

  const summaryCards = [
    { label: 'Logins', value: summary.logins, icon: <LoginIcon sx={{ fontSize: 40, color: '#1976d2' }} /> },
    { label: 'Logouts', value: summary.logouts, icon: <LogoutIcon sx={{ fontSize: 40, color: '#d32f2f' }} /> },
    { label: 'Watched', value: summary.watched, icon: <PlayCircleOutlineIcon sx={{ fontSize: 40, color: '#2e7d32' }} /> },
    { label: 'Likes', value: summary.likes, icon: <ThumbUpAltOutlinedIcon sx={{ fontSize: 40, color: '#9c27b0' }} /> },
  ];
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
    <>
      <CommonNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} userType={userType} />

      <Box className="user-activity-container" sx={{ ml: sidebarOpen ? 30 : 8, mt: 10, px: 3 }}>
        <Typography variant="h5" gutterBottom sx={{
    fontWeight: 700,
    fontSize: '1.8rem',
    color: '#3f7cb5ff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    letterSpacing: '0.5px',
    mb: 3,
    fontFamily:'Poppins'
  }}>User Activity</Typography>

        {/* Summary Cards */}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {summaryCards.map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Grow in={true} timeout={500 + i * 200}>
                <Card sx={{ borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 2, minHeight: 110 }}>
                  {item.icon}
                  <CardContent sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" style={{fontFamily:'Poppins'}}>{item.value}</Typography>
                    <Typography variant="body2" style={{fontFamily:'Poppins'}}>{item.label}</Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Search Bar + Export & Clear */}
        <Grid container spacing={2} alignItems="center" justifyContent="space-between" >
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              className="search-field"
              label="Search by name or email"
              font-Family='Poppins'
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
    mb: 3,
    '& .MuiOutlinedInput-root': {
      borderRadius: '25px',
      backgroundColor: '#f5f5f5',
    },
    '& input': {
      padding: '14px 14px',
    },
  }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              className="search-field"
              label="Search by date"
              fontFamily='Poppins'
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
              sx={{
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '25px',
      backgroundColor: '#f5f5f5',
    },
    '& input': {
      padding: '10px 14px',
    },
  }}
            />
          </Grid>
          <Grid item xs={12} md={4} className="export-clear-buttons">
            <Button onClick={handleClear} color="warning" variant="outlined" style={{fontFamily:'Poppins'}}>Clear All</Button>
            {/* <CSVLink data={csvData} filename="user-activity.csv" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="success">Export CSV</Button>
            </CSVLink> */}
            <Button variant="contained" color="success" onClick={exportToExcel}>
  Export to Excel
</Button>

          </Grid>
        </Grid>

        {/* Sessions Table */}
        <Paper className="table-container" elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f1eaeaff' }}>
                <TableCell sx={{fontFamily:'Poppins'}}><strong>User</strong></TableCell>
                <TableCell sx={{fontFamily:'Poppins'}}><strong>Login</strong></TableCell>
                <TableCell sx={{fontFamily:'Poppins'}}><strong>Logout</strong></TableCell>
                <TableCell align="center" sx={{fontFamily:'Poppins'}}><strong>Details</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSessions.map((session, i) => (
                <TableRow key={i} className="table-row">
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {/* <Avatar>{session.user.name[0]}</Avatar> */}
                                        <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          bgcolor: getEmailColor(session.user?.email || '', 1), // Light background with 20% opacity
                          // color: getEmailColor(cm.user?.email || ''),        // Strong color for initials
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          fontFamily: 'Poppins',
                        }}
                      >
                        {getInitials(session.user?.name || session.user?.email)}
                      </Avatar>
                      <Box>
                        <Typography style={{fontFamily:'Poppins'}}>{session.user.name}</Typography>
                        <Typography variant="caption" style={{fontFamily:'Poppins'}}>{session.user.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{new Date(session.loginAt).toLocaleString()}</TableCell>
                  <TableCell>
                    {session.logoutAt
                      ? new Date(session.logoutAt).toLocaleString()
                      : <Typography color="warning.main" >Active</Typography>}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleViewSession(session)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box display="flex" justifyContent="center" my={2}>
            <Pagination
              count={Math.ceil(filteredSessions.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </Paper>
      </Box>

      {/* Detail Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle style={{fontFamily:'Poppins'}}>Session Activities</DialogTitle>
        <DialogContent dividers>
          {selectedSession ? (
            <List>
              {selectedSession.watchedVideos.map((video, i) => (
                <ListItem key={`watch-${i}`}>
                  <ListItemText
                   style={{fontFamily:'Poppins'}}
                    primary={`🎬 Watched: ${video.title}`}
                    secondary={new Date(video.watchedAt).toLocaleString()}
                  />
                </ListItem>
              ))}
              {selectedSession.likes.map((video, i) => (
                <ListItem key={`like-${i}`}>
                  <ListItemText
                   sx={{fontFamily:'Poppins'}}
                    primary={`👍 Liked: ${video.title}`}
                    secondary={new Date(video.likedAt).toLocaleString()}
                  />
                </ListItem>
              ))}
              {selectedSession.comments.map((video, i) => (
                <ListItem key={`comment-${i}`}>
                  <ListItemText
                   sx={{fontFamily:'Poppins'}}
                    primary={`💬 Commented: ${video.title}`}
                    secondary={`${video.comment} — ${new Date(video.commentedAt).toLocaleString()}`}
                  />
                </ListItem>
              ))}
              {(selectedSession.watchedVideos.length === 0 &&
                selectedSession.likes.length === 0 &&
                selectedSession.comments.length === 0) && (
                  <Typography sx={{ mt: 2,fontFamily:'Poppins' }}>No activity during this session.</Typography>
                )}
            </List>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserActivity;
