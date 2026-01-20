# Data fetching

Most applications require some level of data fetching from a server. The code required to perform this data fetching can be as simple as a `fetch` request:

```js
const response = await fetch('https://api.example.com/data')
const data = await response.json()
```

In reality in application development there is a lot more to consider: async states, caching, polling, error handling (exponential backoff), dependent requests, duplication, race conditions...

No matter how fast your server is, you need to think about what the user's looking at while they wait and what happens if the request fails. You don't get to control the user's network connection. You can't control the user's connection relability either. Production applications should handle

- success states
- loading states
- error states

In React, the concept of triggering a fetch directly from a component is known as "fetch-on-render" and it's not ideal.
Instead, aim to fetch as early as possible which often means as high up in your component tree as you can.
It's a good idea to "render-as-you-fetch" by prefetching a Query before React gets a chance to render the component, e.g.
trigger prefetching are

- event handlers (when transitioning from one page to the next),
- route loaders (when integrating with a router) or
- server components
- with TanStack Query `usePrefetchQuery` in client side apps

`useEffect` was the most common way to to fetch data in React applications but has limitations in that it's not easy to share states between components and URLs.
React has a nice way to manage loading and error states declaratively in components using **Suspense** and **ErrorBoundary**. The trick to trigger these two things to happen when rendering the UI is the `use` hook.

## Tanstack Query

**Tanstack (React) Query** is described as a **async state management library**. The Query client contains a global, in-memory JS cache. Every component subscribing to the same key will receive the same value. The query function will not be reinvoked by every component. The Query client also handles data synchronisation with the server.

The query client is instantiated outside of React (so the reference is stable) and provided to the React component tree via with Context. Because a static object is provided, Query can be interacted with without causing rerenders.

The `useQuery` hook is the main method of interaction with Query. When invoking `useQuery`, it's almost always given two things: a `queryKey` (some array of any values) and a `queryFn` (a promise). If there's data associated with the queryKey, it's returned, else the `queryFn` is resolved, and the resolved value is cached and returned.

### useQuery, useQueries

When a component mounts, React Query creates an observer for each `useQuery` call, and _subscribes_ the component to that specific `queryKey`, triggering a re-render of the component whenever the cache updates. Data is fetched when the component is initially mounted (and on other triggers, see previous). From there on, the cached value is returned in all components accessing that `queryKey`.

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

When are queries cleaned? When a query result has no more active instances of `useQuery`, `useInfiniteQuery` or query observers, it is labeled as "inactive" but remains in the cache for 5 minutes. After 5 minutes inactive queries are garbage collected by default. This time can be customised with the `gcTime` property.

For fetching multiple queries in parallel but treat them as a single unit, use `useQueries`. The queries property of the useQueries hook accept and array of query objects. It still saves each query result to a single cache key. It can also be set up handle multiple dynamic queries. Multiple singe instances of useQuery in a component will also execute the request in parallel, but require you to manage each loading state and error state individually. With `useQueries` the the status is combined and you won't have loading spinners everywhere. `useQueries` also comes with a combine option built in for conveniently deriving a result frrom combining the data returned from all the queries.

### useQuery property: queryKey

The `queryKey` is more than a cache lookup but part of the architecture avoiding race conditions and overwrites. `queryKeys` directly correspond to entries in the cache. They are the literal key of the cache's Map. When a value in the queryKey array changes, the observer changes what it's observing.

So it is important to use the query key effectively! 

In general, each combination of dependencies to the queryFn (sort: 'created', sort: 'updated', etc.) must get its own query key and therefore cache entry. The values are cached alongside each other, avoiding overwrites and race conditions. So a dynamic value in the queryKey ensures the correct data is fetched and accessed by the component. The `@tanstack/eslint-plugin-query` plugin can help statically check that everything used inside the queryFn also appears in the queryKey.

TL;DR dynamic values that would form part of the request much be part of the key

### useQuery property: queryFn

Though commonly used for fetching data, Query can be used with any API that returns a promise. That is, React Query understands all and only fulfilled or rejected Promises.

If a queryFn fails, it is silently retried 3 times, with an exponential backoff delay before capturing and displaying an error in the UI. Retry behaviour can be customised with the `retry` and `retryDelay` properties.

Note that since the `fetch` API does not reject the Promise when the HTTP request fails, React Query will interpret this as a successful request and will not change the status of the query to error. So to handle failed HTTP requests that use fetch, throw an error or return a rejected Promise from the `queryFn`.

In summary, a query function

- must return a promise
- are retried 3x with backoff in the background if they fail
- and must throw/reject to error

### useQuery property: enabled

By default, Query will trigger the `queryFn` on component mount but there are some cases where the query should be delayed, e.g. until user input has been received. To delay a fetch, Query exposes the `enabled` property, which takes a boolean, and prevents the query from automatically running when false. This can also be leveraged to make one query dependent on the data output of another. (With TS, a "skip token" may be needed.) The alternative to using the enabled property is to conditionally render the component that fetches the data but it is a less explicit way of delaying rendering overall.

For dependent queries, combining them within one query function is possible, but this can miss out on the some of the benefits of the Query cache. For example, some data could be shared between other dependent requests, however the query key will cache the whole value duplicating data between keys.

To summarise the tradeoffs of combining multiple fetches into one query key:

- both requests will always need to fetch and refetch
- both error together (even if only request fails)
- data will be duplicated in the cache
- less flexibility in how that data is handled overall (e.g. different staleTimes)

Instead, create a query per endpoint and using the enabled property to pass a value the next query allows the components to reuse a single cache.

### useQuery property: staleTime and refetch triggers

An elapsed staleTime queues data for refetching. A trigger actually refetches it.

> Out of the box, TanStack Query is configured with aggressive but sane defaults

One of these sane but aggressive defaults is a staleTime of 0 ms. What this means is that as soon as data is cached in Query it is considered stale and that whenever a refetch _trigger_ occurs, the data will be refetched. However, this doesn't necessarily mean a full server round trip if browser cachine with HTTP Cache-Control headers has been configured. There are 5 "types" of staleTime values in milliseconds, a staleTime of

1. 0: the data is never fresh
2. 60_000: fresh for 60s (for example, but can be any number) 
3. Infinity: never refetched unless manually invalidated
4. 'static': never refetched _even if_ manually invalidated
5. (query) => {}: as of Query v5 staleTime takes a function that is passed the query object so that staleTime can be calculated dynamically, i.e. to depend on the Cache-Control HTTP header

It is important to note that a stale value is not immediately refetched. Query refetches stale data (and it must be marked as stale first) only when a specific trigger occurs:

- **query key change**: the query key referenced by the component changes ("root cause" may be a component mount though?)
- **mount** (refetchOnMount): a new instance of the query mounted
- **window focus** (refetchOnWindowFocus): the application window is refocused
- **reconnect** (refetchOnReconnect): the network is reconnected
- **interval**: the `refetchInterval` expires if set.
- **manual invalidation**: `queryClient.invalidateQueries()` marks queries stale and refetches active ones immediately
- **manual refetch**: the fetch method is called (Query exposes a `refetch` method for manual refetch)

### useQuery property: gcTime and garbage collection

A garbage collection timer is started for a query key once all observers of that query key have been removed, i.e. all the components that registered that key have been unmounted. By default, the timer is 5 minutes. After the gcTime expires, the query is removed from the cache. This can be observed in the Query dev tools. The setup helps ensure we don't run out of memory.

### useQuery property: refetchInterval and polling

The refetch interval is used to regularly poll the backend when you want the data to be as fresh as possible. The timer is smart enough to reset if another trigger that refetches the data occurs in the mean time, and can also be set up to poll _until_ some condition is met. A function can be passed to refetch interval which gets passed the query. So, for example, if, after a few polls, the endpoint indicates that there is no more data, `false` can be returned to conclude the polling. If a number is returned it will be used as the refetchInterval.

### useQuery result: status

Recall that when fetching data the status of the fetch can be in three states: loading, success or error. Although Query lets you write synchronous looking code, these three asynchronous states to considered. Query exposes a `status` via the status property and has the following derived boolean flags:

- `isPending`: whether the query has any data yet, "it doesn't mean 'data is loading', it just means 'we have no data yet'[4]. There's no cached data and no query attempt has finished yet.
- `isFetching`: whether the network request is in flight, regardless of whether there is already cached data. It includes background refetches as well as initial loading.
- `isLoading` is true whenever the first fetch for a query is in-flight. It is a derived boolean flag isLoading that is implemented as isPending && isFetching. It is used for the intial load when you might want to display a loading indicator.

When a query is refetched in the background, Query continues to render the cached data while `isFetching` is true, and _only_ updates the UI if the new response differs.
Displaying a loading indicator for isFetching is optional, and useful for cases where it is desirable to display a subtle loading indicator while background data is refetched.

### useSuspenseQuery, useSuspenseQueries

An alternative to granular use of isLoading and status indicators returned in a query is `useSuspenseQuery`.
React will see the Promise returned from the queryFn and will show the fallback from the Suspense component until the Promise resolves.
If it rejects, it will forward the error to the nearest ErrorBoundary.
We no longer have to check for isLoading or status.

If there's multiple children that suspend within a suspense boundary, the Queries fire off in parallel and React "collects" all the Promises that it receives and shows the unified fallback until they're all settled.

Importantly for request parallelisation, a component "suspends" as a whole as soon as one async resource (in our case, a Query) is requested.
If a single component fires off multiple Queries by calling useSuspenseQuery multiple times the requests will not run in parallel. Instead, the component will suspend until the first fetch has finished, then it will continue, just to suspend again until the second Query is completed.

In this case the solution is to use component composition and `useSuspenseQueries`.

There are two key differences between `useQuery` and `useSuspenseQuery`

1. `enabled` is not supported
2. `placeholderData` is not supported

Because the hook must either suspend (throw a Promise) until the data is ready, or return a ready data value the enable property is irrelevant. Instead, queries with data dependencies "just work": queries are run serially when called in the same component. (What about sibling components in one suspence boundary? Are they fetch serially or in parallel?)

Instead of placeholder data, the build in React.useTransition can be deployed. `startTransition`, returnd from `useTransition`, wraps the state update.

## References

1. https://github.com/epicweb-dev/react-suspense/tree/main/exercises/01.fetching
2. https://ui.dev/c/query
3. https://tkdodo.eu/blog/react-query-as-a-state-manager
4. https://github.com/TanStack/query/discussions/4252