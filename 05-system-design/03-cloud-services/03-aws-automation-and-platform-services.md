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

It's a service that's clearly built for large-scale customers with complex compute architectures.
Systems Manager helps with managing fleets of EC2 instances and even servers located in customers' own data centers (on-premises; by installing "SSM Agent" on those servers).

But two key features that also help small-scale customers (e.g., start ups or small businesses) are Parameter Store and AppConfig.

**AWS OpsWorks** helps you automate operations via Puppet or Chef. Puppet and Chef are automation platforms that allow you to use code to automate the configuration of your servers. You could describe Puppet and Chef as (non-AWS-created) alternatives to Systems Manager and some of its capabilities.

### Parameter Store

That's a service that helps customers distribute values to their code bases. Values that are needed in the application code of the applications running on top of other AWS services (not necessarily EC2 instances - any compute service can be used instead).

A typical example would be some configuration needed in code. For example, the current (REST) API endpoint URL for a backend API a certain application should talk to (i.e., it should send HTTP requests to). By storing the value in a central place (=> Parameter Store) different applications and code files can all access the same value - it therefore doesn't have to be stored ("hard-coded") directly in the code.

### AppConfig

AppConfig takes Parameter Store to the next level. When using Parameter Store, application code has to actively query that service to fetch a certain value from it.

This is often all you need or want. But in some cases, you might want to be able to push new configuration values to your application code, so that your applications change / update without you releasing a new version.

AppConfig allows you to do that. You can store values with it, too - but you can then also publish new versions and have your application code use those values automatically. For that, the application code of course must connect to AppConfig (via the AWS SDK for that service) in order to listen to such configuration changes.

### Service Catalog, Proton

Both offer the creation of standardised templates for say members of the same comapny to reuse. **Servie catalog** is service oriented. **Proton** is deployment oriented.

### Launch Wizard

Launch prebuild AWS applications like SAP.
