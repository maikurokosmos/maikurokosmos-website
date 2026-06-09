// Global site config — single source of truth for nav, sections, and subsections.
// The Header, homepage section cards, section index pages, and placeholder pages
// all read from here, so changing it once updates the whole site.

export interface SubSection {
  label: string;
  slug: string;
  blurb: string;
}

export interface Section {
  label: string;
  slug: string;
  blurb: string;
  /** Accent color (from the brand palette) */
  accent: string;
  /** Section icon (emoji for now; can be swapped for a custom SVG later) */
  icon: string;
  children: SubSection[];
}

export const SITE = {
  title: 'maikurokosmos',
  description: 'Personal site for tech, linguistics, and music.',
  url: 'https://www.maikurokosmos.com',
};

export const SECTIONS: Section[] = [
  {
    label: 'Tech',
    slug: 'tech',
    blurb: 'Long-form research, dataset releases, and interactive demos.',
    accent: '#881ed3',
    icon: '🔬',
    children: [
      { label: 'Writings', slug: 'writings', blurb: 'Long-form research and technical writing.' },
      { label: 'Datasets', slug: 'datasets', blurb: 'Datasets I compile and release.' },
      { label: 'Tools and Demos', slug: 'tools-and-demos', blurb: 'Interactive demos you can run in the browser.' },
    ],
  },
  {
    label: 'Linguistics',
    slug: 'linguistics',
    blurb: 'Pure linguistics — study and research, such as translation analysis of Harry Potter.',
    accent: '#e736d3',
    icon: '📖',
    children: [
      { label: 'Readings', slug: 'readings', blurb: 'Reading notes and literature reviews.' },
      { label: 'Analysis', slug: 'analysis', blurb: 'Close analysis of language and translation.' },
    ],
  },
  {
    label: 'Music',
    slug: 'music',
    blurb: 'Performance videos, choir and covers, and future original work.',
    accent: '#b42ed0',
    icon: '🎵',
    children: [
      { label: 'Solo', slug: 'solo', blurb: 'Solo singing and playing.' },
      { label: 'Choir', slug: 'choir', blurb: 'Choir works and performances.' },
      { label: 'Casual Cover', slug: 'casual-cover', blurb: 'Casual covers.' },
      { label: 'Critique', slug: 'critique', blurb: 'Music critique and appreciation.' },
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
