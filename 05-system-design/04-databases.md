# 4 Databases

- 4.1 Document store
- 4.2 Key-value store

## Document store

Relational databases generally store data in separate tables, and a single object may be spread across several tables.
Document databases store all information for a given object in a single instance in the database, and every stored object can be different from every other.
Document stores might be useful when you don’t want to define a schema right away, the shape of the data might change a lot over time, or you have "semi-structured" data.

Examples

- MongoDB: the cloud service "Atlas" for scaling is apparently notoriously bad
- CouchDB
- Amazon DocumentDB
- Firebase: has user authentication out of the box

## Key-value store (KV)

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

### Redis

In-memory databases like Redis tend to be more suitable for smaller short-lived data that you don’t mind losing.
Redis supports different types: strings, numbers, lists, sets, sorted sets, hashes (hash maps).
Common applications of redis include counters, caches, queues, weighted queues.
Because Redis can expire keys after a certain length of time, caches are on of the most popular uses.
All the Redis operations implemented by single commands are atomic, including the ones operating on more complex data structures.
So when you use a Redis command that modifies some value, you don't have to think about concurrent access.

### Etcd

Etcd is a strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines. It gracefully handles leader elections during network partitions and can tolerate machine failure, even in the leader node.
