# Studocu AI

Some decision predate my arrival and involvement as FE lead. This is my best understanding. Also, the main focus of this overview will be the FE.

## Topics

1. The tech stack and decisions around it
2. What is reused from the other repos
3. How the project is structured
4. What processes are different from Studocu, Studocu Frontend
5. How is it deployed to staging, to production?
6. Long term: what is the plan on how to maintain it (increase test coverage? refactor? summary of complaints)
7. Long term: how can we start sharing components between repos effectively
8. Reflection: wrong decisions & learnings

## The tech stack and decisions around it

### Monorepo

A Turborepo monorepo manages 6 production apps plus three shared packages.
Turborepo was selected instead of Nx, which is used on studocu-frontend, due to concerns at the time about service changes that could have led to additional costs with Nx:

> Nx introduced the "NX Powerpack" for remote caching, which costs \(\$26.00\) per seat per month. This change was accompanied by the removal of previous third-party library integrations that handled remote caching, meaning that to use on-site remote caching, teams must now subscribe to this new service.

To note, Turborepo was not considered for studocu-frontend when the project was set up, only because it wasn't mature and full-featured enough at the time. "And in the case of the temporary, PoC ... that Studocu AI is/was [Turborepo] allowed us to easily setup and run stuff without much hassle."

In general now, "everything you can accomplish with Nx, you can also accomplish with Turborepo. It's just that Turborepo is originally made for frontend apps, as you can see from the requirement that each app/packaged has a package.json file."

When to choose Nx:

- You need a full-featured, battle-tested solution with robust support for a variety of languages and frameworks.
- You have a large, complex monorepo and require advanced features like a visual dependency graph and automatic code generation.
- You want a more "strategic" tool that provides a higher degree of governance and structure for long-term maintainability.

When to choose Turborepo:

- You need a fast, simple, and easy-to-use tool to get started quickly with monorepo management.
- You prioritize build speed and simplicity above all else.
- You want a tool that integrates seamlessly with modern tools like Vite.

### Single Page Applications (SPA)

React, React Router, Vite

### State management

@tanstack/react-query 5.82.0 - Server state management
@syncedstore/core 0.6.0 - Shared state with Yjs
Custom React Context for auth and project state
Zustand instroduced for Chat message state management

### UI/Styling

@studocu/theme 2.149.0 - Internal design system
Framer Motion 12.23.12 - Animation library

### Real-time collaboration (multiplayer)

Yjs 13.6.27 - CRDT (Conflict-free Replicated Data Type) for collaborative editing
@hocuspocus/provider 3.4.0 - WebSocket provider for Yjs synchronization
TipTap 3.0.7 - Rich text editor built on ProseMirror
Includes collaboration extensions
AI suggestion capabilities
Table, mathematics (KaTeX), and YouTube embed support

### Monitoring & Analytics

@sentry/react 10.5.0 - Error tracking
@opentelemetry/api - Distributed tracing

### FE-Laravel API integration

For communicating with the "legacy REST API", `packages/api-client/`.
Needs to be replaced with API client package.
[ ] What is the status of this again? Ticket?
Maissen added standalone API client for communication with the Studocu AI Laravel API.
[ ] Check Maissen's RFC on the topic and link

### FE-LangGraph integration

`packages/schemas/` shares JSON schemas for validation and documentation.
Automatic type generation

### Applications

The 6 production apps are:

1. Laravel REST API (`api`), "because we have PHP developers" - Juampi (but Maissen and Marcos contributed the most to it)
2. Hocus Pocus websocket server (`hocuspocus-server`)
3. LangGraph agentic service (`langgraph-server`)
4. Document text extraction service (`text-extraction-server`)
5. Express REST API (`yjs-api-server`)
6. React app (`web`)

[ ] We may also be adding an image processing service (check with Anustup).