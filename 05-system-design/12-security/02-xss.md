# Security

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
