import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/user.dart';
import '../services/auth_service.dart';
import '../screens/auth/login_screen.dart';
import '../screens/home_screen.dart';
import '../screens/cart_screen.dart';
import '../screens/orders_screen.dart';

class AppRouter {
  final AuthService _authService = AuthService();

  late final GoRouter router;

  AppRouter() {
    router = GoRouter(
      initialLocation: '/',
      redirect: (context, state) async {
        final isAuthenticated = await _authService.isAuthenticated();
        final isAuthRoute = state.matchedLocation.startsWith('/auth');

        if (!isAuthenticated && !isAuthRoute) {
          return '/auth/login';
        }

        if (isAuthenticated && isAuthRoute) {
          final user = await _authService.getCurrentUser();
          return _getHomeRouteForRole(user?.role ?? UserRole.customer);
        }

        return null;
      },
      routes: [
        // Auth routes
        GoRoute(
          path: '/auth/login',
          builder: (context, state) => LoginScreen(
            onLoginSuccess: (user) {
              context.go(_getHomeRouteForRole(user.role));
            },
          ),
        ),

        // Customer routes
        GoRoute(
          path: '/customer/home',
          builder: (context, state) => const HomeScreen(),
        ),
        GoRoute(
          path: '/customer/cart',
          builder: (context, state) => const CartScreen(),
        ),
        GoRoute(
          path: '/customer/orders',
          builder: (context, state) => const OrdersScreen(),
        ),

        // Merchant routes (placeholders for now)
        GoRoute(
          path: '/merchant/dashboard',
          builder: (context, state) => const Scaffold(
            body: Center(child: Text('Merchant Dashboard - Coming Soon')),
          ),
        ),

        // Rider routes (placeholders for now)
        GoRoute(
          path: '/rider/jobs',
          builder: (context, state) => const Scaffold(
            body: Center(child: Text('Rider Jobs - Coming Soon')),
          ),
        ),

        // Admin routes (placeholders for now)
        GoRoute(
          path: '/admin/dashboard',
          builder: (context, state) => const Scaffold(
            body: Center(child: Text('Admin Dashboard - Coming Soon')),
          ),
        ),

        // Default route
        GoRoute(
          path: '/',
          redirect: (context, state) async {
            final user = await _authService.getCurrentUser();
            if (user == null) {
              return '/auth/login';
            }
            return _getHomeRouteForRole(user.role);
          },
        ),
      ],
    );
  }

  String _getHomeRouteForRole(UserRole role) {
    switch (role) {
      case UserRole.customer:
        return '/customer/home';
      case UserRole.merchant:
        return '/merchant/dashboard';
      case UserRole.rider:
        return '/rider/jobs';
      case UserRole.admin:
        return '/admin/dashboard';
    }
  }
}
