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

##### Config

Configurations for all AWS resources can be enforced with **AWS Config**, which evaluates, audits and notifies of resources not compliant with established configurations, and provides a dashboard to see compliance at a glance. Manage and control service config on a central level.
Assess, audit and evaluate service configuration with AWS Config. It provides an inventory of the resources being used and their configuration. This is useful for verification and compliance, i.e. make sure resource configurations comply with government regulations. You can also see the history of the resource's configuration. Used AWS Config to see what changed, use CloudTrail to see who changed it. Remediation actions can also be configured.

- _fine-grained visibility into what resources exist and how they are configured_ at any time.
- send notifications whenever resources are created, modified, or deleted without having to monitor these changes by polling
- access historical configurations of resources.
- view how the resource you intend to modify is related to other resources and assess the impact of your change
- view the IAM policy that was assigned to a user, group, or role at any time
- evaluate configurations by establishing AWS Config rules; resources can have the status of compliant, non-complaitn, error or not applicable

##### Inspector

Run security assessments on demand.

> **Amazon Inspector** automatically discovers workloads, such as Amazon EC2 instances, containers, and Lambda functions, and scans them for software vulnerabilities and unintended network exposure.

Amazon Inspector helps to improve security, and compliance of your AWS deployed applications by running an automated security assessment against your infrastructure. Specifically, it helps to check on deviations of security best practices, exposure of EC2 instances, vulnerabilities, and so forth. The service consists of three parts:

1. a network configuration reachability piece,
2. an Amazon agent, which can be installed an EC2 instances, and
3. a security assessment service that brings them all together.

To use it, you configure Inspector options, run the service, out pops a list of potential security issues. The resulting findings are displayed in the Amazon Inspector console, and they are presented with a detailed description of the security issue, and a recommendation on how to fix it. Additionally, you can retrieve findings through an API. In a multi-account organisation, it collects and centralises security data.

##### Artifact

**AWS Artifact** provides access to AWS security and compliance documents, such as AWS ISO certifications, Payment Card Industry (PCI) reports, and Service Organization Control (SOC) reports.. **AWS Artifact Agreements** can be used to sign an agreement with AWS regarding your use of certain types of information throughout AWS services. You can review, accept, and manage agreements for an individual account and for all your accounts in AWS Organizations. **AWS Artifact Reports** provide compliance reports from third-party auditors. These auditors have tested and verified that AWS is compliant with a variety of global, regional, and industry-specific security standards and regulations and remains up-to-date.

##### Misc. standardisation & compliance services

In the **Customer Compliance Center** there are resources to help learn more about AWS compliance. You can also access compliance whitepapers on AWS answers to key compliance questions, overviews of AWS risk and compliance, auditing security checklists.

Use **AWS Audit Manager** to map your compliance requirements to AWS usage data with prebuilt and custom frameworks and automated evidence collection.

#### Protect

Basic protections are built into **security groups** and **ELBs** that protect at the AWS instance, e.g. they can prevent UDP flood DDoD attacks by denying entry of those packets. Security groups operate at the network level like a firewall. **Elastic load balancers** protect against the slow loris attack by waiting for the request to complete before forwarding it.

**AWS Shield** protects your AWS resources from the most common, frequently occurring types of DDoS attacks. AWS Shield provides two levels of protection: Standard and Advanced. **Standard** automatically protects all AWS customers at no cost. As network traffic comes into your applications, AWS Shield Standard uses a variety of analysis techniques to detect malicious traffic in real time and automatically mitigates it. AWS Shield **Advanced** is a paid service that provides detailed attack diagnostics and the ability to detect and mitigate sophisticated DDoS attacks. It also integrates with other services such as Amazon CloudFront, Amazon Route 53, and Elastic Load Balancing. Additionally, you can integrate _AWS Shield with AWS WAF_ by writing custom rules to mitigate complex DDoS attacks.

**AWS Web Application Firewall (WAF)** is a web application firewall that protects against common exploits that could compromise application availability, e.g. from the OWASP list, that compromise security or that consume excessive resources such as SQL injection, and XSS. WAF filters web traffic according to custom rules based on conditions that include IP addresses, HTTP headers and body, or custom URIs. More conveniently block exploits like SQL injection and XSS. Both WAF and shield provide protection at the network level and use machine learning to recognise new threats as they evolve. AWS WAF works together with Amazon CloudFront and an Application Load Balancer using a web access control list (ACL). The WACL can be configures to allow all requests except those from the IP addresses that you have specified.

**Amazon GuardDuty** provides continuous automatic threat detection. It monitors for malicious or unauthorized behaviour in serverless, compute, databases and stores by analyzing continuous streams of metadata generated from your account, and network activity found on AWS CloudTrail events, Amazon VPC Flow Logs, and DNS logs. It uses integrated threat intelligence such as known malicious IP addresses, anomaly detection, and machine learning to identify threats more accurately. The best part is that it runs independently from your other AWS services, so it won't affect performance or availability of your existing infrastructure, and workloads. Automatic responses can be configured.

Amazon GuardDuty is a service that provides intelligent threat detection for your AWS environment and resources. It identifies threats by continuously monitoring the network activity and account behavior within your AWS environment.

#### Encrypt

There are two variants of encryption to consider: encryption at rest and encryption in transit.

Encryption at-rest: For example, using **Amazon Key Management Service (KMS)** for managing the encryption key that is used to encrypt DynamoDB tables automatically. The key policy let's you control when how and who can read the data. KMS is integrated with over 100 AWS services. The difference between CloudHSM dedicates hardware specifically to you so you can create a custom key-store that could then be used by KMS. With AWS KMS, you can choose the specific levels of access control that you need for your keys. For example, you can specify which IAM users and roles are able to manage keys. Alternatively, you can temporarily disable keys so that they are no longer in use by anyone. Your keys never leave AWS KMS, and you are always in control of them. Another example of encryption at rest is when you've applied encryption to the bucket so that data arriving in the bucket is encrypted.

Encryption in-transit: Usually refers to using secure sockets layer, or SSL connections to encrypt data in transit, and we can use service certificates to validate, and authorize a client. Unencrypted data as it is transferred over an HTTPS connection is encrypted. **AWS Certificate**  manages the certs for SSL/TLS.

A best practise is to store, manage and automate rotation of passwords, API keys and tokens for AWS services with **AWS Secrets Manager**. It is meant to work with IAM.

#### Investigate

Find root causes of security issues with **Amazon Detective**. "Amazon Detective automatically collects log data from your AWS resources and uses machine learning (ML), statistical analysis, and graph theory to build a dataset that you can use to conduct more efficient security investigations." Seems to be useful for post-mortems.

Identify sensitive data in s3 buckets with **Amazon Macie**. Amazon Macie is a data security service that discovers sensitive data by using machine learning and pattern matching.

> Macie provides you with an inventory of your S3 general purpose buckets, and automatically evaluates and monitors the buckets for security and access control. If Macie detects a potential issue with the security or privacy of your data, such as a bucket that becomes publicly accessible, Macie generates a finding for you to review and remediate as necessary.
