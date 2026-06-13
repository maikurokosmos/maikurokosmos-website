// Central translation dictionary for fixed UI strings.
// Section/subsection content lives in `site.ts` (with zh fields); page-level
// prose lives here. Add a key in both `en` and `zh`.

export const languages = { en: 'EN', zh: '中' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui: Record<Lang, Record<string, string>> = {
  en: {
    // —— chrome ——
    'nav.about': 'about',
    'footer.tagline': 'tech · linguistics · music',
    'footer.about': 'about',
    'crumb.home': 'home',
    'common.comingSoon': 'coming soon',

    // —— home ——
    'home.heroTitle': 'from sounds,\nfrom text,\nfor human',
    'home.heroIntro':
      'Hi, and welcome to Kaiyu’s personal hub, “maikurokosmos”. I’m sharing a few things here: my independent research on AI safety and control (especially the bias embedded in AI), my learning in (socio-)linguistics, and my own work in music, including the events I take part in, the songs I cover, and the occasional music critique. Feel free to reach out, or follow me on my other social media!',
    'home.ctaAbout': 'about me',
    'home.ctaExplore': 'explore',
    'home.sectionsEyebrow': 'Sections',
    'home.sectionsHeading': "what's here",
    'home.latestEyebrow': 'Latest',
    'home.latestHeading': 'recent updates',
    'home.latestNote': '(Placeholder examples for now; real posts will appear here once published.)',
    'home.slogan': 'AI CONTROL RESEARCH ✦ LINGUISTIC LEARNING & SHARING ✦ MUSIC PORTFOLIO ✦ ',

    // —— about ——
    'about.eyebrow': 'about',
    'about.title': 'about me',
    'about.lead':
      "Hi, I'm maikurokosmos. This site is where I collect and share things across the three areas I keep coming back to.",
    'about.body':
      "This is placeholder copy for now. You can replace it with a real introduction later: your research interests, what you're working on, how to get in touch, and so on.",
    'about.whatHeading': 'what i write about',
    'about.portrait': 'portrait / image',

    // —— placeholder subsection ——
    'ph.body': 'This subsection is being prepared. Posts and works will appear here once published.',
    'ph.back': 'Back to',

    // —— readings ——
    'readings.title': 'readings',
    'readings.lead': 'close-reading projects and quick notes on language, translation, and books.',
    'readings.series': 'series',
    'readings.casual': 'casual notes',
    'readings.openSeries': 'open series →',

    // —— harry potter series / chapter ——
    'hp.readingSeries': 'reading series',
    'hp.books': 'books',
    'hp.intro': 'intro',
    'hp.onThisPage': 'on this page',
  },
  zh: {
    // —— chrome ——
    'nav.about': '关于',
    'footer.tagline': '技术 · 语言学 · 音乐',
    'footer.about': '关于',
    'crumb.home': '首页',
    'common.comingSoon': '即将上线',

    // —— home ——
    'home.heroTitle': '从声音，\n从文字，\n为人而作',
    'home.heroIntro':
      '你好，欢迎来到 Kaiyu 的个人主页“开启微观宇宙”。我在这里分享几件事：关于 AI 安全与控制的独立研究（尤其是 AI 中潜藏的偏见）、我在（社会）语言学方面的学习，以及我自己的音乐作品——包括我参与的演出、翻唱的歌曲，还有偶尔的乐评。欢迎联系我，或者在我的其他社交平台上关注我！',
    'home.ctaAbout': '关于我',
    'home.ctaExplore': '逛逛',
    'home.sectionsEyebrow': '板块',
    'home.sectionsHeading': '这里有什么',
    'home.latestEyebrow': '最新',
    'home.latestHeading': '近期更新',
    'home.latestNote': '（暂为示例；正式发布后这里会显示真实内容。）',
    'home.slogan': 'AI 控制研究 ✦ 语言学习与分享 ✦ 音乐作品集 ✦ ',

    // —— about ——
    'about.eyebrow': '关于',
    'about.title': '关于我',
    'about.lead': '你好，我是 maikurokosmos。这个网站汇集并分享我一直在回顾的三个领域的内容。',
    'about.body': '这里暂时是占位文字。以后可以替换成真正的自我介绍：你的研究兴趣、正在做的事、联系方式等等。',
    'about.whatHeading': '我都写些什么',
    'about.portrait': '头像 / 配图',

    // —— placeholder subsection ——
    'ph.body': '这个子板块正在筹备中，发布后内容会显示在这里。',
    'ph.back': '返回',

    // —— readings ——
    'readings.title': '研读',
    'readings.lead': '关于语言、翻译与书籍的细读项目和随手笔记。',
    'readings.series': '系列',
    'readings.casual': '随手笔记',
    'readings.openSeries': '进入系列 →',

    // —— harry potter series / chapter ——
    'hp.readingSeries': '阅读系列',
    'hp.books': '书目',
    'hp.intro': '导读',
    'hp.onThisPage': '本页目录',
  },
};
