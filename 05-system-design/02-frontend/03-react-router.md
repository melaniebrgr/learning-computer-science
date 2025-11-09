# React Router

React Router is a declarative, component based, client and server-side routing library for React created in 2014.
React Router gives you **a declarative and composable API for adding to and updating the user's navigation history** -- "routing primitives" -- a collections of components and hooks.

React Router ships three router variants. The routers are used to be aware of and in control of an app's location:

1. **BrowserRouter** uses the browser's history API (via the history library, which is like jQuery for the history library) and React Context. It is responsible for passing application routing information to all components. Wrap the application in BrowserRouter if the application is used on the web.

2. **MemoryRouter** keeps track of the history of the application in memory, rather than in the URL. Use this instead of BrowserRouter if you're developing a React Native application or for unit/integration testing.

3. **StaticRouter**, as the name implies, is useful in environments where the app's location never actually changes, like when rendering a single route to static HTML on a server. Server-side rendering typically pairs with StaticRouter during render, then hydrates to BrowserRouter on the client.

> The history library lets you easily manage session history anywhere JavaScript runs. A history object abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, and persist state between sessions.

Then, the **Route** component maps a path to a component. The Route component always renders _something_, either a component or null. A Route is wrapped in a **Routes** component that intelligently chooses which Route(s) are the best to render.

Finally, the **Link** component is used to navigate to a different route. The `to` prop accepts a string or an object with `pathname`, `search`, and `state` properties.

## Questions

[] BrowserRouter is not explicitely used on StudocuAI, instead routes are configuder in a route.ts file. Unclear is the BrowserRouter component is used inside.

## References

1. (history library)[https://github.com/remix-run/history]
