# Security

## Cross-Site Scripting (XSS)

What is Cross-Site Scripting (XSS), and how do you prevent it in a React app displaying untrusted input (e.g., research notes)?

XSS is when "the call is coming from _inside_ the house." With cross-site scripting code has been injected into the application while CSRF the attack is coming form the outside world. There are three types of XSS:

- Stored XSS
- Reflected XSS
- DOM-based XSS

XSS attacks are harder to create, but often worse than the CSRF attacks, because at the point the browser thinks it's you--same origin. To avoid XSS attacks sanitise inputs, not only form inputs but also URL segments/search params. Don't directly reflects those on the page. In most modern FE frameworks and templating languages you have to actively opt out of sanitisation, e.g. dangerouslySetInnerHTML, else use a library like DOM purify.

- Input sanitisation: validate and sanitise all user inputs
- Output encoding: escape UGC before rendering it in the browser
- Content Security Policy: use CSP headers/meta to restrict loading scripts, styles, images and other resources to trusted sources
- Use safe methods: avoid using functions the allow raw HTML input
- Leverage libs/frameworks that have built in protections

## Cross-Origin Resource Sharing (CORS)

**CORS is designed to prevent malicious website from accessing resources on another domain without permission.** "The call is coming from outside the house." It's an HTTP request that you didn't want to come in. The Same-Origin Policy (SoP) and CORS are the two main mechanisms built into browsers that enforce this policy. This complement of Origin and Access-Control-Allow-Origin headers is the simplest use of the access control protocol.

**By default, the browser "same-origin policy" or SoP blocks websites from making requests to a domain other than the one that served the page.** CORS or "Cross-Origin Resource Sharing" provides a way for servers to tell browsers, via HTTP headers, that it’s okay to share resources cross-origin. Servers do this by including,

- an `Access-Control-Allow-Origin` header specifying to the browser that that domain is allowed (or `*` wildcard) to access their resources,
- what methods are allowed with `Access-Control-Allow-Methods`, and
- what HTTP headers are allowed when making the request, `Access-Control-Allow-Headers`,
- if cookies and authorisation headers are allowed with `Access-Control-Allow-Credentials`.

Note, the server doesn't respond with a list of allowed domains just if that one is. The server opt-ins to requests by responding to a preflight requests. Effectively this is a way to whitelist origins. (Note, an "origin" is not the URL, it is the scheme, domain and port).

What requests _are NOT_ subject to CORS?

"Simple requests" like GET and HEAD requestions, and POST requests with content type `application/x-www-form-urlencoded`, `multipart/form-data` (which is not AJAX), and `text/plain` a.k.a form submissions (because CORS can after forms and we can't break the web), which is why we have to worry about CSRF and why nonces are a thing for forms.

What requests _are_ subject to CORS?

- PATCH, PUT, DELETE(?)
- AJAX requests
- Requests with content type `application/json`

For these an options request is sent first to check if the request is allowed.

> The browser becomes your mom: "Wait. Before you go, WHERE are you going? Who’s going with you? When will you come back???”

## Same origin vs. cross origin

The origin of a URL is just three parts together: the scheme, the host, and the port (if non‑default). For a URL like `https://example.com:8080/path?x=1#hash`, the origin is:

- Scheme: `https`
- Host: `example.com`
- Port: `8080` (or the default for that scheme, like 80 for http, 443 for https)

Two URLs have the same origin only if all three of these match: same scheme, same host (the hostname is the full domain name, including both the subdomain and the top‑level domain), and same port (considering default ports).

Examples:

- `https://example.com/app` and `https://example.com/api` → same origin (only path differs)
- `http://example.com` and `https://example.com` → different origins (scheme differs)
- `https://api.example.com` and `https://example.com` → different origins (host differs)

### References

1. (Cross-Origin Resource Sharing (CORS))[https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS]
2. ("Same-site" and "same-origin")[https://web.dev/articles/same-site-same-origin]