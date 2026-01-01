# Data fetching

Most applications require some level of data fetching from a server. The code required to perform this data fetching can be as simple as a `fetch` request:

```js
const response = await fetch('https://api.example.com/data')
const data = await response.json()
```

That's simple enough, but no matter how fast your server is, you need to think about what the user's looking at while they wait and what happens if the request fails. You don't get to control the user's network connection. You can't control the user's connection relability either. Production applications should handle

- success states
- loading states
- error states

`useEffect` was the most common way to to fetc data in React applications but has limitations in that it's not easy to share states between components and URLs.

React has a nice way to manage loading and error states declaratively in components using **Suspense** and **ErrorBoundary**. The trick to trigger these two things to happen when rendering the UI is the `use` hook.

**Tanstack (React) Query** is described as a **async state management library**. The QueryClient contains a global, in-memory JS cache. A global cache means that every component subscribing to the same key will receive the same value, and the query function will not be reinvoked by every component.

The query client instantiated outside of React (so the reference is stable) and provided to the React component tree via with Context. Because a static object is provided, Query can be interacted with without causing rerenders.

The `useQuery` hook is the main method of interaction with Query. When invoking `useQuery`, it's almost always given two things: a `queryKey` and a `queryFn` that takes a promise. If there's data associated with the query key, it's returned, else the query promise is resolved and the value placed in the cache.

When a component mounts, React Query creates an observer for each call to `useQuery`, and _subscribes_ the component to that specific query key and triggering a re-render of the component whenever the cache updates. 

```js
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function Book() {
  const query = useQuery({ queryKey: ['book'], queryFn: () => Promise.resolve('The Hobbit') })

  return <main><h2 className="book-title">{query.data}</h2></main>
}

export default function App() {
  return <QueryClientProvider client={queryClient}><Book /></QueryClientProvider>;
}
```

## References

1. https://github.com/epicweb-dev/react-suspense/tree/main/exercises/01.fetching
2. https://ui.dev/c/query