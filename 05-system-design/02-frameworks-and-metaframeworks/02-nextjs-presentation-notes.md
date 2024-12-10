# 02 Next.js presentation notes

It's a better React.

- “Next.js is a flexible React framework that gives you building blocks to create fast web applications.”
- “Next.js handles the tooling and configuration needed for React”
- “React is library for building front-end applications, Next.js is built onto of that”
- “It formalises a lot of the patterns people were using when building React applications.”
- All you need to know before using Next.js is HTML, CSS, JS and React.
- “A "batteries-included" way to build React applications.”
- “The simplicity of Create React App with a suite of powerful features.”
- “Next.js is built on conventions”, the powerful features are made usable by following conventions, e.g. file-based routing.

It's a server-side rendering framework

- “A server-rendered framework for react.”
- “A framework built onto of React that provides SSR and a node server out-of-the-box.”
- “It renders react on the server.”
- “You write react code, and before it gets users it is run on the server, so unlike client-side react apps the user gets a page that actually has content.”
- “Will take care of converting to HTML, CSS, JS.”

An aggregation of good conventions learned over the past 20 years of building web applications

- React for building the view
- Server-side rendering
- Next compiler for code optimisation (compiling, minifying, bundling, code splitting)
- Image optimisation
- API routes
- File and folder structure
- …and more optimisations

## Historical timeline

Understand what Next.js is by looking at where it came from, what prompted its creation

- In 2013 React javascript framework created so FE developers could build app like websites in a straightforward, and predictable way (see documentary video)
- Loading an empty page that subsequently loaded JS and build up the DOM had negative consequences for SEO and performance
- Not wanting to give up JS frameworks, the React team is the first to come up with a solution, server-side rendering.
- The `renderToString` method was in introduced in React 15 in 2016, to render the component to a string, which is then written to the server response.
- [code sample](https://hackernoon.com/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67)
- Then because setting up SSR properly turns out to be difficult to do, Guillermo Rauch, CEO Vercel, starts building and releases Next.js as OSS the same year, to provide this OOTB on install.
- In the years that followed, more and more features were added to Next.js to theoretically make it convenient build performant SSR web applications.
  - 2017 HMR
  - 2018 React context improvements lead to dynamic routing
  - 2020 CSS module support, next/image
  - General pattern: hand-in-hand relationship with React, updates to react leads to improvements in Next.js, but then Vercel starts doing more and more
  - 2021 Webpack 5 support, edge functions
  - 2022 whole Turbo toolchain: Turbopack, Turborepo, Turboengine, and Next v13 (app directory)
- If you watched the keynote last week, Vercel seems to positioning as a web application development ecosystem: FE, BE, serverless and edge function hosting, analytics, and now storage

Popularity:

- <https://2022.stateofjs.com/en-US/libraries/rendering-frameworks/>
- <https://npmtrends.com/@remix-run/react-vs-astro-vs-next-vs-nuxt-vs-svelte>

## A tour

The building blocks (of any web application):

1. Foundation: configuration files (package.json, next.config.js)
2. Frame: layout files (`_document.tsx`, `_app.ts`)
3. Rooms: pages
4. Hallways and doors: routes
5. Water / electricity: data
6. Furniture: UI components

### 1. Foundation: configuration files

package.json

- There is one as usual
- All monorepo dependencies
- Typical run scripts (there will be an L&D on Nx)

next.config.js

- Next.js configuration
- Opt into experimental features, like critical CSS
- Customise webpack config
- Clever choosing of allowed page extensions

### 2. Frame: layout files

document.tsx

- _document setups the `<html>`, `<head>`, and `<body>` elements that Next will render pages within.
- This file is rendered only on the server, which means it should not contain client code, e.g. an onClick handler will not work.

app.tsx

- The App component is used by Next to initialise pages.
- It is the place to load and configure styles and layouts that should persist between pages.
- This is because the app component will persist layout and state while navigating.
- It is the place to add layout and components common across the app, e.g. headers and footers.
- To define the layout on a per-page basis, a method `getLayout` can be added to a page component
- _app will use the what is returned by `getLayout` method or fallback to the default layout.
- The _app file is the only place to add a global styles stylesheet to the application.
- Any styles imported in components are locally scoped.
- <liveshare: _app page in Studocu monorepo>

### 3. Rooms: pages

- In Next.js, a page is a React Component exported from a file in the pages directory.
- Pages in Next have three parts: a file name, a default exported react component, and (often) a server-side pre-rendering method.
- The filename determines the URL (more later)
- The default exported react component renders the page UI.
- Next uses the react component and the pre-rendering method to generated HTML and the minimal JavaScript code necessary for that page.
- The pre-rendering method computes the data and pass it to the page component as props.

- Next provides two types pre-rendering methods.
- Which method of the two that is used determines also when the page is pre-rendered: generated on server on request (server-side generation), or generated at application build time (static generation).
- We will only use `getServerSideProps` for the time being.
- Effectively this means that in Next v12 server and client code are mixed in the same file.
- Next does the work of splitting browser code from node code.

- <demo: landing page VSCode livesharing/codesandox>
- When the pre-rendering method `getServerSideProps` is exported from a page, Next.js re-renders this page on the server each request and uses the data returned by `getServerSideProps` method in the page component.
- So, to use server side rendering, the function, `getServerSideProps` must be exported from a page file.
- This method cannot be exported from non-page files.
- It only runs on the server and never on the browser

### 4. Driveways, hallways and doors: routes

- The router and routing conventions are one of the most popular features of Next.
- Routing in a Next.js application is initiated by clicking on a Next <Link> component
- The Next.js router performs SPA-like client-side route transitions between pages.
- It updates the URL in the address bar and the history API (back/forward buttons works), ensures only what has changed is loaded re-rendered (thanks to code splitting), and caches the page on the client.
- <demo: https://melaniebrgr-musical-umbrella-g79xwj7v79fvrq6-3001.preview.app.github.dev/>
- <demo: use the browser’s developer tools to change the background CSS property of <html> to yellow>

- <img: compare Laravel web route configuration with Next.js over folder and file naming>
- The path to the page component in the pages directory becomes the URL path, a.k.a, “a file-system based router”
- Routes are configured by organising the files in the pages directory. 
- Web routes are created when the build command is run.
- There are three different route type: index, nested, and dynamic.
- <demo: https://melaniebrgr-musical-umbrella-g79xwj7v79fvrq6-3001.preview.app.github.dev/>

- A note about Linking: the routes module was ported to Next. Routes + 'next/link' (Routes module + a)

### 5. Water, electricity, wifi: data

- `getServerSideProps`

✅ 6. Furniture: components / UI

- Components: Next.js is based on React, no changes to how we write components

- Hooks:

  - Hook execution during SSR depends on the nature of the hook and when they are called during the react lifecycle:
    - `useState`: server + client
    - `useContext`: server + client
    - <Ask: where is useMemo executed?>
    - `useMemo`:  server + client
    - <Ask: where is useEffect executed?>
    - `useEffect`: client only (the body is executed on client only since useEffect happens *after* mount/update. The server doesn’t mount or updated after rendering the code to an HTML string so it doesn’t happen)
    - This also means you can intentionally opt into client-side rendering for specific components by choosing to fetch data with `useEffect`
    - <Ask: where is useEffect executed?>
    - `useCallback`: it depends (React returns the function definition during the initial render, but the function itself won’t be called. It’s up to you when it is called. Usually it is executed by an event handler but you could call anytime)
  - <Demo: https://melaniebrgr-musical-umbrella-g79xwj7v79fvrq6.github.dev/>

- Styling:

  - Next.js supports global styling and CSS modules, there are no changes to how we style.
  - Next.js concatenates SCSS files into many minified and code-split .css files in production builds automatically.
  - Critical CSS is available as an experimental feature.

- Images:

  - The Next.js team invested in setting defaults for image optimisation, and build them into the next/image component, that extends the <img> element
    - Next.js images are only be loaded when entering the viewport, being lazy-loaded by default.
    - <demo: lazy-loaded WebP images>
    - Next.js Applies `<img>` sizing attributes and console hints to help avoid cumulative layout shift (CLS)
    - Next serves an optimised image formats depending on browser support, e.g. WebP
    - Images are resized on demand and served images
  - To recap, the Next.js image component is improved, performant version of the <img> HTML element and adds a number of custom properties to enable the client to choose the right image size, and the server to generate the right size.
  - To achieve these benefits you, use the Image component to get to know the image API, especially width, height and sizes

### Resources

- <https://nextjs.org/learn/dashboard-app>
- <https://nextjs.org/blog/next-15>
- <https://x.com/feedthejim/status/1785242054773145636>