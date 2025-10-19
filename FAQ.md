# Frequently Asked Questions (FAQ)

## General Questions

### Q: What is this project?
**A:** This is a full-stack food delivery application built with Flutter for the mobile frontend and NestJS with MongoDB for the backend. It demonstrates modern app development practices with a complete working system.

### Q: Is this a production-ready application?
**A:** This is currently at v1.0.0 with core features implemented. For production use, you should add authentication, payment integration, and enhanced security features. See the [ROADMAP.md](ROADMAP.md) for planned enhancements.

### Q: Can I use this for my business?
**A:** Yes! This project is MIT licensed, which means you can use, modify, and distribute it freely. However, please add necessary production features like authentication and payment processing first.

### Q: Which platforms are supported?
**A:** The Flutter app supports Android, iOS, and Web. The backend API can run on any platform that supports Node.js.

## Technical Questions

### Q: Why Flutter instead of React Native or native development?
**A:** Flutter offers:
- Single codebase for multiple platforms
- High performance with compiled code
- Beautiful Material Design components out of the box
- Strong typing with Dart
- Hot reload for faster development

### Q: Why NestJS instead of Express or other frameworks?
**A:** NestJS provides:
- TypeScript support out of the box
- Excellent structure and organization
- Built-in dependency injection
- Easy testing
- Great documentation
- Similar to Angular for familiarity

### Q: Why MongoDB instead of PostgreSQL or MySQL?
**A:** MongoDB was chosen because:
- Flexible schema for rapid development
- JSON-like documents match API responses
- Easy to scale horizontally
- Good for prototype and MVP development
- You can easily switch to SQL if needed

### Q: Can I use a different database?
**A:** Yes! NestJS supports multiple databases through TypeORM or other ORMs. You would need to:
1. Update dependencies in `package.json`
2. Replace Mongoose with your preferred ORM
3. Update schemas to work with your database
4. Adjust the connection in `app.module.ts`

## Setup Questions

### Q: I get "MongoDB connection failed" error
**A:** Make sure:
1. MongoDB is installed and running (`mongod` command)
2. MongoDB is listening on port 27017
3. The connection string in `backend/src/app.module.ts` is correct
4. There are no firewall rules blocking the connection

### Q: Backend won't start - "Port 3000 already in use"
**A:** 
1. Find the process: `lsof -i :3000` (Mac/Linux) or `netstat -ano | findstr :3000` (Windows)
2. Kill the process or change the port in `backend/src/main.ts`

### Q: Flutter app shows "Failed to load food items"
**A:** Check:
1. Backend is running on http://localhost:3000
2. API URL is correct in `flutter_app/lib/services/api_service.dart`
3. For Android emulator, use `10.0.2.2` instead of `localhost`
4. For physical devices, use your computer's IP address

### Q: How do I get my computer's IP address?
**A:**
- Mac/Linux: Run `ifconfig` and look for `inet` under your network interface
- Windows: Run `ipconfig` and look for IPv4 Address

### Q: Flutter command not found
**A:** Install Flutter SDK:
1. Visit https://docs.flutter.dev/get-started/install
2. Download Flutter for your platform
3. Add Flutter to your PATH
4. Run `flutter doctor` to verify installation

## Development Questions

### Q: How do I add a new food item?
**A:** Three ways:
1. **Via API**: Send POST request to `/api/foods` with food data
2. **Via Postman**: Use the included Postman collection
3. **Via MongoDB**: Insert directly into the `foods` collection

### Q: How do I customize the app theme?
**A:** Edit `flutter_app/lib/main.dart`:
```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue), // Change color
  useMaterial3: true,
),
```

### Q: How do I add a new API endpoint?
**A:**
1. Add method to the controller (e.g., `foods.controller.ts`)
2. Implement logic in the service (e.g., `foods.service.ts`)
3. Update API documentation
4. Test the endpoint

### Q: How do I add authentication?
**A:** See Phase 2 in [ROADMAP.md](ROADMAP.md). Basic steps:
1. Install `@nestjs/jwt` and `@nestjs/passport`
2. Create Auth module with login/register endpoints
3. Add User schema
4. Implement JWT strategy
5. Add auth guards to protected routes
6. Add login screen in Flutter
7. Store JWT token securely

### Q: How do I deploy this to production?
**A:**

**Backend:**
1. Deploy to services like Heroku, AWS, Google Cloud, or DigitalOcean
2. Use MongoDB Atlas for database hosting
3. Set environment variables for production
4. Enable HTTPS/SSL

**Flutter App:**
- **Android**: Build APK/AAB and publish to Google Play
- **iOS**: Build IPA and publish to App Store
- **Web**: Deploy to Firebase Hosting, Netlify, or Vercel

## Feature Questions

### Q: Can users create accounts?
**A:** Not yet in v1.0.0. User authentication is planned for v1.1. See [ROADMAP.md](ROADMAP.md).

### Q: Can I add payment processing?
**A:** Yes, but you'll need to integrate a payment gateway like Stripe or PayPal. This is planned for v2.0.

### Q: Does it support multiple restaurants?
**A:** Not currently. This is a single-restaurant app. Multi-restaurant support is planned for v3.0.

### Q: Can I track my order in real-time?
**A:** Real-time tracking is planned for v2.0 using WebSockets.

### Q: Does it have push notifications?
**A:** Not yet. Push notifications are planned for v2.0 using Firebase Cloud Messaging.

## Troubleshooting

### Q: npm install fails with errors
**A:** Try:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

### Q: Flutter build fails
**A:** Try:
```bash
flutter clean
flutter pub get
flutter run
```

### Q: TypeScript errors in backend
**A:**
```bash
npm run build
```
Fix any compilation errors shown.

### Q: Cannot connect from mobile device to backend
**A:** Ensure:
1. Device and computer are on same WiFi network
2. Firewall allows incoming connections on port 3000
3. Use computer's IP instead of localhost
4. Backend is running and accessible

## Performance Questions

### Q: How many concurrent users can it handle?
**A:** With default configuration:
- Development: ~50-100 concurrent users
- Production (optimized): 500-1000+ concurrent users
- Can scale horizontally with load balancers and multiple instances

### Q: How do I improve performance?
**A:**
1. Add Redis caching
2. Optimize database queries with indexes
3. Use CDN for static assets
4. Implement pagination
5. Enable compression
6. Use production builds

### Q: How big will the Flutter app be?
**A:** Approximate sizes:
- Android APK: 15-20 MB
- iOS IPA: 20-30 MB
- Can be reduced with code splitting and optimization

## Contributing Questions

### Q: How can I contribute?
**A:** See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. You can:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation
- Help other users

### Q: I found a bug, what should I do?
**A:** Create an issue on GitHub with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

### Q: Can I add a feature I need?
**A:** Yes! Check [ROADMAP.md](ROADMAP.md) to see if it's planned, then:
1. Open an issue to discuss
2. Fork the repository
3. Implement the feature
4. Submit a pull request

## License Questions

### Q: What license is this under?
**A:** MIT License - you can use it freely for personal or commercial projects.

### Q: Do I need to credit the original author?
**A:** Not required by the license, but appreciated! You can keep the LICENSE file or add attribution in your about screen.

### Q: Can I sell apps based on this?
**A:** Yes, the MIT license allows commercial use.

## Contact & Support

### Q: Where can I get help?
**A:**
1. Check this FAQ
2. Read the [SETUP.md](SETUP.md) guide
3. Search existing GitHub issues
4. Create a new issue on GitHub
5. Check the documentation files

### Q: How do I report a security issue?
**A:** Please don't open public issues for security vulnerabilities. Contact the maintainers directly through GitHub.

### Q: Is there a community or forum?
**A:** Check the GitHub Discussions tab for community discussions, questions, and updates.

### Q: How often is the project updated?
**A:** The project follows the roadmap. Check [CHANGELOG.md](CHANGELOG.md) for recent updates and [ROADMAP.md](ROADMAP.md) for planned features.

## Still Have Questions?

If your question isn't answered here:
1. Check the [documentation](README.md)
2. Search [GitHub Issues](https://github.com/somkheartk/flutter-food-delivery/issues)
3. Create a new issue with your question

We're here to help! 🚀
