


import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddUsers from './components/Admin/AddUsers';
import AddFormWrapper from './components/Admin/AddFormWrapper';
import AdminVideo from './components/Admin/AdminVideo';
import VideoPlayer from './components/Admin/VideoPlayer';
import VideoForm from './components/Admin/VideoForm';
import VideoDetails from './components/Admin/VideoDetails';
import AdminUserActivity from './components/Admin/UserActivity';
import SavedVideos from './components/User/SavedVideos';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import AdminContact from './components/Admin/AdminContact';

// Role-based protected route wrapper
const PrivateRoutes = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
       <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin-only routes */}
      <Route path="/admin/dashboard" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRoutes>
      } />
      <Route path="/admin/adduser" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <AddUsers />
        </PrivateRoutes>
      } />
      <Route path="/admin/add/:type" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <AddFormWrapper />
        </PrivateRoutes>
      } />
      <Route path="/admin/edit/:type/:id" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <AddFormWrapper />
        </PrivateRoutes>
      } />
      <Route path="/admin/upload" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <VideoForm />
        </PrivateRoutes>
      } />
      <Route path="/admin/edit-video/:id" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <VideoForm />
        </PrivateRoutes>
      } />
      <Route path="/admin/videodetails/:id" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <VideoDetails />
        </PrivateRoutes>
      } />
      <Route path="/admin/logs" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <AdminUserActivity />
        </PrivateRoutes>
      } />
  <Route path="/admin/contact" element={
        <PrivateRoutes allowedRoles={['admin']}>
          <AdminContact/>
        </PrivateRoutes>
      } />
      {/* Shared by both admin and user */}
      <Route path="/admin/videos" element={
        <PrivateRoutes allowedRoles={['admin', 'user']}>
          <AdminVideo />
        </PrivateRoutes>
      } />
      <Route path="/admin/video/:id" element={
        <PrivateRoutes allowedRoles={['admin', 'user']}>
          <VideoPlayer />
        </PrivateRoutes>
      } />
      <Route path="/admin/password" element={
        <PrivateRoutes allowedRoles={['admin', 'user']}>
          <ChangePassword />
        </PrivateRoutes>
      } />

      {/* User-only routes */}
      <Route path="/save/saved" element={
        <PrivateRoutes allowedRoles={['user']}>
          <SavedVideos />
        </PrivateRoutes>
      } />
    </Routes>
  );
}

export default App;

