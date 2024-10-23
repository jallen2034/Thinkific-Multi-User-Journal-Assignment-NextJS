"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from "notistack"; // Import enqueueSnackbar
import "./login.scss";

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/loginUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem('token', data.token);
      enqueueSnackbar("Login successful! The page will refresh in 5 seconds. Please navigate back to home.", {
        variant: "success",
      });
      /* TODO: Implement a more robust state management solution for handling the user's logged-in status
       * instead of relying on sessionStorage and a forced page refresh. Consider using a state management library
       * (e.g., Redux) to ensure a seamless user experience across the app. */
      setTimeout(() => {
        window.location.reload(); // Force page refresh after 5 seconds
      }, 5000); // Delay for 5 seconds
    } else {
      const errorData = await res.json(); // Parse the JSON response for error messages
      enqueueSnackbar(errorData.error || 'Username or password is incorrect. Please try again.', {
        variant: "error",
      });
    }
  };
  
  const handleRegisterRedirect = () => {
    router.push('/registration');
  };
  
  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <SnackbarProvider />
      <Box className="box">
        <Typography component="h1" variant="h5" className="title">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2" className="no-account-typography">
            Do not have an account?{' '}
            <Link component="button" variant="body2" className="link-to-register" onClick={handleRegisterRedirect}>
              Register!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
