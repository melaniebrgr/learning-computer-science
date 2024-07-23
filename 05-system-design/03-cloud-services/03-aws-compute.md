# 03 Cloud services

## AWS Compute

- Lambda
- Elastic Compute Cloud (EC2)
- Elastic Container Registry
- Elastic Container Servive (ECS)
- Elastic Kubernetes Service (EKS)
- Fargate
- App2container

### Lambda

"Functions as a service" (FaaS). Lambda is a "serverless" service because you can run code without configuring or managing any servers explicitely at all--you just write the code and set the trigger for when it should execute. When using Lambda, you are responsible only for your code. Lambda manages the compute fleet that offers a balance of memory, CPU, network, and other resources to run your code. Because Lambda manages these resources, you cannot log in to compute instances or customize the operating system on provided runtimes. Features:

- env var: use environment variables without updating code
- versioning: a new function can be used for beta testing without affecting users of the stable production version
- container images: create a container image to reuse your existing container tooling
- layers: Package libraries and other dependencies to reduce the size of deployment archives and makes it faster to deploy your code
- function URLs: set up a dedicated HTTP(S) endpoint
- extensions: augment with tools for monitoring, observability, security, and governance
- response streaming: Configure your Lambda function URLs to stream response payloads back to clients from Node.js functions
- FS access: Configure a function to mount an Amazon Elastic File System (Amazon EFS) to a local directory, so that your function code can access and modify shared resources safely and at high concurrency.

You can configure memory between 128 MB and 10,240 MB in 1-MB increments. At 1,769 MB, a function has the equivalent of one vCPU (one vCPU-second of credits per second). Function invocation payload: request and response 6 MB each for request and response (synchronous), 20 MB for each streamed response (Synchronous. The payload size for streamed responses can be increased from default values. Contact AWS Support to inquire further.)

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

### Elastic compute cloud (EC2)

"A virtual server in the AWS Cloud."
Renting a virtual remote server is probably AWS' most important service.
With EC2 you don't rent an entire server but an isolated slice of a specific physical machine that is fully isolated and has dedicated hardware.
EC2 is well-suited for a long running, traditional applications.

Servers have both physical hardware (CPU, RAM, disk, NIC) and an operating system (Linux, MacOS, Windows) dimension.
With Amazon EC2, you can set up and configure the operating system and applications that run on your instance.
You have full control over the image, can install any software needed, and can customise the hardware specs.
Each instance type offers a different balance of compute, memory, network, and storage resources

There are three categories of AMIs / EBS snapshots: community (free), marketplace (pay to use), my AMIs (own custom).
There are many different instance types of AMIs to choose between that are optimised for different purposes, e.g. more memory, more storage or general purpose.

#### Setup

1. Select the region
2. Select the AMI
3. Select the instance type (hardware)
4. Create a public-private key-pair
5. Optionally select select a different subnet, VPC, security group configuratoin
6. Optionally configure storage
7. Launch the instancs

When you set up an EC2 instance you need to select both and the region they are located in (cost can vary per region). An EC2 virtual server is launched using a **Amazon Machine Image (AMI)** on Amazon hardware. AMIs are preconfigured templates for your instances that package the components you need for your server (including the operating system and additional software). An AMI is stored on an EBS volument. It is an **Elastic Blockstore Snapshot (EBS)** with Windows or Linux preinstalled, and includes all the necessary information to launch an instance. An EC2 instance must be launched in a VPC. Persistent, EBS volumes can be set up for persistent data storage, and instance storage for temporary data.

If you want certain commands to run after launching an EC2 instance, e.g. that starts a web server, they can be entered into the "user data" text field for convience, or you can SSH or use EC2 connect to access instance to install or execute code. The instance can be also updated through a REST API. Instance metadata, such as the instance ID, can be accessed over HTTP after the instance is created.

#### Security

Security groups, like instance firewalls, can be attached to a EC2 instand in order to control network access, e.g. you can specify the protocols, ports, and source IP ranges that can reach your instances, and the destination IP ranges to which your instances can connect.
Public and private keys can provide secure access.

A **security group** is like a firewall that can be attached to an instance that limits internet traffic to the instance. Put another way, security groups are a virtual firewall applied at the instance level controlling outbound and inbound traffic.

- A firewall for a single EC2 instance
- Checks incoming and outgoing requests and periodically blocks
- "Stateful" response are always allowed if the request was
- There can be multiple security groups for an instance

#### Pricing

EC2 pricing models:

- **Free tier**
- **On demand instances**: pay per use by the second, for a minimum of 60s with no long-term commitment
- **Savings plans**: cost-saving plan for a commitment of consistent usage for 1-3 years
- **Reserved instances (RI)**: cost-saving plan for a commitment to a specific configuration, including instance type and region for 1-3 years
- **Spot instances**: unused EC2 instances that can be reclaimed anytime, suitable for interruptible work at significant discount
- **Dedicated hosts**: a dedicated physical server that can be used on demand or with a savings plan, use with "existing server-bound software licenses"
- On demand capacity reservations: reserve capacity in an AZ for any duration of time

The following types of RI are available:

- **Standard RIs**: These provide the most significant discount (up to 75% off On-Demand) and are best suited for steady-state usage.
- **Convertible RIs**: These provide a discount (up to 54% off On-Demand) and the capability to change the attributes of the RI as long as the exchange results in the creation of Reserved Instances of equal or greater value. Like Standard RIs, Convertible RIs are best suited for steady-state usage.
- **Scheduled RIs**: These are available to launch within the time windows you reserve. This option allows you to match your capacity reservation to a predictable recurring schedule that only requires a fraction of a day, a week, or a month.

### Fargate

Fargate is a serverless container execution environement. Fargate provisions servers based on demand and upgrades automatically. ECS and Fargate are well-suited for microservices.

### Elastic Container Registry (ECR)

A registry where you can manage an docker image repository, which can then be used by ECS and EKS.
