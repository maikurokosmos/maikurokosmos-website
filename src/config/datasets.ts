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
    slug: 'weibo-topic-summaries',
    titleEn: 'weibo sociolinguistics topic summaries',
    titleZh: '微博社会语言学 · 话题总结',
    blurbEn:
      'One row per research date: the Weibo hot-search topic selected that day, its metrics, a de-identified topic-level summary, and aggregate labeling counts. No individual post text.',
    blurbZh:
      '每个研究日期一行：当天选定的微博热搜话题、话题指标、经过脱敏的话题级总结，以及当天打标的汇总计数。不发布单条博文正文。',
    tags: ['weibo', 'sociolinguistics', 'topic summaries', 'cc by 4.0'],
    tagsZh: ['微博', '社会语言学', '话题总结', 'CC BY 4.0'],
    rows: 48,
    hfUrl: 'https://huggingface.co/datasets/maikurokosmos/weibo-sociolinguistics-topic-summaries',
    date: '2026-10-07',
    href: '/tech/datasets/weibo-topic-summaries',
    status: 'active',
  },
  {
    slug: 'weibo-labeled-posts',
    titleEn: 'weibo sociolinguistics labeled posts',
    titleZh: '微博社会语言学 · 博文标注',
    blurbEn:
      'The post-level companion: up to 200 popular posts per daily topic, each labeled for validity, target, stance, emotion, moral framing, and satire.',
    blurbZh:
      '与话题总结配套的博文级数据：每日话题下最多 200 条热门博文，逐条标注有效性、指向对象、立场、情绪、道德框架与反讽。',
    tags: ['weibo', 'sociolinguistics', 'stance & emotion', 'post-level'],
    tagsZh: ['微博', '社会语言学', '立场与情绪', '博文级'],
    rows: 8500,
    hfUrl: 'https://huggingface.co/datasets/maikurokosmos/weibo-sociolinguistics-labeled-posts',
    date: '2026-10-07',
    href: '/tech/datasets/weibo-labeled-posts',
    status: 'active',
  },
  {
    slug: 'weibo-weekly-label-reviews',
    titleEn: 'weibo sociolinguistics weekly label reviews',
    titleZh: '微博社会语言学 · 每周人工复核',
    blurbEn:
      'A separate weekly human-review layer for the daily labels. Reviews are kept on their own and never overwrite the daily release.',
    blurbZh:
      '针对每日标注的每周人工复核层。复核结果单独存放，不会覆盖每日发布的数据。',
    tags: ['weibo', 'human review', 'label quality'],
    tagsZh: ['微博', '人工复核', '标注质量'],
    rows: 0,
    hfUrl: 'https://huggingface.co/datasets/maikurokosmos/weibo-sociolinguistics-weekly-label-reviews',
    date: '2026-10-07',
    href: '/tech/datasets/weibo-weekly-label-reviews',
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
