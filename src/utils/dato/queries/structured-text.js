import { HIGHLIGHT_BOX_QUERY } from "./highlightBox";
import { IMAGE_BLOCK_QUERY } from "./imageBlock";
import { QUOTE_QUERY } from "./quote";

export const STRUCTURED_TEXT_QUERY = `
  blocks {
    ... on QuoteRecord {
      ${QUOTE_QUERY}
    }
    ... on HighlightBoxRecord {
      ${HIGHLIGHT_BOX_QUERY}
    }
    ... on ImageRecord {
      ${IMAGE_BLOCK_QUERY}
    }
  }
  inlineBlocks
  links
  value
`;
