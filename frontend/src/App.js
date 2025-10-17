import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import FarmersHome from './pages/FarmersHome';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CropDetails from './pages/CropDetails';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Gemini from './pages/Gemini';
import CommunityRoom from './pages/CommunityRoom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { TranslationProvider } from './context/TranslationContext';

function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

function HomeRoute() {
  const { user } = useAuth();
  
  if (!user) {
    return <LandingPage />;
  }
  
  if (user.role === 'farmer') {
    return <FarmersHome />;
  }
  
  if (user.role === 'buyer') {
    return <Navigate to="/marketplace" />;
  }
  
  if (user.role === 'superadmin') {
    return <Navigate to="/admin/dashboard" />;
  }
  
  return <LandingPage />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/crops/:id" element={<CropDetails />} />
      <Route path="/assistant" element={<Gemini />} />
      <Route path='/community' element={<CommunityRoom />} />
      
      <Route
        path="/farmer/dashboard"
        element={
          <PrivateRoute allowedRoles={['farmer']}>
            <FarmerDashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/buyer/dashboard"
        element={
          <PrivateRoute allowedRoles={['buyer']}>
            <BuyerDashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={['superadmin']}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/cart"
        element={
          <PrivateRoute allowedRoles={['buyer']}>
            <Cart />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/payment"
        element={
          <PrivateRoute allowedRoles={['buyer']}>
            <Payment />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <TranslationProvider>
        <AuthProvider>
          <CartProvider>
            <div className="App">
              <Navigation />
              <AppRoutes />
            </div>
          </CartProvider>
        </AuthProvider>
      </TranslationProvider>
    </Router>
  );
}

export default App;
