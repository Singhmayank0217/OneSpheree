import { Manrope } from 'next/font/google';

/**
 * The export loads Manrope from Google Fonts (<link> in the .dc.html helmet);
 * here it's self-hosted via next/font — same typeface, same weights the reveal
 * taglines actually use (300 light, 500 medium), zero external request and no
 * font-swap layout shift.
 */
export const manrope = Manrope({ subsets: ['latin'], weight: ['300', '500'], display: 'swap' });
