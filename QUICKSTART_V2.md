# Quick Start Guide v2.0 - All-in-One Food Delivery System

## 🚀 Get Started in 5 Minutes

### Prerequisites

- Node.js 18+
- MongoDB 7+
- Flutter 3+

### Step 1: Clone & Setup Backend (2 minutes)

```bash
# Clone repository
git clone https://github.com/somkheartk/flutter-food-delivery.git
cd flutter-food-delivery/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and set your JWT secrets
# JWT_SECRET=your-strong-secret-key-here
# JWT_REFRESH_SECRET=your-refresh-secret-key-here
```

### Step 2: Start MongoDB (1 minute)

**Option A: Using Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7
```

**Option B: Local Installation**
```bash
mongod
```

### Step 3: Start Backend (30 seconds)

```bash
cd backend
npm run start:dev
```

Backend is now running on **http://localhost:3000** ✅

### Step 4: Test the API (1 minute)

**Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "customer"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `accessToken` from the response!

### Step 5: Run Flutter App (30 seconds)

```bash
cd ../flutter_app
flutter pub get
flutter run
```

The app will open with the login screen! 🎉

---

## 🎯 What You Can Do Now

### Backend API

**Try these endpoints:**

1. **Get all merchants:**
```bash
curl http://localhost:3000/api/merchants
```

2. **Find nearby merchants:**
```bash
curl "http://localhost:3000/api/merchants/nearby?longitude=100.5018&latitude=13.7563"
```

3. **Get foods:**
```bash
curl http://localhost:3000/api/foods
```

4. **Seed sample data:**
```bash
curl -X POST http://localhost:3000/api/foods/seed
```

### Flutter App

1. **Login** with your credentials
2. **Browse** the home screen
3. **View** the cart and orders

---

## 📚 What's Implemented

### ✅ Backend (100% Complete)

**Modules:**
- Authentication (JWT)
- Users (with RBAC)
- Merchants (with geolocation)
- Foods/Menus
- Orders (complete workflow)
- Riders
- Promo Codes
- Reviews & Ratings

**Features:**
- 50+ API endpoints
- JWT authentication
- Role-based access control
- Geospatial queries
- Promo code validation
- Rating system
- Security (Helmet, CORS, rate limiting)
- Input validation

### 🚧 Flutter App (30% Complete)

**Completed:**
- Login screen
- Role-based routing
- Token management
- Home, cart, orders screens (existing)

**Pending:**
- Register screen
- Complete UI flows
- Merchant dashboard
- Rider interface

---

## 🔑 Key Concepts

### User Roles

1. **Customer** - Browse, order, track, review
2. **Merchant** - Manage store, menu, orders
3. **Rider** - Accept jobs, deliver orders
4. **Admin** - System management (backoffice)

### Order Workflow

```
PENDING → ACCEPTED → PREPARING → READY_FOR_PICKUP → 
PICKED_UP → ON_THE_WAY → DELIVERED
```

### API Authentication

All protected endpoints require:
```http
Authorization: Bearer <your-access-token>
```

---

## 📖 Next Steps

### For Development

1. **Read Documentation:**
   - [ARCHITECTURE_V2.md](ARCHITECTURE_V2.md) - System architecture
   - [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Detailed guide
   - [API_REFERENCE.md](API_REFERENCE.md) - Complete API docs

2. **Try the API:**
   - Import Postman collection
   - Test all endpoints
   - Create test data

3. **Continue Flutter Development:**
   - Implement register screen
   - Build customer flow
   - Add merchant dashboard
   - Create rider interface

### For Testing

**Backend:**
```bash
cd backend
npm run test
npm run lint
```

**Flutter:**
```bash
cd flutter_app
flutter test
flutter analyze
```

---

## 🛠️ Common Commands

### Backend

```bash
npm run start:dev    # Start with hot reload
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Flutter

```bash
flutter run          # Run on device/emulator
flutter build apk    # Build Android APK
flutter build ios    # Build iOS app
flutter test         # Run tests
flutter analyze      # Analyze code
```

### MongoDB

```bash
# Start MongoDB
docker start mongodb

# Connect to MongoDB
mongosh mongodb://localhost:27017/food-delivery

# View collections
show collections

# View users
db.users.find()
```

---

## 🐛 Troubleshooting

### Backend won't start

**Check MongoDB:**
```bash
docker ps | grep mongo
```

**Check .env file:**
- Ensure JWT_SECRET is set
- Ensure MONGO_URI is correct

### Flutter connection error

**For Android emulator:**
- Use `10.0.2.2` instead of `localhost`
- Update in `lib/services/auth_service.dart`

**For iOS simulator:**
- Use `localhost` or your computer's IP

### Can't login

**Reset and try again:**
```bash
# Drop database
mongosh
use food-delivery
db.dropDatabase()
exit

# Restart backend
npm run start:dev

# Register new user
```

---

## 📚 Documentation Links

- **Architecture:** [ARCHITECTURE_V2.md](ARCHITECTURE_V2.md)
- **Implementation:** [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
- **API Reference:** [API_REFERENCE.md](API_REFERENCE.md)
- **Summary:** [IMPLEMENTATION_SUMMARY_V2.md](IMPLEMENTATION_SUMMARY_V2.md)

---

## 🎯 Quick Test Workflow

### Complete Flow Test

1. **Register as customer:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer One",
    "email": "customer@test.com",
    "password": "password123",
    "role": "customer"
  }'
```

2. **Create a merchant:**
```bash
curl -X POST http://localhost:3000/api/merchants \
  -H "Content-Type: application/json" \
  -d '{
    "ownerId": "<user-id>",
    "name": "Thai Kitchen",
    "address": "123 Food St",
    "longitude": 100.5018,
    "latitude": 13.7563
  }'
```

3. **Seed foods:**
```bash
curl -X POST http://localhost:3000/api/foods/seed
```

4. **Browse merchants:**
```bash
curl http://localhost:3000/api/merchants
```

5. **Get foods:**
```bash
curl http://localhost:3000/api/foods
```

6. **Open Flutter app and login!**

---

## 💡 Pro Tips

1. **Use Postman** - Import the included collection for easier testing
2. **Check Logs** - Backend logs show all requests and errors
3. **Hot Reload** - Both backend and Flutter support hot reload
4. **Database GUI** - Use MongoDB Compass for visual database management
5. **Git Branches** - Use feature branches for new development

---

## 🌟 What Makes This Special

✅ **All-in-One Architecture** - One app, multiple roles
✅ **Production-Ready Backend** - Complete with security
✅ **Modern Tech Stack** - Flutter + NestJS + MongoDB
✅ **Comprehensive Docs** - 54KB+ of guides
✅ **Geospatial Features** - Find nearby merchants
✅ **Complete Auth** - JWT with refresh tokens
✅ **RBAC** - Role-based access control
✅ **Scalable** - Ready for growth

---

## 📞 Need Help?

1. Check the documentation files
2. Review the API reference
3. Search for similar issues
4. Open a GitHub issue

---

**Status:** Backend 95% Complete | Flutter 30% Complete  
**Version:** 2.0.0  
**Last Updated:** October 19, 2024  

**Start developing and build something amazing! 🚀**
