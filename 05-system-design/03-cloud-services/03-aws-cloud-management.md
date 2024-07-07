# 03 Cloud services

## Cloud management and governance

### Billing and pricing

There are three pricing models: in advance, subscription and on demand. For example, you can pay on demand, for a dedicated instance that does not share resources with anyone else, for a spot instance, or for a reserved instance (RI) for a 1 or 3 year term. On demand is by far the most common. With on demand you pay only for what you use, and it varies depending on the service, the region, and the type of infrastructure. AWS has a pricing page for each service, and pricing calculator to explore costs. A free tier is generally available to new AWS users.

There are three things you tend to pay for on AWS:

1. pay for computation (time, e.g. EC2),
2. pay for storage space used (S3), and
3. pay for data outbound.

Expenses are monitored from the billing dashboard, where budgets can also be set to be notified of cost overages. Each services has different limits or quotas that can be increased on request. Tags can be attached to AWS resources, and can be inherited from other resources, e.g. Cloud Formation Resource groups can be used to group resources with the same tags. Cost allocation Tags are a useful way of tracking resource costs. With **Consolidated Billing** getting one single bill, share saving planes and pricing discounts for multiple accounts

#### AWS Cost Explorer

is a free tool that can be used to view past cost data and future projections. A set of default reports is provided the can be further filtered, e.g. cost per EC2 instance type per month. The AWS Pricing Calculator can useful to plan costs before committing to services. The AWS Total Cost of Ownership (TCO) Calculator is for comparing on premises costs to cloud costs.

#### Budgets

allows you to set custom budgets to track your cost and usage from the simplest to the most complex use cases. With AWS Budgets, you can choose to be alerted by email or SNS notification when actual or forecasted cost and usage exceed your budget threshold, or when your actual RI and Savings Plans' utilization or coverage drops below your desired threshold.

There are four different **support plans**:

1. Basic - access to forums only
2. Developer - email support during business hours, one person can open unlimited cases with <12 h response time for some system impairment
3. Business - email, chat, phone support 24h, unlimited people can open unlimited cases with <12 h response time for some system impairment, <4 h for production system impairment, <1 h for prod is down
4. Enterprise - email, chat, phone support 24h, unlimited people can open unlimited cases, with <12 h response time for some system impairment, <4 h for production system impairment, <1 h for prod is down, < 15 min for business cirtical system down. Only enterprise gets a TAM, training and account assistance.

### Organisation

Occasionally an organisation may wish to have multiple AWS accounts, if for example there are different teams with different goals and needs that could clash under a single account. If you have multiple AWS accounts they can be consolidated with **AWS Organizations**. Multiple accounts can also allow you to access additional resources. You can manage e.g. backups and policies accross accounts from a central place.

The Paying account is where the bills get paid, so that you get one bill, far all the linked accounts services. The combined usage enables shared volume discounts. There is no extra fee for AWS Organizations. Service Control Policies (SCP) can be attached to individual organizations to control or limit what administrators of those organizations can do.

### Config

Manmage and control service config on a central level.
Assess, audit and evaluate service configuration with AWS Config. It provides an inventory of the resources being used and their configuration. This is useful for verification and compliance, i.e. make sure resource configurations comply with government regulations. You can also see the history of the resource's configuration. Used AWS Config to see what changed, use CloudTrail to see who changed it. Remediation actions can also be configured.

### Trusted Advisor

provides advice for resource management. Trusted Advisor checks help optimize your AWS infrastructure, increase security and performance, reduce your overall costs, and monitor service limits. AWS Trusted Advisor checks security groups for rules that allow unrestricted access (0.0.0.0/0) to specific ports. Unrestricted access increases opportunities for malicious activity (hacking, denial-of-service attacks, loss of data). The ports with highest risk are flagged red, and those with less risk are flagged yellow. Ports flagged green are typically used by applications that require unrestricted access, such as HTTP and SMTP.

### Personal Health Dashboard

AWS shows any operational/availabilities issues with your AWS resources. The dashboard displays relevant and timely information to help you manage events in progress, and provides proactive notification to help you plan for scheduled activities. With Personal Health Dashboard, alerts are triggered by changes in the health of AWS resources, giving you event visibility, and guidance to help quickly diagnose and resolve issues.

### Misc. management services and features

- **Control Tower** creates and configures multiple accounts with best practises
- **AWS OpsWorks** gives you a managed implementation of Chef and Puppet, useful for patching, updating, and backing up. It's used for EC2 management.
- **AWS Systems Manager** provides a resource overview: you can group and visualise resources.
- **AWS Catalog** allows you to curate a list of approved services a company is allowed to use. Helps observe governance and compliance. You can also set budget constraints.
- **Servive Health Dashboard** shows current information on services, but is not specific to your resources. It's a quick look at what's going on right now.
- **Tags** (pieces of metadata) can be attached to almost all resources that can be used as a filter in teh cost explorer.
- **CloudFormation** templates for reproducible infrastructure deployments (check CloudFormation designer). Create a template like a blueprint for the stack you want to launch.
- **Outposts** server racks on shipped to you from AWS, so you can still your AWS on prem.
- **Systems manager** manages workloads centrally fleet of servers rolling out patches simultations and share parameter store
- **Resource access manager** its about the acutal services (not just their blueprints) share a centrally managed VPC.
- **License manager** warn and help enforce license requirements when using services.