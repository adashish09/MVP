const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { JWT_SECRET, verifyToken } = require('../middleware/auth');

const router = express.Router();
const usersFile = path.join(__dirname, '../data/users.json');
const profilesFile = path.join(__dirname, '../data/profiles.json');

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, name, phone, address, location, bio } = req.body;

    if (!email || !password || !role || !name) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!['farmer', 'buyer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

    // Check if user already exists
    if (usersData.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      role,
      name,
      approved: false, // Requires admin approval
      createdAt: new Date().toISOString()
    };

    usersData.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(usersData, null, 2));

    // Create profile
    const profilesData = JSON.parse(fs.readFileSync(profilesFile, 'utf-8'));
    const newProfile = {
      id: uuidv4(),
      userId: newUser.id,
      name,
      phone: phone || '',
      address: address || '',
      location: location || '',
      bio: bio || '',
      profileImage: '',
      createdAt: new Date().toISOString()
    };
    profilesData.push(newProfile);
    fs.writeFileSync(profilesFile, JSON.stringify(profilesData, null, 2));

    res.status(201).json({ 
      message: 'Registration successful. Please wait for admin approval.',
      user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const user = usersData.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if approved (except superadmin)
    if (!user.approved && user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Your account is pending approval' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role, name: user.name, approved: user.approved }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', verifyToken, (req, res) => {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const user = usersData.find(u => u.id === req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      approved: user.approved
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
