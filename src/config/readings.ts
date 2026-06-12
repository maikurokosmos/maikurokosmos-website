// Data for the linguistics → readings page, split into two blocks:
//   1) series       — card-based, each opens a multi-entry series page (e.g. Harry Potter)
//   2) casual notes — a lightweight list of standalone notes
//
// Tags are NOT a separate system: each item just carries its own `tags`.
// `series` lives here in the file tree (few, structural). `casualNotes` could
// later move to YAML / a Google Sheet — the rendering doesn't care, and `tags`
// would simply be one comma-separated column there.

import { HP_SERIES, HP_BOOKS } from './harry-potter';

export interface ReadingSeries {
  slug: string;
  title: string;
  href: string;
  tags: string[];
  books: number;
}

export const READING_SERIES: ReadingSeries[] = [
  {
    slug: HP_SERIES.slug,
    title: HP_SERIES.titleEn,
    href: `/linguistics/readings/${HP_SERIES.slug}`,
    tags: ['translation', 'close reading', 'chinese'],
    books: HP_BOOKS.length,
  },
];

export interface CasualNote {
  title: string;
  /** ISO date, e.g. "2026-05-28" — formatted for display via formatDate() */
  date: string;
  tags: string[];
  /** Optional link target (internal page or external URL) */
  href?: string;
}

export const CASUAL_NOTES: CasualNote[] = [
  { title: 'why "muggle" resists a clean translation', date: '2026-05-28', tags: ['translation', 'wordplay'], href: '#' },
  { title: 'honorifics that quietly vanish in english', date: '2026-04-15', tags: ['pragmatics', 'register'], href: '#' },
  { title: 'reduplication in chinese onomatopoeia', date: '2026-03-02', tags: ['phonology', 'chinese'], href: '#' },
];
