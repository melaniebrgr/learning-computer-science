# Magic cookies

## Week 14 project journaling

Cookies are small key-value stores that are sent along with every server request the browser makes (unless certain properties are enforced).
It began innocently enough in 1994 when the HTTP cookies was invented by a Netscape founding engineer (1).
It was invented to store user data--a shopping cart in this case--on the client instead of the server, so that the server could remain stateless.
It was OG Lofi, if your will.
In 1996 someone (Tim Jackson?) realised that cookies could be used to invade your privacy.
It makes you wonder what the internet world would have look like today if the cookie had never been invented.
An entirely different place.

### How are cookies created?

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

### How to scope cookies in space and time

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

Cookies can be **scoped in place** as well as **scoped in time** by using the "Expires" and "Max-age" properties to set cookie duration.
If these properties are set, the browser considers them as "permanent" cookies since they can persist past browser opening and closing.
If they aren't set, the cookie is deleted when the tab is closed.
This is called a "session" cookie.

There is additionally a inherent quantity and size scope aspects to a cookie: there can only be up to 300 at a time, and can only be 4 MB in size.

### TL;DR cookie property review

- Domain: which server can receive the cookie e.g. the current domain `.example.com` or a third-parties `.tiktok.com`.
- Path: what path the cookie is active for
- Expires: the cookie expiry date when it will be deleted
- Max-Age: the time in seconds after which a cookie will be deleted
- SameSite: send cookies only when on the same (strict) or permit cross-site (lax) or are a dead giveaway of being a third-party cookie (none)
- HttpOnly: cookie data can't be read on the client, e.g. by calling `document.cookie` in JS (They are still sent on eveery request however.)
- Secure: The cookie is only sent over HTTPS

### Types of cookies feat. third party cookies

Through combinations of the above properties you can build very different types of cookies for very different purposes: session or permanent cookies, private cookies, first-party cookies, third-party cookies, partitioned cookies.

The third party cookie is the one we've heard about the most recently.
It's when we install some scripts on our website from a--you guessed it--third party that creates a cookie intended for that third partie's domain, not for the current application domain.
For example, for `www.mywebsite.com` I implement a Google ad that creates a cookie for the domain `.google.com`.
To complete the example by contrast, a first party cookie is one I set myself for `www.mywebsite.com` with a domain `.mywebsite.com`.

### Why do we need cookie banners all the time?

Social media buttons. Google ads. Any innocuous piece of code that we web developpers willingly load on our applications because we want people to like, subscribe, tweet and ultimately make money, are slurping up your personal data.
When clicked, all your cookies ~~are belong to Google~~ are forwarded with the request, and any `.google.com` ones can be read by Google.
So now Meta and Google know what you've liked, subscribed and paid for and they can in turn t/sell others what ad to microtarget to you.
If you're curious what Google knows about you, head to (Google's ad center)[https://myadcenter.google.com/controls].
By law now however, when a website collects private information about you it can only do so with your consent.
The two regulations inforcing this are the General Data Privacy Regulation (GDRP) and ePrivacy Directive.

### What do we use cookies for in 2024?

What are the main uses of cookies in 2024 and what is their approximate distribution?

- Maintaining some application state, e.g. a game score or shopping cart
- Maintaining your authentication / identity status?
- Advertising?
- Tracking you around the internet?

Chrome is notoriously taking the lead on deprecating third-party cookies.
As of Q1 this year it "disabled third-party cookies" for 1% of Chrome users with the final pahse out planned for Q4.
But what does this mean

Privacy sandbox?
Partitioned cookie? First part sets or CHIPS?
Let's be realy though, Google already knows a ton about you because of what you've been googling.
If you really care about privacy, use a privacy-focussed search engine like DuckDuckGo.

References

1. (Lou Montulli)[https://en.wikipedia.org/wiki/Lou_Montulli]