export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'OneSpheree cut our compliance turnaround in half without adding headcount.',
    name: 'A. Rao',
    role: 'COO',
    company: 'Meridian Textiles',
  },
  {
    quote: 'One partner across marketing, staffing, and safety changed how fast we open new sites.',
    name: 'L. Haddad',
    role: 'Operations Director',
    company: 'Nova Retail Group',
  },
  {
    quote: 'They delivered the roadmap they promised — on time, with numbers we could take to the board.',
    name: 'M. Okafor',
    role: 'CEO',
    company: 'Crestline Hospitality',
  },
];
