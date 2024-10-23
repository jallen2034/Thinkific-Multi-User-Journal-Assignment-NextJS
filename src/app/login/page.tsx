"use client"

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import "./login.scss";

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      
      // Redirect the user after successful login
      router.push('/journal');
    } else {
      console.error('Login failed');
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
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
      </Box>
    </Container>
  );
};

export default Page;
