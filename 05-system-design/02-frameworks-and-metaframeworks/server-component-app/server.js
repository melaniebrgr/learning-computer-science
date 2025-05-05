import { createServer } from 'http';
import { renderJSXToHTML } from './utils/renderJsx.js';

import { matchRoute } from './router.js';

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname.endsWith('/favicon.ico')) {
    // Handle favicon.ico requests
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  const page = matchRoute(url);
  res.setHeader("Content-Type", "text/html");
  res.end(await renderJSXToHTML(page));
}).listen(8080);