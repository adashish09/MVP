import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';

function FarmerHome() {
  return (
    <>
      {/* Hero Section - Full screen with CTA for Kalyaani */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={7}>
              <h1 className="display-3 fw-bold mb-4">
                Empower Your Farm with
                <span className="text-warning"> AI & Insights</span>
              </h1>
              <p className="lead mb-4 fs-5">
                Use Kalyaani, AI suggestions, ML predictions, and tools to grow smarter.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Button 
                  variant="warning" 
                  size="lg" 
                  className="px-4 py-3"
                  as={Link}
                  to="/assistant"
                >
                  Get Started with Kalyaani
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-4 py-3"
                  as={Link}
                  to="/farmer/dashboard"
                >
                  Go to Dashboard
                </Button>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div className="hero-image">
                <i className="fas fa-tractor display-1 text-warning"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Feature Cards linking to dashboard tabs */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">Farmer Tools</h2>
              <p className="lead text-muted">Quick access to features on your dashboard</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3 text-primary display-6"><i className="fas fa-seedling"></i></div>
                  <h5 className="fw-bold">My Crops</h5>
                  <p className="text-muted flex-grow-1">Manage your crop listings and availability.</p>
                  <Button variant="primary" as={Link} to="/farmer/dashboard?tab=crops" className="mt-auto">
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3 text-success display-6"><i className="fas fa-lightbulb"></i></div>
                  <h5 className="fw-bold">AI Crop Suggestion</h5>
                  <p className="text-muted flex-grow-1">Get AI recommendations for what to grow.</p>
                  <Button variant="success" as={Link} to="/farmer/dashboard?tab=crop-suggestion" className="mt-auto">
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3 text-info display-6"><i className="fas fa-chart-line"></i></div>
                  <h5 className="fw-bold">Harvest Prediction</h5>
                  <p className="text-muted flex-grow-1">Predict yield and production using ML.</p>
                  <Button variant="info" as={Link} to="/farmer/dashboard?tab=harvest-prediction" className="mt-auto">
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3 text-warning display-6"><i className="fas fa-bug"></i></div>
                  <h5 className="fw-bold">Pest Detection</h5>
                  <p className="text-muted flex-grow-1">Diagnose issues and get treatment guidance.</p>
                  <Button variant="warning" as={Link} to="/farmer/dashboard?tab=pest-detection" className="mt-auto">
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3 text-secondary display-6"><i className="fas fa-shopping-cart"></i></div>
                  <h5 className="fw-bold">Orders</h5>
                  <p className="text-muted flex-grow-1">Track orders received for your crops.</p>
                  <Button variant="secondary" as={Link} to="/farmer/dashboard?tab=orders" className="mt-auto">
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">FAQs</h2>
              <p className="text-muted">Answers to common questions</p>
            </Col>
          </Row>
          <Row>
            <Col md={8} className="mx-auto">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How do I list a new crop?</Accordion.Header>
                  <Accordion.Body>
                    Go to Dashboard → My Crops and click "Add New Crop".
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How can I talk to Kalyaani?</Accordion.Header>
                  <Accordion.Body>
                    Use the "Get Started with Kalyaani" button above or open the Assistant.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>How do I see orders?</Accordion.Header>
                  <Accordion.Body>
                    Open Dashboard → Orders to view all recent orders.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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

export default FarmerHome;
