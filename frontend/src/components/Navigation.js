import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navigation() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

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

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🌾 Kalyaani
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user && (
              <>
                <Nav.Link as={Link} to={getDashboardLink()}>Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/assistant">Meet Kalyaani</Nav.Link>
                <Nav.Link as={Link} to="/community">Chaupal</Nav.Link>
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
                
                <Nav.Item className="ms-2">
                  <span className="text-light me-3">
                    Welcome, <strong>{user.name}</strong> ({user.role})
                  </span>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="outline-light" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Item>
              </>
            )}
            
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
