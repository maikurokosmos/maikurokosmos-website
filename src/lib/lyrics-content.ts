// Adapts music → lyrics attempts (作词与填词尝试) into the shared feed shape.
// Unlike events, these are articles with a real publish date and their own
// detail page, so they link straight to /music/lyrics-attempts/{key}.
//
// Files are -en / -zh pairs linked by `key` (same as the harryPotter series);
// these helpers re-pair them.

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { lyricsTags } from '../config/lyrics';
import { byDateDesc, type FeedEntry } from './feed';

type LyricsEntry = CollectionEntry<'lyrics'>;

/** Published works grouped by `key`, newest first. */
async function getLyricsGroups(): Promise<LyricsEntry[][]> {
  const groups = new Map<string, LyricsEntry[]>();
  for (const e of await getCollection('lyrics')) {
    if (e.data.draft) continue;
    groups.set(e.data.key, [...(groups.get(e.data.key) ?? []), e]);
  }
  return [...groups.values()].sort((a, b) => b[0].data.date.localeCompare(a[0].data.date));
}

/** One entry per work in the requested language (falling back to the other), newest first. */
export async function getLyricsWorks(lang: Lang): Promise<LyricsEntry[]> {
  return (await getLyricsGroups()).map((g) => g.find((e) => e.data.lang === lang) ?? g[0]);
}

export async function getLyricsEntries(limit?: number): Promise<FeedEntry[]> {
  const entries = (await getLyricsGroups()).map((group): FeedEntry => {
    const en = group.find((e) => e.data.lang === 'en');
    const zh = group.find((e) => e.data.lang === 'zh');
    const any = (en ?? zh)!.data;
    return {
      section: 'music',
      sub: 'lyrics-attempts',
      titleEn: en?.data.title ?? '',
      titleZh: zh?.data.title ?? '',
      blurbEn: en?.data.blurb ?? '',
      blurbZh: zh?.data.blurb ?? '',
      tags: lyricsTags(any.type, any.languages, 'en'),
      tagsZh: lyricsTags(any.type, any.languages, 'zh'),
      date: any.date,
      href: `/music/lyrics-attempts/${any.key}`,
    };
  });

  entries.sort(byDateDesc);
  return typeof limit === 'number' ? entries.slice(0, limit) : entries;
}
