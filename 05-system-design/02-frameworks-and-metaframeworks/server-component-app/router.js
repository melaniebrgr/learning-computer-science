import sanitizeFilename from 'sanitize-filename';
import { BlogIndexPage, BlogPostPage } from './components/components.js';

export function matchRoute(url) {
    if (url.pathname === "/") {
        return <BlogIndexPage />;
    }

    if (url.pathname.startsWith("/") && url.pathname.length > 1) {
        const postSlug = sanitizeFilename(url.pathname.slice(1));
        return <BlogPostPage postSlug={postSlug} />;
    }
}