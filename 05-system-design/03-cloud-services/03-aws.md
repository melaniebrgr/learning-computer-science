# 03 Cloud services

## Amazon web services (AWS)

There are two broad categories of services: self-service and managed (by AWS). Self service like EC2 reselved instances use underlying hardware managed by AWS but are fully configurable. Managed services are less configurable and can often mixed and matached with other services.

EC2 Reserved Instances (RI) provide a significant discount (up to 72%) compared to on-demand pricing and provide a capacity reservation when used in a specific Availability Zone. The following types of RI are available: Standard RIs: These provide the most significant discount (up to 75% off On-Demand) and are best suited for steady-state usage. Convertible RIs: These provide a discount (up to 54% off On-Demand) and the capability to change the attributes of the RI as long as the exchange results in the creation of Reserved Instances of equal or greater value. Like Standard RIs, Convertible RIs are best suited for steady-state usage. Scheduled RIs: These are available to launch within the time windows you reserve. This option allows you to match your capacity reservation to a predictable recurring schedule that only requires a fraction of a day, a week, or a month.

AWS Managed Services (AMS) operates AWS on your behalf, providing a secure AWS Landing Zone, features which help you meet various compliance program requirements (HIPAA, HITRUST, GDPR, SOC, ISO, PCI), a proven enterprise operating model, on-going cost optimization, and day-to-day infrastructure management. By implementing best practices to maintain your infrastructure, AWS Managed Services helps to reduce your operational overhead and risk. AWS Managed Services automates common activities, such as change requests, monitoring, patch management, security, and backup services, and provides full-lifecycle services to provision, run, and support your infrastructure. AWS Managed Services unburdens you from infrastructure operations so you can direct resources toward differentiating your business.

AWS services can be access and configured from the

- Management console
- CLI
- CloudShell (CLI is preinstalled)
- SDK
- API

### Services

- Authentication, authorization, and security:
  - ✔️ The shared responsibility model
  - ✔️ Identity & Access management (IAM)
  - ✔️ Cognito
  - ✔️ Security Group
  - ✔️ Security Token Service (STS)
  - ✔️ Key Management Service (KMS)
  - ✔️ Macie (PPI checker)

- Routing:
  - ✔️ Regions
  - ✔️ Route 53
  - ✔️ Direct connect
  - ✔️ Private Link
  - ✔️ Local Zones
  - ✔️ Wavelength
  - ✔️ Virtual Private Cloud (VPC)
  - ✔️ Virtual Private Network (VPN)

- API:
  - ✔️ API Gateway
  - ✔️ AppSync
  - ✔️ Web Application Firewall (WAF)
  - Transit Gateway
  - Storage Gateway

- Compute:
  - ✔️ Elastic Compute Cloud (EC2)
  - ✔️ Lambda
  - ✔️ Elastic Container Registry
  - ✔️ Elastic Container Servive (ECS)
  - ✔️ Elastic Kubernetes Service (EKS)
  - ✔️ Fargate
  - App2container

- Specialised compute:
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

- Scaling compute:
  - ✔️ Auto Scaling Groups
  - ✔️ Elastic Load Balancing (ELB)

- App integration:
  - ✔️ Simple Notification Service (SNS)
  - ✔️ Simple Queue Service (SQS)
  - ✔️ EventBridge
  - ✔️ Step Functions

- File storage:
  - ✔️ Elastic Block Store (EBS)
  - ✔️ Elastic File System (EFS)
  - ✔️ Simple Storage Solution (S3)
  - ✔️ Simple Storage Solution Glacier
  - ✔️ FSx (fully managed file servers)
  - ✔️ Cloudfront (CDN)

- Databases:
  - ✔️ DynamoDB
  - ✔️ Aurora Serverless V2
  - ✔️ Relational Database Service (RDS)
  - ✔️ AWS Backup
  - RDS Proxy
  - AWS Backup Vault

- Search
  - OpenSearch Service
  - Athena (SQL search of S3)
  - QuickSight (BI)
  - Kendra
  - Elasticache for Redis

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
  - ✔️ Cloud9 (cloud IDE)
  - ✔️ CodeCommit (repo)
  - ✔️ CodeBuild (build)
  - ✔️ CodeDeploy (deploy)
  - ✔️ CodePipeline (CI/CD)
  - ✔️ CodeStar (simple CI)
  - ✔️ CodeArtifact (private and public package management)
  - ✔️ CodeGuru (static analysis)
  - ✔️ DevOpsGuru (running app analysis)
  - ✔️ Device Farm

- Platform services:
  - ✔️ Amplify
  - ✔️ Elastic Beanstalk
  - ✔️ Lightsail

- Cloud management:
  - ✔️ Config
  - ✔️ Organizations
  - ✔️ CloudFormation
  - ✔️ Outposts Family
  - ✔️ Systems Manager (SSM)

- Business services:
  - ✔️ Connect (contact center service)
  - Pinpoint (marketing communications)

- Migration management:
  - Migration hub
  - Migration evaluator
  - Application discovery service
  - Application migration service
  - Database migration service

## To be sorted

### Migration and Transfer Services

AWS offers tools for migrating on premises databases, servers and file servers to the cloud, e.g. AWS Migration Hub, AWS Database Migration Service, Server Migration Service, and Datasync. You can migrate databases homogeneously (Oracle to Oracle) or heterogeneously (Oracle to Amazon) with Database Migration Service. You can migrate servers with Server Migration Service,. Under the hood the server volumes are replicated in EBS and used to save an AMI which is then used to launch an EC2 instance. With Datasync filesystems can be migrated over TLS to S3, FSx (Windows specific), or EFS. AWS Migration Hub, is useful for planning the migration process and viewing their status.

### AWS Rekognition

is a service for identifying objects within images or video (computer vision). It requires no knowledge of AI/ML. You can use it to

- list of objects in an image with percent confidence rating, e.g. people, text, nsfw
- analyse facial expressions and count people
- identify celebrities

### Amazon Transcribe

is used for transcribing speech to text, it has an API that can be called and used in applications. Amazon translate translates text to different languages and has an API. Amazon Polly turns text to speech. Amazon Macie uses ML to identify PI and PHI in your S3 buckets.

### Analytics

Analyze datasets on Amazon S3 with Amazon Athena. You can write queries in SQL, and Athena uses Glue, which contains information about the schemas and databases the queries are being made against. Glue is an extract, transform and load (ETL) service. Amazon Elastic Map Reduce (EMR) is a web service that enables businesses, researchers, data analysts, and developers to easily and cost-effectively process vast amounts of data. EMR utilizes a hosted Hadoop framework running on Amazon EC2 and Amazon S3. Kinesis is a way to collect, process and analyse real-time streaming data, or small amounts of data that are being updated with high-frequency over time. Amazon QuickSight is trying to take the role of a data scientist: extract business insights from your data. In summary: for data at rest consider Athena, EMR, and QuickSight to answer questions about your data and extract business insights respectively. For data in transit use Kinesis.