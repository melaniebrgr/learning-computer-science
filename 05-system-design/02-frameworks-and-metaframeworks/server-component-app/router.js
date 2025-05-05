import { readFile, readdir } from 'fs/promises';
import sanitizeFilename from 'sanitize-filename';
import { BlogIndexPage, BlogPostPage } from './components/components.js';

export async function matchRoute(url) {
    if (url.pathname === "/") {
        // We're on the index route which shows every blog post one by one.
        // Read all the files in the posts folder, and load their contents.
        let postFiles;
        try {
        postFiles = await readdir("./posts");
        } catch (err) {
        throw new Error("Error reading posts");
        }
        const postSlugs = postFiles.map((file) => file.slice(0, file.lastIndexOf(".")));
        const postContents = await Promise.all(
        postSlugs.map((postSlug) =>
            readFile("./posts/" + postSlug + ".txt", "utf8")
        ));

        return <BlogIndexPage postSlugs={postSlugs} postContents={postContents} />;
        
    }

    if (url.pathname.startsWith("/") && url.pathname.length > 1) {
        // We're showing an individual blog post.
        // Read the corresponding file from the posts folder.
        const postSlug = sanitizeFilename(url.pathname.slice(1));
        let postContent;
        try {
            postContent = await readFile("./posts/" + postSlug + ".txt", "utf8");
            return <BlogPostPage postSlug={postSlug} postContent={postContent} />;
        } catch (err) {
            throw new Error("Error reading post content");
        }
    }
}