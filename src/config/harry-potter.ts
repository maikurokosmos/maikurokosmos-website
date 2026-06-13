// Metadata for the "Harry Potter" reading series.
// This describes the *skeleton* (series title + the 7 books, always present),
// independent of which chapters have actually been written. The articles
// themselves (intros + chapters) live in the `harryPotter` content collection.

export const HP_SERIES = {
  slug: 'harry-potter',
  /** English display title (kept as authored — this is the column's brand title) */
  titleEn: 'Harry Potter, The Chinese Version with the Lens of Linguistics',
  /** Chinese display title */
  titleZh: '陪你再看一遍哈利·波特',
};

export interface HPBook {
  /** Folder slug under .../harry-potter/, also used in the URL */
  slug: string;
  order: number;
  titleEn: string;
  titleZh: string;
}

export const HP_BOOKS: HPBook[] = [
  { slug: '01-philosophers-stone', order: 1, titleEn: "philosopher's stone", titleZh: '哈利·波特与魔法石' },
  { slug: '02-chamber-of-secrets', order: 2, titleEn: 'chamber of secrets', titleZh: '哈利·波特与密室' },
  { slug: '03-prisoner-of-azkaban', order: 3, titleEn: 'prisoner of azkaban', titleZh: '哈利·波特与阿兹卡班的囚徒' },
  { slug: '04-goblet-of-fire', order: 4, titleEn: 'goblet of fire', titleZh: '哈利·波特与火焰杯' },
  { slug: '05-order-of-the-phoenix', order: 5, titleEn: 'order of the phoenix', titleZh: '哈利·波特与凤凰社' },
  { slug: '06-half-blood-prince', order: 6, titleEn: 'half-blood prince', titleZh: '哈利·波特与混血王子' },
  { slug: '07-deathly-hallows', order: 7, titleEn: 'deathly hallows', titleZh: '哈利·波特与死亡圣器' },
];

export function getHPBook(slug: string): HPBook | undefined {
  return HP_BOOKS.find((b) => b.slug === slug);
}
