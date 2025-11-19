# Studocu AI - Repository Onboarding Guide

Welcome to the Studocu AI project! This guide provides a comprehensive introduction to the core technologies, architecture, and structure of this monorepo.

---

## 🎯 What is Studocu AI?

Studocu AI is an **AI-powered learning platform** built as a Turborepo monorepo. It combines modern frontend technologies with distributed backend services to provide real-time collaborative document editing, AI-assisted content generation, and intelligent quiz creation.

**Key Capabilities:**
- 📝 Real-time collaborative document editing (Google Docs-style)
- 🤖 AI-powered note generation from documents
- 📋 Intelligent quiz and practice question creation
- 📄 Document text extraction and processing
- 🔄 WebSocket-based synchronization using CRDT (Conflict-free Replicated Data Types)

---

## 🏗️ Repository Structure at a Glance

```
studocu-alpha-project/
├── apps/                    # 6 independent services
│   ├── web/                # React + React Router 7 (Frontend SPA)
│   ├── api/                # Laravel 12 (REST API)
│   ├── langgraph-server/   # Python AI agents (LangGraph)
│   ├── hocuspocus-server/  # Node.js WebSocket (Real-time collaboration)
│   ├── yjs-api-server/     # Node.js REST API (Document management)
│   ├── text-extraction-server/  # Python (Document processing)
│   └── playwright-tests/   # E2E and integration tests
│
├── packages/               # Shared libraries
│   ├── api-client/         # TypeScript API client
│   ├── schemas/            # JSON schemas
│   └── typescript-config/  # Shared TS configurations
│
├── kubernetes/             # K8s deployment configs
├── docker/                 # Docker configurations
├── turbo.json             # Turborepo configuration
├── biome.json             # Code formatting & linting
└── package.json           # Monorepo root config
```

---

## 💻 Core Technologies by Layer

### Frontend Stack (`apps/web`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **React 19** | UI library | 19.1.0 |
| **React Router 7** | Client-side routing with SSR | 7.7.1 |
| **Vite 7** | Lightning-fast build tool | 7.0.6 |
| **TypeScript 5.8** | Type safety | 5.8.2 |
| **Sass** | CSS preprocessing | 1.89.2 |
| **TipTap 3** | Rich text editor | 3.0.7 |
| **Yjs 13** | CRDT library for real-time sync | 13.6.27 |
| **TanStack Query 5** | Server state management | 5.82.0 |
| **React Hook Form** | Form state management | 7.62.0 |
| **Biome** | Code formatter & linter | 2.1.2 |

**Key Features:**
- Server-Side Rendering (SSR) support
- Hot Module Replacement (HMR) in development
- Component library with Storybook
- Real-time collaborative editing with TipTap + Yjs
- Type-safe SCSS modules with generated types
- Jest for unit testing
- Algolia-powered search
- Multiple authentication methods (social + email)

---

### Backend API (`apps/api`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Laravel 12** | Web framework | 12.0 |
| **PHP** | Language | 8.3.25 |
| **PostgreSQL** | Primary database | (via RDS) |
| **AWS S3** | File storage | |
| **Scribe** | API documentation | 5.3 |

**Key Responsibilities:**
- RESTful API for core business logic
- User and project management
- Document and file processing coordination
- Quiz data persistence
- Audio transcription orchestration
- Yjs document metadata management
- JWT-based authentication

**Architecture Pattern:**
- Modular structure with service layer
- Database migrations for schema management
- Queue-based background jobs
- HTTP controllers with validation

---

### AI Services (`apps/langgraph-server`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Python** | Language | 3.11 (required) |
| **FastAPI** | Web framework | 0.115.5 |
| **LangGraph 0.6** | Multi-agent orchestration | 0.6.3 |
| **LangChain 0.3** | LLM abstractions | 0.3.68 |
| **OpenAI / Anthropic / Google** | LLM providers | Various |
| **Langfuse** | Prompt management & observability | 3.1.3 |

**Architecture Highlights:**
- **Supervisor Pattern**: Central orchestrator routes tasks to specialized agents
- **Specialized Agents**:
  - **Note Agent**: Generates HTML notes from documents
  - **Practice Agent**: Creates structured quiz questions
- **State Management**: Pydantic models + LangGraph StateGraph
- **Streaming**: Custom event system for real-time UI updates
- **Multi-LLM**: Flexible provider support (OpenAI, Anthropic, Google)
- **Prompt Management**: Langfuse with local fallbacks
- **Persistence**: PostgreSQL checkpoints with in-memory failover

**Development Standards** (See `apps/langgraph-server/CLAUDE.md`):
- Strict type checking with mypy
- Ruff for fast linting (120 char line length)
- Numpy-style docstrings
- No hardcoded values
- Trunk-based development

---

### Text Extraction Service (`apps/text-extraction-server`)

| Technology | Purpose |
|------------|---------|
| **Python** | Language |
| **FastAPI** | Web framework |
| **AWS S3** | Document retrieval |

**Purpose**: Extract text from uploaded documents (PDF, images, etc.)

---

### Real-Time Collaboration Layer

#### HocusPocus Server (`apps/hocuspocus-server`)
- **Technology**: Node.js + TypeScript
- **Port**: 3006 (WebSocket)
- **Purpose**: Real-time document synchronization using Yjs CRDT
- **Features**:
  - WebSocket-based collaboration
  - PostgreSQL persistence
  - Extension system (Database, Logger)
  - Automatic conflict resolution via CRDT

#### Yjs API Server (`apps/yjs-api-server`)
- **Technology**: Node.js + Express + TypeScript
- **Port**: 3007
- **Purpose**: REST API for document operations
- **Features**:
  - Document CRUD operations
  - Source management
  - Security headers (Helmet)
  - CORS configuration
  - Request logging (Morgan)

---

## 🛠️ Developer Tools & Tooling

### Code Quality

| Tool | Purpose | Config |
|------|---------|--------|
| **Biome 2.0** | Linting & formatting | `biome.json` |
| **Jest 30** | Unit testing | `jest.config.js` per app |
| **TypeScript 5.8** | Type checking | `tsconfig.json` |
| **Stylelint 16** | CSS/SCSS linting | `.stylelintrc.json` |
| **PHP-CS-Fixer** | PHP formatting | `tools/PhpCsFixer/` |
| **Ruff** | Python linting | `pyproject.toml` |
| **mypy** | Python type checking | `pyproject.toml` |

### Build & Task Management

| Tool | Purpose |
|------|---------|
| **Turborepo 2.5** | Monorepo build orchestration with intelligent caching |
| **Vite 7** | Frontend bundler (React app) |
| **Yarn 4** | Package manager with workspaces |
| **Composer** | PHP dependency manager |
| **uv** | Python package manager |

### Package Management

- **Frontend**: Yarn 4 with Zero-Installs (`.yarn/cache` in git)
- **API**: Composer 2
- **Python Services**: uv (modern, fast Python dependency manager)
- **Monorepo**: Yarn Workspaces + Turborepo

### Git Workflow

| Tool | Purpose |
|------|---------|
| **Lefthook** | Git hooks for pre-commit checks |
| **Commitlint** | Enforce Conventional Commits |
| **GitHub Actions** | CI/CD pipeline |

**Pre-commit hooks** run in parallel:
- Biome format + lint (TS/JS/JSON)
- Stylelint (CSS/SCSS)
- Scriptlint (package.json scripts)
- PHP-CS-Fixer

---

## 📡 Service Communication

### Request Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser / Client                          │
└────────────────────┬──────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    [HTTP API]  [WebSocket]  [Analytics]
        │            │            │
        │            │            └──► Segment/Mixpanel
        │            │
        │            └──────────────────► HocusPocus (Port 3006)
        │                                 │
        │                                 └──► Yjs Documents
        │
        ▼
    Laravel API (Port 8000)
        │
        ├──────────┬──────────┬──────────┐
        │          │          │          │
        ▼          ▼          ▼          ▼
    [Database] [LangGraph] [Text Ext.] [S3]
        │          │          │
        │          │          └──► Document Processing
        │          │
        │          ├──────────────────► OpenAI API
        │          ├──────────────────► Anthropic API
        │          └──────────────────► Google API
        │
        └──────────────────────────► PostgreSQL (RDS)
```

### APIs & Endpoints

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | https://local.studocu.com/en-us/ai | Main SPA |
| **API** | http://localhost:8000 | REST API |
| **API Docs** | http://localhost:8000/docs | OpenAPI docs |
| **LangGraph** | http://localhost:8080 | AI agents |
| **LangGraph Docs** | http://localhost:8080/docs | FastAPI docs |
| **Text Extraction** | http://localhost:3008 | Document processing |
| **HocusPocus** | ws://localhost:3006 | WebSocket sync |
| **Yjs API** | http://localhost:3007 | Document REST API |
| **Storybook** | http://localhost:6006 | Component library |

---

## 🎨 Frontend Architecture

### Project Structure

```
apps/web/
├── app/                    # React Router 7 routes
│   ├── project/[id]/      # Dynamic project page
│   │   ├── mock-exam/     # Mock exam feature
│   │   └── hooks/         # Project-specific hooks
│   └── +layout.tsx        # Root layout
├── components/            # Reusable React components (68 components)
├── contexts/             # React Context for state (Auth, Project, Files)
├── hooks/                # Custom React hooks
├── lib/                  # Business logic utilities
├── utils/               # Helper functions
├── styles/              # Global Sass styles
├── constants/           # App-wide constants
├── layouts/             # Layout components
├── store/              # SyncedStore for shared state
├── tracking/           # Analytics integration
├── translations/       # i18n configuration
└── .storybook/        # Component library setup
```

### State Management Strategy

| Layer | Technology | Use Case |
|-------|-----------|----------|
| **Real-time Docs** | Yjs + SyncedStore | Collaborative editing |
| **Server State** | TanStack Query | API data caching |
| **Local State** | React Hooks | Component-level state |
| **Context** | React Context | Global state (Auth, Project) |
| **Form State** | React Hook Form | Form handling |

### Component Patterns

- **Type-safe SCSS**: Auto-generated TypeScript types from `.module.scss` files
- **Accessible UI**: React Aria + custom components
- **Error Boundaries**: For graceful error handling
- **Responsive Design**: Mobile-first approach
- **Storybook**: All components documented with stories

---

## 🗄️ Database Schema

### Primary Database: PostgreSQL (AWS RDS)

**Main Tables:**
- `projects` - User projects/workspaces
- `documents` - Document metadata and references
- `sources` - Document sources (PDFs, images, etc.)
- `quizzes` - Quiz definitions
- `quiz_questions` - Individual quiz questions
- `users` - User accounts and profiles
- `yjs_documents` - Yjs document state for real-time collaboration
- `langgraph_checkpoints` - AI agent execution state

**Features:**
- Connection pooling
- Queue system for background jobs
- AWS S3 integration for file storage

---

## 🚀 Deployment & Infrastructure

### Kubernetes Structure

```
AWS EKS Cluster
├── alpha-api namespace
├── alpha-yjs-api namespace
├── alpha-hocuspocus namespace
├── alpha-langgraph namespace
└── alpha-text-extraction namespace
```

**Per namespace:**
- Deployment (with replicas)
- Service (internal load balancing)
- Ingress (external routing)
- PodDisruptionBudget (availability)
- ServiceAccount (IAM roles)
- Secrets (from AWS SSM Parameter Store)

### AWS Infrastructure

- **Compute**: EKS (Elastic Kubernetes Service)
- **Database**: RDS PostgreSQL
- **Storage**: S3 buckets
- **CDN**: CloudFront
- **Secrets**: AWS Systems Manager Parameter Store
- **Container Registry**: ECR
- **CI/CD**: GitHub Actions + Kustomize

### Monitoring & Observability

| Service | Tool | Purpose |
|---------|------|---------|
| **All** | Sentry | Error tracking & alerting |
| **AI** | Langfuse | LLM observability & prompts |
| **Web** | Segment + Mixpanel | Analytics |
| **API** | Laravel Pail | Log streaming |

---

## 📦 Shared Packages

### @repo/api-client
**Purpose**: Unified API client for frontend applications

**Exports:**
- `client` - Main API client instance
- `utils/*` - Helper utilities
- `constants/*` - API constants
- `apis/*` - Domain-specific API modules

**Key Features:**
- Type-safe API interactions
- Request/response interceptors
- Error handling
- Environment-based configuration

### schemas
**Purpose**: Shared JSON schemas for data validation

**Contains:**
- Request/response schemas
- Business entity definitions
- Validation rules

### typescript-config
**Purpose**: Shared TypeScript compiler options

**Contains:**
- Base `tsconfig.json`
- Service-specific extends

---

## 🔄 Development Workflow

### Getting Started

1. **Clone & install**:
   ```bash
   git clone <repo>
   cd studocu-alpha-project
   yarn install  # Or use install-alpha-packages script
   ```

2. **Setup environment files**:
   ```bash
   for service in api langgraph-server text-extraction-server web yjs-api-server; do
     cp -n apps/$service/.env.example apps/$service/.env
   done
   ```

3. **Start development**:
   ```bash
   yarn dev  # Starts all services in parallel
   # Or start individual services:
   yarn dev --filter=web    # Frontend only
   yarn dev --filter=api    # API only
   ```

### Common Tasks

| Task | Command | Service |
|------|---------|---------|
| **Format code** | `yarn format` | All |
| **Lint code** | `yarn lint` | All |
| **Type check** | `yarn check-types` | All |
| **Run tests** | `yarn test` | All |
| **Build for production** | `yarn build` | All |
| **View Storybook** | `yarn storybook` | web |
| **Generate SCSS types** | `yarn generate-scss-definitions` | web |

### Git Workflow

```
1. Create branch: git checkout -b feature/xyz
2. Make changes
3. Pre-commit hooks run automatically
4. Commit: git commit -m "feat: description"
5. Create PR with description
6. Code review (enforce conventions)
7. Merge to main
8. CI/CD triggers automatically
```

---

## ⚠️ Important Gotchas

### Python Version
- **Required**: Python 3.11
- **NOT compatible**: Python 3.12
- Install with `pyenv`: `pyenv install 3.11 && pyenv local 3.11`

### Node Version
- **Required**: Node 18+
- Check with: `node --version`

### Dependencies
- **Paid licenses required**:
  - FontAwesome Pro (Pro icons)
  - TipTap Pro (Advanced editor features)
- **Beta packages** (may have breaking changes):
  - AI SDK packages
  - LangChain / LangGraph

### Environment Variables
- 29+ global variables defined in `turbo.json`
- Each service has additional `.env` requirements
- See README.md for setup instructions

### SCSS Type Generation
- Must run before developing: `yarn generate-scss-definitions`
- Automatically runs in `dev` and `build` scripts
- Watches for changes: `yarn generate-scss-definitions:watch`

---

## 🔐 Security & Configuration

### Authentication
- JWT-based API authentication
- Multiple auth providers (social, email)
- Middleware-based auth in Laravel

### Secrets Management
- AWS Systems Manager Parameter Store
- Environment variable injection in Kubernetes
- GitHub Actions OIDC for CI/CD

### API Documentation
- **Frontend**: Scribe-generated docs at `/docs`
- **LangGraph**: FastAPI Swagger at `/docs`
- **Text Extraction**: FastAPI Swagger at `/docs`

---

## 📊 Testing Strategy

### Frontend (`apps/web`)
- **Framework**: Jest + React Testing Library
- **Coverage**: Unit & integration tests
- **Special**: jest-axe for accessibility
- **Mocking**: MSW for API requests

### Backend (`apps/api`)
- **Framework**: PHPUnit
- **Coverage**: 76 test files
- **Command**: `php artisan test`

### AI Services (`apps/langgraph-server`)
- **Framework**: Pytest
- **Markers**: `@pytest.mark.integration` for integration tests
- **Coverage**: 27 test files

### E2E Tests (`apps/playwright-tests`)
- **Framework**: Playwright
- **Target**: Critical user journeys
- **Status**: Infrastructure ready, tests to be implemented

---

## 🚨 Critical Dependencies to Monitor

| Package | Current | Status | Notes |
|---------|---------|--------|-------|
| React | 19.1.0 | Outdated | 1 minor behind |
| React Router | 7.7.1 | Outdated | 2 minors behind |
| Vite | 7.0.6 | Outdated | Multiple patches behind |
| LangGraph | 0.6.3 | Pre-1.0 | Breaking changes possible |
| LangChain | 0.3.68 | Pre-1.0 | Breaking changes possible |
| FontAwesome Pro | 6.7.2 | Paid | Requires active license |
| TipTap Pro | 3.0.0 | Paid | Requires active license |

**Action**: Enable Dependabot/Renovate for automated updates

---

## 🎓 Learning Path

### For Frontend Developers
1. Learn **React Router 7** file-based routing
2. Understand **Yjs** for real-time collaboration
3. Master **TanStack Query** for server state
4. Explore **TipTap** editor integration
5. Familiarize with **SCSS modules** type generation

### For Backend/API Developers
1. Review **Laravel 12** structure and patterns
2. Understand **Service layer** architecture
3. Learn **Queue jobs** for background tasks
4. Master **Migration system** for database changes
5. Review **Authentication** flow and JWT

### For AI Engineers
1. Study **LangGraph supervisor pattern**
2. Learn **State management** with Pydantic
3. Understand **Streaming event system**
4. Explore **Multi-LLM** provider abstractions
5. Master **Langfuse** integration

### For DevOps/Infrastructure
1. Understand **Kubernetes manifests** (Kustomize)
2. Learn **Service mesh** concepts
3. Master **GitHub Actions** CI/CD
4. Explore **AWS EKS** and related services
5. Review **Monitoring** with Sentry + CloudWatch

---

## 📚 Additional Resources

- **Architecture Deep Dive**: See `TECHNICAL_OVERVIEW.md`
- **AI Development Standards**: See `apps/langgraph-server/CLAUDE.md`
- **Dependency Audit**: See `DEPENDENCY_AUDIT.md`
- **API Documentation**: http://localhost:8000/docs (when running)
- **Component Library**: `yarn storybook`

---

## 🤝 Contributing

1. **Read** CLAUDE.md and coding standards
2. **Follow** Conventional Commits for messages
3. **Ensure** tests pass: `yarn test`
4. **Run** linters: `yarn lint`
5. **Check** types: `yarn check-types`
6. **Create** PR with description
7. **Address** feedback from reviewers

---

## 🆘 Getting Help

- **Architecture questions**: Review `TECHNICAL_OVERVIEW.md`
- **Code patterns**: Check existing code in similar modules
- **Setup issues**: See README.md
- **AI development**: Read `apps/langgraph-server/CLAUDE.md`
- **Type errors**: Check `tsconfig.json` and Biome rules

---

## 📝 Quick Reference

### Key Directories

| Path | Purpose |
|------|---------|
| `apps/web/components` | React components |
| `apps/web/lib` | Business logic |
| `apps/web/hooks` | Custom hooks |
| `apps/api/app/Modules` | API modules |
| `apps/langgraph-server/src/agents` | AI agents |
| `packages/api-client/src` | Shared API client |

### Common Scripts

```bash
# Development
yarn dev              # All services
yarn lint             # Check code quality
yarn format           # Auto-format
yarn check-types      # Type checking
yarn test             # Run tests

# Build
yarn build            # Production build

# Specific services
yarn dev --filter=web
yarn lint --filter=api
yarn test --filter=langgraph-server
```

---

**Version**: 1.0  
**Last Updated**: November 2025  
**Maintained By**: Engineering Team

This is a living document. Please update as the repository evolves!
