import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Landing() {
  const { user } = useAuth();

  return (
    <>
      {/* Hero Section - Full screen with Get Started and Sign In */}
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
                      Get Started
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
              <h2 className="display-5 fw-bold mb-3">Our Features</h2>
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
                    Get intelligent crop recommendations based on soil conditions, weather patterns, and market demand.
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
                    Identify and get suggestions for pest control using image recognition and AI-powered analysis.
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
                    Connect directly with farmers and buyers, eliminating middlemen and ensuring fair prices.
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
              <h2 className="display-5 fw-bold mb-3">How to Use</h2>
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
                <p className="text-muted">Create your account as a farmer or buyer and get verified.</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3">2</div>
                <h5 className="fw-bold mb-3">Explore Features</h5>
                <p className="text-muted">Use AI tools or browse the marketplace.</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3">3</div>
                <h5 className="fw-bold mb-3">Connect & Trade</h5>
                <p className="text-muted">List your crops or find what you need.</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3">4</div>
                <h5 className="fw-bold mb-3">Grow Together</h5>
                <p className="text-muted">Build relationships and grow your business.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Us */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="display-6 fw-bold">About Us</h2>
              <p className="lead text-muted">
                We are on a mission to empower farmers and buyers with technology that simplifies trade, improves yields, and increases transparency.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Us */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="display-6 fw-bold">Contact Us</h2>
              <p className="text-muted">Have questions? Reach out and we’ll get back to you.</p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="How can we help?" />
                </Form.Group>
                <Button variant="primary">Send Message</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-light">
        <Container>
          <Row>
            <Col className="text-center">
              <small>© {new Date().getFullYear()} Farmer Marketplace. All rights reserved.</small>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Landing;
