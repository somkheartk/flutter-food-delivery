# Screenshots and Visual Guide

## App Screenshots

### 1. Home Screen
**Location**: Main screen when app launches

**Features Shown**:
- App bar with "Food Delivery" title
- Shopping cart icon with item count badge
- Category filter chips (All, Main Course, Dessert, Beverage, Appetizer)
- Grid of food items with:
  - Food image placeholder
  - Food name
  - Description (truncated)
  - Price in Thai Baht (฿)
  - Add to cart button

**User Actions**:
- Select category to filter items
- Click cart icon to view cart
- Click add to cart button on any food item

### 2. Cart Screen
**Location**: Accessed by clicking cart icon from home screen

**Features Shown**:
- Back button to return to home
- List of cart items with:
  - Food image placeholder
  - Food name
  - Price and quantity
  - Total for that item
  - Delete button
- Delivery address input field
- Total amount display
- Place Order button

**User Actions**:
- Enter delivery address
- Remove items from cart
- Click Place Order to submit

### 3. Success States

**Features**:
- Snackbar showing "Item added to cart"
- Snackbar showing "Order placed successfully"
- Cart badge updates when items added
- Loading spinner while fetching data

## UI Components

### Food Card Widget
```
┌─────────────────────┐
│                     │
│   [Food Image]      │
│                     │
├─────────────────────┤
│ Food Name           │
│ Description text... │
│                     │
│ ฿120     [+🛒]      │
└─────────────────────┘
```

### Category Filters
```
[ All ] [ Main Course ] [ Dessert ] [ Beverage ] [ Appetizer ]
  ^                                     
 Active
```

### Cart Item
```
┌────────────────────────────────────┐
│ [IMG] Food Name              ฿240  │
│       ฿120 x 2                [🗑]  │
└────────────────────────────────────┘
```

## Color Scheme

**Primary Colors**:
- Primary: Orange (Material Design seed color)
- Accent: Orange shades
- Background: White
- Text: Dark gray / Black

**Status Colors**:
- Success: Green
- Error: Red
- Warning: Orange
- Info: Blue

## Material Design Components Used

1. **AppBar**: Top navigation bar
2. **Scaffold**: Page structure
3. **GridView**: Food items layout
4. **ListView**: Cart items list
5. **Card**: Food item containers
6. **FilterChip**: Category filters
7. **IconButton**: Action buttons
8. **TextField**: Delivery address input
9. **ElevatedButton**: Primary actions
10. **SnackBar**: Feedback messages
11. **CircularProgressIndicator**: Loading state
12. **Badge**: Cart item count

## Responsive Design

- Grid adjusts column count based on screen width
- Cards scale properly on different devices
- Text truncates with ellipsis when needed
- Buttons have proper touch targets (48dp minimum)

## Navigation Flow

```
┌──────────────┐
│ Home Screen  │
└──────┬───────┘
       │
       │ (Click cart icon)
       ↓
┌──────────────┐
│ Cart Screen  │
└──────┬───────┘
       │
       │ (Place order)
       ↓
┌──────────────┐
│ Success      │
│ (Navigate    │
│  back to     │
│  Home)       │
└──────────────┘
```

## Backend API Interaction

### Home Screen
```
App Start
    ↓
GET /api/foods
    ↓
Display food items
    ↓
User selects category
    ↓
Filter locally (no API call)
```

### Cart Screen
```
User enters address
    ↓
Click Place Order
    ↓
POST /api/orders
    ↓
Show success message
    ↓
Clear cart
    ↓
Navigate to Home
```

## Accessibility Features

- Semantic labels for screen readers
- Sufficient color contrast
- Touch targets meet minimum size
- Clear focus indicators
- Descriptive button labels

## Future UI Enhancements

1. Food item detail modal
2. Image gallery for foods
3. Search bar in app bar
4. User profile screen
5. Order history screen
6. Order tracking screen
7. Settings screen
8. Dark mode support
9. Animations and transitions
10. Pull-to-refresh

## Testing the UI

### Manual Testing Checklist

- [ ] App launches successfully
- [ ] Food items load and display
- [ ] Category filters work
- [ ] Add to cart updates badge
- [ ] Cart shows correct items
- [ ] Cart calculates total correctly
- [ ] Delete from cart works
- [ ] Order submission works
- [ ] Success messages appear
- [ ] Navigation works smoothly
- [ ] UI looks good on different screen sizes
- [ ] Loading states display properly
- [ ] Error states handled gracefully

## Screenshots Location

To add actual screenshots:
1. Run the app: `flutter run`
2. Take screenshots of each screen
3. Save to `docs/screenshots/` directory:
   - `home_screen.png`
   - `home_screen_with_categories.png`
   - `cart_screen.png`
   - `cart_screen_with_items.png`
   - `success_message.png`
4. Update this file with image references

## Creating Demo Video

To create a demo video:
1. Use screen recording while using the app
2. Show these flows:
   - App launch
   - Browsing foods
   - Filtering by category
   - Adding items to cart
   - Viewing cart
   - Placing order
   - Success confirmation
3. Keep it under 2 minutes
4. Upload to project or YouTube

## Design Resources

- Material Design 3 Guidelines: https://m3.material.io/
- Flutter Widgets: https://docs.flutter.dev/ui/widgets
- Color Tool: https://material.io/design/color/
- Icon Library: https://fonts.google.com/icons
