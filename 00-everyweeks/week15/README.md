# INP is not a Meyer's Briggs personality type

## Week 15 project journaling

As a front-end developer I can make the biggest difference in my website's performance by

- reducing the amound of times JS loading blocks parsing
- reducing he amound of time CSS blocks rendering
- reducing image size
- defining an HTTP cache policy

These are most elementary things that I am currently not even thinking about as go about by day to day feature development grind.
Making changes on the FE is cheap, fast and has a high impact.
And I am still underesitmating and not prioritising mobile web.

Web performance metrics have been around for a while, probably the earliest being page load time.
There have been a lot of different metric overs the yeas
Some web performance measures are more browser centric, and some more user centric measures.
Initial browser centric measures predominated since they were easier to measure and understand, but over time with the realisation that user's perception of webspage speed matters more than hard metrics, the measures that we use have trended to being more user focussed.
For example, surveys have shown that a user feel like the website is loaded when the images load.

- Time to first byte (TTFB) the browser receives the first byte of response
- First paint the browser has painted something, even a line
- Page load is fired by the browser when it has nothing left to do all files, images, content below the fold is ready which is not an important metric for the user because the page is usuable beofre the page is fully loaded. Generally we want to use DOMContentLoaded instead of the onLoad event. Popular in the 90's and early 2000's.
- First interactive / time to interactive is when the main thread has been release for a couple milliseconds
- Speed index calculate by taking screenshots of the website over time and calcuting the percentage of the file render. The area above the curve, the worse the better. The point is you want to render the bulk of the page sooner.
- Largest contentful paint (LCP) the largest contentful element was painted, it can be anything that is content (text, images).
- Any custrom metric specific to our website. e.g. time to first tweet
- Content layour shift
- Largest contentful paint
- Time to interactive
- First input delay (FID)

The Core Web Vitals were introduced by Google who added them to the search console in 2020 (1) as benchmarks for the web developer community to aim for.
Core Web Vitals are meant to evoke health.
These are the vital signs of your application.
There are other metrics but these are the core ones.
They take the pulse of your website so you know wether only need to monitor or roll your website on a gurney straight into intensive care.
Once you have a diagnosis then your can work on a treatment plan toward a cure.
Now there are 3:

- **Largest contentful paint** (LCP) is an indicator of how long it takes for the main content to appear.
- **Cumulative layout shift** (CLS) is an indicator of visual stability much more aligned with user experience than the other two metrics.
- **Interaction to next paint** (INP) an indicator of web page "snappiness". INP is a performance oriented measure that is intended to do a better job as an indicator of user experience than FID. It captures the delay in response to all clicking, tapping or key pressing due to blocking of the main thread, and then take's as the metric the worst one. All the delays in a user's a session are noted and the worst one is sent on the conclusion of the session. A good value is less than 200 ms.

March 12, 2024 was Interaction to Next Paint's (INP) first birthday.
It replaced First Input Delay (FID).

While Google says these CWVs are "not a ranking signal or factor" it might be a lie and might be a slight one.
"We highly recommend site owners achieve good Core Web Vitals for success with Search ... but good stats don't guarantee good rankings." (4)

### How to measure CWVs

CWVs are good metrics that can be generally used across all websites, but you should "Know your site, know your users" and ensure you what is being measured is important for your users.
For example, instead of largest contentful paint, maybe you should measure time to shopping card button paint.

Understand your data: a paired down version of the website might lead to apparently poorer performance but only because users with even lower end devices are not _capable_ of using your website (3).
Start with the CWVs then define your own as you know better what is important to our users.

Google Search Console tends to have a broader range of users.
Measure with real user data.
Apply techniques and measure again.

- Chrome UX report: real users not a lab analysis
- PageSpeed insights: real users not a lab analysis
- Google Lighthouse is a lab analysis and initially a chrome extension for PWAs, now also a DevTool and CLI and general performance analysis tool that can create different report. Why Lighthouse? It's supposed to guide web developers. Lighthouse gives us a score intended to guide in the right direction. It is not a metric.
- Performance tab in Chrome DevTools: configuration options, hit record and refresh page.
- WebPageTest.org results for one device, for that moment, for one point in the world

Film strip view showing all metrics overlayed on a page load

### A website comparison

## References

- [x] 1. [Introducing INP to Core Web Vitals](https://developers.google.com/search/blog/2023/05/introducing-inp)
- [x] 2. [Shift from FID to INP: Mastering the New Core Web Vitals Metric](https://www.youtube.com/watch?v=qWXGBGhEZ0w)
- [x] 3. [Deciphering INP and Core Web Vitals](https://www.youtube.com/watch?v=QdcKuo-N3kU)
- [ ] 4. [Understanding Core Web Vitals and Google search results](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [x] 6. [Web App performance](https://frontendmasters.com/courses/web-app-performance)
  - [x] Introduction
  - [x] Metrics & tools
  - [x] Basic optimisations