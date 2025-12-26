# Supply chain attacks

The web ecosystem supply chain is vulnerable, so much so that some are making it the basis of companies, e.g. [Chainguard](https://www.chainguard.dev/).

Reflecting [growing focus on software supply chain metadata](https://github.com/tc39/notes/blob/main/meetings/2025-09/september-22.md), TC54 plans to bring three standards to the next Ecma GA: [CycloneDX](https://cyclonedx.org/guides/CycloneDX%20One%20Pager.pdf) a Software Bill of Materials (SBOM) 2nd edition, and first edition of PURL.
It aligns with the European Union’s Cyber Resilience Act (CRA), which requires the creation of SBOMs as part of product security documentation.

An SBOM is basically a machine-readable ingredient list of your software that lets you answer “where do we use X library/version?” quickly for security, compliance, and ops reasons. It does not fix vulnerabilities by itself, but makes all the other work (scanning, incident response, vendor risk, audits) less blind and less manual. Standards like **CycloneDX** just define a common format and schema so different tools and orgs can exchange that inventory reliably.

- **Vuln lookup at scale:** When something like a new OpenSSL / log4j-style vuln drops, an SBOM lets you instantly query “do we ship that component anywhere, and in which products/versions?” instead of grepping random repos or containers.
- **Incident response:** During an incident, teams can map “this vulnerable component” → “these apps, environments, and customers” much faster, which shrinks detection and remediation time.
- **Compliance & audits:** Regulated industries and standards (e.g., US federal EO 14028, PCI, other sector rules) are increasingly requiring proof of software composition; an SBOM is the artifact you hand to auditors or customers.

## SBOM Cons

On the downside, many orgs treat SBOMs as a static checkbox: generated once per release, then filed away, quickly becoming outdated and out of sync with what’s actually running.SBOMs only **identify** components; they don’t tell you if something is end-of-life, actually exploitable in your context, or fix the issue, which creates the “SBOM gap” between knowing risk and being able to resolve it.

## SBOM Pros

When SBOMs are generated automatically on every build and wired into: 

- vuln correlation (CVEs matched to components and versions),  
- policy engines (e.g., block builds that include banned or EOL components),  
- reporting (vendor risk, customer SBOM requests, compliance reports).

In multi-vendor environments, SBOMs also give procurement and security teams a common basis to compare vendors’ risk posture instead of taking “we’re secure” on faith.

It centralizes “what are my dependencies (direct + transitive) and where?” into a standard artifact instead of scattering that knowledge across package-lock files, Dockerfiles, Helm charts, etc. So that when something blows up in npm, PyPI, or a CVE feed, you can answer stakeholders with data (“this affects services A and B only; C and D are clean”) instead of spending days reconstructing the dependency graph.

## References

[1](https://www.herodevs.com/blog-posts/why-your-sbom-is-only-the-beginning-of-open-source-security)
[2](https://www.fortinet.com/resources/cyberglossary/sbom)
[3](https://www.mend.io/blog/sbom-security-6-key-components-and-top-3-use-cases/)
[4](https://www.sonatype.com/resources/articles/what-is-software-bill-of-materials)
[5](https://finitestate.io/blog/unify-sbom-vulnerability-compliance)
[6](https://anchore.com/blog/the-sbom-paradox-why-useless-today-means-essential-tomorrow/)
[7](https://www.linkedin.com/posts/cchio_procurement-sustainableprocurement-digitaltransformation-activity-7389300095017447424-u4Z-)
[8](https://www.forbes.com/sites/adrianbridgwater/2025/09/18/never-drop-the-sbom-why-a-software-bill-of-materials-pays-off/)
[9](https://cyclonedx.org/specification/overview/)
[10](https://www.reddit.com/r/cybersecurity/comments/1mogjoc/sboms_are_incomplete/)
[11](https://news.ycombinator.com/item?id=38476492)