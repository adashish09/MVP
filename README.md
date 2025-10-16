# Farmer Marketplace Platform - MVP

A full-stack web application connecting farmers directly with buyers for fresh agricultural produce.

## 🌟 Features

### User Roles

#### 1. **Farmers**
- Register and create profile
- List crops for sale with details (name, category, quantity, price, location, description)
- Manage crop listings (create, view, edit, delete)
- View orders received from buyers
- Wait for admin approval before listing crops

#### 2. **Buyers**
- Register and browse available crops
- Search and filter crops by category, location, and price
- View detailed crop information
- Add crops to cart and purchase
- View order history
- Wait for admin approval before purchasing

#### 3. **Superadmin**
- Access admin dashboard with analytics
- Manage all users (approve/reject/remove farmers and buyers)
- Manage all crop listings (approve/reject/remove)
- View platform statistics:
  - Number of users (farmers, buyers)
  - Crop listings (active, pending)
  - Total orders and sales revenue

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API
- **JSON File Storage** - Local data persistence
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** 18 - UI library
- **React Router** v6 - Client-side routing
- **React Bootstrap** - UI components
- **Axios** - HTTP client
- **Context API** - State management

## 📁 Project Structure

```
/workspace
├── backend/
│   ├── data/              # JSON data files (auto-created)
│   ├── middleware/        # Authentication middleware
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication endpoints
│   │   ├── users.js       # User management
│   │   ├── profiles.js    # User profiles
│   │   ├── crops.js       # Crop listings
│   │   ├── orders.js      # Order management
│   │   └── admin.js       # Admin operations
│   ├── uploads/           # File uploads (auto-created)
│   ├── server.js          # Express server
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── context/       # React Context (Auth, Cart)
    │   ├── pages/         # Page components
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Profile.js
    │   │   ├── CropDetails.js
    │   │   ├── Cart.js
    │   │   ├── FarmerDashboard.js
    │   │   ├── BuyerDashboard.js
    │   │   └── AdminDashboard.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

#### 1. Clone the repository
```bash
cd /workspace
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

#### 4. Start the Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

For development with auto-reload:
```bash
npm run dev
```

#### 5. Start the Frontend (in a new terminal)
```bash
cd frontend
npm start
# React app runs on http://localhost:3000
```

The frontend will automatically proxy API requests to the backend (http://localhost:5000).

## 👤 Default Admin Credentials

```
Email: admin@farmmarket.com
Password: admin123
```

## 🔐 Authentication Flow

1. **Register** - Users register as either Farmer or Buyer
2. **Pending Approval** - All new users require admin approval
3. **Admin Approval** - Superadmin approves/rejects users
4. **Login** - Approved users can login and access features
5. **Role-Based Access** - Different dashboards based on user role

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Crops
- `GET /api/crops` - Get all approved crops (public, with filters)
- `GET /api/crops/:id` - Get single crop
- `GET /api/crops/farmer/:farmerId` - Get farmer's crops
- `POST /api/crops` - Create crop (farmer only)
- `PUT /api/crops/:id` - Update crop (farmer only)
- `DELETE /api/crops/:id` - Delete crop (farmer only)

### Orders
- `POST /api/orders` - Create order (buyer only)
- `GET /api/orders/buyer` - Get buyer's orders
- `GET /api/orders/farmer` - Get farmer's orders
- `GET /api/orders/:id` - Get single order

### Profiles
- `GET /api/profiles/user/:userId` - Get user profile
- `PUT /api/profiles/user/:userId` - Update profile

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/approve` - Approve user
- `DELETE /api/admin/users/:id` - Remove user
- `GET /api/admin/crops` - Get all crops
- `PUT /api/admin/crops/:id/approve` - Approve crop
- `PUT /api/admin/crops/:id/reject` - Reject crop
- `DELETE /api/admin/crops/:id` - Remove crop
- `GET /api/admin/analytics` - Get platform analytics

## 🎨 Key Features

### Search & Filter
- Search crops by name, description, or category
- Filter by category, location, price range
- Real-time filtering

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Checkout flow

### Role-Based Dashboards
- **Farmer**: Manage crop listings, view orders
- **Buyer**: View order history
- **Admin**: Platform analytics, user & crop management

### Responsive Design
- Mobile-friendly interface
- Bootstrap components
- Clean and minimal UI

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected routes
- Token verification middleware

## 📝 Data Storage

The application uses JSON files for data persistence:
- `users.json` - User accounts
- `profiles.json` - User profiles
- `crops.json` - Crop listings
- `orders.json` - Order records

These files are created automatically in the `backend/data/` directory on first run.

## 🧪 Testing the Application

1. **Login as Admin**
   - Email: admin@farmmarket.com
   - Password: admin123

2. **Register as Farmer**
   - Go to Register page
   - Select "Farmer" role
   - Fill in details and submit

3. **Approve Farmer (as Admin)**
   - Login as admin
   - Go to Admin Dashboard > Manage Users
   - Approve the farmer

4. **Create Crop Listings (as Farmer)**
   - Login as farmer
   - Go to Farmer Dashboard
   - Add new crops

5. **Approve Crops (as Admin)**
   - Login as admin
   - Go to Admin Dashboard > Manage Crops
   - Approve pending crops

6. **Register and Approve Buyer**
   - Register as buyer
   - Login as admin to approve

7. **Browse and Purchase (as Buyer)**
   - Login as buyer
   - Browse crops on home page
   - Add to cart and checkout

## 🚧 Future Enhancements (Beyond MVP)

- Real database (MongoDB/PostgreSQL)
- Image upload for crops
- Payment gateway integration
- Real-time notifications
- Messaging system between farmers and buyers
- Reviews and ratings
- Advanced analytics
- Email notifications
- Order status tracking
- Delivery management

## 📄 License

MIT License

## 👨‍💻 Development

Built as an MVP for a Farmer Marketplace Platform with role-based access and essential e-commerce features.
