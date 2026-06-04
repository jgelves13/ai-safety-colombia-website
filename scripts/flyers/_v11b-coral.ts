import { BRAND } from './lib';
import { buildV11 } from './_v11a-forest';

export default async function () {
  return buildV11({
    bg: BRAND.coral,
    text: BRAND.cream,
    ring: BRAND.cream,
    kicker: '#143620',
    underscore: BRAND.yellow,
    secondary: '#FBDDD5',
    hairlineOpacity: 0.32,
    bleedColor: '#F2A293',
    logoColor: BRAND.cream,
    filename: 'v11b-coral.png',
  });
}
