# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Flutter Mobile App                       │
│                    (Material Design UI)                      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Home Screen  │  │ Cart Screen  │  │  Food Card   │      │
│  │              │  │              │  │   Widget     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │            API Service (HTTP Client)              │       │
│  └──────────────────────────────────────────────────┘       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ REST API
                            │ (HTTP/JSON)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   NestJS Backend Server                      │
│                     (Port 3000)                              │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │Foods Module  │  │Orders Module │                         │
│  │              │  │              │                         │
│  │ Controller   │  │ Controller   │                         │
│  │ Service      │  │ Service      │                         │
│  │ Schema       │  │ Schema       │                         │
│  └──────────────┘  └──────────────┘                         │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Mongoose ODM (Object Data Modeling)       │       │
│  └──────────────────────────────────────────────────┘       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ MongoDB Protocol
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    MongoDB Database                          │
│                     (Port 27017)                             │
│                                                               │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │   Foods      │         │   Orders     │                  │
│  │  Collection  │         │  Collection  │                  │
│  └──────────────┘         └──────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (Mobile App)
- **Framework**: Flutter 3.x
- **Language**: Dart
- **UI Library**: Material Design (Material 3)
- **State Management**: Provider (optional, can be added)
- **HTTP Client**: http package
- **Local Storage**: shared_preferences

### Backend (API Server)
- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **API Style**: RESTful
- **Database ODM**: Mongoose
- **CORS**: Enabled for cross-origin requests

### Database
- **Database**: MongoDB 7.x
- **Type**: NoSQL Document Database
- **Collections**: Foods, Orders

## Data Flow

### 1. Browse Foods
```
User → Home Screen → API Service → GET /api/foods 
→ NestJS Foods Controller → Foods Service → MongoDB 
→ Response with Food List → Display in Grid
```

### 2. Add to Cart
```
User clicks "Add to Cart" → Food Item added to local cart state 
→ Cart counter updated → Navigation to Cart Screen available
```

### 3. Place Order
```
User enters delivery address → Click "Place Order" 
→ API Service → POST /api/orders with order data 
→ NestJS Orders Controller → Orders Service → MongoDB 
→ Order created → Success message → Navigate back to Home
```

### 4. Category Filter
```
User selects category → Filter applied locally to food list 
→ Grid view updated with filtered items
```

## Module Structure

### Flutter App (`flutter_app/`)
```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
│   ├── food_item.dart       # Food item model
│   └── order.dart           # Order model
├── screens/                 # UI screens
│   ├── home_screen.dart     # Main food browsing screen
│   └── cart_screen.dart     # Shopping cart screen
├── services/                # API and business logic
│   └── api_service.dart     # HTTP API client
└── widgets/                 # Reusable UI components
    └── food_card.dart       # Food item card widget
```

### Backend API (`backend/src/`)
```
src/
├── main.ts                  # Application entry point
├── app.module.ts            # Root module
├── foods/                   # Foods feature module
│   ├── food.schema.ts      # MongoDB schema
│   ├── foods.controller.ts # REST endpoints
│   ├── foods.service.ts    # Business logic
│   └── foods.module.ts     # Module definition
└── orders/                  # Orders feature module
    ├── order.schema.ts     # MongoDB schema
    ├── orders.controller.ts # REST endpoints
    ├── orders.service.ts   # Business logic
    └── orders.module.ts    # Module definition
```

## API Endpoints

### Foods
- `GET /api/foods` - Get all food items
- `GET /api/foods/:id` - Get specific food item
- `GET /api/foods/category/:category` - Get by category
- `POST /api/foods` - Create new food item
- `PUT /api/foods/:id` - Update food item
- `DELETE /api/foods/:id` - Delete food item
- `POST /api/foods/seed` - Seed sample data

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

## Database Schema

### Foods Collection
```typescript
{
  _id: ObjectId,
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

### Orders Collection
```typescript
{
  _id: ObjectId,
  items: [
    {
      foodId: String,
      foodName: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  deliveryAddress: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features

### Current Features
✅ Browse food items with category filters
✅ View food details (name, description, price, preparation time)
✅ Add items to shopping cart
✅ View cart with item quantities
✅ Calculate total amount
✅ Enter delivery address
✅ Place orders
✅ RESTful API backend
✅ MongoDB data persistence
✅ CORS enabled for mobile access
✅ Sample data seeding

### Future Enhancements
- 🔒 User authentication (JWT)
- 📸 Image upload for food items
- 🔍 Search functionality
- ⭐ Rating and reviews
- 💳 Payment integration
- 📍 Location-based delivery
- 🔔 Push notifications
- 📊 Order tracking
- 👤 User profiles
- 🎯 Favorites/wishlist
- 🏪 Multiple restaurant support
- 🚚 Real-time delivery tracking

## Design Patterns

### Frontend
- **Widget Composition**: Breaking UI into reusable widgets
- **Stateful/Stateless Widgets**: Proper state management
- **Service Pattern**: Separating API logic from UI

### Backend
- **Module Pattern**: Organizing code by features
- **Repository Pattern**: Data access abstraction (via Mongoose)
- **Controller-Service Pattern**: Separation of concerns
- **Dependency Injection**: NestJS built-in DI

## Security Considerations

### Current Implementation
- CORS enabled (should be restricted in production)
- Input validation (basic through TypeScript types)
- MongoDB connection with timeout settings

### Production Recommendations
- Add JWT authentication
- Implement rate limiting
- Add request validation (class-validator)
- Secure MongoDB connection (authentication)
- HTTPS/TLS encryption
- Environment-based configuration
- Input sanitization
- API versioning

## Performance Optimization

### Current
- Mongoose query optimization
- Indexed MongoDB collections (default _id)
- Efficient Flutter widget building

### Future Improvements
- Redis caching layer
- CDN for static assets
- Database indexing strategy
- Image optimization
- API response compression
- Pagination for large datasets
- Lazy loading in Flutter

## Deployment Architecture

### Development
```
Local Machine → Flutter App (localhost/emulator)
                       ↓
Local Machine → Backend (localhost:3000)
                       ↓
Local Machine → MongoDB (localhost:27017)
```

### Production
```
Mobile App Store → Flutter App (compiled)
                           ↓
Cloud Provider → Backend (containerized)
                           ↓
MongoDB Atlas → MongoDB (cloud database)
```

## Docker Deployment

The project includes Docker support:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 3000

The Flutter app connects to the backend API URL configured in the app.
