# 4 Databases

All applications require some form of data storage.
Databases commonly commonly provide this.
A database organised collection of data that enable working on that data.
A database is simply a server that does two things: record and query data.
All databases have database management systems (DBMS) for this.

Databases are typicaly assumed to persist records longterm, but it ultimately depends on the type of storage used, e.g. in memory (RAM) or on disk.
Any form of storage that persists when the process managing it dies is known as **persistent storage**, such as storage to disk, but storage on disk is typically slower to access than in-memory.

There are two broad categories of databases: relational (SQL) and non-relational (NoSQL).
NoSQL databases tend to be preferable when the data is unstructured, there is a large amount of it, you only need to serialise and deserialise config files, e.g. JSON/YAML, or you need very low latencies.
Both SQL and NoSQL types can be “indexable”.
Database indexes are auxiliary data structures, for example an index cabe be created for one or multiple columns of a relational database.
Indexes are useful for queries that are run often.

There are many different types of databases with different availability, reliability and consistency characteristics to choose from depending on the application requirements.
Therefore database selection is an important aspect of system design.

## Relational databases

Relational databases are highly structured and impose a tabular format on data.
In a relational database each row in a table is a unique record.
A benefit of relational databases is that is provides a rich language for querying the data, “structure query language” (SQL).

- MySQL
- Oracle database
- PostgreSQL
- MariaDB
- AWS RDS

## New relational databases

Many enterprise systems that handle high-profile data (e.g., financial and order processing systems) are too large for conventional relational databases, but have transactional and consistency requirements that are not practical for NoSQL systems.
NewSQL databases are relational databases that try to solve this problem by trying to be as scalable as NoSQL databases.

- CockroachDB
- Google Spanner
- Clustrix
- YubabyteDB
- Couchbase

## Non-relational (NoSQL) databases

There is a wide variety of  categories of non-relational databases:

- column
- document
- graph
- key-value
- object/blob
- time series
- search
- spatial
- etc.

The main characteristic of NoSQL databases is that they do not impose a tabular data structure on data.
Their querying capability tends to be more limited than relational DBs.
However non-relational databases are generally more flexible, faster, easier to use, and easier to scale.
They can be suitable in cases where there aren’t a lot of relationships between the data, and when you want to get up and running quickly.

### Column store

- Cassandra

### Document store

Relational databases generally store data in tables, and spread a single object across several tables.
Document databases store all information for a given object in a single instance and every stored object can be different from the other.
Document stores might be useful when you don’t want to define a schema right away, or when the shape of the data might change over time, or when you have "semi-structured" data.

Examples

- MongoDB: the cloud service "Atlas" for scaling is apparently notoriously bad
- CouchDB
- Amazon DocumentDB
- Firebase: provides user authentication out of the box

### Graph store

Graph databases are suitable for data where you will want to query relationships like social networks where there are a lot of connections to explore in the data.
Cypher is a query language invented for Neo4j but has since become standardised as the query language for graph databases, equivalent to SQL for relational databases.

- Neo4j

### Key-value store (KV)

A key value-store is a NoSQL database that lends itself well to caching.
Key-value store databases can have different durability, consistency and performance properties depending mostly on whether they write to disk or to memory.
That being said, of the in-memory KVs, Redis is one of the least performant.

Examples

- Amazon DynamoDB: in-memory
- Redis: in-memory
- Etcd: on disk
- Cassandra
- BigTable
- Zookeeper
- KeyBD: a multithreaded, open-source alternative and originally a fork of Redis
- Dragonfly: newer and maybe less stable
- Skytable: apparently the fastest of the in-memory KVs, but newer and maybe less stable

#### Redis

In-memory databases like Redis tend to be more suitable for smaller short-lived data that you don’t mind losing.
Redis supports different types: strings, numbers, lists, sets, sorted sets, hashes (hash maps).
Common applications of redis include counters, caches, queues, weighted queues.
Because Redis can expire keys after a certain length of time, caches are on of the most popular uses.
All the Redis operations implemented by single commands are atomic, including the ones operating on more complex data structures.
So when you use a Redis command that modifies some value, you don't have to think about concurrent access.

#### Etcd

Etcd is a strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines. It gracefully handles leader elections during network partitions and can tolerate machine failure, even in the leader node.

### Object/blob store

Object storage is suitable for data such as large binaries, database snapshots, videos or images.
These generally don’t fit well in a SQL-style database.
Binary large object (blob) storage is used to store arbitrary piece of unstructured and often large data.
Blob stores behave similar to key-value stores in that the blobs are typically accessed by key.
Cost for blob storage usually depends on the storage size and file access frequency.

- S3
- Google Cloud Storage (GCS)

### Search

Elasticsearch is a special type of database for searching text.
Batches of data, e.g. from MySQL are copied over to the elastic search database and formatted for searching.

- Elasticsearch

### Spatial store

Spatial databases are useful for storing and querying geometric space data, such as locations on a map and geographic proximities.
A quadtree is a common datastructure for indexing 2D spatial data (in memory or on disk).
Note that many types of databases are smart about reading and writing spatial data so a specialised DB may not be necessary.

## Time series

Time series databases are specialised for storing and analysing large amounts of time-indexed data.
If you need to perform time-based like computations, e.g. when logging, monitoring, telemetry, monitoring stock prices, a TSDB might be the way to go.

- InfluxDB
- Prometheus
