import { IMAGE_CONTENT_QUERY } from "@/utils/dato/queries/imageContent";

export const LOGO_WALL_QUERY = `
  id
  _modelApiKey
  __typename
  headline
  description {
    value
  }
  logos {
    ${IMAGE_CONTENT_QUERY}
  }
`;
