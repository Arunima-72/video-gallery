// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Role-based access
//   if (location.pathname.startsWith('/admin') && user.role !== 'admin') {
//     return <Navigate to="/" replace />;
//   }

//   if (location.pathname.startsWith('/user') && user.role !== 'user') {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;




// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoutes = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem('logintoken');
//   const role = localStorage.getItem('role');

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/" />; // or redirect elsewhere
//   }

//   return children;
// };

// export default PrivateRoutes;
