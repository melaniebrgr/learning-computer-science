# 03 Cloud services

## AWS Data analytics

- Kinesis
  - Kinesis Data streams
  - Kinesis Data firehose
  - Kinesis Data Analytics
- S3 (as a data lake)
- Athena
- Lake formation
- Glue
  - Glue Data Catalog
- Elastic Map Reduce (EMR)
- Redshift (data warehouse)
- Datasync
- Managed service for apache flink
- Quicksight

- OpenSearch Service
- Athena (SQL search of S3)
- QuickSight (BI)
- Kendra
- Elasticache for Redis

### Kinesis

**Kinesis** is a way to collect, process, and analyse real-time streaming data, or small amounts of data that are being updated with high-frequency over time. For most other quantities and frequencies of data RDS or S3 can be used. Kinesis works by essentially buffering data into larger and less frequent chunks, so that they can be ingested by other typical databases.

### Datalake

(S3)

### Data warehouse

**Redshift** is data warehousing service that you can use for big data analytics. That is, it is a big data BI solution; a database to be used specifically for analysis of exabytes of data. It is comparable to RDS except where RDS is meant for application data, Redshift is for business intelligence. It combines and structures data from different business sectors and sources and allows you to aun a SQL query against exabytes of data. Suitable when you want to look backwards.

### Extract and transform

In order the analyse data it ust be avialable in a useful format. **Glue** is an ETL (extract, transform, load) for doing just that. It is a fully managed service. **Glue Data Catalog** contains information about the schemas and databases the queries are being made against. **Amazon Elastic Map Reduce** (EMR) is like an alternative to glue a web service that simplifies spining up your own big data analysis clusters.

### Search and analyse

**OpenSearch**: "Amazon OpenSearch Service makes it easy for you to perform interactive log analytics, real-time application monitoring, website search, and more."

Analyze datasets on Amazon S3 with **Amazon Athena**. (After first crawling the bucket.) You can write queries in SQL. You can also use other data sources for Athena, like CloudWatch and DynamoDB.

Quicksight is a BI service, convenient for calculations and building charts. Amazon **QuickSight** is trying to take the role of a data scientist: extract business insights from your data. In summary: for data at rest consider Athena, EMR, and QuickSight to answer questions about your data and extract business insights respectively. For data in transit use Kinesis.
