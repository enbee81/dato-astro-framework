import { IMAGE_BLOCK_QUERY } from "@/components/dato/ImageBlock/ImageBlock.query";
import { HIGHLIGHT_BOX_QUERY } from "../HighlightBox/highlightBox";
import { QUOTE_QUERY } from "../Quote/Quote.query";

export const STRUCTURED_TEXT_BLOCK_QUERY = `
id
_modelApiKey
__typename
text {
  blocks {
    ... on QuoteRecord {
      ${QUOTE_QUERY}
    }
    ... on HighlightBoxRecord {
      ${HIGHLIGHT_BOX_QUERY}
    }
    ... on ImageBlockRecord {
      ${IMAGE_BLOCK_QUERY}
    }
  }
  inlineBlocks
  links
  value
}
`;
