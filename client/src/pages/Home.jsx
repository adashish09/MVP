import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Stack spacing={2} alignItems="start">
      <Typography variant="h4">Welcome to Farmer Marketplace</Typography>
      <Typography>Browse fresh crops directly from local farmers.</Typography>
      <Button variant="contained" component={Link} to="/listings">Browse Listings</Button>
    </Stack>
  );
}
