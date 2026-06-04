import { BRAND } from './lib';
import { buildV11 } from './_v11a-forest';

export default async function () {
  return buildV11({
    bg: BRAND.dark,
    text: BRAND.cream,
    ring: BRAND.yellow,
    kicker: BRAND.yellow,
    underscore: BRAND.coral,
    secondary: BRAND.sage,
    hairlineOpacity: 0.18,
    bleedColor: BRAND.forest,
    logoColor: BRAND.cream,
    filename: 'v11d-ink.png',
  });
}
