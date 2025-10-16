const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure data and uploads directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Initialize data files if they don't exist
const initDataFile = (filename, defaultData) => {
  const filepath = path.join(dataDir, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(defaultData, null, 2));
  }
};

// Initialize default data
initDataFile('users.json', [
  {
    id: 'admin-1',
    email: 'admin@farmmarket.com',
    password: '$2a$10$8ZqfN9Zy1YZ.5K5Z1YZ.5O5K5Z1YZ.5K5Z1YZ.5K5Z1YZ.5K5Z1YZ.', // password: admin123
    role: 'superadmin',
    name: 'Super Admin',
    approved: true,
    createdAt: new Date().toISOString()
  }
]);
initDataFile('crops.json', []);
initDataFile('orders.json', []);
initDataFile('profiles.json', []);

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const cropRoutes = require('./routes/crops');
const orderRoutes = require('./routes/orders');
const profileRoutes = require('./routes/profiles');
const adminRoutes = require('./routes/admin');


// Gemini AI route


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
