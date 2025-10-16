const express = require('express');
const fs = require('fs');
const path = require('path');
const { verifyToken, requireApproved } = require('../middleware/auth');

const router = express.Router();
const profilesFile = path.join(__dirname, '../data/profiles.json');

// Get profile by user ID
router.get('/user/:userId', verifyToken, (req, res) => {
  try {
    const profilesData = JSON.parse(fs.readFileSync(profilesFile, 'utf-8'));
    const profile = profilesData.find(p => p.userId === req.params.userId);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update profile
router.put('/user/:userId', verifyToken, requireApproved, (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    const profilesData = JSON.parse(fs.readFileSync(profilesFile, 'utf-8'));
    const profileIndex = profilesData.findIndex(p => p.userId === req.params.userId);

    if (profileIndex === -1) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const { name, phone, address, location, bio, profileImage } = req.body;

    profilesData[profileIndex] = {
      ...profilesData[profileIndex],
      name: name || profilesData[profileIndex].name,
      phone: phone || profilesData[profileIndex].phone,
      address: address || profilesData[profileIndex].address,
      location: location || profilesData[profileIndex].location,
      bio: bio || profilesData[profileIndex].bio,
      profileImage: profileImage || profilesData[profileIndex].profileImage,
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(profilesFile, JSON.stringify(profilesData, null, 2));

    res.json({ message: 'Profile updated successfully', profile: profilesData[profileIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
