# Testing Guide

## Manual Testing Checklist

### Installation & Setup
- [ ] Extension builds successfully (`npm run build`)
- [ ] Extension loads in Chrome without errors
- [ ] Extension icon appears in toolbar
- [ ] Popup opens when clicking the icon
- [ ] Popup UI displays correctly

### Core Functionality
- [ ] Extension starts enabled by default
- [ ] Toggle switch works (on/off)
- [ ] Theme updates when visiting a colorful website
- [ ] Theme updates when navigating between pages
- [ ] Theme updates when switching tabs
- [ ] Text remains readable on all theme colors
- [ ] Extension can be disabled and re-enabled

### Color Detection
- [ ] Detects colors from images
- [ ] Detects colors from styled elements
- [ ] Ignores white/near-white backgrounds
- [ ] Ignores black/near-black backgrounds
- [ ] Handles pages with no images gracefully
- [ ] Handles CORS-restricted images gracefully

### Performance
- [ ] Page load time is not noticeably affected
- [ ] No memory leaks during extended use
- [ ] Theme updates smoothly without lag
- [ ] Extension bundle size is reasonable (<200KB)

### Edge Cases
- [ ] Works on pages with dark mode
- [ ] Works on pages with minimal styling
- [ ] Works on pages with many images
- [ ] Works on single-page applications (SPAs)
- [ ] Handles rapid tab switching
- [ ] Handles browser window focus changes

## Test Websites

Good websites to test the extension:

1. **Strong Colors**
   - https://www.stripe.com (Blue/Purple)
   - https://www.spotify.com (Green)
   - https://www.netflix.com (Red/Black)
   - https://www.airbnb.com (Pink/Red)

2. **Image Heavy**
   - https://unsplash.com
   - https://www.pinterest.com
   - https://www.instagram.com (requires login)

3. **Minimal Styling**
   - https://www.wikipedia.org
   - https://news.ycombinator.com
   - https://old.reddit.com

4. **Dynamic Content**
   - https://www.youtube.com
   - https://www.reddit.com
   - https://www.twitter.com

## Expected Behavior

### On Stripe.com
- Should extract blue/purple tones from the gradient background
- Tab bar should be colored with a blue/purple theme
- Text should remain white for contrast

### On Spotify.com
- Should extract green from the brand elements
- Tab bar should have a green theme
- Text should remain white/black depending on brightness

### On Wikipedia
- Should default to a neutral color (gray/blue)
- Theme should be subtle since Wikipedia is mostly white

### On Image-Heavy Sites
- Should extract dominant color from visible images
- Color should update when scrolling to new image sections
- Should prioritize large, prominent images

## Chrome DevTools Checks

1. Open Chrome DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Check Performance tab for memory usage
5. Inspect extension service worker:
   - Go to `chrome://extensions/`
   - Click "Service worker" link under the extension
   - Check for errors in the console

## Automated Testing (Future)

Potential test scenarios to automate:

- Unit tests for color utility functions
- Integration tests for message passing
- E2E tests for theme application
- Performance benchmarks

## Known Limitations

- Cannot analyze colors from cross-origin images (CORS)
- Theme applies to all windows, not per-window
- Some websites with CSP may restrict content script execution
- Video content is not analyzed for color

## Reporting Issues

When reporting issues, include:

1. Chrome version
2. Extension version
3. Website URL where issue occurred
4. Steps to reproduce
5. Expected vs actual behavior
6. Console errors (if any)
7. Screenshots (if applicable)
