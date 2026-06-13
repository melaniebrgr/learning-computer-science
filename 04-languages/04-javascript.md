# JavaScript

Modern browsers and JS runtimes each ship with their own named JavaScript engine, though some share the same engine family across different products.

- Google Chrome / Chromium-based (including new Edge, Opera, Brave, Vivaldi): V8 engine
- Mozilla Firefox: SpiderMonkey
- Apple Safari (and other WebKit-based browsers): JavaScriptCore, whose JIT is often referred to as Nitro
- Node.js, Deno, most server-side JS runtimes: V8
- Some embedded runtimes: QuickJS, JerryScript

Anything that is part of the ECMAScript language itself, like Temporal must be implemented by JavaScript engines like V8, SpiderMonkey, and JavaScriptCore.

## Temporal

Temporal is specified as a new global object Temporal in the ECMAScript spec (like Math or Intl), with a large set of built‑in classes and methods. Only supported in Spidermonkey so far, with V8 integration (using the Rust temporal_rs library under the hood) release planned for early 2026. Until engines ship full support, a polyfill can provide a userland implementation.

## Classes

> Classes are a template for creating objects. They encapsulate data with code to work on that data. Classes in JS are built on prototypes but also have some syntax and semantics that are unique to classes.

Classes can be defined with class expressions, e.g. `const Rectangle = class { ... }` or class declarations e.g. `class Rectangle { ... }`, but class declarations are more common.
Within the braces, class members, such as methods or constructor are defined.
A **class element** can be characterized by four aspects:

- **kind**: getter, setter, method, or field
- **location**: static or instance
- **visibility**: public or private
- **usage**: extends

TypeScript adds type annotations and other syntax to allow you to express relationships between classes and other types:

- **kind**: getter, setter, method, or field
- **location**: static or instance
- **visibility**: public or private, _and_ readonly, protected
- **usage**: extends, _and_ implements, abstract

### Usage

#### extends (JS, TS)

The `extends` keyword is used in class declarations or class expressions to create a class as a child of another constructor.
If there is a constructor present in the subclass, it needs to first call super() before using `this`.

#### implements (TS)

Use an implements clause to check that a class satisfies a particular interface.
An error will be issued if a class fails to correctly implement it.
Classes may also implement multiple interfaces, e.g. class `C implements A, B { ... }`

#### abstract (TS)

An abstract method or abstract field is one that hasn’t had an implementation provided. These members must exist inside an abstract class, which cannot be directly instantiated.
The role of abstract classes is to serve as a base class for subclasses which do implement all the abstract members. When a class doesn’t have any abstract members, it is said to be concrete.

### Kind

The two basic kinds are methods and fields.

#### method

Methods can be plain functions, async functions, generator functions, or async generator functions.
There is one special method, the constructor method is a special method for creating and initializing an object created with a class. A constructor can use the `super` method to call the constructor of its super class.

Getters and setters are special properties that is defined like a function, but used like a field.
The get syntax binds an object property to a function that will be called when that property is looked up.
They can be defined on classes and also object instances:

```js
class ClassWithGetSet {
  #msg = "hello world";
  get msg() {
    return this.#msg;
  }
  set msg(x) {
    this.#msg = `hello ${x}`;
  }
}

const instance = new ClassWithGetSet();
console.log(instance.msg); // "hello world"
instance.msg = "cake";
console.log(instance.msg); // "hello cake"
```

#### field

Class fields are similar to object properties.
the fields can be declared with or without a default value.
Fields without default values default to undefined.

```js
class Rectangle {
  height = 0;
  width;
  ...
}
```

### Location

#### instance

By default properties (fields and methods) are avaiable on each instance of the class.

#### static

Static features are declared using the `static` keyword.
Static properties (fields and methods) are defined on the class itself instead of each instance.
Static methods are useful for create utility functions, e.g. `Math.random()`.
Static fields are useful for caches, fixed-configuration, or any other data that doesn't need to be replicated across instances.

In **static initialisation blocks**, `static { ... }` are more flexible way to init static properties during initialisation than properties, for example `try...catch` can be used within them.

### Visibility

From least to most visible: readonly, private, protected, public.

#### readonly (TS)

`readonly` prevents assignments to the field outside of the constructor.

#### private (JS, TS)

Private elements use a special identifier syntax, `#`.
It's an error to reference private fields from outside of the class; they can only be read or written within the class body.
The only way to access a private element is via dot notation within the class that defines the private element.
Private is like protected, but doesn’t allow access to the member even from subclasses.

Most class elements have private counterparts:

- Private fields
- Private methods
- Private static fields
- Private static methods
- Private getters
- Private setters
- Private static getters
- Private static setters

#### protected (TS)

Protected members are only visible to subclasses of the class they’re declared in.

#### public (JS, TS)

No special syntax is required to declare a class element public in JS.
Because public is already the default visibility modifier, it's not necessary to write it on a class member, but might choose to do so for style/readability reasons in TS.

## Modules

### Importing modules

In JS we have two types of module importing: static and dynamic. Static import and dynamic import() are both useful. Each have their own, very distinct, use cases. Use static imports for initial paint dependencies, especially for above-the-fold content. In other cases, consider loading dependencies on-demand with dynamic import().

Static import statements (`import x from ‘./foo.js’`), can only be used at the top-level of the file. Static import enable important use cases such as

- static analysis,
- bundling with bundlers like Rollup, and
- tree-shaking.

Dynamic imports are runtime, on-demand imports (`const x = await import("./foo.js")`) that return a Promise. (Although import() looks like a function call, it is specified as syntax that just happens to use parentheses, which means that import doesn’t inherit from Function.prototype.) Dynamic imports are useful for:

- importing a module on-demand or conditionally,
- computing a module specifier at runtime, and
- importing a module from within a regular script (as opposed to a module).

### Resolving modules

Modules are resolved via a pre-runtime “linking” process. In an application with a bundler they are used to create the application bundle chunks. During pre-runtime linking, bindings are introduced into the local scope. At parse time, the browser collects all these specifiers to build a dependency graph. Dynamic imports are noted but only executed at runtime.

By default, React Router and Vite (using Rollup) applications produce a single entry chunk per HTML entry, and Rollup’s code-splitting kicks in automatically: any modules imported via dynamic import become separate chunks, and static imports that are used by multiple entry points or large subgraphs are lifted into shared “vendor” chunks

A module graph is the network of ES modules linked by their import dependencies. 

A module graph is the structured web of modules the runtime builds by following import statements. Starting from an entry module, the browser resolves each specifier, fetches the referenced module, and repeats this for its imports, forming a directed graph where nodes are modules and edges are import relationships.

Each node has its own scope and exports with live bindings; edges define how those bindings flow between modules. The graph is evaluated in dependency order, honoring top-level await so that parent modules wait on children. The browser caches module instances, so the same URL maps to a single node whose side effects run once. With dynamic import, a new root can be added later, creating another graph—or attaching to existing nodes if they’re already cached.

In short, a module graph is constructure on demand at the runtime’s map of all modules and their dependencies that drives loading, linking, and evaluation.

#### References

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import>
- <https://v8.dev/features/dynamic-import>