# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-19

### Added
- Initial release of Food Delivery App
- Flutter mobile application with Material Design
  - Home screen with food browsing
  - Cart screen for order management
  - Food card widget for displaying items
  - Category filtering system
  - Sample data fallback for demo
- NestJS backend API
  - Foods module with CRUD operations
  - Orders module with order management
  - MongoDB integration using Mongoose
  - CORS enabled for mobile app access
  - Sample data seeding endpoint
- MongoDB database schema
  - Foods collection
  - Orders collection
  - Timestamps for all documents
- Comprehensive documentation
  - README with project overview
  - SETUP guide for development
  - API documentation
  - Architecture diagram
  - Contributing guidelines
- Docker support
  - docker-compose.yml for easy setup
  - Dockerfile for backend
- Development tools
  - Setup script for quick start
  - Postman collection for API testing
  - TypeScript configuration
  - Flutter linting rules
- Project structure
  - Organized Flutter app with models, screens, services, widgets
  - Modular NestJS backend with feature modules
  - Clear separation of concerns

### Features
- Browse food items by category
- Add items to shopping cart
- View cart with item quantities
- Calculate order total
- Enter delivery address
- Place orders via API
- RESTful API endpoints
- MongoDB data persistence
- Material Design UI

### Technical Stack
- Frontend: Flutter 3.x with Dart
- Backend: NestJS 10.x with TypeScript
- Database: MongoDB 7.x
- HTTP Client: http package for Flutter
- ODM: Mongoose for MongoDB

## [Unreleased]

### Planned Features
- User authentication system
- Image upload for food items
- Search functionality
- Rating and review system
- Payment integration
- Real-time order tracking
- Push notifications
- User profiles
- Multiple restaurant support
- Admin dashboard

---

[1.0.0]: https://github.com/somkheartk/flutter-food-delivery/releases/tag/v1.0.0
