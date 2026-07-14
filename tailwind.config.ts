import type { Config } from 'tailwindcss';

/** Every utility maps to a Design System CSS variable — no raw values. */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './providers/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: 'var(--color-primary)', hover: 'var(--color-primary-hover)', active: 'var(--color-primary-active)', soft: 'var(--color-primary-soft)' },
        secondary: { DEFAULT: 'var(--color-secondary)', hover: 'var(--color-secondary-hover)', soft: 'var(--color-secondary-soft)' },
        canvas: 'var(--surface-canvas)',
        card: 'var(--surface-card)',
        sunken: 'var(--surface-sunken)',
        dark: { DEFAULT: 'var(--surface-dark)', elevated: 'var(--surface-dark-elevated)' },
        heading: 'var(--text-heading)',
        body: 'var(--text-body)',
        muted: 'var(--text-muted)',
        ondark: { DEFAULT: 'var(--text-on-dark)', muted: 'var(--text-on-dark-muted)' },
        line: { DEFAULT: 'var(--border-default)', strong: 'var(--border-strong)', dark: 'var(--border-dark)' },
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
      },
      spacing: {
        '025': 'var(--space-025)', '05': 'var(--space-05)', 1: 'var(--space-1)', 1.5: 'var(--space-15)',
        2: 'var(--space-2)', 3: 'var(--space-3)', 4: 'var(--space-4)', 5: 'var(--space-5)', 6: 'var(--space-6)',
        8: 'var(--space-8)', 10: 'var(--space-10)', 12: 'var(--space-12)', 16: 'var(--space-16)', 20: 'var(--space-20)', 24: 'var(--space-24)',
        gutter: 'var(--gutter)', section: 'var(--section-space-y)', 'section-sm': 'var(--section-space-y-sm)',
      },
      maxWidth: { container: 'var(--container-max)', narrow: 'var(--container-narrow)', reading: 'var(--content-reading-width)' },
      borderRadius: {
        xs: 'var(--radius-xs)', sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)', '2xl': 'var(--radius-2xl)', full: 'var(--radius-full)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)', sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)',
        dropdown: 'var(--shadow-dropdown)', nav: 'var(--shadow-nav)', 'dark-lg': 'var(--shadow-dark-lg)', focus: 'var(--focus-ring)',
      },
      zIndex: { dropdown: 'var(--z-dropdown)', sticky: 'var(--z-sticky)', overlay: 'var(--z-overlay)', modal: 'var(--z-modal)', toast: 'var(--z-toast)' },
      backgroundImage: { brand: 'var(--gradient-brand)', 'brand-soft': 'var(--gradient-brand-soft)' },
    },
  },
  plugins: [],
};
export default config;
