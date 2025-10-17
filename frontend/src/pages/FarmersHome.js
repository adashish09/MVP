import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function FarmersHome() {
  const { user } = useAuth();

  return (
    <>
      {/* Hero Section - Full Screen */}
      <div className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={12} className="text-center text-white">
              <h1 className="display-2 fw-bold mb-4">
                Welcome Farmers! 🌾
              </h1>
              <p className="lead mb-5 fs-3">
                Meet Kalyaani - Your AI-Powered Farming Assistant
              </p>
              <div className="d-flex flex-wrap gap-4 justify-content-center mb-4">
                <Link to="/assistant">
                  <Button variant="warning" size="lg" className="px-5 py-3 fs-4 fw-bold">
                    <i className="fas fa-robot me-2"></i>
                    Get Started with Kalyaani
                  </Button>
                </Link>
              </div>
              <p className="fs-5">
                Get AI-powered crop suggestions, harvest predictions, and pest detection
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section - Card Views */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-3">Features for Farmers</h2>
              <p className="lead text-muted">
                Everything you need to grow smarter and earn more
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Link to="/farmer/dashboard" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm feature-card text-center hover-card" style={{ transition: 'transform 0.3s', cursor: 'pointer' }}>
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-seedling text-success display-3"></i>
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">Manage Crops</h4>
                    <p className="text-muted">
                      List and manage your crops, track inventory, and receive orders from buyers directly.
                    </p>
                    <Button variant="success" className="mt-3">
                      Go to Dashboard
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/farmer/dashboard" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm feature-card text-center hover-card" style={{ transition: 'transform 0.3s', cursor: 'pointer' }}>
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-lightbulb text-warning display-3"></i>
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">AI Crop Suggestions</h4>
                    <p className="text-muted">
                      Get intelligent recommendations on what crops to grow based on your soil, climate, and season.
                    </p>
                    <Button variant="warning" className="mt-3">
                      Get Suggestions
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/farmer/dashboard" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm feature-card text-center hover-card" style={{ transition: 'transform 0.3s', cursor: 'pointer' }}>
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-chart-line text-primary display-3"></i>
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">Harvest Prediction</h4>
                    <p className="text-muted">
                      Use ML to predict your harvest yield, expected dates, and production estimates.
                    </p>
                    <Button variant="primary" className="mt-3">
                      Predict Harvest
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/farmer/dashboard" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm feature-card text-center hover-card" style={{ transition: 'transform 0.3s', cursor: 'pointer' }}>
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-bug text-danger display-3"></i>
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">Pest Detection</h4>
                    <p className="text-muted">
                      Identify pests and diseases affecting your crops and get treatment recommendations.
                    </p>
                    <Button variant="danger" className="mt-3">
                      Detect Pests
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/farmer/dashboard" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm feature-card text-center hover-card" style={{ transition: 'transform 0.3s', cursor: 'pointer' }}>
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-shopping-cart text-info display-3"></i>
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">Track Orders</h4>
                    <p className="text-muted">
                      View and manage all orders received from buyers, track revenue and sales.
                    </p>
                    <Button variant="info" className="mt-3">
                      View Orders
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/assistant" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm feature-card text-center hover-card" style={{ transition: 'transform 0.3s', cursor: 'pointer' }}>
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-robot text-secondary display-3"></i>
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">Meet Kalyaani</h4>
                    <p className="text-muted">
                      Chat with our AI assistant for personalized farming advice and guidance.
                    </p>
                    <Button variant="secondary" className="mt-3">
                      Chat with AI
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQs Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-3">Frequently Asked Questions</h2>
              <p className="lead text-muted">
                Got questions? We've got answers!
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How do I list my crops on the platform?</Accordion.Header>
                  <Accordion.Body>
                    Simply navigate to your Farmer Dashboard, click on "Add New Crop", fill in the details 
                    including crop name, category, quantity, price, and location. Once submitted, your crop 
                    will be reviewed and approved by our admin team before appearing on the marketplace.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How accurate is the AI crop suggestion feature?</Accordion.Header>
                  <Accordion.Body>
                    Our AI crop suggestion feature uses advanced machine learning algorithms trained on 
                    extensive agricultural data. It considers factors like soil type, climate, season, and 
                    location to provide recommendations with high accuracy. However, we always recommend 
                    consulting with local agricultural experts for final decisions.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>What is the commission or fee structure?</Accordion.Header>
                  <Accordion.Body>
                    Currently, Kalyaani operates on a minimal commission model to sustain the platform. 
                    We charge a small percentage on each transaction, which is significantly lower than 
                    traditional middlemen. This ensures farmers get fair prices while maintaining platform quality.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>How does the harvest prediction feature work?</Accordion.Header>
                  <Accordion.Body>
                    The harvest prediction feature uses machine learning models that analyze various factors 
                    including crop type, planting date, soil quality, weather conditions, irrigation, and 
                    fertilizer usage. Based on these inputs, it provides estimates for harvest dates, 
                    expected yield, and production quality.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Can I track my revenue and sales?</Accordion.Header>
                  <Accordion.Body>
                    Yes! Your Farmer Dashboard provides comprehensive analytics including total revenue, 
                    number of orders, monthly revenue trends, and order history. You can track all your 
                    sales and financial performance in real-time.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>How do I get started with Kalyaani AI assistant?</Accordion.Header>
                  <Accordion.Body>
                    Click on "Meet Kalyaani" in the navigation menu or the "Get Started with Kalyaani" 
                    button on this page. You can ask questions about farming practices, crop care, pest 
                    management, and get personalized advice based on your specific needs.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
                Empowering farmers with AI and technology
              </p>
            </Col>
            <Col md={4} className="mb-3">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/farmer/dashboard" className="text-muted text-decoration-none">Dashboard</Link></li>
                <li><Link to="/assistant" className="text-muted text-decoration-none">Meet Kalyaani</Link></li>
                <li><Link to="/community" className="text-muted text-decoration-none">Chaupal</Link></li>
                <li><Link to="/profile" className="text-muted text-decoration-none">Profile</Link></li>
              </ul>
            </Col>
            <Col md={4} className="mb-3">
              <h5 className="fw-bold mb-3">Need Help?</h5>
              <p className="text-muted">
                Email: support@kalyaani.com<br />
                Phone: +91 1800-123-4567
              </p>
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

export default FarmersHome;
