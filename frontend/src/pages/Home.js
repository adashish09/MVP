import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

// NOTE: This component is kept for backward compatibility but no longer used as the main landing.
function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={8}>
              <h1 className="display-3 fw-bold mb-4">
                Connect Farmers & Buyers
                <span className="text-warning"> Seamlessly</span>
              </h1>
              <p className="lead mb-4 fs-5">
                A comprehensive platform that bridges the gap between farmers and buyers, 
                featuring AI-powered crop prediction, pest detection, and direct marketplace access.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                {!user ? (
                  <>
                    <Button 
                      variant="warning" 
                      size="lg" 
                      className="px-4 py-3"
                      as={Link}
                      to="/register"
                    >
                      Get Started Today
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="lg" 
                      className="px-4 py-3"
                      as={Link}
                      to="/login"
                    >
                      Sign In
                    </Button>
                  </>
                ) : (
                  <>
                    {user.role === 'farmer' && (
                      <Button 
                        variant="warning" 
                        size="lg" 
                        className="px-4 py-3"
                        as={Link}
                        to="/farmers"
                      >
                        Go to Farmer Home
                      </Button>
                    )}
                    {user.role === 'buyer' && (
                      <Button 
                        variant="warning" 
                        size="lg" 
                        className="px-4 py-3"
                        as={Link}
                        to="/marketplace"
                      >
                        Browse Marketplace
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div className="d-flex flex-wrap gap-4 text-light">
                <div className="d-flex align-items-center">
                  <i className="fas fa-users me-2"></i>
                  <span>1000+ Active Users</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-seedling me-2"></i>
                  <span>500+ Crops Listed</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-robot me-2"></i>
                  <span>AI-Powered Insights</span>
                </div>
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <div className="hero-image">
                <i className="fas fa-seedling display-1 text-warning"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">Why Choose Our Platform?</h2>
              <p className="lead text-muted">
                Empowering agriculture with cutting-edge technology and seamless user experience
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm feature-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-brain text-primary display-4"></i>
                  </div>
                  <h4 className="fw-bold mb-3">AI Crop Prediction</h4>
                  <p className="text-muted">
                    Get intelligent crop recommendations based on soil conditions, 
                    weather patterns, and market demand using advanced AI algorithms.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm feature-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-bug text-success display-4"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Pest Detection</h4>
                  <p className="text-muted">
                    Identify and get suggestions for pest control using image recognition 
                    and AI-powered analysis to protect your crops.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm feature-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-shopping-cart text-warning display-4"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Direct Marketplace</h4>
                  <p className="text-muted">
                    Connect directly with farmers and buyers, eliminating middlemen 
                    and ensuring fair prices for both parties.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">How It Works</h2>
              <p className="lead text-muted">
                Simple steps to get started with our platform
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3">1</div>
                <h5 className="fw-bold mb-3">Sign Up</h5>
                <p className="text-muted">
                  Create your account as a farmer or buyer and get verified quickly.
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3">2</div>
                <h5 className="fw-bold mb-3">Explore Features</h5>
                <p className="text-muted">
                  Use AI tools for crop prediction and pest detection, or browse the marketplace.
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3">3</div>
                <h5 className="fw-bold mb-3">Connect & Trade</h5>
                <p className="text-muted">
                  List your crops or find what you need, then connect with other users.
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3">4</div>
                <h5 className="fw-bold mb-3">Grow Together</h5>
                <p className="text-muted">
                  Build lasting relationships and grow your business with our community.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="display-5 fw-bold mb-3">Ready to Get Started?</h2>
              <p className="lead mb-4">
                Join thousands of farmers and buyers who are already using our platform
              </p>
              {!user && (
                <Button 
                  variant="warning" 
                  size="lg" 
                  className="px-5 py-3"
                  as={Link}
                  to="/register"
                >
                  Start Your Journey Today
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
