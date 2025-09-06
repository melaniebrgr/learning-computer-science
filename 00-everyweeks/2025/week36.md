# Week 36

> I'm applying for a Front End Software Engineer role at Biotech/AI startup. For the interview I was told to "expect technical questions about the 1) React ecosystem, 2) modern JavaScript/TypeScript, 3) security concepts, 4) frontend best practices, and 5) system design and architecture decisions. You will not be asked to write code, but we may ask you to explain concepts given a code example." For each of the five topics provide 10 example questions number 1) a., b. and so on. Do not provide the answers yet. I will ask later to check the answers for each question.

---

At a Biotech/AI startup, the frontend will likely:

- Handle large, complex datasets (e.g., genomics, protein structures, medical imaging, AI predictions).
- Require security and compliance (think HIPAA/GDPR, patient data, proprietary models).
- Need scalable, performant architecture (many users, heavy visualizations, possible integrations with ML pipelines).
- Support collaboration and accessibility (researchers, clinicians, non-technical users).

---

## 1. React Ecosystem (Data-heavy UI & State Management)

### a. How do you prevent unnecessary re-renders in React components when visualizing large datasets?

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

### b. How do you handle global state in a large React application (e.g., Redux vs. React Query vs. Zustand)?

What is a "large React application"? Does it mean llike lots of users, a thousand components, or millions lines of code? When we're talking about state management at scale it isn't really _size_. It's all about maintainability and iteration speed as your app evolves.

### c. What is code splitting in React, and how would you use it to optimize a data-heavy dashboard?
### d. How does React handle server-side rendering (SSR), and why might it be useful in a biotech/AI app?
### e. How would you integrate React with data visualization libraries like D3 or Recharts efficiently?
### f. How would you manage complex forms (e.g., clinical trial data input) in React?
### g. What is the benefit of some new React features, e.g. Actions, Directives, Document Metadata, and Asset Loading?

## 2. Modern JavaScript / TypeScript (Scalability & Reliability)

### a. What are the benefits of using TypeScript in a large-scale scientific/AI project?
### b. How do TypeScript generics improve type safety in reusable data visualization components?
### c. Can you explain structural typing in TypeScript and why it matters for API contracts?
### d. How does the event loop and task queue affect performance in a UI rendering heavy data streams?
### e. What is tree shaking, and why is it important when bundling large frontend apps?
### f. How do you handle deep copying vs. shallow copying when working with immutable scientific datasets?

## 3. Security Concepts (Medical/Research Data Protection)

### a. What is Cross-Site Scripting (XSS), and how do you prevent it in a React app displaying untrusted input (e.g., research notes)?
### b. Why is it dangerous to store JWTs in localStorage, and what’s a safer alternative?
### c. How do Content Security Policies (CSP) protect sensitive data applications?
### d. How would you securely handle user-uploaded files (e.g., genetic data, medical scans)?
### e. What are the risks of exposing API keys in frontend code, and how do you avoid it?
### f. How would you ensure compliance with GDPR/HIPAA from a frontend perspective?

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

## Analysis of the application

