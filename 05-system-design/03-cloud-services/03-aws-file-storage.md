# 03 Cloud services

## File Storage

Broadly speaking, data can be stored in files or stored in databases, and files are frequently generated in the course of regualar web application usage, e.g. user uploads, generated invoices, transformed images, accounting files, legal documents, and so on. So we need services for file storage.

There are three types of file storage service: block (EBS), and network file (EFS), and object (S3). THese three types provide three different levels of abstraction.
EBS block storage provides an unformatted hardrive that can be formatted and structured however you like. Any structure and any file can go. If you dont care about the underlying hardrive and its formatting, but do care about configuring the file system however you like then use a network files system service like EFS and FSx. When you don't want to bother with any of that and store files without caring about the underlying system, then use a "simple storage service" (S3).

### Amazon Simple Storage Service (S3)

The world according to S3: everything is an object and objects are uploaded into buckets. While buckets exist in a specific region, because it is a universal namespace, bucket names must be unique globally.

S3 can be connected to from a browser over the (public) internet, accessed via a REST API, and from EC2 over the internet or an S3 Gateway. When accessing S3 from EC2, it is recommended to create a role with a policy granting access, instead of storing a secret access key on the EC2 instance. In total, a S3 object is made up of the data itself, metadata, and a global unique identifier. Metadata can include a key, version ID, sub-resources, access control information, and more.

What can you do with S3? Use cases include backing up of data, web app hosting, media hosting, and software delivery. Objects up to 5GB in size can be uploaded to S3 in a single put operation, for large objects up to 5TB the multipart upload API must be used.

There are 6 Amazon S3 **storage classes**. All share 11 9's of durability but vary slightly in other aspects of availability, zones, fees, and latency. The different storage classes generally align with 3 different types of file access patterns: frequent, infrequent and archival.

- standard: durable, immediately available and frequently accessed
- standard-IA: designed for when you don't need to access often
- one zone-IA: only available in one zone, every other class is available in 3 or more zones. designed for when you don't need to access often (even lower availability)
- glacier: for archival data that needs to be backed-up longterm but doesn't need to be accessed often
- glacier deep archive: lowest cost storage and will take longest to retrieve data
- intelligent tiering: automatically moves data to most cost effective tier for usage pattern when you don't know where to put the file

Features of S3:

- you can use CloudFront to accelerate data upload
- you configure S3 so that the requester, not you, pays for data transfer
- tags can be assigned that can be leveraged in billing
- events can be set on buckets that trigger lambdas
- inventory and analytics can be applied to files in S3 in order to understand the data in them
- locks can be applied to objects to prvetn changes or deletions for auditing purposes
- files can be automatically encrypted on upload
- lifecycle policies can be configured to deal with changing access patterns
- versioning can be configured and when enabled each file version can be accessed, even deleted files
- S3 can be set up to replicate objects across regions (CRR) or in the same region (SRR). Objects replicated across regions don't need to use the same storage class.
- it can be used to host static websites
- it can be used for bit torrenting (object can be retrieved by bit torrent)

### Elastic block storage (EBS)

EBS is like a hard drive or solid state drive. An EBS instance is attached to an EC2 instance but exists independently from it. It is only for EC2. Once it is attached, it must be formatted and structure. If the instance is shut down, EBS is _not_ shut down unlike instance store volumes. EBS instances are accessed over a network, unlike instance store volumes that are physically attached the host computer the EC2 instance runs on. EBS must exist in the same region as the instance using it. Attaching multiple EC2 instances to the same EBS volume is possible in some cases, but you must resolve file conflicts. EBS can be configured to scale dynamically.

There are two main categories:

1. solid state drive (SSD) provisioned and general purpose which has better performance (better for databases), and
2. hard disk drives (HDD) for less frequently accessed work loads.

A common practise is to store a snapshot of an EC2 intance on an EBS and use that snapshot when create EC2 instances in future. For custom AMIs, EBS snapshots can be created in S3. These are basically point-in-time diffs of the EBS volume. The snapshots can be access through EC2 APIs and used to migrate instances to different availability zone, as part of a high-availability architecture.

### EC2 Instance Store

An alternative to EBS. It's storage that's internal to the EC2 instance. It's less popular and common compared to EBS now.

### Elastic file system (EFS)

EFS is a preformatted files system, scales automatically, and multi-attach is a core feature. For this reason it is a great solution for when you want to share data between multiple EC2 instances. It can be shared between different availability zones in a region and even on premises clients. With EFS a file system can be mounted to some mount point on an EC2 instance. The EFS needs to be created within a subnet in a specific region.

### FSx Lustre

For high performace file-based workloads.

### Storage Gateway

is for on premises cloud storage (like a Google Drive). It gives you a local, low-latency cache. There are three types: Tape, File and Volume Gateway.