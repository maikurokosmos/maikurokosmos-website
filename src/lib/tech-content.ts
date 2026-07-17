// Aggregates published "tech" (搞点技术) content into one reverse-chronological
// feed, used by the /tech section index (and reusable by the homepage later).
//
// Right now the only wired source is datasets; writings (a content collection)
// and tools-and-demos plug in here when they get a data source — the render
// side never changes.

import { DATASETS } from '../config/datasets';

export type TechSubSlug = 'writings' | 'datasets' | 'tools-and-demos';

export interface TechEntry {
  /** Which tech subsection this belongs to (drives the colored chip). */
  sub: TechSubSlug;
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

/** All tech content, newest first. Pass a limit to cap the list (e.g. 10). */
export function getTechEntries(limit?: number): TechEntry[] {
  const entries: TechEntry[] = [
    ...DATASETS.map((d): TechEntry => ({
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

  entries.sort((a, b) => b.date.localeCompare(a.date));
  return typeof limit === 'number' ? entries.slice(0, limit) : entries;
}
