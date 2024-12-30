# React 19

## Suspence

Suspense provide out-of-order streaming behavior.
On page request, everything that isn't wrapped in Suspense is sent back first, and the connection is held open until all boundaries are resolved.
The output of the Suspense boundaries are streamed to the client.
The client updates that content anywhere on the page based on its own schedule.