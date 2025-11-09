# Vite

The Vite+ plan (1) is to be the unified build tool for Javascript and is being built on a new tech stack, Rolldown and Oxc beneath it. Vite ethos is to combine several leading tools into one to provide a seamless developement experience for modern web applications. For example,

- **Esbuild** to serve native ECMAScript modules in the browser and provide HMR.
- **Rollup** to bundle the application for production, to provide code-splitting, async chunk generation and loading parallelisation, tree-shaking, CSS preprocessing. (Vite is open to switching to Esbuild for production if Rollup no longer becomes the better way to build for production)
- **Rolldown** replacement for Rollup written in Rust.
- **Oxc** a language toolchain written in Rust, providing linter (Oxlint), formatter (Oxformat), transformer, resolver, minifier, parser, and semantic analysis replacing tools like Babel and Terser.

Vite provides application development _tooling_ for all major frontend frameworks React, Vue, Svelte, Quick, and more officially and more unofficially with community plugins. The two main chores of development it addresses are

1. a development server
2. a production build tool

For uses cases from client-side SPA to server-side rendered app. 
## Dev server

`vite preview` to build the production application and server it on a local port.

## Production build tool



## References

1. [ViteConf 2025](https://www.youtube.com/watch?v=tVd0JeSr8kg)
2. [Vite Course, published December 12, 2023](https://frontendmasters.com/courses/vite/vite-starter/)
  - [ ] Initial Setup