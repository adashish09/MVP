import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    location: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/profiles/user/${user.id}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setAlert({ type: 'danger', message: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      await axios.put(`/api/profiles/user/${user.id}`, profile);
      setAlert({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setSaving(false);
    }
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

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body className="p-4">
              <h2 className="mb-4">My Profile</h2>
              
              {alert && (
                <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
                  {alert.message}
                </Alert>
              )}

              <div className="mb-4 p-3 bg-light rounded">
                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="mb-1"><strong>Role:</strong> {user.role}</p>
                <p className="mb-0">
                  <strong>Status:</strong>{' '}
                  <span className={user.approved ? 'text-success' : 'text-warning'}>
                    {user.approved ? 'Approved' : 'Pending Approval'}
                  </span>
                </p>
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Update Profile'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
