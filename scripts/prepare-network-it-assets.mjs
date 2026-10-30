import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

await mkdir('public/images/network-it', { recursive: true });
for (const name of ['telecom-room', 'structured-cabling', 'site-installation']) {
  await sharp(`assets/network-it/${name}.png`)
    .resize({ width: 1600, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(`public/images/network-it/${name}.webp`);
}
console.log('Prepared three Network & IT WebP assets. AI-generated originals and prompts remain in assets/network-it.');
