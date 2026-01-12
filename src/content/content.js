/**
 * Content script that extracts the dominant color from the webpage
 */

// Configuration constants
const SAMPLE_SIZE = 10;
const MAX_IMAGES_TO_SAMPLE = 5;
const MAX_ELEMENTS_TO_SAMPLE = 20;
const MIN_IMAGE_SIZE = 50;
const COLOR_QUANTIZATION_FACTOR = 32;
const ELEMENT_COLOR_WEIGHT = 5;
const LIGHT_COLOR_THRESHOLD = 240;
const DARK_COLOR_THRESHOLD = 15;
const ALPHA_THRESHOLD = 128;

/**
 * Checks if a color should be filtered out (too light or too dark)
 * @param {number} r - Red value
 * @param {number} g - Green value
 * @param {number} b - Blue value
 * @returns {boolean} True if color should be skipped
 */
function shouldSkipColor(r, g, b) {
  if (r > LIGHT_COLOR_THRESHOLD && g > LIGHT_COLOR_THRESHOLD && b > LIGHT_COLOR_THRESHOLD) return true;
  if (r < DARK_COLOR_THRESHOLD && g < DARK_COLOR_THRESHOLD && b < DARK_COLOR_THRESHOLD) return true;
  return false;
}

/**
 * Quantizes a color to reduce variations
 * @param {number} r - Red value
 * @param {number} g - Green value
 * @param {number} b - Blue value
 * @returns {string} Quantized color key
 */
function quantizeColor(r, g, b) {
  const qR = Math.floor(r / COLOR_QUANTIZATION_FACTOR) * COLOR_QUANTIZATION_FACTOR;
  const qG = Math.floor(g / COLOR_QUANTIZATION_FACTOR) * COLOR_QUANTIZATION_FACTOR;
  const qB = Math.floor(b / COLOR_QUANTIZATION_FACTOR) * COLOR_QUANTIZATION_FACTOR;
  return `${qR},${qG},${qB}`;
}

/**
 * Extracts the most prominent color from the page
 * @returns {Object} RGB color object
 */
function extractDominantColor() {
  // Create a canvas to analyze page colors
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Sample size for performance
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;
  
  // Get all images on the page
  const images = Array.from(document.querySelectorAll('img')).filter(img => 
    img.complete && img.naturalHeight > 0 && img.width > MIN_IMAGE_SIZE && img.height > MIN_IMAGE_SIZE
  );
  
  // Color frequency map
  const colorMap = new Map();
  
  // Sample colors from images
  images.slice(0, MAX_IMAGES_TO_SAMPLE).forEach(img => {
    try {
      ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      const imageData = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];
        
        // Skip transparent and very light/dark pixels
        if (a < ALPHA_THRESHOLD) continue;
        if (shouldSkipColor(r, g, b)) continue;
        
        // Quantize color to reduce variations
        const key = quantizeColor(r, g, b);
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }
    } catch (e) {
      // CORS or other errors - skip this image
    }
  });
  
  // Sample colors from styled elements
  const styledElements = document.querySelectorAll('[style*="background"], header, nav, .header, .navbar, .hero');
  Array.from(styledElements).slice(0, MAX_ELEMENTS_TO_SAMPLE).forEach(element => {
    const bgColor = window.getComputedStyle(element).backgroundColor;
    const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    
    if (match) {
      const [, r, g, b] = match.map(Number);
      
      // Skip transparent and very light/dark colors
      if (shouldSkipColor(r, g, b)) return;
      
      const key = quantizeColor(r, g, b);
      colorMap.set(key, (colorMap.get(key) || 0) + ELEMENT_COLOR_WEIGHT); // Weight styled elements higher
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
