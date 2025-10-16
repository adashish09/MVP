const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { verifyToken, requireRole, requireApproved } = require('../middleware/auth');

const router = express.Router();
const ordersFile = path.join(__dirname, '../data/orders.json');
const usersFile = path.join(__dirname, '../data/users.json');
const farmersFile = path.join(__dirname, '../data/farmers.json');

// Initialize farmers data file if it doesn't exist
const initFarmersFile = () => {
  if (!fs.existsSync(farmersFile)) {
    fs.writeFileSync(farmersFile, JSON.stringify([], null, 2));
  }
};

// Get farmer revenue data
router.get('/farmer/:farmerId/revenue', verifyToken, requireRole('farmer'), requireApproved, (req, res) => {
  try {
    initFarmersFile();
    const farmersData = JSON.parse(fs.readFileSync(farmersFile, 'utf-8'));
    const ordersData = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
    
    const farmerId = req.params.farmerId;
    let farmer = farmersData.find(f => f.farmerId === farmerId);
    
    if (!farmer) {
      // Initialize farmer data
      farmer = {
        farmerId,
        totalRevenue: 0,
        totalOrders: 0,
        monthlyRevenue: {},
        createdAt: new Date().toISOString()
      };
      farmersData.push(farmer);
      fs.writeFileSync(farmersFile, JSON.stringify(farmersData, null, 2));
    }
    
    // Calculate revenue from orders
    const farmerOrders = ordersData.filter(order => 
      order.items.some(item => item.farmerId === farmerId)
    );
    
    const totalRevenue = farmerOrders.reduce((sum, order) => {
      const farmerItems = order.items.filter(item => item.farmerId === farmerId);
      return sum + farmerItems.reduce((itemSum, item) => itemSum + item.subtotal, 0);
    }, 0);
    
    // Update farmer revenue
    farmer.totalRevenue = totalRevenue;
    farmer.totalOrders = farmerOrders.length;
    farmer.updatedAt = new Date().toISOString();
    
    // Calculate monthly revenue
    const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
    farmer.monthlyRevenue[currentMonth] = totalRevenue;
    
    // Save updated farmer data
    const farmerIndex = farmersData.findIndex(f => f.farmerId === farmerId);
    if (farmerIndex !== -1) {
      farmersData[farmerIndex] = farmer;
    } else {
      farmersData.push(farmer);
    }
    fs.writeFileSync(farmersFile, JSON.stringify(farmersData, null, 2));
    
    res.json({
      totalRevenue,
      totalOrders: farmerOrders.length,
      monthlyRevenue: farmer.monthlyRevenue,
      recentOrders: farmerOrders.slice(-5) // Last 5 orders
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update farmer revenue after successful payment
router.post('/farmer/:farmerId/update-revenue', verifyToken, (req, res) => {
  try {
    initFarmersFile();
    const farmersData = JSON.parse(fs.readFileSync(farmersFile, 'utf-8'));
    const ordersData = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
    
    const farmerId = req.params.farmerId;
    const { orderId } = req.body;
    
    // Find the order
    const order = ordersData.find(o => o.id === orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Calculate revenue for this farmer from this order
    const farmerItems = order.items.filter(item => item.farmerId === farmerId);
    const orderRevenue = farmerItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    if (orderRevenue === 0) {
      return res.status(400).json({ message: 'No items found for this farmer in the order' });
    }
    
    // Update farmer revenue
    let farmer = farmersData.find(f => f.farmerId === farmerId);
    if (!farmer) {
      farmer = {
        farmerId,
        totalRevenue: 0,
        totalOrders: 0,
        monthlyRevenue: {},
        createdAt: new Date().toISOString()
      };
    }
    
    farmer.totalRevenue += orderRevenue;
    farmer.totalOrders += 1;
    farmer.updatedAt = new Date().toISOString();
    
    // Update monthly revenue
    const currentMonth = new Date().toISOString().substring(0, 7);
    farmer.monthlyRevenue[currentMonth] = (farmer.monthlyRevenue[currentMonth] || 0) + orderRevenue;
    
    // Save farmer data
    const farmerIndex = farmersData.findIndex(f => f.farmerId === farmerId);
    if (farmerIndex !== -1) {
      farmersData[farmerIndex] = farmer;
    } else {
      farmersData.push(farmer);
    }
    fs.writeFileSync(farmersFile, JSON.stringify(farmersData, null, 2));
    
    res.json({ 
      message: 'Farmer revenue updated successfully',
      totalRevenue: farmer.totalRevenue,
      orderRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;