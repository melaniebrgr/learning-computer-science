# Service workers and MSW

## Web workers (WWs)

> Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can make network requests using the `fetch()` or `XMLHttpRequest` API. Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa). (1)

In the background, a worker runs a named JavaScript file containing the code to be executed. The global context that the worker runs in is not the same as the Window global. The Window is the global execution context for JavaScript code in that tab.

> The Window interface inherits from EventTarget, making it capable of handling events. It provides access to web APIs such as the CacheStorage object for offline asset storage, the Navigator object that represents the state and the identity of the user agent, and properties indicating window state itself like "closed". (2)

Code executed by the worker cannot manipulate the DOM or use some methods and properties of the window. Some funtionality like IndexedDB for storage is available however. Data sent between web worker and JavaScript is sent by copy, so _only data that can be copied can be passed_ between the worker and main script thread. Numbers and strings are passed by copy by default, but objects like JSON are copied with the "structured cloning algorithm". While functions can't be copied, they can be `eval`d. Copying large amounts of data can cause memory and performance problems.

> A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript thread that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, synchronous APIs such as XHR and Web Storage can't be used inside a service worker.

## Service workers (SWs)

Service workers were intended for the creation of offline experiences by intercepting requests and taking appropriate action. 
It can intercept, modify and cache navigation and resource request responses.
The background sync API enables web applications to defer tasks to a service worker for execution when the device has a stable network connection, for example.

A service worker is a special type of of web worker.
A service worker is JavaScript file registered against an origin and a path.
Service workers can import other JS modules statically, but not dynamically.

Setting up a SW consists of three steps:

1. registering the worker
2. caching the contents
3. doing something with the cached contents

The service worker is immediately downloaded when a user first accesses a service worker–controlled site/page.
A service worker is first registered using the `ServiceWorkerContainer.register()` method.
This applies the SW to the entire origin or a subset of specified URLs.
Pages within this registered area are considered "in-scope" pages.

The SW is updated when a user navigates to a web page that falls within the service worker's registered scope.
For example is SW is registered with scope `/app/`, then navigating to `/app/dashboard` or `/app/settings` would be in-scope navigations that trigger an update check.
A SW can also be updated when an event is fired on it, such as a lifecycle event (install, activate), or a functional event (message, push, sync).

> A single service worker can control many pages. Each time a page within your scope is loaded, the service worker is installed against that page and operates on it. Bear in mind therefore that you need to be careful with global variables in the service worker script: each page doesn't get its own unique worker. (3)

The Service Worker's has a cache storage API that is a global object on the service worker that allows the storage of assets delivered by responses keyed by their requests.
Items in "Cache storage" can be inspected with devtools.

## [Mock service worker](https://mswjs.io/docs/quick-start) (MSW)

Setup steps

1. Install
2. Define mock handlers with `http` and `HttpResponse`.
3. Integrate handlers into server process or browser, e.g. `setupServer(...handlers)` or `setupWorker(...handlers)` respectively.
4. Enable mocking, e.g. in tests `beforeAll(() => server.listen())`, or in the browser `worker.start()`, which registers and activates the SW. (4)
5. Adapt during runtime as needed, e.g. `worker.use()` and `worker.resetHandlers()`.

Once MSW is integrated into the Vitest setup it will control the network as defined by the handlers.
In the browser, Vitest browser mode and Storybook, MSW works by registering a Service Worker responsible for request interception on the network level.
If your application registers a Service Worker it must host and serve it.

```ts
// mock HTTP GET request-response
export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]
```

## References

1. https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
2. https://developer.mozilla.org/en-US/docs/Web/API/Window
3. https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
4. https://mswjs.io/docs/
    [x] - quick start
    [x] - browser integration
