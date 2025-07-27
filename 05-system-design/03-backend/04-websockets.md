# WebSockets

Most browsers allow between 6 and 255 WebSocket connections per page, but limits vary.

- Per Domain: Browsers typically limit the number of simultaneous WebSocket connections per domain. This is often between 6 and 30, depending on the browser and its version.
- Per Browser: The total number of WebSocket connections across all tabs and windows is usually capped at a higher number—Chrome, for example, has allowed up to 255 connections since 2015, and Firefox up to 200.
- Practical Use: For most real-world applications, you’re unlikely to hit these limits unless you’re opening many connections per page or across many tabs. If you do, you may see connection failures or degraded performance.

For collaborative apps, it’s best to multiplex (share) connections when possible to avoid hitting these browser-imposed limits.

## HocusPocus

> Providers are the Y.js way to set up communication between different users, or cache the updates in the browser. Hocuspocus comes with its own provider and is not compatible anymore (since v2) with other y-providers, as we are supporting multiplexing to synchronize multiple documents over the same websocket connection.

> It’s coming with WebSocket message authentication, a debug mode to add verbose output to the console, a few more event hooks, a different reconnection strategy, an improved error handling and a friendly API for the Awareness protocol.