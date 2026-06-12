import { ui, defaultLang, type Lang } from './ui';

/** Detect the active locale from the URL (the `/zh/...` prefix). */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return seg === 'zh' ? 'zh' : 'en';
}

/** Returns a `t(key)` translator bound to a locale, falling back to English. */
export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  };
}

/**
 * Prefix a canonical (English) path with the locale.
 * localizedHref('/tech', 'zh') -> '/zh/tech' ; (…, 'en') -> '/tech'
 */
export function localizedHref(path: string, lang: Lang): string {
  if (lang !== 'zh') return path;
  if (path === '/') return '/zh';
  return '/zh' + path;
}

/** Same page in the other locale — used by the language switcher. */
export function switchLocalePath(url: URL, target: Lang): string {
  const base = url.pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
  return localizedHref(base, target);
}
