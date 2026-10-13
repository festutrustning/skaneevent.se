import fs from 'node:fs';
import path from 'node:path';

const WIDTHS = [640, 960, 1400];

export function responsiveSources(src: string) {
  if (!src.endsWith('.jpg')) return null;
  const base = src.slice(1).replace(/\.jpg$/, '');
  const widths = WIDTHS.filter((width) =>
    fs.existsSync(path.join(process.cwd(), 'public', `${base}-${width}.avif`)),
  );
  if (!widths.length) return null;
  const preloadWidth = widths.includes(960) ? 960 : widths[0];
  return {
    avif: widths.map((width) => `/${base}-${width}.avif ${width}w`).join(', '),
    webp: widths.map((width) => `/${base}-${width}.webp ${width}w`).join(', '),
    preload: `/${base}-${preloadWidth}.avif`,
  };
}
