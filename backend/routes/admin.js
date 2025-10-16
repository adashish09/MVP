const express = require('express');
const fs = require('fs');
const path = require('path');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();
const usersFile = path.join(__dirname, '../data/users.json');
const cropsFile = path.join(__dirname, '../data/crops.json');
const ordersFile = path.join(__dirname, '../data/orders.json');

// Get all users
router.get('/users', verifyToken, requireRole('superadmin'), (req, res) => {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const users = usersData.map(({ password, ...user }) => user);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve user
router.put('/users/:id/approve', verifyToken, requireRole('superadmin'), (req, res) => {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const userIndex = usersData.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    usersData[userIndex].approved = true;
    fs.writeFileSync(usersFile, JSON.stringify(usersData, null, 2));

    res.json({ message: 'User approved successfully', user: usersData[userIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reject/Remove user
router.delete('/users/:id', verifyToken, requireRole('superadmin'), (req, res) => {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const userIndex = usersData.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (usersData[userIndex].role === 'superadmin') {
      return res.status(403).json({ message: 'Cannot delete superadmin' });
    }

    usersData.splice(userIndex, 1);
    fs.writeFileSync(usersFile, JSON.stringify(usersData, null, 2));

    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all crops (including pending)
router.get('/crops', verifyToken, requireRole('superadmin'), (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    res.json(cropsData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve crop
router.put('/crops/:id/approve', verifyToken, requireRole('superadmin'), (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    const cropIndex = cropsData.findIndex(c => c.id === req.params.id);

    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    cropsData[cropIndex].status = 'approved';
    fs.writeFileSync(cropsFile, JSON.stringify(cropsData, null, 2));

    res.json({ message: 'Crop approved successfully', crop: cropsData[cropIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reject crop
router.put('/crops/:id/reject', verifyToken, requireRole('superadmin'), (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    const cropIndex = cropsData.findIndex(c => c.id === req.params.id);

    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    cropsData[cropIndex].status = 'rejected';
    fs.writeFileSync(cropsFile, JSON.stringify(cropsData, null, 2));

    res.json({ message: 'Crop rejected successfully', crop: cropsData[cropIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete crop
router.delete('/crops/:id', verifyToken, requireRole('superadmin'), (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    const cropIndex = cropsData.findIndex(c => c.id === req.params.id);

    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    cropsData.splice(cropIndex, 1);
    fs.writeFileSync(cropsFile, JSON.stringify(cropsData, null, 2));

    res.json({ message: 'Crop removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get analytics
router.get('/analytics', verifyToken, requireRole('superadmin'), (req, res) => {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    const ordersData = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));

    const analytics = {
      totalUsers: usersData.length - 1, // Exclude superadmin
      farmers: usersData.filter(u => u.role === 'farmer').length,
      buyers: usersData.filter(u => u.role === 'buyer').length,
      pendingUsers: usersData.filter(u => !u.approved && u.role !== 'superadmin').length,
      totalCrops: cropsData.length,
      activeCrops: cropsData.filter(c => c.status === 'approved').length,
      pendingCrops: cropsData.filter(c => c.status === 'pending').length,
      totalOrders: ordersData.length,
      totalSales: ordersData.reduce((sum, order) => sum + order.total, 0)
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
