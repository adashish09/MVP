const express = require('express');
const fs = require('fs');
const path = require('path');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
const usersFile = path.join(__dirname, '../data/users.json');

// Get user profile
router.get('/:id', verifyToken, (req, res) => {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const user = usersData.find(u => u.id === req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
