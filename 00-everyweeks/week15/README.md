# INP is not a Meyer's Briggs personality type

## Week 15 project journaling

I'm making a slow website and as a front-end developer, _it's all my fault_.

I am not

- loading only a small amount of CSS first
- loading only a small amount of JS _after_ the main content
- optimising images
- defining and HTTP cache policy
- using a service worker

These are most elementary things that I am currently not doing for web performance.
And I am still underesitmating and not prioritising mobile web.

The levers of web performance: bandwidth, network speed, hardware speeds (CPU, GPU).
Web performance metrics have been around for a while, probably the earliesd being page load time

- Page load is fired by the browser when it has nothign left to do all files, images, content below the fold is ready which is not an important metric for the user because the page is usuable beofre the page is fully loaded. Generally we want to use DOMContentLoaded instead of the onLoad event.
- Time to first byte (TTFB)
- First paint

These are more browser centric measures of web performance.
The user centric measures of web performance:

user feel like the website is loaded when the images load.
Average latency for 5G network in Canada is 50ms and increases for 4G, 3G and so on. For DSL is 12ms.

- First interactive / time to interactive = the main thread has been release for a couple milliseconds
- Speed index calculate by taking screenshots of the website over time and calcuting the percentage of the file render. The area above the curve, the worse the better. The point is you want to render the bulk of the page sooner.
- Time to interactive
- Largest contentful paint (LCP) the largest contentful element was painted, it can be anything that is content (text, images).
- Any custrom metric specific to our website. e.g. time to first tweet

Core Web Vitals were introduced by Google who added them to the search console in 2020 (1) as benchmarks for the web developer community to aim for.
Core Web Vitals are meant to evoke health.
These are the vital signs of your application.
There are other metrics but these are the core ones.
They take the pulse of your website so you know wether only need to monitor or roll your website on a gurney straight into intensive care.
Once you have a diagnosis then your can work on a treatment plan toward a cure.
Now there are 3:

- **Largest contentful paint** (LCP) is performance oriented measure
- **Cumulative layour shift** less about performance and more of a user experience quality
- **Interaction to next paint** (INP) performance oriented measure ("Intent of INP is to measure user experience." ... huh?)

March 12, 2024 was Interaction to Next Paint's (INP) first birthday.
It replaced First Input Delay (FID).
Google says it's "not a ranking signal or factor" but might be a lie. It might be a slight one.
"We highly recommend site owners achieve good Core Web Vitals for success with Search ... but good stats don't guarantee good rankings."
CWVs are good metrics that can be generally used across all websites, but you should "Know your site, know your users" and ensure you what is being measured is important for your users.
For example, instead of largest contentful paint, maybe you should measure time to shopping card button paint.

Understand your data: a paired down version of the website might lead to apparently poorer performance but only because users with even lower end devices are not _capable_ of using your website (3).

### How to measure CWVs

Google Search Console tends to have a broader range of users.

### Stupid questions

- Why is INP useful?
- Can it be gamed?
- Does Google use it to rank pages?

### Office ideas

- 2G Tuesdays

