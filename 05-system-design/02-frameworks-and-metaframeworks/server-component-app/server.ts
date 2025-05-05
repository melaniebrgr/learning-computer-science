import { createServer } from 'http';
import { readFile } from 'fs/promises';
// import escapeHtml from  'escape-html';

createServer(async (req, res) => {
  const author = "Jane Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");

  
  res.setHeader("Content-Type", "text/html");
  res.end(
    `<html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>
          ${postContent}
          ${JSON.stringify(req)}
        </article>
        <footer>
          <hr>
          <p><i>(c) ${author}, ${new Date().getFullYear()}</i></p>
        </footer>
      </body>
    </html>`
  );
}).listen(8080);