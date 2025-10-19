# Implementation Guide - All-in-One Food Delivery System

## Quick Start

### Prerequisites

#### Backend
- Node.js 18 or higher
- MongoDB 7.x
- npm or yarn

#### Flutter
- Flutter SDK 3.x
- Dart SDK
- Android Studio / Xcode
- Android/iOS device or emulator

### Setup Steps

#### 1. Clone Repository
```bash
git clone https://github.com/somkheartk/flutter-food-delivery.git
cd flutter-food-delivery
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your-strong-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
```

**Start MongoDB:**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7

# Or install locally
mongod
```

**Start Backend:**
```bash
npm run start:dev
```

Backend will be running on `http://localhost:3000`

#### 3. Setup Flutter App

```bash
cd ../flutter_app

# Install dependencies
flutter pub get

# Run on device/emulator
flutter run
```

## Backend Implementation Details

### Module Structure

Each module follows NestJS best practices:

```
module/
├── dto/
│   ├── create-*.dto.ts
│   └── update-*.dto.ts
├── *.schema.ts
├── *.service.ts
├── *.controller.ts
└── *.module.ts
```

### Creating a New Module

Example: Creating a notifications module

```bash
cd backend/src
nest g module notifications
nest g service notifications
nest g controller notifications
```

### Authentication Flow

#### 1. User Registration

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "customer"
}
```

**Response:**
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    ...
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. User Login

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { ... },
  "accessToken": "...",
  "refreshToken": "..."
}
```

#### 3. Protected Routes

All protected routes require the Authorization header:

```http
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Role-Based Access Control

#### Using Guards

```typescript
@Controller('api/merchants')
export class MerchantsController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MERCHANT, UserRole.ADMIN)
  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantsService.create(createMerchantDto);
  }
}
```

### Database Operations

#### Create Document

```typescript
async create(dto: CreateDto): Promise<Model> {
  const model = new this.model(dto);
  return model.save();
}
```

#### Find with Filter

```typescript
async findAll(filter: any = {}): Promise<Model[]> {
  return this.model.find(filter).exec();
}
```

#### Geospatial Query (Nearby Merchants)

```typescript
async findNearby(
  longitude: number,
  latitude: number,
  maxDistance: number = 5000
): Promise<Merchant[]> {
  return this.merchantModel.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
    isActive: true,
  }).exec();
}
```

## Flutter Implementation Details

### State Management

#### Using Provider (Recommended)

1. Create a state class:

```dart
class AuthProvider extends ChangeNotifier {
  User? _user;
  final AuthService _authService = AuthService();

  User? get user => _user;
  bool get isAuthenticated => _user != null;

  Future<void> login(String email, String password) async {
    final response = await _authService.login(
      email: email,
      password: password,
    );
    _user = response.user;
    notifyListeners();
  }

  Future<void> logout() async {
    await _authService.logout();
    _user = null;
    notifyListeners();
  }
}
```

2. Wrap app with Provider:

```dart
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        // Add more providers here
      ],
      child: const FoodDeliveryApp(),
    ),
  );
}
```

3. Use in widgets:

```dart
Consumer<AuthProvider>(
  builder: (context, auth, child) {
    if (auth.isAuthenticated) {
      return HomeScreen();
    }
    return LoginScreen();
  },
)
```

### Navigation with go_router

#### Define Routes

```dart
final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      redirect: (context, state) {
        // Check authentication and redirect
      },
    ),
    GoRoute(
      path: '/customer/home',
      builder: (context, state) => const HomeScreen(),
    ),
  ],
);
```

#### Navigate

```dart
// Navigate to a route
context.go('/customer/home');

// Navigate with parameters
context.go('/customer/order/${orderId}');

// Go back
context.pop();
```

### API Calls

#### Basic HTTP Request

```dart
Future<List<Food>> getFoods() async {
  final token = await _authService.getAccessToken();
  
  final response = await http.get(
    Uri.parse('$baseUrl/foods'),
    headers: {
      'Authorization': 'Bearer $token',
    },
  );

  if (response.statusCode == 200) {
    final List<dynamic> data = jsonDecode(response.body);
    return data.map((json) => Food.fromJson(json)).toList();
  } else {
    throw Exception('Failed to load foods');
  }
}
```

#### Using Dio (Advanced)

```dart
class ApiService {
  late Dio _dio;

  ApiService() {
    _dio = Dio(
      BaseOptions(
        baseUrl: 'http://localhost:3000/api',
        connectTimeout: const Duration(seconds: 5),
        receiveTimeout: const Duration(seconds: 3),
      ),
    );

    // Add interceptor for authentication
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await getAccessToken();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (error, handler) {
          // Handle token refresh on 401
          return handler.next(error);
        },
      ),
    );
  }

  Future<Response> get(String path) => _dio.get(path);
  Future<Response> post(String path, dynamic data) => _dio.post(path, data: data);
}
```

### Secure Storage

#### Save Token

```dart
final storage = const FlutterSecureStorage();

await storage.write(
  key: 'access_token',
  value: accessToken,
);
```

#### Read Token

```dart
final token = await storage.read(key: 'access_token');
```

#### Delete Token

```dart
await storage.delete(key: 'access_token');
```

## Testing

### Backend Unit Tests

```typescript
describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, /* mocks */],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await service.register(dto);
    expect(result.user.email).toBe(dto.email);
  });
});
```

### Flutter Widget Tests

```dart
void main() {
  testWidgets('Login screen shows email and password fields', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: LoginScreen(onLoginSuccess: (_) {}),
      ),
    );

    expect(find.text('Email'), findsOneWidget);
    expect(find.text('Password'), findsOneWidget);
    expect(find.text('Sign In'), findsOneWidget);
  });
}
```

## Common Workflows

### 1. Customer Orders Food

**Steps:**
1. Customer logs in
2. Browse nearby merchants
3. Select merchant and view menu
4. Add items to cart
5. Apply promo code (optional)
6. Enter delivery address
7. Choose payment method
8. Place order

**Backend Flow:**
```
POST /api/auth/login
  → Save tokens

GET /api/merchants/nearby?longitude=X&latitude=Y
  → Display merchants

GET /api/foods?merchantId=X
  → Display menu

POST /api/orders
  {
    "customerId": "...",
    "merchantId": "...",
    "items": [...],
    "delivery": {
      "address": "...",
      ...
    },
    "payment": {
      "method": "cod"
    },
    "promoCode": "SAVE20"
  }
  → Order created
```

### 2. Merchant Manages Store

**Steps:**
1. Merchant logs in
2. View dashboard
3. Update store open/close status
4. Manage menu items
5. View incoming orders
6. Accept/reject orders
7. Update order status

**Backend Flow:**
```
POST /api/auth/login (role: merchant)
  → Save tokens

GET /api/merchants/owner/{userId}
  → Get merchant info

PATCH /api/merchants/{id}/open-status
  { "isOpen": true }
  → Update status

GET /api/orders?merchantId=X&status=pending
  → View pending orders

PUT /api/orders/{id}/status
  { "status": "accepted" }
  → Accept order
```

### 3. Rider Delivers Order

**Steps:**
1. Rider logs in
2. View available jobs
3. Accept delivery
4. Navigate to merchant
5. Pick up order
6. Navigate to customer
7. Complete delivery

**Backend Flow:**
```
POST /api/auth/login (role: rider)
  → Save tokens

GET /api/orders?status=ready_for_pickup
  → View available orders

PUT /api/orders/{id}/assign-rider
  {
    "riderId": "...",
    "riderName": "...",
    "riderPhone": "..."
  }
  → Assign rider

PUT /api/orders/{id}/status
  { "status": "picked_up" }
  → Update status

PUT /api/orders/{id}/status
  { "status": "delivered" }
  → Complete delivery
```

## Troubleshooting

### Backend Issues

#### MongoDB Connection Error
```
Error: MongooseServerSelectionError
```
**Solution:** Check if MongoDB is running:
```bash
# Check status
systemctl status mongod

# Or if using Docker
docker ps | grep mongo
```

#### JWT Error: Invalid Token
```
Error: UnauthorizedException: Invalid credentials
```
**Solution:** 
- Check if JWT_SECRET is set correctly
- Token might be expired - try logging in again
- Check Authorization header format: `Bearer <token>`

### Flutter Issues

#### Network Error: Connection Refused
```
SocketException: Connection refused
```
**Solution:**
- Android emulator: Use `10.0.2.2` instead of `localhost`
- iOS simulator: Use `localhost` or actual IP
- Physical device: Use computer's IP address

**Update baseUrl:**
```dart
// For Android emulator
static const String baseUrl = 'http://10.0.2.2:3000/api';

// For iOS simulator or physical device
static const String baseUrl = 'http://192.168.1.X:3000/api';
```

#### Dependency Conflicts
```
Because every version of flutter_test requires...
```
**Solution:**
```bash
flutter clean
flutter pub cache repair
flutter pub get
```

## Best Practices

### Backend

1. **Always validate input** using DTOs and class-validator
2. **Use transactions** for operations that modify multiple collections
3. **Implement pagination** for list endpoints
4. **Add proper indexes** for frequently queried fields
5. **Log errors** with proper context
6. **Use environment variables** for configuration
7. **Implement rate limiting** to prevent abuse

### Flutter

1. **Separate business logic** from UI components
2. **Use const constructors** for better performance
3. **Handle loading and error states** in UI
4. **Cache data** when appropriate
5. **Use meaningful variable names**
6. **Add proper error handling** in API calls
7. **Test on multiple devices** and screen sizes

## Performance Optimization

### Backend

1. **Database Indexing:**
```javascript
// Add compound indexes
collection.createIndex({ merchantId: 1, status: 1 });
```

2. **Query Optimization:**
```typescript
// Use select to limit fields
await this.model.find().select('name price').exec();
```

3. **Caching:**
```typescript
// Use Redis for frequently accessed data
await redis.set('key', value, 'EX', 3600);
```

### Flutter

1. **Lazy Loading:**
```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
);
```

2. **Image Optimization:**
```dart
Image.network(
  url,
  cacheWidth: 300,
  cacheHeight: 300,
);
```

3. **Debouncing:**
```dart
Timer? _debounce;

void onSearch(String query) {
  _debounce?.cancel();
  _debounce = Timer(const Duration(milliseconds: 500), () {
    performSearch(query);
  });
}
```

## Next Steps

1. **Implement remaining features:**
   - Socket.IO for real-time updates
   - Payment gateway integration
   - Google Maps integration
   - Push notifications

2. **Add testing:**
   - Unit tests
   - Integration tests
   - E2E tests

3. **Deploy:**
   - Set up CI/CD
   - Deploy backend to cloud
   - Publish Flutter app to stores

4. **Monitor:**
   - Set up logging and monitoring
   - Track user analytics
   - Monitor API performance

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Flutter Documentation](https://docs.flutter.dev/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [JWT.io](https://jwt.io/)
- [Material Design](https://m3.material.io/)

## Support

For issues and questions:
1. Check this guide
2. Review [ARCHITECTURE_V2.md](ARCHITECTURE_V2.md)
3. Search existing GitHub issues
4. Create a new issue with detailed description

---

**Last Updated:** October 19, 2024
**Version:** 2.0.0
