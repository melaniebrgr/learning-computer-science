# Error monitoring

## Resources

You’ll get the most value by combining an official frontend tutorial (to generate real events) with a focused guide on the Issues page and related views. Below is a concrete path plus some UI tips tailored to frontend debugging. [docs.sentry](https://docs.sentry.io/product/sentry-basics/integrate-frontend/)

## 1. Start with a frontend-specific tutorial

https://www.youtube.com/watch?v=cl8tPBI4qUc&t=2s

Use Sentry’s “Frontend Error Monitoring Tutorial” as your base, even if you already know how to add the SDK. [docs.sentry](https://docs.sentry.io/product/sentry-basics/)

- Follow the React (or JS) tutorial to:
  - Create a Sentry project and connect a sample frontend app. [docs.sentry](https://docs.sentry.io/product/sentry-basics/integrate-frontend/)
  - Trigger a few intentional errors and verify they show up in Sentry. [docs.sentry](https://docs.sentry.io/product/sentry-basics/integrate-frontend/)
  - Enable source maps so stack traces point to your original TypeScript/React code. [docs.sentry](https://docs.sentry.io/product/sentry-basics/integrate-frontend/)
- This gives you realistic issues in Sentry’s UI to explore, instead of abstract screenshots.

Useful starting links:
- Official frontend tutorial (React-oriented, but concepts carry over): [Frontend Error Monitoring Tutorial] [docs.sentry](https://docs.sentry.io/product/sentry-basics/integrate-frontend/)
- General “Sentry basics” landing page: [Getting Started With Sentry] [docs.sentry](https://docs.sentry.io/product/sentry-basics/)

If you prefer video while you click around, watch “Sentry 101: Error Monitoring For Frontend Applications” and mirror what they do in your own project. [youtube](https://www.youtube.com/watch?v=cl8tPBI4qUc)

## 2. Learn the Issues page like a dashboard

The Issues page is the main place to understand frontend problems in production. [docs.sentry](https://docs.sentry.io/product/issues/)

Focus on:

- Filters and search:
  - Filter by browser, device, environment, URL, release, and “unhandled” vs handled errors to narrow down noisy frontends. [docs.sentry](https://docs.sentry.io/product/issues/)
  - Use time range + “impacted users” to spot regressions after a deploy. [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html)
- Issue grouping:
  - Sentry groups similar error events into a single issue with counts, first/last seen, and trend statistics. [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html)
  - Treat each issue as “one bug family” and use stats to prioritize which bug to fix first. [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html)
- Issue states:
  - Learn the state model: unresolved, resolved, ignored/silenced. [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html)
  - Use “ignore/silence” for known noisy frontend errors (e.g., extensions, bots) while still recording them but not getting notified. [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html)

Try this exercise: pick one noisy issue and practice using filters, assigning an owner, changing its state, and adding a comment with what you think is happening.

## 3. Read the issue details like a detective

Once you open a specific issue, you want to quickly answer: what happened, where, to whom, and after which deploy. [docs.sentry](https://docs.sentry.io/product/issues/)

Key panels in the issue details:

- Stack trace:
  - Hover the issue title or open a specific event to see the latest stack trace, with code context when source maps are set up. [docs.sentry](https://docs.sentry.io/product/issues/)
  - Identify the top-most in-app frame that belongs to your frontend code and jump from there.
- Event list and affected users:
  - Look at event frequency over time and impacted users to see if a bug is spiking or tapering. [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html)
  - Use tags like `browser`, `os`, `url`, `release` to see patterns (e.g., only Safari on specific route). [docs.sentry](https://docs.sentry.io/product/issues/)
- Suspect commits and owners:
  - When SCM integration is configured, Sentry suggests suspect commits and assignees based on stack traces. [docs.sentry](https://docs.sentry.io/product/sentry-basics/)
  - Use this to route frontend issues to the right person quickly rather than guessing.

Concrete practice: open an issue, pick one event, and write a 3–4 line “bug report” using only the data on that page (steps, browser, URL, code location).

## 4. Use UI features that matter most for frontend

You can ignore a lot of knobs at first and focus on a few high-value UI features. [docs.sentry](https://docs.sentry.io/platforms/javascript/guides/react-router/)

- Environments and releases:
  - Make sure your frontend sends `environment` (staging, production) and `release` so you can filter issues by deploy and environment in the UI. [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html)
  - After a deploy, filter by release and watch which frontend issues are new or regressed.
- Performance and slowdowns:
  - For SPAs or React Router apps, enable performance so you can correlate slow transactions (e.g., route transitions) with error issues in the UI. [gitnation](https://gitnation.com/contents/monitoring-errors-and-slowdowns-with-a-js-frontend-and-node-backend)
  - From a slow transaction, pivot into related errors and vice versa.
- Ownership rules:
  - Configure basic ownership rules so frontend paths (`src/frontend/**`) map to the frontend team, which makes the “Owner” field in the UI meaningful. [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html)

Again, practice helps: after enabling releases, pick a recent release in the UI and verify which issues first appeared there.

## 5. Recommended resources (frontend focused)

Here are concrete things you can work through in order, using your own project or a sample app:

| Goal | Resource | Why it helps |
| --- | --- | --- |
| Get Sentry wired into a frontend app and send real errors | [Frontend Error Monitoring Tutorial] [docs.sentry](https://docs.sentry.io/product/sentry-basics/integrate-frontend/) | Step-by-step setup for a React frontend, including SDK init, first error, and source maps. |
| Learn the basics of the Sentry interface from a frontend perspective | “Sentry 101: Error Monitoring For Frontend Applications” (YouTube) [youtube](https://www.youtube.com/watch?v=cl8tPBI4qUc) | Walks through what you see in the UI when JavaScript errors occur. |
| Understand the Issues list and details views deeply | Sentry Issues docs [docs.sentry](https://docs.sentry.io/product/issues/) and issue debugging/monitoring guide [docs.softwareheritage](https://docs.softwareheritage.org/devel/tutorials/issue-debugging-monitoring.html) | Explains filters, grouping, triage states, and statistics in the Issues pane. |
| Add routing/performance context for SPAs | React Router guide (if you use it) [docs.sentry](https://docs.sentry.io/platforms/javascript/guides/react-router/) | Shows how to send structured route transactions that surface nicely in the UI. |
| Improve your overall JS error tracking practices | “Effective Error Tracking with Sentry in JavaScript Apps” blog post [namastedev](https://namastedev.com/blog/effective-error-tracking-with-sentry-in-javascript-apps/) | Opinionated tips on getting useful data from Sentry rather than just collecting noise. |

If you tell me your exact stack (e.g., Next.js, plain React SPA, or Astro+React) and whether you already have Sentry wired up, I can propose a very targeted “90‑minute UI tour” with specific screens and queries to run.