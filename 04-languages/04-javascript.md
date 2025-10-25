# JavaScript

## Classes

### Static

- **Static members** cannot be directly accessed on instances of the class but on the class itself.
- Static members are evaluated at class evaluation time synchronously and sequentially, so if they refer to each other the reference must precede the referer.
- Static members are not directly accessible using the this keyword from non-static methods, they need to be called with the class name instead.
- **Static fields** are useful for caches, fixed config, or data that doesn't need replicated across instances.
- Static field names can be computed and their values initialised.
- **Static methods** can be useful for utility functions.
- **Static initialisation blocks** are more flexible than fields, e.g. `try...catch` can be used within them.
- Like private members, if the static member is private only the class that defines it can access the field, which can cause unexpected behaviour when calling `this` in subclasses.

## Modules

### Import statements

In JS we have two types of module importing: static and dynamic. oth static and dynamic imports follow ES module syntax.

Static import statements (`import x from ‘./foo.js’`), can only be used at the top-level of the file. Dynamic imports are runtime, on-demand imports (`const x = await import("./foo.js")`) that return a Promise. 

Modules are resolved via a pre-runtime “linking” process. In an application with a bundler they are used to create the application bundle chunks. During pre-runtime linking, bindings are introduced into the local scope. At parse time, the browser collects all these specifiers to build a dependency graph. Dynamic imports are noted but only executed at runtime.

By default, React Router and Vite (using Rollup) applications produce a single entry chunk per HTML entry, and Rollup’s code-splitting kicks in automatically: any modules imported via dynamic import become separate chunks, and static imports that are used by multiple entry points or large subgraphs are lifted into shared “vendor” chunks

### Module graph

A module graph is the network of ES modules linked by their import dependencies.

A module graph is the structured web of modules the runtime builds by following import statements. Starting from an entry module, the browser resolves each specifier, fetches the referenced module, and repeats this for its imports, forming a directed graph where nodes are modules and edges are import relationships.

Each node has its own scope and exports with live bindings; edges define how those bindings flow between modules. The graph is evaluated in dependency order, honoring top-level await so that parent modules wait on children. The browser caches module instances, so the same URL maps to a single node whose side effects run once. With dynamic import, a new root can be added later, creating another graph—or attaching to existing nodes if they’re already cached.

In short, a module graph is constructure on demand at the runtime’s map of all modules and their dependencies that drives loading, linking, and evaluation.

#### References

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import>