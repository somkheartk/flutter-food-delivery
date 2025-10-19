# Rider Delivery System Guide

This guide explains how to use the new rider delivery and order tracking features.

## Overview

The application now includes:
- **Rider Management**: Create and manage delivery riders
- **Order Tracking**: View all orders with their current status
- **Rider Assignment**: Assign riders to orders for delivery
- **Order History**: Users can view their order history with delivery details

## Backend API Usage

### 1. Managing Riders

#### Create a Rider
```bash
curl -X POST http://localhost:3000/api/riders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+66-123-456-789",
    "vehicleType": "motorcycle",
    "status": "available"
  }'
```

#### Get All Riders
```bash
curl http://localhost:3000/api/riders
```

#### Get Available Riders
```bash
curl http://localhost:3000/api/riders/available
```

#### Update Rider Status
```bash
curl -X PUT http://localhost:3000/api/riders/{riderId}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "busy"}'
```

### 2. Order Management

#### Create an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "foodId": "123",
        "foodName": "Pad Thai",
        "quantity": 2,
        "price": 120.0
      }
    ],
    "totalAmount": 240.0,
    "deliveryAddress": "123 Main St, Bangkok",
    "status": "pending"
  }'
```

#### Assign Rider to Order
```bash
curl -X PUT http://localhost:3000/api/orders/{orderId}/assign-rider \
  -H "Content-Type: application/json" \
  -d '{
    "riderId": "rider123",
    "riderName": "John Doe",
    "riderPhone": "+66-123-456-789"
  }'
```

When a rider is assigned to an order:
- The order status automatically changes to "confirmed"
- The rider information is stored with the order
- The order is ready for delivery

#### Get All Orders
```bash
curl http://localhost:3000/api/orders
```

#### Update Order Status
```bash
curl -X PUT http://localhost:3000/api/orders/{orderId}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "delivering"}'
```

## Flutter App Usage

### 1. Viewing Orders

Users can now view their order history from the home screen:

1. Tap the **receipt icon** (📄) in the app bar
2. The Orders Screen displays all orders with:
   - Order ID (last 6 characters)
   - Order status with color-coded indicators
   - Total amount
   - Creation date
   - Expandable details showing:
     - List of items ordered
     - Delivery address
     - Assigned rider information (if available)

### 2. Order Status Colors

- **Orange**: Pending - Order is waiting to be confirmed
- **Blue**: Confirmed - Order confirmed and rider assigned
- **Purple**: Preparing - Food is being prepared
- **Indigo**: Delivering - Rider is on the way
- **Green**: Completed - Order delivered successfully
- **Red**: Cancelled - Order was cancelled

### 3. Rider Information Display

When a rider is assigned to an order, the Orders Screen shows:
- Rider's name
- Rider's phone number
- Delivery icon indicator
- Blue background highlight

### 4. Order Workflow

1. **Customer places order** from Cart Screen
   - Status: `pending`
   
2. **System assigns rider** (via API)
   - Status changes to: `confirmed`
   - Rider info is added to order
   
3. **Restaurant prepares food**
   - Status: `preparing`
   
4. **Rider picks up and delivers**
   - Status: `delivering`
   
5. **Order completed**
   - Status: `completed`

## Implementation Details

### Backend Changes

#### New Files
- `backend/src/riders/rider.schema.ts` - Rider data model
- `backend/src/riders/riders.service.ts` - Rider business logic
- `backend/src/riders/riders.controller.ts` - Rider API endpoints
- `backend/src/riders/riders.module.ts` - Rider module definition

#### Modified Files
- `backend/src/orders/order.schema.ts` - Added rider fields
- `backend/src/orders/orders.service.ts` - Added assignRider method
- `backend/src/orders/orders.controller.ts` - Added assign-rider endpoint
- `backend/src/app.module.ts` - Imported RidersModule

### Frontend Changes

#### New Files
- `flutter_app/lib/models/rider.dart` - Rider data model
- `flutter_app/lib/screens/orders_screen.dart` - Order history UI

#### Modified Files
- `flutter_app/lib/models/order.dart` - Added rider fields
- `flutter_app/lib/services/api_service.dart` - Added rider API methods
- `flutter_app/lib/screens/home_screen.dart` - Added orders navigation

## Database Schema

### Rider Document
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  vehicleType: String, // "motorcycle", "bicycle", "car"
  status: String, // "available", "busy", "offline"
  currentLocation: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Document (Updated)
```javascript
{
  _id: ObjectId,
  items: Array,
  totalAmount: Number,
  deliveryAddress: String,
  status: String,
  riderId: String (optional),
  riderName: String (optional),
  riderPhone: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the Features

### 1. Setup

1. Start MongoDB:
   ```bash
   mongod
   ```

2. Start the backend:
   ```bash
   cd backend
   npm run start:dev
   ```

3. Run the Flutter app:
   ```bash
   cd flutter_app
   flutter run
   ```

### 2. Test Workflow

1. **Seed food data:**
   ```bash
   curl -X POST http://localhost:3000/api/foods/seed
   ```

2. **Create a rider:**
   ```bash
   curl -X POST http://localhost:3000/api/riders \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Rider",
       "phone": "555-1234",
       "vehicleType": "motorcycle",
       "status": "available"
     }'
   ```
   Save the returned `_id` as `RIDER_ID`.

3. **Place an order through the app:**
   - Browse food items
   - Add items to cart
   - Enter delivery address
   - Place order
   - Note the order ID shown in the success message

4. **Get the order ID:**
   ```bash
   curl http://localhost:3000/api/orders
   ```
   Save the first order's `_id` as `ORDER_ID`.

5. **Assign rider to order:**
   ```bash
   curl -X PUT http://localhost:3000/api/orders/{ORDER_ID}/assign-rider \
     -H "Content-Type: application/json" \
     -d '{
       "riderId": "{RIDER_ID}",
       "riderName": "Test Rider",
       "riderPhone": "555-1234"
     }'
   ```

6. **View order in app:**
   - Open Orders screen
   - Pull down to refresh
   - Expand the order to see rider information

## Future Enhancements

Possible improvements for the rider delivery system:

1. **Real-time Tracking**: Add GPS tracking for riders
2. **Push Notifications**: Notify users of order status changes
3. **Rider App**: Separate app for riders to manage deliveries
4. **Auto-Assignment**: Automatically assign available riders to new orders
5. **Rating System**: Allow users to rate riders
6. **Route Optimization**: Suggest optimal delivery routes
7. **Multiple Orders**: Allow riders to handle multiple deliveries
8. **Analytics**: Track rider performance and delivery times

## Troubleshooting

### Orders Screen is Empty
- Check if orders exist: `curl http://localhost:3000/api/orders`
- Verify backend is running on port 3000
- Check API URL in `api_service.dart`

### Rider Info Not Showing
- Ensure rider is assigned to order via API
- Pull down to refresh the Orders screen
- Check order details in database

### Backend Errors
- Verify MongoDB is running
- Check backend logs for errors
- Ensure all dependencies are installed: `npm install`

## API Reference

See the main [README.md](README.md) for complete API documentation.
