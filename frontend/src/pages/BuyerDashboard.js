import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Badge, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function BuyerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/orders/buyer');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setAlert({ type: 'danger', message: 'Failed to load orders' });
    } finally {
      setLoading(false);
    }
  };

  if (!user.approved) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <h4>Account Pending Approval</h4>
          <p>Your buyer account is pending approval from the administrator. 
          You will be able to browse and purchase crops once your account is approved.</p>
        </Alert>
      </Container>
    );
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
          <h2>My Orders</h2>
          <p className="text-muted">Track your purchase history</p>
        </Col>
        <Col className="text-end">
          <Link to="/marketplace">
            <Button variant="primary" size="lg">
              <i className="fas fa-shopping-cart me-2"></i>
              Browse Marketplace
            </Button>
          </Link>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <Alert variant="info">
          You haven't placed any orders yet. Browse our marketplace to find fresh crops!
        </Alert>
      ) : (
        <Row>
          {orders.map(order => (
            <Col key={order.id} md={12} className="mb-4">
              <Card>
                <Card.Body>
                  <Row className="mb-3">
                    <Col md={6}>
                      <h5>Order ID: <code>{order.id.substring(0, 8)}</code></h5>
                      <p className="text-muted mb-0">
                        {new Date(order.createdAt).toLocaleDateString()} at{' '}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </Col>
                    <Col md={6} className="text-md-end">
                      <Badge bg="success" className="mb-2">{order.status}</Badge>
                      <h4 className="text-success mb-0">${order.total.toFixed(2)}</h4>
                    </Col>
                  </Row>

                  <Table responsive className="mb-0">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.cropName}</td>
                          <td>{item.quantity} kg</td>
                          <td>${item.price.toFixed(2)}/kg</td>
                          <td>${item.subtotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default BuyerDashboard;
