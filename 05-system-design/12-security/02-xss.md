# Security

## Remote code execution (RCE)

- RCE means the attacker can run arbitrary code on a backend system such as a server, container, or build worker (for example, the Mintlify Next.js SSR environment in the blog).
- That code usually has access to server resources: environment variables, files, internal networks, service tokens, and can often pivot further inside the infrastructure.

## Cross-Site Scripting (XSS)

What is Cross-Site Scripting (XSS), and how do you prevent it in a React app displaying untrusted input (e.g., research notes)?

- XSS means the attacker can run arbitrary script in a victim’s **browser** within the context of a specific website or origin (for example, poisoned docs pages serving attacker‑controlled JS to users).
- The malicious script can access things available to that page in the browser: DOM, cookies (if not `HttpOnly`), localStorage, and can perform actions as the logged‑in user, but it cannot directly read server files or environment variables.

> XSS is when "the call is coming from _inside_ the house." 

With cross-site scripting code has been injected into the application. With CSRF the attack is coming form the outside world. There are three types of XSS:

- Stored XSS
- Reflected XSS
- DOM-based XSS

XSS attacks are harder to create, but often worse than the CSRF attacks, because at the point the browser thinks it's you--same origin. To avoid XSS attacks sanitise inputs, not only form inputs but also URL segments/search params. Don't directly reflect those on the page. In most modern FE frameworks and templating languages you have to actively opt out of sanitisation, e.g. dangerouslySetInnerHTML, else use a library like DOM purify.

- Input sanitisation: validate and sanitise all user inputs
- Output encoding: escape UGC before rendering it in the browser
- Content Security Policy: use CSP headers/meta to restrict loading scripts, styles, images and other resources to trusted sources
- Use safe methods: avoid using functions the allow raw HTML input
- Leverage libs/frameworks that have built in protections

## RCE vs. XSS

RCE and XSS are both code‑execution bugs, but they differ mainly in *where* the code runs and *what* it can touch.

|  | RCE  | XSS |
|-|-|-|
| Where code runs   | On the **server** or backend system. | In the **user’s browser** in that site’s origin. |
| Typical impact    | Read files, steal secrets, pivot in infra, supply‑chain attacks. | Steal session tokens, perform actions as user, deface pages. |
| Who is targeted   | Infrastructure/apps as a whole; many users indirectly. | Individual users who load the malicious page/link. |
| Example | MDX `eval` on SSR giving access to `process.env` and filesystem. | Poisoned Next.js cache serving attacker SVG/JS to docs users.

