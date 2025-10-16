import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      const redirect = location.state?.from?.pathname || '/';
      navigate(redirect);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} maxWidth={400}>
        <Typography variant="h5">Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained">Login</Button>
      </Stack>
    </form>
  );
}
