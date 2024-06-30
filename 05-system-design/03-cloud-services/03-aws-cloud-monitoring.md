# 03 cloud services

## Cloud monitoring

### Cloudwatch

Collects metrics from other services (performance monitoring), e.g. EC2 CPU utilisation, etc. Alarms can be set on CouldWatch that trigger a response when certain thresholds are met, such as a notification or remediation. It is a regional service. Use CloudWatch to configure alarms that deliver a notification when activated. The alarms can use cost metrics that trigger the alarm when a certain amount of spend has been reached.

Most services allow extra monitoring to be turned on, which can cost extra money. Flowlogs can be set up for a VPC. CloudWatch agents can be installed on EC2 instances. See Cloudwatch dashboards fora quick overview of metrics and trends.

### XRay

See, inspect and analyse traffic as it flows across the application.

### CloudTrail

is an auditing service, it logs all API activity for an AWS account (regardless of whether it's through the console or CLI), to an S3 bucket so you can diagnose what happened.

### Compute Optimiser

Uses machine learning to analyse cloutwatch metrics and recommend improvements.
