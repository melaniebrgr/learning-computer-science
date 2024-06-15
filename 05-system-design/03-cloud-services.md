# 03 Cloud services

## Cloud Computing

Cloud computing is the on-demand delivery of IT resources and capabilities over the internet
There are a number of cloud computing service providers, such as AWS, Azure, and GCP, which own and operate their own IT infrastructure.
Typically we don't rent a whole machine, but a "slice" of a server, e.g. EC2.

With on-premises IT you have complete control and responsibility over the physical hardware and software running on the machine. However you are responsible for capacity planning and upgrading, securing, and handling infrastructre outages. Having too much or too little capacity is a common problem, and typically you do no have the elasticity to handle large events.

By contrast cloud computing providers manage the underlying infrastructure, have datacenters around the globe for redundancy, and to choose the best location for users, and offer service guarantees (SLAs).
Rapid, on-demand elasticity, and scalability are cloud features.

There are three main cloud computing service models:

1. infrastructure as a service (IaaS) e.g. EC2,
2. platform as a service (PaaS), e.g. elastic beanstalk, and
3. software as a service (SaaS) e.g. Salesforce, Dropbox, Gmail, Facebook.

There are three cloud deployment models: private, public and hybrid. In a private cloud you own and operate your own datacenter and have total control over the stack. The biggest reason for doing so is security. A public cloud can offer economies of scale and elasticity. A hybrid cloud, of course, is a combination of both.

## Amazon Web Services (AWS) services

### Regions and availability

AWS services can either be global or regional. For example, Route 53, CloudFront, and IAM are global. You don't want to configure these in different regions. However, the majority of services are regional. For many services, you can select the region to deploy to. Pricing, service offerings, legal concerns, and proximity to users vary between regions.

A "region" is a physically isolated geographical area (~100 miles apart) with a cluster of at least three 3 (or more) availability zones (AZs). An AZ contains 1 or more datacenters that are also physically seperated (~2 miles apart) and have their own power source. Resources are launched into AZs. If one AZ has an outage it can fail over to another AZ. Although they are physically isolated, regions and AZs have a direct, low-latency, global network connecting to each other.

Health of services used by your account can be observed from the service health dashboard. A general overview of all service health around the world can also be viewed.

### Service types

There are two broad categories of services: self-service and managed (by AWS). Self service like EC2 reselved instances use underlying hardware managed by AWS but are fully configurable. Managed services are less configurable and can often mixed and matached with other services.

EC2 Reserved Instances (RI) provide a significant discount (up to 72%) compared to on-demand pricing and provide a capacity reservation when used in a specific Availability Zone. The following types of RI are available: Standard RIs: These provide the most significant discount (up to 75% off On-Demand) and are best suited for steady-state usage. Convertible RIs: These provide a discount (up to 54% off On-Demand) and the capability to change the attributes of the RI as long as the exchange results in the creation of Reserved Instances of equal or greater value. Like Standard RIs, Convertible RIs are best suited for steady-state usage. Scheduled RIs: These are available to launch within the time windows you reserve. This option allows you to match your capacity reservation to a predictable recurring schedule that only requires a fraction of a day, a week, or a month.

AWS Managed Services (AMS) operates AWS on your behalf, providing a secure AWS Landing Zone, features which help you meet various compliance program requirements (HIPAA, HITRUST, GDPR, SOC, ISO, PCI), a proven enterprise operating model, on-going cost optimization, and day-to-day infrastructure management. By implementing best practices to maintain your infrastructure, AWS Managed Services helps to reduce your operational overhead and risk. AWS Managed Services automates common activities, such as change requests, monitoring, patch management, security, and backup services, and provides full-lifecycle services to provision, run, and support your infrastructure. AWS Managed Services unburdens you from infrastructure operations so you can direct resources toward differentiating your business.

### Billing and pricing

There are three pricing models: in advance, subscription and on demand. For example, you can pay on demand, for a dedicated instance that does not share resources with anyone else, for a spot instance, or for a reserved instance (RI) for a 1 or 3 year term. On demand is by far the most common. With on demand you pay only for what you use, and it varies depending on the service, the region, and the type of infrastructure. AWS has a pricing page for each service, and pricing calculator to explore costs. A free tier is generally available to new AWS users.

There are three things you tend to pay for on AWS:

1. pay for computation (time, e.g. EC2),
2. pay for storage space used (S3), and
3. pay for data outbound.

Expenses are monitored from the billing dashboard, where budgets can also be set to be notified of cost overages. Each services has different limits or quotas that can be increased on request. Tags can be attached to AWS resources, and can be inherited from other resources, e.g. Cloud Formation Resource groups can be used to group resources with the same tags. Cost allocation Tags are a useful way of tracking resource costs.

**AWS Cost Explorer** is a free tool that can be used to view past cost data and future projections. A set of default reports is provided the can be further filtered, e.g. cost per EC2 instance type per month. The AWS Pricing Calculator can useful to plan costs before committing to services. The AWS Total Cost of Ownership (TCO) Calculator is for comparing on premises costs to cloud costs.

**AWS Budgets** allows you to set custom budgets to track your cost and usage from the simplest to the most complex use cases. With AWS Budgets, you can choose to be alerted by email or SNS notification when actual or forecasted cost and usage exceed your budget threshold, or when your actual RI and Savings Plans' utilization or coverage drops below your desired threshold.

There are four different **support plans**:

1. Basic - access to forums only
2. Developer - email support during business hours, one person can open unlimited cases with <12 h response time for some system impairment
3. Business - email, chat, phone support 24h, unlimited people can open unlimited cases with <12 h response time for some system impairment, <4 h for production system impairment, <1 h for prod is down
4. Enterprise - email, chat, phone support 24h, unlimited people can open unlimited cases, with <12 h response time for some system impairment, <4 h for production system impairment, <1 h for prod is down, < 15 min for business cirtical system down. Only enterprise gets a TAM, training and account assistance.

If you have multiple AWS accounts they can be consolidated with **AWS Organizations**. The Paying account is where the bills get paid, so that you get one bill, far all the linked accounts services. The combined usage enables shared volume discounts. There is no extra fee for AWS Organizations. Service Control Policies (SCP) can be attached to individual organizations to control or limit what administrators of those organizations can do.

### Services

- Authentication, authorization, security:
  - ✔️ _The shared responsibility model_
  - ✔️ Identity & Access management (IAM)
  - ✔️ Cognito
  - ✔️ Security Group
  - ✔️ Security Token Service (STS)
  - Key Management Service (KMS)
  - Secrets Manager

- Routing:
  - Route 53
  - API Gateway
  - Storage Gateway
  - Web Application Firewall (WAF)
  - ✔️ Direct connect
  - RDS Proxy
  - Transit Gateway

- Compute:
  - ✔️ Elastic Compute Cloud (EC2)
  - ✔️ Lambda
  - ✔️ Lightsail

- Scaling compute:
  - AWS Auto Scaling Groups
  - Elastic Load Balancing (ELB)
  - Elastic Container Registry
  - Elastic Container Service (ECS)
  - Elastic Kubernetes Service (EKS)
  - Fargate
  - Amplify

- Jobs:
  - Textract (OCR text extraction)
  - Rekognition (text-from-image detection)
  - Comprehend (sentiment)
  - Translate (lang-to-lang)
  - Polly (text-to-speech)
  - AI Services
  - Glue Crawler (crawl data stores and populate Glue catalog)
  - Database migration service
  - Macie (PPI checker)
  - Glue DataBrew
  - Elastic MapReduce (EMR)
  - Sagemaker (ML model training)
  - Bedrock (AI)

- Storage:
  - Relational Database Service (RDS)
  - DynamoDB
  - Aurora Serverless V2
  - Elastic Block Store (EBS)
  - Elastic File System (EFS)
  - FSx (fully managed file servers)
  - Simple Storage Solution (S3)
  - Simple Storage Solution Glacier
  - Cloudfront (CDN)
  - AWS Backup
  - AWS Backup Vault
  - CodeCommit
  - Glue Data Catalog

- Search:
  - OpenSearch Service
  - Athena (SQL search of S3)
  - QuickSight (BI)
  - Kendra
  - Elasticache for Redis

- Latency management:
  - Regions
  - AWS Local Zones
  - AWS Wavelength

- Workflow management:
  - Simple Notification Service (SNS)
  - Simple Queue Service (SQS)
  - Step Functions
  - Systems Manager
  - Config

- Cloud management:
  - Virtual Private Cloud (VPC)
  - Virtual Private Network (VPN)
  - Outposts Family
  - Organizational Unit
  - Organizations
  - App2container

- Cloud monitoring:
  - Cloud Map
  - Cloudtrail
  - CloudWatch
  - Config (evaluates AWS config)
  - GuardDuty (threat monitoring and detection)

- Data transfer:
  - Datasync
  - EventBridge (ingests and routes app data)
  - Kinesis Data streams
  - Kinesis Data firehose
  - Managed service for apache flink

- Data management:
  - Lake formation
  - Redshift
  - Quicksight

- People management:
  - Connect (contact center service)
  - Pinpoint (marketing communications)

- Coding:
  - Cloud9
  - CodeStar
  - CodePipeline
  - CodeBuild (build a repo)
  - CodeDeploy (deploy a build)
  - Device Farm

- Migration management
  - Migration hub
  - Migration evaluator
  - Application discovery service
  - Application migration service
  - Database migration service

### Configuring services

AWS services can be access and configured from

- Management console
- CLI
- CloudShell (CLI is preinstalled)
- SDK
- API

### Authentication, authorization, security

#### The shared responsibility model

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

#### Identity and access management (IAM)

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

#### Cognito

Is an identity and access management (IAM) platform that provides user authentication (sign up and sign in) via social and identity providers.

#### Security group

A security group is like a firewall that can be attached to an instance that limits internet traffic to the instance. Put another way, security groups are a virtual firewall applied at the instance level controlling outbound and inbound traffic.

#### Network access control list

Network access control lists (ACLs) are firewalls applied at the subnet level of the VPC. Every instance has a private IP address and if it's in a public subnet it will have a public address. When the instance is stopped and restarted it will lose and get a new public IP. If you don't want to lose the public IP, you can create a permanent elastic IP.

#### Security Token Service (STS)

STS is a global amazon service for requesting temporary, limited-privilege credentials for IAM or federated users. Federated users (external identities) are users you manage outside of AWS in your corporate directory, but to whom you grant access to your AWS account using temporary security credentials.

### Routing

#### Direct Connect

A direct, private network connection is also possible. **AWS Direct Connect** can be used as an alternative to connecting to a VPC via the internet and it enables a hybrid cloud architecture. An AWS Direct Connect connection is a private, dedicated link to AWS. Direct Connect has a higher bandwidth compared to a managed VPN, but takes weeks to months to setup and is much more expensive. As it does not use the internet, performance is consistent.

### Compute

### Elastic compute cloud (EC2)

Renting a virtual remote server is probably AWS' most important service. With EC2 you have full control over the image, the hardware specs and you can install any software needed. If you want certain commands to run after launching an EC2 instance, e.g. that starts a web server, they can be entered into the "user data" text field for convience, or you can SSH or use EC2 connect to access instance to install or execute code afterward. The instance can be also updated through a REST API. Instance metadata, such as the instance ID, can be accessed over HTTP after the instance is created. Security groups can be attached to a EC2 instand in order to control network access. EC2 is well-suited for a long running, traditional applications.

Servers comprise both physical hardware (CPU, RAM, disk, NIC) and an operating system (Linux, MacOS, Windows) and when you set up an EC2 instance you need to select both and the region they are located in (cost can vary per region). To elaborate, an EC2 virtual server is launched using a **Amazon Machine Image (AMI)** on Amazon hardware. An AMI is an **Elastic Blockstore Snapshot (EBS)** with Windows or Linux preinstalled, and includes all the necessary information to launch an instance. There are three categories of AMIs / EBS snapshots: community (free), marketplace (pay to use), my AMIs (own custom). There are many different instance types of AMIs to choose between that are optimised for different purposes, e.g. more memory, more storage or general purpose. Note when setting up an EC2 instance you don't rent an entire server but an isolated slice of a specific physical machine that is fully isolated and has dedicated hardware.

There are 4 EC2 pricing models:

- on demand instances (most common) =  pay per use
- spot instances (left over instances that can be reclaimed whenever) = discounts
- savings plan (committing to compute 1 or 3 years in advance) = discounts
- reserved instances (pay for instance configurations 1 or 3 years) = discounts

#### Lambda

Lambda is a "serverless" service because you can run code without configuring or managing any servers explicitely at all--you just write the code and set the trigger for when the code should execute. Often multiple serverless tasks need to be combined for a workload. It is a "function as a service" (FaaS). The lambda is executed as needed and scales automatically based on demand. Lambdas are well-suited for ETL, data-validation, and mobile back-ends. Examples of lambda applications:

1. write entries to a Cloudwatch log service
2. resizing images and moving them into a different bucket
3. send a CloudWatch entry when a user writes an update to a DynamoDB

#### LightSail

Amazon LightSail is a compute service for people who do not have expert AWS knowledge. It allows you to quickly spin up pre-configured virtual servers. VPCs, subnets and other details do not need to be configured. It simplifies things and allows quick launch of instances and databases.

### Scaling compute

Containers are "packages of code and all their execution requirements", e.g. OS, softare. The contaners can be deployed to any environment that support containers. Environments that are preconfigured to support containers and not the app itself directly are **Elastic container service** and **Elastic kubernetes service**.

#### Elastic Load Balancing

A load balancer is a device that is internet facing and has a single endpoint that redistributes incoming client requests to different servers based on some algorithm. **Elastic Load Balancing (ELB)** is an Amazon load balancing service. It also sends health checks to the servers and if one fails to respond in time, it knows to route additional requests to different servers. Load balancers help ensure availability. AWS has three different kinds of ELB: application, network and classic. Classic is being phased out. Application inspects domain names and forwards requests accordingly. Network load balances work at the TCP/UDP/TLS protocol level.

#### Auto Scaling

Loading balancing determines where the load is distributed, whereas auto-scaling adjusts the number of servers able to take load. For example if an instance fails a health check, or if the cloud watch monitoring service detects that CPU usage is above a certain threshold in an **AWS Auto Scaling Group**, new instances are spawned. A scaling plan defines the triggers for when a new instance should be de/provisioned.

### Storage

There are three types of storage service: object (S3), block (EBS), and file (EFS). In **Amazon Simple Storage Service (S3)** everything is an object (an object can be thought of as a file), and objects are uploaded into buckets. It can be a publicly accessible service. S3 can be connected to from a browser over the public internet, accessed via a REST API (get, put, post, delete), and from EC2 over the internet or an S3 Gateway endpoint. If you are accessing S3 from EC2, the best practise way is to create an IAM role with a policy granting access. This is preferred over storing your secret access key on the EC2 instance. Because it is a universal namespace, bucket names must be unique globally, however, buckets exist in a specific region. In total, a S3 object contains the data itself, metadata, and a global unique identifier. Metadata can include a key, version ID, value (the file content itself), metadata, sub-resources, access control information, and more. Use cases for S3 include: backing up of data, web app hosting, media hosting, and software delivery by download.

There are 6 Amazon S3 storage classes. All share 11 9's of durability but vary slightly in other aspects of availability, zones, fees, and latency.

- standard: durable, immediately available and frequently accessed
- intelligent tiering: automatically moves data to most cost effective tier for usage pattern
- standard-IA: designed for when you don't need to access often
- one zone-IA: only available in one zone, every other class is available in 3 or more zones. designed for when you don't need to access often (even lower availability)
- glacier: for archival data that needs to be backed-up longterm but doesn't need to be accessed often
- glacier deep archive: lowest cost storage and will take longest to retrieve data

Features of S3:

- you can use CloudFront to accelerate data upload,
- you configure S3 so that the requester, not you, pays for data transfer,
- tags can be assigned that can be leveraged in billing,
- events can be set on buckets that trigger lambdas,
- it can be used to host static websites,
- it can be used for bit torrenting (object can be retrieved by bit torrent),
- versioning can be configured. With S3 versioning enabled you can still access each file version, even deleted files.
- S3 can be set up to replicate objects across regions (CRR) or in the same region (SRR). Versioning needs to be enabled on the bucket for this. Note, objects replicated across regions don't need to use the same storage class.

**Elastic block storage (EBS)** is similar to a hard drive or solid state drive. An EC2 instance can mount an EBS volume. EBS is a volume that can be attached to an EC2 instance but exists independently from it. If the instance is shut down EBS is not shut down unlike instance store volumes. Instance store volumes are physically attached the host computer the EC2 instance runs on, while EBS is accessed over a network. EBS must exist in the same region as the instance using it and cannot be shared between instances. There are two main categories: solid state drive (SSD) provisioned and general purpose which has better performance (better for databases), and hard disk drives (HDD) for less frequently accessed work loads. For custom AMIs, EBS snapshots can be created in S3. These are basically point-in-time diffs of the EBS volume. The snapshots can be access through EC2 APIs and used to migrate instances to different availability zone, as part of a high-availability architecture.

**Elastic file system (EFS)** is a relatively new service and is a great solution for when you want to share data between EC2 instances (unlike EBS) and can be shared between different availability zones in a regions and even on premises clients. With EFS a file system can be mounted to some mount point on an EC2 instance. The file system is mounted via a protocol, e.g. NFS over the internet.

**AWS Storage Gateway** is for on premises cloud storage (like a Google Drive). It gives you a local, low-latency cache. There are three types: Tape, File and Volume Gateway.

#### AWS Databases

A SQL database in the cloud can be set up using **Amazon Relational Database Service (RDS)**. RDS uses EC2 and you can select the flavour of SQL: Oracle, MariaDB, MySQL, PostgreSQL, Amazon's own Aurora, or other. Data can be encrypted and snapshoted. It is possibly to have Multi-AZ replicas for fault tolerance or better read performance. There are two types of relational databases: online analytical processing (OLAP) used for business intelligence and online transactional processing (OLTP), used for e.g. banking. Amazon also offers DynamoDB, a NoSQL database.

**ElastiCache** does in-memory caching and is used to improve latency for read or compute-heavy application workloads. (It's faster because it's in memory and not on disk.) It runs on EC2. There are two types of engines: Memcached (simplest, more elasticity) or Redis (supports encryption (HIPAA), numerous reliability features).

### Content Delivery, DNS Services and Routing

A domain name system (DNS) is responsible for resolving the domain names we enter in a browser to an internet protocol (IP) address of the instance where the web service might run. **Route 53** is a DNS that can also do domain name registration. Route 53 can create different kinds of records:

- A (name to IP)
- CNAME, or canonical name (name to another name)
- MX (mail)

Route 53 can direct to different IP addresses based on different policies. A simple routing policy does a simple mapping, a weighted routing policy will route to an IP address depending on the weighting assigned to it, a latency routing policy will route based on geographic proximity, a failover routes depending on a health check. This is how multi-region load balancing is possible. (Load balancers can only span one region).

**Web Application Firewall (WAF)** filters web traffic according to custom rules based on conditions that include IP addresses, HTTP headers and body, or custom URIs. More conveniently block exploits like SQL injection and XSS.

**AWS API Gateway** is a "front door" to an application. API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management. It is useful for building REST and WebSocket APIs.
API Gateway supports containerized and serverless workloads, as well as web applications.

**Cloudfront** is a content delivery network (CDN) that lets you store/cache content in "edge locations" all over the world (both the larger regional edge caches and the global edge locations), improving request latency. It also offers some protection against DDoS attacks.

**Global Accelerator** is a new AWS service that connects local and global users over the AWS global network, not the internet, and directs traffic to the closet region and providing automatic failover if there is a problem. The Edge locations point to different server instances. It's more akin to a load balancer than Cloudfront, which is more strictly about better performance. "AWS Global Accelerator is a networking service that sends your user’s traffic through Amazon Web Service’s global network infrastructure, improving your internet user performance by up to 60%. When the internet is congested, Global Accelerator’s automatic routing optimisations will help keep your packet loss, jitter, and latency consistently low."

### Cloud management

#### Amazon Virtual Private Cloud (VPC)

Amazon Virtual Private Cloud (VPC) is an isolated virtual network — your own datacenter — in the AWS cloud. A VPC spans all availability zones in a region. The goal of a VPC is best understood by example. Imagine a scenario where there multiple EC2 instances that should be grouped and be able to talk to each other, but should not be able to be connected to via the internet. A tag could be used to group instances, but what a VPC provides is networking configuration at the group level.

Networking is achieved but setting up subnets within a VPC. It's a the subnet level that control connectivity / network access is set: public subnets have public connectivity, private subnets are not connected to the internet. Each subnet can be placed in a different AZ. All subnets can still speak to each other. A public subnet is connected to the internet with an Internet Gateway. (An internet Gateway is a connection to the public internet.) A NAT gateway can be set, so that public subnets can speak to private ones. A router directs traffic between the subnets and the Internet Gateway. A secure VPN connection can be made between the Internet and Customer Gateways.

A VPC has a collection of IP addresses associated with it, and subnets have a subset of those. **Network Address Translation (NAT)** Gateway can be created in a public subnet that communicates with an EC2 instance in a private subnet and with the Internet Gateway. The same problem can be similarly solved by a NAT Instance but it is self managed. **AWS Transit Gateway** is a way to connect multiple VPCs through a central hub. It avoids complex peering relationships (1:1 connections0. Data is encrypted--it is not the public internet.

### Cloud monitoring

#### Amazon CloudWatch

Collects metrics from other services (performance monitoring), e.g. EC2 CPU utilisation, etc. Alarms can be set on CouldWatch that trigger a response when certain thresholds are met, such as a notification or remediation. It is a regional service. Use CloudWatch to configure alarms that deliver a notification when activated. The alarms can use cost metrics that trigger the alarm when a certain amount of spend has been reached.

CloudTrail is an auditing service, it logs all API activity for an AWS account (regardless of whether it's through the console or CLI), to an S3 bucket so you can diagnose what happened.

### Automation and Platform Services

**CloudFormation** is similar to TerraForm in that you specify your environment as code (JSON, YAML), and AWS uses it to provision services. **AWS Elastic Beanstalk** is a PaaS; you deploy your code and AWS takes care of deploying the web application. You don't have to worry about EC2, auto-scaling, elastic load balancing, or the development environment. Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS. You can simply upload your code and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto-scaling to application health monitoring. At the same time, you retain full control over the AWS resources powering your application and can access the underlying resources at any time.

**Amazon Elastic Container Service (ECS)** provides infrastructure for launching docker containers. It's a containers as a service (CaaS). There are two different ECS launch types: EC2 which is manually managed, and **Amazon Fargate** which is  automatically managed, e.g. provisions based on demand and upgrades automatically. ECS/Fargate is well-suited for microservices.

### Migration and Transfer Services

AWS offers tools for migrating on premises databases, servers and file servers to the cloud, e.g. AWS Migration Hub, AWS Database Migration Service, Server Migration Service, and Datasync. You can migrate databases homogeneously (Oracle to Oracle) or heterogeneously (Oracle to Amazon) with Database Migration Service. You can migrate servers with Server Migration Service,. Under the hood the server volumes are replicated in EBS and used to save an AMI which is then used to launch an EC2 instance. With Datasync filesystems can be migrated over TLS to S3, FSx (Windows specific), or EFS. AWS Migration Hub, is useful for planning the migration process and viewing their status.

### Application Integration
  
There are a four AWS services that are used to connect applications with each other, i.e. are used for the purpose of integrating applications in a decoupled architecture:

#### 1. Amazon Simple Notification Service (SNS)

sends notification to a Topic for an _app/EC2/CloudWatch (publisher)_ to communicate with _lambda/email/SQS or other application (subscriber)_. It enables a pub/sub model. Notifications are sent two ways, A2A and A2P. A2A provides high-throughput, pushed based, many-to-many messaging between distributed systems, microservices, and event driven serverless applications. The applications include SQS, Amazon Kinesis Data Firehose, Lambda, abd other HTTPS endpoints. A2P helps send messages to customers with SMS texts, push notifications, and email.

#### 2. Amazon Simple Queue Service (SQS)

is useful in cases where data cannot be processed quickly enough for example. Messages can be placed in a queue and a separate service polls the queue periodically. It's a hosted service used to enable distributed/decoupled applications. A SNS Topics and SQS can be strung together.

#### 3. Amazon Simple Workflow Service (SWF)

enables automation of workflows that may have a human component. It is less preferred than the newer Step Functions.

#### 4. Step Functions

are used to coordinate components of applications in a workflow. You can defines the sequences in a step, e.g. in a situation where a number of lambda functions should operate in sequence. It has a visual editor and output that shows the steps and status.

#### Amazon Simple Email Service (SES)

is a cost-effective, flexible, and scalable email service that enables developers to send mail from within any application. Not geared towards applicatioin integration however. This service is used for sending email but not SMS text messages.

### Management and Governance

Assess, audit and evaluate service configuration with AWS Config. It provides an inventory of the resources being used and the configuration they are using for verification and compliance, i.e. make sure resource configurations comply with government regulations. You can also see the history of the resource's configuration. Used AWS Config to see what changed, use CloudTrail to see who changed it. Remediation actions can also be configured.

Misc. management services:

- AWS OpsWorks gives you a managed implementation of Chef and Puppet, useful for patching, updating, and backing up. It's used for EC2 management.
- AWS Systems Manager provides a resource overview: you can group and visualise resources.
- AWS Trusted Advisor provides advice for resource management. Trusted Advisor checks help optimize your AWS infrastructure, increase security and performance, reduce your overall costs, and monitor service limits. AWS Trusted Advisor checks security groups for rules that allow unrestricted access (0.0.0.0/0) to specific ports. Unrestricted access increases opportunities for malicious activity (hacking, denial-of-service attacks, loss of data). The ports with highest risk are flagged red, and those with less risk are flagged yellow. Ports flagged green are typically used by applications that require unrestricted access, such as HTTP and SMTP.

- AWS Catalog allows you to curate a list of approved services a company is allowed to use. Helps observe governance and compliance. You can also set budget constraints.
- AWS Personal Health Dashboard shows any operational/availabilities issues with your AWS resources. The dashboard displays relevant and timely information to help you manage events in progress, and provides proactive notification to help you plan for scheduled activities. With Personal Health Dashboard, alerts are triggered by changes in the health of AWS resources, giving you event visibility, and guidance to help quickly diagnose and resolve issues.
- Servive Health Dashboard shows current information on services, but is not specific to your resources. It's a quick look at what's going on right now.

### Machine Learning

#### AWS Rekognition

is a service for identifying objects within images or video (computer vision). It requires no knowledge of AI/ML. You can use it to

- list of objects in an image with percent confidence rating, e.g. people, text, nsfw
- analyse facial expressions and count people
- identify celebrities

#### Amazon Transcribe

is used for transcribing speech to text, it has an API that can be called and used in applications. Amazon translate translates text to different languages and has an API. Amazon Polly turns text to speech. Amazon Macie uses ML to identify PI and PHI in your S3 buckets.

### Analytics

Analyze datasets on Amazon S3 with Amazon Athena. You can write queries in SQL, and Athena uses Glue, which contains information about the schemas and databases the queries are being made against. Glue is an extract, transform and load (ETL) service. Amazon Elastic Map Reduce (EMR) is a web service that enables businesses, researchers, data analysts, and developers to easily and cost-effectively process vast amounts of data. EMR utilizes a hosted Hadoop framework running on Amazon EC2 and Amazon S3. Kinesis is a way to collect, process and analyse real-time streaming data, or small amounts of data that are being updated with high-frequency over time. Amazon QuickSight is trying to take the role of a data scientist: extract business insights from your data. In summary: for data at rest consider Athena, EMR, and QuickSight to answer questions about your data and extract business insights respectively. For data in transit use Kinesis.

## References

- <https://cardclash.skillbuilder.aws/> Fun!
- <https://aws.amazon.com/training/digital/aws-cloud-quest>
- <https://pro.academind.com/courses/aws-cloud-practitioner-clf-c01-complete-aws-introduction>
- <https://aws.amazon.com/certification/certified-cloud-practitioner/>