# 03 cloud services

## Cloud monitoring

### Cloudwatch

Is a regional service. Collects and monitors metrics from AWS services in real time, e.g. EC2 CPU utilisation, in order to enable performance monitoring. Alarms can be set on CouldWatch that trigger a response when certain thresholds are met, such as a notification or remediation. For example, you could set cost thresholds to watch that trigger an alarm when a certain amount of spend has been reached.

Most services allow extra monitoring to be turned on, which can cost extra money. Flowlogs can be set up for a VPC. CloudWatch agents can be installed on EC2 instances. See Cloudwatch dashboards fora quick overview of metrics and trends.

### CloudTrail

**AWS CloudTrail** is an auditing service, it logs all API activity for an AWS account (regardless of whether it's through the console or CLI), to an S3 bucket so you can diagnose what happened. Use **AWS CloudTrail** to analyse, track and search across all the logs to see who made changes where and when. It works across all regions and automatic responses can be configured when inconsistencies are detected. You are looking at the trail of evidence in the cloud.

### Misc. monitoring

- **XRay**: See, inspect and analyse traffic as it flows across the application.
- **AWS Health Dashboard**: View the health of all AWS services. This page shows reported service events for services across AWS Regions. You can use your AWS Health Dashboard to learn about AWS Health events. These events can affect your AWS services or AWS account. See issues that affect your account or organisation.
- **Compute Optimiser**: Uses machine learning to analyse cloutwatch metrics and recommend improvements.
