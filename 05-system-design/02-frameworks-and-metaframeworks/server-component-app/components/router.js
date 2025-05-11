import sanitizeFilename from 'sanitize-filename';
import { BlogIndexPage, BlogPostPage } from './components.js';

export function Router({ url }) {
    if (url.pathname === "/") {
        return <BlogIndexPage />;
    }
    
    if (url.pathname.startsWith("/") && url.pathname.length > 1
        && !url.pathname.includes("favicon.ico") && !url.pathname.includes("client.js")) {
        // If matchRoute doesn't explicitly handle paths like /favicon.ico, it would default to treating
        // the path as if it corresponds to a blog post in the ./posts directory and look for a filed 
        // named ./posts/favicon.ico.txt: `await readFile("./posts/" + postSlug + ".txt", "utf8")`
        
        const postSlug = sanitizeFilename(url.pathname.slice(1));
        return <BlogPostPage postSlug={postSlug} />;
    }
}