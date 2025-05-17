# Describing what's happening

## A simple application server

I have a simple server with Node HTTP server. I make request to "localhost:8080" from my machine, and the server that I'm running locally responds. The Node server exposes request and response objects as arguments. The request object represents the details of the inbound request. The response object is the response that the server sends to the client. `nodemon` automatically restarts the server when file changes are detected in the directory.

## A custom node module loader

When we start the server use the flag `--experimental-loader` which specifies a
the custom module loader, `node-jsx-loader.js`. A module loader, "controls how the module is loaded by the Node JS application". Illuminating. This code processes the file before Node _executes_ it. Typically loaders are used to transform code, i.e. to support non-standard syntax like JSX, or apply custom module resolution. I logged the output from the `@babel/plugin-transform-react-jsx` babel plugin, and it transforms the `server.js` file content to,

```txt
"import { createServer } from 'http';\n" +
    "import { readFile } from 'fs/promises';\n" +
    "import { renderJSXToHTML } from './utils/renderJsx.js';\n" +
    'import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";\n' +
    'createServer(async (req, res) => {\n' +
    '  const author = "Jane Doe";\n' +
    '  const postContent = await readFile("./posts/hello-world.txt", "utf8");\n' +
    '  res.setHeader("Content-Type", "text/html");\n' +
    '  res.end(renderJSXToHTML(/*#__PURE__*/_jsxs("html", {\n' +
    '    children: [/*#__PURE__*/_jsx("head", {\n' +
    '      children: /*#__PURE__*/_jsx("title", {\n' +
    '        children: "My blog"\n' +
    '      })\n' +
    '    }), /*#__PURE__*/_jsxs("body", {\n' +
    '      children: [/*#__PURE__*/_jsxs("nav", {\n' +
    '        children: [/*#__PURE__*/_jsx("a", {\n' +
    '          href: "/",\n' +
    '          children: "Home"\n' +
    '        }), /*#__PURE__*/_jsx("hr", {})]\n' +
    '      }), /*#__PURE__*/_jsx("article", {\n' +
    '        children: postContent\n' +
    '      }), /*#__PURE__*/_jsxs("footer", {\n' +
    '        children: [/*#__PURE__*/_jsx("hr", {}), /*#__PURE__*/_jsx("p", {\n' +
    '          children: /*#__PURE__*/_jsxs("i", {\n' +
    '            children: ["(c) ", author, ", ", new Date().getFullYear()]\n' +
    '          })\n' +
    '        })]\n' +
    '      })]\n' +
    '    })]\n' +
    '  })));\n' +
    '}).listen(8080);'
```

Notice how it even added a jsx function import to the file. This is why React had to be installed as a dependency, even though the file I made didn't use it directly: it is required when Node executes the loaded code later. Pretty cool. Babel was meant to transpile modern JS features that weren't in browsers yet to a more broadly supported syntax, but with its plugin architecture, basically the sky is the limit in terms of code modifications before execution.

## Transforming JSX and shipping HTML

I assume that _when_ the jsx function is called, the output is a JSON structure describing the React component tree. Yes it does, indeed. I logged out what the value of the `renderJSXToHTML` function accepts as an argument. It receivs something like the following input JSON structure, i.e. this is what jsx syntax is transformed to by the jsx runtime:

```js
{
  $$typeof: Symbol(react.transitional.element),
  type: "html",
  key: null,
  props: {
    children: [
      {
        $$typeof: Symbol(react.transitional.element),
        type: "head",
        key: null,
        props: {
          children: {
            $$typeof: Symbol(react.transitional.element),
            type: "head",
            key: null,
            props: {
              children: {
                $$typeof: Symbol(react.transitional.element),
                type: "title",
                key: null,
                props: {
                  $$typeof: Symbol(react.transitional.element),
                  type: "title",
                  key: null,
                  props: { children: "My blog" },
                  _owner: null,
                  _store: {},
                },
                _owner: null,
                _store: {},
              },
            },
            _owner: null,
            _store: {},
          },
        },
        _owner: null,
        _store: {},
      },
      {
        $$typeof: Symbol(react.transitional.element),
        type: "body",
        key: null,
        props: {
          children: [
            {
              $$typeof: Symbol(react.transitional.element),
              type: "nav",
              key: null,
              props: {
                children: [
                  {
                    $$typeof: Symbol(react.transitional.element),
                    type: "a",
                    key: null,
                    props: { href: "/", children: "Home" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    $$typeof: Symbol(react.transitional.element),
                    type: "hr",
                    key: null,
                    props: {},
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
            {
              $$typeof: Symbol(react.transitional.element),
              type: "article",
              key: null,
              props: {
                children:
                  "Hi everyone! This is my first blog post. I <3 React!",
              },
              _owner: null,
              _store: {},
            },
            {
              $$typeof: Symbol(react.transitional.element),
              type: "footer",
              key: null,
              props: {
                children: [
                  {
                    $$typeof: Symbol(react.transitional.element),
                    type: "hr",
                    key: null,
                    props: {},
                    _owner: null,
                    _store: {},
                  },
                  {
                    $$typeof: Symbol(react.transitional.element),
                    type: "p",
                    key: null,
                    props: {
                      children: {
                        $$typeof: Symbol(react.transitional.element),
                        type: "i",
                        key: null,
                        props: { children: ["(c) ", "Jane Doe", ", ", 2025] },
                        _owner: null,
                        _store: {},
                      },
                    },
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
          ],
        },
        _owner: null,
        _store: {},
      },
    ],
  },
  _owner: null,
  _store: {},
};
```

The this JSX JSON (JSX AST?) is transformed to HTML output and sent over the wire.

## Server-side rendering (SSR)

So, stepwise what happens is,

1. **Step 1: Loading**
    1. Execute the `server.js` node file with a custom loader with plugin, `@babel/plugin-transform-react-jsx`
    2. Apply `@babel/plugin-transform-react-jsx`, to insert a jsx-runtime module import, remove the <> brackets and replace them with jsx function calls with children objects arguments.
2. **Step 3: Executing**
    1. Execute the transformed file in Node. The `jsx` function calls produce the JSON structure of the component tree.
    2. A custom `renderJSXToHTML` then converts this to HTML.
3. HTML is served to our client.

Also, _that_ was SSR: "Turning JSX into an HTML string is usually known as "Server-Side Rendering" (SSR)".
After this we added some polish and turned it into a "real app" by adding routes, and refactoring into custom components.

## Async serverish components

It's not server components yet, but the essense is starting to take shape and it was actually not a big deal to do. It's "just" making the utility that does the SSR, `renderJSXToHTML`, support async functions so we can have async custom components (functions) that can `await` data within their function bodies. Then instead of having an async router that fetched the page data and prop drilled that data down (sounds like pages router), we teach the SSR util to await individual components. It simplidies the router a lot, and the data fetch is localised to component that needs it. TL;DR make `renderJSXToHTML` async so custom components can be awaited. The current implementation is all-or-nothing, serially awaiting async components, but a more optimal solution can be implemented where async components are awaited in parallel, and/or sent to the client later.

## Client side routing

At this point we have an app that ships the full HTML payload for the entire page on navigation. On any route change, we completey blow away the current DOM state. How can we make this more efficient and only change what needs to be updated though? Add client-side JS to intercept navigations so we can refetch content manually without reloading the page:

1. In the initial HTML payload include a script tag to load the client-side script.
2. In the client-side script, apply a click event listener to the global window object that intercepts links to internal routes only.
3. On the click intercept programmatically update browser history and call a function to fetch the JSX JSON for the route.
4. Apply JSX updates without destroying the whole DOM.

// Step 5.3.2
