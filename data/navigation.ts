export interface NavItem {
  label: string;
  href: string;
  /** renders the services mega menu on desktop */
  mega?: boolean;
}

/** Routes that open on a dark hero — the transparent navbar uses on-dark text there. */
export const darkHeroRoutes = ['/', '/about', '/contact', '/services', '/services/digital-marketing', '/services/due-diligence', '/services/fire-safety', '/services/e-commerce', '/services/manpower-solutions', '/services/sales-consulting', '/services/financial-compliance'];

/**
 * Primary navigation. Home is the logo, Contact is the CTA button — so the
 * middle links read About / Services / Work / Portfolio, in that order. Work
 * (visual gallery) and Portfolio (documented client projects) are distinct
 * sections and both appear. Services keeps its mega menu. Industries, Case
 * Studies and Insights are intentionally omitted for now (routes/architecture
 * preserved). Both the desktop navbar and the mobile drawer render from this
 * array, so the order below is the order everywhere.
 */
export const primaryNav: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', mega: true },
  { label: 'Work', href: '/work' },
  { label: 'Portfolio', href: '/portfolio' },
];

export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
    { label: 'Fire Safety', href: '/services/fire-safety' },
    { label: 'Due Diligence', href: '/services/due-diligence' },
    { label: 'E-Commerce', href: '/services/e-commerce' },
    { label: 'Manpower Solutions', href: '/services/manpower-solutions' },
    { label: 'Sales & Consulting', href: '/services/sales-consulting' },
    { label: 'Financial & Compliance Services', href: '/services/financial-compliance' },
  ],
  explore: [
    { label: 'Work', href: '/work' },
    { label: 'Portfolio', href: '/portfolio' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};
