import { BRAND } from './lib';
import { buildV11 } from './_v11a-forest';

export default async function () {
  return buildV11({
    bg: BRAND.cream,
    text: BRAND.forest,
    ring: BRAND.forest,
    kicker: BRAND.coral,
    underscore: BRAND.coral,
    secondary: BRAND.ink2,
    hairlineOpacity: 0.22,
    bleedColor: BRAND.sage,
    logoColor: null,
    filename: 'v11c-cream.png',
  });
}
