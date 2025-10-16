import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, Table } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setAlert({ type: 'warning', message: 'Your cart is empty' });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const items = cart.map(item => ({
        cropId: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const response = await axios.post('/api/orders', { items });
      
      clearCart();
      setAlert({ 
        type: 'success', 
        message: 'Order placed successfully! Redirecting to your orders...' 
      });
      
      setTimeout(() => {
        navigate('/buyer/dashboard');
      }, 2000);
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to place order' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {cart.length === 0 ? (
        <Alert variant="info">
          Your cart is empty. <Button variant="link" onClick={() => navigate('/')}>Browse crops</Button>
        </Alert>
      ) : (
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                {cart.map(item => (
                  <div key={item.id} className="cart-item d-flex align-items-center">
                    <div 
                      className="bg-secondary rounded me-3" 
                      style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <span style={{ fontSize: '40px' }}>🌾</span>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-2">{item.category} • {item.location}</p>
                      <p className="mb-0 text-success fw-bold">${item.price}/kg</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        min="1"
                        max={item.quantity}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        style={{ width: '80px' }}
                        className="me-3"
                      />
                      <div className="me-3" style={{ minWidth: '100px', textAlign: 'right' }}>
                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Body>
                <h4 className="mb-4">Order Summary</h4>
                
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Subtotal:</td>
                      <td className="text-end">${getCartTotal().toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Tax (0%):</td>
                      <td className="text-end">$0.00</td>
                    </tr>
                    <tr className="border-top">
                      <td><strong>Total:</strong></td>
                      <td className="text-end">
                        <strong className="text-success h5">${getCartTotal().toFixed(2)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                  <Button 
                    variant="outline-secondary"
                    onClick={() => navigate('/')}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;
