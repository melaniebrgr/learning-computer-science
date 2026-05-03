# Routing

If a parent (or any ancestor) route’s beforeLoad throws (whether a redirect() or a regular Error), the navigation to that route fails and none of its child routes will load, including deeper nested URLs reached directly.

The TanStack docs show this pattern with an admin layout route (/_authenticated/_users) whose beforeLoad enforces permissions, and then a nested page (/_authenticated/_users/manage) that throws new Error('Write permission required') in its own beforeLoad. Because beforeLoad “runs before any component rendering and before the loader,” a failing beforeLoad on a parent layout route prevents any descendants from rendering, so a direct navigation to something like /demo-001/74439833027833856/some/other/nested/page would be blocked the same way if the parent /demo-001/74439833027833856 route throws.

