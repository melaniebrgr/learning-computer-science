# Performance

## Browser cache (HTTP cache)

The client (a browser) looks for the resources in the browser cache. If it's found (a hit), use it, else (a miss), go to the server. A "hit" means that the asset was in the cache. A "**miss**" means it can either be there or too old. This

- makes page requests faster,
- saves server computation, and
- saves money, e.g. mobile users.

The browser cache is a **private cache** because it is tied to a specific client, and contain response personalised to that user. Most web applications also use a CDN, a "globally distributed type of reverse proxy", to server resources closer to the user's location. A CDN is a public cache is shared among users.

The `Cache-Control` header defines directives that control caching behavior for both clients (like browsers) and intermediary caches (like CDNs, proxies). A `Cache-Control` header contains a list of policies (directives) to specify the browser caching. If conflicting directives are present, the most restrictive typically applies (e.g., `no-store` overrides `max-age`). Directives can be combined (e.g., `Cache-Control: public, max-age=3600, must-revalidate`) to fine-tune behavior. It cannot be set on the client, e.g. with JS.

| **Directive** | **Purpose** | **Typical Use Case** |
|---------------|-------------|----------------------|
| max-age | Specifies the maximum time in seconds a response is considered fresh. A response is "fresh" until its `max-age` or `s-maxage` expires (or based on heuristics if unspecified). Fresh responses can be served without contacting the server. | Use to cache an image for a fixed time, e.g., `max-age=86400` or 1 day. |
| s-maxage | Like `max-age`, but applies only to shared (proxy) caches, overriding `max-age`. | Used by CDNs to cache content longer than browsers (e.g., `s-maxage=31536000`). |
| no-store | Prohibits storing the response in any cache. | Sensitive data like banking transactions or private user data. |
| no-cache | Allows storing the response but requires revalidation with the server before use. | Cache dynamic content that needs freshness checks, e.g., news articles. |
| must-revalidate | Forces caches to revalidate stale responses with the server before serving. | Ensure critical resources (e.g., legal documents) are fresh after expiration. |
| proxy-revalidate | Like `must-revalidate`, but applies only to shared (proxy) caches. | Enforce revalidation for CDNs while allowing browser flexibility. |
| public | Indicates the response can be cached by any cache (browser or proxy). | Publicly accessible resources like homepage assets. |
| private | Restricts caching to private (browser) caches, not shared (proxy) caches. | User-specific data like personalized dashboards. |
| no-transform | Prohibits caches from modifying the response (e.g., compressing images). | Ensure media files or sensitive payloads remain unchanged. |
| immutable | Indicates the response body will not change during its freshness period. | Cache immutable assets like versioned JavaScript files indefinitely. |
| stale-while-revalidate | Allows serving stale content while revalidating in the background. Revalidation involves checking with the server (e.g., via `If-Modified-Since` or `If-None-Match`) to confirm if the cached response is still valid. | Improve performance for slightly outdated content, e.g., `stale-while-revalidate=60`. |
| stale-if-error | Allows serving stale content if the server returns an error (e.g., 500). | Provide fallback content during server outages, e.g., `stale-if-error=86400` |

### Example

```http
Cache-Control: public, max-age=3600, no-transform
```

- `public`: Cacheable by all caches.
- `max-age=3600`: Fresh for 1 hour.
- `no-transform`: No modifications allowed.

### Misc.

- Heuristic caching is when no caching header is set but the browser still caches based on a heuristic, liek 10% of the last modified date.
- `if-modified-since` is a date cache header that can be sent with the request, but since time zones make things difficult, so has been replaced with ETags instead, which is a hash based on the content. The cache bust the ETag the content needs be changed somehow, e.g. by renaming the name of a script href.