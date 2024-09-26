import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE);

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
