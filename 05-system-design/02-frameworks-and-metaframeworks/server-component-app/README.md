# Describing what's happening

## Server simple HTML from machine

I have a simple server with Node HTTP server. I make request to "localhost:8080" from my machine, and the server that I'm running locally responds. The Node server exposes as arguments request and response objects. The request object representing the details of the inbound request. The response object the response that the server is sending to the client. `nodemon` automatically restarts the server when file changes in the directory are detected.

## Custom node module loader

When we start the server use the flag `--experimental-loader` which specifies a
the custom module loader, `node-jsx-loader.js`. A module loader, "controls how the module is loaded by the Node JS application". Illuminating. I take that to mean, that this code processes the file before Node _executes_ it. Typically it is used to transform code, i.e. to support non-standard syntax like JSX, or apply custom module resolution. Logging the output, babel and the `@babel/plugin-transform-react-jsx` babel plugin transform the `server.js` file content to,

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

Notice how it adds even the jsx function imports to the file. This is also why react had to be installed as a dependency, even though the file I made didn't use it directly, is is required when Node executes it later. Pretty wild. Babel was meant to transpile modern JS features that weren't in browsers yet to a base, broadly supported syntax, but with its plugin architecture, basically the sky is the limit for code modifications before execution.

## Executing the transformed code

I assume that _when_ the jsx functions are called, the output is that JSON structure describing the React component tree. Yes it does, indeed. I logged out what the `renderJSXToHTML` function produces. It recursively processes through the following input JSON structure,

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

## Server-side rendering

So, stepwise what happens is,

1. **Step 1: Loading**
    1. Execute `server.js` node file with a custom loader with plugin, `@babel/plugin-transform-react-jsx`, which
    2. applies`@babel/plugin-transform-react-jsx`. The plugin inserts a jsx module import, removes the <> brackets and replaces them with jsx function calls with children objects.
2. **Step 3: Executing**
    1. When node executes our transformed file, `jsx` function calls produce the JSON structure of the component tree.
    2. Our custom `renderJSXToHTML` then converts this to HTML.
3. HTML is served to our client.

Also, _that_ was SSR: "Turning JSX into an HTML string is usually known as "Server-Side Rendering" (SSR)".
After this we added some polish and turned it into a "real app" by adding routes, and refactoring into custom components.

## Create ~server~ async components

Actually not a big deal. It's just making the utility that does the SSR, `renderJSXToHTML`, support async  so we can have async custom components (functions) that can await data within their function bodies. Then instead of having an async router that fetched the page data and prop drilled that data down (sounds like pages router, no?), the teach the SSR util to await individual components. It simplidies the router A LOT, and data fetch is localised to component that needs it.
