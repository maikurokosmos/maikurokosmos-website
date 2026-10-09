// One shared shape for every "latest content" list on the site: the per-section
// feed on /tech, /linguistics, /music, and the mixed feed on the homepage.
//
// Each section has its own adapter (tech-content / linguistics-content /
// music-content) that maps its native data source into `FeedEntry`. Adding a
// source means writing an adapter — the rendering never changes.

import type { Lang } from '../i18n/ui';

export type SectionSlug = 'tech' | 'linguistics' | 'music';

export interface FeedEntry {
  /** Owning section — drives the colored chip on the homepage feed. */
  section: SectionSlug;
  /** Subsection slug (e.g. "datasets", "readings") — drives the section-page chip. */
  sub: string;
  titleEn: string;
  titleZh: string;
  blurbEn: string;
  blurbZh: string;
  tags: string[];
  tagsZh: string[];
  /** ISO date, e.g. "2026-07-15" — formatted for display via formatDate(). */
  date: string;
  /** Canonical (English) path; localizedHref() prefixes /zh. */
  href: string;
}

/** Newest first; entries without a date sink to the bottom. */
export function byDateDesc(a: FeedEntry, b: FeedEntry): number {
  return (b.date || '').localeCompare(a.date || '');
}

// —— locale-aware accessors (keep components clean) ——
export const feedTitle = (e: FeedEntry, lang: Lang) => (lang === 'zh' ? e.titleZh || e.titleEn : e.titleEn || e.titleZh);
export const feedBlurb = (e: FeedEntry, lang: Lang) => (lang === 'zh' ? e.blurbZh || e.blurbEn : e.blurbEn || e.blurbZh);
export const feedTags = (e: FeedEntry, lang: Lang) => (lang === 'zh' ? e.tagsZh : e.tags);

/** One section's content, newest first — used by the section index pages. */
export async function getSectionEntries(section: string, limit?: number): Promise<FeedEntry[]> {
  if (section === 'tech') return (await import('./tech-content')).getTechEntries(limit);
  if (section === 'linguistics') return (await import('./linguistics-content')).getLinguisticsEntries(limit);
  // Music's own page lists events right below the feed, so its feed is lyrics only.
  if (section === 'music') return (await import('./lyrics-content')).getLyricsEntries(limit);
  return [];
}

/** Lyrics (in the repo) + past events (Google Sheet; a Sheet hiccup just drops the events). */
async function getMusicFeed(): Promise<FeedEntry[]> {
  const lyrics = await (await import('./lyrics-content')).getLyricsEntries();
  let events: FeedEntry[] = [];
  try {
    events = await (await import('./music-content')).getMusicEntries();
  } catch (err) {
    console.warn('[feed] music events unavailable, omitting from feed:', err);
  }
  return [...lyrics, ...events];
}

/**
 * Every section mixed into one reverse-chronological feed — the homepage's
 * "recent updates". Music events come from a Google Sheet at build time, so a
 * hiccup there degrades to an event-less feed rather than failing the build.
 */
export async function getLatestEntries(limit = 5): Promise<FeedEntry[]> {
  const [tech, linguistics, music] = await Promise.all([
    (await import('./tech-content')).getTechEntries(),
    (await import('./linguistics-content')).getLinguisticsEntries(),
    getMusicFeed(),
  ]);

  const entries = [...tech, ...linguistics, ...music];
  entries.sort(byDateDesc);
  return entries.slice(0, limit);
}
