# Data fetching

Most applications require some level of data fetching from a server. The code required to perform this data fetching can be as simple as a `fetch` request:

```js
const response = await fetch('https://api.example.com/data')
const data = await response.json()
```

That's simple enough, but no matter how fast your server is, you need to think about what the user's looking at while they wait. You don't get to control the user's network connection. For a similar reason you also need to think about what happens if the request fails. You can't control the user's connection relability either.

React has a nice way to manage both of these declaratively in components using **Suspense** and **ErrorBoundary**. The trick to trigger these two things to happen when rendering the UI is the `use` hook.

## References

1. https://github.com/epicweb-dev/react-suspense/tree/main/exercises/01.fetching