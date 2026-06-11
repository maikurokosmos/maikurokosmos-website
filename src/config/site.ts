// Global site config — single source of truth for nav, sections, and subsections.
// label = stylized display title (the playful c→k spelling), name = correct plain
// spelling, slug = route. Change it once and it updates across the whole site.

export interface SubSection {
  label: string;
  slug: string;
  blurb: string;
}

export interface Section {
  /** Stylized display title with the playful c→k spelling, e.g. "te(k)h" */
  label: string;
  /** Correct plain spelling, e.g. "tech" — used for the bolded clarifier, meta & a11y */
  name: string;
  /** Route slug (kept correct so URLs are unaffected), e.g. "tech" */
  slug: string;
  /** Plain description (no markup); the correct name is bolded separately at render time */
  blurb: string;
  accent: string;
  /** Section illustration (PNG in public/images) */
  image: string;
  /** Horizontal focus of the faded background illustration on the homepage card */
  imagePos: 'left' | 'right' | 'center';
  children: SubSection[];
}

export const SITE = {
  title: 'maikurokosmos',
  description: 'Personal site for tech, linguistics, and music.',
  url: 'https://www.maikurokosmos.com',
};

// Social links shown in the hero, below the buttons.
// ⚠️ Replace the placeholder hrefs ('#') with your real URLs.
export const SOCIALS = [
  { label: 'github', href: '#', icon: 'simple-icons:github' },
  { label: 'linkedin', href: '#', icon: 'simple-icons:linkedin' },
  { label: 'x', href: '#', icon: 'simple-icons:x' },
  { label: 'youtube', href: '#', icon: 'simple-icons:youtube' },
];

export const SECTIONS: Section[] = [
  {
    label: 'te(k)h',
    name: 'tech',
    slug: 'tech',
    blurb:
      'independent research on AI safety and control, dataset releases, and interactive demos you can run right in the browser.',
    accent: '#881ed3',
    image: '/images/tekh.png',
    imagePos: 'left',
    children: [
      { label: 'writings', slug: 'writings', blurb: 'long-form research and technical writing' },
      { label: 'datasets', slug: 'datasets', blurb: 'datasets i compile and release' },
      { label: 'tools & demos', slug: 'tools-and-demos', blurb: 'interactive demos you can run in the browser' },
    ],
  },
  {
    label: 'linguisti(k)s',
    name: 'linguistics',
    slug: 'linguistics',
    blurb:
      'reading notes and close analysis, from sociolinguistics to the translation of books, journals, and more.',
    accent: '#e736d3',
    image: '/images/linguistiks.png',
    imagePos: 'right',
    children: [
      { label: 'readings', slug: 'readings', blurb: 'reading notes and literature reviews' },
      { label: 'analysis', slug: 'analysis', blurb: 'close analysis of language and translation' },
    ],
  },
  {
    label: 'musi(k)',
    name: 'music',
    slug: 'music',
    blurb:
      'the performances I take part in, choir and casual covers, the occasional critique, and future original work.',
    accent: '#b42ed0',
    image: '/images/musik.png',
    imagePos: 'center',
    children: [
      { label: 'solo', slug: 'solo', blurb: 'solo singing and playing' },
      { label: 'choir', slug: 'choir', blurb: 'choir works and performances' },
      { label: 'casual cover', slug: 'casual-cover', blurb: 'casual covers' },
      { label: 'critique', slug: 'critique', blurb: 'music critique and appreciation' },
    ],
  },
];

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getSubSection(sectionSlug: string, subSlug: string) {
  const section = getSection(sectionSlug);
  const sub = section?.children.find((c) => c.slug === subSlug);
  return section && sub ? { section, sub } : undefined;
}

// Date format: "YYYY Mon DD". Months are abbreviated, except May/June/July
// (written in full) and September (written as "Sept").
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const year = d.getUTCFullYear();
  const month = MONTHS[d.getUTCMonth()];
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year} ${month} ${day}`;
}
