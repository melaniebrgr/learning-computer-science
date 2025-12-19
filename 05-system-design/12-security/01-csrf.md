# Security

## Cross-Site Request Forgery  (CSRF)

1. <https://owasp.org/www-community/attacks/csrf>

CSRF is an attack that tricks the victim into submitting a malicious request. It inherits the identity and privileges of the victim to perform an undesired function on the victim’s behalf, hence the "forgery". Another site os forging your identity, like it has stolen you ID card. The forgery is typically achieved with cookies.

For most sites, browser requests automatically include any credentials associated with the site, such as the user’s session cookie, IP address, Windows domain credentials, and so forth. If the user is currently authenticated to the site, the site will have no way to distinguish between the forged request sent by the victim and a legitimate request sent by the victim.

CSRF attacks target functionality that causes a state change on the server, such as changing the victim’s email address or password, or purchasing something. Forcing the victim to retrieve data doesn’t benefit an attacker because the attacker doesn’t receive the response, the victim does. As such, CSRF attacks target state-changing requests.

For a contrived example, image on `www.evilwebsite.com` you click on a link to `www.yourbank.com/pay-evil-persion/1000000000` your session information is sent along and cause the bank's site to make a payment the to evil person with your banks authentication cookie. A normal <a href="..."> link that a user clicks causes the browser to perform an HTTP GET to the URL in href, so most CSRF attacks are with GET request. This doesn't mean accepting only POST requests is a solution, as malicious POST requests can be made with hidden forms. It does  mean we should ensure that GET requests don't have side effects--they should only return data.

CSRF attacks are also known by a number of other names, including XSRF, “Sea Surf”, Session Riding, Cross-Site Reference Forgery, and Hostile Linking.

Setting the same site propery, `SameSite=strict` limits the **site scope** for which the browser sends cookies.