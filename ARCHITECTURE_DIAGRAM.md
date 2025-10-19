# System Architecture - Order & Rider Delivery

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Flutter Mobile App                        │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Home Screen  │  │ Cart Screen  │  │Orders Screen │         │
│  │              │  │              │  │              │         │
│  │ - Food List  │  │ - Cart Items │  │ - Order List │         │
│  │ - Categories │  │ - Address    │  │ - Status     │         │
│  │ - Add to Cart│  │ - Place Order│  │ - Rider Info │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                 │
│                            │                                     │
│                    ┌───────▼────────┐                           │
│                    │   API Service   │                           │
│                    │                 │                           │
│                    │ - HTTP Client   │                           │
│                    │ - JSON Parsing  │                           │
│                    └───────┬─────────┘                           │
└────────────────────────────┼───────────────────────────────────┘
                             │ REST API (HTTP/JSON)
                             │
┌────────────────────────────▼───────────────────────────────────┐
│                      NestJS Backend API                         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │Foods Module  │  │Orders Module │  │Riders Module │         │
│  │              │  │              │  │              │         │
│  │ Controller   │  │ Controller   │  │ Controller   │         │
│  │ Service      │  │ Service      │  │ Service      │         │
│  │ Schema       │  │ Schema       │  │ Schema       │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                 │
│                            │                                     │
│                    ┌───────▼────────┐                           │
│                    │   Mongoose ODM  │                           │
│                    └───────┬─────────┘                           │
└────────────────────────────┼───────────────────────────────────┘
                             │
                             │
┌────────────────────────────▼───────────────────────────────────┐
│                         MongoDB Database                        │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │Foods         │  │Orders        │  │Riders        │         │
│  │Collection    │  │Collection    │  │Collection    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## Order Workflow with Rider Delivery

```
┌─────────────┐
│  Customer   │
└──────┬──────┘
       │
       │ 1. Browse Foods
       ▼
┌─────────────────┐
│   Home Screen   │
└──────┬──────────┘
       │
       │ 2. Add to Cart
       ▼
┌─────────────────┐
│   Cart Screen   │
└──────┬──────────┘
       │
       │ 3. Enter Address & Place Order
       ▼
┌─────────────────────────────┐
│   POST /api/orders          │
│   Status: "pending"         │
└──────┬──────────────────────┘
       │
       │ 4. Order Created in DB
       ▼
┌─────────────────────────────┐
│   Admin/System              │
│   Assigns Available Rider   │
└──────┬──────────────────────┘
       │
       │ 5. PUT /api/orders/:id/assign-rider
       ▼
┌─────────────────────────────┐
│   Order Updated             │
│   - riderId added           │
│   - riderName added         │
│   - riderPhone added        │
│   - Status: "confirmed"     │
└──────┬──────────────────────┘
       │
       │ 6. Customer Views Order
       ▼
┌─────────────────────────────┐
│   Orders Screen             │
│   Shows:                    │
│   - Order Status            │
│   - Rider Information       │
│   - Delivery Address        │
└──────┬──────────────────────┘
       │
       │ 7. Status Updates
       ▼
┌─────────────────────────────┐
│   preparing → delivering    │
│        → completed          │
└─────────────────────────────┘
```

## Data Flow - Rider Assignment

```
┌──────────────────────────────────────────────────────────────────┐
│                         Admin/System                              │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            │ 1. Find Available Rider
                            ▼
                ┌────────────────────────┐
                │ GET /api/riders/       │
                │     available          │
                └──────────┬─────────────┘
                           │
                           │ 2. Returns List
                           ▼
                ┌────────────────────────┐
                │ [{                     │
                │   id: "rider123",      │
                │   name: "John Doe",    │
                │   phone: "+66-xxx",    │
                │   status: "available"  │
                │ }]                     │
                └──────────┬─────────────┘
                           │
                           │ 3. Select Rider & Assign
                           ▼
    ┌────────────────────────────────────────────────┐
    │ PUT /api/orders/order456/assign-rider          │
    │ Body: {                                        │
    │   riderId: "rider123",                         │
    │   riderName: "John Doe",                       │
    │   riderPhone: "+66-xxx"                        │
    │ }                                              │
    └──────────┬─────────────────────────────────────┘
               │
               │ 4. Update Order & Rider Status
               ▼
    ┌─────────────────────┐    ┌─────────────────────┐
    │ Order Updated:      │    │ Rider Updated:      │
    │ - riderId           │    │ status: "busy"      │
    │ - riderName         │    │                     │
    │ - riderPhone        │    │                     │
    │ - status: "confirmed"│   │                     │
    └─────────────────────┘    └─────────────────────┘
```

## UI Screen Flow

```
┌────────────────────────────────────────────────────────────┐
│                      Home Screen                           │
│  ╔════════════════════════════════════════════════════╗   │
│  ║  Food Delivery              📄 🛒(3)              ║   │
│  ╚════════════════════════════════════════════════════╝   │
│                                                            │
│  [ All ] [ Main Course ] [ Dessert ] [ Beverage ]        │
│                                                            │
│  ┌──────────┐  ┌──────────┐                              │
│  │  🍜       │  │  🍛       │                              │
│  │ Pad Thai │  │  Green    │                              │
│  │ ฿120.00  │  │  Curry    │                              │
│  │ [Add +]  │  │  ฿150.00  │                              │
│  └──────────┘  │  [Add +]  │                              │
│                └──────────┘                               │
└────────────────┬───────────────────────────────────────────┘
                 │ Click 📄 (Receipt Icon)
                 ▼
┌────────────────────────────────────────────────────────────┐
│                    Orders Screen                           │
│  ╔════════════════════════════════════════════════════╗   │
│  ║  ← My Orders                          🔄           ║   │
│  ╚════════════════════════════════════════════════════╝   │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 🔵 Order #j0k1ab                     2h ago        │  │
│  │ Status: CONFIRMED                                  │  │
│  │ Total: ฿240.00                                     │  │
│  │                                                    ▼│  │
│  │ ┌──────────────────────────────────────────────┐  │  │
│  │ │ Order Items:                                 │  │  │
│  │ │ 2x Pad Thai                      ฿240.00    │  │  │
│  │ │                                              │  │  │
│  │ │ 📍 123 Main St, Bangkok                     │  │  │
│  │ │                                              │  │  │
│  │ │ ┌──────────────────────────────────────┐    │  │  │
│  │ │ │ 🏍️ Delivery Rider                   │    │  │  │
│  │ │ │ John Doe                            │    │  │  │
│  │ │ │ +66-123-456-789                     │    │  │  │
│  │ │ └──────────────────────────────────────┘    │  │  │
│  │ └──────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 🟢 Order #abc123                     Yesterday     │  │
│  │ Status: COMPLETED                                  │  │
│  │ Total: ฿120.00                                     │  │
│  └────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

## API Endpoint Mapping

```
┌────────────────────────────────────────────────────────────┐
│                     API Endpoints                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Foods Module                                              │
│  ├─ GET    /api/foods                                     │
│  ├─ GET    /api/foods/:id                                 │
│  ├─ GET    /api/foods/category/:category                  │
│  ├─ POST   /api/foods                                     │
│  ├─ PUT    /api/foods/:id                                 │
│  ├─ DELETE /api/foods/:id                                 │
│  └─ POST   /api/foods/seed                                │
│                                                            │
│  Orders Module                                             │
│  ├─ GET    /api/orders                                    │
│  ├─ GET    /api/orders/:id                                │
│  ├─ POST   /api/orders                                    │
│  ├─ PUT    /api/orders/:id/status                         │
│  ├─ PUT    /api/orders/:id/assign-rider      ⭐ NEW       │
│  └─ DELETE /api/orders/:id                                │
│                                                            │
│  Riders Module                                ⭐ NEW       │
│  ├─ GET    /api/riders                                    │
│  ├─ GET    /api/riders/available                          │
│  ├─ GET    /api/riders/:id                                │
│  ├─ POST   /api/riders                                    │
│  ├─ PUT    /api/riders/:id                                │
│  ├─ PUT    /api/riders/:id/status                         │
│  └─ DELETE /api/riders/:id                                │
└────────────────────────────────────────────────────────────┘
```

## Database Collections

```
┌──────────────────────────────────────────────────────────┐
│                    MongoDB Collections                    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  foods                                                   │
│  ┌────────────────────────────────────────────────┐    │
│  │ {                                              │    │
│  │   _id: ObjectId,                               │    │
│  │   name: "Pad Thai",                            │    │
│  │   description: "...",                          │    │
│  │   price: 120,                                  │    │
│  │   imageUrl: "...",                             │    │
│  │   category: "Main Course",                     │    │
│  │   preparationTime: 20,                         │    │
│  │   createdAt: ISODate,                          │    │
│  │   updatedAt: ISODate                           │    │
│  │ }                                              │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  orders                                                  │
│  ┌────────────────────────────────────────────────┐    │
│  │ {                                              │    │
│  │   _id: ObjectId,                               │    │
│  │   items: [...],                                │    │
│  │   totalAmount: 240,                            │    │
│  │   deliveryAddress: "123 Main St",              │    │
│  │   status: "confirmed",                         │    │
│  │   riderId: "rider123",          ⭐ NEW         │    │
│  │   riderName: "John Doe",        ⭐ NEW         │    │
│  │   riderPhone: "+66-xxx",        ⭐ NEW         │    │
│  │   createdAt: ISODate,                          │    │
│  │   updatedAt: ISODate                           │    │
│  │ }                                              │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  riders                                  ⭐ NEW          │
│  ┌────────────────────────────────────────────────┐    │
│  │ {                                              │    │
│  │   _id: ObjectId,                               │    │
│  │   name: "John Doe",                            │    │
│  │   phone: "+66-123-456-789",                    │    │
│  │   vehicleType: "motorcycle",                   │    │
│  │   status: "available",                         │    │
│  │   currentLocation: "Bangkok",                  │    │
│  │   createdAt: ISODate,                          │    │
│  │   updatedAt: ISODate                           │    │
│  │ }                                              │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

## Status Lifecycle

```
Order Status Flow:
──────────────────

pending → confirmed → preparing → delivering → completed
   │                                              ↑
   │                                              │
   └─────────────────► cancelled ◄────────────────┘

Rider Status Flow:
──────────────────

available → busy → available
   │          ↓
   └────── offline


Assignment Flow:
────────────────

1. Order created (status: pending)
2. Rider assigned (order status: confirmed, rider status: busy)
3. Food prepared (order status: preparing)
4. Rider delivers (order status: delivering)
5. Delivered (order status: completed, rider status: available)
```

## Security & Best Practices

```
┌────────────────────────────────────────────────────────┐
│  Applied Best Practices                                │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ✅ Type Safety                                        │
│     - TypeScript in backend                           │
│     - Dart in frontend                                │
│                                                        │
│  ✅ Error Handling                                     │
│     - Try-catch blocks                                │
│     - Proper error messages                           │
│     - User-friendly notifications                     │
│                                                        │
│  ✅ Code Organization                                  │
│     - Modular architecture                            │
│     - Separation of concerns                          │
│     - Clear naming conventions                        │
│                                                        │
│  ✅ API Design                                         │
│     - RESTful principles                              │
│     - Consistent endpoints                            │
│     - Proper HTTP methods                             │
│                                                        │
│  ✅ Data Validation                                    │
│     - Schema validation                               │
│     - Required fields                                 │
│     - Type checking                                   │
│                                                        │
│  ✅ Documentation                                      │
│     - README                                          │
│     - API documentation                               │
│     - Code comments                                   │
│     - Usage guides                                    │
└────────────────────────────────────────────────────────┘
```

## Deployment Considerations

```
Development:
├─ MongoDB: localhost:27017
├─ Backend: localhost:3000
└─ Flutter: emulator/device

Production (Recommended):
├─ MongoDB: MongoDB Atlas (cloud)
├─ Backend: Heroku/AWS/GCP/Azure
└─ Flutter: iOS App Store / Google Play Store

Environment Variables:
├─ MONGODB_URI
├─ PORT
├─ API_BASE_URL (in Flutter)
└─ CORS_ORIGIN
```
