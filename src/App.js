// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { MovieProvider } from './context/MovieContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ThemeToggle from './components/ThemeToggle';

import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorageHelpers';
import './App.css';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const initialMode = loadFromLocalStorage('themeMode') || 'light';
  const [mode, setMode] = useState(initialMode);

  const theme = createTheme({
    palette: { mode },
  });

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    saveToLocalStorage('themeMode', newMode);
  };

  return (
    <AuthProvider>
      <MovieProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Container maxWidth="lg" sx={{ py: 2 }}>
              <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<ProtectedRoute><MoviePage /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </MovieProvider>
    </AuthProvider>
  );
}
