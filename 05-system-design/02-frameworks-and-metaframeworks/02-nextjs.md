# Next.js 15 (App router)

Advantages:

1. Support RSC, a method of rendering components only on the server so the code is not download to the client.
1. Support streaming, wrap an RSC in a suspense boundary for a streaming connection, so while backend services respond content can beging to stream in for the data available and hold the connection open.
1. Partial pre-rendering where the shell can be sent milliseconds after the request and then content is streamed in. (Only available on Vercel?)
1. Parallel routing can enable page segmentation into blocks that are individually streamed in.
1. Offers rendering modes like SSG that enables pages to be rendered at application build time.
1. Is well-positioned for full-stack application development.
1. Has a large community surrounding it and good development support.

Tradeoffs

Next.js require client hydration, meaning the HTML page returned also contains all the code and data needed for hydration, which bulks out the payload. With hydration, every tag is effectively replicated in a payload at the bottom of the page which doubles the size of the response. If you don't need to build an application, other technical appraoches can be optimal. For example, for a static and content heavy website consider Astro. For a client interaction heavy website consider a SPA and Vite. Most applications exist on a spectrum between these two extremes.

## Definitions

- SC: Server Component
- CC: Client Component
- SA: Server Action

## Project delivery

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

There are different organisational patterns ranging between the `app` folder being only for routing to colocating content next to the route that uses it.

There three general system architecture groups we can consider

1. "Local architecture": simplest variant where Next.js handles everything. The client connects to the server with REST, GraphQL, tRPC (using API routes), or built-in Server Actions, and the server makes a direct connection with the database.
2. "Backend for frontend": Next.js acts a UI server and intermediary for a number of services that communicate with the database. Next.js communicates with the services via REST, GraphQL, tRPC, or WebSockets.
3. "External architecture": The BE and FE are on seperate domains and the client may interact with both, require caching and session coordination.

## Styles

Use `global.css` to add CSS rules to all the routes in your application.
`global.css` is where to put CSS reset rules, and any site-wide styles for HTML elements like links.
The file can be imported in any component, but the best practise is to import it at the top level root layout.

## Fonts

Next.js automatically optimizes fonts in the application when you use the next/font module.
It hosts font files with other static assets so that there are no additional network requests at run time.

## Images & other static assets

Next.js can serve static assets, like images, under the top-level /public folder.
Files inside /public can be referenced in your application.
The `<Image>` Component is an extension of the HTML `<img>` tag, and comes with automatic image optimization.

- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like WebP and AVIF, when the browser supports it.

## Routing

Like the pages router, the app router is a file-based router but the syntax has changed.

> The skeleton of every application is routing.

Routing based on directory structure supports the following routing patterns:
    - nested (`patch/path`)
    - dynamic (`[path]`)
    - catch-all (`[...path]`)
    - optional catch-all (`[[...path]]`)
    - parallel (`@nonpath`)
    - intercepted (`(.), (..), (..)(..), (...)`)

It's a theme in app router: there is a different way to do things depending on whether you're in a server component or a client component.
Take navigation:

- `<Link>`-> CC, SC
- `useRouter` -> CC
- `redirect` -> middleware, SC, SA, CC (during the render process only, not event handlers)
- History API -> CC

The recommended method of navigation, **`<Link>`** renders an anchor tag and prefetches the page in the background on the client when the link is in the viewport. Prefetching behaviour is controlled with the prefetch prop. The default is to cache the prefetched page up to the loading boundaries for 30s. It can also be disabled or set to cache past loading boundaries. Use **useRouter** and **redirect** for programmatic client side and server side navigation respectively. `redirect` accepts absolute URLs and can redirect to external links as well. The native history API can be accessed to update the browser's history stack without reloading the page.

It is beneficial to share layout, with as mich layout as possible implemented in the parent page, "when a user navigates to a new route the browser doesn't reload the page. Only the route segments that change re-render improving the navigation experience and performance."

### params

Every page.tsx route receives two special properties:

1. search params (`Record<string, string | string[]`)
2. route params (or just "params")

Any route can take search parameters.
`searchParams` are passed into the page component as a property by default.
The value of the param can be a string or array of strings, since if there are duplicate keys the values are combined in an array.
For example, `?q=5&a=10&q=6` is passed as

```js
{ a : "10", q: ['5', '6'] }
```

A "parameterised" route or dynamic route parameters are also passed into the page component as a `params` property by default.
The name of path segment because the key of the params object passed to the page.

| Path | URL Examples |
| ---- | ------------ |
| `/page.tsx` | / |
| `/about/page.tsx` | /about |
| `/about/you/page.tsx` | /about/you |
| `/product/[productId]/page.tsx` | /product/foo, /product/bar |
| `/product/page.tsx` | /product |
| `/setting/[...setting]/page.tsx` | /setting/a, /setting/b/c |
| `/setting/page.tsx` | /setting |
| `/info/[[...item]]/page.tsx` | /info, /info/23, /info/23/detail |
| `/(teamA)/editor/page.tsx` | /editor |

Prefer to use the `Link` component for routing in Next.js.
`Link` provides a SPA like experience for routing: instead of the whole page reloading, the shell is rendered imeediately while the other information is being fetched.

### parallel routing

Parallel route are micropages: imagine an analytics dashboard that displays many graphs of different types at the same time.
A parallel route is effectively a page rendered within another page, e.g. embedded or from a modal, that can have it's own loading and error pages.
While a parallel route slot is not a route segment, it can have nested routes, and intercept routes that point elsewhere.
Instead of incurring a full page reload, content is loaded in parallel while maintaining the current context.
Consider parallel routes when you want to leverage parallel data loading and state management.
Parallel route example use cases:
    - Dashboards combining multiple charts or widgets displayed in parallel, e.g. Mixpanel dashboard with a team's different health graphs.
    - Product pages were selecting on the product opens a modal, but navigating to the URL opens the full product detail page.

Parallel, intercepted and route organisation is only supported in app router.
The routing based file system supports several organisational conventions
    - grouping e.g. by domain, or team
    - opt-out (private)
Parallel routes provide implicit suspense behavior at the route level.
For more fine-grained control over suspense boundaries and loading states, the Suspense component can be used.

## Data fetching and mutation

There are three points of data interaction

1. Server components: fetch data and pass it as props. RSCs run only on the back end and are a good place to fetch data without leaking API keys.
1. Server actions: a new way of conveniently mutate data. Server actions are only available in app router.
1. API routes: Next.js applications have always supported API routes for data fetching and mutations

Instead of using React Context (which is not available on the server) or passing data as props, you can **use fetch or React's cache function to fetch the same data in the components that need it**, without worrying about making duplicate requests for the same data. This is because React extends fetch to automatically memoize data requests, and the cache function can be used when fetch is not available. (Only if not using fetch, and  using an ORM or database directly, would you need to wrap the data fetch with the React `cache` function. This will de-duplicate and only make one query.)

### Server components

Server components call backend services asynchronously in a secure environment and pass that data to child components.
The data fetched from BE services can be cached.
Server components should be stateless and not call into state management libraries.
What about mutations? Are these inadvisable from server components?
It's important not to work around this, because Next.js does heavy caching of rendered components.
The `use cache` experimental directive from Next.js that can be added to routes, components, and queries that are slow, e.g. slow network requests, database queries.
By default the revalidation period is 15 minutes, but can be customised with the `cacheLife` and `cacheTag` APIs.
For fetching data, using server-side rendering and passing the data as props may often a better choice than using server actions.

Data can't be fetched the same way as server components in client components since async client components [currently aren't supported](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#why-cant-client-components-be-async-functions), and so request data can't be awaited; instead a useEffect hook needs to be used.
Since the `useEffect` doesn't run on the server, a `useEffect` won't fetch data on the server.

### Server actions

Server Actions (SAs) are special functions called on the client that are specifically run on the Next.js server.
Whenever you call a server function from a client component, Next.js handles the POST request to the server.
The `use server` directive indicates that the function is a server action that should be executed on the server.
Server actions can be called from both server and client components and return promises.

Making GET requests to the server using server actions will always result in POST requests.
A POST means we can't cache the request.
Since SAs are generally mutation requests, revalidating or updating the component on data change is necessary.
One approach is to use the `revalidatePath` function, which tells Next.js to invalidate the data at the specified path and refetch it on the next request.
However this can couple the server action to the route.
Another approach is to use `revalidateTag` to invalidate a specific data fetch.

An **API route** let's the verb GET/PUT/POST be specified.
API routes expose endpoints other clients can use.

The blurring of the server and component boundaries can make it easier for sensitive data to accidentally leak to the client.
React offers experimental [utils to "taint" objects and values](https://react.dev/reference/react/experimental_taintObjectReference#prevent-user-data-from-unintentionally-reaching-the-client) so that they through errors if accidentally passed through to the client.
**Tainting** can also avoid whole kitchen sink pass through of user objects.
> In Next.js One of the biggest advantages of the App Router system over the Pages Router system comes down to managing laggy components with **Suspense**. With the Pages Router system, it was far more involved. You'd have to bail out of getServerSideProps, make requests off the client, open up APIs, and so on. It required a lot of work, potentially opening up a host of security issues.

## Components

Whether a component is a server or client component can be checked by looking where console statements appear.
If they appear in only in the terminal it's a server components, if they appear in the terminal and in the browser console its a client components.

### Server component

Main characteristics:

- Secure and convenient data Fetching: Server components make it easy to load data from backend services. Server component code only runs on the server, avoiding leakage of secrets to the client.
- Performance:
  - Streaming: Server Components allow you to split the rendering work into chunks and stream them to the client as they become ready
  - Reduced Bundle Size: the bundle size is smaller because server component code is not sent to the client, speeding up the application.

By default, Next.js uses Server Components.
Server component code is only executed on the server and is not part of the payload downloaded to the client.
The advantages of this are
Server components are rendered on the server and their state and props are serialized and sent to the client.
Functions, however, cannot be serialized and sent over the network.
For this reason, "functions cannot be passed directly to Client Components (for server components) unless it is explicitly exposed by marking it with "use server" as a server action.
To prevent unintended client usage of server code, use the `server-only` package to give other developers a build-time error if they ever accidentally import one of these modules into a Client Component.
he corresponding package client-only can be used to mark modules that contain client-only code – for example, code that accesses the window object.

### Client components

Main characteristics:

Interactivity: Client Components can use state, effects, and event listeners, meaning they can provide immediate feedback to the user and update the UI.
Use of browser APIs: Client Components have access to browser APIs, like geolocation or localStorage.

To also execute code on the client, mark it as `use client`.
Hooks can only be used in client components.
Components without `use client` are not necessarily always server components.
By defining a "use client" in a file, all other modules imported into it, including child components, are considered part of the client bundle.
Components without the `use client` directive are be "promoted" to client components if they are rendered from client components (provided they are not async, since async components cannot be used within client components).
Restated, when a client component invokes another component, that component automatically becomes a client component.
The `use client` marker essentially creates a zone inside of the client component where any component that is invoked is promoted to a client component.
This is how hooks can be used from within client components have haven't been marked as client components for instance.
By passing the server component as a child to the client component the server component remains a server component, while the client component acts as a container a.k.a. donut component composition, e.g. Providers.
Providers are client components that pass data to child components as props, because they take server components as props, server components remain components.

### Composition

To reduce the Client JavaScript bundle size, it is recommend moving Client Components down your component tree.
Since Client Components are rendered after Server Components, you cannot import a Server Component into a Client Component module (since it would require a new request back to the server).
Instead, Server Components can be passed as a prop to a Client Component.

## Caching

High performance apps are high performance primarily because they are largely cached. There are multiple caches in the Next.js whose interactions need to be understood.
Note that in dev mode caching behaviour may not match the prod mode caching behaviour.

### Full route cache (Next.js)

There are two different kinds of routes, the **static route** and **dynamic route**. Static routes are statically generated when the application is built and are saved. When the route is accessed, the static page is returned. A dynamic route is always rerendered at request time by the server. Though generally undesirable for performance, it is possible to force a static route to be rendered dynamically.

The route cache behaviour changed from Next.js 14 to 15, but it's not entirely clear what the default behaviour is.
Next.js 14 cached routes aggressively which required you to "force dynamic" to fetch data on route reload.
In Next.js 15 app router the page is dynamic by default now and data fetching will happen at runtime unless otherwise specified in parts of the application.
> As a developer, you do not need to choose between static and dynamic rendering as Next.js will automatically choose the best rendering strategy for each route based on the features and APIs used. Instead, you choose when to cache or revalidate specific data, and you may choose to stream parts of your UI.


Note, it might be necessary to opt into "dynamicIO" behaviour for the following:
Caching behaviour can be defined with `use cache` at the page, function, or component level.
It is expected to use `use cache` in conjunction with `cacheLife`, `connection()`, and `Suspense`.
The `connection()` function indicates that rendering should wait for an incoming user request before continuing.
In general,

- If you want something dynamic, wrap it in a suspense boundary. Suspense lets Next.js auto-detect that we have dynamic data. You'll find you'll need to wrap suspense boundaries more and more around anyhting async.
- If you want something cached, use the use cache directive.

Static routes can be configured to incrementally update.
Revalidation can be automatic according to some time period, e.g. `cacheLife({ revalidate: 10 });`, `cacheLife("minutes");`, or programmatic, e.g. from a server action(`expirePath, expireTag`).
In general there are four "caching" strategies: no cache, always cache, cache but revalidate after some time, cache but revalidate for a specific route or tag.
This means we can leverage the caching strategy discretely for each different data type.
Note that caching only updates when a request comes in, and if no request arrives, the cache remains unchanged.

### Data cache (Next.js)

Next.js caches data from fetches made inside of React Server Components, called the data cache.
Caching behaviour in **fetch requests** can be configured as follows:

```js
fetch("http://localhost:8080/time", {
    cache: "no-store",
});
```

- "no-store": the response is not cached and the value is dynamically fetched on every request
- "revalidate": the statically generated page is refreshed every x seconds

Within a server action the `"use cache";` directive will cache data between server requests, even if the route itself is dynamic.
Restated, the cache is still active between requests, even though the route is dynamic
The lifetime of the server action cache can be configured so that it is incrementally updated as well, with `cacheLife`.
If a request comes in that's older thant he cacheLife only then is the cache invalidated.

### Data cache (React)

Data is cached _within that request_ so any other data fetches to the same endpoint within that request will use the cache.

### Router cache (Next.js)

"Next.js has an in-memory client-side cache called the **Router Cache**. As users navigate around the app, the React Server Component Payload of prefetched route segments and visited routes are stored in the cache ... on navigation, the cache is reused as much as possible".
To differentiate between the route cache and router cache, you can use `router.refresh()` to bust the router cash.
If the page stays the same, e.g. a `Date.now()` rendering, then you know its the route cache not router cache.
`router.refresh()` can be used to update the current page content on demand in general.

Server actions and API requests that contain revalidation instructions include headers to force the router running in the Next.js client to revalidate.
Most of the time the router cache "just works":

> When a server action is executed, the Next.js client sends a request to the server with a special next-action-id header. The server recognizes this header and executes the corresponding server action. If this action includes revalidatePath or revalidateTag, the server's response will include a x-nextjs-revalidate header. This header tells the Next.js client to invalidate its cache for the specified route or tags, which will trigger a revalidation on the next navigation.

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