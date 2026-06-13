// Music events — read at build time (or ISR revalidation) from a public Google Sheet.
// The sheet is published "anyone with link → viewer"; we fetch its CSV export.
// Editing the sheet updates the site on the next build / ISR revalidation.
//
// To point at a different sheet, change SHEET_ID / GID below.
import Papa from 'papaparse';

const SHEET_ID = '1kQXCD8_uXat1OiW0aqr7y7_YKAPKn0mtyd-ZV_jz4Is';
const GID = '0';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

export type EventType = 'upcoming' | 'past';

export interface MusicEvent {
  type: EventType;
  /** normalized slug: solo | choir | casual-cover */
  category: string;
  /** ISO YYYY-MM-DD ('' if missing/unparseable) */
  date: string;
  time: string;
  titleEn: string;
  titleZh: string;
  eventLink: string;
  locationEn: string;
  locationZh: string;
  addressEn: string;
  addressZh: string;
  video: string;
  descriptionEn: string;
  descriptionZh: string;
  mdNameEn: string;
  mdNameZh: string;
}

/** "6/14/2026" (sheet's M/D/YYYY) → "2026-06-14"; passes through ISO; else "". */
function toISO(raw: string): string {
  const s = (raw || '').trim();
  const mdy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mdy) return `${mdy[3]}-${mdy[1].padStart(2, '0')}-${mdy[2].padStart(2, '0')}`;
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) return `${iso[1]}-${iso[2].padStart(2, '0')}-${iso[3].padStart(2, '0')}`;
  return '';
}

const normCategory = (raw: string) => (raw || '').trim().toLowerCase().replace(/\s+/g, '-');

function toEvent(r: Record<string, string>): MusicEvent {
  const g = (k: string) => (r[k] ?? '').trim();
  return {
    type: g('type').toLowerCase() === 'past' ? 'past' : 'upcoming',
    category: normCategory(g('category')),
    date: toISO(g('date')),
    time: g('time'),
    titleEn: g('title_en'),
    titleZh: g('title_zh'),
    eventLink: g('event_link'),
    locationEn: g('event_location_en'),
    locationZh: g('event_location_zh'),
    addressEn: g('event_address_en'),
    addressZh: g('event_address_zh'),
    video: g('video'),
    descriptionEn: g('description_en'),
    descriptionZh: g('description_zh'),
    mdNameEn: g('md_name_en'),
    mdNameZh: g('md_name_zh'),
  };
}

let cache: Promise<MusicEvent[]> | null = null;

async function load(): Promise<MusicEvent[]> {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`music sheet fetch failed: ${res.status} ${res.statusText}`);
  const csv = await res.text();
  const parsed = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
  // keep only rows that actually have a title
  return parsed.data.map(toEvent).filter((e) => e.titleEn || e.titleZh);
}

/** All events (memoized once per build/process). */
export function getMusicEvents(): Promise<MusicEvent[]> {
  if (!cache) cache = load();
  return cache;
}

/**
 * Events of one type, sorted for display:
 *   upcoming → date ascending (soonest first)
 *   past     → date descending (most recently passed first)
 * Optionally filtered to a single category.
 */
export async function getEvents(type: EventType, category?: string): Promise<MusicEvent[]> {
  const all = await getMusicEvents();
  let list = all.filter((e) => e.type === type);
  if (category) list = list.filter((e) => e.category === category);
  list = [...list].sort((a, b) => a.date.localeCompare(b.date));
  if (type === 'past') list.reverse();
  return list;
}
