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
  { label: 'github', href: 'https://github.com/maikurokosmos', icon: 'simple-icons:github' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/lucasm1997/', icon: 'simple-icons:linkedin' },
  { label: 'x', href: 'https://x.com/maikurokosmos', icon: 'simple-icons:x' },
  { label: 'youtube', href: 'https://www.youtube.com/@maikurokosmos', icon: 'simple-icons:youtube' },
];

// Chinese pages keep github + linkedin, swap the rest for Weibo + bilibili.
export const SOCIALS_ZH = [
  { label: 'github', href: 'https://github.com/maikurokosmos', icon: 'simple-icons:github' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/lucasm1997/', icon: 'simple-icons:linkedin' },
  { label: 'weibo', href: 'https://weibo.com/maikurokosmos', icon: 'simple-icons:sinaweibo' },
  { label: 'bilibili', href: 'https://space.bilibili.com/68570340', icon: 'simple-icons:bilibili' },
];

export const getSocials = (lang: Lang) => (lang === 'zh' ? SOCIALS_ZH : SOCIALS);

export const SECTIONS: Section[] = [
  {
    label: 'te(k)h',
    labelZh: '搞点技术',
    name: 'tech',
    nameZh: '技术',
    slug: 'tech',
    blurb:
      'i\'ll post some of my independent research about AI control and safety, some datasets about AI and linguistics, and some of the demos you can run on my website',
    blurbZh:
      '我会在这里发布一些独立的、但是小打小闹的关于AI控制和安全的研究，整理一些和AI+语言学相关的数据集，以及展示一些突发奇想的demo。',
    accent: '#881ed3',
    image: '/images/tekh.png',
    imagePos: 'left',
    children: [
      { label: 'writings', labelZh: '研究报告', slug: 'writings', blurb: 'long-form research and technical writing', blurbZh: '长篇研究与技术写作' },
      { label: 'datasets', labelZh: '数据集', slug: 'datasets', blurb: 'datasets i compile and release', blurbZh: '我整理并发布的数据集' },
      { label: 'tools & demos', labelZh: '工具与代码示例', slug: 'tools-and-demos', blurb: 'interactive demos you can run in the browser', blurbZh: '可在浏览器中运行的交互式 demo' },
    ],
  },
  {
    label: 'linguisti(k)s',
    labelZh: '学点语言',
    name: 'linguistics',
    nameZh: '语言学',
    slug: 'linguistics',
    blurb:
      'i\'ll share some readings of literary works and academic papers, and some of my own language learning insights.',
    blurbZh:
      '我会在这里创建一些文学作品阅读和学术作品阅读的分享专栏，以及分享一些我自己的语言学习心得。',
    accent: '#e736d3',
    image: '/images/linguistiks.png',
    imagePos: 'right',
    children: [
      { label: 'readings', labelZh: '文本阅读', slug: 'readings', blurb: 'reading notes and literature reviews', blurbZh: '阅读笔记与文献综述' },
      { label: 'analysis', labelZh: '语言学分析', slug: 'analysis', blurb: 'academic analysis of language and translation', blurbZh: '语言与翻译的学术分析' },
      { label: 'learnings', labelZh: '语言学习', slug: 'learnings', blurb: 'notes from learning languages, and writings to help foreigners learn chinese', blurbZh: '我学习各种语言的笔记，以及帮助外国人更好学习中文的文章' },
    ],
  },
  {
    label: 'musi(k)',
    labelZh: '玩点音乐',
    name: 'music',
    nameZh: '音乐',
    slug: 'music',
    blurb:
      'i\'ll share some of my solo, duet, and choir performances, some casual covers, and occasional music critiques (which is not professional).',
    blurbZh:
      '我会在这里分享一些我参与的独唱、重唱、合唱，以及以其他形式参与的音乐演出，以及发布一些并不专业的音乐翻唱，也许也会撰写一些半吊子的乐评。',
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
