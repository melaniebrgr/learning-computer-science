# 03 Cloud services

## AWS Compute

- Lambda
- Elastic Compute Cloud (EC2)
- Elastic Container Registry
- Elastic Container Servive (ECS)
- Elastic Kubernetes Service (EKS)
- Fargate
- App2container

### Lambda (serverless)

An AWS service for serverless computing is **AWS Lambda**.

"Functions as a service" (FaaS). Lambda is a "serverless" service because you can run code without configuring or managing any servers explicitely at all--you just write the code and set the trigger for when it should execute. When using Lambda, you are responsible only for your code. Lambda manages the compute fleet that offers a balance of memory, CPU, network, and other resources to run your code. Because Lambda manages these resources, you cannot log in to compute instances or customize the operating system on provided runtimes.

The lambda is executed as needed and scales automatically based on demand. Multiple serverless tasks need to be combined for a workload. Lambdas are well-suited for ETL, data-validation, and mobile back-ends. Example lambda applications:

- write entries to a Cloudwatch log service
- resizing images and moving them into a different bucket
- send a CloudWatch entry when a user writes an update to a DynamoDB

General steps

1. Upload your code to Lambda.
2. Set your code to trigger from an event source, such as AWS services, mobile applications, or HTTP endpoints.
3. Lambda runs your code only when triggered (under 15 minutes)
4. pay only for the compute time that you use

#### Features

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

### Elastic compute cloud (EC2, serverful)

EC2 is "A virtual server in the AWS Cloud."

With EC2 you don't rent an entire server but an isolated slice of a specific physical machine that is fully isolated and has dedicated hardware:

> EC2 runs on top of physical host machines managed by AWS using virtualization technology. When you spin up an EC2 instance, you aren't necessarily taking an entire host to yourself. Instead, you are sharing the host with multiple other instances, otherwise known as virtual machines. And a hypervisor running on the host machine is responsible for sharing the underlying physical resources between the virtual machines. This idea of sharing underlying hardware is called multitenancy. The hypervisor is responsible for coordinating this multitenancy and it is managed by AWS. The hypervisor is responsible for isolating the virtual machines from each other as they share resources from the host. This means EC2 instances are secure. Even though they may be sharing resources, one EC2 instance is not aware of any other EC2 instances also on that host. They are secure and separate from each other.

Servers have both physical hardware (CPU, RAM, disk, NIC) and an operating system (Linux, MacOS, Windows) dimension.
With Amazon EC2, you can set up and configure the operating system and applications that run on your instance.
You have full control over the image, can install any software needed, and can customise the hardware specs.
Each instance type offers a different balance of compute, memory, network, and storage resources. EC2 is well-suited for a long running, traditional applications.

There are three categories of AMIs / EBS snapshots: community (free), marketplace (pay to use), my AMIs (own custom). There are many different instance types of AMIs to choose between that are optimised for different purposes, e.g. more memory, more storage or general purpose.

#### Setup and launch

> Begin by selecting a template with basic configurations for your instance. These configurations include the operating system, application server, or applications. You also select the instance type, which is the specific hardware configuration of your instance.

1. Select the region
2. Select the AMI
3. Select the instance type (hardware)
4. Create a public-private key-pair
5. Optionally select select a different subnet, VPC, security group configuratoin
6. Optionally configure storage
7. Launch the instance

When you set up an EC2 instance you need to select both and the region they are located in (cost can vary per region). An EC2 virtual server is launched using a **Amazon Machine Image (AMI)** on Amazon hardware. AMIs are preconfigured templates for your instances that package the components you need for your server (including the operating system and additional software). An AMI is stored on an EBS volument. It is an **Elastic Blockstore Snapshot (EBS)** with Windows or Linux preinstalled, and includes all the necessary information to launch an instance. An EC2 instance must be launched in a VPC. Persistent, EBS volumes can be set up for persistent data storage, and instance storage for temporary data.

There are 5 families of instance types:

- **General purpose**: balance of compute, memory, and networking resources and a suited for applications, backends, gaming servers and small and medium database servers
- **Compute optimised**: ideal for compute-bound applications such as high-performance web servers, compute-intensive applications servers, and dedicated gaming servers
- **Memory optimised**: designed to deliver fast performance for workloads that process large datasets in memory, suitable for high-performance database or a workload that involves performing real-time processing of a large amount of unstructured data
- **Storage optimised**: are designed for workloads that require high, sequential read and write access to large datasets on local storage for example, distributed file systems, data warehousing applications, and high-frequency online transaction processing (OLTP) systems. IOPS is the metric that measures the performance of a storage device
- Accelerated computing:

#### Connecting and using

After launching First, you connect to an instance. If you want certain commands to run after launching an EC2 instance, e.g. that starts a web server, they can be entered into the "user data" text field for convience, or you can SSH or use EC2 connect to access instance to install or execute code. Instance metadata, such as the instance ID, can be accessed over HTTP after the instance is created.

> You can connect to the instance in several ways. Your programs and applications have multiple different methods to connect directly to the instance and exchange data. Users can also connect to the instance by logging in and accessing the computer desktop.

Lastly, use the instance, for example it can be updated through a REST API.

> After you have connected to the instance, you can begin using it. You can run commands to install software, add storage, copy and organize files, and more.

#### Scaling

With EC2 **Auto Scaling** to an application, you can add new instances to the application when necessary and terminate them when no longer needed. When configuring an auto scaling group you set the minimum capacity, the desired capacity, and maximum capacity. The coordinating scaling of servers and distributing load between them is accomplished with ELB or elastic laod balancing. **Elastic Load Balancing** is the AWS service that automatically distributes incoming application traffic across multiple resources, such as Amazon EC2 instances.

> ELB is automatically scalable. As your traffic grows, ELB is designed to handle the additional throughput with no change to the hourly cost. When your EC2 fleet auto-scales out, as each instance comes online, the auto-scaling service just lets the Elastic Load Balancing service know that it's ready to handle the traffic, and off it goes. Once the fleet scales in, ELB first stops all new traffic, and waits for the existing requests to complete, to drain out. Once they do that, then the auto-scaling engine can terminate the instances without disruption to existing customers.

#### Securing

**Security groups**, like instance firewalls, can be attached to a EC2 instand in order to control network access, e.g. you can specify the protocols, ports, and source IP ranges that can reach your instances, and the destination IP ranges to which your instances can connect.
Public and private keys can provide secure access.

A security group is like a firewall that can be attached to an instance that limits internet traffic to the instance. Put another way, security groups are a virtual firewall applied at the instance level controlling outbound and inbound traffic. These security groups or firewalls check incoming and outgoing requests from the instance and periodically block them. The are "stateful" in that a response from the instance is always allowed if the incoming request was allowed. There can be multiple security groups for an instance

#### Pricing

EC2 pricing models:

- **Free tier**
- **On demand instances**: the most familiar and are ideal for short-term, irregular workloads that cannot be interrupted. Pay per use by the second, for a minimum of 60s with no long-term commitment. Suitable for developing and testing applications and running applications that have unpredictable usage patterns. Not recommended for workloads that last a year or longer.
- **Reserved instances (RI)**: are a billing discount applied to the use of On-Demand Instances in your account if you commit to them for 1 or 3 years. You have the option to specify an Availability Zone for EC2 RIs.
  - **Standard RIs**: These provide the most significant discount (up to 75% off On-Demand) and are best suited for steady-state usage. Standard Reserved Instances require you to specify: instance family and size, platform description, tenancy, and region.
  - **Convertible RIs**: Useful if you  might need to change to different AZ or different instance types as long as its of equal or greater value. These provide a partial discount (up to 54% off On-Demand). Like Standard RIs, Convertible RIs are best suited for steady-state usage.
  - **Scheduled RIs**: These are available to launch within the time windows you reserve. This option allows you to match your capacity reservation to a predictable recurring schedule that only requires a fraction of a day, a week, or a month.
- **Savings plans**: Make an hourly spend commitment to an instance family and Region for a 1-year or 3-year term fpr a discount (up to 72% off On-Demand). Unlike Reserved Instances, however, you don't need to specify up front what EC2 instance type and size.
- **Spot instances**: are ideal for workloads with flexible start and end times, or that can withstand interruptions. Spot Instances use unused Amazon EC2 computing capacity and offer you cost savings (up to 90% off On-Demand).
- **Dedicated hosts**: are physical servers with Amazon EC2 instance capacity that is fully dedicated to your use. You can use your existing per-socket, per-core, or per-VM software licenses to help maintain license compliance. You can purchase On-Demand Dedicated Hosts and Dedicated Hosts Reservations. Of all the Amazon EC2 options that were covered, Dedicated Hosts are the most expensive.

### Containerization

> Containers provide you with a standard way to package your application's code and dependencies into a single object. You can also use containers for processes and workflows in which there are essential requirements for security, reliability, and scalability.

Containers are "packages of code and all their execution requirements", e.g. OS, softare. The containers can be deployed to any environment that support containers. Environments that are preconfigured to support containers and not the app itself directly are **Elastic Container Service (ECS)** and **Elastic Kubernetes Service (EKS)**.

ECS is a highly scalable, high-performance container management system that enables you to run and scale containerized applications on AWS. ECS provides infrastructure for launching docker containers a.k.a. containers as a service (CaaS). EKS is a fully managed service that you can use to run Kubernetes on AWS. Kubernetes is open-source software that enables you to deploy and manage containerized applications at scale. Both ECS and EKS take care of installing and upgrading docker, container distribution across multiple servers. They are managed services for running containers. They simply the process of running clusters of containers in the cloud.

**Elastic Container Registry (ECR)** is registry where you can manage an docker image repository, which can then be used by ECS and EKS.

> Both Amazon ECS and Amazon EKS can run on top of EC2. But if you don't want to even think about using EC2s to host your containers because you either don't need access to the underlying OS or you don't want to manage those EC2 instances, you can use a compute platform called AWS Fargate. Fargate is a serverless compute platform for ECS or EKS.

**Fargate** is a serverless compute engine for containers. It works with both Amazon ECS and Amazon EKS. When using AWS Fargate, you do not need to provision or manage servers. AWS Fargate manages your server infrastructure for you.
