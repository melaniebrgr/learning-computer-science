# 03 Cloud services

## Cloud management and governance

### Config

Manmage and control service config on a central level.
Assess, audit and evaluate service configuration with AWS Config. It provides an inventory of the resources being used and their configuration. This is useful for verification and compliance, i.e. make sure resource configurations comply with government regulations. You can also see the history of the resource's configuration. Used AWS Config to see what changed, use CloudTrail to see who changed it. Remediation actions can also be configured.

### Trusted Advisor

provides advice for resource management. Trusted Advisor checks help optimize your AWS infrastructure, increase security and performance, reduce your overall costs, and monitor service limits. AWS Trusted Advisor checks security groups for rules that allow unrestricted access (0.0.0.0/0) to specific ports. Unrestricted access increases opportunities for malicious activity (hacking, denial-of-service attacks, loss of data). The ports with highest risk are flagged red, and those with less risk are flagged yellow. Ports flagged green are typically used by applications that require unrestricted access, such as HTTP and SMTP.

### Personal Health Dashboard

AWS shows any operational/availabilities issues with your AWS resources. The dashboard displays relevant and timely information to help you manage events in progress, and provides proactive notification to help you plan for scheduled activities. With Personal Health Dashboard, alerts are triggered by changes in the health of AWS resources, giving you event visibility, and guidance to help quickly diagnose and resolve issues.

### Misc. management services and features

- **AWS Organisations** occasionally an organisation may wish to have multiple AWS accounts, if for example there are different teams with different goals and needs that could clash under a single account. Multiple accounts can also allow you to access additional resources. You can manage e.g. backups and policies accross accounts like this from a central place.
- **Control Tower** creates and configures multiple accounts with best practises
- **AWS OpsWorks** gives you a managed implementation of Chef and Puppet, useful for patching, updating, and backing up. It's used for EC2 management.
- **Cost Explorer** to get more details about the cost.
- **AWS Systems Manager** provides a resource overview: you can group and visualise resources.
- **AWS Catalog** allows you to curate a list of approved services a company is allowed to use. Helps observe governance and compliance. You can also set budget constraints.
- **Servive Health Dashboard** shows current information on services, but is not specific to your resources. It's a quick look at what's going on right now.
- **Tags** (pieces of metadata) can be attached to almost all resources that can be used as a filter in teh cost explorer.
- **Consolidated Billing** getting one single bill, share saving planes and pricing discounts for multiple accounts
- **CloudFormation** templates for reproducible infrastructure deployments (check CloudFormation designer). Create a template like a blueprint for the stack you want to launch.
- **Outposts** server racks on shipped to you from AWS, so you can still your AWS on prem.
- **Systems manager** manages workloads centrally fleet of servers rolling out patches simultations and share parameter store
- **Resource access manager** its about the acutal services (not just their blueprints) share a centrally managed VPC.
- **License manager** warn and help enforce license requirements when using services.