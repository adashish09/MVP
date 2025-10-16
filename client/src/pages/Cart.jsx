import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart();
  const { user, authFetch } = useAuth();

  const total = items.reduce((sum, i) => sum + i.listing.price * i.quantity, 0);

  const checkout = async () => {
    if (!user) return alert('Please login as buyer');
    if (user.role !== 'buyer') return alert('Only buyers can checkout');
    const payload = { items: items.map(i => ({ listingId: i.listing.id, quantity: i.quantity })) };
    const res = await authFetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Checkout failed');
    alert('Order placed');
    clearCart();
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Cart</Typography>
      {items.length === 0 && <Typography>No items. <Button component={Link} to="/listings">Browse listings</Button></Typography>}
      {items.map(i => (
        <Stack key={i.listing.id} direction="row" spacing={2} alignItems="center">
          <Typography sx={{ flexGrow: 1 }}>{i.listing.name} x {i.quantity}</Typography>
          <Typography>${(i.listing.price * i.quantity).toFixed(2)}</Typography>
          <Button onClick={() => removeFromCart(i.listing.id)}>Remove</Button>
        </Stack>
      ))}
      <Typography>Total: ${total.toFixed(2)}</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={clearCart}>Clear</Button>
        <Button variant="contained" onClick={checkout} disabled={items.length === 0}>Checkout</Button>
      </Stack>
    </Stack>
  );
}
