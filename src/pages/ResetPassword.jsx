// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Alert
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/AuthPages.css';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // not actually used but for realism
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirm) {
      setError('Please fill in both fields.');
      return;
    }

    if (newPassword !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    const email = localStorage.getItem('resetEmail');
    if (!email) {
      setError('Reset session expired. Try again.');
      return;
    }

    // Simulate storing new password (e.g., overwrite in localStorage)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('resetEmail');
    setSuccess(true);

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Reset Your Password
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password reset! Redirecting to login...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </form>
      </Box>
    </Container>
  );
}
