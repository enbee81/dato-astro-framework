import { MODULAR_CONTENT_QUERY } from "./modularContent.js";

export const VARIABLE_PAGES_QUERY = `
  query ($locale: SiteLocale) {
    allVariablePages(locale: $locale, fallbackLocales: de) {
      __typename
      _modelApiKey
      id
      _seoMetaTags {
        tag
        content
        attributes
      }
      _allSlugLocales {
        value
        locale
      }
      title
      slug
      content {
        ${MODULAR_CONTENT_QUERY}
      }
    }
  }
`;
