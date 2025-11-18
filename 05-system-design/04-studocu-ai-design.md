# Studocu AI

Some decision predate my arrival and involvement as FE lead. This is my best understanding.

## Topics

1. The tech stack and decisions around it
2. What is reused from the other repos
3. How the project is structured
4. What processes are different from Studocu, Studocu Frontend
5. How is it deployed to staging, to production?
6. Long term: what is the plan on how to maintain it (increase test coverage? refactor?)
7. Long term: how can we start sharing components between repos effectively
8. Reflection: wrong decisions & learnings

## The tech stack and decisions around it

### Monorepo

A Turborepo monorepo manages 6 production apps plus three shared packages.
Nx, which is used on studocu-frontend, was _not_ selected for Studocu AI because of changes that were forseen at the time that could have introduced additional cost:

> Nx introduced the "NX Powerpack" for remote caching, which costs \(\$26.00\) per seat per month. This change was accompanied by the removal of previous third-party library integrations that handled remote caching, meaning that to use on-site remote caching, teams must now subscribe to this new service.

Note that Nx was selected for studocu-frontend because it was the only mature option at the time.

[ ] Check with Ricardo if this is ca valid (https://nx.dev/remote-cache)

### Applications

(1) Laravel API (`api`), (2) Hocus Pocus websocket server (`hocuspocus-server`), (3) LangGraph agentic backend (`langgraph-server`), (4) a document text extraction service (`text-extraction-server`), (5) ...