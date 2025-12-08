import { FACT_LIST_QUERY } from "../FactList/FactList.query.js";
import { GALLERY_QUERY } from "../Gallery/Gallery.query.js";
import { STRUCTURED_TEXT_BLOCK_QUERY } from "../StructuredTextBlock/StructuredTextBlock.query.js";
import { TEST_BLOCK_QUERY } from "../TestBlock/TestBlock.query.js";
import { LOGO_WALL_QUERY } from "../LogoWall/LogoWall.query.js";
import { ACCORDION_LIST_QUERY } from "../AccordionList/AccordionList.query.js";

export const MODULAR_CONTENT_QUERY = `
  content {
    ... on GalleryRecord {
      ${GALLERY_QUERY}
    }
    ... on StructuredTextRecord {
      ${STRUCTURED_TEXT_BLOCK_QUERY}
    }
    ... on TestBlockRecord {
      ${TEST_BLOCK_QUERY}
    }
    ... on LogoWallRecord {
      ${LOGO_WALL_QUERY}
    }
    ... on AccordionListRecord {
      ${ACCORDION_LIST_QUERY}
    }
    ... on FactListRecord {
      ${FACT_LIST_QUERY}
    }
  }
`;
