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

## Project management

Deploy on

- Vercel (Svelte app can also be deployed on Vercel)
- SST
- OpenNext

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

## Routing

> The skeleton of every application is routing.

Routing based on directory structure supports the following routing patterns:
    - nested (`patch/path`)
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

Use the `Link` component for routing in Next.js.
`Link` provides a SPA like experience for routing: instead of the whole page reloading, the shell is rendered imeediately while the other information is being fetched.

## Components

Server component code is only executed on the server and is not part of the payload downloaded to the client.

- Reduced Bundle Size: Server component code is not sent to the client, reducing the bundle size and speeding up the application.
- Security: Server component code only runs on the server, preventing leakage of secrets to the client.
- Data Loading: Server components make it easy to load data from backend services.
Server components call backend services asynchronously behind a firewall in your cluster and pass that data to child components.
The data fetched from BE services is or can be cached and reused.
Server components should not call into state management tooling but be stateless.
It's important you don't try to work around this, because Next.js does heavy caching of rendered components.
(console.log statements appear in the terminal)

To also execute code on the client it also needs to be marked as `use client`.
In that case the code data it is passed by server components is serialised, downloaded in the SSR payload and executed on the client during rehydration.
Data can't be fetched the same way in client components, as async client components [currently aren't supported](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#why-cant-client-components-be-async-functions), a useEffect hook would need to be used instead.
Hooks can only be used in client components.
This means that useEffect to load your data, it won't run on the server.
(console.log statements appear in the terminal and in the browser console.)

## Authentication

The process can be broken into three domains

1. authentication: how information that proves the user is who they say they are is gathered and verified
2. session management: how the user's authentication status is tracked and maintained across sessions
3. authorization: how access to routes, data and functionality is controlled for that user

To capture user information the main strategies are login forms, social login.
Select an authentication provider or roll your own auth for funsies.
Implementation approach:

1. Setup database (supabase) with user table with fields: email, username, password, etc.
2. Install Next.js integration packages and configure DB connection, storing secrets in environment file, `.env.development.local`
3. Implement Next.js UI login form to collect user data.
4. Implement server action that validates form input and calls the DB.

After the user is authenticated, you need some way to maintain the session.
In a stateless session the session is maintained on the client, e.g. a cookie, and session data is sent on every request to the server and
the server then verifies the session.
In the statefull method, a server is used to store the session data, which is retrieved by an encrypted session ID stored in the browser.
A secret session key can be used to decrypt a session ID on the server.

After authentication and session creation authorization controls need to be setup.
There are two different types of authorisation: optimistic and secure, using involving client side data and database data respectively.
There is different levels of authorisation granularity: by page, by request, by data object field.
Page level access can be implemented in the middleware by checking for session data in the cookies.
Request level access can be done in server actions before database requests are made, by verifying the DB session, a.k.a a "data access layer"
Data level access can be enforced by implemention data transfer objects or DTOs, that verify access for each field.
In Next.js authorisation by component is possible too, by verifying the session and rendering a component based on role.
