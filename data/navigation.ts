export interface NavItem {
  label: string;
  href: string;
  /** renders the services mega menu on desktop */
  mega?: boolean;
}

/** Routes that open on a dark hero — the transparent navbar uses on-dark text there. */
export const darkHeroRoutes = ['/'];

/**
 * Primary navigation. Home is the logo, Contact is the CTA button — so the
 * middle links are Services / Work / Portfolio / About. Work (visual gallery)
 * and Portfolio (documented client projects) are distinct sections and both
 * appear. Industries, Case Studies and Insights are intentionally omitted for
 * now (routes/architecture preserved).
 */
export const primaryNav: NavItem[] = [
  { label: 'Services', href: '/services', mega: true },
  { label: 'Work', href: '/work' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
];

export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Process', href: '/process' },
    { label: 'Careers', href: '/careers' },
    { label: 'Global Presence', href: '/global-presence' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
    { label: 'Fire Safety', href: '/services/fire-safety' },
    { label: 'Due Diligence', href: '/services/due-diligence' },
    { label: 'E-Commerce', href: '/services/e-commerce' },
    { label: 'Manpower Solutions', href: '/services/manpower-solutions' },
    { label: 'Sales & Consulting', href: '/services/sales-consulting' },
  ],
  explore: [
    { label: 'Work', href: '/work' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Resources', href: '/resources' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};
