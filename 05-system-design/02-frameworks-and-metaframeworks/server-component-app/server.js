import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { renderJSXToHTML } from './utils/renderJsx.js';

import { matchRoute } from './router.js';

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname.endsWith('/favicon.ico')) {
    await sendNothing(res);
  } else if (url.pathname === "/client.js") {
    await sendScript(res, "client.js");
  } else {
    await sendHTML(res, url);
  }
}).listen(8080);

async function sendScript(res, filename) {
  const content = await readFile(filename, "utf8");
  res.setHeader("Content-Type", "text/javascript");
  res.setHeader("Cache-Control", "no-store"); 
  res.end(content);
}

async function sendHTML(res, url) {
  const pageJsx = matchRoute(url);
  const html = await renderJSXToHTML(pageJsx)
    + `<script type="module" src="/client.js"></script>`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "no-store"); 
  res.end(html);
}

async function sendNothing(res) {
  res.writeHead(204, {
    "Cache-Control": "no-store"
  });
  res.end();
}
