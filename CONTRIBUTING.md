# Contributing to Food Delivery App

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🌟 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, Flutter version, Node.js version)

### Suggesting Features

Feature requests are welcome! Please create an issue with:
- Clear description of the feature
- Use case and benefits
- Proposed implementation (if you have ideas)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## 📝 Development Guidelines

### Code Style

#### Flutter/Dart
- Follow [Dart style guide](https://dart.dev/guides/language/effective-dart/style)
- Use `flutter format` before committing
- Run `flutter analyze` to check for issues
- Use meaningful variable and function names
- Add comments for complex logic

#### TypeScript/NestJS
- Follow [TypeScript style guide](https://google.github.io/styleguide/tsguide.html)
- Use ESLint for code linting
- Follow NestJS conventions and patterns
- Add JSDoc comments for public APIs
- Use descriptive variable and function names

### Commit Messages

Follow conventional commit format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(foods): add search functionality
fix(cart): resolve total calculation bug
docs(readme): update installation instructions
```

### Testing

#### Backend
```bash
cd backend
npm test
```

Add tests for:
- New features
- Bug fixes
- API endpoints
- Business logic

#### Flutter
```bash
cd flutter_app
flutter test
```

Add tests for:
- Widget tests
- Unit tests for models and services
- Integration tests

### Documentation

- Update README.md if you add new features
- Update API_DOCS.md for API changes
- Add inline code comments
- Update ARCHITECTURE.md for architectural changes

## 🔍 Review Process

All pull requests will be reviewed by maintainers. Reviews may include:
- Code quality checks
- Testing coverage
- Documentation completeness
- Architecture alignment
- Performance considerations

## 🎯 Areas for Contribution

Current priorities:

### High Priority
- [ ] User authentication system
- [ ] Image upload functionality
- [ ] Search and filter improvements
- [ ] Unit and integration tests
- [ ] API documentation (Swagger)

### Medium Priority
- [ ] Payment integration
- [ ] Push notifications
- [ ] Order tracking
- [ ] User reviews and ratings
- [ ] Admin dashboard

### Low Priority
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] Performance monitoring

## 💡 Tips for Contributors

1. **Start Small**: Begin with small improvements or bug fixes
2. **Ask Questions**: Don't hesitate to ask in issues or discussions
3. **Test Thoroughly**: Test your changes on multiple devices/browsers
4. **Follow Patterns**: Study existing code and follow established patterns
5. **Update Tests**: Add or update tests for your changes
6. **Document Changes**: Update relevant documentation

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards other contributors

## 📧 Contact

If you have questions, feel free to:
- Open an issue
- Start a discussion
- Contact the maintainers

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to make this project better! 🚀
