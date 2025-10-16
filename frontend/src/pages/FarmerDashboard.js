import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Alert, Badge, Table } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function FarmerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('crops');
  const [crops, setCrops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    quantity: '',
    price: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cropsRes, ordersRes] = await Promise.all([
        axios.get(`/api/crops/farmer/${user.id}`),
        axios.get('/api/orders/farmer')
      ]);
      setCrops(cropsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setAlert({ type: 'danger', message: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (crop = null) => {
    if (crop) {
      setEditingCrop(crop);
      setFormData({
        name: crop.name,
        category: crop.category,
        quantity: crop.quantity,
        price: crop.price,
        location: crop.location,
        description: crop.description
      });
    } else {
      setEditingCrop(null);
      setFormData({
        name: '',
        category: 'vegetables',
        quantity: '',
        price: '',
        location: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCrop(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    try {
      if (editingCrop) {
        await axios.put(`/api/crops/${editingCrop.id}`, formData);
        setAlert({ type: 'success', message: 'Crop updated successfully!' });
      } else {
        await axios.post('/api/crops', formData);
        setAlert({ type: 'success', message: 'Crop created successfully!' });
      }
      handleCloseModal();
      fetchData();
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Operation failed' 
      });
    }
  };

  const handleDelete = async (cropId) => {
    if (!window.confirm('Are you sure you want to delete this crop?')) return;

    try {
      await axios.delete(`/api/crops/${cropId}`);
      setAlert({ type: 'success', message: 'Crop deleted successfully!' });
      fetchData();
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to delete crop' 
      });
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      approved: 'success',
      pending: 'warning',
      rejected: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (!user.approved) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <h4>Account Pending Approval</h4>
          <p>Your farmer account is pending approval from the administrator. 
          You will be able to access your dashboard once your account is approved.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col md={3}>
          <div className="sidebar">
            <h5 className="mb-3">Farmer Dashboard</h5>
            <a 
              href="#crops" 
              className={`sidebar-link ${activeTab === 'crops' ? 'active' : ''}`}
              onClick={() => setActiveTab('crops')}
            >
              My Crops
            </a>
            <a 
              href="#orders" 
              className={`sidebar-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders Received
            </a>
          </div>
        </Col>

        <Col md={9}>
          {activeTab === 'crops' && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>My Crop Listings</h3>
                <Button variant="primary" onClick={() => handleOpenModal()}>
                  + Add New Crop
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : crops.length === 0 ? (
                <Alert variant="info">
                  You haven't listed any crops yet. Click "Add New Crop" to get started.
                </Alert>
              ) : (
                <Row>
                  {crops.map(crop => (
                    <Col md={6} lg={4} key={crop.id} className="mb-4">
                      <Card className="h-100">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5>{crop.name}</h5>
                            {getStatusBadge(crop.status)}
                          </div>
                          <p className="text-muted small mb-2">{crop.category}</p>
                          <p className="mb-1"><strong>Quantity:</strong> {crop.quantity} kg</p>
                          <p className="mb-2"><strong>Price:</strong> ${crop.price}/kg</p>
                          <p className="text-muted small mb-3">{crop.location}</p>
                          <div className="d-grid gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleOpenModal(crop)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDelete(crop.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <h3 className="mb-4">Orders Received</h3>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <Alert variant="info">No orders received yet.</Alert>
              ) : (
                <Card>
                  <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td><code>{order.id.substring(0, 8)}</code></td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                              {order.items.map((item, idx) => (
                                <div key={idx}>
                                  {item.cropName} ({item.quantity} kg)
                                </div>
                              ))}
                            </td>
                            <td>${order.total.toFixed(2)}</td>
                            <td><Badge bg="success">{order.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </Col>
      </Row>

      {/* Add/Edit Crop Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingCrop ? 'Edit Crop' : 'Add New Crop'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Crop Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category*</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                    <option value="pulses">Pulses</option>
                    <option value="spices">Spices</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity (kg)*</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($/kg)*</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Location*</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., California, USA"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your crop..."
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                {editingCrop ? 'Update Crop' : 'Add Crop'}
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default FarmerDashboard;
