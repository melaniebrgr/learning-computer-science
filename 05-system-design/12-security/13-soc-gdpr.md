# System and Organization Controls (SOC)

SOC 2 is a security and privacy compliance framework and auditing standard that defines how service organizations should protect customer data in the cloud. It was created by the American Institute of Certified Public Accountants (AICPA).[1][2] Organizations define and implement internal controls (technical and procedural) to meet the criteria that are in-scope for their particular SOC 2 report.[6][1][5]

## The 5 Trust Services Criteria

SOC 2 was built around **5 “Trust Services Criteria”**: 

1. security: SSO/MFA, role‑based access control, least privilege, secure off‑boarding, and physical protections for offices and data centers, encryption of data in transit (e.g., TLS/HTTPS) and at rest, plus network and endpoint protections like firewalls, VPN, and EDR.
2. availability: centralized logging, SIEM alerts, incident response process, backups, and disaster recovery/business continuity plans,
3. processing integrity,
4. confidentiality: data classification, least‑access to sensitive data, secure deletion, and, when Privacy is in scope, controls around collection, use, and retention of personal data,
5. privacy.

There should be documented policies and procedures (e.g., security policy, onboarding/off‑boarding, change management, incident handling) that are communicated and followed.[7][10][6]. As well, periodic risk assessments, vendor risk management, and ongoing control monitoring to show management is identifying and mitigating risks continuously.[2][6][7]

## Reports and types

A SOC 2 report is issued by an independent auditor to attest that the organization’s controls are suitably designed and (for some reports) operating effectively.[7][1][6] 

- Type I reports assess the design of controls at a point in time, while
- Type II reports assess both design and operating effectiveness over a period (typically 3–12 months).[8][6]

## Why companies advertise “SOC 2 compliant”

“SOC 2 compliant” signals to customers that the company’s security controls have been audited against the SOC 2 criteria, which is often a prerequisite for enterprise deals.[1][2][7]. It helps establish trust by providing standardized, third‑party assurance about how customer data is secured and managed.[3][4][1]

## Example reports

### SOC 2 Type I reports

These include the classic sections: management assertion, independent auditor’s report, system description, and controls with tests (where applicable).[6][4][1]

- Iterative Inc. (SOC 2 Type I, Security): https://static.iterative.ai/iterative-inc-soc2-type1-report.pdf[1]
- Provectus IT Inc. (SOC 2 Type I): https://provectus.com/wp-content/uploads/2022/05/Provectus-IT-Inc.-SOC-2-Type-I-Report-Final.pdf[4]
- Trisk (SOC 2 Type I): https://trisk.io/resources/security/soc2-june-2022.pdf[5]

On the technical front, the report contained:

- System architecture diagram
- Tech stack list
- Statement that employees had gone through security training
- Employee laptops equipped with monitoring tooling
- List of system monitoring tools, e.g. Sentry, AWS Guard Dog
- Data at rest encryption strategy
- When penetration tests were done and a link to the report

### SOC 2 Type II reports

These show the same core structure, but with test procedures and operating‑effectiveness results over a period, which is what distinguishes Type II from Type I.[7][8][2]

- MSG91 (SOC 2 Type II): https://msg91.com/pdf/soc2.pdf[2]
- Visionify (SOC 2 Type II): https://visionify.ai/reports/soc2-type2-compliance-report.pdf[3]

# General Data Protection Regulation (GDPR)

GDPR is not the European equivalent of SOC. **GDPR is a _mandatory_ EU regulation focused on data privacy rights and lawful personal data processing. SOC 2 is a _voluntary_ US-based audit standard for service organizations emphasizing security controls.**[1][3]

GDPR is the EU's General Data Protection Regulation, a comprehensive privacy law that requires web developers to prioritize user data protection in app design and implementation, especially for sites serving EU users.[1][2][3]

GDPR enforces individual rights like consent, access, erasure, and 72-hour breach notifications through legal penalties up to 4% of global revenue, applying to any entity handling EU data. SOC 2, developed by AICPA, audits Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy) via third-party reports, mainly for B2B SaaS to build customer trust without direct fines.[2][3][6][7]

## The 7 Core Principles

GDPR rests on seven principles that guide data handling: 

1. lawfulness, fairness, and transparency;
2. purpose limitation;
3. data minimization;
4. accuracy;
5. storage limitation;
6. integrity and confidentiality; and 
7. accountability. 

## Key Developer Responsibilities

Web developers apply these by collecting only necessary data (e.g., no excess user tracking), encrypting it in transit and at rest, and documenting processing activities clearly.[4][3][1]

- Implement explicit opt-in consent mechanisms, such as checkboxes before collecting data, rather than assuming agreement through continued use.
- Support user rights like data access (provide copies on request),
- erasure ("right to be forgotten"), and
- portability by coordinating with third parties and building export features. Use
- privacy-by-design: minimize data collection, anonymize where possible, and conduct Data Protection Impact Assessments (DPIAs) for high-risk processing.[2][5][6][4]

### Practical Implementation Steps

- **Consent Management**: Integrate tools like consent banners in JavaScript frameworks (e.g., Next.js), ensuring granular choices for cookies and trackers.[7]
- **Secure Coding**: Apply role-based access, encryption (e.g., client-side for local-first apps), and regular audits to prevent breaches.[4]
- **Documentation**: Maintain clear privacy policies detailing data use, storage, and third-party access; update them for regulatory changes.[2]

Host on EU-based compliant providers to simplify data residency.[8]

## Assorted references

[1](https://www.vanta.com/collection/soc-2/soc-2-compliance-requirements)
[2](https://www.cbh.com/insights/articles/soc-2-trust-services-criteria-guide/)
[3](https://www.vanta.com/collection/soc-2/soc-2-trust-service-criteria)
[4](https://auditboard.com/blog/soc-2-framework-guide-the-complete-introduction)
[5](https://linfordco.com/blog/what-is-soc-2/)
[6](https://sprinto.com/blog/soc-2-requirements/)
[7](https://www.brightdefense.com/resources/soc-2-controls-list/)
[8](https://secureframe.com/hub/soc-2/requirements)
[9](https://www.ispartnersllc.com/blog/soc-2-controls/)
[10](https://www.hipaajournal.com/soc-2-compliance-checklist/)

[1](https://developer.ibm.com/articles/s-gdpr1/)
[2](https://workos.com/guide/gdpr-compliance)
[3](https://usercentrics.com/knowledge-hub/principles-of-gdpr/)
[4](https://kvytechnology.com/blog/software/web-development-data-privacy/)
[5](https://fusionauth.io/articles/ciam/developers-guide-to-gdpr)
[6](https://www.privacypolicies.com/blog/gdpr-compliance-apps/)
[7](https://www.goodmorning.no/en/blog/ensuring-gdpr-compliance-in-web-development)
[8](https://dev.to/dev_tips/gdpr-compliant-hosting-best-practices-for-developers-in-2025-jl5)
[9](https://www.cnil.fr/en/gdpr-developers-guide)
[10](https://doterb.com/the-legal-side-of-web-development-gdpr-and-privacy-policies/)

[1](https://www.6clicks.com/resources/comparisons/gdpr-vs-soc-2)
[2](https://gdprlocal.com/navigating-compliance-gdpr-and-soc-2-compared/)
[3](https://sprinto.com/blog/soc-2-vs-gdpr/)
[4](https://scytale.ai/question/what-are-the-key-differences-between-gdpr-and-soc-2-compliance/)
[5](https://www.cloudeagle.ai/blogs/iso-27001-vs-soc-2-vs-gdpr-key-differences-explained)
[6](https://regulance.io/blog/soc-2-vs-gdpr-whats-the-difference-and-why-does-it-matter-for-your-business/)
[7](https://www.6clicks.com/resources/comparisons/soc-2-vs-gdpr)
[8](https://heydata.eu/en/magazine/gdpr-or-soc-2-navigating-the-seas-of-compliance/)
[9](https://wearebrain.com/blog/comparing-soc-2-iso-27001-and-gdpr-compliance/)
[10](https://linfordco.com/blog/gdpr-soc-2/)