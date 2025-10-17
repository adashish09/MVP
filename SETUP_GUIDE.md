# Kalyaani - Quick Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## Installation Steps

### 1. Clone the Repository (if not already done)
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create data directory if it doesn't exist
mkdir -p data

# Initialize JSON files
echo "[]" > data/users.json
echo "[]" > data/crops.json
echo "[]" > data/orders.json
echo "[]" > data/farmers.json

# Start the backend server
npm start
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

## Default Admin Account

To create an admin account, you can register through the UI or manually add to `backend/data/users.json`:

```json
{
  "id": "admin-uuid",
  "name": "Admin",
  "email": "admin@kalyaani.com",
  "password": "<hashed-password>",
  "role": "superadmin",
  "approved": true,
  "createdAt": "2025-10-17T00:00:00.000Z"
}
```

## Accessing the Application

1. **Landing Page**: http://localhost:3000
2. **Registration**: http://localhost:3000/register
3. **Login**: http://localhost:3000/login
4. **Marketplace**: http://localhost:3000/marketplace

## User Roles

### Farmer
- Can list and manage crops
- Access AI features (crop suggestions, harvest prediction, pest detection)
- View orders and revenue
- Access Kalyaani AI assistant

### Buyer
- Browse marketplace
- Add crops to cart
- Make purchases
- View order history

### Admin (Superadmin)
- Approve/reject user registrations
- Approve/reject crop listings
- Manage all users and crops

## Common Issues & Solutions

### Issue: "Cannot connect to backend"
**Solution**: Ensure backend is running on port 5000

### Issue: "CORS errors"
**Solution**: The frontend proxy is configured in `frontend/package.json`. Make sure backend is running.

### Issue: "Payment not working"
**Solution**: 
1. Ensure you're logged in as a buyer
2. Check that your account is approved
3. Verify backend is running
4. Check browser console for errors

### Issue: "Crops not showing"
**Solution**: 
1. Crops need to be approved by admin
2. Farmers need approved accounts to list crops
3. Check backend data files exist

## Environment Variables (Optional)

### Backend (.env file in backend directory)
```env
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Frontend (.env file in frontend directory)
```env
REACT_APP_API_URL=http://localhost:5000
```

## Project Structure

```
kalyaani-platform/
├── backend/
│   ├── data/              # JSON storage files
│   ├── middleware/        # Auth middleware
│   ├── routes/           # API routes
│   └── server.js         # Entry point
├── frontend/
│   ├── public/           # Static files
│   └── src/
│       ├── components/   # React components
│       ├── context/      # Context providers
│       ├── pages/        # Page components
│       └── App.js        # Main app component
└── README.md
```

## Development Workflow

1. Make sure both backend and frontend are running
2. Frontend auto-reloads on code changes
3. Backend requires restart for changes (or use nodemon)
4. Test changes in browser
5. Commit changes to git

## Production Deployment

### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder using a static server
```

## Additional Resources

- React Documentation: https://react.dev
- React Bootstrap: https://react-bootstrap.github.io
- React Router: https://reactrouter.com
- Axios: https://axios-http.com

## Support

For issues or questions:
- Email: support@kalyaani.com
- Phone: +91 1800-123-4567

---

Happy coding! 🌾
