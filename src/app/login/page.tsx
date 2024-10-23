"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
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
      
      // Store the JWT in sessionStorage instead.
      sessionStorage.setItem('token', data.token);
    } else {
      console.error('Login failed');
    }
  };
  
  const handleRegisterRedirect = () => {
    router.push('/registration');
  };
  
  return (
    <Container component="main" maxWidth="xs" className="login-container">
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
