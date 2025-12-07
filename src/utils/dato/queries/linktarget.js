export const LINKTARGET_QUERY = `
  externalLink
  internalLink {
    ... on VariablePageRecord {
      _modelApiKey
      __typename
      id
      slug
    }
    ... on BlogPostRecord {
      _modelApiKey
      __typename
      id
      slug
    }
  }
  newWindow
`;
