import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// "Harry Potter" reading series. Bilingual files live as -en/-zh pairs; the
// pair is linked by a shared `key` (+ `book`). For now pages render one language;
// the pairing is captured here so a global EN/中 toggle can plug in later.
const harryPotter = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/linguistics/readings/harry-potter',
  }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'zh']),
    kind: z.enum(['series-intro', 'book-intro', 'chapter']),
    /** Book folder slug, e.g. "01-philosophers-stone" (omitted for series-intro) */
    book: z.string().optional(),
    /** Logical id shared by the en/zh pair, e.g. "the-boy-who-lived" */
    key: z.string(),
    /** Sort order within a book (intro = 0, then chapters 1, 2, …) */
    order: z.number().default(0),
    /** ISO publish date, e.g. "2026-07-18" — drives the "latest content" feeds. */
    date: z.string(),
    /** One-line summary shown in the feeds (in this file's own language). */
    blurb: z.string().default(''),
    /** Feed tags (in this file's own language). */
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// "Lyrics attempts" (作词与填词尝试) under music. Like harryPotter, files are
// -en / -zh pairs linked by a shared `key`, which is also the URL slug. A work
// with only one language file is served on both locales' routes.
const lyrics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/music/lyrics-attempts' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'zh']),
    /** Logical id shared by the en/zh pair + URL slug, e.g. "into-the-new-world" */
    key: z.string(),
    /** adaptation = 填词 (new words to an existing song), original = 作词 */
    type: z.enum(['adaptation', 'original']),
    /** Language tags, e.g. ["korean", "mandarin"] — labels live in config/lyrics.ts. */
    languages: z.array(z.string()).default([]),
    /** Original song credit shown above the title, e.g. "少女时代 · 다시 만난 세계". */
    original: z.string().default(''),
    /** ISO publish date, e.g. "2026-10-08" — sorts the list (newest first) and the feeds. */
    date: z.string(),
    /** One-line summary for the list and feeds (in this file's own language). */
    blurb: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = { harryPotter, lyrics };
