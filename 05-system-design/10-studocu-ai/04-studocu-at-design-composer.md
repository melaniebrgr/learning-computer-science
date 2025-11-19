# Repository Introduction: Studocu AI

> **Purpose**: This document provides an overview of the Studocu AI codebase, introducing core technologies, architecture, and features for developers new to the repository.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Core Technologies](#core-technologies)
4. [Applications & Services](#applications--services)
5. [Shared Packages](#shared-packages)
6. [Key Features](#key-features)
7. [Development Workflow](#development-workflow)
8. [Getting Started](#getting-started)

---

## Project Overview

**Studocu AI** is an AI-powered learning platform that helps students create study materials, generate quizzes, and collaborate on notes in real-time. The platform combines document processing, AI-powered content generation, and collaborative editing capabilities.

### Key Capabilities

- **Document Processing**: Upload and extract text from PDFs, DOCX, PPTX, handwritten notes, and audio recordings
- **AI-Powered Content Generation**: Generate study notes, summaries, and practice quizzes from uploaded materials
- **Real-Time Collaboration**: Google Docs-style collaborative editing with multiple users
- **Interactive Study Tools**: AI chat interface, quiz generation, mock exams, and study guides
- **Content Search**: Algolia-powered search for finding related study materials

---

## Architecture

### Monorepo Structure

The project uses **Turborepo** (a monorepo build system) to manage multiple applications and shared packages:

```
studocu-alpha-project/
├── apps/                    # Individual applications
│   ├── web/                 # React frontend (Port 3005)
│   ├── api/                 # Laravel REST API (Port 8000)
│   ├── langgraph-server/    # Python AI service (Port 8080)
│   ├── hocuspocus-server/   # WebSocket server for collaboration (Port 3006)
│   ├── yjs-api-server/      # Document management API (Port 3007)
│   ├── text-extraction-server/  # Document processing (Port 3008)
│   └── playwright-tests/    # E2E tests
├── packages/                # Shared libraries
│   ├── api-client/          # Shared API client
│   ├── schemas/             # JSON schemas
│   └── typescript-config/   # Shared TypeScript configs
└── kubernetes/             # Deployment configurations
```

### Architecture Pattern

**Microservices Architecture** with:
- **Frontend**: React SPA with SSR capabilities
- **Backend API**: Laravel REST API for business logic
- **AI Services**: Python-based agents for content generation
- **Real-Time Services**: WebSocket servers for collaboration
- **Shared Libraries**: Common code across services

### Communication Flow

```
User Browser
    ↓
React Frontend (apps/web)
    ↓
    ├─→ Laravel API (apps/api) ──→ PostgreSQL
    ├─→ LangGraph Server (apps/langgraph-server) ──→ AI Models (OpenAI/Anthropic/Google)
    ├─→ HocusPocus (apps/hocuspocus-server) ──→ PostgreSQL (Yjs documents)
    ├─→ YJS API (apps/yjs-api-server) ──→ PostgreSQL
    └─→ Text Extraction (apps/text-extraction-server) ──→ AWS S3
```

---

## Core Technologies

### Frontend Stack (`apps/web`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | 19.1.0 |
| **React Router** | Routing & SSR | 7.7.1 |
| **Vite** | Build tool & dev server | 7.0.6 |
| **TypeScript** | Type safety | 5.8.2 |
| **TipTap** | Rich text editor | 3.0.7 |
| **Yjs** | CRDT for collaboration | 13.6.27 |
| **TanStack Query** | Data fetching & caching | 5.82.0 |
| **Sass** | Styling | 1.89.2 |
| **Biome** | Linting & formatting | 2.1.2 |
| **Jest** | Testing | 30.0.4 |
| **Storybook** | Component library | 9.0.17 |

**Key Libraries**:
- `@hocuspocus/provider` - WebSocket client for Yjs collaboration
- `@syncedstore/core` - Reactive state management for Yjs
- `@tiptap-pro/extension-ai` - AI-powered editor features
- `algoliasearch` - Search functionality
- `react-pdf` - PDF viewing
- `framer-motion` - Animations

### Backend API Stack (`apps/api`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Laravel** | PHP framework | 12.0 |
| **PHP** | Runtime | 8.3+ |
| **PostgreSQL** | Database | - |
| **AWS SDK** | Cloud services | 3.351 |
| **JWT** | Authentication | 6.11 |
| **Scribe** | API documentation | 5.3 |

**Key Features**:
- RESTful API with versioning (`/v1`)
- JWT-based authentication
- File storage on AWS S3
- Queue system for background jobs
- Database migrations
- API documentation at `/docs`

### AI Services Stack (`apps/langgraph-server`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Python** | Runtime | 3.12 |
| **FastAPI** | Web framework | 0.115.5 |
| **LangGraph** | Agent orchestration | 1.x |
| **LangChain** | LLM framework | 1.x |
| **Langfuse** | AI observability | 3.8.0 |
| **OpenAI/Anthropic/Google** | LLM providers | Various |

**Architecture**:
- **Supervisor Pattern**: Central orchestrator routes tasks to specialized agents
- **Note Agent**: Generates HTML notes from documents
- **Practice Agent**: Creates structured quizzes and practice questions
- **State Management**: LangGraph StateGraph with PostgreSQL checkpointing
- **Streaming**: Real-time event system for UI updates

### Collaboration Stack (`apps/hocuspocus-server` & `apps/yjs-api-server`)

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime (18+) |
| **TypeScript** | Type safety |
| **HocusPocus** | WebSocket server for Yjs |
| **Express** | REST API framework |
| **PostgreSQL** | Document persistence |

**How It Works**:
- Yjs uses CRDTs (Conflict-free Replicated Data Types) for automatic conflict resolution
- HocusPocus manages WebSocket connections and document synchronization
- YJS API handles document CRUD operations
- Changes are persisted to PostgreSQL

### Text Extraction Stack (`apps/text-extraction-server`)

| Technology | Purpose |
|------------|---------|
| **Python** | Runtime |
| **FastAPI** | Web framework |
| **PyMuPDF** | PDF text extraction |
| **Pandoc** | Document conversion |
| **Mistral AI** | OCR for images |

**Supported Formats**: PDF, DOCX, PPTX, TXT, Markdown, Images (via OCR)

---

## Applications & Services

### 1. `apps/web` - Frontend Application

**Purpose**: Main user-facing React application

**Key Features**:
- Project management (create, view, share projects)
- Real-time collaborative document editing
- AI chat interface for study assistance
- Quiz generation and mock exams
- File upload and document viewing
- Search functionality (Algolia)
- Authentication (social + email)
- Premium/freemium features

**Key Routes**:
- `/en-us/ai` - Landing page
- `/en-us/ai/project/:id` - Project workspace
- `/en-us/ai/project/:id/mock-exam` - Mock exam interface

**Notable Components**:
- `TipTapEditor` - Collaborative rich text editor
- `Chat` - AI chat interface
- `Quiz` - Quiz generation and display
- `ProjectSidebar` - Project navigation
- `AlgoliaSearchSelect` - Content search

**State Management**:
- React Context for global state (`AuthContext`, `ProjectStoreContext`)
- TanStack Query for server state
- Yjs/SyncedStore for collaborative document state

### 2. `apps/api` - Laravel REST API

**Purpose**: Core business logic and data persistence

**Key Modules**:
- **Projects**: CRUD operations for user projects
- **Sources**: Document source management
- **Quizzes**: Practice question generation and storage
- **Files**: File upload, processing, and storage
- **Authentication**: JWT-based auth
- **Yjs Documents**: Document metadata management

**API Endpoints**:
- `/v1/projects` - Project management
- `/v1/sources` - Document sources
- `/v1/quizzes` - Quiz operations
- `/v1/files` - File operations
- `/v1/auth` - Authentication

**Documentation**: Available at `http://localhost:8000/docs` (Scribe)

### 3. `apps/langgraph-server` - AI Agent Service

**Purpose**: Multi-agent AI system for content generation

**Architecture**:
```
User Request
    ↓
Supervisor Agent (routes request)
    ↓
    ├─→ Note Agent (generates notes/summaries)
    └─→ Practice Agent (generates quizzes)
    ↓
Response streamed back to frontend
```

**Key Features**:
- Multi-LLM support (OpenAI, Anthropic, Google)
- Document reading from S3
- Streaming responses for real-time UI updates
- Conversation memory across sessions
- Prompt management via Langfuse
- PostgreSQL checkpointing for state persistence

**Agents**:
- **Note Agent**: Processes documents and generates structured notes
- **Practice Agent**: Creates multiple-choice quizzes from content

### 4. `apps/hocuspocus-server` - Collaboration WebSocket Server

**Purpose**: Real-time document synchronization

**Features**:
- WebSocket-based collaboration
- Yjs CRDT synchronization
- PostgreSQL persistence
- Automatic conflict resolution
- Presence awareness (who's editing)

**Connection**: `ws://localhost:3006`

### 5. `apps/yjs-api-server` - Document Management API

**Purpose**: REST API for Yjs document operations

**Features**:
- Document CRUD operations
- Source management
- Security headers (Helmet)
- CORS configuration

**Endpoints**: `http://localhost:3007`

### 6. `apps/text-extraction-server` - Document Processing

**Purpose**: Extract text from uploaded documents

**Features**:
- Multiple extraction methods (PyMuPDF, Pandoc, OCR)
- S3 integration for file access
- FastAPI-based microservice
- Health check endpoint

**Endpoints**: `http://localhost:3008`

---

## Shared Packages

### `packages/api-client`

**Purpose**: Shared API client library for frontend

**Features**:
- Type-safe API calls
- Session management
- Error handling utilities
- Environment configuration

**Usage**: Imported as `@repo/api-client` in the web app

### `packages/schemas`

**Purpose**: Shared JSON schemas across services

**Schemas**:
- `event-schema` - Event definitions
- `knowledge-test-schema` - Quiz/test schemas
- `yjs-schema` - Yjs document schemas

**Usage**: Ensures consistency between frontend and backend

### `packages/typescript-config`

**Purpose**: Shared TypeScript configurations

**Configs**:
- `base.json` - Base TypeScript config
- `react.json` - React-specific config

**Usage**: Ensures consistent TypeScript settings across packages

---

## Key Features

### 1. Real-Time Collaborative Editing

**Technology**: Yjs + TipTap + HocusPocus

**How It Works**:
- Yjs CRDTs handle conflict-free merging of edits
- HocusPocus WebSocket server syncs changes
- TipTap provides the rich text editor UI
- Changes persist to PostgreSQL

**User Experience**: Multiple users can edit the same document simultaneously with live updates

### 2. AI-Powered Content Generation

**Technology**: LangGraph + LangChain + Multiple LLMs

**Capabilities**:
- **Note Generation**: Convert documents into structured study notes
- **Quiz Creation**: Generate multiple-choice practice questions
- **AI Chat**: Interactive study assistant with context awareness
- **Explain/Answer**: Step-by-step explanations and examples

**Flow**:
1. User uploads document → Text extraction
2. User requests content → Supervisor routes to appropriate agent
3. Agent processes request → Streams response to frontend
4. Content saved → Available in project

### 3. Document Processing

**Technology**: Text Extraction Server + AWS S3

**Supported Formats**:
- PDF (PyMuPDF)
- DOCX, PPTX (Pandoc)
- Images (Mistral AI OCR)
- Audio (transcription via OpenAI)

**Flow**:
1. User uploads file → Laravel API
2. File stored in S3 → Hash key generated
3. Text extraction service → Processes file
4. Extracted text → Stored and available for AI processing

### 4. Project Management

**Features**:
- Create projects with multiple sources
- Organize by groups/categories
- Share with collaborators
- Privacy settings (public/private)
- Project search and filtering

### 5. Quiz & Mock Exam System

**Features**:
- Generate quizzes from documents
- Multiple-choice questions
- Progress tracking
- Feedback and explanations
- Mock exam mode with timed sessions

### 6. Search & Discovery

**Technology**: Algolia

**Features**:
- Search across study materials
- Institution/course filtering
- Related content suggestions
- Fast, typo-tolerant search

---

## Development Workflow

### Package Management

- **Frontend**: Yarn 4 (zero-installs, workspaces)
- **Backend**: Composer 2
- **Python**: uv (modern Python package manager)
- **Monorepo**: Turborepo (intelligent caching, parallel execution)

### Code Quality

**Linting & Formatting**:
- **Frontend**: Biome (replaces ESLint + Prettier)
- **Backend**: PHP-CS-Fixer
- **Python**: Ruff (fast linter/formatter)

**Type Checking**:
- **Frontend**: TypeScript (strict mode)
- **Python**: mypy (type annotations)

**Git Hooks** (Lefthook):
- Pre-commit: Format, lint, type check
- Commit-msg: Conventional commits validation

### Testing

- **Frontend**: Jest + React Testing Library
- **Backend**: PHPUnit
- **Python**: Pytest (unit + integration tests)
- **E2E**: Playwright (installed, needs setup)

### Build & Deployment

**CI/CD**: GitHub Actions
- Matrix builds for all services
- Docker image builds
- Kubernetes deployments
- Database migrations

**Environments**:
- **Local**: `local.studocu.com`
- **Staging**: Separate AWS account
- **Production**: AWS EKS (Kubernetes)

---

## Getting Started

### Prerequisites

- **Node.js**: 18+ (check with `node --version`)
- **Python**: 3.12 (check with `python --version`)
- **PHP**: 8.3+ (check with `php --version`)
- **Yarn**: 4.11.0 (comes with project)
- **AWS Credentials**: Required for S3 access
- **Docker**: Optional, for containerized services

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studocu-alpha-project
   ```

2. **Install dependencies**
   ```bash
   # Install all packages (frontend + backend)
   yarn install
   
   # Or use the setup script
   yarn other:non-fe-apps:setup
   ```

3. **Set up environment files**
   ```bash
   for service in api langgraph-server text-extraction-server web yjs-api-server; do
     cp -n apps/$service/.env.example apps/$service/.env
   done
   ```

4. **Configure AWS credentials**
   - Switch to AWS role: `069729019062:role/poweruser`
   - Add credentials to `apps/api/.env`

5. **Start services**
   ```bash
   # Start all services (via devenv or manually)
   yarn dev
   
   # Or start individually:
   # Frontend: yarn dev (in apps/web)
   # API: php artisan serve (in apps/api)
   # LangGraph: See apps/langgraph-server/README.md
   # etc.
   ```

6. **Access the application**
   - Frontend: `https://local.studocu.com/en-us/ai`
   - API: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`
   - LangGraph: `http://localhost:8080`
   - Storybook: `http://localhost:6006`

### Development Commands

```bash
# Root level (affects all packages)
yarn dev              # Start all services in dev mode
yarn build            # Build all packages
yarn test             # Run all tests
yarn lint             # Lint all code
yarn format           # Format all code
yarn check-types      # Type check all TypeScript

# Web app specific
cd apps/web
yarn dev              # Start dev server (port 3005)
yarn storybook:dev    # Start Storybook (port 6006)
yarn test             # Run tests
yarn generate-scss-definitions  # Generate SCSS type definitions

# API specific
cd apps/api
php artisan serve     # Start Laravel server (port 8000)
php artisan test      # Run PHPUnit tests
php artisan migrate   # Run database migrations
```

### Key Development Files

**Frontend**:
- `apps/web/app/routes.ts` - Route definitions
- `apps/web/app/root.tsx` - Root component
- `apps/web/vite.config.ts` - Build configuration
- `apps/web/tsconfig.json` - TypeScript config

**Backend**:
- `apps/api/routes/v1.php` - API routes
- `apps/api/app/Modules/` - Feature modules
- `apps/api/config/` - Configuration files

**AI Services**:
- `apps/langgraph-server/src/core/supervisor/` - Supervisor agent
- `apps/langgraph-server/src/agents/` - Specialized agents
- `apps/langgraph-server/src/http_server/` - FastAPI endpoints

---

## Additional Resources

### Documentation

- **README.md** - Main project README
- **TECHNICAL_OVERVIEW.md** - Detailed technical analysis
- **apps/web/README.md** - Frontend-specific docs
- **apps/langgraph-server/README.md** - AI service docs
- **apps/langgraph-server/CLAUDE.md** - AI service coding standards

### Service URLs (Local Development)

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | `https://local.studocu.com/en-us/ai` | Main application |
| API | `http://localhost:8000` | REST API |
| API Docs | `http://localhost:8000/docs` | Scribe documentation |
| LangGraph | `http://localhost:8080` | AI service |
| LangGraph Docs | `http://localhost:8080/docs` | FastAPI docs |
| Text Extraction | `http://localhost:3008` | Document processing |
| HocusPocus | `ws://localhost:3006` | WebSocket server |
| YJS API | `http://localhost:3007` | Document API |
| Storybook | `http://localhost:6006` | Component library |

### Health Checks

```bash
# Check service health
curl http://localhost:8000/health    # API
curl http://localhost:8080/health    # LangGraph
curl http://localhost:3008/health    # Text Extraction
curl http://localhost:3007/health    # YJS API
```

---

## Next Steps

1. **Read the Technical Overview**: See `TECHNICAL_OVERVIEW.md` for detailed architecture
2. **Explore the Codebase**: Start with `apps/web/app/page.tsx` (landing page)
3. **Set Up Your Environment**: Follow the setup instructions above
4. **Run the Application**: Get all services running locally
5. **Read Service-Specific Docs**: Check individual README files in each app
6. **Review Coding Standards**: See `apps/langgraph-server/CLAUDE.md` for AI service standards

---

**Last Updated**: January 2025  
**Maintained By**: Engineering Team