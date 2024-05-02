# Service worker

## Week 16 project journaling

Data sent between web worked and project is sent by copy.
Numbers and strings are already copied, but objects like JSON are copied with the "structured cloning algorithm".
It works on data that can be copied.
Functions can be copied but can be eval'd.
Beware of the impact of copy on memory for large amounts of data.
Can be inefficent from memore and performance perspective.

> A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, APIs such as synchronous XHR and Web Storage can't be used inside a service worker.

Session storage and localstorage can't be used in a service worker?

## TODO

Q. check the current status of web worker communication.


