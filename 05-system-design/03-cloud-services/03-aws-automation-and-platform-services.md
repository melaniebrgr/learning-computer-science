# 03 Cloud services

## AWS automation and platform services

### Amplify

Create the application conveniently.

### Elastic Beanstalk

Run the application you've already created more conveniently. Simplified web application deployment, connect databases and configure load balancing.

**AWS Elastic Beanstalk** is a PaaS; you deploy your code and AWS takes care of deploying the web application. You don't have to worry about EC2, auto-scaling, elastic load balancing, or the development environment. Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS. You can simply upload your code and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto-scaling to application health monitoring. At the same time, you retain full control over the AWS resources powering your application and can access the underlying resources at any time.

### LightSail

Amazon LightSail is a compute service for people who do not have expert AWS knowledge. It allows you to quickly spin up pre-configured virtual servers. VPCs, subnets and other details do not need to be configured. It simplifies things and allows quick launch of instances and databases.
A simplified EC2 management wizard. Provides a simplified wizard. Not intended for experts.
It is intended to compete with something like Heroku.
It has event less configuration options that Elastic Beanstalk.

### AppRunner

Simplifies container deployment using ECS and fargate under the hood.

### Copilot

A CLI for container deployment.

### CloudFormation

is similar to TerraForm in that you specify your environment as code (JSON, YAML), and AWS uses it to provision services.

### Systems manager

It's a service that's clearly built for large-scale customers with complex compute architectures. If you have 100-1000s of service locally or on prem.
