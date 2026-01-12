const sharp = require('sharp');
const path = require('path');

const iconsDir = path.join(__dirname, '../../icons');
const sizes = [16, 48, 128];

async function convertIcons() {
  for (const size of sizes) {
    const svgPath = path.join(iconsDir, `icon${size}.svg`);
    const pngPath = path.join(iconsDir, `icon${size}.png`);
    
    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);
      
      console.log(`✓ Created ${path.basename(pngPath)}`);
    } catch (error) {
      console.error(`✗ Error creating icon${size}.png:`, error.message);
    }
  }
  
  console.log('\nIcon generation complete!');
}

convertIcons().catch(console.error);
