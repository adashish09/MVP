import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Stack, MenuItem, Button } from '@mui/material';
import { useCart } from '../contexts/CartContext.jsx';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', minPrice: '', maxPrice: '', location: '' });
  const { addToCart } = useCart();

  const fetchListings = async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
    const res = await fetch(`/api/listings?${params.toString()}`);
    const data = await res.json();
    setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const update = (k) => (e) => setFilters({ ...filters, [k]: e.target.value });

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Browse Listings</Typography>
      <Stack direction="row" spacing={2}>
        <TextField label="Search" value={filters.search} onChange={update('search')} />
        <TextField label="Category" value={filters.category} onChange={update('category')} placeholder="e.g., grains, fruits" />
        <TextField label="Location" value={filters.location} onChange={update('location')} />
        <TextField label="Min Price" type="number" value={filters.minPrice} onChange={update('minPrice')} />
        <TextField label="Max Price" type="number" value={filters.maxPrice} onChange={update('maxPrice')} />
        <Button variant="outlined" onClick={fetchListings}>Apply</Button>
      </Stack>
      <Grid container spacing={2}>
        {listings.map(l => (
          <Grid item xs={12} sm={6} md={4} key={l.id}>
            <Card>
              {l.images?.[0] && (
                <CardMedia component="img" height="160" image={l.images[0]} alt={l.name} />
              )}
              <CardContent>
                <Typography variant="h6" component={Link} to={`/listings/${l.id}`} style={{ textDecoration: 'none' }}>{l.name}</Typography>
                <Typography color="text.secondary">{l.category} • {l.location}</Typography>
                <Typography>${l.price} · {l.quantity} available</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button size="small" component={Link} to={`/listings/${l.id}`}>View</Button>
                  <Button size="small" variant="contained" onClick={() => addToCart(l, 1)}>Add to Cart</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
