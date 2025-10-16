const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const JWT_SECRET = 'your-secret-key-change-in-production';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Access denied - Insufficient permissions' });
    }
    next();
  };
};

const requireApproved = (req, res, next) => {
  const usersData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8')
  );
  const user = usersData.find(u => u.id === req.userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  if (!user.approved && user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Your account is pending approval' });
  }
  
  next();
};

module.exports = { verifyToken, requireRole, requireApproved, JWT_SECRET };
