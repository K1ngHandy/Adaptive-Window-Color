# Installation Guide

## Loading the Extension in Chrome

Follow these steps to install the Adaptive Window Color extension in your Chrome browser:

### Step 1: Build the Extension

```bash
# Clone the repository (if not already done)
git clone https://github.com/K1ngHandy/Adaptive-Window-Color.git
cd Adaptive-Window-Color

# Install dependencies
npm install

# Build the extension
npm run build
```

This will create a `dist` folder with all the necessary files.

### Step 2: Load in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** by toggling the switch in the top-right corner
4. Click the **Load unpacked** button
5. Navigate to and select the `dist` folder inside the project directory
6. The extension should now appear in your extensions list!

### Step 3: Pin the Extension (Optional)

1. Click the puzzle piece icon in the Chrome toolbar
2. Find "Adaptive Window Color" in the list
3. Click the pin icon to pin it to your toolbar for easy access

## Using the Extension

### Basic Usage

1. Click the extension icon in your Chrome toolbar
2. You'll see a popup with a toggle switch
3. Ensure the extension is **Enabled** (the toggle should be green/on)
4. Visit any website - the browser theme will automatically adapt to the page's dominant color
5. Navigate to different pages to see the theme update dynamically

### Features

- **Auto-Detection**: The extension automatically analyzes:
  - Images on the page
  - Background colors of major elements (headers, navigation bars, hero sections)
  - Styled elements with prominent colors

- **Smart Filtering**: The extension ignores:
  - Very light colors (near white)
  - Very dark colors (near black)
  - Transparent elements
  - CORS-restricted images

- **Text Contrast**: The extension ensures:
  - Tab text remains readable
  - Appropriate contrast ratios (WCAG compliant)
  - Automatic adjustment of toolbar and frame colors

### Disabling the Extension

If you want to temporarily disable the extension:

1. Click the extension icon
2. Toggle the switch to **Disabled**
3. Your browser will revert to the default theme

You can re-enable it anytime by toggling the switch back on.

## Troubleshooting

### Theme Not Updating

- **Refresh the page**: Sometimes the extension needs a page reload to analyze content
- **Check if enabled**: Ensure the toggle in the popup is ON
- **Wait a moment**: The extension waits for page load completion before analyzing

### Colors Look Wrong

- The extension samples colors from visible elements and images
- Pages with minimal styling or mostly text may result in neutral themes
- Some websites with dark/light mode may conflict - choose one mode for best results

### Extension Not Loading

- Ensure you selected the `dist` folder, not the root project folder
- Check that the build was successful (`npm run build` should complete without errors)
- Try removing and re-adding the extension

## Updating the Extension

When there are updates to the extension:

```bash
cd Adaptive-Window-Color
git pull
npm install
npm run build
```

Then reload the extension in Chrome:
1. Go to `chrome://extensions/`
2. Find "Adaptive Window Color"
3. Click the refresh icon

## Permissions Explained

The extension requires these permissions:

- **activeTab**: To analyze the current tab's colors
- **tabs**: To detect tab changes and update themes
- **theme**: To apply custom themes to your browser
- **host_permissions (<all_urls>)**: To analyze any webpage you visit

**Privacy Note**: All color analysis happens locally in your browser. No data is sent to external servers.

## Best Practices

- **For Best Results**: Visit websites with strong visual branding or colorful images
- **Performance**: The extension is optimized to analyze quickly without slowing down page loads
- **Multiple Windows**: The theme applies to all Chrome windows, based on the active tab

## Uninstallation

To remove the extension:

1. Go to `chrome://extensions/`
2. Find "Adaptive Window Color"
3. Click **Remove**
4. Confirm the removal

Your browser will immediately revert to the default theme.

## Support

If you encounter issues:
- Check the [GitHub Issues](https://github.com/K1ngHandy/Adaptive-Window-Color/issues)
- Review the troubleshooting section above
- Open a new issue with details about your problem
