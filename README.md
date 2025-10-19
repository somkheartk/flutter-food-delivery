# Flutter Food Delivery App

A full-stack food delivery application built with Flutter for the frontend and NestJS with MongoDB for the backend.

## 🚀 Features

- **Flutter Mobile App** with Material Design (Material UI)
- Browse food items by categories
- Add items to cart
- Place orders with delivery address
- View order history and track order status
- Display assigned rider information for deliveries
- **NestJS Backend API** with RESTful endpoints
- **MongoDB Database** for data persistence
- Rider management system
- Order-to-rider assignment
- Real-time order management
- Responsive UI design

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