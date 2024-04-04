# Cookies: a snack break from Rust

## Week 14 project journaling

### What are cookies: a historical perspective

Cookies are small key-value stores that are sent to the server on every subsequent request regardless of who set them and where. Unless certain properties are enforced.

### Creating cookies

Cookies can be created on the client with javascript:

```js
document.cookie = "chip=chocolate"
```

By default, cookies created with JS will have the current domain and path.
Cookies can be created on the server with the `Set-Cookie` header:

```js (Node)
request.setHeader('Cookie', ['chip=chocolate']); // Set-Cookie: chip=chocolate
```

The server instructs the client browser to set a cookie with the Set-Cookie header.
On receiving the server response with the set-cookie header, the browser sets the cookie.
Then with every subsequent request the server makes, this cookie is sent.

### Scoping cookies

Cookies can be scoped

- by same or cross-domain
- by domain
- by path
- by duration

When following a link on a page the full cookie jar is sent along to the destination site by default. This lax behaviour could be taken advantage of. On a malicious site if you click a malicious link all your cookies (that might contain credentials and session info) get passed along by default, which could be taken advantage of to take a malicious action. For example, on `www.evilwebsite.com` you click on a link to `www.yourbank.com/pay-evil-persion/1000000000` and the cross-site (your bank) thinks it is you (paying the evil person) due to the cookies it receives, that had been set on a previous session with your bank. This is known as cross-site request forgery or CSRF. Setting the same site propery, `SameSite=strict` can limit the domain scope for which the browser sends cookies.

The domain property specifies the server that a cookie is sent to.
By default, the domain of the cookie created is the full, current website domain, i.e. the subdomain, domain and top-level domain.
A cookie created for `www.example.com` will not be available on `example.com`.
However, we can specify that a cookie be created so that it is available on all subdomains, `domain=.example.com`.
(Too bad the syntax isn't `domain=*.example.com`, that would be more explicit, in my opinion.)
The path property specifies the path that must exist in the URL for the cookie to be sent.

```HTTP
Set-Cookie: chip=chocolate; Domain=mozilla.org; Path=/docs;
```

Cookies can be **"scoped in place"** as well as **scoped in time** by using the "Expires" and "Max-age" properties to set cookie duration.
If these properties are set, the browser considers them as "permanent" cookies since they can persist past browser opening and closing.
If they aren't set, the cookie is deleted when the tab is closed.
This is called a "session" cookie.

### Cookie property review

- Domain: which server can receive the cookie e.g. the current domain `.example.com` or a third-parties `.tiktok.com`.
- Path: what path the cookie is active for
- Expires: the cookie expiry date when it will be deleted
- Max-Age: the time in seconds after which a cookie will be deleted
- SameSite: send cookies only on the same or site or also cross-site

### What should we use cookies for in 2024?

### WHat if the cookie had never been invented? What would a cookie-less world look like?
