import { FACT_LIST_QUERY } from "../FactList/FactList.query.js";
import { GALLERY_QUERY } from "../Gallery/Gallery.query.js";
import { STRUCTURED_TEXT_BLOCK_QUERY } from "../StructuredTextBlock/StructuredTextBlock.query.js";

export const MODULAR_CONTENT_QUERY = `
  content {
    ... on GalleryRecord {
      ${GALLERY_QUERY}
    }
    ... on StructuredTextRecord {
      ${STRUCTURED_TEXT_BLOCK_QUERY}
    }
    ... on FactListRecord {
      ${FACT_LIST_QUERY}
    }
  }
`;
