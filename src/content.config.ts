import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// "Harry Potter" reading series. Bilingual files live as -en/-zh pairs; the
// pair is linked by a shared `key` (+ `book`). For now pages render one language;
// the pairing is captured here so a global EN/中 toggle can plug in later.
const harryPotter = defineCollection({
  loader: glob({
    pattern: '**/*.md',
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
    draft: z.boolean().default(false),
  }),
});

export const collections = { harryPotter };
