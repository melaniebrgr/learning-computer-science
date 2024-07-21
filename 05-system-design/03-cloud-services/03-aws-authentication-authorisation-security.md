# 03 cloud services

## AWS authentication, authorization and security

- The shared responsibility model
- Authentication and authorisation
  - Identity & Access management (IAM)
  - Cognito
  - Security Token Service (STS)
- Security Matters

### The shared responsibility model

The shared responsibility model defines the lines of responsibility between the you and Amazon. AWS is responsible for what it can control: physical machines, infrastructure, managed services. You are responsible for what you can control: account and access, applications. Amazon is responsible for the physical hardware and the software that runs on top of it. The customer is responsible for the data itself including encryption of data and network traffic. Responsibilities vary depending on the services used. For example, if you are running OSs on computer services, you are responsible for that.

> "AWS operates, manages and controls the components from the host operating system and virtualization layer down to the physical security of the facilities in which the service operates. The customer assumes responsibility and management of the guest operating system (including updates and security patches), other associated application software as well as the configuration of the AWS provided security group firewall."

### Authentication and authorisation

#### Identity and access management (IAM)

Identities are the entities that are allowed or not allowed to so something (the "who"). Access management refers to the permissions that are granted or not granted (the "what"), which is managed with policies.

IAM users are individual entities created with generally more limited permissions. There are 4 IAM types:

- root,
- users,
- users groups and
- roles.

A **root user** has "super user" powers and should never be shared or used for day-to-day activities. Instead, create users and enable MFA for them, for example an admin account for billing. A **user** entity is typically created and assigned to everyone who accesses the AWS account. A user represents a single person or a service a.k.a "service accounts". Each user has an **Amazon Resource Name (ARN)**. Users can be assigned a key ID and a secret access key so that they can log in programmatically in addition to logging in through a software interface with the standard username and password. A best practise is to create an individual account per user, i.e. not to reuse credentials between individuals. By default, users have no permissions and must be given some to do anything. Follow the principle of least privilege when assigning permissions.

Users can be assigned to **groups** to share permissions. Groups are a collection of users that collectively perform a similar job role, e.g. developers. A group can also have a specifically policy attached to it. In total, to set permissions for a user you can add them to an existing group, copy over permissions from an existing user, or attach built-in or custom policies.

**Roles** are typically assigned to services so that they can perform tasks. A role is used to give amazon resources permissions to other amazon resources without having to configure a user name or password for it. It's a convenient and more secure way of giving, for example, an EC2 instance access to an S3 bucket. Put another way, it's a way of delegating permissions to users and services without using permanent credentials that are stored on the resource. When resources assume a role they get temporary credentials to make API calls.

**Policies** group permissions together. Policies are JSON documents that define the permissions for a user, group or role. It can be defined through the management console and can contain conditional statements, like IP address restrictions. The policy simulator can be used to test the effects of a policy. Note that in case of clash of policy permissions, e.g. Policy A "allows EC2 read" and Policy B "Denies all EC2 access" the least permissive option wins, and a user with both policies attached will not have EC2 access.

There are three authentication methods:

1. Access key (ID and secret), for programmatic access. If a key is compromised it can be disabled.
2. IAM (username and password), for AWS console access. You can require users to reset their passwords.
3. Signing certificate (SSL/TLS) is available for some services and should be managed through the **AWS Certificate Manager**.

It's a best practise for all privileged accounts to have MFA set up. MFA can consist of two or more of

1. something I know, e.g. password
2. something I have, e.g. mobile device with Google Authenticator (virtual MFA), or USB (physical MFA)
3. something I am, e.g. fingerprint or other biometric data

#### Cognito

Cognito is a managed authentication service for the users of your applications. (The IAM service is to manage users for the AWS account, not the product you are building.) User pools are created with credential requirements and then integrated in the application. Social sign up can also be set up with federated identity pools.

#### Secure token service (STS)

STS is a global amazon service for requesting temporary, limited-privilege credentials for IAM or federated users. Federated users (external identities) are users you manage outside of AWS in your corporate directory, but to whom you grant access to your AWS account using temporary security credentials.

### Security Matters

Security concerns vary by domain:

#### Account protection

- issues:
  - compromised accounts,
  - malicious employee usage,
  - insecure cross-acount usage,
  - non-standard service usage
- services:
  - IAM (access advisor, access analyser),
  - SSO,
  - CloudTrail,
  - GuardDuty,
  - Organizations,
  - Artifact,
  - Config,
  - Audit

#### Application protection

- issues:
  - software vulerabilities,
  - insecure configurations,
  - incident analysis
- services:
  - Inspector,
  - Detective

Network protection:

- issues:
  - malicious traffic,
  - DDoS attacks
- services:
  - WAF,
  - Network Firewall,
  - Firewall Manager,
  - Shield,
  - Shield Advanced

Data protection:

- insecure/unencrypted data, credential leaks, data breaches or exposure
- services: KMS, CloudHSM, Secrets Manager, ACM, Maci, Security Hub

### Security-related services

#### Standardisation & compliance

##### Organisation

Consistent usage of best practise across accounts by setting up organisations units (OU) with **Organisations**. For example, help ensure security practises are applied to production services.

Occasionally an organisation may wish to have multiple AWS accounts, if for example there are different teams with different goals and needs that could clash under a single account. If you have multiple AWS accounts they can be consolidated with **AWS Organizations**. Multiple accounts can also allow you to access additional resources. You can manage e.g. backups and policies accross accounts from a central place.

The Paying account is where the bills get paid, so that you get one bill, far all the linked accounts services. The combined usage enables shared volume discounts. There is no extra fee for AWS Organizations. Service Control Policies (SCP) can be attached to individual organizations to control or limit what administrators of those organizations can do.

Service Control Policies are an AWS Organizations feature that allows you to set permission guardrails for organization accounts. These guardrails set maximum access rights which can't be exceeded by permissions set inside of the affected organization accounts. Even if an identity (e.g., an IAM user) in an account would receive a policy that grants more access rights, the SCP would restrict the maximum access rights.

##### Config

Configurations for all AWS resources can be enforced with **AWS Config**, which evaluates, audits and notifies of resources not compliant with established configurations. Provides a dashboard to see compliance at a glance. Manage and control service config on a central level.
Assess, audit and evaluate service configuration with AWS Config. It provides an inventory of the resources being used and their configuration. This is useful for verification and compliance, i.e. make sure resource configurations comply with government regulations. You can also see the history of the resource's configuration. Used AWS Config to see what changed, use CloudTrail to see who changed it. Remediation actions can also be configured.

##### Trusted Advisor

**Trusted Advisor** provides advice for resource management. Trusted Advisor checks help optimize your AWS infrastructure, increase security and performance, reduce your overall costs, and monitor service limits. It checks security groups for rules that allow unrestricted access (0.0.0.0/0) to specific ports. Unrestricted access increases opportunities for malicious activity (hacking, denial-of-service attacks, loss of data). The ports with highest risk are flagged red, and those with less risk are flagged yellow. Ports flagged green are typically used by applications that require unrestricted access, such as HTTP and SMTP.

##### Misc. standardisation & compliance services

For information about AWS' security and compliance use **AWS Artifact**. Use **AWS Audit Manager** to map your compliance requirements to AWS usage data with prebuilt and custom frameworks and automated evidence collection.

For automated security compliance assessments of software and networks use **Amazon Inspector**, especially useful for multi-account configurations to make sure security is consistent across these. "Amazon Inspector automatically discovers workloads, such as Amazon EC2 instances, containers, and Lambda functions, and scans them for software vulnerabilities and unintended network exposure." It collects and centralises security data.

#### Protect

**AWS Web Application Firewall (WAF)** is a web application firewall that protects against common exploits that could compromise application availability, e.g. from the OWASP list, that compromise security or that consume excessive resources such as SQL injection, and XSS. WAF filters web traffic according to custom rules based on conditions that include IP addresses, HTTP headers and body, or custom URIs. More conveniently block exploits like SQL injection and XSS.

**Network access control lists (NACLs)** are firewalls applied at the subnet level.

- A firewall for a subnet
- Checks incoming and outgoing requests and periodically blocks
- "Stateless" requests and responses are decoupled
- One NACL per subnet

A **security group** is like a firewall that can be attached to an instance that limits internet traffic to the instance. Put another way, security groups are a virtual firewall applied at the instance level controlling outbound and inbound traffic.

- A firewall for a single EC2 instance
- Checks incoming and outgoing requests and periodically blocks
- "Stateful" response are always allowed if the request was
- There can be multiple security groups for an instance

Use **AWS Shield** to protect against DDoS attacks. There is standard (available by default) and advanced shield which can provide more details about an attack. Both WAF and shield provide protection at the network level.

#### Monitor

**Amazon GuardDuty** provides automatic threat detection. It monitors for malicious or unauthorized behaviour in serverless, compute, databases and stores by monitoring CloudWatch, VPC and DNS logs using ML and other rules. Automatic responses can be configured. Use **AWS CloudTrail** to analyse, track and search across all the logs to see who made changes where and when. It works across all regions and automatic responses can be configured when inconsistencies are detected.

#### Encrypt

in-transit: An example of encryption is transit is SSL. Unencrypted data as it is transferred over an HTTPS connection is encrypted. **AWS Certificate** can be used to manage the certs for SSL/TLS. An example of encryption at rest is when data arrives in your bucket and you've applied encryption to the bucket the data will be encrypted.

at-rest: **Amazon Key Management Service (KMS)** and **CloudHSM** help manage the keys that are used to encrypt data at rest. The key policy let's you control when how and who can read the data. It is integrated with over 100 AWS services. The difference is CloudHSM dedicates hardware specifically to you so you can create a custom key-store that could then be used by KMS.

A best practise is to store, manage and automate rotation of passwords, API keys and tokens for AWS services with **AWS Secrets Manager**. It is meant to work with IAM.

#### Investigate

Find root causes of security issues with **Amazon Detective**. "Amazon Detective automatically collects log data from your AWS resources and uses machine learning (ML), statistical analysis, and graph theory to build a dataset that you can use to conduct more efficient security investigations." Seems to be useful for post-mortems.
