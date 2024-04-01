# Cookies: a snack break from Rust

## Week 14 project journaling

### What are cookies: a historical perspective

Cookies are key-value stores with some extra metadata.
Cookies are sent to the server on every request.

### Creating cookies

Create a cookie on the client with `document.cookie`.

```js
document.cookie = "chip=chocolate"
```

Implicitely the cookie will have a domain of ___and a path of___.

Create a cookie on the server with the `set-cookie` header.
The server can instruct the client browser to set a cookie with the set-cookie header.
The browser sets the cookie on receiving the server response with the set-cookie header.
Then with every subsequent request the server makes, this cookie is sent.

Cookies can be scoped in two ways: domain and path
By default, the domain of the cookie created is the full, current website domain, i.e. the subdomain, domain and top-level domain.
A cookie created for `www.example.com` will not be available on `example.com`.
However, we can specify that a cookie be created so that it is available on all subdomains by setting the cookie domain, `domain=.example.com`.
(Too bad the syntax isn't `domain=*.example.com`, that would be more explicit, in my opinion.)

Cookie properties

- domain: specify the domain the cookie is set to and available on
- path: specify the path the cookie is set to and available on

### What should we use cookies for in 2024?
