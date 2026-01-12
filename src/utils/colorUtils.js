/**
 * Color utility functions for the extension
 */

// Configuration constants
const CONTRAST_THRESHOLD_GOOD = 4.5; // WCAG AA standard for normal text
const LIGHTNESS_ADJUSTMENT_DARK = 40;
const LIGHTNESS_ADJUSTMENT_LIGHT = 40;
const MIN_LIGHTNESS_DARK = 20;
const MAX_LIGHTNESS_LIGHT = 80;

/**
 * Converts RGB to HSL
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {Object} HSL values
 */
export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Calculates relative luminance for a color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {number} Luminance value
 */
export function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates contrast ratio between two colors
 * @param {number} l1 - Luminance of color 1
 * @param {number} l2 - Luminance of color 2
 * @returns {number} Contrast ratio
 */
export function getContrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Ensures good contrast for text by adjusting lightness
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {Object} Adjusted RGB color with good text contrast
 */
export function ensureTextContrast(r, g, b) {
  const luminance = getLuminance(r, g, b);
  const whiteLuminance = 1;
  const blackLuminance = 0;
  
  const whiteContrast = getContrastRatio(whiteLuminance, luminance);
  const blackContrast = getContrastRatio(luminance, blackLuminance);
  
  // If contrast with white is good (> WCAG AA threshold), use original color
  if (whiteContrast >= CONTRAST_THRESHOLD_GOOD) {
    return { r, g, b, textColor: '#FFFFFF' };
  }
  
  // If contrast with black is good, use original color
  if (blackContrast >= CONTRAST_THRESHOLD_GOOD) {
    return { r, g, b, textColor: '#000000' };
  }
  
  // Adjust lightness to ensure contrast
  const hsl = rgbToHsl(r, g, b);
  
  // Make it darker if originally light, lighter if originally dark
  if (hsl.l > 50) {
    hsl.l = Math.max(MIN_LIGHTNESS_DARK, hsl.l - LIGHTNESS_ADJUSTMENT_DARK);
    return { ...hslToRgb(hsl.h, hsl.s, hsl.l), textColor: '#FFFFFF' };
  } else {
    hsl.l = Math.min(MAX_LIGHTNESS_LIGHT, hsl.l + LIGHTNESS_ADJUSTMENT_LIGHT);
    return { ...hslToRgb(hsl.h, hsl.s, hsl.l), textColor: '#000000' };
  }
}

/**
 * Converts HSL to RGB
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {Object} RGB values
 */
export function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Converts RGB to hex color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Hex color
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}
