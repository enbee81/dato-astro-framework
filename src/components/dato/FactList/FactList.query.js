import { LINK_QUERY } from "@/utils/dato/queries/link";

export const FACT_LIST_QUERY = `
  id
  _modelApiKey
  __typename
  headline
  topline
  numbered
  cta {
    ${LINK_QUERY}
  }
  facts {
    headline
    description {
      value
    }
  }
`;
