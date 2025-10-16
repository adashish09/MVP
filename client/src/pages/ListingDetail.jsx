import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, Button, TextField } from '@mui/material';
import { useCart } from '../contexts/CartContext.jsx';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/listings/${id}`).then(r => r.json()).then(setListing);
  }, [id]);

  if (!listing) return <div />;

  return (
    <Stack spacing={2}>
      {listing.images?.[0] && <img src={listing.images[0]} alt={listing.name} style={{ maxWidth: 400, borderRadius: 8 }} />}
      <Typography variant="h5">{listing.name}</Typography>
      <Typography color="text.secondary">{listing.category} • {listing.location}</Typography>
      <Typography>${listing.price}</Typography>
      <Typography>{listing.description}</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField label="Quantity" type="number" value={qty} onChange={e => setQty(Number(e.target.value))} inputProps={{ min: 1, max: listing.quantity }} />
        <Button variant="contained" onClick={() => addToCart(listing, qty)}>Add to Cart</Button>
      </Stack>
    </Stack>
  );
}
