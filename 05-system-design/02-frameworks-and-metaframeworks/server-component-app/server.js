import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { renderJSXToHTML } from './utils/renderJsx.js';

createServer(async (req, res) => {
  const author = "Jane Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");

  res.setHeader("Content-Type", "text/html");
  res.end(
    renderJSXToHTML(
      <html>
        <head>
          <title>My blog</title>
        </head>
        <body>
          <nav>
            <a href="/">Home</a>
            <hr />
          </nav>
          <article>
            {postContent}
          </article>
          <footer>
          <hr />
          <p><i>(c) {author}, {new Date().getFullYear()}</i></p>
        </footer>
        </body>
      </html>));
}).listen(8080);