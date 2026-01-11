/**
 * Content script that extracts the dominant color from the webpage
 */

/**
 * Extracts the most prominent color from the page
 * @returns {Object} RGB color object
 */
function extractDominantColor() {
  // Create a canvas to analyze page colors
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Sample size for performance
  const sampleSize = 10;
  canvas.width = sampleSize;
  canvas.height = sampleSize;
  
  // Get all images on the page
  const images = Array.from(document.querySelectorAll('img')).filter(img => 
    img.complete && img.naturalHeight > 0 && img.width > 50 && img.height > 50
  );
  
  // Color frequency map
  const colorMap = new Map();
  
  // Sample colors from images
  images.slice(0, 5).forEach(img => {
    try {
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];
        
        // Skip transparent and very light/dark pixels
        if (a < 128) continue;
        if (r > 240 && g > 240 && b > 240) continue;
        if (r < 15 && g < 15 && b < 15) continue;
        
        // Quantize color to reduce variations
        const key = `${Math.floor(r/32)*32},${Math.floor(g/32)*32},${Math.floor(b/32)*32}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }
    } catch (e) {
      // CORS or other errors - skip this image
    }
  });
  
  // Sample colors from styled elements
  const styledElements = document.querySelectorAll('[style*="background"], header, nav, .header, .navbar, .hero');
  Array.from(styledElements).slice(0, 20).forEach(element => {
    const bgColor = window.getComputedStyle(element).backgroundColor;
    const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    
    if (match) {
      const [, r, g, b] = match.map(Number);
      
      // Skip transparent and very light/dark colors
      if (r > 240 && g > 240 && b > 240) return;
      if (r < 15 && g < 15 && b < 15) return;
      
      const key = `${Math.floor(r/32)*32},${Math.floor(g/32)*32},${Math.floor(b/32)*32}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 5); // Weight styled elements higher
    }
  });
  
  // Find most frequent color
  if (colorMap.size === 0) {
    // Default to a neutral color
    return { r: 100, g: 100, b: 100 };
  }
  
  let maxCount = 0;
  let dominantColor = null;
  
  colorMap.forEach((count, color) => {
    if (count > maxCount) {
      maxCount = count;
      dominantColor = color;
    }
  });
  
  if (dominantColor) {
    const [r, g, b] = dominantColor.split(',').map(Number);
    return { r, g, b };
  }
  
  return { r: 100, g: 100, b: 100 };
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getColor') {
    const color = extractDominantColor();
    sendResponse({ color });
  }
  return true;
});

// Notify background script when page is loaded
if (document.readyState === 'complete') {
  chrome.runtime.sendMessage({ action: 'pageLoaded' });
} else {
  window.addEventListener('load', () => {
    chrome.runtime.sendMessage({ action: 'pageLoaded' });
  });
}
