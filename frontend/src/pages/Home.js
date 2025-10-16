import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Home() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchCrops();
  }, [filters]);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const response = await axios.get(`/api/crops?${params.toString()}`);
      setCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToCart = (crop) => {
    addToCart(crop, 1);
    setAlert({ type: 'success', message: `${crop.name} added to cart!` });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-4 mb-4">Fresh Farm Produce, Direct from Farmers</h1>
              <p className="lead mb-4">
                Connect with local farmers and buy fresh, quality crops at the best prices.
              </p>
              {!user && (
                <div>
                  <Link to="/register">
                    <Button variant="light" size="lg" className="me-3">Get Started</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline-light" size="lg">Login</Button>
                  </Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        {alert && (
          <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}

        {/* Filters */}
        <div className="filter-section mb-4">
          <h5 className="mb-3">Filter Crops</h5>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search crops..."
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="pulses">Pulses</option>
                  <option value="spices">Spices</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Min Price"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Max Price"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Crops Grid */}
        <h3 className="mb-4">Available Crops</h3>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : crops.length === 0 ? (
          <Alert variant="info">No crops found matching your criteria.</Alert>
        ) : (
          <Row>
            {crops.map(crop => (
              <Col md={4} lg={3} key={crop.id} className="mb-4">
                <Card className="crop-card h-100">
                  <div 
                    className="crop-image bg-secondary d-flex align-items-center justify-content-center"
                    style={{ height: '200px' }}
                  >
                    <span className="text-white display-1">🌾</span>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{crop.name}</Card.Title>
                    <Card.Text className="text-muted small mb-2">
                      <strong>Category:</strong> {crop.category}
                    </Card.Text>
                    <Card.Text className="text-muted small mb-2">
                      <strong>Location:</strong> {crop.location}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Available:</strong> {crop.quantity} kg
                    </Card.Text>
                    <Card.Text className="h5 text-success mb-3">
                      ${crop.price}/kg
                    </Card.Text>
                    <div className="mt-auto">
                      <Link to={`/crops/${crop.id}`}>
                        <Button variant="outline-primary" size="sm" className="w-100 mb-2">
                          View Details
                        </Button>
                      </Link>
                      {user?.role === 'buyer' && user?.approved && (
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="w-100"
                          onClick={() => handleAddToCart(crop)}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default Home;
