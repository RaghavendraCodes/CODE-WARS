import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated.
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      // Show toast message and redirect to signin page.
      toast.error('Please log in first.');
      navigate('/signin'); // Redirect using navigate.
    }
  }, [isAuthenticated, navigate]); // Dependency array ensures it runs when isAuthenticated changes.

  // If authenticated, render the child components (the protected page).
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;