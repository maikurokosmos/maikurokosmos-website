// Tag labels for the music → lyrics attempts list. Each work is tagged with
// its type (填词 / 作词) plus the languages involved; frontmatter stores the
// keys, this file turns them into display labels per locale.

import type { Lang } from '../i18n/ui';

const TYPE_LABELS: Record<string, { en: string; zh: string }> = {
  adaptation: { en: 'lyric adaptation', zh: '填词' },
  original: { en: 'original lyrics', zh: '作词' },
};

const LANGUAGE_LABELS: Record<string, { en: string; zh: string }> = {
  korean: { en: 'korean', zh: '韩语' },
  mandarin: { en: 'chinese mandarin', zh: '汉语普通话' },
  cantonese: { en: 'cantonese', zh: '粤语' },
  japanese: { en: 'japanese', zh: '日语' },
  english: { en: 'english', zh: '英语' },
};

/** Type tag first, then language tags. Unknown keys fall back to the raw key. */
export function lyricsTags(type: string, languages: string[], lang: Lang): string[] {
  return [type, ...languages].map((k) => (TYPE_LABELS[k] ?? LANGUAGE_LABELS[k])?.[lang] ?? k);
}
