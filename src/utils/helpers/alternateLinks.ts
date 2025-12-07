import { locales } from "@/utils/dato/i18n.js";

export interface AlternateLink {
  locale: string;
  url: string;
}

/**
 * Generates alternate links from _allSlugLocales data
 * @param allSlugLocales - Array of {value: string, locale: string} from DatoCMS
 * @param currentLocale - The current locale to exclude
 * @param urlPattern - Function that generates URL from locale and slug, e.g., (locale, slug) => `/${locale}/${slug}`
 * @returns Array of alternate links for other locales
 */
export function altLinksFromSlugs(
  allSlugLocales: Array<{ value: string; locale: string }>,
  currentLocale: string,
  urlPattern: (locale: string, slug: string) => string
): AlternateLink[] {
  return allSlugLocales
    .filter((item) => item.locale !== currentLocale)
    .map((item) => ({
      locale: item.locale,
      url: urlPattern(item.locale, item.value),
    }));
}

/**
 * Generates alternate links for simple locale-based pages (like index pages, category pages)
 * @param currentLocale - The current locale
 * @param urlPattern - Function that generates URL from locale, e.g., (locale) => `/${locale}/blog/`
 * @returns Array of alternate links for other locales
 */
export function generateAltLinksForLocale(
  currentLocale: string,
  urlPattern: (locale: string) => string
): AlternateLink[] {
  return locales
    .filter((locale) => locale !== currentLocale)
    .map((locale) => ({
      locale,
      url: urlPattern(locale),
    }));
}
