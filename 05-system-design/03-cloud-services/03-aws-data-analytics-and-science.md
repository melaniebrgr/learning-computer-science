# 03 Cloud services

## AWS Data analytics & science

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

### Kinesis

**Kinesis** is a way to collect, process, and analyse real-time streaming data, or small amounts of data that are being updated with high-frequency over time. For most other quantities and frequencies of data RDS or S3 can be used. Kinesis works by essentially buffering data into larger and less frequent chunks, so that they can be ingested by other typical databases.

### Datalake

(S3)

### Data warehouse

**Redshift** is a database to be used specifically for data analysis. It is comparable to RDS except where RDS is meant for application data, Redshift is for business intelligence.

### Extract and transform

In order the analyse data it ust be avialable in a useful format. **Glue** is an ETL (extract, transform, load) for doing just that. **Glue Data Catalog** contains information about the schemas and databases the queries are being made against. **Amazon Elastic Map Reduce** (EMR) is a web service that enables businesses, researchers, data analysts, and developers to easily and cost-effectively process vast amounts of data. EMR utilizes a hosted Hadoop framework running on Amazon EC2 and Amazon S3.

### Analyse

Analyze datasets on Amazon S3 with **Amazon Athena**. You can write queries in SQL.

Amazon **QuickSight** is trying to take the role of a data scientist: extract business insights from your data. In summary: for data at rest consider Athena, EMR, and QuickSight to answer questions about your data and extract business insights respectively. For data in transit use Kinesis.