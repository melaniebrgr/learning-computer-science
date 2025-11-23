# React Performance

Performance issues can be slotted into two types: the big bottlenecks that are a clear and present danger, and the gradual accumulation of minor problems that build over time. Getting permission for big refactors is harder to do than

How to balance avoiding performance pitfalls (prevention is the best medicine) with good architecture, and premature optimisation (only fix it when it becomes an issue). React has changed a lot over the years (react Fiber, Transitions) and performance improvement strategies have changed; sometimes dropping into vanilla JS with refs will still be necessary.

Performance optimisation done poorly is worse than none at all.

## React performance principles

1. First, "do nothing". Not executing logic is always faster than executing logic. Instead of solving the performance problem ask if the logic and data is needed in the application. State management and component hierarchy optimisationcan also help _skip_ needing to execute logic like component re-rendering. As an example of a bad architecture, is using a single context provider for all application state. Any change to the context triggers a re-render in all components hooked into that context.

2. Second, "pretend". Feeling fast is almost as goof as actually being fast, e.g. **optimistically updating** the UI doesn't make the server response faster, but makes it feel faster. You also need to pick and choose which is correct and right for the situation, e.g. for some long-lived apps, considering downloading everything upfront.

3. Third, "check if you can skip it". Skipping logic is _sometimes_ faster than executing it, but not always. Caching, **memoisation**, **React compiler** have their own overhead. For instance,**React.memo** checks previous with current prop values to check if props have changed instead of rendering to check if the output changed. A simple mental model of React's renderig strategy is that any state change will trigger the rerender of the entire state tree beneath it. Therefore in general we want to "skip it" by iether stopping rendering higher up, or start it lower down. It's a simplication because now with React Fiber rendering can be paused and resumed based on priority.

4. Fourth, "delay it". Use **Suspense** to tell the React reconciler, we're suspended right now, waiting for a promise to resolve, check later. Is easier and more reliable than doing yourself, and more performant, also given the underlying React architecture, while also being less work for you. With **lazy loading** and **bundle optimisation** load only as much as you need, and "as little as you can get away with".

## References

1. <https://frontendmasters.com/courses/react-performance-v2/>
2. <https://stevekinney.com/courses/react-performance>