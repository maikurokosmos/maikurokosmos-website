// Adapts "music" (玩点音乐) events into the shared feed shape for the homepage.
//
// Only *past* events are surfaced: their date is the performance date, so
// upcoming ones carry future dates and would permanently pin themselves to the
// top of a reverse-chronological "recent updates" list.
//
// Events have no detail page of their own, so each links to its subsection page
// (/music/choir etc.), where the full card with video and venue lives.

import { getEvents } from './music-events';
import { getSection } from '../config/site';
import { byDateDesc, type FeedEntry } from './feed';

/** Past music events as feed entries, newest first. */
export async function getMusicEntries(limit?: number): Promise<FeedEntry[]> {
  const subSlugs = new Set(getSection('music')!.children.map((c) => c.slug));
  const past = await getEvents('past');

  const entries = past
    .filter((e) => e.date)
    .map((e): FeedEntry => {
      const sub = subSlugs.has(e.category) ? e.category : 'solo';
      return {
        section: 'music',
        sub,
        titleEn: e.titleEn,
        titleZh: e.titleZh,
        blurbEn: e.descriptionEn,
        blurbZh: e.descriptionZh,
        tags: [],
        tagsZh: [],
        date: e.date,
        href: `/music/${sub}`,
      };
    });

  entries.sort(byDateDesc);
  return typeof limit === 'number' ? entries.slice(0, limit) : entries;
}
