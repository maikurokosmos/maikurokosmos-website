// Data for the tech → datasets listing. Each dataset gets a card on /tech/datasets
// and its own long-form detail page (an .mdx article under /tech/datasets/<slug>).
// Like `readings.ts`, this is just the *listing* data — the detail prose lives in
// the .mdx file, and could later move to a collection without touching this shape.

export interface DatasetEntry {
  slug: string;
  titleEn: string;
  titleZh: string;
  blurbEn: string;
  blurbZh: string;
  tags: string[];
  tagsZh: string[];
  /** Approximate current row count (the corpus keeps growing, so shown softly). */
  rows: number;
  hfUrl: string;
  /** ISO date of first release / last notable update. */
  date: string;
  /** Canonical (English) detail-page path; localizedHref() prefixes /zh. */
  href: string;
}

export const DATASETS: DatasetEntry[] = [
  {
    slug: 'weibo-sociolinguistics',
    titleEn: 'weibo sociolinguistics corpus',
    titleZh: '微博社会语言学语料库',
    blurbEn:
      'A daily-growing corpus of Weibo hot-search discourse for sociolinguistic research into fandom and online-community language, labeled for validity, target, stance, emotion, moral framing, and satire.',
    blurbZh:
      '每日增长的微博热搜话题语料库，标注了有效性、指向对象、立场、情绪、道德框架与反讽，面向饭圈与网络社群语言的社会语言学研究。',
    tags: ['weibo', 'sociolinguistics', 'fandom', 'stance & emotion'],
    tagsZh: ['微博', '社会语言学', '饭圈', '立场与情绪'],
    rows: 1040,
    hfUrl: 'https://huggingface.co/datasets/maikurokosmos/maikurokosmos_socioling_weibo_dataset',
    date: '2026-07-15',
    href: '/tech/datasets/weibo-sociolinguistics',
  },
];
