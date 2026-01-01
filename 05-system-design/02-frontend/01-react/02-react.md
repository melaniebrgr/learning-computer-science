# React

The core principle of React: **UI is a function of state**. In response to a change in state, e.g. useState, React asks components to describe UI from current props/state. 

JSX becomes React elements (plain objects) that represent intended UI structure. The in-memory tree of objects describing the HTML elements is the **virtual DOM**. Note, since React 16 React used "Fiber" data structures that keep track of component instances, and their children and the previous iterations of them. When a parent renders, instead all of its children render recursively, regardless of prop equality, unless the child is memoised, with Fiber this render work can be paused, resumed, or discarded; multiple renders may be thrown away before being committed (concurrency). During **reconciliation**, react diffs element types/keys to decide what to reuse or replace.

## The render cycle

Three things that trigger a re-render: 

1. the state changes,
3. the parent changes (or the props passed from the parent changes if the component is memoised), or 
4. context changes.

React has three phases it goes through during a rerender cycle,

### 1. Render phase

The render phase is when React figures out what the changes meant by comparing with the virtual DOM.

- virtual DOM is built
- virtual DOM is reconciled with the real DOM

### 2. Commit Phase

- Necessary changes are applied to the real DOM

All calculated changes are applied synchronously. `useEffect` runs shortly after via a separate “Passive Effects” step.

### 3. Cleanup Phase

## React Fiber

Under the hood, React Fiber is

- plain functions,
- a linked list tree,
- and a small scheduler

Earlier version of React handled DOM changes by starting at the top and processing the entire component tree in a blocking manner. In April 2017, Facebook announced React Fiber, a new set of internal algorithms for rendering, to replace React's old rendering algorithm, a stack-based reconciliation algorithm that compelled the entire tree to be rendered at once.

React Fiber, by contrast, is described as a cooperatively scheduled rendering engine. It allows React to be smarter about rendering by being able to pause, interrupt, or restart work based on priority, rather than blocking the main thread until completion.

With React Fiber, work can be paused and prioritized more urgent updates. React Fiber aims to check approximately every 5 milliseconds to determine if it should pause and let other things happen. However, this timing can vary if there's something expensive happening that blocks it.

React Fiber breaks work into small chunks and checks in periodically so that if something more important comes along, it can pause or abandon the current work. This allows the browser to handle other tasks like CSS animations or check for new state changes, preventing the application from becoming unresponsive.

React Fiber maintains two trees in memory: the current tree (which is what is referenced in the DOM) and a work-in-progress tree (which is what React is in the middle of updating). This allows React to work through the assembly-line (linked list) of fibers but be able to swap back to the unmodified, current tree if it needs to abandon work in progress when something more important comes along, like updated state of a CSS animation.

## Hooks

### useState, useReducer (server + client)

```tsx
const [state, setState] = useState(initialState);
```

`useState` and `useReducer` create values that are preserved across renders and triggers a re-render when the change. The only different is that `useReducer` follows the reducer pattern.

### useRef (server + client)

```tsx
const ref = useRef(initialValue);
```

create a value that is preserved across renders, but won't trigger a re-render when it changes.

### useInsertionEffect (client only)

The `setup` function for `useInsertionEffect` is called after the component is added to the DOM and before layout effects (`useLayoutEffect`) fire. This inserts any `<style>` tags so that layout effects see the final **styles**.

On component re-render, React first runs the previous cleanup, then immediately runs the new `setup` for that component’s `useInsertionEffect`. Cleanup and setup are interleaved per component (cleanup then setup for one component, then the next), rather than “all cleanups then all setups” like other effects.

### useLayoutEffect, useEffect (client only)

```tsx
useEffect(didUpdate);
```

In React, both `useEffect` and `useLayoutEffect` hooks synchronize components with external systems and are only called on the client, but their timing differs. useEffect fires after the browser has painted the screen. It’s non-blocking, letting the UI render first, then running side effects. This is ideal for data fetching, subscriptions, logging, and anything that doesn’t need to affect the initial layout.

useLayoutEffect fires in the same commit phase, right after React mutates the DOM but before the browser paints. It blocks painting until it finishes, making it suitable for reading layout (measurements) and synchronously applying DOM writes that must be reflected immediately, preventing visual flicker or layout shift. Overuse can hurt performance because it delays rendering.

A practical rule: prefer useEffect by default; reach for useLayoutEffect only when you must measure or adjust layout synchronously to avoid visible jumps.

> Once we have shown the user everything that they need to show, then we will call useEffect. UseLayoutEffect happens before we render the DOM, which means we could gum up the entire works. UseEffect happens after we've done it. If we're using something like useEffect for making API calls, it gets you into a pretty weird situation because you have to render the entire DOM. Then you call useEffect to go get your APIs so that you can go render the DOM again, right? And for a while, if you're like, I do that on my app, and now I feel bad. You didn't have a choice for a while. It was the effectively blessed way to do it. But now there are better ways. Now, you might consider doing something like Suspense.
>
> So useEffect will always be called after the rendering phase when we have an empty dependency array. Typically examples calling APIs after we've committed everything to the DOM. So if it is like that useEffect with no dependencies that you only want to run once at the beginning, it will have rendered the component and all the children and committed that all to DOM and then call you useEffect. The goal with that was like, let's get something on the page. Let's not show them nothing and not render. It was like a trade-off that no one felt great about, and there are now other ways to do this as well, like Suspense. And there's nothing wrong, like, I'm not saying tomorrow you need to go refactor your entire codebase but there are probably places where you can have some niceties and remove the fallback UI logic, because asynchronous stuff in a UI is the worst, right? Especially when you bring in TypeScript, and you don't really know if that's null or the actual value yet, and then you've got to pass that down and it could be null or the actual value everywhere.

### useMemo, useCallback (server + client)

```tsx
const memoizedValue = useMemo(calculateValue, dependencies);
```

`useMemo` and `useCallback` cache values between renders. The former caches the result of a calculation, the latter caches a function.

### useOptimistic (server + client)

Optimistically update the UI as you wait for the mutation request (PUT, POST, DELETE) to complete, assuming that in most cases the request is successful. The request error case must be handled additionally, e.g. by wrapping the request in a try catch and its unsuccessful, calling a revalidate method to trigger the component render with the "source of truth" data from the database.

```tsx
import { useOptimistic, useState, useRef, startTransition } from "react";
import { deliverMessage } from "./actions.js";

function Thread({ messages, sendMessageAction }) {
  const formRef = useRef();
  
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      {
        text: newMessage,
        sending: true
      },
      ...state,
    ]
  );

  function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    startTransition(async () => {
      await sendMessageAction(formData);
    });
  }

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  
  async function sendMessageAction(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    startTransition(() => {
      setMessages((messages) => [{ text: sentMessage }, ...messages]);
    })
  }
  
  return <Thread messages={messages} sendMessageAction={sendMessageAction} />;
}
```

### useTransition

`useTransition` marks some state updates as “non-urgent” so the UI stays responsive while heavier work happens in the background.

Call useTransition at the top of a component, just like useState, when handling an event that triggers an expensive update like switching tabs, filtering a big list, searching, or recomputing derived data. Wrap the state update in startTransition:

```tsx
const [isPending, startTransition] = useTransition();
startTransition(() => setTab(nextTab));
```

Use `isPending` to render a loading hint while the transition is running, for example by dimming content or showing a “loading…” label on the active control. Do not use `useTransition` for user feedback that should be treated synchronously.
​
## Components

### Context

React Context is a mechanism for passing **values** through a component tree without manually threading props at every level; it is essentially a scoped value transport mechanism. While some describe Context as a form of dependency injection, because Context itself does not manage creation or lifecycle of those values unlike traditional dependency injection (DI) containers it is not a formal DI framwwork. So, Context is best thought of as a simple DI **transport** mechanism.

What is DI? A technique where a piece of code is given the dependencies it needs from the outside instead of creating them itself, reducing coupling and improving testability. A DI framework is responsible constructing and providing services to a client (function, object or component) instead of creating them internally.

### Suspense

Suspense is a rendering primitive and successor to `useEffect` for data fetching. It obviates the need for creating loading variables to display.

> On that render, as we were kind of going through the tree, I hit a suspense point. All of those API calls will fire off immediately and they'll show the suspended DOM nodes, like the loading or whatever. They've already started and then they can come back, and if they come back _before_ React is done rendering and it can decide that it can do it fast enough, it's display immediately and not see that flash of nothing, and then all your stuff. So stuff that was the best practice at one point (useEffect) is not the best practice anymore. You didn't do anything wrong. Things just got better, and if you don't opt into these things, you get the same experience you always had. It's not like things are worse, but there is a better life.

#### How is Suspense implemented? 

Children are allowed to “suspend” by throwing a promise during render. React intercepts that throw in the Fiber reconciler, marks the nearest Suspense boundary as pending, renders its fallback subtree, and retries the suspended subtree once the promise resolves.

This is not exceptions-as-errors; it’s control flow. The thrown promise is treated as a continuation token.

A continuation token is a unique string used for pagination, allowing applications to resume a query or process a large set of data from where it left off. When a request returns a partial set of results, it includes a continuation token; the application then sends this token back to the server to get the next page of results until all data has been retrieved.

#### The UX of Suspense

React's new way of declaratively managing the component UI while we wait for data or if the request fails is using **Suspense** and **ErrorBoundary**. The trick to trigger these two things to happen when rendering the UI is the `use` hook.

How does a component suspend? Promise execution begins eagerly. If the promise value isn't returned by the time the component renders the promise is thrown synchronously. The `Suspense` boundary catches the throw and renders the fallback component instead. Under the hood it awaits the promise result and when it does return the real component is rendered instead. The same principle works for error boundaries.

When the data for the Suspended component is available, it is streamed over the network.

Conceptually,

```tsx
function App() {
  return (
    <Suspense fallback={<ShipFallback />}>
      <ShipDetails />
    </Suspense>
  )
}

let ship: Ship // undefined until shipPromise resolves
const shipPromise = getShip(shipName, 1000).then((result) => (ship = result))

function ShipDetails() {
  if (!ship) throw shipPromise // Promise is "caught" by Suspense, which awaits is

  return (
    <div className="ship-info">
        ...
    </div>
    )
}

function ShipFallback() {
  return (
    <div className="ship-info">
      ...
    </div>
  )
}
```

#### `use`

The idiomatic way to suspend in React is to use the `use` hook. "use is a React API that lets you read the value of a resource like a Promise or context." The implementation of `use` is something like,

```tsx
function use<Value>(promise: Promise<Value>): Value {
  const usePromise = promise as UsePromise<Value>

  if (usePromise.status === 'fulfilled') {
    return usePromise.value
  } else if (usePromise.status === 'rejected') {
    throw usePromise.reason
  } else if (usePromise.status === 'pending') {
    throw usePromise
  } else {
    usePromise.status = 'pending'
    usePromise.then(
      (result) => {
        usePromise.status = 'fulfilled'
        usePromise.value = result
      },
      (reason) => {
        usePromise.status = 'rejected'
        usePromise.reason = reason
      },
    )
    throw usePromise
  }
}
```

## React Server Components (RSC)

Next.js v12 has a “classic” rehydration model compared to island-based, but Next 13 is moving to server components.
The only stable way to use React Server Components is with the Next.js App Router (1, 3).
By default, every component in the Next.js App Router is a Server Component.
Currently my company is on Next.js 14.2.3, and React 18.3.1 (latest stable versions) but uses the page router not the app router (4).

React Server Components are the latest advancement in pre-rendering content on the web, are pages that span both server and client.
Server rendering happens at the component level, and does not wait for an entire webpage to render on the server.
Component logic such as data fetching and database mutations can be colocated within UI component logic and is executed exclusively on the server.
The generated HTML template is seamlessly streamed into the client-side React tree.

Server components never re-render and are not hydrated (no JS is shipped later).
Server components can contain client components; client and server components are interweaved.
To import a Server Component into a Client Component correctly pass it as a prop, else it is treated as a client component.

To be clear, server and client components are server-side rendered, but client components are hydrated with JS and can re-render on the client, whereas server components are not hydrated and only render on the server.
Because only client components can re-render on the client, only they can contain _mutable_ state, listen to DOM events, and access browser APIs, i.e. use `useState` and `useEffect` (2).

React Server Components *only run on the server*.  
Because they run *only on the server*, Server Components can use secret keys and access backend resources directly.

Because they run *only on the server*, Server Components do not increase the size of the JS bundle size shipped to the client, so import large libraries, like react-markdown, without fear of increasing the bundle size the end user needs to download.
RSC also supports asynchronous data fetching directly within server components, significantly improving the developer experience compared to Next.js’s older getServerSideProps API.
This is true for initial page load and page transitions, “Server Components allow your application code to be automatically code-split by route segments. This means only the code needed for the current route is loaded on navigation.” (25)

We said though that Server Components only render on the server.  
When a user interacts with an application they trigger state changes and side effects though, which would require a component to rerender.  That is, Server Components code is _not_ available on the client for a rerender. This is where Client Components come in.

### Usage

- Generally use Server Components for server-side data fetching, computation, wherever you can, reasonably for improved performance from caching.
- **How to make a Server Component** (a component the runs only on the server): do nothing. In app router, all components are Server Components by default.  

## Client Components (CCs)

Are “traditional” React components that are server-side rendered.  
They are executed on the server and in the browser.  
They can use state, effects, and browser-specific APIs.

It’s only in Client Components that can we **use lifecycle hooks**, such as useEffect or useState (15).  
That’s because Client Components are SSR’d like we are used to: rendered on the server, hydrated on the client.

### Usage

Use Client Components for interactivity (15).  
As an analogy, SCs are the stage that you set up ahead of time and are fixed during a performance.  
CCs are like actors on the stage during the play, they interact with the audience and change over time.  
We want to use Server Components as much as possible, but a stage without actors is not a play.

**How to make a Client Component** (a component that runs on the server and client, SSR): add a `use client` directive to the top of the component file, or import it into another Client Component. Anything rendered by a Client Component becomes a Client Component. It’s a point of infection. Imagine an invisible server-client boundary is created whenever a Client Component is encountered in the component hierarchy. "A "use client" directive at the top of a file defines that it's a boundary between server and client."

(How to make a Client-only Component: with React.lazy)

## React Server Component Protocol

The React Server Component Protocol is a superset of JSON
It is the format in which React trees get serialized and deserialized by React.
It is an "implementation detail" of React and therefore not documented except in the source code.
React provides a writer and reader for the RSC protocol that are versioned in lockstep together.

Given the JSX, 

```jsx
export default function App() {
  return <h1>Hello World</h1>
}
```

The RSC protocol serialises this component to,

```json

```

The React Server Component Payload contains:

- The rendered result of Server Components  
- Placeholders for where Client Components should be rendered and references to their JavaScript files  
- Any props passed from a Server Component to a Client Component

1. <https://overreacted.io/introducing-rsc-explorer>

## Server vs. Client Components: when to use each for what and how  

Recall what we have in Pages Router:

- Traditional Server-Side Rendering (SSR) renders entire pages and rehydrates them in the browser  
- React Server Components (RSC) render components on the server without sending their JavaScript to the client. Serve static or non-interactive elements as plain HTML, reduce client-side bundle sizes, accelerate initial page loads, and cleanly separate concerns.  
- Developers seamlessly mix server components (no hydration, no JS on the client) with client components (interactive, hydrated), creating an “islands architecture” where each UI element uses the most appropriate rendering method.

The fundamental technical implementation is straight forward:

- A real RSC implementation encodes the JSX in the HTML payload.  
- A production-ready RSC setup sends JSX chunks as they're being produced instead of a single large blob at the end.  
- When React loads, hydration can start immediately—React starts traversing the tree using the JSX chunks that are already available instead of waiting for all of them to arrive.  
- RSC also lets you mark some components as Client components, which means they still get SSR'd into HTML, but their code is included in the bundle.  
- For Client components, only JSON of their props gets serialized.

“What React Server Components do is give you optionality to decide where you want your code to run: the server, the client, or both. And when: build-time or run-time (27).”

The DX implications RSC enables fine-grained control: where our code runs is explicitly defined: the server, the client, or both.
Because we not only can be explicit about where our code runs, i.e. if it’s a client or server component, but we always should be aware of it.

### Rules of Server and Client components

1. Server Components can render both Server Components and Client Components  
2. Client Component can render only other Client Components  
3. Server Components can only pass some types of data to Client Components as props

“When it comes to deciding server-client boundaries the parent/child relationship doesn't matter.” What matters is the import relationship and **who is passing the props**. 

Need to think about component composition management, can’t just import anywhere, can’t just pass anything. All code written for Server Components **must be serializable**. Functions or classes cannot be passed from Server Components to Client.

What is an SC and what is a CC can be tricky to architect. Sometimes a component silently executes on both the client and server, or loudly complain and require manually restructuring of the component tree.

### How to structure the application to for RSCs: component composition  

Created client components only at necessary interaction boundaries  
Passed server-generated props to client components
Implemented forms with server functions that revalidated API calls  
Placed React hooks strategically in leaf components or lower in the component tree

### Pattern 1: Data locality

Only Server Components **can be asynchronous**, so we can await data `fetch`ing on the server before returning JSX to the client.

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

### Pattern 2: Weaving interactivity

“What if I need to useState high up in the application? Does that mean everything needs to become a Client Component? It turns out that in many cases, we can work around this limitation by restructuring our application so that the owner changes. (12)” The key is, Server Components can be passed to Client Components as props.

New terminology: weaving in RSCs, “Doughnut pattern”. Donut Components are a way to “weave” interactive client-side components at the top of the rendering tree without converting the entire application into client components (16).

If you follow the doughnut pattern strictly, it upsets encapsulation we enjoyed from React so far, that its, encapsulation of functionality within one component. So as with everything there should be a balance.  
Even if something can be a Server Component it doesn’t mean it must be.  
Don’t turn components inside out to achieve maximum server-only rendering.

### Pattern 3: Naming

- const HeaderServer, const HeaderClient  
- Header.Client  
- Header.server.tsx, Header.client.tsx (or Header.Server.tsx, Header.Client.tsx)

### Pattern 4: Improve TTFB with streaming with caution

TTFB or Time to First Byte measures how long it takes for a user’s browser to **receive the first byte of data*- from the server after making an HTTP request. Therefore it includes 1. sending the request, 2. server processing like DB querying, 3. streaming the first byte of the response. Our domain is 2, cloud infra’s is 1 and 3.

- `useStaticData`: we want to slowly remove component dependency on useStaticData in favour of doing more data fetching on the server  
  - Can the data be passed down?  
  - Can you adjust the component composition so the data can be passed in?  
  - else apply `use client`

If suspended components are only visible after hydration (29), then it sounds like we should never suspend the largest contentful area, or LCP will degrade.

It also sounds like there is some healthy doubt about whether streamed content is available to Google Bot, since JS is required to swap out the loading state. I would probably default to "plain SSR" without stream for content that must be crawlable to be on the safe side.

### Summary

1. **shift down server-client boundary**: the structure the application so that things that change state are moved down the component hierarchy to shift the server-client boundary out.  
2. **isolate client leafs**: blips where functions need to be passed into client Components  
3. BE services can be called directly in RSCs. Move blocking data fetching from BE services down to not block page rendering  
4. If you have some server-side state that you want to share across server components, Next.js recommends using either the cache or fetch APIs to do so. Use fetch when you want to share a resource like the response of a REST API call across server components.  
5. Use cache when fetch is not an option—for instance, to share the result of a database query.  
6. Move client functionality down component hierarchy to get as much server-side rendering as possible to get the most benefit (server-client boundary negotiation.) \<fig 3. client server boundaries\>  
7. Split up client and server concerns into separate components

### Common errors: what they mean and how to solve them

> Error: You’re importing a component that needs `useState`. This react hook only works in a client component. To fix, mark the file (or its parent) with the “useClient” directive.

The `useState` hook is used for client side state, so this needs to be a Client Component. Same goes for `useEffect`.

> Error: Event handlers cannot be passed to Client Component props.

There are limitations on what can be passed as props from Server Components to Client Components. The props must be [serialisable](https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values), that is, the data structured must be convertable to a format suitable for transfer over a network (19). JS functions and classes cannot be serialised, but plain objects can as JSON, for example. So when passing props keep in mind the conceptual “server-client boundaries” being created to predict what can and can’t easily be passed. \<ex. cookieManager example\> Two options: (1) rearchitect component composition, (2) change data structure.

> Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.

Encountered when trying to pass the whole context object to a client component because the cookie manager is a class. Resolved by removing the cookie manager from the object.

### Conclusion

- rearchitect components to benefit  
- set up and monitor CWVs to establish a baseline  
- try suspending slow components (Client and Server)  
- use `use` to resolve promises deep in the tree with Suspense but be sure to size fallbacks correctly to avoid CLS  
- use pending indicators with useTransition to give the use immediate feedback

### Questions

- T/F: I can use useEffect in a Server Component  
- T/F: I can use useState in a Server Component  
- T/F: Client Components are only rendered on the client  
- T/F: The `use client` directive marks the code as running on the client  
- TF: A Client Component runs only on the client  
- Server and Client component naming convention poll

## References

1. <https://github.com/epicweb-dev/react-suspense/blob/main/exercises/01.fetching/04.solution.util/index.tsx>
2. <https://react.dev/reference/react/use>

---

- [ ] 1. [https://www.plasmic.app/blog/how-react-server-components-work](https://www.plasmic.app/blog/how-react-server-components-work)  
- [ ] 2. [https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)  
- [ ] 3. [https://apidiagram.com/](https://apidiagram.com/)  
- [ ] 4. [Data Fetching with React Server Components](https://www.youtube.com/watch?v=TQQPAU21ZUw)  
- [ ] 5. [https://github.com/reactwg/server-components/discussions/5](https://github.com/reactwg/server-components/discussions/5)  
- [x] 6. [React Server Components, Worth Your Time?](https://www.youtube.com/watch?v=c0E_gh1yeRA&t=464s)
- [x] 7. [Nik Sumeiko (LinkedIn)](https://www.linkedin.com/feed/update/share:7298319833580892161/?midToken=AQG_eKV1tBRWhQ&midSig=1-Q7Hv7LezOrE1&trk=eml-email_career_insights_01-network~post-0-wrapper~link&trkEmail=eml-email_career_insights_01-network~post-0-wrapper~link-null-3b6y0p~m7ut2ho4~x8-null-null&eid=3b6y0p-m7ut2ho4-x8&otpToken=MTAwNTFlZTExYjI2Y2FjNmJkMjQwNGVkNDIxZmU2YjU4ZWM3ZDE0MzlmYWM4ZjYxNzdjNTAwNmU0YjU4NThmYmYyZGZiMWIxNDZmOGYxYzY0MWZjZmJhYzBkZTlmZjdkYjI2MmU4YmVhYzIyZWEyNDEzYTAsMSwx)~~  
- [ ] 8. [https://www.patterns.dev/react/react-server-components/](https://www.patterns.dev/react/react-server-components/)\-  
- [ ] 9. [https://github.com/reactjs/rfcs/blob/bf51f8755ddb38d92e23ad415fc4e3c02b95b331/text/0000-server-components.md](https://github.com/reactjs/rfcs/blob/bf51f8755ddb38d92e23ad415fc4e3c02b95b331/text/0000-server-components.md)  
- [ ] 10. [https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components)  
- [ ] 11. [React Server Components: A Comprehensive Breakdown](https://www.youtube.com/watch?v=VIwWgV3Lc6s)  
- [x] 12. [https://www.joshwcomeau.com/react/server-components/](https://www.joshwcomeau.com/react/server-components/)
- [x] 13. [https://parceljs.org/blog/v2-14-0?ck\_subscriber\_id=1774022056](https://parceljs.org/blog/v2-14-0?ck_subscriber_id=1774022056)
- [ ] 14. [https://github.com/reactwg/react-18/discussions/37](https://github.com/reactwg/react-18/discussions/37)  
- [ ] 15. [https://vercel.com/blog/understanding-react-server-components](https://vercel.com/blog/understanding-react-server-components)  
- [ ] 16. [https://frontendatscale.com/blog/donut-components/](https://frontendatscale.com/blog/donut-components/)  
- [ ] 17. [https://nextjs.org/learn/dashboard-app/streaming](https://nextjs.org/learn/dashboard-app/streaming)  
- [ ] 18. [https://react.dev/blog/2024/12/05/react-19\#whats-new-in-react-19](https://react.dev/blog/2024/12/05/react-19#whats-new-in-react-19)  
- [ ] 19. [https://react.dev/reference/rsc/use-server\#serializable-parameters-and-return-values](https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values)  
- [x] 20. [https://github.com/reactwg/react-18/discussions/37](https://github.com/reactwg/react-18/discussions/37)
- [ ] 21. [https://www.youtube.com/watch?v=eO51VVCpTk0](https://www.youtube.com/watch?v=eO51VVCpTk0)  
- [ ] 22. [https://www.mux.com/blog/what-are-react-server-components](https://www.mux.com/blog/what-are-react-server-components)  
- [ ] 23. [https://github.com/aurorascharff/next15-filterlist](https://github.com/aurorascharff/next15-filterlist)  
- [ ] 24. [https://nextjs.org/learn/dashboard-app/getting-started](https://nextjs.org/learn/dashboard-app/getting-started)  
- [ ] 25. [https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating\#1-code-splitting](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-code-splitting)  
- [ ] 26. [https://www.nirtamir.com/articles/the-limits-of-rsc-a-practitioners-journey?ck\_subscriber\_id=1774022056](https://www.nirtamir.com/articles/the-limits-of-rsc-a-practitioners-journey?ck_subscriber_id=1774022056)  
- [ ] 27. [https://saewitz.com/server-components-give-you-optionality](https://saewitz.com/server-components-give-you-optionality)
- [ ] 28. <https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md>
- [ ] 29. <https://github.com/vercel/next.js/issues/50150#issuecomment-2184934191>
