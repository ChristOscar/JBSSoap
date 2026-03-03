/**
 * convert-images.js
 * Converts HEIC product photos to WebP for Next.js.
 * Run: node scripts/convert-images.js
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const INPUT_DIR = ROOT;
const OUTPUT_DIR = path.join(ROOT, "public", "images", "products");

// Map HEIC filenames → desired output names
const CONVERSIONS = [
  { input: "IMG_5852.heic", output: "product-eucalyptus.webp" },
  { input: "IMG_5854.heic", output: "product-aloe.webp" },
  { input: "IMG_5858.heic", output: "product-cocoa.webp" },
];

async function convert() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const { input, output } of CONVERSIONS) {
    const inputPath = path.join(INPUT_DIR, input);
    const outputPath = path.join(OUTPUT_DIR, output);

    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠  Skipping ${input} — file not found`);
      continue;
    }

    try {
      await sharp(inputPath)
        .resize(1200, 1200, { fit: "cover", position: "center" })
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`✓  ${input} → ${output}`);
    } catch (err) {
      console.error(`✗  Failed ${input}:`, err.message);
    }
  }

  // Also optimize the logo
  const logoIn = path.join(ROOT, "public", "logo.png");
  const logoOut = path.join(ROOT, "public", "logo-optimized.png");
  if (fs.existsSync(logoIn)) {
    await sharp(logoIn).png({ quality: 90 }).toFile(logoOut);
    console.log("✓  logo.png optimized");
  }

  console.log("\nDone. Images are in public/images/products/");
}

convert().catch(console.error);
