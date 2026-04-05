# Hosting

The Hosting Landscape market in 2026 has split fairly cleanly into three tiers: **frontend/JAMstack platforms**, **full-stack PaaS platforms**, and **infrastructure/cloud providers**. The right choice depends heavily on what you're building.

## Frontend & Edge Platforms

These are the go-to options for static sites, SPAs, and server-rendered frontends. They've evolved well beyond simple file hosting into edge compute platforms.

**Vercel**
Founded by the creator of Next.js, Vercel's philosophy centers on "develop, preview, ship" — optimizing the developer experience for dynamic, server-rendered applications. The DX is genuinely excellent: Git-connected deployments, preview URLs per pull request, and zero-config framework detection. Vercel doubled down on AI-powered development with v0, its generative UI tool, and expanded its "Fluid Compute" model to reduce serverless cold starts by reusing function instances across requests. The catch is cost: Vercel's pricing is fair for its feature set but can scale unpredictably — several high-profile cases of surprise bills have been documented, though Vercel has added spend management tools to address this. Pro plan is $20/user/month. **Best for: Next.js teams.** The integration is simply unmatched.

**Netlify**
JAMstack stands for JavaScript, APIs and markup and the key ideas is that there is no server dynamically rendering pages per request. Instead, pages are pre-generated and served directly from a CDN, which makes them fast, secure (no server to attack), and cheap to host. The term JAMstack was coined around 2015–2016 by Netlify's founders.

Netlify pioneered the JAMstack concept and has remained more framework-agnostic. Its Composable Architecture model treats the platform as a modular toolkit where teams can plug in different services — CMS, commerce, authentication — without vendor lock-in. It's the most flexible of the three major frontend platforms. Built-in forms eliminate the need for third-party services, and predictable pricing prevents surprises. That said, Netlify's reduced free tier (100 build minutes, down from 300) makes it less attractive for hobbyist projects. Pro is $19/month. **Best for: Framework-agnostic teams, Astro/Hugo/SvelteKit projects.**

**Cloudflare Pages + Workers**
Cloudflare's edge performance remains in a different league. The consistency across all regions — every location under 50ms — reflects the advantage of running application logic on a network with over 300 points of presence. The big story in 2026 is value: unlimited bandwidth at every tier is remarkable. Cloudflare has also expanded its ecosystem significantly — D1 (SQLite at the edge, now GA with 10GB databases) and R2 (S3-compatible object storage with zero egress fees) mean you can build full-stack apps staying entirely in the Cloudflare ecosystem. The downside is a steeper learning curve — Workers and Wrangler config feel less polished than Vercel's zero-config approach. **Best for: High-traffic, globally distributed, cost-sensitive projects.**

One major comparative shift: if starting a new project today, many teams would choose Cloudflare Pages over Vercel as the default — a reversal from 2025 recommendations — owing to Cloudflare's improvements in framework support and unbeatable pricing.

**GitHub Pages**
Still alive and useful for its niche. GitHub Pages is specifically designed for hosting static websites and has limitations when it comes to hosting other types of web applications or SPAs. No serverless functions, no edge compute. The main advantages are cost (free for public repos) and the seamless integration with your existing GitHub workflow. **Best for: Documentation, open-source project sites, simple portfolios.**

---

### Full-Stack PaaS Platforms

These let you deploy backends, databases, workers, and frontends together — closer to the old Heroku model, but modernized.

**Railway**
Railway is built around one idea: deploying should be effortless. Connect your GitHub repo, and Railway detects your framework, builds your app, and deploys it — often in under a minute. No Dockerfiles required (though they're supported), no YAML configuration, no infrastructure decisions. Railway's "project" model groups your services (API, database, workers) into a visual canvas — you see how they connect, manage environment variables across services, and deploy everything together. Usage-based pricing starts at $5/month hobby tier. **Best for: Full-stack apps, prototypes, developers who want the fastest path to production.**

**Render**
Render positioned itself as the "modern Heroku" and executed brilliantly. It offers a free tier that actually works (with limitations), competitive pricing, and a clean interface. Where Render shines is in its breadth: static sites, web services, cron jobs, background workers, and managed databases — all from one dashboard. Render uses flat monthly pricing tiers based on service type and resource size — no granular tracking of minutes or CPU time. You know what you'll pay upfront. **Best for: Teams that want predictable pricing and a reliable production setup with batteries included.** Worth a look as a simpler alternative if Fly.io feels complex.

**Fly.io**
Fly.io runs your containers at the edge across 35+ data centers worldwide, giving you low-latency performance without managing infrastructure. In 2026, Fly.io has matured significantly — it now offers managed Postgres, GPU instances, Kubernetes support, and scale-to-zero capabilities. The workflow requires more setup than Railway but gives you more control. **Best for: Global apps, latency-sensitive workloads, teams comfortable with Docker.**

**DigitalOcean App Platform**
It won't give you advanced edge network features, but it does allow more flexibility in workloads (e.g. run a Python API or a Rust service, which Vercel cannot) while still abstracting away infrastructure complexities. DigitalOcean's strength is its broad ecosystem — Droplets, managed databases, object storage, and Kubernetes are all available if you outgrow the App Platform. A good middle ground between "managed PaaS" and "raw cloud". **Best for: Small-to-medium workloads, teams that might need to graduate to VPS or Kubernetes.**

**Firebase (Google)**
Firebase is a platform where you can create and host common features for a web or mobile app like authentication, serverless functions, and a database in addition to hosting frontend sites. Firebase comes with two persistent ready-to-use databases (Realtime and Firestore) for your project, whereas with Vercel you first have to connect to an external database. The DX is tight if you're building mobile-first or heavily real-time features, but less competitive as a general-purpose hosting platform in 2026. **Best for: Mobile app backends, real-time features, Google ecosystem teams.**

---

### Other Notables

- **Heroku** — If you're starting fresh, there's almost no reason to choose Heroku over a modern alternative. Only relevant if you have existing Heroku infrastructure or Salesforce integrations.
- **AWS Amplify / Azure Static Web Apps / Google Cloud Run** — Good if you're already deep in those cloud ecosystems; steeper setup for greenfield projects.

---

### Key Factors Beyond DX

**Pricing model risk.** Usage-based billing (Vercel, Railway, Fly.io) can surprise you at scale. At scale, cost differences are dramatic — modeling a site handling 5TB of bandwidth and 10 million serverless invocations per month shows order-of-magnitude differences between platforms. Cloudflare's free bandwidth is genuinely hard to beat for high-traffic sites.

**Vendor lock-in.** For teams that prioritize portability, the mitigation strategy is to keep platform-specific code isolated behind abstractions, use environment variables for platform-specific URLs, and wrap serverless handlers in platform-agnostic interfaces. Vercel's edge middleware and image optimization are the tightest lock-in risks.

**Framework fit.** The framework you're using matters enormously. Next.js → Vercel is hard to beat. Astro/SvelteKit → Netlify or Cloudflare. Full-stack Node/Python → Railway or Render. Docker-first → Fly.io or DigitalOcean.

**Backend needs.** If your app needs persistent processes, cron jobs, or managed databases, the "frontend platforms" (Vercel, Netlify, GitHub Pages) will feel like you're fighting the platform. Railway, Render, or Fly.io serve these needs much more naturally.

**Free tier generosity.** Railway and Fly.io now run on trial/usage-based models — they are great for testing but no longer true "always free" platforms. Cloudflare Pages and Render's static hosting remain the most generous for zero-cost hobby projects.
