import { ENDPOINT_URL, LIVE_PREVIEW } from "astro:env/client";
import { DATOCMS_API_KEY } from "astro:env/server";
import { locales } from "./i18n.js";

export async function datoRequest(
  query: string,
  variables?: Record<string, any>
) {
  const endpoint = LIVE_PREVIEW
    ? new URL("/preview", ENDPOINT_URL)
    : ENDPOINT_URL;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${DATOCMS_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();
  if (json.errors) {
    console.error("DatoCMS API Error:", JSON.stringify(json.errors));
    return {};
  }

  return json.data;
}

export async function taggedDatoRequest(
  query: string,
  variables?: Record<string, any>
) {
  const endpoint = LIVE_PREVIEW
    ? new URL("/preview", ENDPOINT_URL)
    : ENDPOINT_URL;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${DATOCMS_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();
  if (json.errors) {
    console.error("DatoCMS API Error:", JSON.stringify(json.errors));
    return {};
  }

  // Always add locale to the data (use first locale as fallback if not provided)
  if (!json.data) {
    return {};
  }

  const locale = variables?.locale || locales[0];
  const taggedData = {};

  // Iterate through each key in json.data
  for (const [key, value] of Object.entries(json.data)) {
    if (Array.isArray(value)) {
      // If it's an array (collection), add locale to each item
      taggedData[key] = value.map((item) =>
        item && typeof item === "object" ? { ...item, locale } : item
      );
    } else if (value && typeof value === "object") {
      // If it's a single object (entity), add locale to it
      taggedData[key] = { ...value, locale };
    } else {
      // If it's neither array nor object, keep as is
      taggedData[key] = value;
    }
  }
  return taggedData;
}
