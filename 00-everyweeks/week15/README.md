# INP is not a Meyers-Briggs personality type

## Week 15 project journaling on web performance metrics

### With great power as a front-end developer, came an abrogation of responsibility

Front-end (FE) developers can _make the most important contribution_ to website performance. Making changes on the FE is cheap, fast compared to the backend. We can

- reduce the amount of time JavaScript loading blocks parsing,
- reduce the amound of time CSS blocks rendering,
- reduce image size,
- help define an HTTP cache policy, and
- tell BE developers when the server response is too slow because TTFB tanked. Aha.

These are the elementary things that I am _not even thinking about_ at the moment as go about by day to day feature development grind. I am also still effectively prioritising desktop web over mobile web by dint of the fact that I my dev env optimises in the fast refresh loop between my code and hot-module reload in full-screen Chrome tab in a second monitor.

### What can we measure in order to manage web performance?

Web performance metrics have been around for a while, probably the earliest being page load time.
There have been a lot of different metric overs the yeas
Some web performance measures are more browser centric, and some more user centric measures.
Initial browser centric measures predominated since they were easier to measure and understand, but over time with the realisation that user's perception of webspage speed matters more than hard metrics, the measures that we use have trended to being more user focussed.
For example, surveys have shown that a user feel like the website is loaded when the images load.

- Page load is fired by the browser when it has nothing left to do all files, images, content below the fold is ready which is not an important metric for the user because the page is usuable beofre the page is fully loaded. Generally we want to use DOMContentLoaded instead of the onLoad event. Popular in the 90's and early 2000's.
- Time to first byte (TTFB) the browser receives the first byte of response
- Time to first paint the browser has painted something, even a line
- First interactive / time to interactive is when the main thread has been release for a couple milliseconds
- First input delay (FID)
- Speed index calculate by taking screenshots of the website over time and calcuting the percentage of the file render. The area above the curve, the worse the better. The point is you want to render the bulk of the page sooner.
- Any custrom metric specific to our website. e.g. time to first tweet

### A benevolant dictator for web performance metrics

The Core Web Vitals were introduced by Google in 2020 (1) as benchmarks for the web developer community to aim for.
 **Core Web Vitals** are meant to evoke health, i.e. these are the vital signs of your application.
You are take the pulse of your website in order to know whether to send the website straight to emergency, or if it only needs out-patient care and follow-up monitoring.

There are 3 _core_ web vitals:

- **Largest Contentful Paint** (LCP) is an indicator of how long it takes for the main _content_ to appear, such as text, an image or a video frame. It is the time from when the web page starts loading and the largest text, image or video frame finishes rendering. A good measure is less that 2.5 s. LCP is the hardest metric to pass. Could be because there are four metric subparts to optimise: TTFB, resource load delay, resource load, time, render delay. Depending on the largest content, the submetric part can matter more or less.
- **Interaction to Next Paint** (INP) an indicator of web page "snappiness". INP is a performance oriented measure that is intended to do a better job as an indicator of user experience than FID. It captures the delay in response to all clicking, tapping or key pressing due to blocking of the main thread, and then take's as the metric the worst one. All the delays in a user's a session are noted and the worst one is sent on the conclusion of the session. A good value is less than 200 ms. March 12, 2024 was Interaction to Next Paint's (INP) first birthday. (It replaced First Input Delay or FID).
- **Cumulative Layout Shift** (CLS) is an indicator of visual stability much more aligned with user experience than the other two metrics. It is the amount of the largest layout shift "burst" of a user's session. The layout shift is calculated from the size of the shift and how far it shifted, `layout shift score = impact fraction * distance fraction`. The largest possible layout shift score is 1: the element(s) shift impacted 100% of the screen, and the elements changed position by 100%. A good CLS score is less than 0.1.

### Measuring CWVs so they can be managed

While Google says CWVs are "not a ranking signal or factor" it might be a lie albeit a slight one. From their docs: "We highly recommend site owners achieve good Core Web Vitals for success with Search ... but good stats don't guarantee good rankings" (4).

Regardless of search page ranking implication, CWVs are pretty well thought through metrics that can be used across pretty much all websites. They are a great starting point, but you should still "know your site, know your users" and make sure you what is being measured is in fact important for your users.

Here is a list of tools for measuring CWVs and beyond:

- **Google Search Console** offers real-user data from a broad range of users.
- **Chrome UX report (CrUX)** also provides real-user monitoring not a lab analysis.
- **PageSpeed insights** a different flavour of real-user data.
- **Google Lighthouse** is a lab performance analysis tool that can create different report. The name "Lighthouse" is meant to evoke the sentiment that it is a guide for web developers, i.e. Lighthouse score should guide in the right direction. Once a problem is identified with real user data the Lighthouse DevTools can be useful for testing solutions.
- The **Performance tab** in Chrome DevTools is also convenient for testing solutions. Configuration the options you need and hit record.
- **WebPageTest.org** uses real data but are results are for one device at that moment in time at that point in the world.

### For fun, a comparison of some of our EdTech competitors

#### CrUX report

| Origin | LCP | INP (ms) | CLS |
| --- | --- | --- | --- |
| https://knowunity.com | 🟠 2.6  | 🟢 175  | 🟢 0.05 |
| https://quizlet.com |  🟢 2.2 | 🟠 250  | 🟢 0 |
| https://www.studydrive.net | 🟢 2.1 | 🟢 125 | 🔴 0.6 |
| https://www.gostudent.org |  🟠 3.0 | 🟠 200  | 🟢 0 |
| https://www.coursehero.com | 🟠 3.3 | 🟠 225 | 🟢 0 |
| https://www.studocu.com | 🟠 3.3 | 🟠 275 | 🟢 0 |

##### Legend

- **LCP:** <2.5s is good 🟢, between \>2.5s and <4s needs improvement 🟠, and \>4s is poor 🔴
- **INP:** <200ms is good 🟢, between \>200ms and <500ms needs improvement 🟠, and \>500ms is poor 🔴
- **CLS:** <0.1 is good 🟢, between \>0.1 and <0.25 needs improvement 🟠, and \>0.25 is poor 🔴

#### PageSpeed Insights

| Origin | Mobile CWVs | Mobile perf. | Desktop CWVs | Desktop perf. |
| --- | --- | --- | --- | --- |
| https://knowunity.com | 🔴 Fail | 🔴 30 | 🔴 Fail | 🟠 56 |
| https://quizlet.com | 🔴 Fail | 🔴 26  | 🔴 Fail | 🔴 48 |
| https://www.studydrive.net | 🔴 Fail | 🔴 20 | 🔴 Fail | 🟠 59 |
| https://www.gostudent.org | 🔴 Fail | 🟠 53 |🔴 Fail | 🟠 78  |
| https://www.coursehero.com | 🔴 Fail | 🔴 41 | 🟢 Pass | 🟠 58 |
| https://www.studocu.com | 🔴 Fail  | 🔴 35 | 🟢 Pass | 🟠 73 |

##### Legend

- CWV 🟢 pass or 🔴 fail
- Performance score calculation of 🟢 good, 🟠 needs improvement, 🔴 poor scores out of 100

## References

1. [Introducing INP to Core Web Vitals](https://developers.google.com/search/blog/2023/05/introducing-inp)
2. [Shift from FID to INP: Mastering the New Core Web Vitals Metric](https://www.youtube.com/watch?v=qWXGBGhEZ0w)
3. [Deciphering INP and Core Web Vitals](https://www.youtube.com/watch?v=QdcKuo-N3kU)
4. [Understanding Core Web Vitals and Google search results](https://developers.google.com/search/docs/appearance/core-web-vitals)
5. [Web Vitals](https://web.dev/articles/vitals)
6. [Web App performance](https://frontendmasters.com/courses/web-app-performance)