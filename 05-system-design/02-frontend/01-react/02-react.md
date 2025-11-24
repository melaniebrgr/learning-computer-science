# React

## The render cycle

UI is a function of state in react. Three "state changes" that trigger a re-render: state changes, the parent changes (if the component is memoised, it checks if the props changed), and context changes.

### 1. Render phase

The render phase is when React figures out what the changes meant by working with the virtual DOM.

- virtual DOM is built
- virtual DOM is reconciled with the real DOM

In response to a change in state, e.g. useState, React asks components to describe UI from current props/state. JSX becomes React elements (plain objects) that represent intended UI structure. The in-memory tree of objects describing the HTML elements is the **virtual DOM**. When a parent renders, all of its children render recursively, regardless of prop equality, unless the child is memoised. From React 18, this render work can be paused, resumed, or discarded; multiple renders may be thrown away before being committed (concurrency). During **reconciliation**, react diffs element types/keys to decide what to reuse or replace.

Since React 16 React used "Fiber" data structures that keep track of component instances, and their children and the previous iterations of them. The virtual DOM is less and less true with this structure.

### 2. Commit Phase

- Necessary changes are applied to the real DOM

All calculated changes are applied synchronously. `useEffect` runs shortly after via a separate “Passive Effects” step.

### 3. Cleanup Phase

## Fiber

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

### useState, useReducer

```tsx
const [state, setState] = useState(initialState);
```

`useState` and `useReducer` create values that are preserved across renders and triggers a re-render when the change. The only different is that `useReducer` follows the reducer pattern.

### useRef

```tsx
const ref = useRef(initialValue);
```

create a value that is preserved across renders, but won't trigger a re-render when it changes.

### useLayoutEffect, useEffect

```tsx
useEffect(didUpdate);
```

In React, both `useEffect` and `useLayoutEffect` hooks synchronize synchronize components with external systems, but their timing differs. useEffect fires after the browser has painted the screen. It’s non-blocking, letting the UI render first, then running side effects. This is ideal for data fetching, subscriptions, logging, and anything that doesn’t need to affect the initial layout.

useLayoutEffect fires in the same commit phase, right after React mutates the DOM but before the browser paints. It blocks painting until it finishes, making it suitable for reading layout (measurements) and synchronously applying DOM writes that must be reflected immediately, preventing visual flicker or layout shift. Overuse can hurt performance because it delays rendering.

A practical rule: prefer useEffect by default; reach for useLayoutEffect only when you must measure or adjust layout synchronously to avoid visible jumps.

### useMemo, useCallback

```tsx
const memoizedValue = useMemo(calculateValue, dependencies);
```

`useMemo` and `useCallback` cache values between renders. The former caches the result of a calculation, the latter caches a function.

### useOptimistic

Optimistically update the UI as you wait for the mutation request (PUT, POST, DELETE) to complete, assuming that in most cases the request is successful. The case where the request errors does need to be handle however. One way to do this is to wrap the request in a try catch and its its successful or unsuccessful, calling a revalidate method to trigger the component render with the "source of truth" data from the database.

```tsx
import { useOptimistic, useState, useRef, startTransition } from "react";
import { deliverMessage } from "./actions.js";

function Thread({ messages, sendMessageAction }) {
  const formRef = useRef();
  function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    startTransition(async () => {
      await sendMessageAction(formData);
    });
  }
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

Unbatch a state update so that it does not slow down the component render. Usually a loading message or style is displayed instead. Overall, experience is less laginess in the UI.

## Components

### Suspense

- What are the differences in Suspense in client-side vs. server-side rendering
- What are the main benefits, really
- Tradeoff?
- Suspense boundaries

Suspense is a rendering primitive.

> All right, finally, once we have shown the user everything that they need to show,then we will call useEffect. UseLayoutEffect happens before we render the DOM,which means we could gum up the entire works.UseEffect happens after we've done it.And we've shown them everything and then we can go ahead and, you know,call any APIs and this is important.The reason I bring this up now versus otherwise I was going to have to pepper these things the entireday and it felt awkward, which is why if we're using something likeuseEffect for making API calls, it gets you into a pretty weird situation because you have to renderthe entire DOM. Then you call useEffect to go get your APIs so that you can go renderthe DOM again, right? And for a while, if you're like,I do that on my app, and now I feel bad, don't feel bad.You didn't have a choice for a while. It was the effectivelyblessed way to do it. But now there are better ways,which is why we're spending this time together.Now, you might consider doing something like suspense, where,hey, on that render, as we were kind of going through the tree,I hit a suspense point.All of those API calls will fire off immediately and they'll show the suspended DOM nodes,like the loading or whatever, will finish up.They've already started and then they can come back.And if they come back before React is done rendering and it can decide that it can do it fastenough, you'll get it immediately and not see that flash of nothing, and then all your stuff,right? And so ideally, stuff that was the best practice at one point is not thebest practice anymore. You didn't do anything wrong.Things just got better, right?And if you don't opt into these things, you get the same experience you always had.It's not like things are worse, but there is a better life,and we will talk about it today. So useEffect will always be called after the rendering phase when wehave an empty dependency array.Typically examples calling APIs in a useEffect with the empty useEffect always happens after we've committedeverything to the DOM, right? So if it is like that useEffect with no dependencies that you only wantto run once at the beginning, it will have rendered the component and all the children and committedthat all to DOM and then call you useEffect, right?And the goal there is not like, well, now I have incomplete data.The goal was like, let's get something on the page.Let's not show them nothing, right, and not render,right, because suspense did not exist at that point,right? And so you didn't really have much of a choice.It was like a trade-off that no one felt great about,and there are now other ways to do this as well.And there's nothing wrong, like, I'm not saying tomorrow you need to go refactor your entire codebasebut there are probably placeswhere you can have some niceties because asynchronous stuff in a UI is the worstright? Especially when you bringin TypeScript, but you don't really know if that's null or the actual value yet,and then you've got to pass down, it could be null or the actual value everywhere.

#### Technically

Children are allowed to “suspend” by throwing a promise during render.
React intercepts that throw in the Fiber reconciler, marks the nearest Suspense boundary as pending, renders its fallback subtree, and retries the suspended subtree once the promise resolves.
This is not exceptions-as-errors; it’s control flow. The thrown promise is treated as a continuation token.

A continuation token is a unique string used for pagination, allowing applications to resume a query or process a large set of data from where it left off. When a request returns a partial set of results, it includes a continuation token; the application then sends this token back to the server to get the next page of results until all data has been retrieved. (MB: this has SSR implications.)

#### UX

React's way of declaratively managing the component UI while we wait for data or if the request fails is using **Suspense** and **ErrorBoundary**. The trick to trigger these two things to happen when rendering the UI is the `use` hook.

How does a component suspend? Promise execution begins eagerly. If the promise value isn't returned by the time the component renders the promise is thrown synchronously. The `Suspense` boundary catches the throw and renders the fallback component instead. Under the hood it awaits the promise result and when it does return the real component is rendered instead. The same principle works for error boundaries. When the data for the Suspended component is available, it is streamed over the Network.

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

I.e. the state and throwing behaviour is encapsulated.

#### Tradeoffs

- Intentionality of the fallabck loading state.

## (React) Server Components (RSC)

Next.js v12 has a “classic” rehydration model compared to island based, but Next 13 is moving to server components.
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

## References

1. <https://github.com/epicweb-dev/react-suspense/blob/main/exercises/01.fetching/04.solution.util/index.tsx>
2. <https://react.dev/reference/react/use>
