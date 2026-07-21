// Data for the linguistics → readings page, split into two blocks:
//   1) series       — card-based, each opens a multi-entry series page (e.g. Harry Potter)
//   2) casual notes — a lightweight list of standalone notes (empty for now)
//
// Tags are NOT a separate system: each item carries its own `tags` (+ `tagsZh`).
// `series` lives here in the file tree (few, structural). `casualNotes` could
// later move to YAML / a Google Sheet — the rendering doesn't care.

import { HP_SERIES, HP_BOOKS } from './harry-potter';

export interface ReadingSeries {
  slug: string;
  titleEn: string;
  titleZh: string;
  href: string;
  tags: string[];
  tagsZh: string[];
  books: number;
}

export const READING_SERIES: ReadingSeries[] = [
  {
    slug: HP_SERIES.slug,
    titleEn: HP_SERIES.titleEn,
    titleZh: HP_SERIES.titleZh,
    href: `/linguistics/readings/${HP_SERIES.slug}`,
    tags: ['translation', 'close reading', 'chinese'],
    tagsZh: ['比较翻译', '社会语言学','小说阅读'],
    books: HP_BOOKS.length,
  },
];

export interface CasualNote {
  titleEn: string;
  titleZh: string;
  /** ISO date, e.g. "2026-05-28" — formatted for display via formatDate() */
  date: string;
  tags: string[];
  tagsZh: string[];
  /** Optional link target (internal page or external URL) */
  href?: string;
}

// No casual notes yet — the section renders an empty state until the first
// real note is added. Push a note object here to populate it.
export const CASUAL_NOTES: CasualNote[] = [];
