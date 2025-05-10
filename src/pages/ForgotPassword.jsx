// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPages.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    // Simulate sending reset link
    const fakeToken = Math.random().toString(36).substr(2);
    localStorage.setItem('resetEmail', email); // store email
    navigate(`/reset-password?token=${fakeToken}`);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        {submitted && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Check your email for reset instructions.
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Send Reset Link
          </Button>
        </form>
      </Box>
    </Container>
  );
}
