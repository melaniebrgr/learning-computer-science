# 03 Cloud services

## Databases

A database can be self-hosted on AWS, e.g. installed on an EC2 instance, or you can opt for a managed database service on AWS, e.g. RDS and DynamoDB.
There are two types of relational databases: online analytical processing (OLAP) used for business intelligence, and online transactional processing (OLTP) used for e.g. banking. Amazon also offers DynamoDB, a NoSQL database.

When configuring a database typically you want to setup databases in a private subnet in a VPC.
That is, the server would be a public subnet and communicate with the database in a private subnet.
In general, all DBs need to be create within VPC, subnect and with a security group.

### Amazon Relational Database Service (RDS)

A SQL database in the cloud can be set up using **Amazon Relational Database Service (RDS)**. RDS is all about spinning up managed repliational databases. You choose your database engine, whatever flavour of SQL you like Oracle, MariaDB, MySQL, PostgreSQL, Amazon's own Aurora, or other, the version, deployment region, hardware profile and cloud settings and more. Through the console you can conveniently configure automatic updates, replication, monitoring, encryption and backups (snapshots).

RDS is backed by EC2, i.e. the DB is running on an EC2 instance, and is managed for you. For example, it can do automatic multi-AZs data replication to set up readers / writers or backups for better performance and reliability.

### Aurora

A SQL engine created by Amazon for the AWS cloud with, that claims to be MySQL and PostgreSQL compatible.
There is a serverless version of Aurora available so you only use and pay for it when you need it.

### Elasticache

Is a fully managed caching Redis or Memcached database running on EC2.
Memcached is simplest and more elasticity.
Redis supports encryption and HIPAA, and has a number of other reliability features.
In-memory caching is useful for low latency for read particularly for compute-heavy application workloads.

### DynamoDB

DynamoDB is a fully managed KV DB.
To manage the data use the AWS API / SDK.
Useful for unstructured data.

Features

- streams: can subscribe to a time-orded series of DB chance
- global table: convenient multi-region replicas for global performance
- dax: in-memory caching

### Other AWS databases

- MemoryDB: persistent in-memory storage
- DocumentDB: the AWS alternative to MongDB
- Keyspaces: wide column database
- Neptune: Graph database
- Timestream: time series database
- Quantum ledger: immutable log of database changes

For more info: <https://aws.amazon.com/products/databases/>

### Backup

Is a service for managing database backups centrally. For example, RDS backups can be configured separately from DynamoDB backups.