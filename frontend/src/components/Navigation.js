import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/TranslationContext';

function Navigation() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { t, language, changeLanguage, availableLanguages } = useTranslation();
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
          🌾 {t('nav.home') === 'Home' ? 'Farmer Marketplace' : 'किसान बाजार'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user && <div style={{ display: 'flex', gap: '5px' }}>
            <Nav.Link as={Link} to={getDashboardLink()}>{t('nav.dashboard')}</Nav.Link>
            </div> }
            
            {user ? (
              <>
              <Nav.Link as={Link} to="/assistant">{t('nav.meetKalyani')}</Nav.Link>
           <Nav.Link as={Link} to="/community">{t('nav.community')}</Nav.Link>
                <Nav.Link as={Link} to="/profile">{t('nav.profile')}</Nav.Link>
                
                {user.role === 'buyer' && (
                  <Nav.Link as={Link} to="/cart" className="position-relative">
                    {t('nav.cart')}
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
                
                {/* Language Selector */}
                <Dropdown className="ms-2">
                  <Dropdown.Toggle variant="outline-light" size="sm" id="language-dropdown">
                    {availableLanguages.find(lang => lang.code === language)?.flag} {t('nav.language')}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {availableLanguages.map(lang => (
                      <Dropdown.Item 
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        active={language === lang.code}
                      >
                        {lang.flag} {lang.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                
                <Nav.Item className="ms-2">
                  <span className="text-light me-3">
                    {t('nav.welcome')}, <strong>{user.name}</strong> ({user.role})
                  </span>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="outline-light" size="sm" onClick={handleLogout}>
                    {t('nav.logout')}
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">{t('nav.login')}</Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="primary" size="sm">{t('nav.register')}</Button>
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
