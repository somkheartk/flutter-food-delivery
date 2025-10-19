# Flutter Food Delivery App - All-in-One System

A comprehensive full-stack food delivery application built with Flutter, NestJS, and MongoDB. This is an **all-in-one application** supporting multiple user roles (Customer, Merchant, Rider, Admin) in a single unified system.

## 🚀 Features

### **Core System**
- **Flutter Mobile App** - All-in-one app for all user roles with Material Design 3
- **NestJS Backend API** - Complete RESTful API with authentication and authorization
- **MongoDB Database** - NoSQL database with optimized indexes
- **Role-Based Access Control (RBAC)** - Customer, Merchant, Rider, Admin roles
- **JWT Authentication** - Secure authentication with access and refresh tokens
- **Geospatial Queries** - Find nearby merchants using MongoDB geospatial features

### **Customer Features**
- Browse nearby merchants and food items
- Category-based filtering
- Shopping cart management
- Apply promo codes
- Multiple delivery addresses
- Place orders with various payment methods
- Track order status in real-time
- Rate and review merchants and riders
- View order history

### **Merchant Features**
- Store registration and management
- Menu/food item management
- Open/close store status
- Receive and manage orders
- Accept/reject orders
- Update order preparation status
- View sales reports (coming soon)
- Ratings and reviews

### **Rider Features**
- View available delivery jobs
- Accept delivery assignments
- Update delivery status
- Complete deliveries
- Track earnings (coming soon)
- Ratings from customers

### **Admin Features** (Web Dashboard - Coming Soon)
- Manage users, merchants, riders
- Manage promo codes and promotions
- View all orders and analytics
- Generate reports
- System monitoring

### **Technical Features**
- **Security**: Helmet, CORS, rate limiting, input validation
- **Scalability**: Modular architecture, database indexes
- **Error Handling**: Comprehensive error handling and validation
- **Documentation**: Complete API documentation and guides

## 📁 Project Structure

```
flutter-food-delivery/
├── flutter_app/          # Flutter mobile application
│   ├── lib/
│   │   ├── models/       # Data models
│   │   ├── screens/      # UI screens
│   │   ├── services/     # API services
│   │   ├── widgets/      # Reusable widgets
│   │   └── main.dart     # App entry point
│   └── pubspec.yaml      # Flutter dependencies
│
├── backend/              # NestJS backend application
│   ├── src/
│   │   ├── foods/        # Foods module
│   │   ├── orders/       # Orders module
│   │   ├── app.module.ts # Main app module
│   │   └── main.ts       # Backend entry point
│   └── package.json      # Node dependencies
│
└── README.md            # This file
```

## 🛠️ Prerequisites

### For Flutter App:
- Flutter SDK (>= 3.0.0)
- Dart SDK
- Android Studio / Xcode (for mobile development)
- An Android/iOS device or emulator

### For Backend:
- Node.js (>= 18.x)
- npm or yarn
- MongoDB (>= 5.0)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/somkheartk/flutter-food-delivery.git
cd flutter-food-delivery
```

### 2. Setup Backend

```bash
cd backend
npm install
```

**Configure MongoDB:**

The backend is configured to connect to MongoDB at `mongodb://localhost:27017/food-delivery`. If you need to change this:

1. Open `backend/src/app.module.ts`
2. Update the MongoDB connection string in `MongooseModule.forRoot()`

**Start the Backend:**

```bash
npm run start:dev
```

The backend will run on `http://localhost:3000`

**Seed Sample Data (Optional):**

```bash
curl -X POST http://localhost:3000/api/foods/seed
```

### 3. Setup Flutter App

```bash
cd ../flutter_app
flutter pub get
```

**Configure API Endpoint:**

If your backend is not running on `localhost:3000`, update the API URL:

1. Open `flutter_app/lib/services/api_service.dart`
2. Update the `baseUrl` constant with your backend URL

**Run the Flutter App:**

For Android/iOS:
```bash
flutter run
```

For Web:
```bash
flutter run -d chrome
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout (requires auth)
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/refresh` - Refresh access token

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users (supports role filter)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Merchants
- `POST /api/merchants` - Create merchant (merchant/admin only)
- `GET /api/merchants` - Get all merchants
- `GET /api/merchants/nearby` - Find nearby merchants (geospatial query)
- `GET /api/merchants/owner/:id` - Get merchant by owner
- `GET /api/merchants/:id` - Get merchant by ID
- `PATCH /api/merchants/:id` - Update merchant
- `PATCH /api/merchants/:id/open-status` - Update open/close status
- `DELETE /api/merchants/:id` - Delete merchant (admin only)

### Foods
- `GET /api/foods` - Get all food items
- `GET /api/foods/:id` - Get a specific food item
- `GET /api/foods/category/:category` - Get food items by category
- `POST /api/foods` - Create a new food item
- `PUT /api/foods/:id` - Update a food item
- `DELETE /api/foods/:id` - Delete a food item
- `POST /api/foods/seed` - Seed sample data

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get a specific order
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/assign-rider` - Assign a rider to an order
- `DELETE /api/orders/:id` - Delete an order

### Riders
- `GET /api/riders` - Get all riders
- `GET /api/riders/available` - Get available riders
- `GET /api/riders/:id` - Get a specific rider
- `POST /api/riders` - Create a new rider
- `PUT /api/riders/:id` - Update a rider
- `PUT /api/riders/:id/status` - Update rider status
- `DELETE /api/riders/:id` - Delete a rider

### Promo Codes
- `POST /api/promo-codes` - Create promo code (admin only)
- `GET /api/promo-codes` - Get all promo codes (admin only)
- `GET /api/promo-codes/active` - Get active promo codes
- `GET /api/promo-codes/validate/:code` - Validate promo code
- `DELETE /api/promo-codes/:id` - Delete promo code

### Reviews
- `POST /api/reviews` - Create review (requires auth)
- `GET /api/reviews/target/:id` - Get reviews for merchant/rider
- `GET /api/reviews/target/:id/average` - Get average rating
- `GET /api/reviews/order/:id` - Get reviews for order
- `GET /api/reviews/user/:id` - Get user's reviews
- `DELETE /api/reviews/:id` - Delete review

## 🎨 Flutter App Features

### Screens

1. **Home Screen** - Browse food items with category filters
2. **Cart Screen** - View cart items, enter delivery address, and place orders
3. **Orders Screen** - View order history, track order status, and see assigned rider details

### Models

- **FoodItem** - Food item with name, description, price, category, etc.
- **Order** - Order with items, total amount, delivery address, status, and rider information
- **Rider** - Rider with name, phone, vehicle type, and availability status

### Services

- **ApiService** - HTTP client for communicating with the backend API

## 🗄️ Database Schema

### Food Collection

```javascript
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  preparationTime: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection

```javascript
{
  items: [{
    foodId: String,
    foodName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  deliveryAddress: String,
  status: String, // pending, confirmed, preparing, delivering, completed, cancelled
  riderId: String,
  riderName: String,
  riderPhone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Rider Collection

```javascript
{
  name: String,
  phone: String,
  vehicleType: String, // motorcycle, bicycle, car
  status: String, // available, busy, offline
  currentLocation: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Development

### Backend Development

Run in watch mode:
```bash
cd backend
npm run start:dev
```

### Flutter Development

Run with hot reload:
```bash
cd flutter_app
flutter run
```

Build for production:
```bash
flutter build apk  # For Android
flutter build ios  # For iOS
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test
```

### Flutter Tests

```bash
cd flutter_app
flutter test
```

## 📝 Environment Variables

### Backend (.env file - optional)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/food-delivery
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

somkheartk

## 🙏 Acknowledgments

- Flutter team for the amazing framework
- NestJS team for the powerful backend framework
- MongoDB for the flexible database solution