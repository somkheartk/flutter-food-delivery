# Backend API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API doesn't require authentication. In production, you should add JWT authentication.

## Endpoints

### Foods API

#### Get All Foods
```http
GET /api/foods
```

**Response:**
```json
[
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Pad Thai",
    "description": "Traditional Thai stir-fried rice noodles",
    "price": 120,
    "imageUrl": "https://via.placeholder.com/150",
    "category": "Main Course",
    "preparationTime": 20,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Food by ID
```http
GET /api/foods/:id
```

**Response:**
```json
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Pad Thai",
  "description": "Traditional Thai stir-fried rice noodles",
  "price": 120,
  "imageUrl": "https://via.placeholder.com/150",
  "category": "Main Course",
  "preparationTime": 20
}
```

#### Get Foods by Category
```http
GET /api/foods/category/:category
```

**Parameters:**
- `category` - Category name (e.g., "Main Course", "Dessert", "Beverage", "Appetizer")

**Response:** Same as Get All Foods

#### Create Food
```http
POST /api/foods
```

**Request Body:**
```json
{
  "name": "Pad Thai",
  "description": "Traditional Thai stir-fried rice noodles",
  "price": 120,
  "imageUrl": "https://via.placeholder.com/150",
  "category": "Main Course",
  "preparationTime": 20
}
```

**Response:** Created food object

#### Update Food
```http
PUT /api/foods/:id
```

**Request Body:**
```json
{
  "name": "Updated Pad Thai",
  "price": 130
}
```

**Response:** Updated food object

#### Delete Food
```http
DELETE /api/foods/:id
```

**Response:** Deleted food object

#### Seed Sample Data
```http
POST /api/foods/seed
```

**Response:**
```json
{
  "message": "Sample data seeded successfully"
}
```

### Orders API

#### Get All Orders
```http
GET /api/orders
```

**Response:**
```json
[
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "items": [
      {
        "foodId": "64a1b2c3d4e5f6g7h8i9j0k1",
        "foodName": "Pad Thai",
        "quantity": 2,
        "price": 120
      }
    ],
    "totalAmount": 240,
    "deliveryAddress": "123 Main St, Bangkok",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Order by ID
```http
GET /api/orders/:id
```

**Response:** Single order object

#### Create Order
```http
POST /api/orders
```

**Request Body:**
```json
{
  "items": [
    {
      "foodId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "foodName": "Pad Thai",
      "quantity": 2,
      "price": 120
    }
  ],
  "totalAmount": 240,
  "deliveryAddress": "123 Main St, Bangkok",
  "status": "pending"
}
```

**Response:** Created order object

#### Update Order Status
```http
PUT /api/orders/:id/status
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Status Options:**
- `pending` - Order received, waiting for confirmation
- `confirmed` - Order confirmed
- `preparing` - Food is being prepared
- `delivering` - Order is on the way
- `completed` - Order delivered successfully
- `cancelled` - Order cancelled

**Response:** Updated order object

#### Delete Order
```http
DELETE /api/orders/:id
```

**Response:** Deleted order object

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## CORS

The API has CORS enabled for all origins in development. In production, you should restrict this to your Flutter app's domain.

## Rate Limiting

Currently, there's no rate limiting. Consider adding rate limiting in production using packages like `@nestjs/throttler`.
