// Aggregates published "linguistics" (学点语言) content into one
// reverse-chronological feed, used by the /linguistics section index and the
// homepage.
//
// The only wired source is the `harryPotter` reading series. Its files are
// single-language (`-en` / `-zh` pairs linked by `book` + `key`), so this
// adapter re-pairs them into the bilingual FeedEntry shape. Analysis and
// learnings plug in here once they get collections of their own.

import { getCollection, type CollectionEntry } from 'astro:content';
import { HP_SERIES } from '../config/harry-potter';
import { byDateDesc, type FeedEntry } from './feed';

type HPEntry = CollectionEntry<'harryPotter'>;

function hpHref(e: HPEntry): string {
  return `/linguistics/readings/${HP_SERIES.slug}/${e.data.book}/${e.data.key}`;
}

async function getHarryPotterEntries(): Promise<FeedEntry[]> {
  // Only 正文 chapters are standalone content. The series intro and the per-book
  // intros are framing for the series page, so they stay out of the feeds.
  const published = (await getCollection('harryPotter')).filter(
    (e) => !e.data.draft && e.data.kind === 'chapter',
  );

  // Re-pair the -en / -zh files: one feed item per logical article.
  const groups = new Map<string, HPEntry[]>();
  for (const e of published) {
    const id = `${e.data.book ?? ''}//${e.data.key}`;
    groups.set(id, [...(groups.get(id) ?? []), e]);
  }

  return [...groups.values()].map((group) => {
    const en = group.find((e) => e.data.lang === 'en');
    const zh = group.find((e) => e.data.lang === 'zh');
    const any = (en ?? zh)!;
    return {
      section: 'linguistics',
      sub: 'readings',
      titleEn: en?.data.title ?? '',
      titleZh: zh?.data.title ?? '',
      blurbEn: en?.data.blurb ?? '',
      blurbZh: zh?.data.blurb ?? '',
      tags: en?.data.tags ?? [],
      tagsZh: zh?.data.tags ?? [],
      date: en?.data.date ?? zh?.data.date ?? '',
      href: hpHref(any),
    } satisfies FeedEntry;
  });
}

/** All linguistics content, newest first. Pass a limit to cap the list (e.g. 10). */
export async function getLinguisticsEntries(limit?: number): Promise<FeedEntry[]> {
  const entries = [
    ...(await getHarryPotterEntries()),
    // TODO: spread in analysis and learnings here.
  ];

  entries.sort(byDateDesc);
  return typeof limit === 'number' ? entries.slice(0, limit) : entries;
}
