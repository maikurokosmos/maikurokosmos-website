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
  /**
   * 'active' = still updated (chip: growing daily); 'discontinued' = no longer
   * updated but kept on the site for reference. The listing shows active ones first.
   */
  status: 'active' | 'discontinued';
}

export const DATASETS: DatasetEntry[] = [
  {
    slug: 'weibo-sociolinguistics-project',
    titleEn: 'weibo sociolinguistics project',
    titleZh: '微博社会语言学项目',
    blurbEn:
      'A daily pipeline over Weibo hot-search topics, released as three linked datasets: topic summaries, post-level labels for stance, emotion, moral framing, and satire, and a weekly human review of those labels.',
    blurbZh:
      '围绕微博热搜话题的每日数据流程，发布为三个互相关联的数据集：话题总结、标注了立场、情绪、道德框架与反讽的博文级数据，以及对这些标注的每周人工复核。',
    tags: ['weibo', 'sociolinguistics', 'stance & emotion', 'human review'],
    tagsZh: ['微博', '社会语言学', '立场与情绪', '人工复核'],
    rows: 8500,
    hfUrl: 'https://huggingface.co/datasets/maikurokosmos/weibo-sociolinguistics-topic-summaries',
    date: '2026-10-07',
    href: '/tech/datasets/weibo-sociolinguistics-project',
    status: 'active',
  },
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
    status: 'discontinued',
  },
];
