import { ContactHero } from '@/components/contact/ContactHero';
import { ContactExperience } from '@/components/contact/ContactExperience';
import { ContactOffices } from '@/components/contact/ContactOffices';
import { ContactLocation } from '@/components/contact/ContactLocation';
import { ContactSupport } from '@/components/contact/ContactSupport';
import { ContactFaq } from '@/components/contact/ContactFaq';
import { ContactFinalCta } from '@/components/contact/ContactFinalCta';
import { contactPage } from '@/data/contact';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact OneSpheree — Get in Touch With Our Team',
  description:
    'Get in touch with OneSpheree for digital marketing, fire safety, due diligence, e-commerce, manpower, sales consulting, or financial compliance. Enquiries answered within one business day.',
  path: '/contact',
});

/**
 * The Contact page.
 *
 * It reuses the design system — navigation, footer, typography, editorial
 * spacing, GSAP/ScrollTrigger architecture, Lenis smooth scroll — and none of
 * the section components from the home page, the service pages or the services
 * hub. Every chapter is built for this page and carries its own motion
 * language, so the scroll never repeats a gesture:
 *
 *   Hero        masked line reveal, over the SIGNAL FIELD — eight channels of
 *               communication converging on one receiver, glints riding them
 *   Enquiry     the centrepiece: a lateral wipe on the argument, a progressive
 *               field-by-field reveal on the glass form beside it
 *   Offices     staggered DEPTH arrival — cards coming forward out of a
 *               perspective, then a drawn district instead of a Maps iframe
 *   Support     per-card ACTIVATION — seven queues in their divisions' colours,
 *               each lighting on its own trigger with its own drawn motif
 *   FAQ         an expanding TIMELINE whose spine is drawn by the scroll
 *   Closing     THE ASCENT — a horizon, a staircase of light, and a statement
 *               that tracks in
 *
 * Surfaces follow the site's rhythm: dark hero and enquiry stage (the form only
 * reads as glass on dark), light canvas through the informational middle, dark
 * again for the closing statement so it runs straight into the footer.
 *
 * The page runs on the `.hub-theme` token scope — OneSpheree Orange — for the
 * same reason the services hub does: contact speaks for the whole company, not
 * one division. Support cards keep their own division colour inline.
 *
 * Form delivery: a Server Action (app/contact/actions.ts) validates and sends
 * through Resend to Info@Onespheree.com. No credential ever reaches the client.
 */
export default function ContactPage() {
  const { hero, experience, offices, location, support, faq, finalCta } = contactPage;

  // FAQPage structured data — the answers are already on the page, so the
  // markup costs nothing and makes them eligible as rich results
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.entries.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a },
    })),
  };

  return (
    <div className="hub-theme">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ContactHero hero={hero} />
      <ContactExperience content={experience} />
      <ContactOffices {...offices} />
      <ContactLocation location={location} />
      <ContactSupport {...support} />
      <ContactFaq {...faq} />
      <ContactFinalCta cta={finalCta} />
    </div>
  );
}
