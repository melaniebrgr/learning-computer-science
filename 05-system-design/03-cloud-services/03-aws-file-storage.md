# 03 Cloud services

## File Storage

Broadly speaking, data can be stored in files or stored in databases. Files are often generated in the course of typical web application usage, e.g. user file uploads, invoice generation, image transformations, legal documents, and so on. So we need services for file storage.

There are three types of file storage service:

- block (EBS),
- network file (EFS), and
- object (S3).

These three types provide three different levels of abstraction. **EBS block storage** provides an unformatted hardrive that can be formatted and structured however you like. Any structure and any file can go. If you don't care about the underlying hardrive and its formatting, but do care about configuring the file system however you like, then use a **network files system service like EFS and FSx**. When you don't want to bother with any of that and store files without caring about the underlying system, then use **simple storage service (S3)**.

### Elastic block storage (EBS)

EBS is like a hard drive or solid state drive. **An EBS instance is attached to an EC2 instance** but exists independently from it. It is only for EC2. Once it is attached, it must be formatted and structure. If the instance is shut down, EBS is _not_ shut down, unlike instance store volumes. EBS instances are accessed over a network, unlike instance store volumes that are physically attached the host computer the EC2 instance runs on. EBS must exist in the same region as the instance using it. Attaching multiple EC2 instances to the same EBS volume is possible in some cases, but you must resolve file conflicts. EBS can be configured to scale dynamically.

There are two main categories:

1. solid state drive (SSD) provisioned and general purpose which has better performance (better for databases), and
2. hard disk drives (HDD) for less frequently accessed work loads.

A common practise is to store a snapshot of an EC2 intance on an EBS and use that snapshot when create EC2 instances in future. For custom AMIs, EBS snapshots can be created in S3. These are basically point-in-time diffs of the EBS volume. The snapshots can be access through EC2 APIs and used to migrate instances to different availability zone, as part of a high-availability architecture.

### EC2 Instance Store Volumes

An alternative to EBS. It's storage that's internal to the EC2 instance. It's less popular and common compared to EBS now.

### Elastic file system (EFS)

EFS is a preformatted file system that scales automatically and has multi-attach is a core feature. For this reason it is a great solution for when you want to share data between multiple EC2 instances. **It can be shared** between different availability zones in a region and even with premises clients. With EFS a file system can be mounted to some mount point on an EC2 instance. The EFS needs to be created within a subnet in a specific region.

### Amazon Simple Storage Service (S3)

The world according to S3: everything is an object and objects are uploaded into buckets. Buckets exist in a specific region, but bucket names have a universal namespace and must be unique globally.

S3 can be connected to from a browser over the (public) internet, accessed via a REST API, and from EC2 over the internet or an S3 Gateway. When accessing S3 from EC2, it is recommended to create a role with a policy granting access, instead of storing a secret access key on the EC2 instance. In total, a S3 object is made up of the data itself, metadata, and a global unique identifier. Metadata can include a key, version ID, sub-resources, access control information, and more.

Use cases for S3 include backing up of data, static web site hosting, media hosting, software delivery, bit torrenting (object can be retrieved by bit torrent). Objects up to 5GB in size can be uploaded to S3 in a single put operation, the multipart upload API must be used for larger objects up to 5TB in size. CloudFront can be used to accelerate data upload.

There are 7 Amazon S3 **storage classes**. All share 11 9's of durability but vary slightly in other aspects of availability, zones, fees, and latency. The different storage classes generally align with 3 different types of file access patterns: frequent, infrequent and archival.

- S3 Standard: frequently accessed, 3 or more zones
- S3 Express One Zone: frequently accessed, high-performance (deliver consistent, single-digit ms data access, co-locate object storage with compute resources in a new directory bucket type), single-zone
- S3 Standard-IA: infrequently accessed, 3 or more zones
- S3 One Zone-IA: infrequently accessed, single-zone
- S3 Glacier Instant Retrieval: archive data
- S3 Glacier Flexible Retrieval: archive data
- S3 Glacier Deep Archive: archive data
- S3 Intelligent-Tiering: changing or unknown access patterns, it automatically moving your data between four access tiers when your access patterns change

Save costs by storing infrequently accessed data in S3 Standard-IA or S3 One Zone-IA, and archive data at the lowest costs in S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval, and S3 Glacier Deep Archive.

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

### FSx Lustre

For high performace file-based workloads.
