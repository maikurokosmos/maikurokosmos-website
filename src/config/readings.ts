// Data for the linguistics → readings page:
//   series — card-based, each opens a multi-entry series page (e.g. Harry Potter)
//
// Tags are NOT a separate system: each item carries its own `tags` (+ `tagsZh`).
// `series` lives here in the file tree (few, structural).

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
