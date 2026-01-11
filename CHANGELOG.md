# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-11

### Added
- Initial release of Adaptive Window Color extension
- Automatic color extraction from webpages
- Dynamic theme updates based on dominant page colors
- Smart color analysis with filtering of extreme light/dark colors
- Contrast-aware text color selection for readability
- React-based popup UI for extension control
- Redux state management
- Enable/disable toggle in popup
- Chrome Manifest V3 support
- Webpack build configuration
- ESLint configuration for code quality
- Comprehensive documentation:
  - README.md with features and usage
  - INSTALLATION.md with setup instructions
  - TESTING.md with testing guidelines
  - CONTRIBUTING.md with contribution guidelines
- Extension icons in multiple sizes (16px, 48px, 128px)
- Color utility functions:
  - RGB to HSL conversion
  - Luminance calculation
  - Contrast ratio calculation
  - Color adjustment for text contrast
- Background service worker for theme management
- Content script for color extraction
- Support for analyzing:
  - Page images
  - Styled elements (headers, navigation, hero sections)
  - Background colors

### Technical Details
- Bundle size: ~184KB (minified)
- React 18.2.0
- Redux Toolkit 1.9.7
- Webpack 5
- Chrome Extension Manifest V3

### Browser Support
- Chrome 88+
- Edge 88+ (Chromium-based)
- Brave
- Other Chromium-based browsers

## [Unreleased]

### Planned Features
- Firefox extension port
- Custom color palette selection
- Color history and favorites
- Per-website theme preferences
- Advanced color detection algorithms
- Dark mode support
- Chrome Web Store publication

### Known Issues
- Cannot analyze cross-origin images due to CORS restrictions
- Theme applies globally to all windows (Chrome API limitation)
- Some websites with strict CSP may restrict content script execution

---

## Version History

- **1.0.0** - Initial public release
