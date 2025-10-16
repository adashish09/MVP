import React, { useEffect, useState } from 'react';
import { Stack, Typography, Card, CardContent } from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Orders() {
  const { authFetch } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    authFetch('/api/orders/mine/me').then(r => r.json()).then(setOrders);
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h5">My Orders</Typography>
      {orders.map(o => (
        <Card key={o.id}>
          <CardContent>
            <Typography>Order #{o.id}</Typography>
            {o.items.map((it, idx) => (
              <Typography key={idx} color="text.secondary">{it.name} x {it.quantity} — ${it.price}</Typography>
            ))}
            <Typography>Total: ${o.total.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
