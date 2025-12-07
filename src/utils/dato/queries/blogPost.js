import { BLOG_POST_CONTENT } from "./blogPostContent.js";

export const BLOG_POST_QUERY = `
  query BlogPostBySlug($slug: String!, $locale: SiteLocale) {
    blogPost(filter: {slug: {eq: $slug}}, locale: $locale, fallbackLocales: de) {
      ${BLOG_POST_CONTENT}
    }
  }
`;
