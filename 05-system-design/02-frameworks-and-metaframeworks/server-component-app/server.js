import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { renderJSXToHTML, renderJSXToClientJSX } from './utils/renderJsx.js';
import { Router } from './components/router.js';

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname.endsWith('/favicon.ico')) {
    await sendNothing(res);
  } else if (url.pathname === "/client.js") {
    await sendScript(res, "client.js");
  } else if (url.searchParams.has("jsx")) {
    url.searchParams.delete("jsx"); // Keep the url passed to the <Router> clean
    await sendJSX(res, url);
  } else {
    await sendHTML(res, url);
  }
}).listen(8080);

async function sendScript(res, filename) {
  const content = await readFile(filename, "utf8");
  res.setHeader("Cache-Control", "no-store"); 
  res.setHeader("Content-Type", "text/javascript");
  res.end(content);
}

async function sendJSX(res, url) {
  const jsx = <Router url={url} />;
  const clientJsx = await renderJSXToClientJSX(jsx);
  const clientJsxString = JSON.stringify(clientJsx, null, 2); // Indent with two spaces.
  res.setHeader("Content-Type", "application/json");
  res.end(clientJsxString);
}

async function sendHTML(res, url) {
  const jsx = <Router url={url} />
  let html = await renderJSXToHTML(jsx);
  html += `
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@canary",
          "react-dom/client": "https://esm.sh/react-dom@canary/client"
        }
      }
    </script>
    <script type="module" src="/client.js"></script>`;
  res.setHeader("Cache-Control", "no-store"); 
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}

async function sendNothing(res) {
  res.writeHead(204, {
    "Cache-Control": "no-store"
  });
  res.end();
}
