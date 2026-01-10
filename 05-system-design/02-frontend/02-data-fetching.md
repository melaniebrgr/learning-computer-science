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

**Tanstack (React) Query** is described as a **async state management library**. The QueryClient contains a global, in-memory JS cache. A global cache means that every component subscribing to the same key will receive the same value, and the query function will not be reinvoked by every component.

The query client is instantiated outside of React (so the reference is stable) and provided to the React component tree via with Context. Because a static object is provided, Query can be interacted with without causing rerenders.

The `useQuery` hook is the main method of interaction with Query. When invoking `useQuery`, it's almost always given two things: a `queryKey` (some array of any values) and a `queryFn` (a promise). If there's data associated with the queryKey, it's returned, else the `queryFn` is resolved, and the resolved value is cached and returned.

### useQuery property: queryKey

The `queryKey` is more than a cache lookup but part of the architecture avoiding race conditions and overwrites. `queryKeys` directly correspond to entries in the cache. They are the literal key of the cache's Map. When a value in the queryKey array changes, the observer changes what it's observing. 

So it is important to use the query key effectively! 

In general, each combination of dependencies to the queryFn (sort: 'created', sort: 'updated', etc.) must get its own query key and therefore cache entry. The values are cached alongside each other, avoiding overwrites and race conditions. So a dynamic value in the queryKey ensures the correct data is fetched and accessed by the component. The `@tanstack/eslint-plugin-query` plugin can help statically check that everything used inside the queryFn also appears in the queryKey.

### useQuery property: queryFn

Though commonly used for fetching data, Query can be used with any API that returns a promise. That is, React Query only understands fulfilled or rejected Promises.

If a queryFn fails, it is silently retried 3 times, with an exponential backoff delay before capturing and displaying an error in the UI. Retry behaviour can be customised with the `retry` and `retryDelay` properties.

Note that since the `fetch` API does not reject the Promise when the HTTP request fails, React Query will interpret this as a successful request and will not change the status of the query to error. So to handle failed HTTP requests, throw an error or return a rejected Promise from the `queryFn`.

### useQuery property: enabled

By default, Query will trigger the `queryFn` on component mount but there are some cases where the query should be delayed, e.g. until user input has been received. To delay a fetch, Query exposes the `enabled` property, a boolean, which prevents the query from running automatically when false. This can also be leveraged to make one query dependent on the data output of another. (With TS, a "skip token" may be needed.) The alternative to using the enabled property is to conditionally render the component that fetches the data but it is a less explicit way of delaying rendering.

### useQuery property: staleTime and refetch triggers

> Out of the box, TanStack Query is configured with aggressive but sane defaults

One of these sane but aggressive defaults is a staleTime of 0 ms. What this means is that as soon as data is cached in Query it is considered stale and that whenever a refetch _trigger_ occurs, the data will be refetched. Though this doesn't necessarily mean a full server round trip if browser cachine with HTTP Cache-Control headers has been configured. There are 5 "types" of staleTime values in milliseconds, a staleTime of

1. 0: the data is never fresh
2. 60_000: fresh for 60s (for example, but can be any number) 
3. Infinity: never refetched unless manually invalidated
4. 'static': never refetched _even if_ manually invalidated
5. (query) => {}: as of Query v5 staleTime takes a function that is passed the query object so that staleTime can be calculated dynamically, i.e. to depend on the Cache-Control HTTP header

It is important to note that a stale value is not immediately refetched. Query refetches stale data (and it must be marked as stale first) only when a specific trigger occurs:

- **mount** (refetchOnMount): a new instance of the query mounted
- **window focus** (refetchOnWindowFocus): the application window is refocused
- **reconnect** (refetchOnReconnect): the network is reconnected
- **interval**: the `refetchInterval`, if set in useQuery, expires.
- **manual invalidation**: `queryClient.invalidateQueries()` marks queries stale and refetches active ones immediately
- **manual refetch**: the fetch method is called (Query exposes a `refetch` method for manual refetch)

### useQuery property: gcTime and garbage collection

A garbage collection timer is started for a query key once all observers of that query key have been removed, i.e. all the components that registered that key have been unmounted. By default, the timer is 5 minutes. After the gcTime expires, the query is removed from the cache. This can be observed in the Query dev tools. The setup helps ensure we don't run out of memory.

### useQuery property: refetchInterval and polling

The refetch interval is used to regularly poll the back end when you want the data to be as fresh as possible. The timer is smart enough to reset if another trigger that refetches the data occurs in the mean time, and can also be set up to poll _until_ some condition is met. A function can be passed to refetch interval which gets passed the query. So, for example, if, after a few polls, the endpoint indicates that there is no more data, `false` can be returned to conclude the polling. If a number is returned it will be used as the refetchInterval.

### useQuery result: data

When a component mounts, React Query creates an observer for each `useQuery` call, and _subscribes_ the component to that specific `queryKey`, triggering a re-render of the component whenever the cache updates. Data is fetched when the component is initially mounted (and on otherr triggers, see previous). From there on, the cached value is returned in all components accessing that `queryKey`.

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

Note it is good practise to only render the "data-ful" component when the status is explicitely success. Else some fallback component should be rendered. That way errors accessing data on `undefined` values go away.

When are qeries cleaned? When a query result has no more active instances of `useQuery`, `useInfiniteQuery` or query observers, it is labeled as "inactive" but remains in the cache for 5 minutes. After 5 minutes inactive queries are garbage collected by default. This time can be customised with the `gcTime` property.

### useQuery result: status

Recall that when fetching data the status of the fetch can be in three states: loading, success or error. Although Query lets you write synchronous looking code, these three asynchronous states to considered. Query exposes a `status` via the status property and has the following derived boolean flags:

- `isPending`: whether the query has any data yet, "it doesn't mean 'data is loading', it just means 'we have no data yet'[4]. There's no cached data and no query attempt has finished yet.
- `isFetching`: whether the network request is in flight, regardless of whether there is already cached data. It includes background refetches as well as initial loading.
- `isLoading` is true whenever the first fetch for a query is in-flight. It is a derived boolean flag isLoading that is implemented as isPending && isFetching. It is used for the intial load when you might want to display a loading indicator.

When a query is refetched in the background, Query continues to render the cached data while `isFetching` is true, and _only_ updates the UI if the new response differs.
Displaying a loading indicator for isFetching is optional, and useful for cases where it is desirable to display a subtle loading indicator while background data is refetched.

## References

1. https://github.com/epicweb-dev/react-suspense/tree/main/exercises/01.fetching
2. https://ui.dev/c/query
3. https://tkdodo.eu/blog/react-query-as-a-state-manager
4. https://github.com/TanStack/query/discussions/4252