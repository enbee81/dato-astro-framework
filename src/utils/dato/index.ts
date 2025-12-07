import { taggedDatoRequest } from "./datoRequest.js";
import { locales as availableLocales } from "./i18n.js";

const isProduction = import.meta.env.PROD;

let locales: string[];

/** Reduced number of locales during dev-mode */
if (isProduction) {
  locales = availableLocales;
} else {
  locales = ["de", "en"];
}

/**
 * Fetches any DatoCMS model in all locales.
 *
 * @param {string} query         GraphQL query
 * @param {string} key           JSON key in the Dato response
 * @returns {Array<Object>}      unified array with locale information
 */
export async function fetchDatoForAllLocales(query: string, key: string) {
  const tasks = locales.map(async (locale) => {
    try {
      const json = await taggedDatoRequest(query, { locale });
      const result = json[key];
      return result;
    } catch (err) {
      console.error(`⚠️ ${key} failed for locale "${locale}"`, err);
      return []; // keep build alive; you can throw instead
    }
  });

  // tasks → [ [ …deItems ], [ …enItems ], … ] → flat array
  const perLocaleArrays = await Promise.all(tasks);

  return perLocaleArrays.flat();
}
