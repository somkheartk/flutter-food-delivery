class Order {
  final String id;
  final List<OrderItem> items;
  final double totalAmount;
  final String status;
  final DateTime createdAt;
  final String deliveryAddress;
  final String? riderId;
  final String? riderName;
  final String? riderPhone;

  Order({
    required this.id,
    required this.items,
    required this.totalAmount,
    required this.status,
    required this.createdAt,
    required this.deliveryAddress,
    this.riderId,
    this.riderName,
    this.riderPhone,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['_id'] ?? json['id'],
      items: (json['items'] as List)
          .map((item) => OrderItem.fromJson(item))
          .toList(),
      totalAmount: (json['totalAmount'] as num).toDouble(),
      status: json['status'],
      createdAt: DateTime.parse(json['createdAt']),
      deliveryAddress: json['deliveryAddress'],
      riderId: json['riderId'],
      riderName: json['riderName'],
      riderPhone: json['riderPhone'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'items': items.map((item) => item.toJson()).toList(),
      'totalAmount': totalAmount,
      'status': status,
      'createdAt': createdAt.toIso8601String(),
      'deliveryAddress': deliveryAddress,
      'riderId': riderId,
      'riderName': riderName,
      'riderPhone': riderPhone,
    };
  }
}

class OrderItem {
  final String foodId;
  final String foodName;
  final int quantity;
  final double price;

  OrderItem({
    required this.foodId,
    required this.foodName,
    required this.quantity,
    required this.price,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      foodId: json['foodId'],
      foodName: json['foodName'],
      quantity: json['quantity'],
      price: (json['price'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'foodId': foodId,
      'foodName': foodName,
      'quantity': quantity,
      'price': price,
    };
  }
}
