# Service workers and MSW

## Web workers (WWs)

> Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can make network requests using the `fetch()` or `XMLHttpRequest` API. Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa). (1)

In the background, a worker runs a named JavaScript file containing the code to be executed. The global context that the worker runs in a special kind of worker context, off the main script execution thread with no DOM access. The Window is the global execution context for JavaScript code in that tab.

> The Window interface inherits from EventTarget, making it capable of handling events. It provides access to web APIs such as the CacheStorage object for offline asset storage, the Navigator object that represents the state and the identity of the user agent, and properties indicating window state itself like "closed". (2)

Code executed by the worker cannot manipulate the DOM or use some methods and properties of the window. Some funtionality like IndexedDB for storage is available however. Data sent between web worker and JavaScript is sent by copy, so _only data that can be copied can be passed_ between the worker and main script thread. Numbers and strings are passed by copy by default, but objects like JSON are copied with the "structured cloning algorithm". While functions can't be copied, they can be `eval`d. Copying large amounts of data can cause memory and performance problems.

> A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript thread that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, synchronous APIs such as XHR and Web Storage can't be used inside a service worker.

## Service workers (SWs)

### Introduction 

A service worker is a special type of of web worker. Service workers were intended for the creation of offline experiences. It is like a proxy server: it can intercept, modify and cache navigation and resource request responses. An app can be set up to use cached assets first with SWs, providing a default experience even when offline (Note, offline first is how native apps operate). The background sync API can also defer tasks for execution by a SW when a device has regained a stable network connection. Documents will have to be reloaded to actually be controlled because a document starts life with or without a service worker and maintains that for its lifetime.

### 3 steps in SW setup

1. **registration**: The SW code is fetched and the SW is registered.
2. **installation**: The SW is installed and setup actions liked IDB and cache prefilling occur. An installed worked _does not mean that it's active_.
3. **activation**: Once it's safe for the previous SW to be retired (all pages using it are closed), the new SW is activated on the new page, and cleanup actions like removing resources from the previous SW occur.

The default activation behaviour can be bypassed with `skipWaiting` and `clients.claim()`. When `skipWaiting`is invoked, the new service worker receives the activate event right away and takes over any open pages. While `skipWaiting()` moves the new worker from waiting to active status, clients.claim() ensures that the newly active worker immediately controls existing open pages rather than waiting for them to reload. Without `clients.claim()`, even after `skipWaiting()` activates the new service worker, open pages would continue using the old service worker (or no service worker) until they're reloaded.

Summary of the available service worker events:

- **install**: Always the first event sent to a service worker when it's downloaded and registered. Used to prepare the service worker by creating a cache and storing assets for offline use. The service worker won't install until code inside event.waitUntil() successfully completes.
- **activate**: Fired when the service worker becomes active after installation. Primarily used to clean up resources from previous service worker versions, such as deleting old caches. 
- **message**: Fired when a channel message is received on the service worker from another context. Allows communication between the service worker and other parts of your application.
- **fetch**: Fires every time any resource controlled by the service worker is fetched, including documents within scope and resources they reference. Allows the service worker to intercept HTTP requests and provide custom responses using event.respondWith(), such as returning cached content.
- **sync**: Fired when background synchronization is triggered. Enables the service worker to sync data when network connectivity is restored after being offline
- **push**: Fired when the service worker receives a push message from a server. Allows sending notifications to users even when they're not actively using the site.

A SW is downloaded when a user navigates to a web page that falls within the service worker's registered scope.
For example is SW is registered with scope `/app/`, then navigating to `/app/dashboard` or `/app/settings` would be in-scope navigations that trigger an update check.
The SW can apply to the entire origin or a subset of specified URLs based on the registered scope. Pages within this registered area are considered "in-scope" pages.
A SW can also be updated when an event is fired on it, such as a lifecycle event (install, activate), or a functional event (message, push, sync).

> A single service worker can control many pages. Each time a page within your scope is loaded, the service worker is installed against that page and operates on it. Bear in mind therefore that you need to be careful with global variables in the service worker script: each page doesn't get its own unique worker. (3)

The Service Worker has a cache storage API that is a global object on the service worker that allows the storage of assets delivered by responses keyed by their requests.
This API works in a similar way to the browser's standard cache, but it is specific to your domain. The contents of the cache are kept until you clear them.
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
