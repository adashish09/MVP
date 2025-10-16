const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { verifyToken, requireRole, requireApproved } = require('../middleware/auth');

const router = express.Router();
const ordersFile = path.join(__dirname, '../data/orders.json');
const cropsFile = path.join(__dirname, '../data/crops.json');

// Create order (buyers only)
router.post('/', verifyToken, requireRole('buyer'), requireApproved, (req, res) => {
  try {
    const { items } = req.body; // items: [{ cropId, quantity, price }]

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const ordersData = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));

    // Validate crops and calculate total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const crop = cropsData.find(c => c.id === item.cropId);
      if (!crop || crop.status !== 'approved') {
        return res.status(400).json({ message: `Crop ${item.cropId} not available` });
      }

      if (crop.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient quantity for ${crop.name}` });
      }

      orderItems.push({
        cropId: item.cropId,
        cropName: crop.name,
        farmerId: crop.farmerId,
        quantity: item.quantity,
        price: crop.price,
        subtotal: crop.price * item.quantity
      });

      total += crop.price * item.quantity;

      // Update crop quantity
      const cropIndex = cropsData.findIndex(c => c.id === item.cropId);
      cropsData[cropIndex].quantity -= item.quantity;
    }

    // Save updated crops
    fs.writeFileSync(cropsFile, JSON.stringify(cropsData, null, 2));

    // Create order
    const newOrder = {
      id: uuidv4(),
      buyerId: req.userId,
      items: orderItems,
      total,
      status: 'completed', // Simple MVP - orders are immediately completed
      createdAt: new Date().toISOString()
    };

    ordersData.push(newOrder);
    fs.writeFileSync(ordersFile, JSON.stringify(ordersData, null, 2));

    // Update farmer revenues
    const farmerIds = [...new Set(orderItems.map(item => item.farmerId))];
    for (const farmerId of farmerIds) {
      try {
        const axios = require('axios');
        await axios.post(`http://localhost:${process.env.PORT || 5000}/api/payments/farmer/${farmerId}/update-revenue`, {
          orderId: newOrder.id
        }, {
          headers: {
            'Authorization': req.headers.authorization
          }
        });
      } catch (error) {
        console.error(`Failed to update revenue for farmer ${farmerId}:`, error.message);
      }
    }

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get orders by buyer
router.get('/buyer', verifyToken, requireRole('buyer'), requireApproved, (req, res) => {
  try {
    const ordersData = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
    const orders = ordersData.filter(o => o.buyerId === req.userId);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get orders for farmer (crops they sold)
router.get('/farmer', verifyToken, requireRole('farmer'), requireApproved, (req, res) => {
  try {
    const ordersData = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
    
    // Filter orders that contain items from this farmer
    const farmerOrders = ordersData
      .map(order => {
        const farmerItems = order.items.filter(item => item.farmerId === req.userId);
        if (farmerItems.length > 0) {
          return {
            ...order,
            items: farmerItems,
            total: farmerItems.reduce((sum, item) => sum + item.subtotal, 0)
          };
        }
        return null;
      })
      .filter(order => order !== null);

    res.json(farmerOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order
router.get('/:id', verifyToken, requireApproved, (req, res) => {
  try {
    const ordersData = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
    const order = ordersData.find(o => o.id === req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check access rights
    const isBuyer = order.buyerId === req.userId;
    const isFarmer = order.items.some(item => item.farmerId === req.userId);
    const isAdmin = req.userRole === 'superadmin';

    if (!isBuyer && !isFarmer && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
