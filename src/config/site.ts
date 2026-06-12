// Global site config — single source of truth for nav, sections, and subsections.
// label = stylized display title (the playful c→k spelling), name = correct plain
// spelling, slug = route. *Zh fields hold the Chinese equivalents.

import type { Lang } from '../i18n/ui';

export interface SubSection {
  label: string;
  labelZh: string;
  slug: string;
  blurb: string;
  blurbZh: string;
}

export interface Section {
  /** Stylized display title with the playful c→k spelling, e.g. "te(k)h" */
  label: string;
  /** Playful Chinese display title, e.g. "搞点技术" */
  labelZh: string;
  /** Correct plain spelling, e.g. "tech" — used for chips, meta & a11y */
  name: string;
  /** Correct plain Chinese name, e.g. "技术" */
  nameZh: string;
  /** Route slug (kept correct so URLs are unaffected), e.g. "tech" */
  slug: string;
  /** Plain description (no markup) */
  blurb: string;
  blurbZh: string;
  accent: string;
  /** Section illustration (PNG in public/images) */
  image: string;
  /** Horizontal focus of the faded background illustration on the homepage card */
  imagePos: 'left' | 'right' | 'center';
  children: SubSection[];
}

export const SITE = {
  title: 'maikurokosmos',
  description: 'Personal site for tech, linguistics, and music.',
  url: 'https://www.maikurokosmos.com',
};

// Social links shown in the hero, below the buttons.
// ⚠️ Replace the placeholder hrefs ('#') with your real URLs.
export const SOCIALS = [
  { label: 'github', href: '#', icon: 'simple-icons:github' },
  { label: 'linkedin', href: '#', icon: 'simple-icons:linkedin' },
  { label: 'x', href: '#', icon: 'simple-icons:x' },
  { label: 'youtube', href: '#', icon: 'simple-icons:youtube' },
];

export const SECTIONS: Section[] = [
  {
    label: 'te(k)h',
    labelZh: '搞点技术',
    name: 'tech',
    nameZh: '技术',
    slug: 'tech',
    blurb:
      'independent research on AI safety and control, dataset releases, and interactive demos you can run right in the browser.',
    blurbZh:
      '关于 AI 安全与控制的独立研究、数据集发布，以及可以直接在浏览器里运行的交互式 demo。',
    accent: '#881ed3',
    image: '/images/tekh.png',
    imagePos: 'left',
    children: [
      { label: 'writings', labelZh: '写作', slug: 'writings', blurb: 'long-form research and technical writing', blurbZh: '长篇研究与技术写作' },
      { label: 'datasets', labelZh: '数据集', slug: 'datasets', blurb: 'datasets i compile and release', blurbZh: '我整理并发布的数据集' },
      { label: 'tools & demos', labelZh: '工具与 demo', slug: 'tools-and-demos', blurb: 'interactive demos you can run in the browser', blurbZh: '可在浏览器中运行的交互式 demo' },
    ],
  },
  {
    label: 'linguisti(k)s',
    labelZh: '学点语言',
    name: 'linguistics',
    nameZh: '语言学',
    slug: 'linguistics',
    blurb:
      'reading notes and close analysis, from sociolinguistics to the translation of books, journals, and more.',
    blurbZh:
      '阅读笔记与文本细读，从社会语言学到书籍、期刊等的翻译分析。',
    accent: '#e736d3',
    image: '/images/linguistiks.png',
    imagePos: 'right',
    children: [
      { label: 'readings', labelZh: '研读', slug: 'readings', blurb: 'reading notes and literature reviews', blurbZh: '阅读笔记与文献综述' },
      { label: 'analysis', labelZh: '分析', slug: 'analysis', blurb: 'close analysis of language and translation', blurbZh: '语言与翻译的细读分析' },
    ],
  },
  {
    label: 'musi(k)',
    labelZh: '玩点音乐',
    name: 'music',
    nameZh: '音乐',
    slug: 'music',
    blurb:
      'the performances I take part in, choir and casual covers, the occasional critique, and future original work.',
    blurbZh:
      '我参与的演出、合唱与随性翻唱、偶尔的乐评，以及未来的原创作品。',
    accent: '#b42ed0',
    image: '/images/musik.png',
    imagePos: 'center',
    children: [
      { label: 'solo', labelZh: '独唱独奏', slug: 'solo', blurb: 'solo singing and playing', blurbZh: '独唱与独奏' },
      { label: 'choir', labelZh: '合唱', slug: 'choir', blurb: 'choir works and performances', blurbZh: '合唱作品与演出' },
      { label: 'casual cover', labelZh: '随性翻唱', slug: 'casual-cover', blurb: 'casual covers', blurbZh: '随性翻唱' },
      { label: 'critique', labelZh: '乐评', slug: 'critique', blurb: 'music critique and appreciation', blurbZh: '音乐评论与赏析' },
    ],
  },
];

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getSubSection(sectionSlug: string, subSlug: string) {
  const section = getSection(sectionSlug);
  const sub = section?.children.find((c) => c.slug === subSlug);
  return section && sub ? { section, sub } : undefined;
}

// —— locale-aware accessors (keep components clean) ——
export const secLabel = (s: Section, lang: Lang) => (lang === 'zh' ? s.labelZh : s.label);
export const secName = (s: Section, lang: Lang) => (lang === 'zh' ? s.nameZh : s.name);
export const secBlurb = (s: Section, lang: Lang) => (lang === 'zh' ? s.blurbZh : s.blurb);
export const subLabel = (c: SubSection, lang: Lang) => (lang === 'zh' ? c.labelZh : c.label);
export const subBlurb = (c: SubSection, lang: Lang) => (lang === 'zh' ? c.blurbZh : c.blurb);

// Date format. EN: "YYYY Mon DD" (May/June/July full, Sept). ZH: "YYYY年M月D日".
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export function formatDate(iso: string, lang: Lang = 'en'): string {
  const d = new Date(iso);
  const year = d.getUTCFullYear();
  if (lang === 'zh') return `${year}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
  const month = MONTHS[d.getUTCMonth()];
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year} ${month} ${day}`;
}
