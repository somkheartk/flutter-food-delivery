import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/food_item.dart';
import '../models/order.dart';

class ApiService {
  // Change this to your backend URL
  static const String baseUrl = 'http://localhost:3000/api';

  // Get all food items
  Future<List<FoodItem>> getFoodItems() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/foods'));
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => FoodItem.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load food items');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Get food items by category
  Future<List<FoodItem>> getFoodItemsByCategory(String category) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/foods/category/$category'),
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => FoodItem.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load food items');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Create order
  Future<Order> createOrder(Map<String, dynamic> orderData) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/orders'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(orderData),
      );
      
      if (response.statusCode == 201) {
        return Order.fromJson(json.decode(response.body));
      } else {
        throw Exception('Failed to create order');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Get orders
  Future<List<Order>> getOrders() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/orders'));
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => Order.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load orders');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}
