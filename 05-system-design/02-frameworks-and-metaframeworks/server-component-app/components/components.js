export function BlogIndexPage({ postSlugs, postContents }) {
  return (
    <BlogLayout>
      {postSlugs.map((postSlug, index) => (
        <Post postSlug={postSlug} postContent={postContents[index]} />
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
  
export function BlogPostPage({ postContent, postSlug }) {
  return (
    <BlogLayout>
      <Post postSlug={postSlug} postContent={postContent} />
    </BlogLayout>
  );
}

function Post({ postSlug, postContent }) {
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