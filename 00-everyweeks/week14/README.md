# Cookies: a snack break from Rust

## Week 14 project journaling

### What are cookies: a historical perspective

Cookies are small key-value stores that are sent to the server on every subsequent request.

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

The domain property specifies the server that a cookie is sent to.
The path property specifies the path that must exist in the URL for the cookie to be sent.
Together, the domain and property define the cookie scope.

```HTTP
Set-Cookie: chip=chocolate; Domain=mozilla.org; Path=/docs;
```

By default, the domain of the cookie created is the full, current website domain, i.e. the subdomain, domain and top-level domain.
A cookie created for `www.example.com` will not be available on `example.com`.
However, we can specify that a cookie be created so that it is available on all subdomains by setting the cookie domain, `domain=.example.com`.
(Too bad the syntax isn't `domain=*.example.com`, that would be more explicit, in my opinion.)

Cookies can be scoped in "location" as well as in time with the "Expires" and "Max-age" properties.
If these properties are set, the browser considers them as "permanent" cookies since they can persist past browser opening and closing.
If they aren't set, the cookie is deleted by default if that tab is closed.
This is called a "session" cookie.

### Property overview

- Domain: which server can receive the cookie e.g. the current domain `.example.com` or a third-parties `.tiktok.com`.
- Path: what path the cookie is active for
- Expires: the cookie expiry date when it will be deleted
- Max-age: the time in seconds after which a cookie will be deleted

### What should we use cookies for in 2024?

## References

- [HTTP Cookies Crash Course](https://www.youtube.com/watch?v=sovAIX4doOE)
- [HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
