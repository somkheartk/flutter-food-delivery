import 'package:flutter/material.dart';
import 'router/app_router.dart';

void main() {
  runApp(const FoodDeliveryApp());
}

class FoodDeliveryApp extends StatefulWidget {
  const FoodDeliveryApp({super.key});

  @override
  State<FoodDeliveryApp> createState() => _FoodDeliveryAppState();
}

class _FoodDeliveryAppState extends State<FoodDeliveryApp> {
  late final AppRouter _appRouter;

  @override
  void initState() {
    super.initState();
    _appRouter = AppRouter();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Food Delivery - All-in-One',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.orange),
        useMaterial3: true,
      ),
      routerConfig: _appRouter.router,
      debugShowCheckedModeBanner: false,
    );
  }
}
