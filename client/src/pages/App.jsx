import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Listings from './Listings.jsx';
import ListingDetail from './ListingDetail.jsx';
import Cart from './Cart.jsx';
import Orders from './Orders.jsx';
import FarmerDashboard from './FarmerDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';

function RequireAuth({ roles, children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Farmer Marketplace</Typography>
          <Button color="inherit" component={Link} to="/listings">Browse</Button>
          {user?.role === 'buyer' && <Button color="inherit" component={Link} to="/orders">My Orders</Button>}
          {user?.role === 'farmer' && <Button color="inherit" component={Link} to="/farmer">Farmer</Button>}
          {user?.role === 'superadmin' && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
          {user ? (
            <Button color="inherit" onClick={logout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<RequireAuth roles={["buyer"]}><Orders /></RequireAuth>} />
          <Route path="/farmer" element={<RequireAuth roles={["farmer"]}><FarmerDashboard /></RequireAuth>} />
          <Route path="/admin" element={<RequireAuth roles={["superadmin"]}><AdminDashboard /></RequireAuth>} />
        </Routes>
      </Container>
    </>
  );
}
