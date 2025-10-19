class Rider {
  final String id;
  final String name;
  final String phone;
  final String vehicleType;
  final String status;
  final String? currentLocation;

  Rider({
    required this.id,
    required this.name,
    required this.phone,
    required this.vehicleType,
    required this.status,
    this.currentLocation,
  });

  factory Rider.fromJson(Map<String, dynamic> json) {
    return Rider(
      id: json['_id'] ?? json['id'],
      name: json['name'],
      phone: json['phone'],
      vehicleType: json['vehicleType'],
      status: json['status'],
      currentLocation: json['currentLocation'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'phone': phone,
      'vehicleType': vehicleType,
      'status': status,
      'currentLocation': currentLocation,
    };
  }
}
