import { locales } from "@/utils/dato/i18n.js";

/**
 * Gets current locale from URL path
 */
export function getCurrentLocale(pathname: string): string {
  const segments = pathname.split("/");
  const possibleLocale = segments[1];

  if (locales.includes(possibleLocale)) {
    return possibleLocale;
  }

  return "de"; // fallback to default
}
