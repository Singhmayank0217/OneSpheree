import type { Metadata } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { AnimationProvider } from '@/providers/AnimationProvider';
import { HomeAtmosphere } from '@/components/home/HomeAtmosphere';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/config/site';
import { organizationJsonLd } from '@/lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-inter' });
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-inter-tight' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: 'website', locale: 'en_US' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <HomeAtmosphere />
        <SmoothScrollProvider>
          <AnimationProvider>
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </AnimationProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
