#!/usr/bin/env bun
/**
 * Regenerate QR codes from existing passes.json
 * This ensures QR codes match the codes in passes.json
 */

import QRCode from 'qrcode';
import { mkdirSync, readFileSync } from 'fs';

console.log('\n🔄 REGENERATING QR CODES FROM passes.json\n');

// Load existing passes
const passes = JSON.parse(readFileSync('./passes.json', 'utf-8'));
const promoterCodes = JSON.parse(readFileSync('./promoter-codes.json', 'utf-8'));

console.log(`Found ${passes.length} guest list passes`);
console.log(`Found ${promoterCodes.length} promoter codes\n`);

// Create output directory
mkdirSync('./qr-codes', { recursive: true });

// Generate guest list QR codes
console.log('Generating guest list QR codes...\n');
for (let i = 0; i < passes.length; i++) {
  const pass = passes[i];
  const qrFile = `./qr-codes/pass-${i + 1}-of-${passes.length}.png`;

  await QRCode.toFile(qrFile, pass.redeemUrl, {
    width: 400,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  console.log(`✓ ${pass.number} - ${pass.displayCode} (${pass.code})`);
}

// Generate promoter QR codes
console.log('\n\nGenerating promoter QR codes...\n');
for (const promoter of promoterCodes) {
  const qrFile = `./qr-codes/${promoter.qrFile}`;

  await QRCode.toFile(qrFile, promoter.redeemUrl, {
    width: 400,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  console.log(`✓ ${promoter.promoterName} (PID: ${promoter.promoterId})`);
}

console.log(`\n✅ Regenerated ${passes.length} guest list QR codes + ${promoterCodes.length} promoter QR codes!`);
console.log(`📁 Saved to: ./qr-codes/\n`);
