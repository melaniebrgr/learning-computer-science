# Consenting to magic cookies

## Week 14 project journaling

It all began innocently enough in 1994 when now World Wide Web Hall of Famer, Lou Montulli, added the cookie to the Netscape browser (1, 2). It was not a new idea technically, magic cookies were already being used for communicating programs, it was just new to web. The problem Lou was reputedly solving at the time was how to store user data--a shopping cart in this case--_not_ on the server. So he implemented a cookie, a small key-value store that hitches a ride along with every browser request to a server.

It was OG [local-first apps](https://localfirstweb.dev//), if you will, where your data persists on your machine and server remains stateless. It took about two years until someone realised that cookies could be used to invade your privacy. What would the internet would look like today if the HTTP cookie had never been invented? We can only imagine...

### How are cookies created?

Cookies can be created on the client with javascript,

```js
document.cookie = "chip=chocolate"
```

and they can be created on the server using a `Set-Cookie` header,

```HTTP
Set-Cookie: week14.2=cookie-set-by-server-home-page;
```

On receiving a server response with the set-cookie header, the client browser sets the cookie, and then the client browser sends it with every subsequent request.

### How to scope cookies in space and time

Cookies can be scoped by

- site (same or cross),
- domain,
- path, and
- duration

As mentioned before, when following a link on a page all pertinent cookies are sent along to the destination site, a behaviour could be taken advantage of. On a malicious site if you click a malicious link your cookies can be leveraged to take a malicious action. For a contrived example, on `www.evilwebsite.com` you click on a link to `www.yourbank.com/pay-evil-persion/1000000000` and the cross-site (your bank) executes a payment the to evil person with your banks authentication cookie. This is known as cross-site request forgery or CSRF. Setting the same site propery, `SameSite=strict` limits the **site scope** for which the browser sends cookies.

The **domain scope** is configured property. The domain specifies the server that a cookie is sent to. A cookie created for `www.example.com` will not be available on `example.com`. However, we can specify that the cookie be available on all subdomains with `domain=.example.com`. (A shame the syntax isn't `domain=*.example.com`, which would be more explicit, in my opinion.) The **path** property specifies the path that must exist in the URL for the cookie to be sent.

```HTTP
Set-Cookie: chip=chocolate; Domain=mozilla.org; Path=/docs;
```

Cookies can be scoped in time as well by using the "Expires" and "Max-age" properties to set cookie **duration**. If these properties are set, the browser considers them permanent cookies since they can persist past browser opening and closing. If they aren't set, the cookie is deleted when the tab is closed. This is called a session cookie.

There is additionally a built in quantity and size scope limitation to cookies: there can only be up to 300 at a time, and they can be up to only 4 MB in size. (This is quite a lot to forward on every request though, come to think of it.)

### TL;DR cookie property review

- Domain: The server can receive the cookie e.g. the current domain `.example.com` or a third-parties `.tiktok.com`. The defaul value is the current domain.
- Path: The path the cookie is active on. The default value is the root.
- Expires: the cookie expiry date when it will be deleted
- Max-Age: the time in seconds after which a cookie will be deleted
- SameSite: send cookies only when on the same (strict) or permit cross-site (lax) or are a dead giveaway of being a third-party cookie (none)
- HttpOnly: cookie data can't be read on the client, e.g. by calling `document.cookie` in JS (They are still sent on eveery request however.)
- Secure: The cookie is only sent over HTTPS

### Demo time

Here is an example of a simple Node server that returns some HTML and sets and parses cookies:

```js
import { createServer } from 'node:http';
import cookie from 'cookie';

const home = (_, res) => {
    res.writeHead(200, { 
      'Content-Type': 'text/html',
      'Set-Cookie': [
        'week14.2=cookie-set-by-server-home-page;',
        'week14.3=everything-cookie; HttpOnly; SameSite=Strict; path=/; Domain=127.0.0.1; Max-Age=5; Secure;',
      ]
    });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Week 14: Cookies</title>
        <script>
          document.cookie = 'week14.1=cookie-set-by-client';
        </script>
      </head>
      <body>
        <h1>Week 14: Magic Cookies</h1>
        <a href="/about">about</a>
      </body>
      </html>
    `);
};

const about = (_, res) => {
  res.writeHead(200, { 
    'Content-Type': 'text/plain',
    'Set-Cookie': 'week14.4=cookie-set-by-server-about-page; path=/about;'
  });
  res.end('About page');
}

const server = createServer((req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log(req.url, cookies);
  
  switch (req.url) {
    case '/':
      home(req, res);
      break;
    case '/about':
      about(req, res);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

```

The following cookies are set and sent by the browser:

```zsh
# On starting the server
Listening on 127.0.0.1:3000

# on loading the home page:
## Cookies set in browser: cookie-set-by-client, cookie-set-by-server-home-page, everything-cookie
## Cookies received by server:
{}

# on clicking about page link:
## Cookies set in browser: cookie-set-by-client, cookie-set-by-server-home-page, cookie-set-by-server-about-page
## Cookies received by server:
{
  'week14.1': 'cookie-set-by-client'
  'week14.2': 'cookie-set-by-server-home-page',
}

# on clicking back button:
## Cookies set in browser: cookie-set-by-client, cookie-set-by-server-home-page, everything-cookie, cookie-set-by-server-about-page
## Cookies received by server:
{
  'week14.1': 'cookie-set-by-client'
  'week14.2': 'cookie-set-by-server-home-page',
}

# on clicking about page link again:
## Cookies set in browser: cookie-set-by-client, cookie-set-by-server-home-page, cookie-set-by-server-about-page
## Cookies received by server:
{
  'week14.1': 'cookie-set-by-client'
  'week14.2': 'cookie-set-by-server-home-page',
  'week14.4': 'cookie-set-by-server-about-page',
}

```

In summary, cookies were first set, then sent on every _subsequent_ requests to the server _only if_ it was permitted by cookie's property settings. For example the secure cookie was never sent, and the cookie set for the `/about` path was only sent when navigating to that path path for the second time.

### Types of cookies feat. third party cookies

Through the combinations of cookie properties mentioned previously you can build very different types of cookies for very different purposes: session or permanent cookies, private cookies, first-party cookies, third-party cookies, partitioned cookies.

The third party cookie is the one we've heard about the most recently. It's when we install some scripts on our website from--you guessed it--a third party that creates a cookie intended for that third partie's domain and not for the current application domain. For example, for `www.mywebsite.com` I implement a Google ad that creates a cookie for the domain `.google.com`. This Google cookie is a third-party cookie on my websit. To complete the example by contrast, a first party cookie is one that I set myself for `www.mywebsite.com` with a domain `.mywebsite.com`.

### Why do we need cookie consent banners all the time?

Social media buttons. Google ads. Any innocuous piece of code that we web developpers willingly load on our applications because we want people to like, subscribe, tweet and ultimately pay us money, are setting third-party cookies to slurp up your personal data. When clicked, all your `.google.com` domain cookies are belong to Google or Meta or Twitter and so forth. So now Meta knows what you've liked, Google knows what you've subscribed and ad you've clicked, and they can in turn t/sell others what ad is best to microtarget you with. If you're curious what Google knows about you, head to [Google's ad center](https://myadcenter.google.com/controls). By law now though, when a website collects private information about you it can only do so with your consent. The two regulations inforcing this are the General Data Privacy Regulation (GDRP) and ePrivacy Directive, which at least now requires us to get your consent about the cookies used on the website.

### What do we use cookies for in 2024?

The three main uses of cookies are

1. State management e.g. a game score, shopping cart, or user settings
2. Session management or maintaining authentication / identity status
3. Ad targeting, though I assue this will fade away as third-party cookie "end"

Chrome has recently been quite noisy about deprecating third-party cookies, as if they should be credited with this privacy oriented initiate, when in fact Safari and Firefox have been blocking third-party cookies since 2017/9. As of Q1 this year Google has disabled third-party cookies in 1% of Chrome users with the final phase out planned for the end of the year. But what does this mean for us web developers? If our website have been working fine in Safari and Firefox all this time, then probably nothing. They'll likely continue to work in Chrome. For companies with multiple domains though Chrome is implementing some new features for cookies to help this more legitimate third-party cookie usage. If you've come across the terms privacy sandbox, partitioned cookie, first party sets or CHIPS, that's what's going on.

To be frank though, Google already knows a lot about you and will continue to because of what you're googling. If you really care about privacy, then use a privacy-focussed search engine like DuckDuckGo.

## References

1. [Lou Montulli](https://en.wikipedia.org/wiki/Lou_Montulli)
2. [World Wide Web Hall of Fame Inductees](https://en.wikipedia.org/wiki/First_International_Conference_on_the_World-Wide_Web#World_Wide_Web_Hall_of_Fame_Inductees)