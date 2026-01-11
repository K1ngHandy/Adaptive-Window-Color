# Contributing to Adaptive Window Color

Thank you for your interest in contributing to Adaptive Window Color! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to make this extension better!

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Adaptive-Window-Color.git
   cd Adaptive-Window-Color
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Building the Extension

```bash
# Development build with watch mode
npm run dev

# Production build
npm run build
```

### Linting

We use ESLint to maintain code quality:

```bash
npm run lint
```

Please ensure your code passes linting before submitting a PR.

### Testing

Load the extension in Chrome:
1. Build the extension (`npm run build`)
2. Go to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked" and select the `dist` folder
5. Test your changes

See [TESTING.md](TESTING.md) for detailed testing procedures.

## Project Structure

```
Adaptive-Window-Color/
├── src/
│   ├── background/       # Service worker
│   │   └── background.js # Theme management logic
│   ├── content/          # Content scripts
│   │   └── content.js    # Color extraction from pages
│   ├── popup/            # Extension popup
│   │   ├── index.jsx     # React entry point
│   │   ├── Popup.jsx     # Main UI component
│   │   ├── store.js      # Redux store
│   │   ├── popup.css     # Styles
│   │   └── popup.html    # HTML template
│   └── utils/            # Utility functions
│       ├── colorUtils.js # Color manipulation
│       └── convertIcons.js # Icon generation
├── icons/                # Extension icons
├── manifest.json         # Extension manifest
└── webpack.config.js     # Build configuration
```

## Coding Standards

### JavaScript/JSX

- Use ES6+ features
- Use arrow functions for callbacks
- Use async/await for promises
- Use descriptive variable names
- Add comments for complex logic

### React

- Use functional components with hooks
- Use Redux for state management
- Keep components small and focused
- Use prop-types or TypeScript for type checking (future)

### Naming Conventions

- Files: `camelCase.js` or `PascalCase.jsx` (for React components)
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- React Components: `PascalCase`

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Maximum line length: 100 characters

## Making Changes

### Adding Features

1. Check existing issues to see if it's already planned
2. Open an issue to discuss the feature
3. Wait for approval before starting work
4. Implement the feature in a new branch
5. Write tests if applicable
6. Update documentation
7. Submit a pull request

### Fixing Bugs

1. Check if an issue exists, if not create one
2. Reference the issue in your branch name: `fix/issue-123-description`
3. Fix the bug
4. Test thoroughly
5. Submit a pull request

### Improving Documentation

Documentation improvements are always welcome! This includes:
- README updates
- Code comments
- Installation guides
- Usage examples
- API documentation

## Commit Messages

Use clear and descriptive commit messages:

```
feat: Add color history feature
fix: Resolve contrast calculation error
docs: Update installation guide
refactor: Simplify color extraction logic
style: Format code with prettier
test: Add unit tests for colorUtils
```

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. Update your branch with the latest main:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. Ensure all tests pass and code is linted

3. Update documentation if needed

4. Create a pull request with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Reference to related issues
   - Screenshots for UI changes

5. Wait for review and address feedback

6. Once approved, a maintainer will merge your PR

## Review Process

All PRs require:
- Code review by at least one maintainer
- Passing linter checks
- Functional testing
- Documentation updates (if applicable)

Reviewers will check for:
- Code quality and style
- Functionality and correctness
- Performance implications
- Security concerns
- Documentation completeness

## Performance Guidelines

- Keep bundle size small
- Minimize DOM manipulation
- Use efficient color sampling algorithms
- Debounce/throttle frequent operations
- Avoid memory leaks

## Security Guidelines

- Never expose sensitive data
- Validate all inputs
- Use secure Chrome APIs
- Follow principle of least privilege
- Keep dependencies updated

## Questions?

- Open an issue for questions about contributing
- Check existing issues and PRs for similar questions
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in the README and release notes. Thank you for making this project better!
