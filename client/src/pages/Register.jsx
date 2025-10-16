import React, { useState } from 'react';
import { Button, Stack, TextField, Typography, Alert, MenuItem } from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      const res = await register(form);
      setMsg(res.message || 'Registered');
    } catch (e) {
      setError(e.message);
    }
  };

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} maxWidth={500}>
        <Typography variant="h5">Register</Typography>
        {msg && <Alert severity="success">{msg}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Name" value={form.name} onChange={update('name')} required />
        <TextField label="Email" value={form.email} onChange={update('email')} required />
        <TextField label="Password" type="password" value={form.password} onChange={update('password')} required />
        <TextField label="Role" select value={form.role} onChange={update('role')}>
          <MenuItem value="buyer">Buyer</MenuItem>
          <MenuItem value="farmer">Farmer</MenuItem>
        </TextField>
        <Button type="submit" variant="contained">Register</Button>
      </Stack>
    </form>
  );
}
