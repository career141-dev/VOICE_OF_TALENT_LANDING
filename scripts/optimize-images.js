const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
const path = require('path');

const R2_BASE = 'https://talentsuite.career141.com';

const imagesToOptimize = [
  // Hero & Base assets
  { path: 'images/hero-background.png', webp: 'images/hero-background.webp', quality: 82 },
  { path: 'images/microphone.png', webp: 'images/microphone.webp', quality: 85 },
  { path: 'images/portrait.png', webp: 'images/portrait.webp', quality: 85 },
  { path: 'images/Container.png', webp: 'images/Container.webp', quality: 85 },
  { path: 'images/footermob.png', webp: 'images/footermob.webp', quality: 85 },
  { path: 'images/Artboard.png', webp: 'images/Artboard.webp', quality: 85 },
  { path: 'images/reelThumbnail/reelthumbnail.png', webp: 'images/reelThumbnail/reelthumbnail.webp', quality: 85 },
  { path: 'images/VOTA Background White.png', webp: 'images/VOTA Background White.webp', quality: 85 },
  { path: 'images/icontop.png', webp: 'images/icontop.webp', quality: 90 },
  // Speakers 1 to 14
  ...Array.from({ length: 14 }, (_, i) => ({
    path: `images/speaker${i + 1}.png`,
    webp: `images/speaker${i + 1}.webp`,
    quality: 85,
  }))
];

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  const outputDir = path.join(__dirname, '../optimized-r2-images');
  console.log(`Starting image optimization. Target output: ${outputDir}\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const item of imagesToOptimize) {
    const url = `${R2_BASE}/${item.path}`;
    try {
      const buf = await download(url);
      const originalKB = (buf.length / 1024).toFixed(1);
      totalOriginal += buf.length;

      const targetPath = path.join(outputDir, item.webp);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });

      const optimizedBuf = await sharp(buf)
        .webp({ quality: item.quality, effort: 6 })
        .toBuffer();

      fs.writeFileSync(targetPath, optimizedBuf);
      const optimizedKB = (optimizedBuf.length / 1024).toFixed(1);
      totalOptimized += optimizedBuf.length;

      const savedPercent = (((buf.length - optimizedBuf.length) / buf.length) * 100).toFixed(0);
      console.log(`✓ ${item.path} -> ${item.webp} | ${originalKB} KB -> ${optimizedKB} KB (${savedPercent}% smaller)`);
    } catch (err) {
      console.error(`✗ Error processing ${item.path}:`, err.message);
    }
  }

  console.log('\n=======================================');
  console.log(`Original total size: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total data saved: ${(((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1)}%`);
  console.log('=======================================\n');
}

run();
