# L&Dx.2: Server Components in practise

## Opening

Whoami: background in scientific visual communication who wrote a server components implementation from scratch. At the end of this presentation you will understand

- Use case for Server and Client Components, when to use each for what and how  
- How to structure the application to use RSCs, e.g. component composition  
- Common errors, what they mean and how to resolve them

The intent is to be less theoretical and focus on the practicalities of working with Server and Client Components in app router. While there will be no hands on key keyboard sections, there will be code samples and a Kahoot at the end, so stay sharp.

## Review

### Key Concepts

- Traditional Server-Side Rendering (SSR) renders entire pages and rehydrates them in the browser  
- React Server Components (RSC) render components on the server without sending their JavaScript to the client. Serve static or non-interactive elements as plain HTML, reduce client-side bundle sizes, accelerate initial page loads, and cleanly separate concerns.  
- RSC also supports asynchronous data fetching directly within server components, significantly improving the developer experience compared to Next.js’s older getServerSideProps API.  
- Developers seamlessly mix server components (no hydration, no JS on the client) with client components (interactive, hydrated), creating an “islands architecture” where each UI element uses the most appropriate rendering method.

### Key Tech Details

- A real RSC implementation encodes the JSX in the HTML payload.  
- A production-ready RSC setup sends JSX chunks as they're being produced instead of a single large blob at the end.  
- When React loads, hydration can start immediately—React starts traversing the tree using the JSX chunks that are already available instead of waiting for all of them to arrive.  
- RSC also lets you mark some components as Client components, which means they still get SSR'd into HTML, but their code is included in the bundle.  
- For Client components, only JSON of their props gets serialized.

## Server Components (SCs)

React Server Components *only run on the server*.  
Because they run *only on the server*, Server Components can use secret keys and access backend resources directly.

Because they run *only on the server*, Server Components do not increase the size of the JS bundle size shipped to the client, so import large libraries, like react-markdown, without fear of increasing the bundle size the end user needs to download.  
This is true for initial page load and page transitions, “Server Components allow your application code to be automatically code-split by route segments. This means only the code needed for the current route is loaded on navigation.” (25)

We said though that Server Components only render on the server.  
When a user interacts with an application they trigger state changes and side effects though, which would require a component to rerender.  That is, Server Components code is *not- available on the client for a rerender. This is where Client Components come in.

Generally use Server Components for server-side data fetching, computation, wherever you can, reasonably for improved performance from caching.

## Client Components (CCs)

Are “traditional” React components that are server-side rendered.  
They are executed on the server and in the browser.  
They can use state, effects, and browser-specific APIs.

It’s only in Client Components that can we **use lifecycle hooks**, such as useEffect or useState (15).  
That’s because Client Components are SSR’d like we are used to: rendered on the server, hydrated on the client.

Use Client Components for interactivity (15).  
As an analogy, SCs are the stage that you set up ahead of time and are fixed during a performance.  
CCs are like actors on the stage during the play, they interact with the audience and change over time.  
We want to use Server Components as much as possible, but a stage without actors is not a play.

“What React Server Components do is give you optionality to decide where you want your code to run: the server, the client, or both. And when: build-time or run-time (27).”

**In app router, all components are Server Components by default**.  
A Server Component is turned into a Client Components by

- adding a `use client` directive to the top of the component file  
- *importing- any component into another Client Component

The DX implications RSC enables fine-grained control: where our code runs is explicitly defined: the server, the client, or both.
Because we not only *can be- explicit about where our code runs, i.e. if it’s a client or server component, but we always *should be- aware of it.

What is an SC and what is a CC can be tricky to architect. Sometimes a component silently executes on both the client and server, or loudly complain and require manually restructuring of the component tree.

By following these patterns, development felt refreshingly straightforward. The application architecture was clean, and the initial performance metrics were impressive (26).

## Rules

Rules of ~~hooks~~ components:

1. Server Components can render both Server Components and Client Components  
2. Client Component can render only other Client Components  
3. Server Components can only pass some types of data to Client Components as props

Anything rendered by a Client Component becomes a Client Component. It’s a point of infection. Imagine an invisible server-client boundary is created whenever a Client Component is encountered in the component hierarchy.

“When it comes to deciding server-client boundaries the parent/child relationship doesn't matter.” What matters is the **import relationship*- and **who is passing the props***.- 

All code written for Server Components **must be serializable**. Functions or classes cannot be passed from Server Components to Client.

Need to think about component composition management, can’t just import anywhere, can’t just pass anything.

## Patterns

### Key Concepts

Created client components only at necessary interaction boundaries  
Passed server-generated props to client components   
Implemented forms with server functions that revalidated API calls  
Placed React hooks strategically in leaf components or lower in the component tree

### Pattern 1: Data locality with Server Components

Only Server Components **can be*- **asynchronous**, so we can await data `fetch`ing on the server before returning JSX to the client.

Any Server Component can just… fetch data directly using a node library or using the fetch (22).  
No more using a library or using useEffect to manage complex loading states (react-query I still love you), and no more fetching a bunch of data at the page level with getServerSideProps and then drilling it down to the component that needs it (22).

In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page. Mark a Server Component as “non-urgent” with Suspense and stream it in with a fallback.\\

Server components should be stateless and not call into state management libraries.  
What about mutations? Are these inadvisable from server components?  
It's important not to work around this, because Next.js does heavy caching of rendered components.  
The \`use cache\` experimental directive from Next.js that can be added to routes, components, and queries that are slow, e.g. slow network requests, database queries.  
By default the revalidation period is 15 minutes, but can be customised with the \`cacheLife\` and \`cacheTag\` APIs.  
For fetching data, using server-side rendering and passing the data as props may often a better choice than using server actions.

Data can't be fetched the same way as server components in client components since async client components \[currently aren't supported\](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md\#why-cant-client-components-be-async-functions), and so request data can't be awaited; instead a useEffect hook needs to be used.  
Since the \`useEffect\` doesn't run on the server, a \`useEffect\` won't fetch data on the server.

### Pattern 2: Weaving interactivity with Client Components

“What if I need to useState high up in the application? Does that mean everything needs to become a Client Component? It turns out that in many cases, we can work around this limitation by restructuring our application so that the owner changes. (12)” The key is, Server Components can be passed to Client Components as props.

New terminology: weaving in RSCs, “Doughnut pattern”. Donut Components are a way to “weave” interactive client-side components at the top of the rendering tree without converting the entire application into client components (16).

If you follow the doughnut pattern strictly, it upsets encapsulation we enjoyed from React so far, that its, encapsulation of functionality within one component. So as with everything there should be a balance.  
Even if something can be a Server Component it doesn’t mean it must be.  
Don’t turn components inside out to achieve maximum server-only rendering.

### Naming

- const HeaderServer, const HeaderClient  
- Header.Client  
- Header.server.tsx, Header.client.tsx (or Header.Server.tsx, Header.Client.tsx) 

### Summary

1. **shift down server-client boundary**: the structure the application so that things that change state are moved down the component hierarchy to shift the server-client boundary out.  
2. **isolate client leafs**: blips where functions need to be passed into client Components  
3. BE services can be called directly in RSCs. Move blocking data fetching from BE services down to not block page rendering  
4. If you have some server-side state that you want to share across server components, Next.js recommends using either the cache or fetch APIs to do so. Use fetch when you want to share a resource like the response of a REST API call across server components.  
5. Use cache when fetch is not an option—for instance, to share the result of a database query.  
6. Move client functionality down component hierarchy to get as much server-side rendering as possible to get the most benefit (server-client boundary negotiation.) \<fig 3\. client server boundaries\>  
7. Split up client and server concerns into separate components

## Common errors

### Error: You’re importing a component that needs `useState`. This react hook only works in a client component. To fix, mark the file (or its parent) with the “useClient” directive.

The `useState` hook is used for client side state, so this needs to be a Client Component. Same goes for `useEffect`.

### Error: Event handlers cannot be passed to Client Component props.

There are limitations on what can be passed as props from Server Components to Client Components. The props must be [serialisable](https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values), that is, the data structured must be convertable to a format suitable for transfer over a network (19). JS functions and classes cannot be serialised, but plain objects can as JSON, for example. So when passing props keep in mind the conceptual “server-client boundaries” being created to predict what can and can’t easily be passed. \<ex. cookieManager example\> Two options: (1) rearchitect component composition, (2) change data structure.

What is the React Server Component Payload?

The React Server Component Payload is a compact binary representation of the rendered React Server Components tree. It's used by React on the client to update the browser's DOM. The React Server Component Payload contains:

- The rendered result of Server Components  
- Placeholders for where Client Components should be rendered and references to their JavaScript files  
- Any props passed from a Server Component to a Client Component

### Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.

Encountered when trying to pass the whole context object to a client component because the cookie manager is a class. Resolved by removing the cookie manager from the object.

## Common refactorings

How to improve TTFB. TTFB or Time to First Byte measures how long it takes for a user’s browser to **receive the first byte of data*- from the server after making an HTTP request. Therefore it includes 1\. sending the request, 2\. server processing like DB querying, 3\. streaming the first byte of the response. Our domain is 2, cloud infra’s is 1 and 3\.

- `useStaticData`: we want to slowly remove component dependency on useStaticData in favour of doing more data fetching on the server  
  - Can the data be passed down?  
  - Can you adjust the component composition so the data can be passed in?  
  - else apply `use client`

## Tooling

- (Lighthouse)  
- [RSC Devtools](https://chromewebstore.google.com/detail/rsc-devtools/jcejahepddjnppkhomnidalpnnnemomn?pli=1)

## Kahoot

- T/F: I can use useEffect in a Server Component  
- T/F: I can use useState in a Server Component  
- T/F: Client Components are only rendered on the client  
- T/F: The `use client` directive marks the code as running on the client  
- TF: A Client Component runs only on the client  
- Server and Client component naming convention poll

## Conclusion & CTA

- rearchitect components to benefit  
- set up and monitor CWVs to establish a baseline  
- try suspending slow components (Client and Server)  
- use `use` to resolve promises deep in the tree with Suspense but be sure to size fallbacks correctly to avoid CLS  
- use pending indicators with useTransition to give the use immediate feedback

## References

- [ ] 1\. [https://www.plasmic.app/blog/how-react-server-components-work](https://www.plasmic.app/blog/how-react-server-components-work)  
- [ ] 2\. [https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)  
- [ ] 3\. [https://apidiagram.com/](https://apidiagram.com/)  
- [ ] 4\. [Data Fetching with React Server Components](https://www.youtube.com/watch?v=TQQPAU21ZUw)  
- [ ] 5\. [https://github.com/reactwg/server-components/discussions/5](https://github.com/reactwg/server-components/discussions/5)  
- [x] 6\. [React Server Components, Worth Your Time?](https://www.youtube.com/watch?v=c0E_gh1yeRA&t=464s)
- [x] 7\. [Nik Sumeiko (LinkedIn)](https://www.linkedin.com/feed/update/share:7298319833580892161/?midToken=AQG_eKV1tBRWhQ&midSig=1-Q7Hv7LezOrE1&trk=eml-email_career_insights_01-network~post-0-wrapper~link&trkEmail=eml-email_career_insights_01-network~post-0-wrapper~link-null-3b6y0p~m7ut2ho4~x8-null-null&eid=3b6y0p-m7ut2ho4-x8&otpToken=MTAwNTFlZTExYjI2Y2FjNmJkMjQwNGVkNDIxZmU2YjU4ZWM3ZDE0MzlmYWM4ZjYxNzdjNTAwNmU0YjU4NThmYmYyZGZiMWIxNDZmOGYxYzY0MWZjZmJhYzBkZTlmZjdkYjI2MmU4YmVhYzIyZWEyNDEzYTAsMSwx)~~  
- [ ] 8\. [https://www.patterns.dev/react/react-server-components/](https://www.patterns.dev/react/react-server-components/)\-  
- [ ] 9\. [https://github.com/reactjs/rfcs/blob/bf51f8755ddb38d92e23ad415fc4e3c02b95b331/text/0000-server-components.md](https://github.com/reactjs/rfcs/blob/bf51f8755ddb38d92e23ad415fc4e3c02b95b331/text/0000-server-components.md)  
- [ ] 10\. [https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components)  
- [ ] 11\. [React Server Components: A Comprehensive Breakdown](https://www.youtube.com/watch?v=VIwWgV3Lc6s)  
- [x] 12\. [https://www.joshwcomeau.com/react/server-components/](https://www.joshwcomeau.com/react/server-components/)
- [x] 13\. [https://parceljs.org/blog/v2-14-0?ck\_subscriber\_id=1774022056](https://parceljs.org/blog/v2-14-0?ck_subscriber_id=1774022056)
- [ ] 14\. [https://github.com/reactwg/react-18/discussions/37](https://github.com/reactwg/react-18/discussions/37)  
- [ ] 15\. [https://vercel.com/blog/understanding-react-server-components](https://vercel.com/blog/understanding-react-server-components)  
- [ ] 16\. [https://frontendatscale.com/blog/donut-components/](https://frontendatscale.com/blog/donut-components/)  
- [ ] 17\. [https://nextjs.org/learn/dashboard-app/streaming](https://nextjs.org/learn/dashboard-app/streaming)  
- [ ] 18\. [https://react.dev/blog/2024/12/05/react-19\#whats-new-in-react-19](https://react.dev/blog/2024/12/05/react-19#whats-new-in-react-19)  
- [ ] 19\. [https://react.dev/reference/rsc/use-server\#serializable-parameters-and-return-values](https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values)  
- [x] 20\. [https://github.com/reactwg/react-18/discussions/37](https://github.com/reactwg/react-18/discussions/37)
- [ ] 21\. [https://www.youtube.com/watch?v=eO51VVCpTk0](https://www.youtube.com/watch?v=eO51VVCpTk0)  
- [ ] 22\. [https://www.mux.com/blog/what-are-react-server-components](https://www.mux.com/blog/what-are-react-server-components)  
- [ ] 23\. [https://github.com/aurorascharff/next15-filterlist](https://github.com/aurorascharff/next15-filterlist)  
- [ ] 24\. [https://nextjs.org/learn/dashboard-app/getting-started](https://nextjs.org/learn/dashboard-app/getting-started)  
- [ ] 25\. [https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating\#1-code-splitting](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-code-splitting)  
- [ ] 26\. [https://www.nirtamir.com/articles/the-limits-of-rsc-a-practitioners-journey?ck\_subscriber\_id=1774022056](https://www.nirtamir.com/articles/the-limits-of-rsc-a-practitioners-journey?ck_subscriber_id=1774022056)  
- [ ] 27\. [https://saewitz.com/server-components-give-you-optionality?ck\_subscriber\_id=2782443989\&utm\_source=convertkit\&utm\_medium=email\&utm\_campaign=%E2%9A%9B%EF%B8%8F%20This%20Week%20In%20React%20\#233:%20RSC,%20Next.js,%20Compiler,%20Unhead,%20Shadcn,%20Relay,%20Mantine%20%7C%20Expo,%20WebGPU,%20Skia,%20Apple%20fees,%20Reanimated,%20Fragment%20Refs%20%7C%20Node.js,%20TS,%20Prisma,%20Deno,%20GSAP%20-%2017536483](https://saewitz.com/server-components-give-you-optionality?ck_subscriber_id=2782443989&utm_source=convertkit&utm_medium=email&utm_campaign=%E2%9A%9B%EF%B8%8F%20This%20Week%20In%20React%20#233:%20RSC,%20Next.js,%20Compiler,%20Unhead,%20Shadcn,%20Relay,%20Mantine%20%7C%20Expo,%20WebGPU,%20Skia,%20Apple%20fees,%20Reanimated,%20Fragment%20Refs%20%7C%20Node.js,%20TS,%20Prisma,%20Deno,%20GSAP%20-%2017536483)