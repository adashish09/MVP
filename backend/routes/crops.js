const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { verifyToken, requireRole, requireApproved } = require('../middleware/auth');

const router = express.Router();
const cropsFile = path.join(__dirname, '../data/crops.json');

// Get all crops (public, with filters)
router.get('/', (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    let crops = cropsData.filter(c => c.status === 'approved');

    // Apply filters
    const { category, location, minPrice, maxPrice, search } = req.query;

    if (category) {
      crops = crops.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    if (location) {
      crops = crops.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (minPrice) {
      crops = crops.filter(c => c.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      crops = crops.filter(c => c.price <= parseFloat(maxPrice));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      crops = crops.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.category.toLowerCase().includes(searchLower)
      );
    }

    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single crop by ID
router.get('/:id', (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    const crop = cropsData.find(c => c.id === req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get crops by farmer
router.get('/farmer/:farmerId', verifyToken, (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    const crops = cropsData.filter(c => c.farmerId === req.params.farmerId);

    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create crop listing (farmers only)
router.post('/', verifyToken, requireRole('farmer'), requireApproved, (req, res) => {
  try {
    const { name, category, quantity, price, location, description, images } = req.body;

    if (!name || !category || !quantity || !price || !location) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));

    const newCrop = {
      id: uuidv4(),
      farmerId: req.userId,
      name,
      category,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      location,
      description: description || '',
      images: images || [],
      status: 'pending', // Requires admin approval
      createdAt: new Date().toISOString()
    };

    cropsData.push(newCrop);
    fs.writeFileSync(cropsFile, JSON.stringify(cropsData, null, 2));

    res.status(201).json({ message: 'Crop listing created successfully', crop: newCrop });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update crop listing (farmers only, own crops)
router.put('/:id', verifyToken, requireRole('farmer'), requireApproved, (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    const cropIndex = cropsData.findIndex(c => c.id === req.params.id);

    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Check if farmer owns this crop
    if (cropsData[cropIndex].farmerId !== req.userId) {
      return res.status(403).json({ message: 'You can only update your own crops' });
    }

    const { name, category, quantity, price, location, description, images } = req.body;

    cropsData[cropIndex] = {
      ...cropsData[cropIndex],
      name: name || cropsData[cropIndex].name,
      category: category || cropsData[cropIndex].category,
      quantity: quantity !== undefined ? parseFloat(quantity) : cropsData[cropIndex].quantity,
      price: price !== undefined ? parseFloat(price) : cropsData[cropIndex].price,
      location: location || cropsData[cropIndex].location,
      description: description !== undefined ? description : cropsData[cropIndex].description,
      images: images !== undefined ? images : cropsData[cropIndex].images,
      status: 'pending', // Requires re-approval after edit
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(cropsFile, JSON.stringify(cropsData, null, 2));

    res.json({ message: 'Crop listing updated successfully', crop: cropsData[cropIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete crop listing (farmers only, own crops)
router.delete('/:id', verifyToken, requireRole('farmer'), requireApproved, (req, res) => {
  try {
    const cropsData = JSON.parse(fs.readFileSync(cropsFile, 'utf-8'));
    const cropIndex = cropsData.findIndex(c => c.id === req.params.id);

    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Check if farmer owns this crop
    if (cropsData[cropIndex].farmerId !== req.userId) {
      return res.status(403).json({ message: 'You can only delete your own crops' });
    }

    cropsData.splice(cropIndex, 1);
    fs.writeFileSync(cropsFile, JSON.stringify(cropsData, null, 2));

    res.json({ message: 'Crop listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
