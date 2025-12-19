# Security

## Cross-Site Request Forgery  (CSRF)

1. <https://owasp.org/www-community/attacks/csrf>

CSRF is an attack that tricks the victim into submitting a malicious request. It inherits the identity and privileges of the victim to perform an undesired function on the victim’s behalf, hence the "forgery". Another site os forging your identity, like it has stolen you ID card. The forgery is typically achieved with cookies.

For most sites, browser requests automatically include any credentials associated with the site, such as the user’s session cookie, IP address, Windows domain credentials, and so forth. If the user is currently authenticated to the site, the site will have no way to distinguish between the forged request sent by the victim and a legitimate request sent by the victim.

CSRF attacks target functionality that causes a state change on the server, such as changing the victim’s email address or password, or purchasing something. Forcing the victim to retrieve data doesn’t benefit an attacker because the attacker doesn’t receive the response, the victim does. As such, CSRF attacks target state-changing requests.

For a contrived example, image on `www.evilwebsite.com` you click on a link to `www.yourbank.com/pay-evil-persion/1000000000` your session information is sent along and cause the bank's site to make a payment the to evil person with your banks authentication cookie. A normal <a href="..."> link that a user clicks causes the browser to perform an HTTP GET to the URL in href, so most CSRF attacks are with GET request. This doesn't mean accepting only POST requests is a solution, as malicious POST requests can be made with hidden forms. It does  mean we should ensure that GET requests don't have side effects--they should only return data.

CSRF attacks are also known by a number of other names, including XSRF, “Sea Surf”, Session Riding, Cross-Site Reference Forgery, and Hostile Linking.

Setting the same site propery, `SameSite=strict` limits the **site scope** for which the browser sends cookies.

## Cross-Site Scripting (XSS)

What is Cross-Site Scripting (XSS), and how do you prevent it in a React app displaying untrusted input (e.g., research notes)?

XSS is when "the call is coming from _inside_ the house." With cross-site scripting code has been injected into the application. With CSRF the attack is coming form the outside world. There are three types of XSS:

- Stored XSS
- Reflected XSS
- DOM-based XSS

XSS attacks are harder to create, but often worse than the CSRF attacks, because at the point the browser thinks it's you--same origin. To avoid XSS attacks sanitise inputs, not only form inputs but also URL segments/search params. Don't directly reflect those on the page. In most modern FE frameworks and templating languages you have to actively opt out of sanitisation, e.g. dangerouslySetInnerHTML, else use a library like DOM purify.

- Input sanitisation: validate and sanitise all user inputs
- Output encoding: escape UGC before rendering it in the browser
- Content Security Policy: use CSP headers/meta to restrict loading scripts, styles, images and other resources to trusted sources
- Use safe methods: avoid using functions the allow raw HTML input
- Leverage libs/frameworks that have built in protections

## Cross-Origin Resource Sharing (CORS)

1. (Cross-Origin Resource Sharing (CORS))[https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS]
2. ("Same-site" and "same-origin")[https://web.dev/articles/same-site-same-origin]

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

- PATCH, PUT, DELETE
- AJAX requests
- Requests with content type `application/json`

For these an options request is sent first to check if the request is allowed.

> The browser becomes your mom: "Wait. Before you go, WHERE are you going? Who’s going with you? When will you come back???”

### Same origin vs. cross origin

The origin of a URL is just three parts together: the scheme, the host, and the port (if non‑default). For a URL like `https://www.example.com:8080/path?x=1#hash`, the origin is:

- Scheme: `https`
- Host name: `www.example.com`
- Port: `8080` (or the default for that scheme, like 80 for http, 443 for https)

Two URLs have the same origin only if all three of these match: same scheme, same hostname, and same port (considering default ports). Examples:

- `https://example.com/app` and `https://example.com/api` → same origin  (only path differs)
- `http://example.com` and `https://example.com` → cross origin (scheme differs)
- `https://api.example.com` and `https://example.com` → cross origin (host differs)
- `https://www.example.com:443` and `https://login.example.com:443` → cross origin (subdomains differ)

Note that origin and site are slightly differ and can be confused. Origin is stricter and relavant for the same origin policy, site is relevant for cookie handling. Site is the combination of the scheme, the effective top-level domain plus a segment, and the port. Same sites have the same values for scheme, ETLD+1, and port, e.g.

- `https://example.com/app` and `https://example.com/api` → same site  (only path differs)
- `http://example.com` and `https://example.com` → cross site (scheme differs)
- `https://api.example.com` and `https://example.com` → same site (subdomain doesn't matter)
- `https://www.example.com:443` and `https://login.example.com:443` → cross origin (subdomains differ)

How to check if a request is "same-site", "same-origin", or "cross-site"? All modern browsers send requests with a Sec-Fetch-Site HTTP header. The header has one of the following values:

- cross-site
- same-site (refers to schemeful same-site)
- same-origin
- none

The value of the Sec-Fetch-Site header can be reasonably trusted, because HTTP headers starting with Sec- can't be modified by JavaScript and the browser always sets these headings.

## Notable events

1. <https://deepstrike.io/blog/most-common-web-vulnerabilities-2025>

### Shai-Hulud worm (1.0), 2025-09-15

1. <https://securitylabs.datadoghq.com/articles/shai-hulud-2.0-npm-worm/>
2. <https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem>
3. <https://www.getsafety.com/blog-posts/shai-hulud-npm-attack>

>  Linguistically, the term is commonly explained as deriving from Arabic شَيْء خُلُود (shayʾ khulūd), which translates to something like “thing of eternity”

On September 15, 2025, access to the maintainer account for [the `@crtl/tinycolor` package](https://www.npmjs.com/package/@ctrl/tinycolor) was gained.
The credentials may have been stolen in a prior harvesting attack, e.g. the "S1ngularity" or via a phishing campaign where an email is used to impersonate an npm registry staff member, for example. As far as Scott, the package maintainer, is aware though it wasn't a phishing attack.

> We don't know how the maintainer, Scott Cooper, was hacked, but Scott verified that he had been compromised and was working with NPM to fix it.

Using the stolen credentials, two malicious versions of the @ctrl/tinycolor package were published: 4.1.1 at UTC 2025-09-15 T19:52:46.624Z and 4.1.2 about 20 minutes later.
The patch version update contained a large payload, a ~3.6MB minified JavaScript, `bundle.js` , and a postinstall script update to execute it.

A short lesson on npm scripts: "pre" and "post" can be prepended to any npm scripts keys in the `package.json` file in order to run thme automatically whenever the "root" script is executed, e.g. "precompress" and "postcompress" executes before and after `npm run compress`, respectively.
In addition to these custom pre and post scripts, there are "special lifecycle scripts" that are run automatically for certain commands.
For example, behind the scenes `npm ci` and `npm install` actually run the following in order: preinstall, install, postinstall, prepublish, preprepare, postprepare.
Adding a postinstall script to `package.json` takes advantage of this implicit behaviour without your being aware of it.

So when clients automatically upgraded their dependency patch versions, bundle.js was exectuted on installation. On execution, bundle.js did three main things:

- credential harvesting
- credential exfiltration
- worm propagation

#### credential harvesting

> Wiz estimates that 73% of organizations using private GitHub Action Secrets repositories store cloud service provider (CSP) credentials within them. When PATs, which allow developers and automation bots to interact with GitHub repositories and workflows, are exploited, attackers can easily move laterally to CSP control planes.

The malware attempts to vaccuum all the secrets it can. It dumps the entire process.env, downloads the Trufflehog tool and scans the filesystem for secrets, tries to detect if it's executing within AWS or GCP and loads the appropriate SDK to steal credentials and data. Specifically targetting,

- GitHub personal access tokens (PATs),
- NPM authentication tokens,
- AWS access keys,
- Google Cloud Platform service credentials,
- Azure credentials, and
- Cloud metadata endpoints.

> This is a common technique that mature threat actors use when they land on a cloud server. They take the time to identify where there are, and then use things like the IMDS service to pivot deeper into the cloud environment.

#### credential exfiltration

With the PATs the malware found, a bash script embedded in the `bundle.js` then updates those repositories, creating a branch named `shai-hulud`. To this branch a GitHub Actions workflow file, `.github/workflows/shai-hulud-workflow.yml`, is committed.

#### worm propagation



> About 187 packages compromised during the shai-hulud attack

## Security practises to follow (with a bias for the FE)

- Logging and monitoring: Catching security issues when they happen can be a matter of noticing when there are sudden, unexpected spikes in activity (API hits, error rates, etc.) because production logs with sensible alerting is in place. Easier said than done. Also raises the question of what scale should you be when good logging practises are put in place? Should you already focus on this when you only have a handful of users?
- Efficient software delivery: If it takes only 20 minutes to push a change intro production, if any incident unfolds you will be able to respond quickly. So make it fast, and well documented.

### Securing the supply chain

Supply chain attacks are having a moment since early Fall 2025.

- Pin dependency versions: Pinning versions in package JSON by removing fuzzy version prefixes like ~, ^, and * leads to more explicit control of version upgrades, and the assurance that all environments are using the same version regardless of whether they run `npm install` or `npm ci`.
- Setup dependency upgrade automation and uuto update dependency versions _only_ after they’ve been published a week.
- Clean and prune project dependencies: remove unused packages and internalise others.
- Secure secrets: Setup secret detection and leak prevention, e.g. with TruffleHog. Attackers are using TruffleHog to find secrets, so find and secure them yourself first.

### Staying informed of vulnerabilities

- Read blogs
    - https://www.csoonline.com/news/
- Sign up for alerts
    - https://alerts.vulmon.com/register
    - https://www.cvedetails.com/documentation/alerts
- Audit exposure when incidents occur, e.g. search for organisation user names in affected GitHub logs
- SearchGithub usernames to

### Auditing continuously, regularly

- Form a security group with FE, BE, and Ops team members
- Be aware of what are our non-human identities are how are they being made available programmatically
