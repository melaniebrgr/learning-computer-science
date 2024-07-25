# 03 Cloud services

## Amazon web services (AWS)

There are two broad categories of services: self-service and managed (by AWS). Self service like EC2 Reserved Instances use underlying hardware managed by AWS but are fully configurable. Managed services are less configurable and can often be mixed and matched with other services.

AWS Managed Services (AMS) operate AWS on your behalf, providing a secure AWS Landing Zone, features which help you meet various compliance program requirements (HIPAA, HITRUST, GDPR, SOC, ISO, PCI), a proven enterprise operating model, on-going cost optimization, and day-to-day infrastructure management. By implementing best practices to maintain your infrastructure, AWS Managed Services help to reduce your operational overhead and risk. AWS Managed Services automate common activities, such as change requests, monitoring, patch management, security, and backup services, and provides full-lifecycle services to provision, run, and support your infrastructure. AWS Managed Services unburdens you from infrastructure operations so you can direct resources toward differentiating your business.

### Well-architected framework CORPeSS

**Cost**: The cost optimization pillar focuses on avoiding unnecessary costs. Key topics include understanding spending over time and controlling fund allocation, selecting resources of the right type and quantity, and scaling to meet business needs without overspending.

**Operational**: The operational excellence pillar focuses on running and monitoring systems, and continually improving processes and procedures. Key topics include automating changes, responding to events, and defining standards to manage daily operations.

**Reliable**: The reliability pillar focuses on workloads performing their intended functions and how to recover quickly from failure to meet demands. Key topics include distributed system design, recovery planning, and adapting to changing requirements.

**Performance Efficiency** The performance efficiency pillar focuses on structured and streamlined allocation of IT and computing resources. Key topics include selecting resource types and sizes optimized for workload requirements, monitoring performance, and maintaining efficiency as business needs evolve.

**Security**: The security pillar focuses on protecting information and systems. Key topics include confidentiality and integrity of data, managing user permissions, and establishing controls to detect security events.

**Sustainability** The sustainability pillar focuses on minimizing the environmental impacts of running cloud workloads. Key topics include a shared responsibility model for sustainability, understanding impact, and maximizing utilization to minimize required resources and reduce downstream impacts.

### Services

- Authentication, authorization, and security:
  - The shared responsibility model
  - Authentication and authorisation
    - Identity & Access management (IAM)
    - Cognito
    - Security Token Service (STS)
  - Security Matters
    - Config
    - Organizations

- Routing:
  - Regions
  - Route 53
  - Direct connect
  - Private Link
  - Local Zones
  - Wavelength
  - Virtual Private Cloud (VPC)
  - Virtual Private Network (VPN)

- API:
  - API Gateway
  - AppSync
  - Transit Gateway
  - Storage Gateway

- Compute:
  - Elastic Compute Cloud (EC2)
  - Lambda
  - Elastic Container Registry
  - Elastic Container Servive (ECS)
  - Elastic Kubernetes Service (EKS)
  - Fargate
  - App2container

- Compute (specialised):
  - Textract (OCR text extraction)
  - Rekognition (text-from-image detection)
  - Comprehend (sentiment)
  - Translate (lang-to-lang)
  - Polly (text-to-speech)
  - Transcribe (speech-to-text)
  - AI Services
  - Glue Crawler (crawl data stores and populate Glue catalog)
  - Database migration service
  - Glue DataBrew
  - Elastic MapReduce (EMR)
  - Bedrock (AI)
  - Sagemaker (ML model training)

- Compute scaling:
  - Auto Scaling Groups
  - Elastic Load Balancing (ELB)

- App integration:
  - Simple Notification Service (SNS)
  - Simple Queue Service (SQS)
  - Simple Email Service (SES)
  - Simple Workflow Service (SWF)
  - Cloudmap
  - EventBridge
  - Step Functions
  - Batch

- File storage:
  - Elastic Block Store (EBS)
  - Elastic File System (EFS)
  - Simple Storage Solution (S3)
  - Simple Storage Solution Glacier
  - FSx (fully managed file servers)
  - Cloudfront (CDN)

- Databases:
  - DynamoDB
  - Aurora Serverless V2
  - Relational Database Service (RDS)
  - AWS Backup
  - RDS Proxy
  - AWS Backup Vault

- Search
  - OpenSearch Service
  - Athena (SQL search of S3)
  - QuickSight (BI)
  - Elasticache for Redis
  - Kendra

- Data analytics & science
  - Datasync
  - Kinesis Data streams
  - Kinesis Data firehose
  - Managed service for apache flink
  - Lake formation
  - Redshift
  - Quicksight
  - Glue Data Catalog

- Development:
  - Cloud9 (cloud IDE)
  - CodeCommit (repo)
  - CodeBuild (build)
  - CodeDeploy (deploy)
  - CodePipeline (CI/CD)
  - CodeStar (simple CI)
  - CodeArtifact (private and public package management)
  - CodeGuru (static analysis)
  - DevOpsGuru (running app analysis)
  - Device Farm

- Platform services:
  - Amplify
  - Elastic Beanstalk
  - Lightsail

- ✔️ Cloud management:
  - Costs
    - Billing models
    - Consolidated billing
    - AWS cost explorer
    - Pricing calculator
    - Budgets
  - Support
    - Personal Health Dashboard
  Misc.
    - Control tower
    - OpsWorks
    - Systems manager
    - Catalog
    - Servive Health Dashboard
    - Tags
    - CloudFormation
    - Outposts
    - Resource access manager
    - License manager

- Business services:
  - Connect (contact center service)
  - Pinpoint (marketing communications)

- Migration:
  - Migration hub
  - Migration evaluator
  - Application discovery service
  - Application migration service
  - Database migration service

AWS services can be access and configured from the

- Management console
- CLI
- CloudShell (CLI is preinstalled)
- SDK
- API

## Tests

- https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/tree/master/practice-exam

### Practise exam 1

You scored 54 / 65 (83%), wrong questions: 11, 22, 34, 38, 40, 48, 49

### Practise exam 2

You scored 16 / 20 (80%), wrong questions: 9, 12, 13, 20

CloudWatch monitors your AWS resources and the applications that you run on AWS in real time. You can use CloudWatch with AWS CloudTrail to monitor and receive alerts about console sign-in events that involve the AWS account root user.

Trusted Advisor checks security groups for rules that allow unrestricted access to a resource. Unrestricted access increases opportunities for malicious activity, such as hacking, denial-of-service attacks, or loss of data.

support plans: enterprise, business, developer, basic

Correct. Lambda charges are dependent on the number of requests for your Lambda functions.

AWS MGN is an automated lift-and-shift solution. This solution can migrate physical servers and any databases or applications that run on them to EC2 instances in AWS.

Macie is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS.

### Practise exam 3

[practice-exam-1.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-1.md)

You scored 45 / 50 (90%), wrong questions: 8, 18, 19, 31, 36

Which of the following must an IAM user provide to interact with AWS services using the AWS Command Line Interface (AWS CLI)?

You have AWS Basic support, and you have discovered that some AWS resources are being used maliciously, and those resources could potentially compromise your data. What should you do? AWS Support Concierge for enterprise.

Study: migration, support account differences

### Practise exam 4

[practice-exam-2.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-2.md)

You scored 39 / 50 (78%), wrong questions: 7, 9, 16, 22, 32, 33, 36, 37, 44, 48, 49

Amazon Inspector, AWS Trusted Advisor, Amazon CloudWatch, Concierge Support Team, Infrastructure Event Management, AWS Global accelerator, AWS Config, Security Groups, APN Consulting Partners

According to the AWS Shared responsibility model, which of the following are the responsibility of the customer? Protecting the confidentiality of data in transit in Amazon S3, Patching applications installed on Amazon EC2.

Which of the following EC2 instance purchasing options supports the Bring Your Own License (BYOL) model for almost every BYOL scenario? Dedicated Hosts.

In your on-premises environment, you can create as many virtual servers as you need from a single template. What can you use to perform the same in AWS? AMI

### Practise exam 5

[practice-exam-23.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-23.md)

You scored  41 / 50 (82%), wrong questions: 7, 9, 15, 22, 24, 31, 32, 44, 48

"A user is planning to migrate..."

"Which component must be attached to a VPC to enable inbound Internet access?" Internet gateway

"A company has a MySQL database running on a single Amazon EC2 instance. The company now requires higher availability in the event of an outage.
Which set of tasks would meet this requirement?" Migrate to Amazon RDS and enable Multi-AZ

"Under the AWS shared responsibility model, which of the following is the customer's responsibility?" Patching guest OS and applications

"What is the customer's responsibility when using AWS Lambda?" Code encryption

OpsWorks, Amazon Connect, PCI-compliant workload, AWS Trusted Advisor, Macie, AWS Personal Health Dashboard, AWS Direct Connect, AWS Config rules, AWS Transit Gateway (VPC)

<https://d0.awsstatic.com/whitepapers/overview-of-deployment-options-on-aws.pdf>

### Practise exam 6

[practice-exam-22.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-22.md)

You scored 44 / 50 (88%), wrong questions: 1, 13, 18, 22, 32, 45

What is the recommended method to request penetration testing on AWS resources?

Which components are required to build a successful site-to-site VPN connection on AWS? (Choose two.)

Internet gateway, ~~NAT gateway~~, ~~Customer gateway~~, ~~Transit gateway~~, ~~Virtual private gateway~~, AWS Security Bulletins, Amazon Elastic Block Store, AWS Simple Monthly Calculator

Which of the following allows AWS users to manage cost allocations for billing? Tagging resources.

Which requirement must be met for a member account to be unlinked from an AWS Organizations account? The member account must meet the requirements of a standalone account.

Which AWS tools automatically forecast future AWS costs? Cost Explorer

A user has a stateful workload that will run on Amazon EC2 for the next 3 years.
What is the MOST cost-effective pricing model for this workload? Reserved Instances ( < Dedicated Instances)