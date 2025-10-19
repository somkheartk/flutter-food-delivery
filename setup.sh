#!/bin/bash

# Food Delivery App - Development Setup Script

echo "🍔 Food Delivery App - Development Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 18.x"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if MongoDB is running
if ! command -v mongosh &> /dev/null && ! command -v mongo &> /dev/null; then
    echo "⚠️  MongoDB client not found. Please make sure MongoDB is installed."
else
    echo "✅ MongoDB client found"
fi

# Backend Setup
echo ""
echo "📦 Setting up backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

echo ""
echo "🔨 Building backend..."
npm run build

echo ""
echo "✅ Backend setup complete!"

# Flutter Setup (if Flutter is available)
cd ..
if command -v flutter &> /dev/null; then
    echo ""
    echo "📱 Setting up Flutter app..."
    cd flutter_app
    flutter pub get
    echo "✅ Flutter app setup complete!"
else
    echo ""
    echo "⚠️  Flutter not found. Please install Flutter to build the mobile app."
    echo "   Visit: https://docs.flutter.dev/get-started/install"
fi

cd ..

echo ""
echo "========================================"
echo "🎉 Setup Complete!"
echo ""
echo "To start the backend:"
echo "  cd backend"
echo "  npm run start:dev"
echo ""
echo "To seed sample data:"
echo "  curl -X POST http://localhost:3000/api/foods/seed"
echo ""
if command -v flutter &> /dev/null; then
    echo "To run the Flutter app:"
    echo "  cd flutter_app"
    echo "  flutter run"
    echo ""
fi
echo "For more details, see SETUP.md"
