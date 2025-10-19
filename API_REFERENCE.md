# API Reference - Food Delivery System v2.0

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your-access-token>
```

## Response Format

### Success Response
```json
{
  "data": { ... },
  "status": 200
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

---

## Authentication Endpoints

### Register User

```http
POST /auth/register
```

**Request Body:**
```json
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
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "addresses": [],
    "isActive": true
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### Logout

```http
POST /auth/logout
Authorization: Bearer <token>
```

### Get Profile

```http
GET /auth/profile
Authorization: Bearer <token>
```

### Refresh Token

```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## User Endpoints

### Get All Users

```http
GET /users?role=customer
Authorization: Bearer <token>
```

**Query Parameters:**
- `role` (optional): Filter by role (customer, merchant, rider, admin)

### Get User by ID

```http
GET /users/:id
Authorization: Bearer <token>
```

### Update User

```http
PATCH /users/:id
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+9876543210",
  "addresses": ["123 Main St, City"]
}
```

### Delete User

```http
DELETE /users/:id
Authorization: Bearer <token>
```

---

## Merchant Endpoints

### Create Merchant

```http
POST /merchants
Authorization: Bearer <token>
Roles: merchant, admin
```

**Request Body:**
```json
{
  "ownerId": "507f1f77bcf86cd799439011",
  "name": "Thai Kitchen",
  "description": "Authentic Thai cuisine",
  "address": "123 Food Street, Bangkok",
  "longitude": 100.5018,
  "latitude": 13.7563,
  "openHours": ["09:00-22:00"],
  "categories": ["Thai", "Asian"],
  "minimumOrder": 50,
  "deliveryFee": 30
}
```

### Get All Merchants

```http
GET /merchants?isActive=true
```

**Query Parameters:**
- `isActive` (optional): Filter by active status

### Find Nearby Merchants

```http
GET /merchants/nearby?longitude=100.5018&latitude=13.7563&maxDistance=5000
```

**Query Parameters:**
- `longitude` (required): User's longitude
- `latitude` (required): User's latitude
- `maxDistance` (optional): Maximum distance in meters (default: 5000)

### Get Merchant by Owner

```http
GET /merchants/owner/:ownerId
```

### Update Merchant

```http
PATCH /merchants/:id
Authorization: Bearer <token>
Roles: merchant, admin
```

### Update Open Status

```http
PATCH /merchants/:id/open-status
Authorization: Bearer <token>
Roles: merchant, admin
```

**Request Body:**
```json
{
  "isOpen": true
}
```

---

## Food Endpoints

### Get All Foods

```http
GET /foods
```

### Get Food by Category

```http
GET /foods/category/:category
```

### Create Food

```http
POST /foods
```

**Request Body:**
```json
{
  "merchantId": "507f1f77bcf86cd799439011",
  "name": "Pad Thai",
  "description": "Traditional Thai noodle dish",
  "price": 120,
  "imageUrl": "https://example.com/image.jpg",
  "category": "Main Course",
  "preparationTime": 15,
  "inStock": true,
  "options": [
    {
      "name": "Spice Level",
      "values": ["Mild", "Medium", "Hot"]
    }
  ]
}
```

### Update Food

```http
PUT /foods/:id
```

### Seed Sample Data

```http
POST /foods/seed
```

---

## Order Endpoints

### Create Order

```http
POST /orders
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "customerId": "507f1f77bcf86cd799439011",
  "merchantId": "507f1f77bcf86cd799439012",
  "items": [
    {
      "foodId": "507f1f77bcf86cd799439013",
      "foodName": "Pad Thai",
      "quantity": 2,
      "price": 120
    }
  ],
  "subtotal": 240,
  "deliveryFee": 30,
  "discount": 20,
  "totalAmount": 250,
  "payment": {
    "method": "cod",
    "status": "pending"
  },
  "delivery": {
    "address": "123 Main St, Bangkok",
    "contactPhone": "+66123456789",
    "notes": "Please call when you arrive"
  },
  "promoCode": "SAVE20"
}
```

### Get Orders

```http
GET /orders
Authorization: Bearer <token>
```

### Update Order Status

```http
PUT /orders/:id/status
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "accepted"
}
```

**Order Status Values:**
- `pending`
- `accepted`
- `preparing`
- `ready_for_pickup`
- `picked_up`
- `on_the_way`
- `delivered`
- `cancelled`
- `failed`

### Assign Rider

```http
PUT /orders/:id/assign-rider
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "riderId": "507f1f77bcf86cd799439014",
  "riderName": "Mike Rider",
  "riderPhone": "+66987654321"
}
```

---

## Rider Endpoints

### Create Rider

```http
POST /riders
```

**Request Body:**
```json
{
  "name": "Mike Rider",
  "phone": "+66987654321",
  "vehicleType": "motorcycle",
  "status": "available",
  "currentLocation": "Bangkok, Thailand"
}
```

**Vehicle Types:**
- `motorcycle`
- `bicycle`
- `car`

**Status Values:**
- `available`
- `busy`
- `offline`

### Get Available Riders

```http
GET /riders/available
```

### Update Rider Status

```http
PUT /riders/:id/status
```

**Request Body:**
```json
{
  "status": "busy"
}
```

---

## Promo Code Endpoints

### Create Promo Code

```http
POST /promo-codes
Authorization: Bearer <token>
Roles: admin
```

**Request Body:**
```json
{
  "code": "SAVE20",
  "type": "percentage",
  "value": 20,
  "minSpend": 100,
  "maxDiscount": 50,
  "startAt": "2024-01-01T00:00:00Z",
  "endAt": "2024-12-31T23:59:59Z",
  "usageLimit": 1000,
  "description": "20% off on all orders",
  "applicableMerchants": []
}
```

**Promo Code Types:**
- `percentage`: Value is percentage (e.g., 20 for 20%)
- `fixed`: Value is fixed amount (e.g., 50 for ฿50 off)

### Get Active Promo Codes

```http
GET /promo-codes/active
```

### Validate Promo Code

```http
GET /promo-codes/validate/:code?orderAmount=200&merchantId=507f1f77bcf86cd799439012
Authorization: Bearer <token>
```

**Query Parameters:**
- `orderAmount` (required): Order amount to validate against
- `merchantId` (optional): Merchant ID for merchant-specific codes

---

## Review Endpoints

### Create Review

```http
POST /reviews
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderId": "507f1f77bcf86cd799439015",
  "userId": "507f1f77bcf86cd799439011",
  "target": "merchant",
  "targetId": "507f1f77bcf86cd799439012",
  "rating": 5,
  "comment": "Excellent food and service!"
}
```

**Target Types:**
- `merchant`: Review for merchant
- `rider`: Review for rider

**Rating:** 1-5 stars

### Get Reviews for Target

```http
GET /reviews/target/:targetId?type=merchant
```

### Get Average Rating

```http
GET /reviews/target/:targetId/average?type=merchant
```

**Response:**
```json
{
  "average": 4.5,
  "count": 120
}
```

### Get Reviews by Order

```http
GET /reviews/order/:orderId
```

### Get User's Reviews

```http
GET /reviews/user/:userId
Authorization: Bearer <token>
```

---

## Error Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate resource |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limiting

- **Limit:** 100 requests per minute per IP
- **Headers:**
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Timestamp when limit resets

---

## Pagination

For list endpoints, use query parameters:

```http
GET /orders?page=1&limit=20
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## Testing with cURL

### Register and Login

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "customer"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Order

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "customerId": "...",
    "merchantId": "...",
    "items": [...],
    "totalAmount": 250
  }'
```

---

## Postman Collection

Import the included `postman_collection.json` file into Postman for easier API testing.

---

**Last Updated:** October 19, 2024
**Version:** 2.0.0
