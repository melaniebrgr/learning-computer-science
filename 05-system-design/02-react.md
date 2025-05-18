# React

## Suspense

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

## `use`

The idiomatic way to do this is React is to use the `use` hook. "use is a React API that lets you read the value of a resource like a Promise or context." The implementation of `use` is something like,

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

## References

1. <https://github.com/epicweb-dev/react-suspense/blob/main/exercises/01.fetching/04.solution.util/index.tsx>
2. <https://react.dev/reference/react/use>
