import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function LandingPage() {
  return (
    <>
      {/* Hero Section - Full Screen */}
      <div className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={12} className="text-center text-white">
              <h1 className="display-2 fw-bold mb-4">
                Welcome to Kalyaani
              </h1>
              <p className="lead mb-5 fs-3">
                Empowering Farmers & Buyers with AI-Powered Agriculture Solutions
              </p>
              <div className="d-flex flex-wrap gap-4 justify-content-center mb-4">
                <Link to="/register">
                  <Button variant="warning" size="lg" className="px-5 py-3 fs-4 fw-bold">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline-light" size="lg" className="px-5 py-3 fs-4 fw-bold">
                    Sign In
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <section className="py-5 bg-light" id="features">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-3">Our Features</h2>
              <p className="lead text-muted">
                Cutting-edge technology to revolutionize agriculture
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm feature-card text-center">
                <Card.Body className="p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-brain text-primary display-3"></i>
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
              <Card className="h-100 border-0 shadow-sm feature-card text-center">
                <Card.Body className="p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-bug text-success display-3"></i>
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
              <Card className="h-100 border-0 shadow-sm feature-card text-center">
                <Card.Body className="p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-shopping-cart text-warning display-3"></i>
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
      <section className="py-5" id="how-to-use">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-3">How to Use</h2>
              <p className="lead text-muted">
                Simple steps to get started with Kalyaani
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3 mx-auto d-flex align-items-center justify-content-center bg-primary text-white rounded-circle" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>1</div>
                <h5 className="fw-bold mb-3">Sign Up</h5>
                <p className="text-muted">
                  Create your account as a farmer or buyer and get verified quickly.
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3 mx-auto d-flex align-items-center justify-content-center bg-success text-white rounded-circle" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>2</div>
                <h5 className="fw-bold mb-3">Explore Features</h5>
                <p className="text-muted">
                  Use AI tools for crop prediction and pest detection, or browse the marketplace.
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3 mx-auto d-flex align-items-center justify-content-center bg-warning text-white rounded-circle" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>3</div>
                <h5 className="fw-bold mb-3">Connect & Trade</h5>
                <p className="text-muted">
                  List your crops or find what you need, then connect with other users.
                </p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="text-center">
                <div className="step-number mb-3 mx-auto d-flex align-items-center justify-content-center bg-info text-white rounded-circle" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>4</div>
                <h5 className="fw-bold mb-3">Grow Together</h5>
                <p className="text-muted">
                  Build lasting relationships and grow your business with our community.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Us Section */}
      <section className="py-5 bg-light" id="about">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-4 fw-bold mb-3">About Us</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}>
              <p className="lead text-center mb-4">
                Kalyaani is a comprehensive platform that bridges the gap between farmers and buyers, 
                featuring AI-powered crop prediction, pest detection, and direct marketplace access.
              </p>
              <p className="text-muted text-center">
                Our mission is to empower farmers with modern technology and provide buyers with 
                direct access to fresh, quality produce. We leverage cutting-edge AI and machine 
                learning to help farmers make informed decisions about crop selection, harvest 
                prediction, and pest management.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Us Section */}
      <section className="py-5" id="contact">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-4 fw-bold mb-3">Contact Us</h2>
              <p className="lead text-muted mb-4">
                Have questions? We'd love to hear from you.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5">
                  <Row>
                    <Col md={6} className="mb-4">
                      <div className="d-flex align-items-start">
                        <i className="fas fa-envelope text-primary fs-3 me-3"></i>
                        <div>
                          <h5 className="fw-bold">Email</h5>
                          <p className="text-muted">support@kalyaani.com</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-4">
                      <div className="d-flex align-items-start">
                        <i className="fas fa-phone text-success fs-3 me-3"></i>
                        <div>
                          <h5 className="fw-bold">Phone</h5>
                          <p className="text-muted">+91 1800-123-4567</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-4">
                      <div className="d-flex align-items-start">
                        <i className="fas fa-map-marker-alt text-warning fs-3 me-3"></i>
                        <div>
                          <h5 className="fw-bold">Address</h5>
                          <p className="text-muted">123 Agriculture Hub, Delhi, India</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-4">
                      <div className="d-flex align-items-start">
                        <i className="fas fa-clock text-info fs-3 me-3"></i>
                        <div>
                          <h5 className="fw-bold">Working Hours</h5>
                          <p className="text-muted">Mon - Sat: 9:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={4} className="mb-3">
              <h5 className="fw-bold mb-3">🌾 Kalyaani</h5>
              <p className="text-muted">
                Empowering agriculture with AI and technology
              </p>
            </Col>
            <Col md={4} className="mb-3">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#features" className="text-muted text-decoration-none">Features</a></li>
                <li><a href="#how-to-use" className="text-muted text-decoration-none">How to Use</a></li>
                <li><a href="#about" className="text-muted text-decoration-none">About Us</a></li>
                <li><a href="#contact" className="text-muted text-decoration-none">Contact</a></li>
              </ul>
            </Col>
            <Col md={4} className="mb-3">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex gap-3">
                <a href="#" className="text-muted"><i className="fab fa-facebook fs-4"></i></a>
                <a href="#" className="text-muted"><i className="fab fa-twitter fs-4"></i></a>
                <a href="#" className="text-muted"><i className="fab fa-instagram fs-4"></i></a>
                <a href="#" className="text-muted"><i className="fab fa-linkedin fs-4"></i></a>
              </div>
            </Col>
          </Row>
          <hr className="border-secondary my-3" />
          <Row>
            <Col className="text-center">
              <p className="text-muted mb-0">&copy; 2025 Kalyaani. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default LandingPage;
