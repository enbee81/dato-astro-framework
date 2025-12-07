import { datoRequest } from "./datoRequest.js";

// Fetch locales data using the simplified datoRequest function
async function fetchLocales() {
  const data = await datoRequest(`
    {
      _site {
        locales
      }
    }
  `);

  // Return fallback if no data
  return data || { _site: { locales: ["de"] } };
}

const data = await fetchLocales();

// Export the locales data for use in other files
export const localesData = data;
export const locales = data._site.locales;
