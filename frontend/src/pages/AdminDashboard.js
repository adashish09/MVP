import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge, Table } from 'react-bootstrap';
import axios from 'axios';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, usersRes, cropsRes] = await Promise.all([
        axios.get('/api/admin/analytics'),
        axios.get('/api/admin/users'),
        axios.get('/api/admin/crops')
      ]);
      setAnalytics(analyticsRes.data);
      setUsers(usersRes.data);
      setCrops(cropsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setAlert({ type: 'danger', message: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await axios.put(`/api/admin/users/${userId}/approve`);
      setAlert({ type: 'success', message: 'User approved successfully!' });
      fetchData();
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to approve user' 
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;

    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setAlert({ type: 'success', message: 'User removed successfully!' });
      fetchData();
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to remove user' 
      });
    }
  };

  const handleApproveCrop = async (cropId) => {
    try {
      await axios.put(`/api/admin/crops/${cropId}/approve`);
      setAlert({ type: 'success', message: 'Crop approved successfully!' });
      fetchData();
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to approve crop' 
      });
    }
  };

  const handleRejectCrop = async (cropId) => {
    try {
      await axios.put(`/api/admin/crops/${cropId}/reject`);
      setAlert({ type: 'success', message: 'Crop rejected successfully!' });
      fetchData();
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to reject crop' 
      });
    }
  };

  const handleDeleteCrop = async (cropId) => {
    if (!window.confirm('Are you sure you want to remove this crop?')) return;

    try {
      await axios.delete(`/api/admin/crops/${cropId}`);
      setAlert({ type: 'success', message: 'Crop removed successfully!' });
      fetchData();
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to remove crop' 
      });
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      approved: 'success',
      pending: 'warning',
      rejected: 'danger',
      true: 'success',
      false: 'warning'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status === true ? 'approved' : status === false ? 'pending' : status}</Badge>;
  };

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
            <h5 className="mb-3">Admin Dashboard</h5>
            <a 
              href="#analytics" 
              className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </a>
            <a 
              href="#users" 
              className={`sidebar-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Manage Users
            </a>
            <a 
              href="#crops" 
              className={`sidebar-link ${activeTab === 'crops' ? 'active' : ''}`}
              onClick={() => setActiveTab('crops')}
            >
              Manage Crops
            </a>
          </div>
        </Col>

        <Col md={9}>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'analytics' && analytics && (
                <>
                  <h3 className="mb-4">Platform Analytics</h3>
                  <Row>
                    <Col md={6} lg={3} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">{analytics.totalUsers}</div>
                        <div className="stat-label">Total Users</div>
                      </div>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">{analytics.farmers}</div>
                        <div className="stat-label">Farmers</div>
                      </div>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">{analytics.buyers}</div>
                        <div className="stat-label">Buyers</div>
                      </div>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">{analytics.pendingUsers}</div>
                        <div className="stat-label">Pending Approvals</div>
                      </div>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">{analytics.totalCrops}</div>
                        <div className="stat-label">Total Crops</div>
                      </div>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">{analytics.activeCrops}</div>
                        <div className="stat-label">Active Listings</div>
                      </div>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">{analytics.pendingCrops}</div>
                        <div className="stat-label">Pending Crops</div>
                      </div>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">{analytics.totalOrders}</div>
                        <div className="stat-label">Total Orders</div>
                      </div>
                    </Col>
                    <Col md={12} className="mb-4">
                      <div className="stat-card">
                        <div className="stat-value">${analytics.totalSales.toFixed(2)}</div>
                        <div className="stat-label">Total Sales Revenue</div>
                      </div>
                    </Col>
                  </Row>
                </>
              )}

              {activeTab === 'users' && (
                <>
                  <h3 className="mb-4">Manage Users</h3>
                  <Card>
                    <Card.Body>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Registered</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.filter(u => u.role !== 'superadmin').map(user => (
                            <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td><Badge bg="info">{user.role}</Badge></td>
                              <td>{getStatusBadge(user.approved)}</td>
                              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                              <td>
                                {!user.approved && (
                                  <Button 
                                    variant="success" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => handleApproveUser(user.id)}
                                  >
                                    Approve
                                  </Button>
                                )}
                                <Button 
                                  variant="danger" 
                                  size="sm"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </>
              )}

              {activeTab === 'crops' && (
                <>
                  <h3 className="mb-4">Manage Crop Listings</h3>
                  <Card>
                    <Card.Body>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Crop Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {crops.map(crop => (
                            <tr key={crop.id}>
                              <td>{crop.name}</td>
                              <td>{crop.category}</td>
                              <td>${crop.price}/kg</td>
                              <td>{crop.quantity} kg</td>
                              <td>{crop.location}</td>
                              <td>{getStatusBadge(crop.status)}</td>
                              <td>
                                {crop.status === 'pending' && (
                                  <>
                                    <Button 
                                      variant="success" 
                                      size="sm" 
                                      className="me-2 mb-1"
                                      onClick={() => handleApproveCrop(crop.id)}
                                    >
                                      Approve
                                    </Button>
                                    <Button 
                                      variant="warning" 
                                      size="sm" 
                                      className="me-2 mb-1"
                                      onClick={() => handleRejectCrop(crop.id)}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                )}
                                <Button 
                                  variant="danger" 
                                  size="sm"
                                  className="mb-1"
                                  onClick={() => handleDeleteCrop(crop.id)}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
