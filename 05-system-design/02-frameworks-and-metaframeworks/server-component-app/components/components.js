import { readFile, readdir } from 'fs/promises';

export async function BlogIndexPage() {
  // We're on the index route which shows every blog post one by one.
  // Read all the files in the posts folder, and load their contents.
  const postFiles = await readdir("./posts");
  const postSlugs = postFiles.map((file) => file.slice(0, file.lastIndexOf(".")));

  return (
    <BlogLayout>
      {postSlugs.map((postSlug) => (
        <Post postSlug={postSlug} />
      ))}
    </BlogLayout>
  );
}

export function BlogLayout({ children }) {
  const author = "Jane Doe";
  
  return (
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <main>
          {children}
        </main>
        <Footer author={author} />
      </body>
    </html>
  );
}
  
export function BlogPostPage({ postSlug }) {
  return (
    <BlogLayout>
      <Post postSlug={postSlug} />
    </BlogLayout>
  );
}

async function Post({ postSlug }) {
  // We're showing an individual blog post.
  // Read the corresponding file from the posts folder.
  const postContent = await readFile("./posts/" + postSlug + ".txt", "utf8");
  
  return (
    <section>
      <h2>
          <a href={"/" + postSlug}>{postSlug}</a>
      </h2>
      <article>{postContent}</article>
    </section>
  )
}

function Footer({ author}) {
  return (
    <footer>
      <hr />
      <p><i>(c) {author}, {new Date().getFullYear()}</i></p>
    </footer>
  )
}