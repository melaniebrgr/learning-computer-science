# Architecture Characteristics

An architecture characteristic is not a functional requirement. It provides operational and design criteria for success on how to implement the application requirements. To be an architecture characteristic it must

- Specify a non-domain consideration, e.g. "system needs elasticity to handle bursts of orders around meal times".
- Influences structural design: all systems must have a baseline support for most architecture characteristics, however if it requires building something special, then it is an “architecture characteristic”.
- Critical to application success: supporting many characteristics adds complexity so you want to identify the fewest number (3-5) that are critical to success.

Architectural characteristics can be roughly grouped into three buckets:

1. operational: often interact with devops/SRE concerns, e.g. availability, continuity, performance, reliability
2. structural: help define the level of investment in modularity and code quality, e.g. extensibility, changeability, upgradeability, localisability
3. cross-cutting: everything else, e.g. archivability, legal, privacy, security

## Characteristics

- Reliability/safety: Consistently good in quality or performance; able to be trusted, it can be characterised in terms of mean time between failures. Tolerating hardware and software faults. Human error.
- Deployability	
- Evolvability	
- Installability: Ease of installation on all platforms.
- Maintainability: How easy is it to apply changes and enhance the system.
- Upgradeability: Ability to easily and quickly upgrade from a previous version to a newer version on servers and clients.
- Archivability: Will the data need to be archived or deleted after a period of time?
- Authentication: Security requirements to ensure users are who they say they are.
- Authorization: Security requirements to users can access only certain functions.
- Usability/achievability: Level of training required for users to achieve their goals with the application/solution.
- Extensability: How important it is to plug new pieces of software in.
- Testability: Ensure the system was built to respect the needs of the customer. For a system to be testable we need to be able to control the input and output of each component: A complex system is hard to test.
- Continuity: Continuity can be thought in terms of both availability (we have the spare tire to continue) and resiliency (we can continue with 2 wheel driving). Disaster recovery capability.
- Portability: Does the system need to run on more than one platform? E.g. different database types.
- Accessibility: Accessible to users with disabilities.
- Performance: Performance refers to responsiveness: either the time required to respond to specific events or the number of events processed in a given interval of time. It includes stress testing, peak analysis, capacity required, response times.
- Availability: How long the system will need to be available, i.e. the ability of a system to mask or repair faults within certain thresholds, e.g. 99.999% available = 5.25 minutes of downtime a year. It’s another layer on top of reliability.
- Scalability: Is the property of a system to perform within acceptable thresholds under heavy load. Measuring load and performance and staying within latency percentiles and throughout.
- Cost	
- Privacy: Ability to hide transactions from internal company employees.
- Agility: the capability of a software product's architecture to rapidly adapt to constantly changing business requirements
- Recoverability: Business continuity requirements, in case of disaster. It affects the backup strategy.
- Robustness: Ability to handle error and boundary conditions while running if the internet goes down or there’s an outage.
- Elasticity: Automatic scalability characterized by volatility.
- Configurability: Ability for the user to easily change aspects of the software’s configuration.
- Leverageability/reuse: Ability to leverage common components across multiple products.
- Localisation: Support for multiple languages.
- Supportability: What level of technical support is needed by the application? What level of logging and other facilities are required to debug errors?
- Legal: Legislative constraints the system is operating in.
- Security: Does the data need to be encrypted in the database? Encrypted communication between internal systems?
