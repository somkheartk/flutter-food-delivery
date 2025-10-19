# Architecture v2.0 - All-in-One Food Delivery System

## Overview

This document describes the comprehensive architecture of the upgraded food delivery system, which supports multiple user roles (Customer, Merchant, Rider, Admin) in a single Flutter application with a complete backend API.

## System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│              Flutter Mobile App (All-in-One)                 │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │  Customer  │  │  Merchant  │  │   Rider    │  Admin    │
│  │   Module   │  │   Module   │  │   Module   │  (Web)    │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │      Role-Based Router (go_router)               │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │      Auth Service + Secure Storage               │       │
│  └──────────────────────────────────────────────────┘       │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ REST API (HTTPS + JWT)
                        │
┌───────────────────────▼──────────────────────────────────────┐
│                NestJS Backend API Server                     │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │  Users   │  │Merchants │  │  Foods   │   │
│  │  Module  │  │  Module  │  │  Module  │  │  Module  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Orders  │  │  Riders  │  │PromoCode │  │ Reviews  │   │
│  │  Module  │  │  Module  │  │  Module  │  │  Module  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │       Middleware (Helmet, CORS, Throttler)       │       │
│  └──────────────────────────────────────────────────┘       │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ MongoDB Protocol
                        │
┌───────────────────────▼──────────────────────────────────────┐
│                   MongoDB Database                           │
│                                                              │
│  ┌──────┐ ┌──────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │Users │ │Merchants │ │ Foods  │ │Orders  │ │ Riders │   │
│  └──────┘ └──────────┘ └────────┘ └────────┘ └────────┘   │
│                                                              │
│  ┌──────────┐ ┌─────────┐                                  │
│  │PromoCode │ │ Reviews │                                  │
│  └──────────┘ └─────────┘                                  │
└──────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Backend (NestJS)
- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (Access + Refresh Tokens)
- **Security**: Helmet, CORS, Rate Limiting (Throttler)
- **Validation**: class-validator, class-transformer

### Frontend (Flutter)
- **Framework**: Flutter 3.x
- **Language**: Dart
- **Routing**: go_router (role-based navigation)
- **Storage**: flutter_secure_storage (tokens), shared_preferences
- **HTTP Client**: http, dio
- **State Management**: Provider (ready for use)

### Database (MongoDB)
- **Type**: NoSQL Document Database
- **Version**: 7.x
- **Collections**: 7 main collections
- **Indexes**: Optimized for common queries

## Core Features

### 1. Authentication & Authorization

#### JWT-Based Authentication
- **Access Token**: 15 minutes validity
- **Refresh Token**: 7 days validity
- **Secure Storage**: Flutter secure storage for tokens

#### Role-Based Access Control (RBAC)
```typescript
enum UserRole {
  CUSTOMER = 'customer',
  MERCHANT = 'merchant',
  RIDER = 'rider',
  ADMIN = 'admin'
}
```

Each role has specific permissions and access to different parts of the app.

### 2. User Management

#### User Schema
```typescript
{
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  addresses: string[];
  isActive: boolean;
  refreshToken?: string;
}
```

#### Features
- User registration with role selection
- Email/password authentication
- Profile management
- Multiple delivery addresses

### 3. Merchant Management

#### Merchant Schema
```typescript
{
  ownerId: ObjectId;
  name: string;
  description?: string;
  address: string;
  location: GeoJSON Point; // [longitude, latitude]
  isOpen: boolean;
  openHours: string[];
  rating: number;
  totalReviews: number;
  imageUrl?: string;
  categories: string[];
  minimumOrder: number;
  deliveryFee: number;
  isActive: boolean;
}
```

#### Features
- Store registration and management
- Geospatial queries (find nearby merchants)
- Open/close status management
- Rating and review system
- Delivery fee configuration

### 4. Food/Menu Management

#### Food Schema
```typescript
{
  merchantId?: ObjectId;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  preparationTime: number;
  inStock: boolean;
  options: any[];
}
```

#### Features
- Menu item CRUD operations
- Stock management
- Category filtering
- Price and options configuration

### 5. Order Management

#### Order Schema
```typescript
{
  customerId: ObjectId;
  merchantId: ObjectId;
  riderId?: ObjectId;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  payment: PaymentInfo;
  delivery: DeliveryInfo;
  timeline: Timeline[];
  promoCode?: string;
}
```

#### Order Status Flow
```
PENDING → ACCEPTED → PREPARING → READY_FOR_PICKUP → 
PICKED_UP → ON_THE_WAY → DELIVERED

Special states: CANCELLED, FAILED
```

#### Features
- Complete order workflow
- Real-time status updates
- Payment integration ready
- Delivery tracking
- Order history

### 6. Rider Management

#### Rider Schema
```typescript
{
  name: string;
  phone: string;
  vehicleType: string; // motorcycle, bicycle, car
  status: string; // available, busy, offline
  currentLocation?: string;
}
```

#### Features
- Rider registration and management
- Availability status tracking
- Order assignment
- Delivery tracking

### 7. Promo Codes

#### PromoCode Schema
```typescript
{
  code: string;
  type: PromoCodeType; // percentage, fixed
  value: number;
  minSpend: number;
  maxDiscount?: number;
  startAt: Date;
  endAt: Date;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  applicableMerchants: string[];
}
```

#### Features
- Create and manage promo codes
- Validation with order amount
- Usage tracking
- Merchant-specific codes
- Expiry handling

### 8. Reviews & Ratings

#### Review Schema
```typescript
{
  orderId: ObjectId;
  userId: ObjectId;
  target: ReviewTarget; // merchant, rider
  targetId: ObjectId;
  rating: number; // 1-5
  comment?: string;
}
```

#### Features
- Rate merchants and riders
- Average rating calculation
- Review history
- Per-order reviews

## API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login
POST   /api/auth/logout        - Logout (requires auth)
GET    /api/auth/profile       - Get current user (requires auth)
POST   /api/auth/refresh       - Refresh access token
```

### Users
```
POST   /api/users              - Create user
GET    /api/users              - Get all users (supports role filter)
GET    /api/users/:id          - Get user by ID
PATCH  /api/users/:id          - Update user
DELETE /api/users/:id          - Delete user
```

### Merchants
```
POST   /api/merchants          - Create merchant (merchant/admin only)
GET    /api/merchants          - Get all merchants
GET    /api/merchants/nearby   - Find nearby merchants (geospatial)
GET    /api/merchants/owner/:id - Get merchant by owner
GET    /api/merchants/:id      - Get merchant by ID
PATCH  /api/merchants/:id      - Update merchant (merchant/admin only)
PATCH  /api/merchants/:id/open-status - Update open/close status
DELETE /api/merchants/:id      - Delete merchant (admin only)
```

### Foods
```
GET    /api/foods              - Get all foods
GET    /api/foods/:id          - Get food by ID
GET    /api/foods/category/:category - Get foods by category
POST   /api/foods              - Create food
PUT    /api/foods/:id          - Update food
DELETE /api/foods/:id          - Delete food
POST   /api/foods/seed         - Seed sample data
```

### Orders
```
GET    /api/orders             - Get all orders
GET    /api/orders/:id         - Get order by ID
POST   /api/orders             - Create order
PUT    /api/orders/:id/status  - Update order status
PUT    /api/orders/:id/assign-rider - Assign rider to order
DELETE /api/orders/:id         - Delete order
```

### Riders
```
GET    /api/riders             - Get all riders
GET    /api/riders/available   - Get available riders
GET    /api/riders/:id         - Get rider by ID
POST   /api/riders             - Create rider
PUT    /api/riders/:id         - Update rider
PUT    /api/riders/:id/status  - Update rider status
DELETE /api/riders/:id         - Delete rider
```

### Promo Codes
```
POST   /api/promo-codes        - Create promo code (admin only)
GET    /api/promo-codes        - Get all promo codes (admin only)
GET    /api/promo-codes/active - Get active promo codes
GET    /api/promo-codes/validate/:code - Validate promo code
DELETE /api/promo-codes/:id    - Delete promo code (admin only)
```

### Reviews
```
POST   /api/reviews            - Create review (requires auth)
GET    /api/reviews/target/:id - Get reviews for target (merchant/rider)
GET    /api/reviews/target/:id/average - Get average rating
GET    /api/reviews/order/:id  - Get reviews for order
GET    /api/reviews/user/:id   - Get user's reviews (requires auth)
DELETE /api/reviews/:id        - Delete review (requires auth)
```

## Flutter App Structure

```
lib/
├── main.dart                    # App entry point
├── router/
│   └── app_router.dart         # Role-based routing
├── models/
│   ├── user.dart               # User model with roles
│   ├── food_item.dart          # Food item model
│   ├── order.dart              # Order model
│   └── rider.dart              # Rider model
├── services/
│   ├── auth_service.dart       # Authentication service
│   └── api_service.dart        # API client
├── screens/
│   ├── auth/
│   │   ├── login_screen.dart   # Login screen
│   │   └── register_screen.dart # Register screen
│   ├── customer/
│   │   ├── home_screen.dart    # Browse food
│   │   ├── cart_screen.dart    # Shopping cart
│   │   └── orders_screen.dart  # Order history
│   ├── merchant/
│   │   └── dashboard.dart      # Merchant dashboard
│   └── rider/
│       └── jobs.dart           # Rider jobs
└── widgets/
    └── food_card.dart          # Reusable food card
```

## Security Features

### Backend Security
1. **Helmet**: HTTP security headers
2. **CORS**: Cross-Origin Resource Sharing configured
3. **Rate Limiting**: 100 requests per 60 seconds per IP
4. **JWT**: Secure token-based authentication
5. **Password Hashing**: bcrypt with salt rounds
6. **Input Validation**: class-validator on all DTOs
7. **HTTPS**: Required in production

### Flutter Security
1. **Secure Storage**: Tokens stored in FlutterSecureStorage
2. **HTTPS Only**: All API calls use HTTPS in production
3. **Token Refresh**: Automatic refresh token handling
4. **Route Guards**: Authentication checks on protected routes

## Environment Configuration

### Backend (.env)
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key
REDIS_URL=redis://localhost:6379
GOOGLE_MAPS_API_KEY=your-api-key
FCM_SERVER_KEY=your-fcm-key
PAYMENT_PROVIDER=omise
```

## Database Indexes

Optimized indexes for common queries:

```javascript
// Users
{ email: 1 }
{ role: 1 }

// Merchants
{ location: '2dsphere' }
{ ownerId: 1 }
{ isActive: 1, isOpen: 1 }

// Foods
{ merchantId: 1 }
{ category: 1 }
{ inStock: 1 }

// Orders
{ customerId: 1 }
{ merchantId: 1 }
{ riderId: 1 }
{ status: 1 }
{ createdAt: -1 }

// Riders
{ status: 1 }

// PromoCode
{ code: 1 }
{ isActive: 1 }
{ startAt: 1, endAt: 1 }

// Reviews
{ orderId: 1 }
{ userId: 1 }
{ targetId: 1, target: 1 }
{ rating: 1 }
```

## Role-Based Navigation Flow

### Customer
```
Login → /customer/home → Browse → Add to Cart → 
/customer/cart → Place Order → /customer/orders → Track Order
```

### Merchant
```
Login → /merchant/dashboard → Manage Store → 
Manage Menu → View Orders → Accept/Reject Orders
```

### Rider
```
Login → /rider/jobs → Available Jobs → 
Accept Job → Navigate → Update Status → Complete Delivery
```

### Admin
```
Login → /admin/dashboard → Manage Users → 
Manage Merchants → Manage Orders → Analytics
```

## Future Enhancements

### Planned Features
1. **Real-time Updates**: Socket.IO for live order tracking
2. **Push Notifications**: Firebase Cloud Messaging
3. **Payment Integration**: Omise/PromptPay integration
4. **Background Jobs**: Redis + BullMQ for queues
5. **Google Maps**: Location tracking and navigation
6. **Next.js Backoffice**: Admin web dashboard
7. **Analytics**: Sales reports and insights
8. **Multi-language**: i18n support

### Performance Optimizations
1. **Caching**: Redis for frequently accessed data
2. **CDN**: Static asset delivery
3. **Database Sharding**: For scale
4. **Load Balancing**: Multiple backend instances
5. **Image Optimization**: Compressed uploads

## Development Workflow

### Backend
```bash
cd backend
npm install
npm run start:dev    # Development with hot reload
npm run build        # Production build
npm run lint         # ESLint
```

### Flutter
```bash
cd flutter_app
flutter pub get
flutter run          # Run on device/emulator
flutter build apk    # Android build
flutter build ios    # iOS build
```

## Testing

### Backend Testing
```bash
npm run test         # Unit tests
npm run test:e2e     # End-to-end tests
npm run test:cov     # Coverage report
```

### Flutter Testing
```bash
flutter test         # Unit tests
flutter test --coverage  # Coverage report
```

## Deployment

### Backend
- Docker container
- Environment variables configured
- MongoDB connection secured
- HTTPS enabled
- Logs configured

### Flutter
- Release builds for Android/iOS
- App Store/Play Store submission
- API endpoint configured for production
- Analytics integrated

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](LICENSE) file.
