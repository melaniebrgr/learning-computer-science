# Week 36

> I'm applying for a Front End Software Engineer role at Biotech/AI startup. For the interview I was told to "expect technical questions about the 1) React ecosystem, 2) modern JavaScript/TypeScript, 3) security concepts, 4) frontend best practices, and 5) system design and architecture decisions. You will not be asked to write code, but we may ask you to explain concepts given a code example." For each of the five topics provide 10 example questions number 1) a., b. and so on. Do not provide the answers yet. I will ask later to check the answers for each question.

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
### e. How would you integrate React with data visualization libraries like D3 or Recharts efficiently?

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

### a. What is Cross-Site Scripting (XSS), and how do you prevent it in a React app displaying untrusted input (e.g., research notes)?
### b. Why is it dangerous to store JWTs in localStorage, and what’s a safer alternative?
### c. How do Content Security Policies (CSP) protect sensitive data applications?
### d. How would you securely handle user-uploaded files (e.g., genetic data, medical scans)?
### e. What are the risks of exposing API keys in frontend code, and how do you avoid it?
### f. How would you ensure compliance with GDPR/HIPAA from a frontend perspective?
### g. What is CORS?

CORS is designed to prevent malicious website from accessing resources on anoother domain without permission. The Same-Origin Policy (SoP) and CORS are the two main mechanisms built into browsers that enforce this policy.

By default, the browser "same-origin policy" or SoP blocks websites from making requests to a domain other than the one that served the page. CORS or "Cross-Origin Resource Sharing"  provides a way for servers to tell browsers, via HTTP headers, that it’s okay to share resources cross-origin. Servers do this by including the `Access-Control-Allow-Origin` header specifying which domains are allowed to access their resources. The server opt-ins to requests by responding to a preflight request. Effectively this is a way to whitelist origins. (Note, an "origin" is not the URL, it is the scheme, domain and port). This pattern of the Origin and Access-Control-Allow-Origin headers is the simplest use of the access control protocol.

What requests _are NOT_ subject to CORS? "Simple requests":

GET, HEAD and POST requests with content type `application/x-www-form-urlencoded`, `multipart/form-data` (which is not AJAX), and `text/plain`. A.k.a form submissions (because CORS can after forms and we can't break the web), which is why we have to worry about CSRF and why nonces are a thing for forms.

What requests _are_ subject to CORS?

- AJAX requests
- Requests with content type `application/json`

#### 3.g. References

1. (Cross-Origin Resource Sharing (CORS))[https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS]

## 4. Frontend Best Practices (Performance, Accessibility, UX for Researchers)

### a. What strategies would you use to optimize performance when rendering thousands of data points in charts or tables?
### b. How do you ensure accessibility (a11y) in complex data visualizations (e.g., screen readers, colorblind users)?
### c. What is lazy loading, and how would you apply it to reduce initial load times for dashboards?
### d. How do you measure and optimize page load time in a data-heavy app?
### e. How do design systems help maintain consistency in a fast-growing biotech startup?
### f. What are Progressive Web Apps (PWAs), and would they be useful in a biotech/AI context?

## 5. System Design & Architecture Decisions (Scalability, Real-time Data)

### a. How would you design a frontend architecture for a real-time data-heavy biotech dashboard?
### b. What are the trade-offs between REST and GraphQL when querying large scientific datasets?
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
