import type { SVGProps } from 'react';
import { Icon } from '@/components/ds/Icon';

/**
 * Supplemental icons for service pages — same contract as the DS icon set
 * (Lucide-style, 24px grid, 1.75 stroke). Names not in this map delegate to
 * the DS <Icon>, so service data can reference either set with one component.
 * The DS file itself stays untouched.
 */
const EXTRA: Record<string, string> = {
  link: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
  refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
  pen: 'M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z',
  megaphone: 'M3 11l18-5v12L3 13v-2zM11.6 16.8a3 3 0 11-5.8-1.6',
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  video: 'M23 7l-7 5 7 5V7zM14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z',
  layoutGrid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  window: 'M3 5h18v14H3zM3 9h18M6 7h.01M9 7h.01',
  smartphone: 'M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zM12 18h.01',
  gauge: 'M12 14l4-5M20.49 15A8.5 8.5 0 113.51 15',
  wrench:
    'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
  fileText: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  messageCircle:
    'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
  cpu: 'M4 4h16v16H4zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3',
  gitBranch: 'M6 3v12M6 21a3 3 0 100-6 3 3 0 000 6zM18 9a3 3 0 100-6 3 3 0 000 6zM18 9a9 9 0 01-9 9',
  database:
    'M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3zM21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5',
  pieChart: 'M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z',
  dollarSign: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  percent: 'M19 5L5 19M6.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM17.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  home: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.83zM7 7h.01',
  heart:
    'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  building: 'M4 22V6l8-4 8 4v16M4 22h16M9 22v-5h6v5M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01',
  idCard: 'M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zM8 12a2 2 0 100-4 2 2 0 000 4zM6 16c.5-1.6 3.5-1.6 4 0M14 9h4M14 13h4',
  scale: 'M12 3v17M9 20h6M4 7h16M6 7l-3 7a3 3 0 006 0zM18 7l-3 7a3 3 0 006 0z',
  wallet: 'M19 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2M21 12h-6a2 2 0 010-4h6a1 1 0 011 1v2a1 1 0 01-1 1zM16 10h.01',
  landmark: 'M3 21h18M12 3L4 8h16zM6 10v11M10 10v11M14 10v11M18 10v11',
  factory: 'M2 20a1 1 0 001 1h18a1 1 0 001-1V8l-6 4V8l-6 4V5a1 1 0 00-1-1H4a1 1 0 00-1 1zM7 18h.01M11 18h.01M15 18h.01',
  searchCheck: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35M8 11l2 2 4-4',
  clipboardCheck:
    'M9 4H8a2 2 0 00-2 2v13a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2h-1M9 4a2 2 0 002 2h2a2 2 0 002-2M9 4a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4',
  gavel: 'M14 13l-7 7a2 2 0 01-3-3l7-7M16 16l5-5M8 8l5-5M9 7l4 4M16 11l4 4M3 21h7',
  lightbulb: 'M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7c.7.6 1 1.5 1 2.3h6c0-.8.3-1.7 1-2.3A7 7 0 0012 2z',
  graduationCap: 'M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5M22 10v6',
  settings:
    'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z',
};

interface ServiceIconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  strokeWidth?: number;
}

export function ServiceIcon({ name, size = 20, strokeWidth = 1.75, style, ...rest }: ServiceIconProps) {
  const d = EXTRA[name];
  if (!d) return <Icon name={name} size={size} strokeWidth={strokeWidth} style={style} {...rest} />;
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
