import { IMAGE_CONTENT_QUERY } from "./imageContent.js";
import { STRUCTURED_TEXT_QUERY } from "./structured-text.js";

export const BLOG_POST_CONTENT = `
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
  date
  heroImage {
    ${IMAGE_CONTENT_QUERY}
  }
  content {
    text {
      ${STRUCTURED_TEXT_QUERY}
    }
  }
`;
