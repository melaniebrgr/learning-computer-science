# Week 36

> I'm applying for a Front End Software Engineer role at Biotech/AI startup. For the interview I was told to "expect technical questions about the 1) React ecosystem, 2) modern JavaScript/TypeScript, 3) security concepts, 4) frontend best practices, and 5) system design and architecture decisions. You will not be asked to write code, but we may ask you to explain concepts given a code example." For each of the five topics provide 10 example questions number 1) a., b. and so on. Do not provide the answers yet. I will ask later to check the answers for each question.

> - Be ready to explain CORS and how browsers handle cross-origin requests.
> - Understand how authentication in frontend apps works (tokens, headers, cookies).
> - Refresh on core concepts: state vs props, lifecycle/hooks, context, controlled components.
> - Be able to explain these clearly with a simple example.
> - Mention specific tools you’ve worked with (e.g. Redux, Tailwind, Jest, Webpack).

---

At a Biotech/AI startup, the frontend will likely:

- Handle large, complex datasets (e.g., genomics, protein structures, medical imaging, AI predictions).
- Require security and compliance (think HIPAA/GDPR, patient data, proprietary models).
- Need scalable, performant architecture (many users, heavy visualizations, possible integrations with ML pipelines).
- Support collaboration and accessibility (researchers, clinicians, non-technical users).

---

## Table of contents

1. React Ecosystem (Data-heavy UI & State Management) ✅✅✅✅
2. Modern JavaScript / TypeScript (Scalability & Reliability)
3. Security Concepts (Medical/Research Data Protection)
4. Frontend Best Practices (Performance, Accessibility, UX for Researchers)
5. System Design & Architecture Decisions (Scalability, Real-time Data)

---

## 1. React Ecosystem (Data-heavy UI & State Management) ✅

### a. How do you prevent unnecessary re-renders in React components when visualizing large datasets? ✅

When does rerendering happen in react? React’s rendering model is built around the idea that UI is a function of  state, and triggering a state change (props, state, and context) triggers a UI render. There are 4 reasons a component will rerender:

1. State Changes: A component’s state using hooks like `useState` React will rerender that component to reflect the new state.
2. Props Changes: If a parent component passes new props to a child component, the child will rerender to reflect those updated values.
3. Context Changes: Any component that consumes a React context will rerender when the context value changes.
4. Parent Rerender: When a parent component rerenders, all its children will also rerender by default, unless you use memoization techniques like `React.memo`, `useMemo`, or `useCallback` are employed.

Memoisation takes careful consideration because prop changes are checked by referential equality. For example, `React.memo` of a component works for primitive data types like numbers and strings, but objects need to be memoised manually with `useMemo`, or `useCallback`, and it is very easy to miss one and also can turn the code into a mess. This sort of breaks React's promise that we just need to update state and it will take care of the rest.

Behind the scenes, React uses a virtual DOM (vDOM), an in-memory representation of the UI. When state changes, React compares the vDOM with the real DOM, and identifies the set of modifications needed, and updates the real DOM.

React compiler simplifies handling of memoization--the performance optimizations that developers would do manually are now done automatically by the React compiler. Reputidly. React 19 is the first version to _officially support_ the React Compiler, the compiler is a seperate tool, e.g. a Babel plugin that needs to be added to the project. Keep in mind that react compiler will not catch every case. For example, it will not compile third party (external) libraries so it will not catch every possible performance optimisation case. Hopefuly these libraries will instead use React compiler.

#### 1.a. References

1. [Nadia Makarevich – How React Compiler Performs on Real Code, React Advanced 2024](https://www.youtube.com/watch?v=T-rHmWSZajc)
2. [React Compiler Docs](https://react.dev/learn/react-compiler/introduction)

### b. How do you handle global state in a large React application (e.g., Redux vs. React Query vs. Zustand)? ✅

Modern web applications combined different types of state depending on where the data is coming from.

- server state: react-query
- form state: useActionState, react hook form
- sync state: Yjs / SyncedStore
- remaining application state: useState -> useReducer; URL / query params; or one of redux, zustand, jotai, mobx, xstate

Generally you want to start simple with React's built in state management. One heuristic: fo you want the modal/UI to be preserved on page refresh? Put it in a URL. Otherwise, reach for a third-party library when React's internal APIs and URL methods don't scale. Some signs are,

- Nested context providers (context that change often causing re-rending issues; you want to use context for things that don't change too often like theme, that really need to be passed down to all children)
- Scattered state logic (no central place)
- Extensize prop drilling

Or you experience state synchronisation issues. There are two global state management paradigms: store-based or signal/atomic-based.

#### Store-based

##### Redux (RTK)

- First and most popular state management library.
- Extensive ecosystem
- 60k GH stars / 9M weekly downloads.

Redux has a centralized store, with predictable updates via actions and reducers. It's often criticised for requiring setup/boilerplate, but has a proven track record to scaling to large applications.

##### Zustand

- Hook-based approach (no context providers).
- Tiny, 1KB bundle size for small to medium apps.
- Typescript typing not ideal.
- 40k GH stars / 2M weekly downloads.

[Zustand](https://zustand-demo.pmnd.rs/), the "bear necessities" of state management. Zustand can have seperate stores per resource or a central store, strong typing and state modifers (like in redux) but has a hooks-based API. Note that the update functions are stable but the data changes up every update causing component to rerender. It is suitable for small to medium size applications. As the application scales you starte need to create and manage multiple stores.

Fun fact: “Zustand” is named after the German word for “state” or “condition.” It comes from the same creator as Jotai, Daishi Kato.

##### XState

- State machine.
- Stronger TypeScript inference.
- API similar to Redux.
- Nice dev tools (visual editor extension for VSCode)

You tend to have more nuanced state transitions and want something to untangle and manage these. Even logged in toe logge dout flows can start to get complex though. Different actions can be tied to different transitions.

Fun fact: "XState" is created by David Khourshid.

#### Signal/atomic-based

##### Jotai

- Primitive atoms for modular state.
- small size (<1KB).
- 13k GH stars / 400k weekly downloads.

Jotai come from the makers of Zustand but take a very different, "bottom up"  or atomic approach. You have atoms to hold the data, and atoms to updated the data atom. Then to use these, you need to pass them to `useAtom` and `useSetAtom` hooks. It's flexible but can create a lot on incidental complexity, making it more suitable for small to medium apps.

Fun fact: “Jotai” is named after the Japanese word 状態 (jōtai), which means "state" or "condition". The creator is Daishi Kato, a Japanese developer.

##### Recoil

- 20k GH stars / 800k weekly downloads.

Developed by Facebook but is an officially dead project and not be compatible with newer versions of React. It straight up not works in latest versions, use Jotai instead as its API is essentially the same.

##### MobX

- Observables for reactive updates
- Object-oriented
- Excels in complex/dynamic UIs.
- 26k GH stars / 1.2M weekly downloads.

[MobX](https://mobx.js.org/README.html) is generally Class-based setup with properties and methods. In the constructor the class properties are set up to be observable (`makeAutoObservable`), then methods modify the state. The class in instatiated and the singleton. To use the state the component it needs to be wrapped in an observer function (react binding). When the observable state changes the component rerenders. No hooks necessary, but the pattern and syntax is a learning curve for most React developers.

Fun fact: The original name “MOBservable” combined “M” for member and “Observable” to emphasize that the library was about making member variables observable for reactive state management.

#### State documentation

**ERD-like diagrams** are a good way to visualise the data relationships in an application. For this, [dbdiagram.io](https://dbdiagram.io/home) is a good tool with a good DSL. **Sequense diagrams** are a good way to visualise the flow of data through an application; [swimlanes.io](https://swimlanes.io/) is another good tool with a DSL. **State diagrams** are useful for documenting flows as a finite state machine ([stately.ai](https://stately.ai/)). As the application grows it is a good way to visualise the possible transitions. Keeping these documents inside the codebase can also provide good context to AI agents.

### c. What is code splitting in React, and how would you use it to optimize a data-heavy dashboard? ✅

Both code splitting and tree shaking have the impact of reducing the bundle size and therefore initial load time. However, they differ in intent. Tree shaking is about removing unused code, code splitting is about loading code only when it is needed.

In single page applications route-based code splitting is typically handled automatout of the box, i.e. on route change only the page code is loaded. For example, with React Router's framework features, the application is automatically code split to improve the performance of initial load times when users visit your application. Code splitting can also be implemented manually with React's `lazy` and `Suspense` components.

React.lazy can be called outside your components to declare a lazy-loaded React component, "This code relies on dynamic import(), which might require support from your bundler or framework. Using this pattern requires that the lazy component you’re importing was exported as the default export." (1), "Now that your component’s code loads on demand, you also need to specify what should be displayed while it is loading. You can do this by wrapping the lazy component or any of its parents into a <Suspense> boundary"

#### 1.c. References

1. [lazy](https://react.dev/reference/react/lazy)

### d. How does React handle server-side rendering (SSR), and why might it be useful in a biotech/AI app?
### e. Describe React rendering behaviour.

Since React 16 React used "Fiber" data structures that keep track of component instances, and their children and the previous iterations of them. The virtual DOM is less and less true with this structure.

#### Render Phase

In response to a change in state, e.g. useState, React asks components to describe UI from current props/state. JSX becomes React elements (plain objects) that represent intended UI structure. This tree of objects describing the HTML elements is the **virtual DOM**. When a parent renders, all of its children render recursively, regardless of prop equality, unless the child is memoised. In React 18, this render work can be paused, resumed, or discarded; multiple renders may be thrown away before commit (concurrency). During **reconciliation**, react diffs element types/keys to decide reuse vs replace.

#### Commit Phase

All calculated changes are applied synchronously. `useEffect` runs shortly after via a separate “Passive Effects” step.

#### Cleanup Phase

Cleanup effects.

### f. How would you manage complex forms (e.g., clinical trial data input) in React? ✅

#### Form state

You don't need `useState` to manage form data, the form element holds it's own state. The **Form Data API** can be used collect, validate (with zod), and send information from web forms. **Zod** is a great library for validating form data.

Since React 19 there is a new hook, `useActionState`, that is syntactic sugar for the boilerplate, `useState`, `useEffect` and `useRef` React code previously necessary to manage forms. In an action you don’t get or need the event as the argument. To display the submit status of a form in the UI, the `useFormStatus` hook from react DOM can be used. The `useFormStatus` hook must be paired with `useActionState`, is used within a form component and reads the form status like it is context. The `useOptimistic` hook provides a way to optimistically update the user interface before a background operation, like a network request, completes. In the context of forms, when a user submits a form the interface is immediately updated with the expected outcome instead of waiting for the server response to reflect the changes.

Together these hooks should replace the need for react-hook-form (RHF) for most forms. RHF is still a great option for complex forms, but check its React 19 integration first.

```ts
const [data, action, isPending] = useActionState(onSubmitAction, initialState);

const onSubmitAction = async (formData: FormData) => {
    const payload = Object.fromEntries(formData.entries());
    const validatedData = zodSchema.safeParse(payload);
    if (!validatedData.success) {
        console.error(validatedData.error);
        return;
    }
    // POST the form data
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: validatedData.data,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}
```

### g. What styling libraries would you use for a data-heavy biotech/AI dashboard?

## 2. Modern JavaScript / TypeScript (Scalability & Reliability)

### a. What are the benefits of using TypeScript in a large-scale scientific/AI project?
### b. How do TypeScript generics improve type safety in reusable data visualization components?
### c. Can you explain structural typing in TypeScript and why it matters for API contracts?
### d. How does the event loop and task queue affect performance in a UI rendering heavy data streams?

### e. What is tree shaking, and why is it important when bundling large frontend apps? ✅

Tree shaking is a code optimisation technique. It is not JS specific but a "dead code elimination" technique implemented in bundlers Webpack, Rollup and Vite so that unused code does not get shipped with the application code, reducing the bundle size. Vite uses Rollup under the hood to bundle and optimize code for deployment. Bundlers do this by statically analysing the imports and exports of an application and only including specifically imported modules. Adding a visualisation tool can be added to rollup to visualise this.

"Tree Shaking helps us to reduce the weight of the application. For example, if we just want to create a “Hello World” Application in AngularJs 2 then it will take around 2.5MB, but by tree shaking we can bring down the size to just few hundred KBs, or maybe a few MBs."

#### 2.e. References

1. [What is Tree Shaking and Why Would I Need It?](https://stackoverflow.com/questions/45884414/what-is-tree-shaking-and-why-would-i-need-it)

### f. What are some new and exciting JavaScript language features that are useful for large-scale scientific/AI projects?

## 3. Security Concepts (Medical/Research Data Protection)

### b. Why is it dangerous to store JWTs in localStorage, and what’s a safer alternative?
### c. How do Content Security Policies (CSP) protect sensitive data applications?
### d. How would you securely handle user-uploaded files (e.g., genetic data, medical scans)?
### e. What are the risks of exposing API keys in frontend code, and how do you avoid it?
### f. How would you ensure compliance with GDPR/HIPAA from a frontend perspective? ✅

#### Principles

- Data minimization & purpose limitation: Only collect the fields strictly needed for the current task; gate optional fields behind explicit explanation/consent.
- Privacy by design/default: Build consent and privacy controls into flows up-front
- Defense in depth: Assume anything rendered or logged by the client could leak—avoid putting sensitive data (protected health information or personally identifiable information) on the client.

#### Dev practices

1. Consent and transparency

    - Granular consent UI (e.g., analytics vs. marketing vs. functional cookies), with opt-in defaults in the EU
    - Clear inline explanations: why a field is needed, retention, and who sees it; link to privacy policy and DPO/contact
    - Build flows for GDPR rights: access/export (portable formats), rectification, deletion, restriction, objection, and withdraw consent.
    - Always-available “Manage privacy” panel, e.g. in account settings.
    - Record client-side consent state and sync to server; make it resilient (e.g., consent survives device/browser changes).

2. Personally identifiable and protected health information (PII/PHI) handling

    - Never put PHI/PII in URLs (paths or query params) or in front-end routing state.
    - No PHI in logs/analytics/error reports: redact patterns (names, emails, IDs, free-text), disable keystroke/session replay on sensitive screens.
    - No PHI in localStorage/sessionStorage. Prefer short-lived, HttpOnly, Secure, SameSite cookies for auth; treat any cached client state as non-secure.
    - No PHI in caches: Mark responses that could embed PHI with Cache-Control: no-store and avoid rendering PHI in static assets. Consider disabling BFCache for ultra-sensitive flows if necessary.
    - Uploads: Strip EXIF, warn about unintended content, and avoid previewing sensitive files via third-party CDNs.

3. Third-party code & supply chain

    - Minimize third-party scripts; for HIPAA, don’t send PHI to vendors without a BAA—ideally no third-party analytics/trackers on authenticated PHI pages.
    - Load assets from trusted origins; CSP, subresource integrity hashes, iframe sandboxing, and tight permission policies to reduce data exfil risk.
    - Host fonts/icons locally to avoid outbound requests from protected screens.

4. Secure UX around authentication & sessions

    - OAuth/OIDC with PKCE, short-lived access tokens + silent refresh; rotate keys.
    - Step-up auth or re-auth before showing very sensitive data; idle and absolute session timeouts with clear warnings.
    - Prevent token leakage: no tokens in URL fragments after redirects; scrub referrers.

5. Form & UI details that prevent over-collection

    - Client-side validation that doesn’t transmit partial/invalid PHI.
    - Use HTML attributes (autocomplete, inputmode) to reduce mistakes; disable autofill where inappropriate.
    - Mask/redact on screen (e.g., show partial MRN) and in copy-to-clipboard; warn before copying/downloading PHI.

6. Error states & telemetry

    - Generic error messages—no PHI echoes.
    - Centralized error boundary that redacts before reporting; block stack traces that include user inputs.

7. Testing & proof

    - Privacy unit tests (no PII in URLs/logs), e2e tests for consent gates and data-subject right flows.
    - Lint rules/CI checks to ban console.log on sensitive modules and to detect PHI patterns in telemetry.
    - Data-flow diagrams from UI to APIs; keep them current for DPIAs and audits.

8. Collaboration (frontend’s role in the whole)

    - Work with legal/security on data classification (what counts as PHI/PII), retention, and BAAs.
    - Ensure backend enforces access control and audit trails; FE never relies on hidden controls for authorization—UI hints only.

Example: Context: Patient portal with labs and messaging.
• Implemented a consent manager with opt-in categories; consent state synced to a server ledger.
• Replaced session replay and error tooling on PHI routes with a HIPAA-eligible, self-hosted stack and field-level redaction.
• Moved auth from localStorage to HttpOnly cookies; added step-up auth before showing PDFs with PHI.
• Added no-store on lab result responses and removed PHI from all URLs; built “Download my data” (JSON/CSV) and account deletion flows.
• Locked down third-party scripts via CSP and SRI; hosted fonts locally.

## 4. Frontend Best Practices (Performance, Accessibility, UX for Researchers)

### a. What strategies would you use to optimize performance when rendering thousands of data points in charts or tables?
### b. How do you ensure accessibility (a11y) in complex data visualizations (e.g., screen readers, colorblind users)?

### c. What is lazy loading, and how would you apply it to reduce initial load times for dashboards? ✅

See code splitting.

### d. How do you measure and optimize page load time in a data-heavy app? ✅

There are many performance profiling tools that be used to measure and optimise page load time. The top three are Google Lighthouse, PageSpeed Insights (PSI) and the CrUX Report.

|Tool      |Data Type  |Focus/Use Case               |Metrics Reported       |
|----------|-----------|-----------------------------|-----------------------|
|PSI       |Lab + Field|User experience & suggestions|Core Web Vitals, others|
|Lighthouse|Lab        |Debugging & audits           |Performance, SEO, etc. |
|CrUX      |Field      |Real-world user experience   |Core Web Vitals, TTFB  |

#### Lighthouse Engine

Lighthouse is an open-source automated tool developed by Google for auditing web pages on performance, accessibility, SEO, and best practices. It simulates page loads in controlled environments and generates reports with actionable recommendations. The **Lighthouse Panel in Chrome DevTools** runs Lighthouse audits directly in the browser, providing reports on performance, accessibility, best practices, SEO, and progressive web apps for the current page.

**Recommended Use Cases:**

- Initial audits during development to identify optimization opportunities.
- Continuous integration in CI/CD pipelines to prevent regressions.
- Benchmarking site improvements before deployment.
- Educational purposes for learning web best practices.

**Pros:**

- Free and open-source with strong community support.
- Comprehensive audits covering multiple aspects beyond just speed (e.g., accessibility, SEO).
- Integrates easily into DevTools, CLI, and Node.js, GitHub Actions for flexible usage.
- Provides detailed, actionable insights with scoring and explanations.

**Cons:**

- Lab-based data may not capture real-world variability like network conditions or user interactions.
- Scores can fluctuate due to test environment differences; requires multiple runs for accuracy.
- Resource-intensive for large sites or frequent runs without optimization.
- Limited to Chrome emulation; may not reflect performance in other browsers accurately.

**When to Use and How:** Use Lighthouse early in development for quick feedback or in production for periodic checks. In DevTools: Open Chrome, navigate to your site, go to Lighthouse tab, and run an audit. Via CLI: Install via npm (`npm install -g lighthouse`), then run `lighthouse https://example.com --output=html --output-path=report.html`. For Node.js: Import the module (`const lighthouse = require('lighthouse')`) and execute audits programmatically to integrate into scripts or servers.

#### PageSpeed Insights (tool + API)

PageSpeed Insights (PSI) is a free Google tool that analyzes web pages for performance using Lighthouse lab data and real-user field data from Chrome UX Report (CrUX), providing scores and optimization suggestions. web.dev is Google's developer resource site that includes the Measure tool (powered by PSI/Lighthouse) for auditing pages, plus guides on performance, accessibility, and best practices. The PSI API provides programmatic access to PSI's Lighthouse audits and CrUX data, enabling automated performance testing and integration into workflows.

**Recommended Use Cases:**

- Quick performance checks for individual pages.
- SEO audits, as it ties into Google's ranking signals.
- Benchmarking against competitors' sites.
- Initial optimization guidance before deeper tools.
- Automated testing in build processes.
- Custom dashboards or alerts for performance regressions.
- Competitive analysis via scripts.
- Integrating with monitoring tools.

**Pros:**

- Combines lab (simulated) and field (real-user) data for balanced insights.
- Easy-to-use web interface; no setup required + free with API access for automation (automatable for CI/CD pipelines or bulk testing.)
- Provides Core Web Vitals assessments tied to SEO rankings.
- Returns JSON for easy parsing and custom reporting.
- Free with high daily limits (25,000 requests).

**Cons:**

- Lab data uses simulated throttling, which may not match real-world accuracy.
- Field data has delays (28-day aggregation) and requires sufficient traffic.
- Limited to single URLs; no bulk testing without API.
- Scores can vary due to test location/network variability.
- Requires coding knowledge for implementation.
- Simulated throttling may introduce inaccuracies.
- 28-day field data delay; no real-time monitoring.
- Limited to public URLs; no authenticated pages.

**When to Use and How:** Use for spot-checks or SEO-focused reviews. Visit pagespeed.web.dev, enter a URL, and click "Analyze." For automation, get an API key from Google Cloud Console, then fetch via URL (e.g., `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=example.com&key=yourKey`). Parse JSON response for metrics; integrate into Node.js scripts for scheduled runs.

#### Google Search Console

Google Search Console (GSC) provides performance reports on search traffic, impressions, CTR, and Core Web Vitals, helping optimize for SEO.

**Pros:**

- Free with direct Google data integration.
- Tracks real-user performance via CrUX.
- Identifies SEO-impacting issues like slow pages.
- Historical trends for long-term analysis.

**Cons:**

- Limited to search-related data; no full audits.
- 28-day delays in Core Web Vitals reports.
- Requires site verification; no competitor analysis.
- Aggregates data at page-group level, which can be imprecise.

**Recommended Use Cases:**

- Monitoring SEO performance and rankings.
- Identifying slow pages affecting search visibility.
- Long-term trend analysis for traffic/CTR.
- Combining with PSI for SEO-speed optimizations.

**When to Use and How:** Use post-verification for SEO monitoring. Verify your site in GSC, then navigate to the Performance report for metrics. For Core Web Vitals, go to that section; filter by device/country for targeted insights.

#### CrUX Dashboard

The CrUX Dashboard visualizes Chrome UX Report data in Looker Studio, showing historical Core Web Vitals trends. Use for trends. Create in Looker Studio with CrUX connector, enter origin (e.g., https://example.com). Filter by month/device; refresh for updates.

**Recommended Use Cases:**

- Long-term SEO/performance tracking.
- Competitor benchmarking.
- Monthly reports for stakeholders.
- Validating optimizations over time.

**Pros:**

- Free, easy-to-use visualizations.
- Historical data for trend analysis.
- Segments by device/connection.
- Customizable for specific origins.

**Cons:**

- Monthly updates; no real-time data.
- Origin-level only; no URL granularity.
- Requires traffic threshold for data.
- Limited to CrUX metrics.

#### Chrome UX Report (CrUX)

CrUX is Google's public dataset of real-user UX metrics from Chrome, powering tools like PSI and GSC. Use via tools like PSI or BigQuery. Query CrUX API for metrics (`fetch('https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=yourKey', {method: 'POST', body: JSON.stringify({origin: 'https://example.com'})})`); analyze distributions.

**Recommended Use Cases:**

- Real-world performance validation.
- SEO optimization for rankings.
- Industry benchmarking.
- Data-driven decisions on UX.

**Pros:**

- Real-user data for accurate insights.
- Free via APIs/BigQuery.
- Powers SEO rankings (Core Web Vitals).
- Global, segmented by device/country.

**Cons:**

- 28-day aggregation; delayed reporting.
- Requires sufficient traffic for data.
- Origin/URL-level only; anonymized.
- No causation analysis; needs tools for debugging.

#### Chrome Usage Statistics

Chrome usage statistics refer to aggregated data on browser adoption, often from sources like HTTP Archive or CrUX, used for performance benchmarking. Use for planning. Access via HTTP Archive or StatCounter; query CrUX for field data. Analyze in spreadsheets or tools like BigQuery for custom reports.

**Recommended Use Cases:**

- Device/browser targeting in development.
- Competitive analysis.
- Trend forecasting for tech adoption.
- Validating assumptions on user base.

**Pros:**

- Helps prioritize optimizations for common devices.
- Free via public datasets.
- Informs cross-browser strategies.
- Trends for long-term planning.

**Cons:**

- Aggregate; not site-specific.
- Biased toward Chrome users.
- Historical; may lag current trends.
- Requires analysis tools.

#### Web Performance APIs

Web Performance APIs are browser interfaces (e.g., Navigation Timing, Resource Timing) for measuring real-user timings like load events and resource fetches. Use in scripts. Access `performance.timing` for navigation metrics; implement observers like `PerformanceObserver` for entries. Send to server for analysis.

**Recommended Use Cases:**

- Custom RUM in apps.
- Debugging specific timings.
- Integrating with analytics.
- Real-user monitoring setups.

**Pros:**

- Real-time, client-side metrics.
- Built-in; no external tools needed.
- Granular for custom monitoring.
- Works across browsers.

**Cons:**

- Requires JavaScript implementation.
- Limited to supported metrics.
- Privacy concerns with user data.
- No aggregation; needs backend processing.

#### WebPageTest

WebPageTest is a free, open-source tool for detailed performance testing with waterfalls, filmstrips, and experiments. Use for detailed tests. Visit webpagetest.org, enter URL, configure (e.g., location/browser), run. Analyze waterfalls/filmstrips for bottlenecks.

**Recommended Use Cases:**

- Deep debugging of load issues.
- Cross-browser/device testing.
- Optimization experiments.
- Free audits for small sites.

**Pros:**

- Highly configurable (locations, browsers).
- Free with API for automation.
- Visual comparisons/experiments.
- Open-source; community-driven.

**Cons:**

- Complex interface for beginners.
- Queues for free tests.
- No built-in monitoring; manual runs.
- Limited real-user data.

### e. How do design systems help maintain consistency in a fast-growing biotech startup?
### f. What are Progressive Web Apps (PWAs), and would they be useful in a biotech/AI context?

## 5. System Design & Architecture Decisions (Scalability, Real-time Data)

### a. How would you design a frontend architecture for a real-time data-heavy biotech dashboard?
### b. What are the trade-offs between REST, GraphQL and gRPCwhen querying large scientific datasets?
### c. How would you decide whether to use client-side caching (React Query, Apollo) for AI predictions or lab results?
### d. How would you handle real-time data updates (e.g., experiment progress, live patient monitoring)?
### e. How would you structure a frontend to support internationalization (i18n) in scientific collaboration tools?
### f. How would you design error handling and logging for a production-grade biotech web app?

---

## On complexity

What is a "large React application"? Does it mean llike lots of users, a thousand components, or millions lines of code? When we're talking about state management at scale it isn't really _size_. It's all about maintainability and iteration speed as your app evolves. Applications then to have essential and accidental complexity. Essential complexity is inherit to the domain, while we want to minimise accidental complexity.

- Essential complexity: The unavoidable difficulty of the problem you’re trying to solve—no matter how skilled you are or what tools you use.
- Accidental complexity: The extra difficulty added by mistake--an “oops” moment making something harder than it needs to be without realizing it.
- Incidental complexity: Extra difficulty added by accident or on purpose. Sometimes you make things more complicated because you don’t know a better way, or because it’s faster in the short term, or because you’re not aware of a simpler solution.

There may also just not be time for the simpler solution. The added effort defining a clean abstraction and structure takes time and there is an opportunity cost to taking longer on something, maybe through losing business revenue when the feature is delivered later, or through the cost of not working on the next feature. There are tradeoffs to be made.

- [Incidental vs Accidental Complexity](https://coder-mike.com/blog/2021/09/24/incidental-vs-accidental-complexity/)

## Topics I find interesting

1. Local-first architecture
2. AI Engineering
3. Penetration testing
