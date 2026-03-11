/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, userRole } = useAuth();

  // Redirect based on role
  if (userRole === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (userRole === 'volunteer') {
    return <Navigate to="/volunteer/dashboard" replace />;
  } else {
    return <Navigate to="/member/dashboard" replace />;
  }
};

export default Dashboard;