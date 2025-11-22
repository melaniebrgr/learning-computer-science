# 02 Rendering

In web development, the Network Boundary is a conceptual line that separates the different environments. For example, the client and the server, or the server and the data store.
As web developers we choose where to place the client-server network boundary wherever it makes the most sense.
For example, in React the "use client" and "use server" convention is used to tell React to do some computational work on the client and server, respectively.

## static site generation (SSG)

SSG occurs at build time, meaning it takes place when the application is initially deployed on the server.

## Server side rendering (SSR)

In SSR the routes are rendered at request time.

- a user requests page, the Next server gets the data and renders the complete HTML, the client receives the complete HTML, the client loads the JS and it catches up to what is on the page (hydration). Normal react SPA app behaviour takes over.”
- With Next.js we are building a SPA, but it is first rendered on the server.
- All the data Next.js used to render the page on the server is included in the HTML payload sent to the page so it can be “hydrated”.

- There are different rehydration models: “classic”, vs. island based, vs. server components
- Quick is developing a different rehydration model that is supposedly better.
- Next.js v12 has a “classic” rehydration model compared to island based, but Next 13 is moving to server components.
- In Next.js all the data returned by `getServerSideProps` is included in the HTML dump sent to the page, which Next.JS uses to rehydrate the react application client side.
- <img: show serialised JSON in the page>
- The VDOM that was generated on the server is thrown out, the code must all be re-run to regenerate it on the client to recreate to same application as was on the server, recreating the vDOM, comparing to the existing DOM and attaching event handlers.
- There is often a delay between seeing the page and being able to interact with the page.

why server side render?

- Even though Google can parse JS now to render SPAs, its still takes time and takes away from the number of pages google bot can parse
- SSR are more performant and JS maybe not be needed to run at all.

What are the disadvantages of SSR?

- Complexity: SSR apps are more complicated to reason about.
- You need to keep in mind that JS run in both environments, client and server.
- Need to send all or part of the data used the render the page must be sent to client and “hydrated”.
- Not all code can be run on the server, e.g. references to window, local storage, and media queries can only run on the client.
- The data associated with the page must be serialisable so it can cross the network, e.g. data objects, functions would cause errors.
- The data payload is “doubled” (once in the HTML and once in the embedded JSON)
- The hydration cannot take place until the JS is downloaded (and it all needs to be downloaded to the client), period of no interactivity (TTI)

“On the client, the HTML is used to show a fast non-interactive page, while React uses the JSON data and JavaScript instructions to make components interactive (for example, attaching event handlers to a button). This process is called hydration.”

There are two environments where your application code can be rendered: the client and the server.
The time to initial HTML for a SSR and CSR app is the same, the difference is whether the HTML is “complete”.
With CSR only apps, i.e. plain react, an empty HTML document is sent and JS needs to load to generate the full DOM with all the data.
With SSR apps, an HTML string is constructed on the server and sent in response to the request.
The client receives effectively a non-interactive (beyond what is native HTML interactivity) “picture” of the page.
The remaining client run-time application code (react, react router, etc) still needs to load for full interactivity.
The full HTML is sent and the JS needs to load only to support subsequent user activity.
The “server” rendering the page can be a computer in a data centre, on an edge network, or some CDN.
The display of the first page is server-side, and subsequent navigation happens client side.
Theoretically this provides the best of both worlds: fast initial page load, server caching of HTML artefacts, React code running on the client for dynamic app feel.
Next v13 will adopt server components: only download the JS on the client for the components that need it.

“a user requests page, the Next server gets the data and renders the complete HTML, the client receives the complete HTML, the client loads the JS and it catches up to what is on the page (hydration). Normal react SPA app behaviour takes over.”

With Next.js we are building a SPA, but it is first rendered on the server.
All the data Next.js used to render the page on the server is included in the HTML payload sent to the page so it can be “hydrated”.

### SSR advantages

SSR apps are better for SEO for two main reasons:

1. Even though Google can parse JS now to render SPAs, its still takes time and takes away from the number of pages google bot can parse
2. SSR are more performant and JS maybe not be needed to run at all.

### SSR disadvantages

Complexity: SSR apps are more complicated to reason about
You need to keep in mind that JS run in both environments, client and server.
Not all code can be run on the server, e.g. references to window, local storage, and media queries can only run on the client.
All or part of the data used the render the page must be sent to client and “hydrated”.The data associated with the page must be serialisable so it can cross the network, e.g. data objects, functions would cause errors

### Hydration

For both SSR and SSG the generated UI is later made interactive after client-side JavaScript has been executed to add interactivity to the page — this is known as hydration.
There are different rehydration models: “classic”, vs. island based, vs. server components
Quick is developing a different rehydration model that is supposedly better.

We could simply refetch all the data on the client, but that is not popular; instead the “classic” approach the data is included in a JSON string embedded in the HTML.
Effectively, the JSON associated with the page is serialised and sent along with the page.
The data in turn must be serialisable to cross the network, e.g. a date object, or a function will give you an error.The tradeoff with this approach is the data payload is doubled (once in the HTML and once in the embedded JSON), and the size of the downloaded page is essentially doubled.
A specific function on the page determines what is injected into the page during SSR and then rehydrated on the client.
In Next.js Hydration is made possible by that fact that all the data returned by `getServerSideProps` is included in the HTML dump sent to the page.
The VDOM that was generated on the server is thrown out, the code must all be re-run to regenerate it on the client to recreate to same application as was on the server, recreating the vDOM, comparing to the existing DOM and attaching event handlers.
The hydration cannot take place until the JS is downloaded (and it all needs to be downloaded to the client)
This is way there is often a delay between seeing the page and being able to interact with the page.

## Client-side rendered (CSR)

All steps, fetching HTML, fetching JS, fetching data, and rendering the page, happens on the client device.

A traditional single-page application (SPA) in React ships an empty div element with a large bundle of JavaScript, which includes React and other application code, to the user's browser (client). The client is then responsible for making data fetches to a database, computing the UI, and making the resulting HTML interactive. This process is known as client-side rendering (CSR) (1).

Overall flow:

1. A user requests page and receives an empty HTML with a script tag,
2. the client loads JS from script tag, the JS runs and starts fetching data and creating the DOM
3. all the data returns and page rendering completes.

## References

1. <https://blog.logrocket.com/react-server-components-comprehensive-guide/>
2. <https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#when-to-use-server-and-client-components>
3. <https://react.dev/learn/start-a-new-react-project#bleeding-edge-react-frameworks>
4. <https://stackoverflow.com/questions/76570208/what-is-different-between-app-router-and-pages-router-in-next-js>