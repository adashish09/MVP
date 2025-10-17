import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';

function Payment() {
  const { user } = useAuth();
  const { cart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  useEffect(() => {
    if (!user || user.role !== 'buyer') {
      navigate('/login');
      return;
    }
    
    if (cart.length === 0) {
      navigate('/marketplace');
      return;
    }
  }, [user, cart, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order
      const orderData = {
        items: cart.map(item => ({
          cropId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await axios.post('/api/orders', orderData);
      
      if (response.data.order) {
        setAlert({ 
          type: 'success', 
          message: 'Payment successful! Your order has been placed.' 
        });
        
        // Clear cart
        clearCart();
        
        // Redirect to orders page after 2 seconds
        setTimeout(() => {
          navigate('/buyer/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Payment failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/').substring(0, 5);
  };

  if (!user || user.role !== 'buyer' || cart.length === 0) {
    return null;
  }

  return (
    <Container className="py-4">
      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold mb-2">Payment</h1>
          <p className="lead text-muted">Complete your purchase securely</p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0"><i className="fas fa-credit-card me-2"></i>Payment Method</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handlePayment}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Payment Method</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      label={
                        <div className="d-flex align-items-center">
                          <i className="fas fa-mobile-alt me-2"></i>
                          UPI Payment
                        </div>
                      }
                    />
                    <Form.Check
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      label={
                        <div className="d-flex align-items-center">
                          <i className="fas fa-credit-card me-2"></i>
                          Credit/Debit Card
                        </div>
                      }
                    />
                  </div>
                </Form.Group>

                {paymentMethod === 'upi' && (
                  <Form.Group className="mb-3">
                    <Form.Label>UPI ID *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your UPI ID (e.g., 1234567890@paytm)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}

                {paymentMethod === 'card' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        required
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry Date *</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            maxLength={5}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV *</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                            maxLength={3}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Cardholder Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter cardholder name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </>
                )}

                <hr />
                <h6 className="fw-bold mb-3">Billing Address</h6>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Street Address *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter street address"
                        value={billingAddress.street}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, street: e.target.value }))}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>State *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter state"
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter pincode"
                        value={billingAddress.pincode}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, pincode: e.target.value }))}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        value={billingAddress.country}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button 
                    type="submit" 
                    variant="success" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock me-2"></i>
                        Pay ₹{getCartTotal().toFixed(2)}
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Header className="bg-light">
              <h5 className="mb-0"><i className="fas fa-shopping-cart me-2"></i>Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div>
                          <strong>{item.name}</strong>
                          <br />
                          <small className="text-muted">{item.category}</small>
                        </div>
                      </td>
                      <td>{item.quantity} kg</td>
                      <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2"><strong>Total</strong></td>
                    <td><strong>₹{getCartTotal().toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;