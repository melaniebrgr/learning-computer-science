# 03 cloud services

## AWS authentication, authorization and security

- ✔️ The shared responsibility model
- ✔️ Identity & Access management (IAM)
- ✔️ Cognito
- ✔️ Security Group
- ✔️ Security Token Service (STS)
- ✔️ Key Management Service (KMS)
- ✔️ Macie (PPI checker)

### The shared responsibility model

AWS is responsible for what it can control: physical machines, infrastructure, managed services. You are responsible for what you can control: account and access, applications. Use secure credentials, and multi-factor authentication (MFA).

The shared responsibility model defines the lines of responsibility between the customer and Amazon. Amazon is responsible for the physical hardware and the software that runs on top of it. The customer is responsible for the data itself including encryption of data and network traffic. If they're running OSs on computer services they are responsible for that.

"AWS operates, manages and controls the components from the host operating system and virtualization layer down to the physical security of the facilities in which the service operates. The customer assumes responsibility and management of the guest operating system (including updates and security patches), other associated application software as well as the configuration of the AWS provided security group firewall." Responsibilities vary depending on the services used.

- Educate: For information about AWS' security and compliance use AWS Artifact.
- Automate (compliance assessment): For automated security compliance assessments of software and networks use Amazon Inspector.
- Protect: AWS WAF is a web application firewall that protects against common exploits that could compromise application availability, compromise security or consume excessive resources.
- Protect: AWS Shield protects against DDoS attacks. there is standard (available by default) and advanced which can provide more details about an attack.
- Monitor: Amazon GuardDuty monitors for malicious or unauthorized behaviour by monitoring CloudWatch, VPC and DNS logs.
- Encrypt: An example of encryption is transit is SSL. Data even if it is unencrypted as it is transferred over an HTTPS connection is encrypted. AWS Certificate can be used to manage the certs for SSL/TLS. An example of encryption at rest is when data arrives in your bucket and you've applied encryption to the bucket the data will be encrypted.
- Encrypt: Amazon Key Management Service KMS and CloudHSM helps manage the keys that are used to encrypt data at rest. The difference is that KMS is multi-tenant where CloudHSM dedicates hardware specifically to you.
- Automate (key management): A best practise is to store and automate rotation of passwords, API keys and tokens AWS services with AWS Secrets Manager.

MFA can consist of two or more of

1. something I know, e.g. password
2. something I have, e.g. mobile device with Google Authenticator (virtual MFA), or USB (physical MFA)
3. something I am, e.g. fingerprint or other biometric data

It's a best practise know for all privileged accounts to have MFA set up.

### Identity and access management (IAM)

Identities are the entities that are allowed or not allowed to so something (the "who"). Access management refers to the permissions that are granted or not granted (the "what"), which is managed with policies.

IAM users are seperate users created with generally more limited permissions. There are 4 IAM types: root, users, users groups and roles.
A root user has "super user" powers and should never be shared or used for day-to-day activities. Instead, create users and enable MFA for them, for example an admin account for billing. A user entity is typically created and assigned to everyone who accesses the AWS account. Users can be assigned to groups to share permissions. Roles are typically assigned to services so that they can perform tasks.

A user represents a single person or a service a.k.a "service accounts". Each user has an Amazon Resource Name (ARN). Users can be assigned a key ID and a secret access key so that they can log in programmatically in addition to logging in through a software interface with the standard username and password. A best practise is to create an individual account per user, i.e. do not reuse credentials between individuals. By default users have no permissions and must be given some to do anything. Use the principle of least privilege when assigning permissions.

Groups are a collection of users that collectively perform a similar job role, e.g. developers. A group can also have a specifically policy attached to it.

A role is used to give amazon resources permissions to other amazon resources without having to configure a user name or password for it. It's a convenient and more secure way of giving for example, an EC2 instance access to an S3 bucket. Put another way, it's a way of delegating permissions to users and services without using permanent credentials that are stored on the resource. When resources assume a role they get temporary credentials to make API calls.

There are three authentication methods:

1. Access key (ID and secret), for programmatic access. If a key is compromised it can be disabled.
2. IAM (username and password), for AWS console access. You can require users to reset their passwords.
3. Signing certificate (SSL/TLS) is available for some services and should be managed through the AWS Certificate Manager.

To set permissions for a user you can add them to an existing group, copy over permissions from an existing user, or attach built-in or custom policies. Policies group permissions together. By default, no permissions are granted to a user. Note that in case of clash of policy permissions, e.g. Policy A "allows EC3 read" and Policy B "Denies all EC2 access" the least permissive option wins, that is that user with both policies attached will not have EC2 access.

Policies are JSON documents that define the permissions for a user, group or role. It can be defined through the management console and can contain conditional statements, like IP address restrictions. The policy simulator can be used to test the effects of a policy.

### Cognito

Cognito is a managed authentication service for the users of your applications. (The IAM service is to manage users for the AWS account, not the product you are building.) User pools are created credential requirements, authentication experience and configured for them. The users pools are then integrated in the application. Social signs can also be set up with federated identity pools.

### Security Matters

Account protection:

- issues: compromised accounts, malicious employee usage, insecure cross-acount usage, non-standard service usage
- services: IAM (access advisor, access analyser), SSO, CloudTrail, GuardDuty, Organizations, Artifact, Config, Audit

Application protection:

- issues: software vulerabilities, insecure configurations, incident analysis
- services: Inspector, Detective

Network protection:

- issues: malicious traffice, DDoS attacks
- services: WAF, Network Firewall, Firewall Manager, Shield, Shield Advanced

Data protection:

- insecure/unencrypted data, credential leaks, data breaches or exposure
- services: KMS, CloudHSM, Secrets Manager, ACM, Maci, Security Hub

### Security groups

A security group is like a firewall that can be attached to an instance that limits internet traffic to the instance. Put another way, security groups are a virtual firewall applied at the instance level controlling outbound and inbound traffic.

- A firewall for a single EC2 instance
- Checks incoming and outgoing requests and periodically blocks
- "Stateful" response are always allowed if the request was
- There can be multiple security groups for an instance

### Network access control list (NACLs)

Network access control lists (NACLs) are firewalls applied at the subnet level.

- A firewall for a subnet
- Checks incoming and outgoing requests and periodically blocks
- "Stateless" requests and responses are decoupled
- One NACL per subnet

### Security Token Service (STS)

STS is a global amazon service for requesting temporary, limited-privilege credentials for IAM or federated users. Federated users (external identities) are users you manage outside of AWS in your corporate directory, but to whom you grant access to your AWS account using temporary security credentials.
