# Quick Start Guide

Get up and running with the Food Delivery App in minutes!

## ⚡ Prerequisites

Before you begin, make sure you have:

- ✅ Node.js (v18 or higher)
- ✅ MongoDB (v7 or higher)
- ✅ Flutter SDK (v3.0 or higher) - Optional, only if building mobile app

## 🚀 Quick Setup (5 minutes)

### Option 1: Using Docker (Recommended)

If you have Docker installed, this is the fastest way:

```bash
# Clone the repository
git clone https://github.com/somkheartk/flutter-food-delivery.git
cd flutter-food-delivery

# Start MongoDB and backend with Docker
docker-compose up -d

# Seed sample data
curl -X POST http://localhost:3000/api/foods/seed

# Done! Backend is running on http://localhost:3000
```

### Option 2: Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/somkheartk/flutter-food-delivery.git
cd flutter-food-delivery

# 2. Start MongoDB (in a separate terminal)
mongod

# 3. Setup and start backend
cd backend
npm install
npm run start:dev

# 4. Seed sample data (in another terminal)
curl -X POST http://localhost:3000/api/foods/seed

# Backend is now running on http://localhost:3000
```

## 📱 Running the Flutter App

### For Mobile (Android/iOS)

```bash
cd flutter_app
flutter pub get
flutter run
```

Select your device when prompted.

### For Web

```bash
cd flutter_app
flutter run -d chrome
```

### Important: Configure API URL

**For Android Emulator:**
Edit `flutter_app/lib/services/api_service.dart`:
```dart
static const String baseUrl = 'http://10.0.2.2:3000/api';
```

**For iOS Simulator:**
```dart
static const String baseUrl = 'http://localhost:3000/api';
```

**For Physical Device:**
Replace with your computer's IP:
```dart
static const String baseUrl = 'http://192.168.1.XXX:3000/api';
```

## 🧪 Test the API

### Method 1: Using curl

```bash
# Get all foods
curl http://localhost:3000/api/foods

# Get foods by category
curl http://localhost:3000/api/foods/category/Main%20Course

# Create an order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{
      "foodId": "xxx",
      "foodName": "Pad Thai",
      "quantity": 2,
      "price": 120
    }],
    "totalAmount": 240,
    "deliveryAddress": "123 Main St",
    "status": "pending"
  }'
```

### Method 2: Using Postman

1. Import `postman_collection.json` into Postman
2. Set `baseUrl` variable to `http://localhost:3000/api`
3. Test all endpoints!

### Method 3: Using Browser

Open your browser and visit:
- http://localhost:3000/api/foods
- http://localhost:3000/api/orders

## 📊 View Database

```bash
mongosh
use food-delivery
db.foods.find().pretty()
db.orders.find().pretty()
```

## 🎯 What's Next?

Now that everything is running:

1. **Browse Foods**: Open the Flutter app and see the food items
2. **Add to Cart**: Click the cart icon on any food item
3. **Place Order**: Go to cart, enter address, and place order
4. **Check Database**: View the order in MongoDB

## 🐛 Troubleshooting

### Backend won't start

- **Error**: `MongoDB connection failed`
  - **Fix**: Make sure MongoDB is running (`mongod` command)

- **Error**: `Port 3000 already in use`
  - **Fix**: Kill the process or change port in `backend/src/main.ts`

### Flutter app can't connect

- **Error**: `Failed to load food items`
  - **Fix**: Check the API URL in `flutter_app/lib/services/api_service.dart`
  - Make sure backend is running
  - For Android emulator, use `10.0.2.2` instead of `localhost`

### MongoDB issues

- **Error**: `mongod command not found`
  - **Fix**: Install MongoDB from https://www.mongodb.com/try/download/community

## 📚 Learn More

- [Full Setup Guide](SETUP.md)
- [API Documentation](backend/API_DOCS.md)
- [Architecture Overview](ARCHITECTURE.md)
- [Contributing Guide](CONTRIBUTING.md)

## 💬 Get Help

If you run into issues:
1. Check the [SETUP.md](SETUP.md) for detailed instructions
2. Search existing [GitHub Issues](https://github.com/somkheartk/flutter-food-delivery/issues)
3. Create a new issue if needed

## ✨ Features Available

After setup, you can:

- ✅ Browse food items with category filters
- ✅ Add items to cart
- ✅ View cart and totals
- ✅ Place orders with delivery address
- ✅ View all orders via API
- ✅ Manage food items via API

Enjoy your Food Delivery App! 🍔🚚
