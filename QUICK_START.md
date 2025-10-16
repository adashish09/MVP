# Quick Start Guide

## Prerequisites
- Node.js v14+ installed
- npm or yarn

## Installation (One-time setup)

### Option 1: Install Both at Once
```bash
npm run install-all
```

### Option 2: Manual Installation
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Running the Application

You need to run both backend and frontend servers:

### Terminal 1 - Backend Server
```bash
cd backend
npm start
```
Backend runs on: **http://localhost:5000**

### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
```
Frontend runs on: **http://localhost:3000**

The browser should automatically open. If not, navigate to http://localhost:3000

## First Steps

### 1. Login as Admin
```
Email: admin@farmmarket.com
Password: admin123
```

### 2. Register Test Users
- Register a **Farmer** account
- Register a **Buyer** account

### 3. Approve Users (as Admin)
- Go to Admin Dashboard → Manage Users
- Approve both farmer and buyer

### 4. Create Crops (as Farmer)
- Login as farmer
- Go to Farmer Dashboard
- Click "Add New Crop"
- Fill in crop details

### 5. Approve Crops (as Admin)
- Login as admin
- Go to Admin Dashboard → Manage Crops
- Approve pending crops

### 6. Shop (as Buyer)
- Login as buyer
- Browse crops on home page
- Add crops to cart
- Checkout

## Stopping the Application

Press `Ctrl+C` in both terminal windows to stop the servers.

## Troubleshooting

### Port already in use
If you get "Port already in use" error:
- Backend: Change PORT in backend/server.js
- Frontend: Change port in frontend/package.json proxy setting

### Data reset
To reset all data, delete the `backend/data` folder. It will be recreated with default data on next start.

### Dependencies issue
```bash
# Clear and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## Project Structure Quick Reference

```
backend/
  - server.js         # Express server
  - routes/           # API endpoints
  - middleware/       # Auth middleware
  - data/            # JSON data files (auto-created)

frontend/
  - src/
    - pages/         # Page components
    - components/    # Reusable components
    - context/       # State management
```

## Default Credentials

**Admin:**
- Email: admin@farmmarket.com
- Password: admin123

**Test Accounts:**
Create your own farmer and buyer accounts through the registration page.

## Features to Test

✅ User Registration (Farmer/Buyer)
✅ Admin Approval Flow
✅ Crop Listing Management
✅ Search and Filters
✅ Shopping Cart
✅ Order Placement
✅ Role-based Dashboards
✅ Analytics Dashboard

Enjoy exploring the Farmer Marketplace Platform! 🌾
