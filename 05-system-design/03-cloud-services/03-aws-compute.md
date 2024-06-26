# 03 Cloud services

## AWS Compute

### Elastic compute cloud (EC2)

Renting a virtual remote server is probably AWS' most important service. With EC2 you have full control over the image, the hardware specs and you can install any software needed. If you want certain commands to run after launching an EC2 instance, e.g. that starts a web server, they can be entered into the "user data" text field for convience, or you can SSH or use EC2 connect to access instance to install or execute code afterward. The instance can be also updated through a REST API. Instance metadata, such as the instance ID, can be accessed over HTTP after the instance is created. Security groups can be attached to a EC2 instand in order to control network access. EC2 is well-suited for a long running, traditional applications.

Servers comprise both physical hardware (CPU, RAM, disk, NIC) and an operating system (Linux, MacOS, Windows) and when you set up an EC2 instance you need to select both and the region they are located in (cost can vary per region). To elaborate, an EC2 virtual server is launched using a **Amazon Machine Image (AMI)** on Amazon hardware. An AMI is an **Elastic Blockstore Snapshot (EBS)** with Windows or Linux preinstalled, and includes all the necessary information to launch an instance. There are three categories of AMIs / EBS snapshots: community (free), marketplace (pay to use), my AMIs (own custom). There are many different instance types of AMIs to choose between that are optimised for different purposes, e.g. more memory, more storage or general purpose. Note when setting up an EC2 instance you don't rent an entire server but an isolated slice of a specific physical machine that is fully isolated and has dedicated hardware. An EC2 instance must be launched in a VPC.

There are 4 EC2 pricing models:

- on demand instances (most common) =  pay per use
- spot instances (left over instances that can be reclaimed whenever) = discounts
- savings plan (committing to compute 1 or 3 years in advance) = discounts
- reserved instances (pay for instance configurations 1 or 3 years) = discounts

### Lambda

"Functions as a service" (FaaS). Lambda is a "serverless" service because you can run code without configuring or managing any servers explicitely at all--you just write the code and set the trigger for when it should execute.

- code: Is uploaded or defined in the console as a docker file or zip in one of the supported languages.
- event: There are a broad variety of supported events, e.g. object upload to S3.
- configuration: Add environment variables and lambda timeones, attach file systems, role permissions, VPC access.

The lambda is executed as needed and scales automatically based on demand. Multiple serverless tasks need to be combined for a workload. Lambdas are well-suited for ETL, data-validation, and mobile back-ends. Example lambda applications:

1. write entries to a Cloudwatch log service
2. resizing images and moving them into a different bucket
3. send a CloudWatch entry when a user writes an update to a DynamoDB

### Elastic Container Service (ECS) and Elastic Kubernetes Service (EKS)

Containers are "packages of code and all their execution requirements", e.g. OS, softare. The contaners can be deployed to any environment that support containers. Environments that are preconfigured to support containers and not the app itself directly are **Elastic container service** and **Elastic kubernetes service**.

ECS provides infrastructure for launching docker containers a.k.a. containers as a service (CaaS). ECS and EKS take care of installing and upgrading docker, container distribution across multiple servers. They are managed services for running containers. They simply the process of running clusters of containers in the cloud.

### Fargate

Fargate is a serverless container execution environement. Fargate provisions servers based on demand and upgrades automatically. ECS and Fargate are well-suited for microservices.

### Elastic Container Registry (ECR)

A registry where you can manage an docker image repository, which can then be used by ECS and EKS.
