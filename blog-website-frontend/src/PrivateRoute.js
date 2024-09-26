// PrivateRoute.js
import React from 'react';
import { Outlet,Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  
  const isAuthenticated = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE);
  console.log(isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
