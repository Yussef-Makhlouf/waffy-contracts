import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const destination = path.join(root, 'public', 'og');
await mkdir(destination, { recursive: true });
const sources = {
  home: 'arabian-development.webp',
  services: 'construction-skyline.webp',
  networks: 'crop-city-works.webp',
  'network-it': 'network-it/telecom-room.webp',
  contact: 'riyadh-panorama.webp',
};

// Technical crops of existing illustrative assets; no claim of completed work.
for (const [name, source] of Object.entries(sources)) {
  const result = await sharp(path.join(root, 'public', 'images', source))
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .flatten({ background: '#071d37' }).jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(destination, `${name}.jpg`));
  console.log(`${name}: ${result.width} × ${result.height}, ${Math.round(result.size / 1024)} KB`);
}
