# Security practises to follow (with a bias for the FE)

- Logging and monitoring: Catching security issues when they happen can be a matter of noticing when there are sudden, unexpected spikes in activity (API hits, error rates, etc.) because production logs with sensible alerting is in place. Easier said than done. Also raises the question of what scale should you be when good logging practises are put in place? Should you already focus on this when you only have a handful of users?
- Efficient software delivery: If it takes only 20 minutes to push a change intro production, if any incident unfolds you will be able to respond quickly. So make it fast, and well documented.

## Securing the supply chain

Supply chain attacks are having a moment in Fall 2025.

- Pin dependency versions: Pinning versions in package JSON by removing fuzzy version prefixes like ~, ^, and * for explicit control of version upgrades, and ensuring that all environments are using the same version regardless of whether they run `npm install` or `npm ci`.
- Use `npm ci` in CI builds: it is designed for CI/automated environments where deterministic, repeatable installs matter. It deletes node_modules and installs exactly what is in package-lock.json, without modifying it, and fails if a lock file isn't present. By contrast, `npm install` reads package.json (and package-lock.json if present) and installs dependencies, updating the lock file as needed.
- Setup dependency upgrade automation and update dependency versions _only_ after they’ve been published a week.
- Clean and prune project dependencies: remove unused packages and internalise others.
- Scan packages when upgrading dependencies, e.g. https://www.getsafety.com/

## Good hygiene

- Scan for secrets: Setup secret detection and leak prevention, e.g. with TruffleHog. Attackers are using TruffleHog to find secrets, so find and secure them yourself first. Secrets _should never_ end up in the client JS.
- Turn off sourcemaps in production builds

## Staying informed of vulnerabilities

- Have obvious and convenient way to be contacted regarding security issues: pentesters reach out publicly when they have not way of contacting anyone privately.
- Read blogs
    - https://www.csoonline.com/news/
- Sign up for alerts
    - https://alerts.vulmon.com/register
    - https://www.cvedetails.com/documentation/alerts
- Audit exposure when incidents occur, e.g. search for organisation user names in affected GitHub logs

## Auditing continuously

- Form a security group with FE, BE, and Ops team members
- Be aware of what are our non-human identities are how are they being made available programmatically
- Bug bounties

## Be transparent

- Have and incideent disclosure and notification policy: Disclose breaches to users immediately, transparently
    - [firebase vs. arc](https://arc.net/blog/CVE-2024-45489-incident-response)
    - <https://tailscale.com/security-policies/incident-disclosure>
