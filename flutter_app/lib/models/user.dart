class User {
  final String id;
  final String name;
  final String email;
  final String? phone;
  final UserRole role;
  final List<String> addresses;
  final bool isActive;

  User({
    required this.id,
    required this.name,
    required this.email,
    this.phone,
    required this.role,
    this.addresses = const [],
    this.isActive = true,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'],
      role: UserRole.fromString(json['role'] ?? 'customer'),
      addresses: (json['addresses'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      isActive: json['isActive'] ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'role': role.value,
      'addresses': addresses,
      'isActive': isActive,
    };
  }
}

enum UserRole {
  customer('customer'),
  merchant('merchant'),
  rider('rider'),
  admin('admin');

  final String value;
  const UserRole(this.value);

  static UserRole fromString(String value) {
    switch (value.toLowerCase()) {
      case 'merchant':
        return UserRole.merchant;
      case 'rider':
        return UserRole.rider;
      case 'admin':
        return UserRole.admin;
      default:
        return UserRole.customer;
    }
  }
}
