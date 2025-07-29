// // src/components/Sidebar.jsx
// import React from 'react';
// import { Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ open, toggleSidebar, userRole }) => {
//   const navigate = useNavigate();

//   const adminLinks = [
//     { text: 'Manage Users', path: '/admin/users' },
//     { text: 'Manage Videos', path: '/admin/videos' },
//   ];

//   const userLinks = [
//     { text: 'My Videos', path: '/user/videos' },
//     { text: 'Bookmarks', path: '/user/bookmarks' },
//     { text: 'Profile', path: '/user/profile' },
//   ];

//   const linksToRender = userRole === 'admin' ? adminLinks : userLinks;

//   return (
//     <Drawer open={open} onClose={toggleSidebar}>
//       <List sx={{ width: 240 }}>
//         {linksToRender.map((item, index) => (
//           <ListItem button key={index} onClick={() => {
//             navigate(item.path);
//             toggleSidebar();
//           }}>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
// import React from 'react';
// import { Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ open, toggleSidebar, userType }) => {
//   const navigate = useNavigate();

//   const adminLinks = [
//     { text: 'Manage Users', path: '/admin/users' },
//     { text: 'Manage Videos', path: '/admin/videos' },
//   ];

//   const userLinks = [
//     { text: 'My Videos', path: '/user/videos' },
//     { text: 'Bookmarks', path: '/user/bookmarks' },
//     { text: 'Profile', path: '/user/profile' },
//   ];

//   const linksToRender = userType === 'admin' ? adminLinks : userLinks;

//   return (
//     <Drawer anchor="left" open={open} onClose={toggleSidebar}>
//       <List sx={{ width: 240 }}>
//         {linksToRender.map((item, index) => (
//           <ListItem
//             button
//             key={index}
//             onClick={() => {
//               navigate(item.path);
//               toggleSidebar(); // close after navigation
//             }}
//           >
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
// import React from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
//   Tooltip,
//   Divider,
//   Box
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   VideoLibrary as VideoIcon,
//   Save as SaveIcon,
//   Lock as PasswordIcon,
//   People as UsersIcon,
//   Add as AddUserIcon,
//   Person as ProfileIcon,
//   History as LogsIcon
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ open, toggleSidebar, userType }) => {
//   const navigate = useNavigate();

//   // Sidebar width based on state
//   const drawerWidth = open ? 240 : 60;

//   // Admin menu
//   const adminLinks = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
//     { text: 'Videos', icon: <VideoIcon />, path: '/admin/videos' },
//     { text: 'Upload', icon: <VideoIcon />, path: '/admin/upload' },
//     { text: 'User Logs', icon: <LogsIcon />, path: '/admin/logs' },
//     { text: 'Add Users', icon: <AddUserIcon />, path: '/admin/adduser' },
//     { text: 'Change Password', icon: <PasswordIcon />, path: '/admin/password' }
//   ];

//   // User menu
//   const userLinks = [
//     { text: 'My Videos', icon: <VideoIcon />, path: '/user/videos' },
//     { text: 'Saved Videos', icon: <SaveIcon />, path: '/user/bookmarks' },
//     { text: 'Change Password', icon: <PasswordIcon />, path: '/user/password' }
//   ];

//   const linksToRender = userType === 'admin' ? adminLinks : userLinks;

//   const handleProfileClick = () => {
//     navigate(userType === 'admin' ? '/admin/profile' : '/user/profile');
//     toggleSidebar(); // optional: close on profile click
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       open={open}
//       onClose={toggleSidebar}
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           top: 64, // match your Navbar height (AppBar height)
//           height: 'calc(100% - 64px)',
//           transition: 'width 0.3s',
//           overflowX: 'hidden'
//         }
//       }}
//     >
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         p={2}
//         onClick={handleProfileClick}
//         sx={{ cursor: 'pointer' }}
//       >
//         <Tooltip title="Profile" placement="right" disableHoverListener={open}>
//           <Avatar sx={{ width: 48, height: 48 }} />
//         </Tooltip>
//         {open && (
//           <Box mt={1} fontWeight="bold">
//             {userType === 'admin' ? 'Admin' : 'Username'}
//           </Box>
//         )}
//       </Box>

//       <Divider />

//       <List>
//         {linksToRender.map((item, index) => (
//           <ListItem
//             button
//             key={index}
//             onClick={() => {
//               navigate(item.path);
//               toggleSidebar(); // optional
//             }}
//             sx={{ justifyContent: open ? 'flex-start' : 'center' }}
//           >
//             <Tooltip title={item.text} placement="right" disableHoverListener={open}>
//               <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto' }}>
//                 {item.icon}
//               </ListItemIcon>
//             </Tooltip>
//             {open && <ListItemText primary={item.text} />}
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;





// import React from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Tooltip,
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   VideoLibrary as VideoIcon,
//   Save as SaveIcon,
//   Lock as PasswordIcon,
//   People as UsersIcon,
//   Add as AddUserIcon,
//   History as LogsIcon
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ open, userType }) => {
//   const navigate = useNavigate();
//   const drawerWidth = open ? 240 : 60;

//   const adminLinks = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
//     { text: 'Videos', icon: <VideoIcon />, path: '/admin/videos' },
//     { text: 'Upload', icon: <VideoIcon />, path: '/admin/upload' },
//     { text: 'User Logs', icon: <LogsIcon />, path: '/admin/logs' },
//     { text: 'Add Users', icon: <AddUserIcon />, path: '/admin/adduser' },
//     { text: 'Change Password', icon: <PasswordIcon />, path: '/admin/password' },
//   ];

//   const userLinks = [
//     { text: 'My Videos', icon: <VideoIcon />, path: '/user/videos' },
//     { text: 'Saved Videos', icon: <SaveIcon />, path: '/user/bookmarks' },
//     { text: 'Change Password', icon: <PasswordIcon />, path: '/user/password' },
//   ];

//   const linksToRender = userType === 'admin' ? adminLinks : userLinks;

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           top: 64, // Match AppBar height
//           height: 'calc(100% - 64px)',
//           transition: 'width 0.3s',
//           overflowX: 'hidden',
//         },
//       }}
//       open={open}
//     >
//       <List>
//         {linksToRender.map((item, index) => (
//           <ListItemButton
//             button
//             key={index}
//             onClick={() => navigate(item.path)}
//             sx={{
//               justifyContent: open ? 'flex-start' : 'center',
//               px: open ? 2 : 1,
//             }}
//           >
//             <Tooltip title={!open ? item.text : ''} placement="right">
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 2 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//             </Tooltip>
//             {open && <ListItemText primary={item.text} />}
//           </ListItemButton>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  VideoLibrary as VideoIcon,
  Save as SaveIcon,
  Lock as PasswordIcon,
  Add as AddUserIcon,
  History as LogsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, userType }) => {
  const navigate = useNavigate();
  const drawerWidth = open ? 240 : 60;

  const adminLinks = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Videos', icon: <VideoIcon />, path: '/admin/videos' },
    { text: 'Upload', icon: <VideoIcon />, path: '/admin/upload' },
    { text: 'User Logs', icon: <LogsIcon />, path: '/admin/logs' },
    { text: 'Add Users', icon: <AddUserIcon />, path: '/admin/adduser' },
    { text: 'Change Password', icon: <PasswordIcon />, path: '/admin/password' },
  ];

  const userLinks = [
    { text: 'My Videos', icon: <VideoIcon />, path: '/admin/videos' },
    { text: 'Saved Videos', icon: <SaveIcon />, path: '/user/bookmarks' },
    { text: 'Change Password', icon: <PasswordIcon />, path: '/user/password' },
  ];

  const linksToRender = userType === 'admin' ? adminLinks : userLinks;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: 64, // Align below AppBar
          height: 'calc(100% - 64px)',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <List>
        {linksToRender.map((item, index) => (
          <Tooltip key={item.text} title={!open ? item.text : ''} placement="right">
            <ListItem
              button
              onClick={() => navigate(item.path)}
              sx={{
                justifyContent: open ? 'flex-start' : 'center',
                px: open ? 2 : 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
