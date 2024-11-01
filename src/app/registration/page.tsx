"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import "./registration.scss";

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/registerUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    
    if (res.ok) {
      enqueueSnackbar("Registered this user now go login!", {
        variant: "success",
      });
    } else {
      const errorData = await res.json(); // Parse the JSON response
      if (res.status === 409) {
        enqueueSnackbar(errorData.error || 'User with this email already exists.', {
          variant: "error",
        });
      } else {
        enqueueSnackbar('An error occurred during registration. Please try again.', {
          variant: "error",
        });
      }
    }
  };
  
  const handleLoginRedirect = () => {
    router.push('/login');
  };
  
  return (
    <Container component="main" maxWidth="xs" className="container">
      <SnackbarProvider />
      <Box className="box">
        <Typography component="h1" variant="h5" className="title">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Register
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2" className="already-Have-account-typography">
            Already have an account?{' '}
            <Link component="button" variant="body2" className="link-to-login" onClick={handleLoginRedirect}>
              Login!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
