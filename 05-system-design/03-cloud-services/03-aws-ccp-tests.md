# AWS Certified Cloud Practitioner (CLF-C02) 

The AWS Certified Cloud Practitioner (CLF-C02) exam is intended for individuals who
can effectively demonstrate overall knowledge of the AWS Cloud, independent of a
specific job role.
The exam validates a candidate’s ability to complete the following tasks:
• Explain the value of the AWS Cloud.
• Understand and explain the AWS shared responsibility model.
• Understand security best practices.
• Understand AWS Cloud costs, economics, and billing practices.
• Describe and position the core AWS services, including compute, network,
database, and storage services.
• Identify AWS services for common use cases.

Your results for the exam are reported as a scaled score of 100–1,000. The minimum
passing score is 700. Your score shows how you performed on the exam as a whole
and whether you passed. Scaled scoring models help equate scores across multiple
exam forms that might have slightly different difficulty levels

## Resources

- <https://aws.amazon.com/certification/certified-cloud-practitioner/>
- <https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/tree/master/practice-exam>

## Practise exam 1

You scored 54 / 65 (83%), wrong questions: 11, 22, 34, 38, 40, 48, 49

## Practise exam 2

You scored 16 / 20 (80%), wrong questions: 9, 12, 13, 20

CloudWatch monitors your AWS resources and the applications that you run on AWS in real time. You can use CloudWatch with AWS CloudTrail to monitor and receive alerts about console sign-in events that involve the AWS account root user.

Trusted Advisor checks security groups for rules that allow unrestricted access to a resource. Unrestricted access increases opportunities for malicious activity, such as hacking, denial-of-service attacks, or loss of data.

support plans: enterprise, business, developer, basic

Correct. Lambda charges are dependent on the number of requests for your Lambda functions.

AWS MGN is an automated lift-and-shift solution. This solution can migrate physical servers and any databases or applications that run on them to EC2 instances in AWS.

Macie is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS.

## Practise exam 3

[practice-exam-1.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-1.md)

You scored 45 / 50 (90%), wrong questions: 8, 18, 19, 31, 36

Which of the following must an IAM user provide to interact with AWS services using the AWS Command Line Interface (AWS CLI)?

You have AWS Basic support, and you have discovered that some AWS resources are being used maliciously, and those resources could potentially compromise your data. What should you do? AWS Support Concierge for enterprise.

Study: migration, support account differences

## Practise exam 4

[practice-exam-2.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-2.md)

You scored 39 / 50 (78%), wrong questions: 7, 9, 16, 22, 32, 33, 36, 37, 44, 48, 49

Amazon Inspector, AWS Trusted Advisor, Amazon CloudWatch, Concierge Support Team, Infrastructure Event Management, AWS Global accelerator, AWS Config, Security Groups, APN Consulting Partners

According to the AWS Shared responsibility model, which of the following are the responsibility of the customer? Protecting the confidentiality of data in transit in Amazon S3, Patching applications installed on Amazon EC2.

Which of the following EC2 instance purchasing options supports the Bring Your Own License (BYOL) model for almost every BYOL scenario? Dedicated Hosts.

In your on-premises environment, you can create as many virtual servers as you need from a single template. What can you use to perform the same in AWS? AMI

## Practise exam 5

[practice-exam-23.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-23.md)

You scored  41 / 50 (82%), wrong questions: 7, 9, 15, 22, 24, 31, 32, 44, 48

"A user is planning to migrate..."

"Which component must be attached to a VPC to enable inbound Internet access?" Internet gateway

"A company has a MySQL database running on a single Amazon EC2 instance. The company now requires higher availability in the event of an outage.
Which set of tasks would meet this requirement?" Migrate to Amazon RDS and enable Multi-AZ

"Under the AWS shared responsibility model, which of the following is the customer's responsibility?" Patching guest OS and applications

"What is the customer's responsibility when using AWS Lambda?" Code encryption

OpsWorks, Amazon Connect, PCI-compliant workload, AWS Trusted Advisor, Macie, AWS Personal Health Dashboard, AWS Direct Connect, AWS Config rules, AWS Transit Gateway (VPC)

<https://d0.awsstatic.com/whitepapers/overview-of-deployment-options-on-aws.pdf>

## Practise exam 6

[practice-exam-22.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-22.md)

You scored 44 / 50 (88%), wrong questions: 1, 13, 18, 22, 32, 45

What is the recommended method to request penetration testing on AWS resources?

Which components are required to build a successful site-to-site VPN connection on AWS? (Choose two.)

Internet gateway, ~~NAT gateway~~, ~~Customer gateway~~, ~~Transit gateway~~, ~~Virtual private gateway~~, AWS Security Bulletins, Amazon Elastic Block Store, AWS Simple Monthly Calculator

Which of the following allows AWS users to manage cost allocations for billing? Tagging resources.

Which requirement must be met for a member account to be unlinked from an AWS Organizations account? The member account must meet the requirements of a standalone account.

Which AWS tools automatically forecast future AWS costs? Cost Explorer

A user has a stateful workload that will run on Amazon EC2 for the next 3 years.
What is the MOST cost-effective pricing model for this workload? Reserved Instances ( < Dedicated Instances)

## Practise exam 7

[practice-exam-21.md](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/blob/master/practice-exam/practice-exam-21.md)

You scored 41 / 50 (82%), wrong questions: 9, 11, 21, 24, 25, 27, 29, 33, 48

- 9. What is the MINIMUM AWS Support plan level that will provide users with access to the AWS Support API? Business
- 11. A company wants to use Amazon Elastic Compute Cloud (Amazon EC2) to deploy a global commercial application. The deployment solution should be built with the highest redundancy and fault tolerance. Based on this situation, the Amazon EC2 instances should be deployed: across multiple Availability Zones in one AWS Region (not across multiple Availability Zones in two AWS Regions)
- 21. Which Amazon S3 storage class is optimized to provide access to data with lower resiliency requirements, but rapid access when needed such as duplicate backups? Amazon S3 One Zone-Infrequent Access
- 24. Which AWS service enables users to create copies of resources across AWS Regions? AWS CloudFormation
- 27. What credential components are required to gain programmatic access to an AWS account? (Choose two.) An access key ID, A secret access key
- 29. How can a company separate costs for network traffic, Amazon EC2, Amazon S3, and other AWS services by department? Create a separate AWS account for each department
- 33. Which tool can be used to monitor AWS service limits? AWS Trusted Advisor
- 48. AWS Trusted Advisor provides recommendations on which of the following? (Choose two.) Cost optimization,  Performance

Topics: Amazon CloudWatch dashboard, Access Control Lists (ACL), <https://aws.amazon.com/premiumsupport/plans/enterprise/>, AWS Secrets Manager, AWS Systems Manager, AWS Key Management Service (AWS KMS), AWS Certificate Manager, AWS Control Tower, AWS Security Hub, AWS Well-Architected Tool, AWS Trusted Advisor.

## Practise exam

[]()

You scored  / 50 (%), wrong questions:

<!-- ## Practise exam

[]()

You scored  / 50 (%), wrong questions: -->