# 03 Cloud services

## Block Storage

Broadly speaking, data can be stored in files or stored in databases. You can think of block-level storage as a place to store files. A file being a series of bytes that are stored in blocks on disc. When a file is updated, the whole series of blocks aren't all overwritten. Instead, it updates just the pieces that change. This makes it an efficient storage type when working with applications like databases, enterprise software, or file systems.

Files are often generated in the course of typical web application usage, e.g. user file uploads, invoice generation, image transformations, legal documents, and so on. So we need services for file storage.

There are three types of block or file storage services:

- instance storage,
- block (EBS),
- network file (EFS), and
- object (S3).

These provide different levels of abstraction. **EBS block storage** provides an unformatted hardrive that can be formatted and structured however you like. Any structure and any file can go. If you don't care about the underlying hardrive and its formatting, but do care about configuring the file system however you like, then use a **network files system service like EFS and FSx**. When you don't want to bother with any of that and store files without caring about the underlying system, then use **simple storage service (S3)**.

### Instance storage

**Instance storage** provides temporary block-level storage for an Amazon EC2 instance. An instance store is disk storage that is physically attached to the host computer for an EC2 instance, and therefore has the same lifespan as the instance. It is ephemeral.

Because an instance volume is attached to the underlying physical host, if you stop or terminate your EC2 instance, all data written to the instance store volume will be deleted. The reason for this, is that if you start your instance from a stop state, it's likely that EC2 instance will start up on another host. A host where that volume does not exist.

### Elastic block storage (EBS)

EBS is like a hard drive or solid state drive. To create an EBS volume, you define the configuration (such as volume size and type) and provision it. After you create an EBS volume, it can attach to an Amazon EC2 instance.

Once it is attached, it must be formatted and structure. If the instance is shut down, EBS is _not_ shut down, unlike instance store volumes. EBS instances can be accessed over a network, also unlile instance stores. EBS must exist in the same region as the instance using it. Attaching multiple EC2 instances to the same EBS volume is possible in some cases, but you must resolve file conflicts. EBS can be configured to scale dynamically.

There are two main categories:

1. solid state drive (SSD) provisioned and general purpose which has better performance (better for databases), and
2. hard disk drives (HDD) for less frequently accessed work loads.

Because EBS volumes are for data that needs to persist, it’s important to back up the data. An EBS snapshot is an incremental backup. This means that the first backup taken of a volume copies all the data. For subsequent backups, only the blocks of data that have changed since the most recent snapshot are saved.

For custom AMIs, EBS snapshots can be created in S3. These are basically point-in-time diffs of the EBS volume.

### Amazon Simple Storage Service (S3)

The world according to S3: everything is an object and objects are uploaded into buckets. Buckets exist in a specific region, but bucket names have a universal namespace and must be unique globally.

In object storage, each object consists of data, metadata, and a key. When you upload a file to Amazon S3, you can set permissions to control visibility and access to it. You can also use the Amazon S3 versioning feature to track changes to your objects over time.

S3 can be connected to from a browser over the (public) internet, accessed via a REST API, and from EC2 over the internet or an S3 Gateway. When accessing S3 from EC2, it is recommended to create a role with a policy granting access, instead of storing a secret access key on the EC2 instance. In total, a S3 object is made up of the data itself, metadata, and a global unique identifier. Metadata can include a key, version ID, sub-resources, access control information, and more.

Use cases for S3 include backing up of data, static web site hosting, media hosting, software delivery, bit torrenting (object can be retrieved by bit torrent). Objects up to 5GB in size can be uploaded to S3 in a single put operation, the multipart upload API must be used for larger objects up to 5TB in size. CloudFront can be used to accelerate data upload.

There are 8 Amazon S3 **storage classes**. All share 11 9's of durability but vary slightly in other aspects of availability, zones, fees, and latency. The different storage classes generally align with 3 different types of file access patterns: frequent, infrequent and archival.

- 1. **S3 Standard**:
  - Designed for frequently accessed data
  - Stores data in a minimum of three AZs (99.9999999 durability)
  - A good choice for a wide range of use cases like websites, content distribution, and data analytics
  - Higher cost than other storage classes intended for infrequently access
- 2. **S3 Standard-Infrequent Access (IA)**:
  - Ideal for infrequently accessed data
  - Stores data in a minimum of three AZs (99.9999999 durability)
  - A lower storage price but higher retrieval price than S3 Standard
  - Ideal for data infrequently accessed but requires high availability
- 3. **S3 One Zone-Infrequent Access (IA)**:
  - Stores data in _one_ AZ
  - Ideal for cost saving compared to Amazon S3 Standard-IA, and
  - In the event of an Availability Zone failure the data can be easily reproduced
- 4. **S3 Express One Zone**:
  - Stores data in _one_ AZ
  - Ideal for frequently accessed, high-performance delivery (single-digit ms data access, by co-locating object storage with compute resources in a new directory bucket type)
- 5. **S3 Intelligent-Tiering**:
  - Ideal for data changing or unknown access patterns, it automatically moves your data between four access tiers
  - Requires a small monthly monitoring and automation fee per object
- 6. **S3 Glacier Instant Retrieval**:
  - Archive data that requires instant access
  - Retrieve objects with the same performance as S3 Standard (ms)
- 7. **S3 Glacier Flexible Retrieval**:
  - Archive data that can be retrieved within a few minutes to 12 hours
  - A low-cost storage class
  - Ideal for archived customer records or older photos and video files
- 8. **S3 Glacier Deep Archive**:
  - Archive data that can be retrieved within 12 to 48 hours
  - Highly durable, objects are replicated and stored across at least three geographically dispersed AZs
  - Lowest-cost object storage
  - Suitable for long-term retention and digital preservation for data that might be accessed once or twice in a year
- 9. **S3 Outposts**:
  - Object storage for on-premises AWS Outposts environment
  - Ideal for workloads with local data residency requirements that must satisfy demanding performance needs by keeping data close to on-premises applications

#### Features of S3

Transfer

- Transfer Acceleration is designed to optimize transfer speeds from across the world into S3 buckets. 
- Transfer Acceleration takes advantage of the globally distributed edge locations in Amazon CloudFront. As the data arrives at an edge location, the data is routed to Amazon S3 over an optimized network path.

Lifecycle

- Configure lifecycle policies to handle changing access patterns
- Store objects cost effectively throughout their lifecycle. Expire objects at the end of their lives, or transition them to other S3 storage classes.
- Set event triggers on buckets that trigger lambdas.

Safety

- S3 buckets and the objects in them are private by default
- Automatically encrypt objects on upload
- Apply locks to objects to prevent changes or deletions, e.g. for auditing purposes.
- Prevent Amazon S3 objects from being deleted or overwritten for a fixed amount of time or indefinitely to meet write-once-read-many (WORM) requirements simply add another layer of protection against changes and deletions.
- Version objects to access all past object versions, even deleted ones.

Replication

- Replicate objects and their respective metadata and object tags to one or more destination buckets.
- Replicate objects across regions (CRR) or in the same region (SRR).
- Objects replicated across regions don't need to use the same storage class.

Batch Operations

- Manage billions of objects at scale with a single S3 API request or from S3 console.
- Use Batch Operations to Copy, Invoke AWS Lambda functions, and restore billions of objects.
- Inventory and analytics can be applied to files in S3 in order to understand the data in them

Billing

- tags can be assigned for billing
- you configure S3 so that the requester, not you, pays for data transfer

### Elastic file system (EFS)

EFS is a preformatted file system that scales automatically and has multi-attach is a core feature. For this reason it is a great solution for when you want to share data between multiple EC2 instances. **It can be shared** between different availability zones in a region and even with premises clients. With EFS a file system can be mounted to some mount point on an EC2 instance. The EFS needs to be created within a subnet in a specific region.

### FSx Lustre

For high performace file-based workloads.
