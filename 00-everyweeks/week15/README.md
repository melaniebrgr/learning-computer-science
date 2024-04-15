# INP is not a Meyers-Briggs personality type

## Week 15 project journaling on web performance metrics

### With great front-end power...

When it comes to website performance, front-end (FE) developers can _make the most biggest impact_. Making changes on the FE is cheap, fast and effective compared to the backend. Front-enders can...

- reduce the amount of time JavaScript loading blocks parsing,
- reduce the amount of time CSS blocks rendering,
- reduce image size,
- define an HTTP cache policy, and
- tell BE developers when they should start optimising their queries because TTFB tanked. Aha.

These are the elementary things that I typically _do not even think about_ as go about day to day feature development. Not only that, I am still generally prioritising desktop web over mobile web. As I make code changes I a monitor the updates in a full-screen Chrome browser tab in a second monitor.

### Step 1: awareness

What can we measure in order to manage web performance?

The earliest web performance metric we cared about was page load time. Remember how we used to wait for this event in order to run jQuery?
There have been a lot of other metric overs the years, intended to capture different aspects of performance.

Initially browser centric measures predominated since they were easier to measure and understand. However over time with the realisation that a user's _perception_ of webpage speed matters more than actuals (for example, data shows that we feel like a website is loaded when the images are loaded), the metrics that we use have trended towards being more user focussed. Some example metrics:

- **Page load** is fired when the browser has nothing left to do and all files, images, and content even below the fold is ready. This metric is less important metric now since we reaslised that the page is usuable before being fully loaded, but popular in the 90's and early 2000's. Note that Generally we want to use DOMContentLoaded instead now.
- **Time to first byte (TTFB)** is when the browser receives the first byte of response.
- **First contentful paint (FCP)** is when the browser has painted something, even a line.
- **Time to interactive** is the first that when the main thread has been release for a few milliseconds.
- **First input delay (FID)** a former core web vital that measured the time between a user's firs click, tap or keypress and the brower's response.
- **Total blocking time (TBT)** is the amount of time the main thread was blocked during initial load.
- **Speed index** is how quickly a webpage is visually populated. It is calculate by taking screenshots of the website over time and calculating the percentage of the render. The purpose of the metric is to encourage render the majority of the page sooner.
- Any custrom metric specific to our website. e.g. time to first tweet

### A benevolant performance dictator enters

The Core Web Vitals were introduced by Google in 2020 as benchmarks for the web developer community to aim for. **Core Web Vitals** are meant to evoke health, i.e. these are the vital signs of your application. You are the triage nurse taking the pulse of your website in order to decide whether to send it to intensive or out-patient care. While Google says CWVs are "not a ranking signal or factor" it might be a lie, albeit a slight one. From their docs: "We highly recommend site owners achieve good Core Web Vitals for success with Search ... but good stats don't guarantee good rankings".

There are 3 core web vitals:

**Largest Contentful Paint (LCP)** is an indicator of how long it takes for the main _content_ to appear. It is the time from when the web page starts loading to when the largest text, image or video frame finishes rendering. A good measure is less that 2.5s. LCP is the hardest metric to pass of the three, because there are in fract four metric subparts to optimise: TTFB, resource load delay, resource load time, and render delay. The impact and importance of the submetric part matters more or less depending on the largest content type, making it hard to tune generally.

**Interaction to Next Paint (INP)** is an indicator of web page "snappiness". It is meant to do a better job of indicating the user's experience than the metric it is replacing, FID. INP captures the delay in response to all clicking, tapping or key pressing due to blocking of the main thread. All delays in a users a session are logged and the worst one at the conclusion of a session is taken. A good value is less than 200 ms. March 12, 2024 was INP's first birthday.

**Cumulative Layout Shift (CLS)** is an indicator of visual stability. It is much more aligned with a user's experience than the other two metrics. It is the amount of the largest layout shift "burst" in a user's session. The layout shift is calculated from size of the affected device screen, and how far the element shifted, i.e. `layout shift score = impact fraction * distance fraction`. The largest possible layout shift score is 1 meaning the element(s) shift impacted 100% of the screen and they changed position by 100%. A good CLS score is less than 0.1.

### Measuring CWVs so they can be managed

CWVs are well thought through metrics and can be used across pretty much all websites. While they are a great starting point, you should still "know your site, and know your users" and make sure what is being measured is in fact important for your users.

Here is a list of tools for measuring CWVs and more:

- **Google Search Console** offers real-user data from a broad range of users.
- **Chrome UX report (CrUX)** also provides real-user monitoring (RUM) data.
- **PageSpeed insights** is a different flavour of RUM data.
- **Google Lighthouse** is a lab performance analysis tool. The name "Lighthouse" is meant to suggest that it is a guide for web developers, i.e. Lighthouse score should guide us in the right direction. Once a problem is identified with real user data the Lighthouse DevTools can be useful for testing different solutions.
- The **Performance tab** in Chrome DevTools is also convenient for testing solutions. Just configure the options you need and hit record.
- **WebPageTest.org** shows real data but keep in mind that the results are for one device in time and at one point in the world.
- **Treo** a paid, page speed monitoring tool enablong easy cross-comparison with different sites.
- **SpeedCurve** another paid tool to monitor your competitor's performance.

### A comparison of some of our EdTech competitors

#### The CrUX report

| Origin | LCP (s) | INP (ms) | CLS |
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