# Setup Instructions

## Quick Start Guide

### 1. Install Prerequisites

#### Install MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

#### Install Node.js

Download and install from [Node.js Official Website](https://nodejs.org/)

Verify installation:
```bash
node --version  # Should be >= 18.x
npm --version
```

#### Install Flutter

Follow the official guide: [Flutter Installation Guide](https://docs.flutter.dev/get-started/install)

Verify installation:
```bash
flutter doctor
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB (if not already running)
# macOS/Linux:
sudo systemctl start mongod
# or
mongod

# Start the backend server
npm run start:dev
```

The backend should now be running on `http://localhost:3000`

**Verify Backend:**
```bash
curl http://localhost:3000/api/foods
```

**Seed Sample Data:**
```bash
curl -X POST http://localhost:3000/api/foods/seed
```

### 3. Setup Flutter App

```bash
# Navigate to Flutter app directory
cd flutter_app

# Get dependencies
flutter pub get

# Run the app
flutter run
```

Select your target device when prompted:
- Android emulator
- iOS simulator (macOS only)
- Chrome (for web)

## Common Issues and Solutions

### Backend Issues

#### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
1. Make sure MongoDB is running:
   ```bash
   sudo systemctl status mongod
   ```
2. Start MongoDB if it's not running:
   ```bash
   sudo systemctl start mongod
   ```

#### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
1. Find the process using port 3000:
   ```bash
   lsof -i :3000
   ```
2. Kill the process:
   ```bash
   kill -9 <PID>
   ```
3. Or change the port in `backend/src/main.ts`

### Flutter Issues

#### Dependencies Error

**Error:** `Error: Cannot find module` or package resolution errors

**Solution:**
```bash
cd flutter_app
flutter clean
flutter pub get
```

#### Device Not Found

**Error:** `No devices found`

**Solution:**
1. For Android:
   - Start Android Studio and create an AVD (Android Virtual Device)
   - Or connect a physical Android device with USB debugging enabled
2. For iOS (macOS only):
   - Open Xcode and start an iOS simulator
3. For web:
   ```bash
   flutter run -d chrome
   ```

#### API Connection Error in App

**Solution:**
1. For Android emulator, use `10.0.2.2` instead of `localhost`:
   ```dart
   static const String baseUrl = 'http://10.0.2.2:3000/api';
   ```
2. For iOS simulator, `localhost` should work:
   ```dart
   static const String baseUrl = 'http://localhost:3000/api';
   ```
3. For physical devices, use your computer's IP address:
   ```dart
   static const String baseUrl = 'http://192.168.1.xxx:3000/api';
   ```

## Development Tips

### Hot Reload

- **Flutter:** Press `r` in the terminal to hot reload
- **Backend:** The app automatically restarts when files change (watch mode)

### Debugging

**Backend:**
```bash
npm run start:debug
```
Then attach a debugger in VS Code or Chrome DevTools

**Flutter:**
- Use VS Code or Android Studio debugger
- Press `p` in terminal to show performance overlay
- Press `w` to show widget inspector overlay

### Database Management

**View MongoDB data:**
```bash
mongosh
use food-delivery
db.foods.find().pretty()
db.orders.find().pretty()
```

**Clear database:**
```bash
mongosh
use food-delivery
db.foods.deleteMany({})
db.orders.deleteMany({})
```

## Production Deployment

### Backend Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Set environment variables:
   ```bash
   export MONGODB_URI="your-production-mongodb-uri"
   export PORT=3000
   ```

3. Run in production mode:
   ```bash
   npm run start:prod
   ```

**Recommended Hosting:**
- Heroku
- AWS (EC2, Elastic Beanstalk)
- Google Cloud Platform
- DigitalOcean
- Railway

### Flutter Deployment

**Android:**
```bash
flutter build apk --release
# or for app bundle
flutter build appbundle --release
```

**iOS:**
```bash
flutter build ios --release
```

**Web:**
```bash
flutter build web --release
```

## Next Steps

1. Add authentication (JWT)
2. Add image upload functionality
3. Implement push notifications
4. Add payment integration
5. Add order tracking
6. Implement rating system
7. Add user profiles
8. Deploy to production

## Getting Help

- [Flutter Documentation](https://docs.flutter.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- Create an issue on GitHub
