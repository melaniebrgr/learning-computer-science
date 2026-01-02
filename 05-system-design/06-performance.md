# Performance

Performance issues generally come in two types: the big bottlenecks that are a clear and present danger, and the gradual accumulation of minor problems that build over time. Getting permission for big refactors is harder to do than small regular imprrovements.

Balancing avoiding performance pitfalls (prevention is the best medicine) with good architecture, and premature optimisation (only fix it when it becomes an issue) is a challenge. React has changed a lot over the years (react Fiber, Transitions) and performance improvement strategies have changed; sometimes dropping into vanilla JS with refs will still be necessary.

Performance optimisation done poorly is worse than none at all.

## DOM size, featuring React

- <https://frontendmasters.com/courses/react-performance-v2/>
- <https://stevekinney.com/courses/react-performance>

There is a limit to the number of DOM nodes that can be rendered to a page, i.e. 10,000 will probably have a bad time.

1. Do nothing (do you really need this or this code?)
2. Pretend to do something (fake it fast while the real thing slowly goes)
3. Skip it (cache it)
4. Delay it (come back later when it's ready)

1. First, "do nothing". Not executing logic is always faster than executing logic. Instead of solving the performance problem ask if the logic and data is needed in the application. State management and component hierarchy optimisationcan also help _skip_ needing to execute logic like component re-rendering. As an example of a bad architecture, is using a single context provider for all application state. Any change to the context triggers a re-render in all components hooked into that context.

2. Second, "pretend". Feeling fast is almost as goof as actually being fast, e.g. **optimistically updating** the UI doesn't make the server response faster, but makes it feel faster. You also need to pick and choose which is correct and right for the situation, e.g. for some long-lived apps, considering downloading everything upfront.

3. Third, "check if you can skip it". Skipping logic is _sometimes_ faster than executing it, but not always. Caching, **memoisation**, **React compiler** have their own overhead. For instance,**React.memo** checks previous with current prop values to check if props have changed instead of rendering to check if the output changed. A simple mental model of React's renderig strategy is that any state change will trigger the rerender of the entire state tree beneath it. Therefore in general we want to "skip it" by iether stopping rendering higher up, or start it lower down. It's a simplication because now with React Fiber rendering can be paused and resumed based on priority.

4. Fourth, "delay it". Use **Suspense** to tell the React reconciler, we're suspended right now, waiting for a promise to resolve, check later. Is easier and more reliable than doing yourself, and more performant, also given the underlying React architecture, while also being less work for you. With **lazy loading** and **bundle optimisation** load only as much as you need, and "as little as you can get away with".

## Caching

Caching is "storing the result of a computation _somewhere_ and returning the stored value instead of recomputing it again later." The caching strategy depends on the nature of the value being cached. A simple idea that brings along a lot factors to consider:

- **cache keys**: the cache key must contain all inputs that determine the result, e.g. using `useMemo` but missing a dependency in the dependency array. Getting the cache key itself can sometimes be costly.
- **cache invalidation**: there are difference approaches to cache invalidation:
  - proactive update of the cache, e.g. on PUT, POST, DELETE of a resource
  - timed invalication, e.g. HTTP cache control header directives like `max-age`
  - stale while revalidate, works with time invalidation where the stale version is served while the fresh version is fetched in the background
  - force fresh values, e.g. in admin mode always force fetches latest values
  - soft-purge when data is updated but cache headers would persist the stale data for quite some longer period of time, mark the data as stale so on the next request it is fetched in the background
- **cache size**: E.g. should you cache a video buffer in memory?
  - least recently used (LRU) have a fixed cache size where the least recently used value is purged when the cache reaches a certain size
  - file-system cache, e.g. `./node_modules/.cache`
- **cache warming**: when bringing up a brand new cache or switching CDNs a few problems can result until the cache is warm, e.g. API rate-limiting as all of a sudden a requests are getting re-made, or running out of resources--maybe you want a beefier CPU temporarily. Soft purge is a good solution to this.
- **cache value validation**: if the cache client changes what is uses the cached data shape could no longer be suitable, so validating with something like zod is a good idea.
- **cache request deduplication**: if there are two requests for the same resource, make one wait until the other completed.

### HTTP caching (browsers, CDNs)

Browsers check for the resources in the browser cache. If it's a hit use it, but for a miss, go to the server. A "hit" means that the asset was in the cache. A "**miss**" means it can either be there or too old. This makes page requests faster, and saves server computation and cost.

A browser cache is a **private cache** because it is tied to a specific client, and contains response personalised to that user. Most web applications also use a CDN, a "globally distributed type of reverse proxy", to server resources closer to the user's location. A CDN is a **public cache** shared among users.

A browser can load resources from disk-cache or memory cache. **Disk Cache** stores resources (e.g., scripts, images) on the hard drive (or SSD) in the browser’s cache directory. It is slower to access compared to memory but persistent across browser sessions (until cleared or expired).
Disk cache is used for resources that are cached but not immediately needed or when memory cache is full. Memory cache stores resources in RAM, making access extremely fast. **Memory cache** is temporary and cleared when the browser tab or session closes (or memory is needed elsewhere). It is prioritized for frequently accessed or recently used resources, like scripts loaded multiple times in a session.

The `Cache-Control` header defines directives that control caching behavior for both clients (like browsers) and intermediary caches (like CDNs, proxies). A `Cache-Control` header contains a list of policies (directives) to specify the browser caching. If conflicting directives are present, the most restrictive typically applies (e.g., `no-store` overrides `max-age`). Directives can be combined (e.g., `Cache-Control: public, max-age=3600, must-revalidate`) to fine-tune behavior. It cannot be set on the client, e.g. with JS.

| **Directive** | **Purpose** | **Typical Use Case** |
|---------------|-------------|----------------------|
| max-age | Specifies the maximum time in seconds a response is considered fresh. A response is "fresh" until its `max-age` or `s-maxage` expires (or based on heuristics if unspecified). Fresh responses can be served without contacting the server. | Use to cache an image for a fixed time, e.g., `max-age=86400` or 1 day. |
| s-maxage | Like `max-age`, but applies only to shared (proxy) caches, overriding `max-age`. | Used by CDNs to cache content longer than browsers (e.g., `s-maxage=31536000`). |
| no-store | Prohibits storing the response in any cache. | Sensitive data like banking transactions or private user data. |
| no-cache | Allows storing the response but requires revalidation with the server before use. Ensures users get the latest content without completely bypassing caching, useful for resources that may change frequently but can still benefit from conditional requests. | Cache dynamic content that needs freshness checks, e.g. news articles. |
| must-revalidate | Forces caches to revalidate stale responses with the server before serving. If the cache cannot reach the server or the response is invalid, it _must not_ serve the stale content and should return an error (e.g., 504 Gateway Timeout). | Ensure critical resources (e.g., legal documents) are fresh after expiration. |
| proxy-revalidate | Like `must-revalidate`, but applies only to shared (proxy) caches. | Enforce revalidation for CDNs while allowing browser flexibility. |
| public | Indicates the response can be cached by any cache (browser or proxy). | Publicly accessible resources like homepage assets. |
| private | Restricts caching to private (browser) caches, not shared (proxy) caches. | User-specific data like personalized dashboards. |
| no-transform | Prohibits caches from modifying the response (e.g., compressing images). | Ensure media files or sensitive payloads remain unchanged. |
| immutable | Indicates the response body will not change during its freshness period. | Cache immutable assets like versioned JavaScript files indefinitely. |
| stale-while-revalidate | Allows serving stale content while revalidating in the background. Revalidation involves checking with the server (e.g., via `If-Modified-Since` or `If-None-Match`) to confirm if the cached response is still valid. | Improve performance for slightly outdated content, e.g., `stale-while-revalidate=60`. |
| stale-if-error | Allows serving stale content if the server returns an error (e.g., 500). | Provide fallback content during server outages, e.g., `stale-if-error=86400` |

- Heuristic caching is when no caching header is set but the browser still caches based on a heuristic, like 10% of the last modified date.
- `if-modified-since` is a date cache header that can be sent with the request, but since time zones make things difficult, so has been replaced with ETags instead, which is a hash based on the content. The cache bust the ETag the content needs be changed somehow, e.g. by renaming the name of a script href.

#### Cache-Control examples

The following two example two header sets reflect two very different kinds of resources: one that is user‑specific, sensitive, or highly dynamic (so you want correctness and privacy), and one that is generic and static (so you want maximum reuse and performance).

```http
Cache-Control: private, s-maxage=0, max-age=0, must-revalidate, no-transform
```

e.g. https://en.wikipedia.org/wiki/JSON_streaming

- private: Allow caching only in a private cache (typically the browser), and forbid storage by shared proxies or CDNs.
- s-maxage=0: Override max-age but only for shared caches, consider the response immediately stale and must be revalidated on every use.
- max-age=0: Consider the response immediately stale in all caches and any reuse requires revalidation with the origin.
- must-revalidate: Once the response is stale, caches must not serve it without successfully revalidating with the origin. They are not allowed to serve stale data even if offline.
- no-transform: Disallows intermediaries (proxies, CDNs) from modifying the representation, such as recompressing images, changing formats, or minifying responses before delivery.

Overall, this combination yields: browser-only caching, always revalidated, never served stale, and never altered in transit, which is suitable for highly dynamic, user-specific responses where correctness matters more than cache hit ratio AKA **"private dynamic"**.

2. 
https://en.wikipedia.org/w/load.php?lang=en&modules=jquery&skin=vector-2022&version=r2z40

```http
Cache-Control: 
public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=60
```

- public: Marks the response as cacheable by any cache: browsers, shared proxies, and CDNs.
- max-age=2592000:  Instructs all caches that the response is fresh for 2 592 000 seconds (30 days) after it is stored. During this period, a cache can serve it without revalidation if no stricter directives apply.
- s-maxage=2592000: Same idea as max-age, but applies only to shared caches (CDNs, reverse proxies, ISP caches)
- stale-while-revalidate=60:  After the normal freshness window ends and the response becomes stale, caches may still serve that stale response for up to 60 seconds while they revalidate it in the background. This hides the latency of revalidation from users, because they get an immediate (slightly stale) response while the cache fetches a fresh version

AKA **"public static and long-lived"**.

#### Cache-Control standard sets

There are a handful of “standard” Cache-Control recipes that show up in real apps and form a spectrum of cacheability. As a rule of thumb, sensitive records should never be cached, personal data can be briefly cached privately, and public data can be cached everywhere for short to long times.

1. absolutely no caching
2. private dynamic
3. private but briefly cacheable
4. public static and short-lived
5. public static and long-lived
6. public static and immutable

- **"absolutely no caching"**: `Cache-Control: no-store, no-cache, max-age=0, must-revalidate` (+ often Pragma: no-cache for legacy). Effect is no cache is allowed to store the response at all (no-store), and even if some do, no-cache/max-age=0/must-revalidate ensure a fresh round-trip each time. Useful for bank balances, auth callbacks, logout endpoints, password reset pages, health data where even local storage is undesirable.
- **"private dynamic"** (above): `Cache-Control: private, s-maxage=0, max-age=0, must-revalidate, no-transform`
- **"private but briefly cacheable"**: `Cache-Control: private, max-age=300` Effect is  that the browser may reuse the page for a few minutes, but shared caches cannot store it. This reduces repeat latency without risking cross-user leakage. Useful for personalized home pages, dashboards, or search result pages that can be slightly out of date but must not be cached by CDNs.
- **"public static and short-lived"**: `Cache-Control: public, s-maxage=30, max-age=0, stale-while-revalidate=30, stale-if-error=300` (often with ETag) The effect is that browsers always revalidate (max-age=0), but CDNs can serve cached responses for 30 seconds. They may continue serving a stale response for another 30 seconds while revalidating, and even serve stale for up to 5 minutes if the origin is erroring. This is useful for public or semi-public APIs that serve data for product lists, news feeds, non-personalized “current status” pages where you want low latency but relatively fresh data.
- **"public static and long-lived"** (above): `Cache-Control: public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=60`
- **"public static and immutable"**: `Cache-Control: public, max-age=31536000` (immutable for 1 year). The effect is that browsers and CDNs can keep these for a very long time and never revalidate while fresh; immutable tells them the file will not change at that URL. You handle updates via new filenames. This is useful for fingerprinted JS/CSS/fonts/images where you deploy new URLs on change, e.g. `/assets/app.abc123.js`.

## Bundle size

When evaluating whether to split a third party library:

- Should it be split? Depends on the size.
- When should it be loaded? On page load, on demand with "greedy" criteria, on demand with stringent criteria
- Should it be stored in a custom cache

### Size analysis

The amount of javascript code that is downloaded and executed by the browser can greatly impact the TTFB, and TTI. The compressed file is what is downloaded over the wire and impacts TTFB. The minified size is what the browser must parse and impacts TTI. As a rule of thumb, over 500 kB minified starts to be too large. Consequently, both values are useful to consider. The following two bundles are being included on the FE, `rehype-katex` and `remark-math`:

- [rehype-katex](https://bundlephobia.com/package/rehype-katex@7.0.1)
  - 465.5 kB minified, 133.9 kB minified + gzip
  - 2.68s download slow 3G, 152ms emerging 4G (estimated)
- [remark-math](https://bundlephobia.com/package/remark-math@6.0.0)
  - 6.6 kB minified, 2.4kB minified + gzip
  - 49ms download slow 3G, 3ms emerging 4G (estimated)
- md-math (from local build)
  - 302 kB minified, 75 kB minified + brotli, 90 kB minified + gzip
  - ~1.5s download slow 3G, ~100ms emerging 4G (estimated)

In the rollup configuration, a custom chunk is manually configured, `'md-math': ['remark-math', 'rehype-katex']`. The real size of the bundles can be measured by running `yarn build`. After running the build, there is a `md-math-B2bkDCMt.js` chunk 302 kB with a size of (75 kB minified + brotli).

When the website is built, JS files are usually minified and potentially optimized but not compressed. The web server or CDN compresses files depending on the Accept-Encoding header in the request. For example, for a request with `Accept-Encoding: gzip, deflate, br, zstd` the server can respond with `Content-Encoding: br`, explicitly stating that the content was compressed with Brotli.

Together, rehype-katex and remark-math are 90 kB minified + gzip, which does not push the upper boundary of the initial-load. So, the decision to bundle split is neutral.
