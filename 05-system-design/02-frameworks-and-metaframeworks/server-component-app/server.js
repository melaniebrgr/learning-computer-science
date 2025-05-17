import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { renderJSXToHTML, renderJSXToClientJSX, stringifyJSX } from './utils/renderJsx.js';
import { Router } from './components/router.js';

const ROUTE_LIST = [
  // This could be generated from the file system...
  "/",
  "/simple-http-server",
  "/hello-world",
  "/custom-node-module-loader",
];

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/client.js") {
      await sendScript(res, "client.js");
    } else if (url.searchParams.has("jsx")) {
      url.searchParams.delete("jsx"); // Keep the url passed to the <Router> clean
      await sendJSX(res, url);
    } else if (ROUTE_LIST.includes(url.pathname)) {
      await sendHTML(res, url);
    } else {
      /* Chrome dev tools and extensions send requests to the server that
        are not part of the app. We only want to handle known requests for supported
        routes and don't want to send an 404 error response for others. */
      await sendNothing(res)
    }
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
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
  const clientJsxString = JSON.stringify(clientJsx, stringifyJSX);
  res.setHeader("Content-Type", "application/json");
  res.end(clientJsxString);
}

async function sendHTML(res, url) {
  const jsx = <Router url={url} />
  let [html, clientJsx] = await Promise.all([
    renderJSXToHTML(jsx),
    renderJSXToClientJSX(jsx)
  ]);
   const clientJSXString = JSON.stringify(clientJsx, stringifyJSX);
  html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
  html += JSON.stringify(clientJSXString).replace(/</g, "\\u003c");
  html += `</script>`;
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
