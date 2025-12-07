import { locales } from "@/utils/dato/i18n.js";

const pathPrefixMap = {
  blog_post: "/blog/",
  variable_page: "/",
};

export const getItemPath = (item: Record<string, any>) => {
  if (!item || !item._modelApiKey || !item.slug) return "#";

  // Priority: provided locale > item.locale > first available locale fallback
  const resolvedLocale = item.locale || locales[0];

  // Check if modelApiKey exists in pathPrefixMap
  const prefix = pathPrefixMap[item._modelApiKey];
  if (prefix === undefined) {
    console.error(
      `⚠️ Missing path prefix mapping for model "${item._modelApiKey}". ` +
        `Please add it to pathPrefixMap in src/utils/helpers/getItemPath.ts ⚠️`
    );
    // Use empty prefix as fallback
    return `/${resolvedLocale}/${item.slug}`;
  }

  // Include locale in the path: /{locale}{prefix}{slug}
  return `/${resolvedLocale}${prefix}${item.slug}`;
};
