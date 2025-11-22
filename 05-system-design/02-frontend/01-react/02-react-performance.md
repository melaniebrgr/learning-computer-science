# React Performance

Performance issues can be slotted into two types: the big bottlenecks that are a clear and present danger, and the gradual accumulation of minor problems that build over time. Getting permission for big refactors is harder to do than

How to balance avoiding performance pitfalls (prevention is the best medicine) with good architecture, and premature optimisation (only fix it when it becomes an issue). React has changed a lot over the years (react Fiber, Transitions) and performance improvement strategies have changed; sometimes dropping into vanilla JS with refs will still be necessary.

## Render cycle

UI is a function of state in react. Three things that trigger a re-render: state changes, the parent changes (if the component is memoised, it checks if the props changed), and context changes.

### 1. Render phase

In response to a change in state, e.g. useState, React asks components to describe UI from current props/state. JSX becomes React elements (plain objects) that represent intended UI structure. The in-memory tree of objects describing the HTML elements is the **virtual DOM**. When a parent renders, all of its children render recursively, regardless of prop equality, unless the child is memoised. From React 18, this render work can be paused, resumed, or discarded; multiple renders may be thrown away before being committed (concurrency). During **reconciliation**, react diffs element types/keys to decide what to reuse or replace.

Since React 16 React used "Fiber" data structures that keep track of component instances, and their children and the previous iterations of them. The virtual DOM is less and less true with this structure.

### 2. Commit Phase

All calculated changes are applied synchronously. `useEffect` runs shortly after via a separate “Passive Effects” step.

### 3. Cleanup Phase

Cleanup effects.

## References

1. <https://frontendmasters.com/courses/react-performance-v2/>
2. <https://stevekinney.com/courses/react-performance>