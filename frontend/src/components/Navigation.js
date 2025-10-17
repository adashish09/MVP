import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navigation() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'farmer':
        return '/farmer/dashboard';
      case 'buyer':
        return '/buyer/dashboard';
      case 'superadmin':
        return '/admin/dashboard';
      default:
        return null;
    }
  };

  const getHomeLink = () => {
    if (!user) return '/';
    if (user.role === 'farmer') return '/farmers';
    if (user.role === 'buyer') return '/marketplace';
    return '/';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to={getHomeLink()}>
          <span role="img" aria-label="logo" className="me-2">🌾</span>
          <span>Kalyaani</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to={getHomeLink()}>Home</Nav.Link>
            <Nav.Link as={Link} to="/marketplace">Marketplace</Nav.Link>
            <Nav.Link as={Link} to="/chaupal">Chaupal</Nav.Link>
            <Nav.Link as={Link} to="/assistant">Meet Kalyaani</Nav.Link>
            {user && (
              <Nav.Link as={Link} to={getDashboardLink()}>Dashboard</Nav.Link>
            )}

            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                {user.role === 'buyer' && (
                  <Nav.Link as={Link} to="/cart" className="position-relative">
                    Cart
                    {getCartCount() > 0 && (
                      <Badge
                        bg="danger"
                        pill
                        className="position-absolute top-0 start-100 translate-middle"
                        style={{ fontSize: '0.7rem' }}
                      >
                        {getCartCount()}
                      </Badge>
                    )}
                  </Nav.Link>
                )}
                <Nav.Item>
                  <Button variant="outline-light" size="sm" onClick={handleLogout} className="ms-2">
                    Logout
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
                <Nav.Item className="ms-2">
                  <Button variant="warning" size="sm" as={Link} to="/register">
                    Get Started
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
