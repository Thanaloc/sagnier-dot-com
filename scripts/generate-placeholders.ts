import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const photosDir = join(process.cwd(), "public", "photos");
mkdirSync(photosDir, { recursive: true });

interface PlaceholderConfig {
  id: string;
  width: number;
  height: number;
  hue: number;
}

const placeholders: PlaceholderConfig[] = [
  { id: "surf-01", width: 1600, height: 1067, hue: 200 },
  { id: "surf-02", width: 1067, height: 1600, hue: 190 },
  { id: "surf-03", width: 1600, height: 1067, hue: 210 },
  { id: "surf-04", width: 1600, height: 1067, hue: 195 },
  { id: "ocean-01", width: 1600, height: 1067, hue: 220 },
  { id: "ocean-02", width: 1600, height: 1067, hue: 215 },
  { id: "ocean-03", width: 1600, height: 1067, hue: 205 },
  { id: "portrait-01", width: 1067, height: 1600, hue: 30 },
  { id: "paysage-01", width: 1600, height: 900, hue: 25 },
  { id: "paysage-02", width: 1600, height: 900, hue: 35 },
];

function generateSvg(config: PlaceholderConfig): string {
  const { width, height, hue, id } = config;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue}, 40%, 25%)" />
      <stop offset="100%" stop-color="hsl(${hue + 20}, 50%, 15%)" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)" />
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
    font-family="system-ui" font-size="32" fill="rgba(255,255,255,0.3)"
    letter-spacing="4">${id.toUpperCase()}</text>
</svg>`;
}

for (const config of placeholders) {
  const svg = generateSvg(config);
  const filePath = join(photosDir, `${config.id}.svg`);
  writeFileSync(filePath, svg);
  console.log(`Generated: ${config.id}.svg`);
}

console.log("All placeholders generated.");
