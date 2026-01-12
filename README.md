# Adaptive Window Color

A lightweight Chrome extension that automatically adapts your browser theme to match the most prominent color on the webpage you're viewing.

## Features

- 🎨 **Automatic Color Detection**: Extracts the dominant color from webpages using advanced color analysis
- 🔄 **Dynamic Updates**: Theme updates automatically as you navigate between pages
- 📖 **Readable Text**: Ensures optimal contrast for text visibility on all theme colors
- ⚡ **Fast & Lightweight**: Optimized performance with minimal resource usage
- 🎯 **Easy Control**: Simple toggle to enable/disable the extension
- 🌈 **Beautiful UI**: Modern React-based popup with Redux state management

## Installation

### For Development

1. Clone the repository:
   ```bash
   git clone https://github.com/K1ngHandy/Adaptive-Window-Color.git
   cd Adaptive-Window-Color
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` folder from this project

### From Chrome Web Store

*(Coming soon)*

## Usage

1. Click the extension icon in your Chrome toolbar
2. Toggle the extension on/off using the switch in the popup
3. Browse any website and watch your browser theme adapt to match the page's dominant color
4. The theme will automatically update as you navigate between pages

## How It Works

1. **Color Extraction**: The content script analyzes images and styled elements on the page
2. **Color Analysis**: Identifies the most prominent color while filtering out common backgrounds
3. **Contrast Optimization**: Adjusts colors to ensure text remains readable
4. **Theme Application**: Uses Chrome's Theme API to apply the color scheme to your browser

## Technology Stack

- **JavaScript** (ES6+)
- **React** 18.2.0 - UI components
- **Redux Toolkit** - State management
- **Webpack** 5 - Module bundling
- **Chrome Extension Manifest V3** - Latest extension platform

## Development

### Available Scripts

- `npm run build` - Build production version
- `npm run dev` - Build and watch for changes
- `npm run lint` - Lint source files
- `npm run icons` - Generate icon files

### Project Structure

```
Adaptive-Window-Color/
├── src/
│   ├── background/
│   │   └── background.js      # Service worker for theme management
│   ├── content/
│   │   └── content.js          # Color extraction from webpages
│   ├── popup/
│   │   ├── index.jsx           # Popup entry point
│   │   ├── Popup.jsx           # Main popup component
│   │   ├── popup.css           # Popup styles
│   │   ├── popup.html          # Popup HTML template
│   │   └── store.js            # Redux store configuration
│   └── utils/
│       ├── colorUtils.js       # Color manipulation utilities
│       └── convertIcons.js     # Icon generation script
├── icons/                       # Extension icons
├── manifest.json                # Extension manifest
├── webpack.config.js            # Webpack configuration
└── package.json                 # Project dependencies
```

## Performance

- **Bundle Size**: ~184KB (minified)
- **Memory Usage**: Minimal overhead
- **Color Analysis**: Optimized sampling for fast extraction
- **Theme Updates**: Debounced to prevent excessive API calls

## Privacy

This extension:
- ✅ Only analyzes visual content on the current page
- ✅ Does not collect or transmit any user data
- ✅ Works completely offline
- ✅ Does not require any external services

## Browser Compatibility

- Chrome 88+
- Edge 88+ (Chromium-based)
- Brave
- Other Chromium-based browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Chrome Web Store publication
- [ ] Firefox extension port
- [ ] Custom color palette selection
- [ ] Color history and favorites
- [ ] Per-website theme preferences
- [ ] Advanced color detection algorithms
- [ ] Dark mode support

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/K1ngHandy/Adaptive-Window-Color/issues) on GitHub.

## Acknowledgments

- Inspired by the need for more personalized browsing experiences
- Built with modern web technologies and best practices
- Thanks to the Chrome extension community for documentation and support
