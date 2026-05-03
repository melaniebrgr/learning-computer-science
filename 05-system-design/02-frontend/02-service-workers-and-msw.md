# Service workers and MSW

## Web workers

> Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can make network requests using the `fetch()` or `XMLHttpRequest` API. Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa). (1)

In the background, a worker runs a named JavaScript file containing the code to be executed. The global context that the worker runs in is not the same as the Window global. The Window is the global execution context for JavaScript code in that tab.

> The Window interface inherits from EventTarget, making it capable of handling events. It provides access to web APIs such as the CacheStorage object for offline asset storage, the Navigator object that represents the state and the identity of the user agent, and properties indicating window state itself like "closed". (2)

Code executed by the worker cannot manipulate the DOM or use some methods and properties of the window. Some funtionality like IndexedDB for storage is available however. Data sent between web worker and JavaScript is sent by copy, so _only data that can be copied can be passed_ between the worker and main script thread. Numbers and strings are passed by copy by default, but objects like JSON are copied with the "structured cloning algorithm". While functions can't be copied, they can be `eval`d. Copying large amounts of data can cause memory and performance problems.

> A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript thread that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, synchronous APIs such as XHR and Web Storage can't be used inside a service worker.

## Service workers

## References

1. https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
2. https://developer.mozilla.org/en-US/docs/Web/API/Window
