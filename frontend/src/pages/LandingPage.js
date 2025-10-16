import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function LandingPage() {
  const { user } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 0',
        marginBottom: '50px'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-3 mb-4 fw-bold">
                Welcome to AgriConnect
              </h1>
              <p className="lead mb-4 fs-4">
                The ultimate platform connecting farmers and buyers for fresh, quality agricultural produce.
                Experience seamless transactions, AI-powered insights, and a thriving agricultural community.
              </p>
              {!user && (
                <div className="d-flex gap-3 flex-wrap">
                  <Link to="/register">
                    <Button variant="light" size="lg" className="px-4 py-3">
                      Get Started Today
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline-light" size="lg" className="px-4 py-3">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </Col>
            <Col lg={4}>
              <div className="text-center">
                <div style={{ fontSize: '200px' }}>🌾</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Features Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-5">Why Choose AgriConnect?</h2>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ fontSize: '60px' }}>🤖</div>
                <h4 className="mb-3">AI-Powered Insights</h4>
                <p className="text-muted">
                  Get crop predictions, pest detection, and farming recommendations powered by advanced AI technology.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ fontSize: '60px' }}>🌱</div>
                <h4 className="mb-3">Direct from Farm</h4>
                <p className="text-muted">
                  Connect directly with local farmers and buy fresh, quality crops at competitive prices.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ fontSize: '60px' }}>👥</div>
                <h4 className="mb-3">Community Support</h4>
                <p className="text-muted">
                  Join our vibrant community of farmers and buyers sharing knowledge and experiences.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* User Types Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-5">Choose Your Path</h2>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="h-100 border-primary">
              <Card.Body className="text-center p-5">
                <div className="mb-3" style={{ fontSize: '80px' }}>👨‍🌾</div>
                <h3 className="mb-3 text-primary">For Farmers</h3>
                <ul className="list-unstyled text-start">
                  <li className="mb-2">✅ List your crops and manage inventory</li>
                  <li className="mb-2">✅ AI-powered crop prediction and pest detection</li>
                  <li className="mb-2">✅ Direct sales to verified buyers</li>
                  <li className="mb-2">✅ Real-time order management</li>
                  <li className="mb-2">✅ Community support and knowledge sharing</li>
                </ul>
                {!user && (
                  <Link to="/register">
                    <Button variant="primary" size="lg" className="mt-3">
                      Start Farming
                    </Button>
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100 border-success">
              <Card.Body className="text-center p-5">
                <div className="mb-3" style={{ fontSize: '80px' }}>🛒</div>
                <h3 className="mb-3 text-success">For Buyers</h3>
                <ul className="list-unstyled text-start">
                  <li className="mb-2">✅ Browse fresh crops from local farmers</li>
                  <li className="mb-2">✅ Advanced filtering and search options</li>
                  <li className="mb-2">✅ Secure payment and order tracking</li>
                  <li className="mb-2">✅ Quality assurance and farmer verification</li>
                  <li className="mb-2">✅ Community reviews and ratings</li>
                </ul>
                {!user && (
                  <Link to="/register">
                    <Button variant="success" size="lg" className="mt-3">
                      Start Shopping
                    </Button>
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="mb-5" style={{ backgroundColor: '#f8f9fa', padding: '50px 0', borderRadius: '10px' }}>
          <Col md={3} className="text-center mb-3">
            <h2 className="text-primary fw-bold">500+</h2>
            <p className="text-muted">Active Farmers</p>
          </Col>
          <Col md={3} className="text-center mb-3">
            <h2 className="text-success fw-bold">1000+</h2>
            <p className="text-muted">Happy Buyers</p>
          </Col>
          <Col md={3} className="text-center mb-3">
            <h2 className="text-warning fw-bold">5000+</h2>
            <p className="text-muted">Crops Listed</p>
          </Col>
          <Col md={3} className="text-center mb-3">
            <h2 className="text-info fw-bold">98%</h2>
            <p className="text-muted">Satisfaction Rate</p>
          </Col>
        </Row>

        {/* CTA Section */}
        {!user && (
          <Row className="mb-5">
            <Col className="text-center">
              <Card className="border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <Card.Body className="p-5">
                  <h2 className="mb-3">Ready to Transform Agriculture?</h2>
                  <p className="lead mb-4">Join thousands of farmers and buyers already using AgriConnect</p>
                  <Link to="/register">
                    <Button variant="light" size="lg" className="px-5 py-3">
                      Get Started Now
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default LandingPage;