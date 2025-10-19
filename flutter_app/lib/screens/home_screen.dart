import 'package:flutter/material.dart';
import '../models/food_item.dart';
import '../services/api_service.dart';
import '../widgets/food_card.dart';
import 'cart_screen.dart';
import 'orders_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService _apiService = ApiService();
  List<FoodItem> _foodItems = [];
  List<FoodItem> _cartItems = [];
  bool _isLoading = true;
  String _selectedCategory = 'All';
  final List<String> _categories = ['All', 'Main Course', 'Dessert', 'Beverage', 'Appetizer'];

  @override
  void initState() {
    super.initState();
    _loadFoodItems();
  }

  Future<void> _loadFoodItems() async {
    setState(() => _isLoading = true);
    try {
      // For demo purposes, use sample data if API fails
      try {
        final items = await _apiService.getFoodItems();
        setState(() {
          _foodItems = items;
          _isLoading = false;
        });
      } catch (e) {
        // Use sample data for demo
        setState(() {
          _foodItems = _getSampleFoodItems();
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() => _isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error loading food items: $e')),
        );
      }
    }
  }

  List<FoodItem> _getSampleFoodItems() {
    return [
      FoodItem(
        id: '1',
        name: 'Pad Thai',
        description: 'Traditional Thai stir-fried rice noodles',
        price: 120.0,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Main Course',
        preparationTime: 20,
      ),
      FoodItem(
        id: '2',
        name: 'Tom Yum Soup',
        description: 'Spicy and sour Thai soup',
        price: 90.0,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Appetizer',
        preparationTime: 15,
      ),
      FoodItem(
        id: '3',
        name: 'Green Curry',
        description: 'Thai green curry with chicken',
        price: 150.0,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Main Course',
        preparationTime: 25,
      ),
      FoodItem(
        id: '4',
        name: 'Mango Sticky Rice',
        description: 'Sweet mango with sticky rice',
        price: 80.0,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Dessert',
        preparationTime: 10,
      ),
      FoodItem(
        id: '5',
        name: 'Thai Iced Tea',
        description: 'Sweet and creamy Thai tea',
        price: 50.0,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Beverage',
        preparationTime: 5,
      ),
    ];
  }

  List<FoodItem> get _filteredItems {
    if (_selectedCategory == 'All') {
      return _foodItems;
    }
    return _foodItems.where((item) => item.category == _selectedCategory).toList();
  }

  void _addToCart(FoodItem item) {
    setState(() => _cartItems.add(item));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${item.name} added to cart'),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Food Delivery'),
        actions: [
          IconButton(
            icon: const Icon(Icons.receipt_long),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const OrdersScreen(),
                ),
              );
            },
          ),
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.shopping_cart),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => CartScreen(cartItems: _cartItems),
                    ),
                  ).then((_) => setState(() {}));
                },
              ),
              if (_cartItems.isNotEmpty)
                Positioned(
                  right: 8,
                  top: 8,
                  child: Container(
                    padding: const EdgeInsets.all(2),
                    decoration: BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    constraints: const BoxConstraints(
                      minWidth: 16,
                      minHeight: 16,
                    ),
                    child: Text(
                      '${_cartItems.length}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
      body: Column(
        children: [
          // Category filter
          Container(
            height: 50,
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _categories.length,
              itemBuilder: (context, index) {
                final category = _categories[index];
                final isSelected = category == _selectedCategory;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: FilterChip(
                    label: Text(category),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() => _selectedCategory = category);
                    },
                  ),
                );
              },
            ),
          ),
          // Food items grid
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _filteredItems.isEmpty
                    ? const Center(child: Text('No food items available'))
                    : GridView.builder(
                        padding: const EdgeInsets.all(8),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.75,
                          crossAxisSpacing: 8,
                          mainAxisSpacing: 8,
                        ),
                        itemCount: _filteredItems.length,
                        itemBuilder: (context, index) {
                          return FoodCard(
                            foodItem: _filteredItems[index],
                            onAddToCart: _addToCart,
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}
