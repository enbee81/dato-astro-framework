import { LINK_QUERY } from "./link";

export const HIGHLIGHT_BOX_QUERY = `
  id
  _modelApiKey
  __typename
  text {
    value
    blocks
    links
  }
  cta {
    ${LINK_QUERY}
  }
`;
