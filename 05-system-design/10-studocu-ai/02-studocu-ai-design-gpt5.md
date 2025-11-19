[26 tools called]

## Onboarding Outline

### Monorepo Orientation
- Turborepo workspace anchors six production apps plus three shared packages, letting teams evolve the React frontend, Laravel API, Python-based AI agents, and Node-based real-time services independently while sharing tooling and CI/CD foundations (AWS EKS, CloudFront, S3, RDS, Sentry, Langfuse).
- The `apps/web` frontend is the primary surface for users; other services (LangGraph agents, text extraction, HocusPocus/Yjs collaboration servers) feed features such as AI-assisted note generation, quiz authoring, and live document syncing.

```
70:149:TECHNICAL_OVERVIEW.md
┌─────────────────────────────────────────────────────────────────┐
│                         STUDOCU ALPHA                            │
│                      Turborepo Monorepo                          │
└─────────────────────────────────────────────────────────────────┘
│  apps/web (React + React Router 7 + Vite) • Real-time collaboration with Yjs/TipTap
│  apps/api (Laravel 12) • PostgreSQL + AWS S3 integration
│  apps/langgraph-server (Python 3.11) • LangGraph multi-agent system
│  apps/text-extraction-server (Python) • FastAPI-based microservice
│  apps/hocuspocus-server / apps/yjs-api-server (Node.js + TS) • Yjs CRDT + REST docs API
│  packages/api-client | packages/schemas | packages/typescript-config
│  Infra: AWS EKS, S3, RDS, CloudFront, Sentry, Langfuse
```

### `apps/web` Snapshot
- **Mission & features** – Serves as the SSR-capable SPA delivering real-time collaborative editors, AI chat, quiz workflows, document uploads, Algolia search, auth, and premium gating.
- **Runtime stack** – React 19 with React Router 7 (using `react-router dev/build` commands), Vite 7 bundling, strict TypeScript 5.8, Sass modules with auto-generated type definitions, and CSP helpers. State and data rely on TanStack Query, `@syncedstore` (CRDT sync), `@repo/api-client`, and Zod validation.
- **Collaboration & AI** – TipTap Pro editor suite plus Yjs bindings deliver multiplayer editing; dependencies on `@hocuspocus/provider`, LangChain, and AI SDKs power conversational and quiz experiences; `event-source-plus` and Algolia handle live updates and search.
- **Tooling & quality** – Biome formatting/linting, Storybook (Vite-powered) for UI, Jest 30 + Testing Library + MSW for unit tests, Playwright for E2E scaffolding, and typed SCSS generation baked into build scripts.
- **Observability & analytics** – Segment analytics, Sentry (including Vite plugin), OpenTelemetry hooks, and Feature flag clients are wired directly through dependencies to keep telemetry consistent.
- **Dev workflow** – Run `yarn dev` for React Router’s dev server on port 3005; `yarn build` and `yarn check-types` enforce SCSS typing before compiling; Storybook, lint, format, CSP generation, and Jest scripts are pre-defined.

```
289:327:TECHNICAL_OVERVIEW.md
### 1. apps/web - React Frontend
Purpose: Main user-facing SPA with SSR capabilities
Key Features: Real-time collaborative document editing, AI-powered chat, quiz generation, uploads, Algolia search, auth, premium modal
Architecture: React Router 7 w/ SSR, Sass modules, @syncedstore/react, TipTap editor, PDF viewer, Storybook
Notable Patterns: Custom hooks, @repo/api-client abstraction, env-based config, CSP generation, type-safe SCSS
Configuration & Build Output: Vite/Jest/Storybook configs, static assets → S3 + CloudFront, code splitting
```

```
5:90:apps/web/package.json
"scripts": {
  "build": "… react-router build",
  "check-types": "… react-router typegen && tsc",
  "dev": "react-router dev --port=3005",
  "generate-scss-definitions": "yarn typed-scss-modules '**/*.module.scss' …",
  "generate-csp": "node utils/contentSecurityPolicy/generateCsp.ts",
  "lint": "biome lint",
  "storybook:dev": "storybook dev -p 6006",
  "test": "jest"
},
"dependencies": {
  "@react-router/node": "7.7.1",
  "@syncedstore/core": "0.6.0",
  "@tanstack/react-query": "^5.82.0",
  "@tiptap/*": "3.x",
  "@hocuspocus/provider": "^3.4.0",
  "@segment/analytics-next": "1.81.0",
  "@sentry/react": "10.5.0",
  "@vercel/otel": "^1.12.0",
  "algoliasearch": "5.34.1",
  "event-source-plus": "^0.1.12",
  "react": "^19.1.0",
  "react-router": "7.7.1",
  "vite": "7.0.6",
  "yjs": "13.6.27",
  "zod": "^3.25.49"
}
```

```
92:128:apps/web/package.json
"devDependencies": {
  "@biomejs/biome": "2.1.2",
  "@react-router/dev": "7.7.1",
  "@repo/typescript-config": "*",
  "@sentry/vite-plugin": "4.1.1",
  "@storybook/react-vite": "10.0.0",
  "@testing-library/react": "^16.3.0",
  "jest": "^30.0.4",
  "msw": "^2.10.3",
  "playwright": "^1.54.1",
  "sass": "^1.89.2",
  "storybook": "^9.0.17",
  "typed-scss-modules": "8.1.1",
  "typescript": "5.8.2",
  "vite": "7.0.6"
}
```

### Shared Packages Overview
- **`@repo/api-client`** – Centralized fetch wrapper with typed error taxonomy, FormData/bin support, and React Query-ready helpers to keep every app’s network layer consistent.
  
```
1:55:packages/api-client/README.md
@repo/api-client … shared API client … unified HTTP client, enhanced error handling, session utilities, FormData & binary support, rich error context, and example usage structure (client.ts, constants, apis, utils/session)
```

- **`packages/schemas`** – Contract-first JSON schemas that let frontend, Laravel, and LangGraph services stay in sync via code generation. Includes:
  - Knowledge test schema (flat block model for exams, multiple question types, dual TS/Python codegen commands, validation rules).
  - Event schema (SSE payload contract powering stream events between LangGraph backend and React frontend).
  - Yjs schema (sync-state contract for collaborative docs).

```
1:60:packages/schemas/knowledge-test-schema/README.md
Defines flat mock exam structure, supports multiple question types, provides Python datamodel-codegen & TS json2ts commands, and enumerates section/stimulus/question blocks plus validation rules.
```

```
1:26:packages/schemas/event-schema/README.md
JSON Schema for SSE events; documents purpose (prevent client/server drift) and implementation expectations for backend stream events and pending frontend integration.
```

```
1:34:packages/schemas/yjs-schema/README.md
Describes fixed/dynamic properties for Yjs sync state responses (ids, metadata arrays, per-note content) with example payload for validation.
```

- **`@repo/typescript-config`** – Shared strict compiler baselines (ES2022 target, NodeNext modules, `noUncheckedIndexedAccess`, strict mode) plus a React-specific overlay to keep TS behavior uniform across all TS/TSX workspaces.

```
1:18:packages/typescript-config/base.json
Compiler options: declaration outputs, strict mode, NodeNext modules/resolution, DOM libs, noUncheckedIndexedAccess, resolveJsonModule, ES2022 target.
```

### Suggested First-Week Flow
- Install dependencies (`yarn install`) and run `yarn dev` inside `apps/web` to explore live SSR/SPA routing alongside Storybook and Jest/Playwright suites; refer back to the scripts block for all recurring tasks.
- Trace data flow by following React pages/hooks into `@repo/api-client` calls, then inspect corresponding schemas under `packages/schemas` to understand the expected payloads and how LangGraph/Yjs services feed front-end UI.
- Review the shared TypeScript config and Biome settings before adding new code to ensure emitted types, linting, and SCSS module definitions stay consistent with existing patterns.

These notes should equip a newcomer to navigate `apps/web`, understand the supporting packages, and see how the broader monorepo pieces interlock.