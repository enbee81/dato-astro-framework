import { BLOG_POST_CONTENT } from "./blogPostContent.js";

export const BLOG_POSTS_QUERY = `
  query ($locale: SiteLocale) {
    allBlogPosts(locale: $locale, fallbackLocales: de, orderBy: date_DESC) {
      ${BLOG_POST_CONTENT}
    }
  }
`;
