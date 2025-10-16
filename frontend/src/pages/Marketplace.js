import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Marketplace() {
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
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold mb-2">Fresh Farm Marketplace</h1>
          <p className="lead text-muted">Discover fresh, quality crops directly from local farmers</p>
        </Col>
      </Row>

      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {/* Filters */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <h5 className="mb-3 fw-bold">Filter Crops</h5>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search crops..."
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="border-0 shadow-sm"
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="border-0 shadow-sm"
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
                  className="border-0 shadow-sm"
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
                  className="border-0 shadow-sm"
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
                  className="border-0 shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Crops Grid */}
      <h3 className="mb-4 fw-bold">Available Crops</h3>
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
              <Card className="crop-card h-100 border-0 shadow-sm">
                <div 
                  className="crop-image bg-gradient d-flex align-items-center justify-content-center"
                  style={{ 
                    height: '200px',
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                  }}
                >
                  <span className="text-white display-1">🌾</span>
                </div>
                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title className="fw-bold mb-2">{crop.name}</Card.Title>
                  <Card.Text className="text-muted small mb-2">
                    <i className="fas fa-tag me-1"></i>
                    <strong>Category:</strong> {crop.category}
                  </Card.Text>
                  <Card.Text className="text-muted small mb-2">
                    <i className="fas fa-map-marker-alt me-1"></i>
                    <strong>Location:</strong> {crop.location}
                  </Card.Text>
                  <Card.Text className="mb-2">
                    <i className="fas fa-weight me-1"></i>
                    <strong>Available:</strong> {crop.quantity} kg
                  </Card.Text>
                  <Card.Text className="h5 text-success mb-3 fw-bold">
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
                        <i className="fas fa-cart-plus me-1"></i>
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
  );
}

export default Marketplace;
