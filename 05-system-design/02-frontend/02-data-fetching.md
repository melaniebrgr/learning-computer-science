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

## Tanstack Query

**Tanstack (React) Query** is described as a **async state management library**. Though commonly used for fetching data, it can be used with any API that returns a function. That is, React Query only understands fulfilled or rejected Promises. Note that since the fetch API does not reject the Promise when the HTTP request fails, React Query will interpret this as a successful request and will not change the status of the query to error. So, to handle failed HTTP requests, throw an error or return a rejected Promise.

The QueryClient contains a global, in-memory JS cache. A global cache means that every component subscribing to the same key will receive the same value, and the query function will not be reinvoked by every component.

The query client instantiated outside of React (so the reference is stable) and provided to the React component tree via with Context. Because a static object is provided, Query can be interacted with without causing rerenders.

### useQuery: key

The `queryKey` is more than a cache lookup but part of the architecture avoiding race conditions and overwrites. `queryKeys` directly correspond to entries in the cache. After all, they are the key of the cache's Map. When a value in the queryKey array changes the observer changes what it's observing. 

So it is important to use the right query key! 

Each combination of dependencies to the queryFn (sort: 'created', sort: 'updated', etc.) must get its own query key and therefore cache entry. The values are cached alongside each other. Incidentally this avoids overwrites and race conditions. Note, `@tanstack/eslint-plugin-query` plugin can statically check that everything used inside the queryFn also appears in the queryKey.

What this means is that a dynamic value in the queryKey ensures the correct data is fetched and accessed by the component.

### useQuery: data

The `useQuery` hook is the main method of interaction with Query. When invoking `useQuery`, it's almost always given two things: a `queryKey` (some array of any values) and a `queryFn` (a promise). If there's data associated with the queryKey, it's returned, else the queryFn is resolved and the value placed in the cache.

Note, if a queryFn fails, it is silently retried 3 times, with an exponential backoff delay before capturing and displaying an error to the UI. Retry behaviour can be customised with the `retry` and `retryDelay` properties.

When a component mounts, React Query creates an observer for each `useQuery` call, and _subscribes_ the component to that specific queryKey, triggering a re-render of the component whenever the cache updates. Data is _only_ fetched when it is initially accessed by the first component. From there on, that initial value is returned in all components accessing that queryKey (until it is refetched, see staleTime).

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

When are qeries cleaned? When a query result has no more active instances of useQuery, useInfiniteQuery or query observers, it is labeled as "inactive" but remains in the cache. By default, after 5 minutes inactive queries are garbage collected. This time can be customised with the `gcTime` property.

### useQuery: status

Recall that when fetching data the status of the fetch can be in three states: loading, success and error and although Query lets you write synchronous looking code, asynchronous states still need to be handled. Query exposes status via the status property or the derived boolean flags, `isPending` (the default status, meaning simply that no data is available yet) etc.

### useQuery: staleTime and refetch triggers

> Out of the box, TanStack Query is configured with aggressive but sane defaults

One of these defaults is a staleTime of 0 ms. That is, as soon as data is cached in Query it is considered stale. This means that whenever a refetch _trigger_ occurs, the data will be refetched. (This doesn't necessarily mean a full server round trip if HTTP Cache-Control headers have been configured.) There are 5 "types" of staleTime values in milliseconds, staleTime of

1. 0: never fresh
2. 60_000: fresh for 60s (for example, but can be any number) 
3. Infinity: never refetched unless manually invalidated
4. 'static': never refetched _even if_ manually invalidated
5. dynamic: as of Query v5 staleTime takes a function that is passed the query so that staleTime can be dynamic, i.e. depending on the Cache-Control HTTP header

It is important to note that a stale value is not automatically refetched. Query refetches stale data (must be marked as stale first) only when specific triggers occurs:

- **mount** (refetchOnMount): a new instance of the query mounted
- **window focus** (refetchOnWindowFocus): the application window is refocused
- **reconnect** (refetchOnReconnect): the network is reconnected
- **interval**: the refetchInterval expires
- **manual invalidation**: `queryClient.invalidateQueries()` marks queries stale and refetches active ones immediately
- **manual refetch**: Query exposes a `refetch` method for manual refetch

`isFetching` indicates if a background fetch is happening. (`isPending` is about whether the query has any data yet (initial load), while `isFetching` is about whether a network request is in flight, regardless of whether there is already cached data).

## References

1. https://github.com/epicweb-dev/react-suspense/tree/main/exercises/01.fetching
2. https://ui.dev/c/query
3. https://tkdodo.eu/blog/react-query-as-a-state-manager