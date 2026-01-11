const fs = require('fs');
const path = require('path');

// Create simple base64 PNG icons
const sizes = [16, 48, 128];

// Simple 1x1 pixel PNG in different colors for gradient effect
const createIcon = (size) => {
  // Create a simple colored square icon using Canvas API (when available in Node)
  // For now, we'll create placeholder PNGs
  const canvas = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${size/5}" fill="url(#grad${size})"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="white" opacity="0.9"/>
      <path d="M ${size/2} ${size/3} L ${size/2} ${size*2/3} M ${size/3} ${size/2} L ${size*2/3} ${size/2}" 
            stroke="url(#grad${size})" stroke-width="${size/16}" stroke-linecap="round"/>
    </svg>
  `;
  return canvas;
};

const iconsDir = path.join(__dirname, '../../icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

sizes.forEach(size => {
  const svg = createIcon(size);
  fs.writeFileSync(path.join(iconsDir, `icon${size}.svg`), svg);
  console.log(`Created icon${size}.svg`);
});

console.log('Icon generation complete. SVG files created.');
console.log('Note: Convert SVG to PNG using: npx sharp-cli input.svg -o output.png');
