# 03 Cloud services

## Cloud management

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

### Organisation

Occasionally an organisation may wish to have multiple AWS accounts, if for example there are different teams with different goals and needs that could clash under a single account. If you have multiple AWS accounts they can be consolidated with **AWS Organizations**. Multiple accounts can also allow you to access additional resources. Centrally control permissions for the accounts in your organization by using service control policies (SCPs). SCPs enable you to place restrictions on the AWS services, resources, and individual API actions that users and roles in each account can access. SCPs can be aplied to member accounts and OUs.

In AWS **Organizations**, you can group accounts into organizational units (OUs) to make it easier to manage accounts with similar business or security requirements. When you apply a policy to an OU, all the accounts in the OU automatically inherit the permissions specified in the policy. So, when different accounts need to access the same AWS services and resources, place them into an OU together.

The Paying account is where the bills get paid, so that you get one bill, far all the linked accounts services. The combined usage enables shared volume discounts. There is no extra fee for AWS Organizations. Service Control Policies (SCP) can be attached to individual organizations to control or limit what administrators of those organizations can do.

Service Control Policies are an AWS Organizations feature that allows you to set permission guardrails for organization accounts. These guardrails set maximum access rights which can't be exceeded by permissions set inside of the affected organization accounts. Even if an identity (e.g., an IAM user) in an account would receive a policy that grants more access rights, the SCP would restrict the maximum access rights.

### Costs

There are 4 pricing models: free, on demand, in advance/subscription.

1. **Free**: The free tier has three variations, Always Free, 12 Months Free, and Trials. A free tier is generally available to new AWS users.
2. **On demand**: For each service, you pay for exactly the amount of resources that you actually use, without requiring long-term contracts or complex licensing. For example, on demand EC2 instances. Cost can vary depending on the service, the region, and the type of infrastructure.
3. **In advance / Subscription**: Some services offer reservation options that provide a significant discount compared to On-Demand Instance pricing. For example, for a dedicated instance that does not share resources with anyone else, or for a reserved instance (RI) for a 1 or 3 year term.
4. **Bulk discounts**: For example, the more Amazon S3 storage space you use, the less you pay for it per GB.

AWS has a pricing page for each service, and pricing calculator to explore costs.

There are three things you tend to pay for on AWS:

1. pay for computation (time, e.g. EC2),
2. pay for storage space used (S3), and
3. pay for data outbound.

Pricing examples

- **AWS Lambda**: pay for the number of requests to functions and the time that it takes for them to run. Offers 1 million free requests and up to 3.2 million seconds of compute time per month. Save on AWS Lambda costs by signing up for a Compute Savings Plan.
- **EC2**: pay for the compute time used while instances are running. Reduce Amazon EC2 costs by using Spot Instances, Savings Plans or Reserved Instances.
- **S3**:
  - storage: pay the rate to store objects in your Amazon S3 buckets based on the objects’ sizes, storage classes, and how long you have stored each object during the month.
  - requests: requests made to your Amazon S3 objects and buckets
  - ingress/egress: pay for data that you transfer into and out of Amazon S3, with a few exceptions, e.g. there is no cost for data transferred into Amazon S3 from the internet or out to Amazon CloudFront.
  - management: pay for the storage management features

Expenses are monitored from the billing dashboard, where budgets can also be set to be notified of cost overages. Each services has different limits or quotas that can be increased on request. **Tags** can be attached to AWS resources, and can be inherited from other resources (Cloud Formation Resource groups can be used to group resources with the same tags). Cost allocation Tags then become a useful way of tracking resource costs. With **Consolidated Billing** you get a single bill for multiple accounts, and can share saving plans and pricing discounts.

**AWS Cost Explorer** is a free tool that can be used to view past cost data and future projections. A set of default reports is provided the can be further filtered, e.g. cost per EC2 instance type per month.

The **AWS Pricing Calculator** The AWS Pricing Calculator lets you explore AWS services and create an estimate for the cost of your use cases on AWS. You can organize your AWS estimates by groups that you define. A group can reflect how your company is organized, such as providing estimates by cost center. It is a free web-based planning tool. The **AWS Total Cost of Ownership (TCO)** Calculator is for comparing on premises costs to cloud costs.

When you have created an estimate, you can save it and generate a link to share it with others.

**Budgets** allows you to set custom budgets to track your cost and usage from the simplest to the most complex use cases. With AWS Budgets, you can choose to be alerted by email or SNS notification when actual or forecasted cost and usage exceed your budget threshold, or when your actual RI and Savings Plans' utilization or coverage drops below your desired threshold.

### Support

There are four different **support plans**:

1. **Basic**: for new AWS users
    - free for all AWS customers
    - access whitepapers, documentation, support communities
    - customer support emails
    - limited AWS Trusted Advisor checks
    - AWS Personal Health Dashboard access

2. **Developer**: for businesses that are experimenting or setting up proofs of concept
    - pay-by-the-month pricing
    - everything in the previous plans
    - 12-hour response to customer support emails if systems are impaired
    - 24-hour response time to customer support emails for other inquiries

3. **Business**: for business taking production workloads live
    - everything in the previous plans
    - full suite of Trusted Advisor checks
    - customer support team direct phone access
    - 1-hour response time if production system is down
    - 4-hour response time if production system is impaired
    - access to infrastructure event management for a fee, e.g. planning for massive events like launches

4. **Enterprise On-Ramp**: for companies migrating production and business-critical workloads to AWS
    - everything in the previous plans
    - 30-minute response time for business-critical workloads
    - access to a pool of technical account managers (TAMs)

5. **Enterprise**: for mission-critical workloads
    - 15-minute response time for business-critical workloads
    - a designated TAM that proactively monitors the environment and assists with optimization
    - access to proactive reviews, workshops, and deep dives

#### Personal Health Dashboard

AWS shows any operational/availabilities issues with your AWS resources. The dashboard displays relevant and timely information to help you manage events in progress, and provides proactive notification to help you plan for scheduled activities. With Personal Health Dashboard, alerts are triggered by changes in the health of AWS resources, giving you event visibility, and guidance to help quickly diagnose and resolve issues.

### Misc. management services and features

- **Control Tower** creates and configures multiple accounts with best practises. Control Tower automates the process of setting up a new baseline multi-account AWS environment that is secure, well-architected, and ready to use. Control Tower incorporates the knowledge that AWS Professional Service has gained over the course of thousands of successful customer engagements.
- **AWS OpsWorks** gives you a managed implementation of Chef and Puppet, useful for patching, updating, and backing up. It's used for EC2 management.
- **AWS Systems Manager** provides a resource overview: you can group and visualise resources. Manage workloads centrally fleet of servers rolling out patches simultations and share parameter store.
- **AWS Catalog** allows you to curate a list of approved services a company is allowed to use. Helps observe governance and compliance. You can also set budget constraints.
- **Servive Health Dashboard** shows current information on services, but is not specific to your resources. It's a quick look at what's going on right now.
- **Tags** (pieces of metadata) can be attached to almost all resources that can be used as a filter in teh cost explorer.
- **CloudFormation** templates for reproducible infrastructure deployments (check CloudFormation designer). Create a template like a blueprint for the stack you want to launch.
- **Outposts** server racks on shipped to you from AWS, so you can still your AWS on prem.
- **Resource access manager** its about the actual services (not just their blueprints) share a centrally managed VPC.
- **License manager** warn and help enforce license requirements when using services.
- **Amazon Connect** is an AI-powered cloud contact center. It automatically detects customer issues, and provides agents with contextual customer information and suggested responses and actions for faster resolution of issues.
- **Penetration testing** AWS customers are welcome to carry out security assessments or penetration tests of their AWS infrastructure without prior approval for Permitted Services: EC2, RDS, CloudFront (15 total). Customers are not permitted to conduct any security assessments of AWS infrastructure or the AWS services themselves. Customers seeking to test non approved services will need to work directly with AWS Support or your account representative.
