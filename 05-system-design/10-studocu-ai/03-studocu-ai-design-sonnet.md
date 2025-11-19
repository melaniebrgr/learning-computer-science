I'll help you review the repository and create an outline of core technologies and features. Let me start by exploring the structure.

[14 tools called]

Based on my comprehensive review of the repository, I'll draft an outline introducing the core technologies and features for someone new to the project.

---

# Studocu AI Platform - Technology & Feature Overview

## 1. Executive Summary

**Studocu AI** is an AI-powered learning platform built as a **Turborepo monorepo** with multiple microservices. The platform enables students to:
- Create collaborative study notes with real-time editing
- Generate AI-powered summaries and quizzes from uploaded materials
- Practice with interactive knowledge tests
- Share and collaborate on study projects

**Architecture Style:** Microservices monorepo  
**Primary Technologies:** React, TypeScript, Laravel (PHP), Python (AI services)  
**Deployment:** Kubernetes (AWS EKS)

---

## 2. Core Technologies Stack

### 2.1 Frontend Technologies (`apps/web/`)

#### **React Ecosystem**
- **React 19.1.0** - Latest React with concurrent features
- **React Router 7.7.1** - Modern routing with SSR support
- **Vite 7.0.6** - Fast build tool and dev server
- **TypeScript 5.8.2** - Full type safety across the codebase

#### **Real-Time Collaboration**
- **Yjs 13.6.27** - CRDT (Conflict-free Replicated Data Type) for collaborative editing
- **@hocuspocus/provider 3.4.0** - WebSocket provider for Yjs synchronization
- **TipTap 3.0.7** - Rich text editor built on ProseMirror
  - Includes collaboration extensions
  - AI suggestion capabilities
  - Table, mathematics (KaTeX), and YouTube embed support

#### **State Management & Data Fetching**
- **@tanstack/react-query 5.82.0** - Server state management
- **@syncedstore/core 0.6.0** - Shared state with Yjs
- Custom React Context for auth and project state

#### **UI & Styling**
- **Sass Modules** - Component-scoped styling with type-safe CSS modules
- **@studocu/theme 2.149.0** - Internal design system
- **FontAwesome Pro 6.7.2** - Icon library (paid license)
- **Framer Motion 12.23.12** - Animation library
- **React Aria 3.41.1** - Accessibility primitives

#### **Forms & Validation**
- **React Hook Form 7.62.0** - Form state management
- **Zod 3.25.49** - TypeScript-first schema validation

#### **AI Integration**
- **@langchain/core 1.0.1** - LangChain framework for AI workflows
- Custom streaming event system for real-time AI responses

#### **Search**
- **Algolia** - External document search (algoliasearch 5.34.1)
- **react-instantsearch 7.16.2** - UI components for search

#### **Monitoring & Analytics**
- **@sentry/react 10.5.0** - Error tracking
- **@segment/analytics-next 1.81.0** - User analytics
- **@opentelemetry/api** - Distributed tracing

---

### 2.2 Shared Packages (`packages/`)

#### **`packages/api-client/`**
**Purpose:** Unified HTTP client for all REST API communication

**Key Features:**
- Consistent `fetchClient` with automatic environment detection
- Comprehensive error handling (BaseError, FetchError, JSONParseError)
- Session management utilities
- FormData and binary response support
- Full TypeScript generics support

**Usage Pattern:**
```typescript
import { fetchClient } from "@repo/api-client";

const data = await fetchClient<GetMe>({ 
  url: `${apiBaseUrl}/me` 
});

// Integrated with React Query
export const useGetMe = () =>
  useQuery({
    queryKey: ['/me'],
    queryFn: getMe,
    staleTime: STALE_NEVER,
  });
```

#### **`packages/schemas/`**
**Purpose:** Shared JSON schemas for validation and documentation

**Contains:**
- **yjs-schema** - Yjs document structure validation
  - Fixed properties: `id`, `source.metadata`, `creation.note.metadata`, `creation.quiz.metadata`
  - Dynamic properties: `creation.note.<uuid>` for individual notes
- **event-schema** - Analytics event definitions
- **knowledge-test-schema** - Quiz structure validation

#### **`packages/typescript-config/`**
**Purpose:** Shared TypeScript configurations

**Files:**
- `base.json` - Base TypeScript config
- `react.json` - React-specific extensions

---

## 3. Key Features & Architecture Patterns

### 3.1 Real-Time Collaborative Editing

**Technology Stack:**
- **Yjs** for CRDT-based conflict resolution
- **HocusPocus Server** (port 3006) for WebSocket synchronization
- **YJS API Server** (port 3007) for document management
- **TipTap** as the rich text editor interface

**How It Works:**
1. Client connects to HocusPocus WebSocket server
2. Document changes are synced via Yjs CRDT
3. All changes persisted to PostgreSQL
4. Multiple users can edit simultaneously without conflicts

**Key Files:**
- `apps/web/components/TipTapEditor/` - Main editor component
- `apps/hocuspocus-server/` - WebSocket server
- `apps/yjs-api-server/` - Document REST API

---

### 3.2 AI-Powered Features

**AI Backend:** `apps/langgraph-server/` (Python + FastAPI)

**Core Capabilities:**
1. **Note Generation** - Creates structured HTML notes from uploaded documents
2. **Quiz Creation** - Generates practice questions with multiple choice/true-false formats
3. **Study Assistant** - AI chat interface for Q&A about study materials

**Architecture Pattern:** **Supervisor Pattern**
- Central supervisor routes tasks to specialized agents
- **Note Agent** - Handles note generation
- **Practice Agent** - Creates quizzes
- State management via LangGraph StateGraph
- Streaming responses for real-time UI updates

**Multi-LLM Support:**
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google Gemini

**Key Technologies:**
- **LangGraph 0.6.3** - Agent orchestration
- **LangChain 0.3.68** - LLM framework
- **Langfuse 3.1.3** - Prompt management and observability
- **FastAPI 0.115.5** - HTTP server

---

### 3.3 Document Processing Pipeline

**Flow:**
1. User uploads document (PDF, DOCX, audio, etc.)
2. Laravel API receives file and stores in S3
3. **Text Extraction Server** (port 3008) extracts text content
4. Text stored in database and available for AI processing
5. User can generate notes/quizzes from extracted content

**Services Involved:**
- `apps/api/` (Laravel) - File management and orchestration
- `apps/text-extraction-server/` (Python) - Document text extraction
- AWS S3 - File storage

---

### 3.4 Project Management

**Core Concept:** Projects are containers for study materials

**Features:**
- Create projects with uploaded files
- Group projects by course/institution
- Share projects with collaborators
- Privacy controls (private/shared)
- Real-time presence indicators

**Key Components:**
- `apps/web/components/ProjectGroups/` - Project organization UI
- `apps/web/components/ProjectTile/` - Individual project cards
- `apps/web/contexts/ProjectStoreContext.tsx` - Project state management

---

### 3.5 Authentication & Authorization

**Strategy:** JWT-based authentication with cookie storage

**Features:**
- Email/password authentication
- Social login support (via Studocu main platform)
- Session management with auto-refresh
- User profile management

**Key Files:**
- `apps/web/contexts/AuthContext.tsx` - Auth state
- `apps/web/hooks/useLogin/` - Login logic
- `apps/web/hooks/useUser.ts` - User data hook
- `apps/api/` - Laravel JWT middleware

---

## 4. Development Tools & Standards

### 4.1 Code Quality Tools

**Linting & Formatting:**
- **Biome 2.0.0** - Fast linter/formatter (replaces ESLint + Prettier)
  - 120 character line width
  - Enforces accessibility, security, and style rules
  
**Type Checking:**
- TypeScript strict mode enabled
- PHP 8.3+ type hints
- Python mypy for static type checking

**Git Hooks (Lefthook):**
- Pre-commit: Format + lint + type check
- Commit-msg: Conventional commits validation

### 4.2 Testing Framework

**Frontend:**
- **Jest 30.0.4** - Test runner
- **React Testing Library 16.3.0** - Component testing
- **jest-axe 10.0.0** - Accessibility testing
- **MSW 2.10.3** - API mocking

**Backend (Laravel):**
- **PHPUnit 11.5.3** - PHP testing framework
- 76+ test files

**AI Services (Python):**
- **Pytest** - Test framework
- Unit + integration tests
- 27+ test files

### 4.3 Build & Deploy

**Build System:**
- **Turborepo 2.5.4** - Monorepo task orchestration
- Intelligent caching for fast builds
- Parallel task execution

**Package Management:**
- **Yarn 4.11.0** - Frontend package manager
- Workspaces for monorepo dependencies

**CI/CD:**
- GitHub Actions for automated builds
- Matrix builds for multiple services
- Kubernetes deployment with Kustomize

---

## 5. Key Application Routes & Structure

### 5.1 Main Routes (`apps/web/app/`)

```
/                          - Home page (project dashboard)
/newLanding               - Landing page for new users
/project/[id]             - Individual project view
  ├── ProjectPageContent  - Main project interface
  ├── ProjectSidebar      - Navigation and source list
  └── ProjectContentArea  - Note/quiz editor area
```

### 5.2 Component Architecture

**Layout Structure:**
```
DefaultLayout              - Standard page wrapper
  ├── Header               - Navigation + user menu
  ├── Footer               - Footer links
  └── {children}           - Page content

ProjectLayout              - Project-specific layout
  ├── ProjectSidebar       - Left sidebar navigation
  └── ProjectContentArea   - Main content area
```

**Key Component Patterns:**
- **Container Components** - Handle data fetching and business logic
- **Presentational Components** - Pure UI components
- **Modal System** - Centralized modal management
- **Error Boundaries** - Graceful error handling

---

## 6. Data Flow & Service Communication

### 6.1 Frontend → Backend Communication

```
React App (apps/web)
  ↓ HTTP REST
Laravel API (apps/api:8000)
  ↓ Database
PostgreSQL (RDS)
  
React App
  ↓ WebSocket
HocusPocus (apps/hocuspocus-server:3006)
  ↓ Persistence
PostgreSQL (RDS)

React App
  ↓ HTTP REST
YJS API (apps/yjs-api-server:3007)
  ↓ Database
PostgreSQL (RDS)
```

### 6.2 AI Processing Flow

```
User uploads document
  ↓
Laravel API stores in S3
  ↓
Text Extraction Server processes
  ↓
User requests AI note generation
  ↓
LangGraph Server (LangChain agents)
  ↓ Streaming SSE
React UI renders in real-time
  ↓
Final result stored via Laravel API
```

---

## 7. Environment Configuration

### 7.1 Key Environment Variables

**Frontend (`apps/web/.env`):**
- `API_BASE_URL` - Laravel API endpoint (default: `http://localhost:8000/v1`)
- `AI_BACKEND_BASE_URL` - LangGraph server (default: `http://localhost:8080`)
- `HOCUSPOCUS_SERVER_HOST` - WebSocket host (default: `127.0.0.1:3006`)
- `YJS_API_BASE_URL` - YJS API endpoint (default: `http://localhost:3007`)
- `SEGMENT_WRITE_KEY_JS` - Analytics key
- `VITE_SENTRY_DSN` - Error tracking

**Backend Services:**
- AWS credentials for S3 access
- PostgreSQL connection strings
- OpenAI/Anthropic API keys
- Sentry DSN for error tracking

---

## 8. Notable Features & Patterns

### 8.1 Custom Hooks

**Common Patterns:**
- `useProject()` - Fetch and manage project data
- `useAIStream()` - Handle streaming AI responses
- `useCreateProjectWithNavigation()` - Create project and navigate
- `useModalManager()` - Centralized modal state
- `useEventListener()` - Type-safe DOM event listeners

### 8.2 Tracking & Analytics

**System:** Segment + Mixpanel

**Implementation:**
- `apps/web/tracking/useTrackEvent/` - Event tracking hook
- Centralized event definitions
- Automatic page view tracking

### 8.3 Internationalization

**Approach:** Custom translation system

**Files:**
- `apps/web/translations/en-alpha.json` - English translations
- `apps/web/translations/Lang.ts` - Translation utilities
- `FormattedMessage` component for translated text

---

## 9. Development Workflow

### 9.1 Getting Started

**Prerequisites:**
- Node.js 18+
- PHP 8.3+
- Python 3.11 (specifically, not 3.12)
- PostgreSQL
- AWS credentials

**Setup:**
```bash
# Install dependencies
yarn install  # Frontend packages

# Setup environment files
for service in api web yjs-api-server; do
  cp apps/$service/.env.example apps/$service/.env
done

# Start all services
start-local  # Internal script
```

### 9.2 Common Commands

```bash
# Development
yarn dev                    # Start all services
yarn dev --filter=web      # Start only web app

# Testing
yarn test                  # Run all tests
yarn test --filter=web     # Test web app only

# Linting
yarn lint                  # Lint all code
yarn lint:fix              # Auto-fix issues

# Type checking
yarn check-types           # TypeScript type checking

# Storybook
yarn storybook            # Component library
```

---

## 10. Production Infrastructure

### 10.1 Deployment

**Platform:** Kubernetes on AWS EKS

**Namespaces:**
- `alpha-api` - Laravel API
- `alpha-yjs-api` - YJS document API
- `alpha-hocuspocus` - WebSocket server
- `alpha-langgraph` - AI service
- `alpha-text-extraction` - Document processing

**Resources:**
- Deployment with health checks
- Service for internal communication
- Ingress for external access
- PodDisruptionBudget for availability

### 10.2 Monitoring

**Tools:**
- **Sentry** - Error tracking (all services)
- **Langfuse** - AI observability
- **Segment** - User analytics
- **AWS CloudWatch** - Infrastructure logs

---

## 11. Key Technical Decisions

### 11.1 Why Yjs/CRDT?
Enables real-time collaboration without complex operational transformation logic. Automatic conflict resolution ensures data consistency.

### 11.2 Why Turborepo?
Manages multiple services efficiently with shared dependencies, intelligent caching, and parallel task execution.

### 11.3 Why LangGraph?
Provides structured multi-agent workflows with state management, enabling complex AI interactions with proper orchestration.

### 11.4 Why Separate Services?
Microservices architecture allows:
- Independent scaling of AI, WebSocket, and API layers
- Technology diversity (PHP, Python, Node.js)
- Isolated deployments and failures

---

## 12. Common Gotchas & Important Notes

1. **Python Version:** Must use Python 3.11, not 3.12
2. **SCSS Modules:** Run `yarn generate-scss-definitions` before development
3. **Paid Dependencies:** FontAwesome Pro and TipTap Pro require valid licenses
4. **WebSocket Connections:** Ensure HocusPocus is running for collaborative editing
5. **AI Features:** Require OpenAI/Anthropic API keys in environment
6. **Biome Version:** Keep consistent across workspace (currently mixed)

---

## 13. Next Steps for New Developers

1. **Read the main README** - Understand setup process
2. **Review TECHNICAL_OVERVIEW.md** - Deep architectural analysis
3. **Explore Storybook** - See component library (`yarn storybook`)
4. **Check apps/langgraph-server/CLAUDE.md** - AI service standards
5. **Run the app locally** - Create a test project and experiment
6. **Review test files** - Learn patterns from existing tests

---

## 14. Additional Resources

- **Main README:** `/README.md`
- **Technical Overview:** `/TECHNICAL_OVERVIEW.md`
- **Dependency Audit:** `/DEPENDENCY_AUDIT.md`
- **API Docs (local):** http://localhost:8000/docs
- **Storybook:** http://localhost:6006

---

**Document Version:** 1.0  
**Last Updated:** November 18, 2025  
**Maintained By:** Engineering Team