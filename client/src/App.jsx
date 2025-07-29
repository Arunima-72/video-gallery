import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import AdminDashboard from './components/Admin/AdminDashboard'
import Sidebar from './components/Sidebar'
// import UserDashboard from './components/User/UserDashboard'

import AddUsers from './components/Admin/AddUsers'
import AddFormWrapper from './components/Admin/AddFormWrapper'
import AdminVideo from './components/Admin/AdminVideo'
import VideoPlayer from './components/Admin/VideoPlayer'
import VideoForm from './components/Admin/VideoForm'

function App() {
  

  return (
    <>
    {/* <Navbar /> */}
      
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
      {/* <Route path="/admin/adduser" element={<AddUsers />} /> */}
      {/* Add more routes as needed */}
    <Route path="/admin/adduser" element={<AddUsers/>} />
    
<Route path="/admin/add/:type" element={<AddFormWrapper />} />
<Route path="/admin/edit/:type/:id" element={<AddFormWrapper />} />
<Route path="/admin/videos" element={<AdminVideo />} />
 <Route path="/admin/video/:id" element={<VideoPlayer />} />
 <Route path="/admin/upload" element={<VideoForm />} />
         <Route path="/admin/edit-video/:id" element={<VideoForm />} />
    </Routes>
    
  
    
    </>
  )
}

export default App



// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import Login from './components/Login';
// import AdminDashboard from './components/Admin/AdminDashboard';
// // import UserDashboard from './components/User/UserDashboard';
// import AddUsers from './components/Admin/AddUsers';
// import AddFormWrapper from './components/Admin/AddFormWrapper';
// import AdminVideo from './components/Admin/AdminVideo';
// import VideoPlayer from './components/Admin/VideoPlayer';
// import VideoForm from './components/Admin/VideoForm';
// import PrivateRoutes from './components/PrivateRoutes';

// function App() {
//   return (
//     <Routes>
//       {/* Wrap with Main Layout */}
//       {/* <Route element={<Main />}> */}
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/login" element={<Login />} /> */}

//         {/* Admin Routes */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <PrivateRoutes allowedRoles={['admin']}>
//               <AdminDashboard />
//             </PrivateRoutes>
//           }
//         />
//         <Route
//           path="/admin/adduser"
//           element={
//             <PrivateRoutes allowedRoles={['admin']}>
//               <AddUsers />
//             </PrivateRoutes>
//           }
//         />
//         <Route
//           path="/admin/add/:type"
//           element={
//             <PrivateRoutes allowedRoles={['admin']}>
//               <AddFormWrapper />
//             </PrivateRoutes>
//           }
//         />
//         <Route
//           path="/admin/edit/:type/:id"
//           element={
//             <PrivateRoutes allowedRoles={['admin']}>
//               <AddFormWrapper />
//             </PrivateRoutes>
//           }
//         />
//         {/* <Route
//           path="/admin/videos"
//           element={
//             <PrivateRoutes allowedRoles={['admin']}>
//               <AdminVideo />
//             </PrivateRoutes>
//           }
//         /> */}
// // <Route path="/admin/videos" element={<AdminVideo />} />



//         <Route
//           path="/admin/video/:id"
//           element={
//             <PrivateRoutes allowedRoles={['admin']}>
//               <VideoPlayer />
//             </PrivateRoutes>
//           }
//         />
//         <Route
//           path="/admin/upload"
//           element={
//             <PrivateRoutes allowedRoles={['admin']}>
//               <VideoForm />
//             </PrivateRoutes>
//           }
//         />
//         <Route
//           path="/admin/edit-video/:id"
//           element={
//             <PrivateRoutes allowedRoles={['admin']}>
//               <VideoForm />
//             </PrivateRoutes>
//           }
//         />

//         {/* User Routes */}
//         {/* <Route
//           path="/user/dashboard"
//           element={
//             <PrivateRoutes allowedRoles={['user']}>
//               <UserDashboard />
//             </PrivateRoutes>
//           }
//         /> */}
//       {/* </Route> */}
//     </Routes>
//   );
// }

// export default App;
