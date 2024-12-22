# Next.js

Advantages

1. Support RSC, a method of rendering components only on the server so the code is not download to the client.
1. Support streaming, wrap an RSC in a suspense boundary for a streaming connection, so while backend services respond content can beging to stream in for the data available and hold the connection open.
1. Partial pre-rendering where the shell can be sent milliseconds after the request and then content is streamed in. (Only available on Vercel?)
1. Parallel routing can enable page segmentation into blocks that are individually streamed in.
1. Offers rendering modes like SSG that enables pages to be rendered at application build time.
1. Is well-positioned for full-stack application development.
1. Has a large community surrounding it and good development support.

Tradeoffs

Next.js require client hydration, meaiong the HTML page returned has extra data for hydration that bulks out the payload. Every tag is effectively replicated in a payload at the bottom of the page, doubling the size of the response. For a more static, content heavy website consider Astro, for a client interaction heavy application a SPA with vite may be more suitable. More applications exist on a spectrum between these two.

Deployment

- On Vercel (Svelte app can also be deployed on Vercel)
- SST
- OpenNext

## Project management

The `build` command builds the production code, transpiled under a `.next` directory, which can then be run with the `start` command.

## Project structure

Files and folders are organised with the top level being configuration and middleware.
Four scripts are part of the default setup: dev, build, start, lint.
Public folder for static assets.
Base development dependencies: typescript, eslint (and their configuration files).

File-system routing based on `app` dir (`pages` dir) structure.
Specific files serve as routing files, e.g. page, layout, and error.
A route is not publicly accessible until a page.js or route.js file is added to a route segment, and only the content of those files is sent to the client.
Still, when colocating content with the nested route, delimiting a directory as private with `_` can avoid future naming conflicts.
Root layout are set up with html and body tags and an initial `page.tsx`.

Routing based on directory structure supports the following routing patterns:
    - nested
    - dynamic (`[path]`)
    - catch-all (`[...path]`)
    - optional catch-all (`[[...path]]`)
    - parallel (`@nonpath`)
    - intercepted (`(.), (..), (..)(..), (...)`)

A parallel route is a micropage.
A parallel route can be rendered within another page, e.g. embedded or from a modal, and it can have it's own loading and error page views.
While the parallel route slot is not a route segment, it can have nested routes, and intercept routes that point elsewhere.
Instead of incurring a full page reload, content is loaded dynamically while maintaining the current context.
Parallel route example use cases:
    - Dashboards combining multiple charts or widgets displayed in parallel, e.g. Mixpanel dashboard with a team's different health graphs.
    - Product pages were selecting on the product opens a modal, but navigating to the URL opens the full product detail page.

Parallel, intercepted and route organisation is only supported in app router.
The routing based file system supports several organisational conventions
    - grouping e.g. by domain, or team
    - opt-out (private)

There are different organisational patterns ranging between the `app` folder being only for routing to colocating content next to the route that uses it.

## Routing

> The skeleton of every application is routing.