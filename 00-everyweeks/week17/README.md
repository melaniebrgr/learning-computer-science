# Web worker

## Week 16 project journaling

> Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can make network requests using the fetch() or XMLHttpRequest APIs. Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa).

Data sent between web worker and project is sent by copy.
Numbers and strings are already copied, but objects like JSON are copied with the "structured cloning algorithm".
It works only on data that can be copied.
Functions can't be copied but can be `eval`d.
Beware of the impact of copy on memory for large amounts of data, as it can be inefficent from memory and performance perspective.

> A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, APIs such as synchronous XHR and Web Storage can't be used inside a service worker.

## TODO

Q. Session storage and localstorage can't be used in a web or service worker?
Q. check the current status of web worker communication.
