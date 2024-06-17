# 03 Cloud services

## Databases

### Amazon Relational Database Service (RDS)

A SQL database in the cloud can be set up using **Amazon Relational Database Service (RDS)**. RDS uses EC2 and you can select the flavour of SQL: Oracle, MariaDB, MySQL, PostgreSQL, Amazon's own Aurora, or other. Data can be encrypted and snapshoted. It is possibly to have Multi-AZ replicas for fault tolerance or better read performance. There are two types of relational databases: online analytical processing (OLAP) used for business intelligence and online transactional processing (OLTP), used for e.g. banking. Amazon also offers DynamoDB, a NoSQL database.

**ElastiCache** does in-memory caching and is used to improve latency for read or compute-heavy application workloads. (It's faster because it's in memory and not on disk.) It runs on EC2. There are two types of engines: Memcached (simplest, more elasticity) or Redis (supports encryption (HIPAA), numerous reliability features).
