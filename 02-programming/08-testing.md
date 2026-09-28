# Testing

## Introduction

People don't test because they don't know how, because the codebase hasn't been designed to be testable. If you've made an untestable codebase it is likely so tightly coupled that it is immediately a legacy codebase because you're unwilling to make changes to it. Outcomes of good test coverage:

- **confidence to refactor**: as the code grows or in a codebase that's not yours without tests you might not risk refactoring to fix an issue and implement some hack instead, which makes the overall problem worse.
- **document the code**: better than documentation--it's verifiable. Assertions about what shoul dbe true about the system are codified in a test. It's a form of communication for new developers _and_ you're future self. Tests are example of how things should work that allow you to generalise about how the system works.
- **develop faster**: It is critical_that writing and running tests be easier than writing and running the application so you can narrowly focus on a problem instead of getting the application into a state to validate the change.
- **improve AI output**

## Kinds of tests by category

The main web application testing types consist of functional, non-functional (performance, security, accessibility), APIs, visual, and so on.

- testing level: static analysis, unit, integration (functional), system (e2e), acceptance
- functionality: function, performance, security, usability, accessibility
- automation: manual, automated
- other: regression, smoke

## Designing a testing strategy

Building a testing strategy for a given web application depends on 
- the product requirements,
- the quality acceptance criteria,
- the available skills and resources within the team, and
- the target markets (end users) for which the application is intended.

Make test data and test environments for both the development stages and testing stages part of the project plan and become available prior to initiating the testing process.

### What is the testing scope?
The type of tests to focus on right now and covered in this document

- [x] Functional testing
- [ ] Accessibility testing
- [ ] Static code analysis - eventually we could setup sonarqube
- [ ] Performance testing
- [x] Authn/z security testing
- [ ] OWASP top 10 - where possible but obviously not all the top 10 is addressable from cradle/web
- [ ] Mobile testing
- [ ] Desktop testing - not included because we won’t tests across different desktop browsers, but we will be testing in some desktop browser.
- [ ] API testing - the API is not explicitly tested, but some parts will be tested implicitly via e2e tests
- [x] UI component testing - with Storybook
- [x] Visual testing
- [ ] Usability testing - open to ideas for testing this with automation in future

### What testing metrics matter?

![test-metrics.jpg](./_resources/test-metrics.jpg)

Metrics that are commonly used to monitor application testing (2). For example, the following proposal for web “test vitals”:
- (Speed) Total execution time: How long do tests take to run? Is it below a certain threshold? Relevant when test execution impacts developer velocity, such as blocking merge, or commit.
- (Quality) Defect leakage: How many bugs are making it into production? Relevant when test execution doesn’t impact developer velocity, e.g. long running tests that are executed nightly
- (Speed, Quality) Mean Time to Detect (MTTD): The time it takes to identify a defect in the code based on the total test execution time. Obviously, the shorter it takes to uncover a defect and then resolve it, the better. It also reflects the effectiveness of the test code. 
- (Quality) Total defects and defects by priority: Pull these numbers from linear. Similar to core web vitals, the usefulness comes from setting thresholds, e.g. fair, poor. Knowing the volume of defects and the priority attributed to each helps to determine the quality plans and future testing scope.
- (Quality) Risk coverage percent (?)
- (Cost) Cost of test maintenance: Open to ideas on how to measure this, but it’s important to track. When tests are flaky, hard to debug, or hard to fix, trust in them drops, people start skipping them or ignoring failing tests when they shouldn’t. Maybe something defect rejection is easier. A measure of false positives, tests skipped/ignored.

## Testing with Vitest

### Faster test execution

- threads and thread pooling
- test filtering
- concurrent execution

### Metric reporting

- Instanbul for coverage reports

### Built-in test features

- Chai assertion library
- Tinyspy for spies
- Happy-dom or jsdom support (not built-in)
- Tinybench for peformance benchmarks (experimental)
- Expect-type for type assertions

#### Browser mode

JSDom is a spec implementation of the DOM that simulates a browser environment. JSDOM simplifies the test setup and provides an easy-to-use API, it's good simulation but a simulation none-the-less, which can mean false positives and negatives. IT does mean longer initialisation time though. Vitest's browser mode is early development, augmenting with a standalone browser-side test runner, e.g. Playwright, is recommended.

In vitest, conventional Node-based tests can be configured along-side browser tests with project configuration. Browser tests can be run in preview mode, which opens a browser and headless mode, which executes the tests in the background without the browser UI.

## Testing with React Query

Components using React query will require a Query client provider. A `renderWithClient` util can be created for this purpose. A new query client should be created for each test with settings suitable for test, e.g. no retries.

```js
function renderWithClient(ui) {
  const testQueryClient = new QueryClient();

  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
}
```

Pair it with MSW to simulate API requests, and run the server before the test suite

```js
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
```

A challenge when testing mutations that invalidate queries is that static mock handlers don't reflect changes from mutations. Even after a mutation is performed and a query is invalidated, the mock handler will still return the same initial data. The problem of static mock handlers not reflecting mutation changes can be solved by using MSW's one-time override feature, `res.once`, which allows dynamic updates the mock response for a specific request, simulating the updated state after a mutation.

## Testing with Storybook

## Testing with Playwright

## Testing with MSW


`setupWorker` is fed a single 303-line [.storybook/msw/handlers.ts](@cradlebio/app/.storybook/msw/handlers.ts); stories override it with `worker.use()` and the global `beforeEach` in [.storybook/preview.tsx](@cradlebio/app/.storybook/preview.tsx) calls `worker.resetHandlers()`. Fixture data under `.storybook/msw/data/` is already typed against `@cradlebio/api-schema`. Handlers live in 19 files; endpoint patterns are hand-written regexes with three competing styles and heavy duplication (`table:query` appears 10 times, `task:list` 5).

### 1. Typed `endpoint()` helper

New `.storybook/msw/endpoint.ts`. Takes an OpenAPI path template key and produces the same anchored RegExp the codebase writes by hand today, so matching semantics are unchanged but typos fail typecheck:

```ts
import type { paths } from "@cradlebio/api-schema/schema"

/** Turns an OpenAPI path template into the URL matcher MSW needs. */
export function endpoint(path: keyof paths): RegExp {
  const pattern = path
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\\{[^}]+\\\}/g, "[^/]+")
  return new RegExp(`${pattern}(?:\\?.*)?$`)
}
```

`http.get(endpoint("/v2/workspace/{workspace}/data/table:query"), ...)` replaces `/\/v2\/workspace\/[^/]+\/data\/table:query/`. Keep RegExp output rather than MSW string patterns: the `resource:verb` URL style collides with MSW's `:param` syntax, which is why the current code escapes colons as `"*/v2/workspace\\:get"`.

### 2. Split handlers by domain

Follow the MSW structuring guidance:

```
.storybook/msw/handlers/
  index.ts        # export const handlers = [...userHandlers, ...tableHandlers, ...]
  users.ts  workspace.ts  projects.ts  rounds.ts  workflows.ts
  tables.ts  datasets.ts  artifacts.ts  tasks.ts  analyses.ts
  reports.ts  formats.ts  auth.ts
```

Each module exports a named array, mirroring the comment sections already in `handlers.ts`. `worker.ts` keeps importing from `./handlers`. Stories that need only one domain can then `worker.use(...tableHandlers)`. The route-local override sets (`rounds/$roundId/$workflowId/-storybook/msw/handlers.ts`, `stage-handlers.ts`) stay where they are — they are scenario overrides, not base network description — but switch to `endpoint()`.

### 3. Convert all call sites in one pass

All 19 files that import from `msw` move to `endpoint()`, including the `"*/users/me"` / `"*/v2/workspace\\:get"` string style and the local `FORMAT_LIST` / `BOTTLENECKS_RUN_URL` constants. Non-API mocks (`/changelog/meta.json`) keep their literal patterns.

### 4. Fail on unhandled API requests

`onUnhandledRequest` in `preview.tsx` currently only logs:

```ts
onUnhandledRequest: (request, print) => {
  if (new URL(request.url).pathname.match(/^\/(v2|ui|users)\//)) {
    print.error()
  }
},
```

Change it to `print.error()` then throw, so a missing handler fails the story instead of surfacing as a timeout. Non-API requests (assets, fonts) still pass through. This is the riskiest step: run the full Storybook test project afterwards and add handlers for anything it uncovers.

### 5. Replace request assertions

Four places wire a `fn()` spy inside a handler and assert on the captured body — the pattern MSW's "avoid request assertions" warns against:

- [CreateTableDialog.tests.stories.tsx](@cradlebio/app/src/routes/_authenticated/$workspaceId/data/-components/CreateTableDialog/CreateTableDialog.tests.stories.tsx) (`tableCreate`)
- [AssignFormatDialog.tests.stories.tsx](@cradlebio/app/src/routes/_authenticated/$workspaceId/data/-components/AssignFormatDialog.tests.stories.tsx) (`tableUpdate`)
- [NewRoundDialog.tests.stories.tsx](@cradlebio/app/src/components/dialogs/NewRoundDialog/NewRoundDialog.tests.stories.tsx) (`roundCreateHandler`, `workflowCreateHandler`, `roundListHandler`)
- [.storybook/msw/dataset-queries.ts](@cradlebio/app/.storybook/msw/dataset-queries.ts) (`datasetCreateHandler`)

Three substitutions, in order of preference:

- **Validate in the handler.** `table:create` and `table:update` return `400` when `column_mapping` names a chain or external ID that isn't in `columns`. A wrong payload then shows an error toast and the test's existing UI assertions fail on their own. This also replaces the `expect(tableUpdate).not.toHaveBeenCalled()` negative assertions.
- **Assert the UI.** `NewRoundDialog`'s `invocationCallOrder` check (round list refetched after workflow create) becomes an assertion that the new round is visible.
- **Life-cycle events for the rest.** For payload shapes with no UI signal — the `column_mapping` object in `CreateTableDialog` — add `.storybook/msw/request-log.ts` built on `worker.events.on("request:match", ...)`, returning recorded bodies. Handlers stay pure; the log is opt-in per story and cleared in the global `beforeEach` alongside `worker.resetHandlers()`.

### 6. Type the handlers

No handler uses MSW's generics today, so bodies are cast (`(await request.json()) as AnalysisRunBody`). Use `http.post<never, ReqBody, ResBody>` with the request/response types from `@cradlebio/api-schema/types` on the handlers that read a body, which removes the casts and catches fixture drift when the schema is regenerated.

### 7. Document the conventions

Add an MSW section to [docs/testing.md](docs/testing.md): happy paths in `handlers/<domain>.ts`, per-story overrides via `worker.use()`, always match with `endpoint()`, assert UI not requests, and use the request log only where no UI signal exists.

### Verification

`pnpm --filter=@cradlebio/app typecheck`, `pnpm --filter=@cradlebio/app test:storybook`, and `pnpm check` after each of steps 3, 4 and 5.

[Vitest usage example fro MSW](https://github.com/mswjs/examples/tree/main/examples/with-vitest)

## References

- <https://frontendmasters.com/courses/web-app-testing/introduction/>
- [Unit Testing Principles, Practices, and Patterns](https://learning-oreilly-com.onlineresources.tpl.ca/library/view/unit-testing-principles/9781617296277/Text/kindle_split_010.html)
- [GenAI for QA](https://learning-oreilly-com.onlineresources.tpl.ca/course/genai-for-qa/9781806709939/)
- [Practical Playwright Test: Next-Generation Web Testing and Automation](https://learning-oreilly-com.onlineresources.tpl.ca/library/view/practical-playwright-test/9798868821608/)
- [Full Stack Testing, 2nd Edition](https://learning-oreilly-com.onlineresources.tpl.ca/library/view/full-stack-testing/9798341636934/)
- [Software Testing Strategies](https://learning-oreilly-com.onlineresources.tpl.ca/library/view/software-testing-strategies/9781837638024/)
- [Testing JavaScript Applications](https://learning-oreilly-com.onlineresources.tpl.ca/library/view/testing-javascript-applications/9781617297915/) <https://learning-oreilly-com.onlineresources.tpl.ca/videos/testing-javascript-applications/9781617297915AU/>
- [A Frontend Web Developer's Guide to Testing](https://learning-oreilly-com.onlineresources.tpl.ca/library/view/a-frontend-web/9781803238319/)
  - [x] Chapter 4: Matching Personas and Use Cases to Testing Frameworks
  - [x] Chapter 6: Map the Pillars of a Dev Testing Strategy for Web Applications
- [Vitest](https://vitest.dev/guide/)
- [Unit testing with Vitest](https://www.youtube.com/watch?v=9Op6lK4wnRE)