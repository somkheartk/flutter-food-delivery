import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../models/user.dart';

class AuthService {
  static const String baseUrl = 'http://localhost:3000/api';
  final _storage = const FlutterSecureStorage();

  // Token keys
  static const String _accessTokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userKey = 'user';

  Future<AuthResponse> register({
    required String name,
    required String email,
    required String password,
    String? phone,
    UserRole? role,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': name,
          'email': email,
          'password': password,
          if (phone != null) 'phone': phone,
          if (role != null) 'role': role.value,
        }),
      );

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        await _saveTokens(data['accessToken'], data['refreshToken']);
        final user = User.fromJson(data['user']);
        await _saveUser(user);
        return AuthResponse(user: user, accessToken: data['accessToken']);
      } else {
        throw Exception(jsonDecode(response.body)['message'] ?? 'Registration failed');
      }
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  Future<AuthResponse> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        await _saveTokens(data['accessToken'], data['refreshToken']);
        final user = User.fromJson(data['user']);
        await _saveUser(user);
        return AuthResponse(user: user, accessToken: data['accessToken']);
      } else {
        throw Exception(jsonDecode(response.body)['message'] ?? 'Login failed');
      }
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<void> logout() async {
    try {
      final accessToken = await getAccessToken();
      if (accessToken != null) {
        await http.post(
          Uri.parse('$baseUrl/auth/logout'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $accessToken',
          },
        );
      }
    } catch (e) {
      // Ignore errors during logout
    } finally {
      await _clearTokens();
    }
  }

  Future<User?> getCurrentUser() async {
    final userJson = await _storage.read(key: _userKey);
    if (userJson == null) return null;
    return User.fromJson(jsonDecode(userJson));
  }

  Future<String?> getAccessToken() async {
    return await _storage.read(key: _accessTokenKey);
  }

  Future<bool> isAuthenticated() async {
    final token = await getAccessToken();
    return token != null;
  }

  Future<void> _saveTokens(String accessToken, String refreshToken) async {
    await _storage.write(key: _accessTokenKey, value: accessToken);
    await _storage.write(key: _refreshTokenKey, value: refreshToken);
  }

  Future<void> _saveUser(User user) async {
    await _storage.write(key: _userKey, value: jsonEncode(user.toJson()));
  }

  Future<void> _clearTokens() async {
    await _storage.delete(key: _accessTokenKey);
    await _storage.delete(key: _refreshTokenKey);
    await _storage.delete(key: _userKey);
  }
}

class AuthResponse {
  final User user;
  final String accessToken;

  AuthResponse({
    required this.user,
    required this.accessToken,
  });
}
