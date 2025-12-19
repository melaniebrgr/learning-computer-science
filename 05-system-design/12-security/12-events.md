# Some events

1. <https://deepstrike.io/blog/most-common-web-vulnerabilities-2025>
2. [xyzeva](https://kibty.town)

## Shai-Hulud 1.0, 2025-09-15

supply chain - phishing

>  Linguistically, the term is commonly explained as deriving from Arabic شَيْء خُلُود (shayʾ khulūd), which translates to something like “thing of eternity”

Researchers believe that the starting point of the attack was the `rxnt-authentication` package, a malicious version of which was published on npm on September 14, 2025. NPM credentials for it may have been stolen in a prior harvesting attack, such as the "S1ngularity" or via a phishing campaign where an email impersonating an npm registry staff member. The attack was noticed on September 15, 2025 when the popular [`@crtl/tinycolor` package](https://www.npmjs.com/package/@ctrl/tinycolor) was compromised.

> We don't know how the maintainer, Scott Cooper, was hacked, but Scott verified that he had been compromised and was working with NPM to fix it.

Using the stolen credentials, two malicious versions of the @ctrl/tinycolor package were published: 4.1.1 at UTC 2025-09-15 T19:52:46.624Z and 4.1.2 about 20 minutes later. The patch version update contained a large, ~3.6MB minified JavaScript, payload `bundle.js`, and a postinstall script update to execute it.

"pre" and "post" can be prepended to any npm scripts keys in a `package.json` file in order to run them automatically whenever the root script is executed, e.g. "precompress" and "postcompress" executes before and after `npm run compress`, respectively.

In addition to these custom pre and post scripts, there are "special lifecycle scripts" run automatically for certain commands. For example, behind the scenes `npm ci` and `npm install` actually run the following in order: preinstall, install, postinstall, prepublish, preprepare, postprepare.

Adding a postinstall script to `package.json` took advantage of this implicit behaviour. When a `tinycolor` consumer upgraded their dependency patch versions, which can happen automatically, bundle.js was executed. It did three main things:

1. credential harvesting
2. credential exfiltration
3. worm propagation

### credential harvesting

> Wiz estimates that 73% of organizations using private GitHub Action Secrets repositories store cloud service provider (CSP) credentials within them. When PATs, which allow developers and automation bots to interact with GitHub repositories and workflows, are exploited, attackers can easily move laterally to CSP control planes.

The malware attempted to vaccuum all the secrets it could and placing them in a data.json file. It dumped the entire process.env, downloaded Trufflehog and used it to scan the filesystem for secrets, tried to detect if it was executing within AWS or GCP and loaded the appropriate SDK for the cloud environment to steal credentials and data. Specifically targetted were

- GitHub personal access tokens (PATs),
- NPM authentication tokens,
- AWS access keys,
- Google Cloud Platform service credentials,
- Azure credentials, and
- Cloud metadata endpoints.

> This is a common technique that mature threat actors use when they land on a cloud server. They take the time to identify where there are, and then use things like the IMDS service to pivot deeper into the cloud environment.

### credential exfiltration

With the PATs the malware found, a bash script embedded in the `bundle.js` then updated those repositories, flipping private repos to public ones and creating a branch named `shai-hulud`.

The branch was created byt first querying the default branch via the GitHub API to get its latest commit SHA. Then the malware called GitHub’s `/git/refs` endpoint to create a new ref `refs/heads/shai-hulud` that points at that same commit, forking the default branch into a new branch.​ By creating the shai-hulud ref directly, the attacker does not need a normal merge or PR.

To this branch a GitHub Actions workflow file, `.github/workflows/shai-hulud-workflow.yml`, and data.json file containing the secrets were committed. On push, the webhook sent the secrets payload to a public webhook. Incidentally, the request limit of the webhook was exceeded (it was a free guest account) but data exfiltration was still made possible by changing the description of the infected repos to "Shai-Hulud migration" making them easily searchable.

### worm propagation

> the compromise affected at least 187 packages. Notably, the affected set includes several packages published by the cybersecurity company CrowdStrike’s npmjs account

Using the stolen NPM token the malware queried for and published updates to 20 of the victims NPM packages. Anyone updating patch version of the package were subsequently infected, in a cascade effect.

```js
async updatePackage(pkg) {
  // Patch package.json (add self as dep?) and publish
  await exec(`npm version patch --force && npm publish --access public --token ${token}`);
}
```

The `shai-hulud` branch did not need to be merged into a release branch for new package versions to be published containing malicious code. As long as the attacker runs `npm publish` from whatever branch they control, the newly published version on npm will contain the malicious payload, regardless of whether a `shai-hulud` branch exists or is merged. (The `shai-hulud` branch was used as a GitHub Actions backdoor, carrying the `.github/workflows/shai-hulud-workflow.yml`, which exfiltrates secrets on push.)

1. <https://securitylabs.datadoghq.com/articles/shai-hulud-2.0-npm-worm/>
2. <https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem>
3. <https://www.getsafety.com/blog-posts/shai-hulud-npm-attack>
4. <https://hackmag.com/news/shai-hulud>

## Shai-Hulud 2.0, 2025-11-24

> Shai-Hulud 2.0 has successfully taken over and backdoored 796 unique npm packages ... Based on publicly available sources, we estimate that the data of over 500 unique GitHub users was successfully exfiltrated, belonging to over 150 unique GitHub organizations. This should be interpreted as a lower bound.

## Mintlify, 2025-11-27

**type: supply chain, xss**



1. <https://gist.github.com/hackermondev/5e2cdc32849405fff6b46957747a2d28>