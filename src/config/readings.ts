// Data for the linguistics → readings page, split into two blocks:
//   1) series       — card-based, each opens a multi-entry series page (e.g. Harry Potter)
//   2) casual notes — a lightweight list of standalone notes
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

export const CASUAL_NOTES: CasualNote[] = [
  {
    titleEn: 'why "muggle" resists a clean translation',
    titleZh: '为什么“muggle”很难干净地翻译',
    date: '2026-05-28',
    tags: ['translation', 'wordplay'],
    tagsZh: ['翻译', '文字游戏'],
    href: '#',
  },
  {
    titleEn: 'honorifics that quietly vanish in english',
    titleZh: '在英文里悄悄消失的敬语',
    date: '2026-04-15',
    tags: ['pragmatics', 'register'],
    tagsZh: ['语用', '语域'],
    href: '#',
  },
  {
    titleEn: 'reduplication in chinese onomatopoeia',
    titleZh: '汉语拟声词里的重叠',
    date: '2026-03-02',
    tags: ['phonology', 'chinese'],
    tagsZh: ['音系', '中文'],
    href: '#',
  },
];
