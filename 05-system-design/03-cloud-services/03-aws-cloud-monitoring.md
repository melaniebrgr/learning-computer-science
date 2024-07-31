# 03 cloud services

## Cloud monitoring

### Trusted Advisor

**Trusted Advisor** provides advice for resource management.

> Trusted Advisor inspects your AWS environment, and then makes recommendations when opportunities exist to save money, improve system availability and performance, or help close security gaps. If you have a Basic or Developer Support plan, you can use the Trusted Advisor console to access all checks in the Service Limits category and six checks in the Security category. If you have a Business, Enterprise On-Ramp, or Enterprise Support plan, you can use the Trusted Advisor console and the AWS Trusted Advisor API to access all Trusted Advisor checks.  

Like a static analysis check across your account. For example, it checks security groups for rules that allow unrestricted access (0.0.0.0/0) to specific ports. Unrestricted access increases opportunities for malicious activity (hacking, denial-of-service attacks, loss of data). The ports with highest risk are flagged red, and those with less risk are flagged yellow. Ports flagged green are typically used by applications that require unrestricted access, such as HTTP and SMTP.

> AWS Trusted Advisor(opens in a new tab) is a web service that inspects your AWS environment and provides real-time recommendations in accordance with AWS best practices. Trusted Advisor compares its findings to AWS best practices in five categories:

1. cost optimization,
2. performance,
3. security,
4. fault tolerance, and
5. service limits.

For the checks in each category, Trusted Advisor offers a list of recommended actions and additional resources to learn more about AWS best practices.

### Cloudwatch

**Cloudwatch** a web service that enables you to monitor and manage various metrics and configure alarm actions based on data from those metrics. You can use a CloudWatch dashboard to monitor the CPU utilization of an Amazon EC2 instance, the total number of requests made to an Amazon S3 bucket, and more. Alarms can be configured to send notifications when a metric passes a cetain threshold.

Is a regional service. Collects and monitors metrics from AWS services in real time, e.g. EC2 CPU utilisation, in order to enable performance monitoring. Alarms can be set on CouldWatch that trigger a response when certain thresholds are met, such as a notification or remediation. For example, you could set cost thresholds to watch that trigger an alarm when a certain amount of spend has been reached.

Most services allow extra monitoring to be turned on, which can cost extra money. Flowlogs can be set up for a VPC. CloudWatch agents can be installed on EC2 instances. _See Cloudwatch dashboards_ for a quick overview of metrics and trends.

### CloudTrail

**AWS CloudTrail** is an auditing service. Every request gets logged in the CloudTrail engine: who made the request, which operator, and when did they send the API call. It logs _all_ API activity for an AWS account (regardless of whether it's through the console or CLI), to an S3 bucket so you can diagnose what happened or demonstrate compliance. It works across all regions and automatic responses can be configured when inconsistencies are detected. You are looking at the trail of evidence in the cloud.

**CloudTrail Insights** can additionally be enabled to automatically detect unusual API activities in your AWS account.

### Misc. monitoring

- **XRay**: See, inspect and analyse traffic as it flows across the application.
- **AWS Health Dashboard**: View the health of all AWS services. This page shows reported service events for services across AWS Regions. You can use your AWS Health Dashboard to learn about AWS Health events. These events can affect your AWS services or AWS account. See issues that affect your account or organisation.
- **Compute Optimiser**: Uses machine learning to analyse cloutwatch metrics and recommend improvements.
