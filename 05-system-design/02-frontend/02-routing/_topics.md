# Routing learning plan

## High-level path

Given your React/TS background, a good plan is:

1. **Core mental model** – what makes TanStack Router different.
2. **Basics in a toy app** – routes, links, params.
3. **Data loading & URL state** – loaders, search params.
4. **Layouts, nesting & errors** – real‑world app structure.
5. **Integration patterns** – React Query, auth, code-splitting.
6. **Refinement** – best practices and reading the docs “like a maintainer”.

Below is a concrete, resource-backed plan.

***

## 1. Core concepts (0.5–1 day)

Goal: Understand *why* TanStack Router exists and its main primitives.

- Read the main docs “Overview” and “TanStack Router” landing page to understand features like type-safe navigation, loaders, layouts, and first‑class search params. [tanstack](https://tanstack.com/router/latest/docs)
- Skim an intro article that frames it as “a fully-featured client-side application framework”, not just a router, to set expectations about scope. [frontendmasters](https://frontendmasters.com/blog/introducing-tanstack-router/)

Focus questions while reading (don’t code yet):
- How does route *configuration* differ from React Router?
- What does “100% typesafe” actually mean here?
- Why are search params and loaders emphasized so much?

***

## 2. Basics with a small app (0.5–1 day)

Goal: Get fluent with the happy path: defining routes and navigating.

- Follow an up-to-date “full course” style video or tutorial while building a tiny app (e.g., 3–4 pages: Home, About, Users, User detail). One recent video course walks through setup, adding pages, path params, navigation, custom links, and search params with Zod. [youtube](https://www.youtube.com/watch?v=fpXOT8SNTpY)
- In parallel, implement:
  - `createRootRoute` / `createRoute` and `createRouter`
  - `<RouterProvider>`, `<Link>`, `<Outlet>`
  - Simple path params (`/users/$userId`)

Deliberate practice:
- Recreate the app *from scratch* without looking at the tutorial until stuck.
- After that, rename routes, add one extra route, and refactor a bit to cement the patterns.

***

## 3. Data loading & search params (1–2 days)

Goal: Internalize loaders and URL‑driven state, since that’s where this router shines.

- Study guides or docs sections focusing on:
  - `loader` as a first‑class data‑loading primitive that runs before render. [guidesfor](https://guidesfor.dev/tanstack-mastery-2026/06-router-data-loading/)
  - Search param schemas and validation as a replacement for ad‑hoc `window.location.search` parsing. [tanstack](https://tanstack.com/router/v1)
- Implement in your toy app:
  - A list page that uses a `loader` to fetch data and pre-render.
  - A detail page with a `loader` that depends on route params.
  - A page whose UI (sorting, pagination, filters) is entirely driven by search params with a typed schema.

Challenges to attempt:
- Add error and pending states around loaders using Suspense and error boundaries.
- Implement “reset to defaults” behavior for search params via router APIs instead of local state.

***

## 4. Layouts, nesting, pathless routes, and errors (1–2 days)

Goal: Model real app structure and cross‑cutting layout concerns.

- Work through examples and docs that show nested/layout routes, pathless layouts, and `Outlet` usage. [tanstack](https://tanstack.com/router/v1/docs/framework/react/examples/basic-react-query)
- Try patterns shown in examples:
  - A root layout with nav and devtools.
  - A nested layout (e.g., `/dashboard`) with its own side nav and sub‑routes.
  - Pathless layout routes used only for grouping and shared UI. [tanstack](https://tanstack.com/router/v1/docs/framework/react/examples/basic-react-query)
- Implement:
  - `notFoundComponent` at the root level.
  - Scoped error boundaries per route (like the `PostErrorComponent` example). [tanstack](https://tanstack.com/router/v1/docs/framework/react/examples/basic-react-query)

Reflection exercise:
- Take a non‑trivial app you’ve built (or a mental model of one) and sketch how you’d translate its layout into a TanStack Router route tree.

***

## 5. Integration with React Query, auth, and code-splitting (2–3 days)

Goal: Learn “real‑world wiring” so you could ship production code.

- Follow or replicate an example that integrates React Query, with `QueryClient` passed via route context and loaders calling `ensureQueryData`. [tanstack](https://tanstack.com/router/v1/docs/framework/react/examples/basic-react-query)
- Try:
  - Using route context to share things like `queryClient`, auth tokens, or feature flags across routes. [tanstack](https://tanstack.com/router/latest/docs)
  - Lazy route components (dynamic imports) to code‑split a section of the app. [tanstack](https://tanstack.com/router/v1/docs/framework/react/examples/basic-react-query)
- Add basic auth:
  - A protected route group that checks auth in a loader or route context.
  - Redirect to login when unauthenticated.

Stretch:
- Experiment with scroll restoration and preload settings (`defaultPreload`, `defaultPreloadStaleTime`) on your router configuration. [tanstack](https://tanstack.com/router/v1)

***

## 6. Refinement: best practices and “reading docs like a maintainer” (ongoing)

Goal: Go from user to “power user”.

- Read a best‑practices style article that highlights pitfalls and optimization tips. [solomonsignal](https://www.solomonsignal.com/launch-school/tutorials/tanstack-router-best-practices)
- Skim an advanced guide on topics like complex data loading strategies or advanced search param handling. [solomonsignal](https://www.solomonsignal.com/launch-school/tutorials/tanstack-router-advanced-guide)
- Revisit the official docs with this lens:
  - Look for how route context composes up the tree.
  - See how file-based routing and code-based routing can be mixed. [tanstack](https://tanstack.com/router/latest/docs)
- Do a mini‑audit on your toy app:
  - Are routes named and organized clearly?
  - Are search params the single source of truth for sharable state?
  - Are loaders doing just data loading (not excessive business logic)?

***

## 7. Suggested concrete schedule

Assuming ~1–2 focused hours per day:

- **Day 1:** Sections 1–2: overview + basic router + 3‑page app.
- **Day 2–3:** Section 3: loaders + search params + error/pending states.
- **Day 4–5:** Section 4: nested/layout routes, pathless layouts, 404, error boundaries.
- **Day 6–7:** Section 5: React Query integration, route context, lazy routes, basic auth.
- **Day 8+:** Section 6: best practices, refactors, and maybe a “real” app feature from your own work.

To tune this for you: what kind of app are you currently working on (e.g., dashboard, CRUD admin, SaaS marketing site with auth), so the plan can use examples that mirror your real codebase?