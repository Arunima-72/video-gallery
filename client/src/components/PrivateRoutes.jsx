import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based access
  if (location.pathname.startsWith('/admin') && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (location.pathname.startsWith('/user') && user.role !== 'user') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
