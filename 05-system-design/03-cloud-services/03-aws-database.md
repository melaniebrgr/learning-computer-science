# 03 Cloud services

## Databases

A database can be self-hosted on AWS, e.g. installed on an EC2 instance, or managed by AWS, e.g. Relational Database Service and DynamoDB. There are two types of relational databases: online analytical processing (OLAP) used for business intelligence, and online transactional processing (OLTP) used for e.g. banking.

In general, all DBs need to be created within a private VPC subnet and with a security group. For example, the server would be a public subnet and communicate with the database in a private subnet.

### Relational Database Service (RDS)

A managed SQL database in the cloud can be set up using **Amazon Relational Database Service (RDS)**. You choose your database engine, (whatever flavour of SQL you like Oracle, MariaDB, MySQL, PostgreSQL, Amazon's own Aurora, or other), the version, deployment region, hardware profile and cloud settings and more. Through the console you can conveniently configure automatic updates, replication, monitoring, encryption and backups (snapshots). You control the data, the schema, and the network and Amazon manages everything else. RDS is backed by EC2 and automatic management includes upgrades, multi-AZs data replication to set up readers / writers or backups for better performance and reliability and more.

### Aurora

Aurora is SQL engine created by Amazon for the AWS cloud that claims to be MySQL and PostgreSQL compatible. There is a serverless version of Aurora available so you only use and pay for it when you need it. Built on RDS, i.e. Amazon RDS for Aurora.

### Elasticache

Elasticache is a fully managed caching Redis or Memcached database running on EC2. Memcached is simplest and more elasticity. Redis supports encryption and HIPAA, and has a number of other reliability features. In-memory caching is useful for low latency reads, particularly for compute-heavy application workloads.

### DynamoDB

DynamoDB is a fully managed KV DB that is useful for unstructured data. To manage the data use the AWS API / SDK. Features:

- serverless: you do not have to provision, patch, or manage servers, or install, maintain, or operate software
- streams: subscribe to a time-orded series of DB changes
- global table: convenient multi-region replicas for global performance
- dax: in-memory caching
- scales: adjust for changes in capacity while maintaining consistent performance, e.g. prime days

### Other AWS databases

- MemoryDB: Persistent in-memory storage
- DocumentDB: AWS alternative to MongoDB
- Keyspaces: Wide column database
- Neptune: Graph database
- Timestream: Time series database
- Quantum ledger: An immutable log of database changes

For more info: <https://aws.amazon.com/products/databases/>

## Database service

### Database Migration Service (DMS)

**Database Migration Service (DMS)** enables you to create a migration task with connections to the source and target databases and start it with a click of the button. Homogenous migrations are database migrations of the same type. Heterogeneous migrations are when source and target databases are of different types and it's a two-step process. First the schema is converted with the **AWS Schema Conversion Tool**, then DMS migrates data. Use cases:

- migrate relational and nonrelational databases, and other types of data stores
- perform homogenous and heterogenous migrations
- create development and test databases (to develop against production data)
- database consolidation
- continuous database replication

### Backup

Is a service for managing database backups centrally. For example, RDS backups can be configured separately from DynamoDB backups.
