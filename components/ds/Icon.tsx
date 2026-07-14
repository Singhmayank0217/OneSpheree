import type { SVGProps } from 'react';

/** Ported verbatim from the DS icon set (Lucide-style, 24px grid, 1.75 stroke). */
const PATHS: Record<string, string> = {
  arrowRight: 'M5 12h14M13 5l7 7-7 7',
  arrowUpRight: 'M7 17 17 7M7 7h10v10',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  check: 'M20 6 9 17l-5-5',
  x: 'M18 6 6 18M6 6l12 12',
  menu: 'M3 6h18M3 12h18M3 18h18',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z',
  shield: 'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z',
  flame: 'M12 2s5 4.5 5 10a5 5 0 01-10 0c0-1.5.7-2.6 1.5-3.6.2 2 1.7 2.6 1.7 2.6-.6-3 1-5 1.8-9z',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  trendingUp: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  globe: 'M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z',
  briefcase: 'M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
  shoppingCart: 'M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6',
  mail: 'M4 4h16v16H4zM22 6l-10 7L2 6',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.11 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.99.36 1.96.68 2.89a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.19-1.25a2 2 0 012.11-.45c.93.32 1.9.55 2.89.68A2 2 0 0122 16.92z',
  mapPin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
  clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  award: 'M12 15a6 6 0 100-12 6 6 0 000 12zM8.21 13.89L7 23l5-3 5 3-1.21-9.12',
  target: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z',
  zap: 'M13 2 3 14h7l-1 8 11-13h-7z',
  barChart: 'M12 20V10M18 20V4M6 20v-4',
  fileCheck: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M9 15l2 2 4-4',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  play: 'M5 3l16 9-16 9V3z',
  alertTriangle: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z',
};

export type IconName = keyof typeof PATHS;

interface IconProps extends SVGProps<SVGSVGElement> {
  name?: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name = 'check', size = 20, strokeWidth = 1.75, style, ...rest }: IconProps) {
  const d = PATHS[name] ?? PATHS.check;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, ...style }}
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}
