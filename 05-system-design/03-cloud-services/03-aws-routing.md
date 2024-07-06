# 03 Cloud services

## Routing

### Amazon Virtual Private Cloud (VPC)

"Isolated Cloud Resources". Amazon Virtual Private Cloud (VPC) is an isolated virtual network — your own datacenter — in the AWS cloud. A VPC is launched in a specific region and spans all availability zones in a region. The goal of a VPC is best understood by example. Imagine a scenario where there multiple EC2 instances that should be grouped and be able to talk to each other, but should not be able to be connected to via the internet. A tag could be used to group instances, but what a VPC provides is networking configuration at the group level.

Networking is achieved but setting up subnets within a VPC. It's at the subnet level that control connectivity / network access is set: public subnets have public connectivity, private subnets are not connected to the internet. Each subnet can be placed in a different AZ. All subnets can still speak to each other. A public subnet is connected to the internet with an Internet Gateway. (An internet Gateway is a connection to the public internet.) A NAT gateway also can be set, so that private subnets can connect to outside services but outside services cannot connect to them. A router directs traffic between the subnets and the Internet Gateway. A secure VPN connection can be made between the Internet and Customer Gateways.

A VPC has a collection of IP addresses associated with it, and subnets have a subset of those. **Network Address Translation (NAT)** Gateway can be created in a public subnet that communicates with an EC2 instance in a private subnet and with the Internet Gateway. The same problem can be similarly solved by a NAT Instance but it is self managed. **AWS Transit Gateway** is a way to connect multiple VPCs through a central hub. It avoids complex peering relationships (1:1 connections). Data is encrypted--it is not the public internet.

Every instance in a subnet has a private IP address and if it's in a public subnet it will have a public address. When the instance is stopped and restarted it will lose and get a new public IP. If you don't want to lose the public IP, you can create a permanent elastic IP.

### Regions and availability

AWS services can either be global or regional. For example, Route 53, CloudFront, and IAM are global. You don't want to configure these in different regions. However, the majority of services are regional. For many services, you can select the region to deploy to. Pricing, service offerings, legal concerns, and proximity to users vary between regions.

A "region" is a physically isolated geographical area (~100 miles apart) with a cluster of at least three 3 (or more) availability zones (AZs). An AZ contains 1 or more datacenters that are also physically seperated (~2 miles apart) and have their own power source. Resources are launched into AZs. If one AZ has an outage it can fail over to another AZ. Although they are physically isolated, regions and AZs have a direct, low-latency, global network connecting to each other.

Health of services used by your account can be observed from the service health dashboard. A general overview of all service health around the world can also be viewed.

### Route 53

A domain name system (DNS) is responsible for resolving the domain names we enter in a browser to an internet protocol (IP) address of the instance where the web service might run. **Route 53** is a DNS that can also do domain name registration. Route 53 can create different kinds of records:

- A (name to IP)
- CNAME, or canonical name (name to another name)
- MX (mail)

Route 53 can direct to different IP addresses based on different policies. A simple routing policy does a simple mapping, a weighted routing policy will route to an IP address depending on the weighting assigned to it, a latency routing policy will route based on geographic proximity, a failover routes depending on a health check. This is how multi-region load balancing is possible. (Load balancers can only span one region). Make use to use the **certificate manager** to create SSL certificates for HTTPS encryption.

### Cloudfront

Cloudfront is a content delivery network (CDN) that lets you store/cache content in "edge locations" all over the world (both the larger regional edge caches and the global edge locations), improving request latency. It also offers some protection against DDoS attacks.
In Cloudfront a "distribution" is configured that connects to a set of data sources, then you define the behaviour of that distribution. Caching policies can be created and attached to distributions.

### Local zones, outposts, wavelength

**Local zones** are like "small regions" that offer a subset of services but are situated in metropolitan areas for ultimate low latency. "AWS managed smaller datacenters in metropolitan areas." VPCs can be extended to Local Zones. **Wavelength zones** are mini regions of AWS service running in 5G network stations, for ultimate low latency delivery of services by 5G.

### Global Accelerator and S3 transfer acceleration

"AWS Global Accelerator is a networking service that sends your user’s traffic through Amazon Web Service’s global network infrastructure, improving your internet user performance by up to 60%. When the internet is congested, Global Accelerator’s automatic routing optimisations will help keep your packet loss, jitter, and latency consistently low." GA is a new AWS service that connects local and global users over the AWS global network instead of the internet, directing traffic to the closet region and providing automatic failover. The Edge locations point to different server instances. It's somewhat akin to a load balancer. **S3 transfer acceleration** similar is about using AWS' network to deliver S3 content faster. You pay more for a speed boost.

### Direct Connect

A direct, private network connection is also possible. **AWS Direct Connect** can be used as an alternative to connecting to a VPC via the internet and it enables a hybrid cloud architecture. An AWS Direct Connect connection is a private, dedicated link to AWS. Direct Connect has a higher bandwidth compared to a managed VPN, but takes weeks to months to setup and is much more expensive. As it does not use the internet, performance is consistent.

### Private Link

AWS' internet. Doesn't use _the internet_. Uses VPC endpoints.