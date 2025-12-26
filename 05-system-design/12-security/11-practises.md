# Security practises to follow (with a bias for the FE)

- Logging and monitoring: Catching security issues when they happen can be a matter of noticing when there are sudden, unexpected spikes in activity (API hits, error rates, etc.) because production logs with sensible alerting is in place. Easier said than done. Also raises the question of what scale should you be when good logging practises are put in place? Should you already focus on this when you only have a handful of users?
- Efficient software delivery: If it takes only 20 minutes to push a change intro production, if any incident unfolds you will be able to respond quickly. Make shapping fast and well documented.
- Efficient software rollback: Be able to do quick health validation and reliable rollbacks
- Streamlined "break glass capabilities" (advanced): Ensure that critical operations can still be achieved in the face of additional types of failures.

## Securing CI (especially if you are an OSS developer)

- Avoid repo confusion for actions: Execute GitHub actions in the context of the contributors branch (`pull_request`), never the target repo (`pull_request_target`). With `pull_request`, untrusted fork code runs in a mostly sandboxed environment with no high‑value secrets, so misuse is limited

## Securing the supply chain

Supply chain attacks are having a moment in Fall 2025.

- [Pin dependency versions](https://github.com/ossf/scorecard/blob/main/docs/checks.md#pinned-dependencies): Pinning versions in package JSON by removing fuzzy version prefixes like ~, ^, and * for explicit control of version upgrades, and ensuring that all environments are using the same version regardless of whether they run `npm install` or `npm ci`.
- Use `npm ci` in CI builds: it is designed for CI/automated environments where deterministic, repeatable installs matter. It deletes node_modules and installs exactly what is in package-lock.json, without modifying it, and fails if a lock file isn't present. By contrast, `npm install` reads package.json (and package-lock.json if present) and installs dependencies, updating the lock file as needed.
- Setup dependency upgrade automation and update dependency versions _only_ after they’ve been published a week (pnpm [enabled this](https://pnpm.io/blog/releases/10.16)). Enable automated tools such as Dependabot to keep your GitHub Actions up to date with known branches/tags.
- Clean and prune project dependencies: remove unused packages and internalise others.
- Scan packages when upgrading dependencies, e.g. https://www.getsafety.com/
- Consider tools like https://www.chainguard.dev/
- Consider adopting CycloneDx: it will add overhead to the process but also transparency, automation tools are available to compensate, https://cyclonedx.org/tool-center/

## Good hygiene

- Simple >>> Complex >>> Complicated: security issues hit where code isn't well understood
- Sanitize inputs! E.g. `await sql`INSERT INTO Bookmarks (slug) VALUES (${slug});`;
- Follow the [OSS scorecard](https://github.com/ossf/scorecard) for repos, especially if publishing OSS but also when evaluating dependiencies.
- Turn off sourcemaps in production builds

## Securing secrets

- Scan for secrets: Setup secret detection and leak prevention, e.g. with TruffleHog. Attackers are using TruffleHog to find secrets, so find and secure them yourself first. Secrets _should never_ end up in the client JS.
- Lock down the default `GITHUB_TOKEN` permissions, and avoid adding extra PATs / cloud creds to PR workflows.

## Staying informed

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

