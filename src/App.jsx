// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Home from './pages/Home/Home';
import ProtectedRoute from './protectedRoute';
import SingleCombat from './pages/Warzone-1/SingleCombat';

function App() {
  // Initialize state from localStorage if available, or default to false
  const [canAccessProtectedPage, setCanAccessProtectedPage] = useState(
    () => JSON.parse(localStorage.getItem('canAccessProtectedPage')) || false
  );

  useEffect(() => {
    // Store the boolean state in localStorage whenever it changes
    localStorage.setItem('canAccessProtectedPage', JSON.stringify(canAccessProtectedPage));
  }, [canAccessProtectedPage]);

  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4AFAAB',
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <AppRoutes
          canAccessProtectedPage={canAccessProtectedPage}
          setCanAccessProtectedPage={setCanAccessProtectedPage}
        />
      </BrowserRouter>
    </>
  );
}

// Separate component for routes with useLocation hook inside BrowserRouter
const AppRoutes = ({ canAccessProtectedPage, setCanAccessProtectedPage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect when the user navigates away from the '/singlecombat' page
    const handleBeforeUnload = (event) => {
      if (window.location.pathname === '/singlecombat') {
        setCanAccessProtectedPage(true); // Maintain access on refresh
      } else {
        setCanAccessProtectedPage(false); // Reset access if navigating away
        localStorage.setItem('canAccessProtectedPage', 'false'); // Persist the change
        window.location.reload();
      }
    };

    // Add the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [setCanAccessProtectedPage]);

  const ProtectedRoute2 = ({ canAccess, children }) => {
    if (canAccess) {
      return children;
    } else {
      // Redirect to home or any other page if access is denied
      navigate('/home'); 
      return null;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home setCanAccessProtectedPage={setCanAccessProtectedPage} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/singlecombat"
        element={
          <ProtectedRoute>
            <ProtectedRoute2 canAccess={canAccessProtectedPage}>
              <SingleCombat />
            </ProtectedRoute2>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
