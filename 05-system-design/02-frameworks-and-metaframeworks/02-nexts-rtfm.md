# Next.js RTFM

## Project structure

Files and folders are organised with the top level being configuration and middleware.
Four scripts are part of the default setup: dev, build, start, lint.
Public folder for static assets.
Base development dependencies: typescript, eslint (and their configuration files).

File-system routing based on `app` dir (`pages` dir) structure.
Specific files serve as routing files, e.g. page, layout, and error.
A route is not publicly accessible until a page.js or route.js file is added to a route segment, and only the content of those files is sent to the client.
Still, when colocating content with the nested route, delimiting a directory as private with `_` can avoid future naming conflicts.
Root layout are set up with html and body tags and an initial `page.tsx`.

Routing based on directory structure supports the following routing patterns:
    - nested
    - dynamic (`[path]`)
    - catch-all (`[...path]`)
    - optional catch-all (`[[...path]]`)
    - parallel (`@nonpath`)
    - intercepted (`(.), (..), (..)(..), (...)`)

A parallel route is a micropage.
A parallel route can be rendered within another page, e.g. embedded or from a modal, and it can have it's own loading and error page views.
While the parallel route slot is not a route segment, it can have nested routes, and intercept routes that point elsewhere.
Instead of incurring a full page reload, content is loaded dynamically while maintaining the current context.
Parallel route example use cases:
    - Dashboards combining multiple charts or widgets displayed in parallel, e.g. Mixpanel dashboard with a team's different health graphs.
    - Product pages were selecting on the product opens a modal, but navigating to the URL opens the full product detail page.

Parallel, intercepted and route organisation is only supported in app router.
The routing based file system supports several organisational conventions
    - grouping e.g. by domain, or team
    - opt-out (private)

There are different organisational patterns ranging between the `app` folder being only for routing to colocating content next to the route that uses it.

## Resources

- [x] Getting started
    - [x] Installation
    - [x] Project structure
- [x] Build your application
    - [ ] Routing
        - [ ] Defining routes