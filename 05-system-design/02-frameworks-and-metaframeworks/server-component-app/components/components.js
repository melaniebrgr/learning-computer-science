export function BlogIndexPage({ postSlugs, postContents }) {
  return (
    <BlogLayout>
      {postSlugs.map((postSlug, index) => (
        <section key={postSlug}>
          <h2>
            <a href={"/" + postSlug}>{postSlug}</a>
          </h2>
          <article>{postContents[index]}</article>
        </section>
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
      <section>
        <h2>
            <a href={"/" + postSlug}>{postSlug}</a>
        </h2>
        <article>{postContent}</article>
      </section>
    </BlogLayout>
  );
}

function Footer({ author}) {
  return (
    <footer>
      <hr />
      <p><i>(c) {author}, {new Date().getFullYear()}</i></p>
    </footer>
  )
}