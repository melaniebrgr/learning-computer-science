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

## Data fetching

There are three points of data interaction

1. Server components: fetch data and pass it as props RSCs run only on the back end and are a good place to fetch data without leaking API keys.
1. Server actions: a new way of conveninently mutating data enabled by app router
1. API routes: Next.js applications have always supported API routes for data fetching and mutations

**Server components** call backend services asynchronously behind a firewall in your cluster and pass that data to child components.
The data fetched from BE services can be cached.
Server components should be stateless and not call into state management libraries.
What about mutations? Are these inadvisable from server components?
It's important not to work around this, because Next.js does heavy caching of rendered components.
The `use cache` experimental directive from Next.js that can be added to routes, components, and queries that are slow, e.g. sloe network requests, database queries.
By default the revalidation period is 15 minutes, but can be customised with the `cacheLife` and `cacheTag` APIs.
For fetching data, using server-side rendering and passing the data as props may often a better choice than using server actions.

Data can't be fetched the same way as server components in client components since async client components [currently aren't supported](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#why-cant-client-components-be-async-functions), and so request data can't be awaited; instead a useEffect hook needs to be used.
This means that if useEffect to load your data, the hook won't run on the server because hooks can only be used in client components.

**Server Actions (SAs)** are special functions you define that are specifically run on the server.
Whenever you call a server function from a client component, Next.js handles fetch and data retrieval from the server.
The `use server` directive is what indicates that the function is a server action that should be executed on the server when called from the client.
SAs can be call from both server and client components.
Making GET requests to the server using server actions will always result in POST requests.
A POST means we can't cache the request.
Since SAs are generally mutation requests, revalidating or updating the component on data change is necessary.
One approach is to use the `revalidatePath` function, which tells Next.js to invalidate the data at the specified path and refetch it on the next request.
However this couples the server action to the route.
Another approach is to use `revalidateTag` to invalidate a specific data fetch.

An **API route** let's the verb GET/PUT/POST be specified.
API routes expose endpoints other clients can use.

The blurring of the server and component boundaries can make it easier for sensitive data to accidentally leak to the client.
React offers experimental [utils to "taint" objects and values](https://react.dev/reference/react/experimental_taintObjectReference#prevent-user-data-from-unintentionally-reaching-the-client) so that they through errors if accidentally passed through to the client.
**Tainting** can also avoid whole kitchen sink pass through of user objects.

## Components

Server component code is only executed on the server and is not part of the payload downloaded to the client. The advantages of this are

- Reduced Bundle Size: the bundle size is smaller because server component code is not sent to the client, speeding up the application.
- Security: Server component code only runs on the server, avoiding leakage of secrets to the client.
- Data Loading: Server components make it easy to load data from backend services.

Server components are rendered on the server and their state and props are serialized and sent to the client.
Functions, however, cannot be serialized and sent over the network.
For this reason, "functions cannot be passed directly to Client Components (for server components) unless it is explicitly exposed by marking it with "use server" as a server action.

To also execute code on the client, mark it as `use client`.
Hooks can only be used in client components.
Client component code and data it is passed from server components is serialised, and included in the SSR payload sent to the browser.
The SSR payload is executed on the client during rehydration.

Components without `use client` are not necessarily always server components.
Non `use client` components are be "promoted" to client components if they are rendered from client components (provided they are not async, since async components cannot be used within client components).
Restated, when a client component invokes another component, that component automatically becomes a client component.
The `use client` marker essentially creates a zone inside of the client component where any component that is invoked is promoted to a client component.
This is how hooks can be used from within client components have haven't been marked as client components for instance.

By passing the server component as a child to the client component the server component remains a server component, while the client component acts as a container a.k.a. donut component composition, e.g. Providers.
Providers are client components that pass data to child components as props, because they take server components as props, server components remain components.

Whether something is or is not a server component can be verified by checking where console log statements appear.
`console.log` statements appear in the terminal and in the browser console for client components, and only in the terminal for server components.

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
