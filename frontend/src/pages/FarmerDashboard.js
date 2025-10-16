import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Alert, Badge, Table, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function FarmerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
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

  // AI Features State
  const [cropPrediction, setCropPrediction] = useState({
    soilType: '',
    climate: '',
    season: '',
    location: '',
    prediction: null,
    loading: false
  });
  const [pestDetection, setPestDetection] = useState({
    image: null,
    description: '',
    detection: null,
    loading: false
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

  // AI Functions
  const handleCropPrediction = async () => {
    if (!cropPrediction.soilType || !cropPrediction.climate || !cropPrediction.season || !cropPrediction.location) {
      setAlert({ type: 'warning', message: 'Please fill in all fields for crop prediction' });
      return;
    }

    setCropPrediction(prev => ({ ...prev, loading: true }));
    try {
      const prompt = `Based on the following conditions, recommend the best crops to grow:
      - Soil Type: ${cropPrediction.soilType}
      - Climate: ${cropPrediction.climate}
      - Season: ${cropPrediction.season}
      - Location: ${cropPrediction.location}
      
      Please provide specific crop recommendations with reasons and expected yield potential.`;

      const response = await axios.post('/api/gemini/generate', { prompt });
      setCropPrediction(prev => ({ 
        ...prev, 
        prediction: response.data.candidates[0].content.parts[0].text,
        loading: false 
      }));
    } catch (error) {
      console.error('Error getting crop prediction:', error);
      setAlert({ type: 'danger', message: 'Failed to get crop prediction' });
      setCropPrediction(prev => ({ ...prev, loading: false }));
    }
  };

  const handlePestDetection = async () => {
    if (!pestDetection.description) {
      setAlert({ type: 'warning', message: 'Please describe the pest or disease symptoms' });
      return;
    }

    setPestDetection(prev => ({ ...prev, loading: true }));
    try {
      const prompt = `I need help identifying a pest or disease affecting my crops. Here are the symptoms:
      ${pestDetection.description}
      
      Please identify the likely pest or disease and provide treatment recommendations.`;

      const response = await axios.post('/api/gemini/generate', { prompt });
      setPestDetection(prev => ({ 
        ...prev, 
        detection: response.data.candidates[0].content.parts[0].text,
        loading: false 
      }));
    } catch (error) {
      console.error('Error getting pest detection:', error);
      setAlert({ type: 'danger', message: 'Failed to get pest detection' });
      setPestDetection(prev => ({ ...prev, loading: false }));
    }
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

      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold mb-2">Farmer Dashboard</h1>
          <p className="lead text-muted">Manage your crops, get AI insights, and grow smarter</p>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        fill
      >
        <Tab eventKey="overview" title="Overview">
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm stat-card">
                <Card.Body>
                  <div className="stat-value text-primary">{crops.length}</div>
                  <div className="stat-label">Total Crops</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm stat-card">
                <Card.Body>
                  <div className="stat-value text-success">{crops.filter(c => c.status === 'approved').length}</div>
                  <div className="stat-label">Approved Crops</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm stat-card">
                <Card.Body>
                  <div className="stat-value text-warning">{orders.length}</div>
                  <div className="stat-label">Total Orders</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm stat-card">
                <Card.Body>
                  <div className="stat-value text-info">${crops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0).toFixed(2)}</div>
                  <div className="stat-label">Total Value</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0"><i className="fas fa-seedling me-2"></i>Recent Crops</h5>
                </Card.Header>
                <Card.Body>
                  {crops.slice(0, 3).map(crop => (
                    <div key={crop.id} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <strong>{crop.name}</strong>
                        <small className="text-muted d-block">{crop.category}</small>
                      </div>
                      <Badge bg={crop.status === 'approved' ? 'success' : 'warning'}>{crop.status}</Badge>
                    </div>
                  ))}
                  {crops.length === 0 && (
                    <p className="text-muted text-center">No crops listed yet</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0"><i className="fas fa-shopping-cart me-2"></i>Recent Orders</h5>
                </Card.Header>
                <Card.Body>
                  {orders.slice(0, 3).map(order => (
                    <div key={order.id} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <strong>Order #{order.id.substring(0, 8)}</strong>
                        <small className="text-muted d-block">${order.total.toFixed(2)}</small>
                      </div>
                      <Badge bg="success">{order.status}</Badge>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-muted text-center">No orders yet</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="crops" title="My Crops">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>My Crop Listings</h3>
            <Button variant="primary" onClick={() => handleOpenModal()}>
              <i className="fas fa-plus me-2"></i>Add New Crop
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
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="fw-bold">{crop.name}</h5>
                        {getStatusBadge(crop.status)}
                      </div>
                      <p className="text-muted small mb-2">
                        <i className="fas fa-tag me-1"></i>{crop.category}
                      </p>
                      <p className="mb-1">
                        <i className="fas fa-weight me-1"></i>
                        <strong>Quantity:</strong> {crop.quantity} kg
                      </p>
                      <p className="mb-2">
                        <i className="fas fa-dollar-sign me-1"></i>
                        <strong>Price:</strong> ${crop.price}/kg
                      </p>
                      <p className="text-muted small mb-3">
                        <i className="fas fa-map-marker-alt me-1"></i>{crop.location}
                      </p>
                      <div className="d-grid gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleOpenModal(crop)}
                        >
                          <i className="fas fa-edit me-1"></i>Edit
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(crop.id)}
                        >
                          <i className="fas fa-trash me-1"></i>Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        <Tab eventKey="crop-prediction" title="Crop Prediction">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0"><i className="fas fa-brain me-2"></i>AI Crop Prediction</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="fw-bold mb-3">Enter Your Farm Details</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>Soil Type</Form.Label>
                    <Form.Select
                      value={cropPrediction.soilType}
                      onChange={(e) => setCropPrediction(prev => ({ ...prev, soilType: e.target.value }))}
                    >
                      <option value="">Select Soil Type</option>
                      <option value="clay">Clay</option>
                      <option value="sandy">Sandy</option>
                      <option value="loamy">Loamy</option>
                      <option value="silty">Silty</option>
                      <option value="peaty">Peaty</option>
                      <option value="chalky">Chalky</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Climate</Form.Label>
                    <Form.Select
                      value={cropPrediction.climate}
                      onChange={(e) => setCropPrediction(prev => ({ ...prev, climate: e.target.value }))}
                    >
                      <option value="">Select Climate</option>
                      <option value="tropical">Tropical</option>
                      <option value="subtropical">Subtropical</option>
                      <option value="temperate">Temperate</option>
                      <option value="continental">Continental</option>
                      <option value="arid">Arid</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Season</Form.Label>
                    <Form.Select
                      value={cropPrediction.season}
                      onChange={(e) => setCropPrediction(prev => ({ ...prev, season: e.target.value }))}
                    >
                      <option value="">Select Season</option>
                      <option value="spring">Spring</option>
                      <option value="summer">Summer</option>
                      <option value="autumn">Autumn</option>
                      <option value="winter">Winter</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your location"
                      value={cropPrediction.location}
                      onChange={(e) => setCropPrediction(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    onClick={handleCropPrediction}
                    disabled={cropPrediction.loading}
                  >
                    {cropPrediction.loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-magic me-2"></i>Get Prediction
                      </>
                    )}
                  </Button>
                </Col>
                <Col md={6}>
                  <h6 className="fw-bold mb-3">AI Recommendations</h6>
                  {cropPrediction.prediction ? (
                    <div className="bg-light p-3 rounded">
                      <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{cropPrediction.prediction}</pre>
                    </div>
                  ) : (
                    <div className="text-center text-muted py-4">
                      <i className="fas fa-seedling display-4 mb-3"></i>
                      <p>Fill in your farm details and get AI-powered crop recommendations</p>
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="pest-detection" title="Pest Detection">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0"><i className="fas fa-bug me-2"></i>Pest & Disease Detection</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="fw-bold mb-3">Describe the Problem</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>Pest/Disease Symptoms</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Describe the symptoms you're seeing on your crops. Include details about:
- Leaf discoloration or spots
- Wilting or drooping
- Holes in leaves
- Unusual growth patterns
- Any visible insects or pests"
                      value={pestDetection.description}
                      onChange={(e) => setPestDetection(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </Form.Group>
                  <Button 
                    variant="warning" 
                    onClick={handlePestDetection}
                    disabled={pestDetection.loading}
                  >
                    {pestDetection.loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search me-2"></i>Analyze Problem
                      </>
                    )}
                  </Button>
                </Col>
                <Col md={6}>
                  <h6 className="fw-bold mb-3">AI Diagnosis & Treatment</h6>
                  {pestDetection.detection ? (
                    <div className="bg-light p-3 rounded">
                      <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{pestDetection.detection}</pre>
                    </div>
                  ) : (
                    <div className="text-center text-muted py-4">
                      <i className="fas fa-microscope display-4 mb-3"></i>
                      <p>Describe the symptoms and get AI-powered diagnosis and treatment recommendations</p>
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="orders" title="Orders">
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
            <Card className="border-0 shadow-sm">
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
        </Tab>
      </Tabs>

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
