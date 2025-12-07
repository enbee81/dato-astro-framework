import { IMAGE_CONTENT_QUERY } from "./imageContent.js";
import { STRUCTURED_TEXT_QUERY } from "./structured-text.js";

export const MODULAR_CONTENT_QUERY = `
  content {
    ... on GalleryRecord {
      id
      _modelApiKey
      __typename
      images {
        ${IMAGE_CONTENT_QUERY}
      }
    }
    ... on StructuredTextRecord {
      id
      _modelApiKey
      __typename
      text {
        ${STRUCTURED_TEXT_QUERY}
      }
    }
  }
`;
