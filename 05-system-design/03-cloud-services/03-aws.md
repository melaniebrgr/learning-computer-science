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

- ✔️ Authentication, authorization, and security:
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

- ✔️ API:
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

- ✔️ File storage:
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

### Practise exam 1

You scored 54 / 65 (83%), wrong questions 11, 22, 34, 38, 40, 48, 49