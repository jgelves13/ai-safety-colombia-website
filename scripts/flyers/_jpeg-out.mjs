import sharp from 'sharp';
const src = 'G:/Mon Drive/AI Safety Colombia/ai-safety-colombia-website/scripts/flyers/dist/01-redesign/01-default.png';
const dst = 'G:/Mon Drive/AI Safety Colombia/Apart Research Hackathon/outreach/Diseños/Carrusel Hackathon/01.jpeg';
await sharp(src).jpeg({ quality: 92 }).toFile(dst);
console.log('wrote', dst);
