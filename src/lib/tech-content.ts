// Aggregates published "tech" (搞点技术) content into one reverse-chronological
// feed, used by the /tech section index and the homepage.
//
// Right now the only wired source is datasets; writings (a content collection)
// and tools-and-demos plug in here when they get a data source — the render
// side never changes.

import { DATASETS } from '../config/datasets';
import { byDateDesc, type FeedEntry } from './feed';

/** All tech content, newest first. Pass a limit to cap the list (e.g. 10). */
export async function getTechEntries(limit?: number): Promise<FeedEntry[]> {
  const entries: FeedEntry[] = [
    ...DATASETS.map((d): FeedEntry => ({
      section: 'tech',
      sub: 'datasets',
      titleEn: d.titleEn,
      titleZh: d.titleZh,
      blurbEn: d.blurbEn,
      blurbZh: d.blurbZh,
      tags: d.tags,
      tagsZh: d.tagsZh,
      date: d.date,
      href: d.href,
    })),
    // TODO: spread in writings (content collection) and tools-and-demos here.
  ];

  entries.sort(byDateDesc);
  return typeof limit === 'number' ? entries.slice(0, limit) : entries;
}
