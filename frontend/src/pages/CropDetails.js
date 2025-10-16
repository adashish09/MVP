import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function CropDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchCropDetails();
  }, [id]);

  const fetchCropDetails = async () => {
    try {
      const cropResponse = await axios.get(`/api/crops/${id}`);
      setCrop(cropResponse.data);

      // Fetch farmer profile
      const profileResponse = await axios.get(
        `/api/profiles/user/${cropResponse.data.farmerId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setFarmerProfile(profileResponse.data);
    } catch (error) {
      console.error('Error fetching crop details:', error);
      setAlert({ type: 'danger', message: 'Failed to load crop details' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (quantity > crop.quantity) {
      setAlert({ type: 'warning', message: 'Quantity exceeds available stock' });
      return;
    }

    addToCart(crop, quantity);
    setAlert({ type: 'success', message: `${quantity} kg of ${crop.name} added to cart!` });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleBuyNow = () => {
    addToCart(crop, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!crop) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Crop not found</Alert>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col lg={6} className="mb-4">
          <Card>
            <div 
              className="d-flex align-items-center justify-content-center bg-secondary"
              style={{ height: '400px' }}
            >
              <span className="text-white" style={{ fontSize: '150px' }}>🌾</span>
            </div>
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Body className="p-4">
              <h2 className="mb-3">{crop.name}</h2>
              
              <div className="mb-3">
                <span className="badge bg-primary me-2">{crop.category}</span>
                <span className="badge bg-info">{crop.location}</span>
              </div>

              <h3 className="text-success mb-4">₹{crop.price}/kg</h3>

              <div className="mb-4">
                <p><strong>Available Quantity:</strong> {crop.quantity} kg</p>
                <p><strong>Description:</strong></p>
                <p className="text-muted">
                  {crop.description || 'No description available'}
                </p>
              </div>

              {farmerProfile && (
                <div className="mb-4 p-3 bg-light rounded">
                  <h5>Seller Information</h5>
                  <p className="mb-1"><strong>Name:</strong> {farmerProfile.name}</p>
                  <p className="mb-1"><strong>Location:</strong> {farmerProfile.location}</p>
                  {farmerProfile.phone && (
                    <p className="mb-0"><strong>Contact:</strong> {farmerProfile.phone}</p>
                  )}
                </div>
              )}

              {user?.role === 'buyer' && user?.approved && (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity (kg)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max={crop.quantity}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleBuyNow}
                      disabled={crop.quantity === 0}
                    >
                      Buy Now - ₹{(crop.price * quantity).toFixed(2)}
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={crop.quantity === 0}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              )}

              {!user && (
                <Alert variant="info">
                  Please <Link to="/login">login</Link> as a buyer to purchase this crop.
                </Alert>
              )}

              {crop.quantity === 0 && (
                <Alert variant="warning">This crop is currently out of stock.</Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CropDetails;
