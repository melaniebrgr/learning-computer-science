# 03 Cloud services

## Networking

- Regions
- Route 53
- Direct connect
- Private Link
- Local Zones
- Wavelength
- Virtual Private Cloud (VPC)
- Virtual Private Network (VPN)

### Regions and availability

AWS services can either be global or regional. For example, Route 53, CloudFront, and IAM are global. You don't want to configure these in different regions. However, the majority of services are regional. For many services, you can select the region to deploy to. Pricing, service offerings, legal concerns, and proximity to users vary between regions.

A **Region** is a geographical area that contains AWS resources. An **Availability Zone** is a single data center or a group of data centers within a Region. Availability Zones are located 10s of miles apart from each other and have their own power source. This is close enough to have low latency (the time between when content requested and received) between Availability Zones. However, if a disaster occurs in one part of the Region, they are distant enough to reduce the chance that multiple Availability Zones are affected. For example, The Northern California Region is called `us-west-1`, and this Region contains three AZs (`1a`, `1b`, and `1c`). Then, within each AZ there are three data centers.

When choosing a region to operate out of, there are four main considerations:

1. **Compliance**: Depending on your company and location, you might need to run your data out of specific areas. For example, if your company requires all of its data to reside within the boundaries of the UK, you would choose the London Region. By default, data in a region _stays_ in that region, unless you explicitely give it permission to move outside of that region.
2. **Proximity to customers**: The speed of light is still an upper limiting factor. Selecting a Region that is close to your customers will help you to get content to them faster.
3. **Service availability**: Sometimes, the closest Region might not have all the features that you want to offer to customers. AWS is frequently innovating by creating new services and expanding on features within existing services. However, making new services available around the world sometimes requires AWS to build out physical hardware one Region at a time.
4. **Pricing**: The cost of services can vary from Region to Region.

### Edge computing

#### Cloudfront

Cloudfront is a content delivery network (CDN) that lets you store/cache content in "edge locations" all over the world (both the larger regional edge caches and the global edge locations), improving request latency. It also offers some protection against DDoS attacks.
In Cloudfront a "distribution" is configured that connects to a set of data sources, then you define the behaviour of that distribution. Caching policies can be created and attached to distributions.

#### Route 53

**Route 53** is a DNS web service. It gives developers and businesses a reliable way to route end users to internet applications hosted in AWS. Domain Name System (DNS) resolution involves a customer DNS resolver communicating with a company DNS server. A DNS resolver is responsible for resolving the domain names we enter in a browser to an internet protocol (IP) address of the instance where the web service might run. **Route 53** is a DNS resolver and can als do domain name registration. Route 53 can create different kinds of records:

- A (name to IP)
- CNAME, or canonical name (name to another name)
- MX (mail)

Route 53 can direct to different IP addresses based on different routing policies.

- A simple routing policy does a simple mapping,
- a weighted routing policy will route to an IP address depending on the weighting assigned to it,
- a latency-based routing policy will route based on geographic proximity,
- a failover routes depending on a health check, or
- a weighted round robin.

Multi-region load balancing is possible like this. (Load balancers can only span one region). Make use to use the **certificate manager** to create SSL certificates for HTTPS encryption.

### Local zones, outposts, wavelength

**Local zones** are like "small regions" that offer a subset of services but are situated in metropolitan areas for ultimate low latency. "AWS managed smaller datacenters in metropolitan areas." VPCs can be extended to Local Zones. **Wavelength zones** are mini regions of AWS service running in 5G network stations, for ultimate low latency delivery of services by 5G. With **outposts** you can run AWS services on prem, and become and AWS outpost, if you will.

### AWS Global Accelerato

"**AWS Global Accelerator** is a networking service that sends your user’s traffic through Amazon Web Service’s global network infrastructure, improving your internet user performance by up to 60%. When the internet is congested, Global Accelerator’s automatic routing optimisations will help keep your packet loss, jitter, and latency consistently low." GA is a new AWS service that connects local and global users over the AWS global network instead of the internet, directing traffic to the closet region and providing automatic failover. The Edge locations point to different server instances. It's somewhat akin to a load balancer. **S3 transfer acceleration** similar is about using AWS' network to deliver S3 content faster. You pay more for a speed boost.

### Amazon Virtual Private Cloud (VPC)

> A VPC lets you provision logically isolated sections of the AWS Cloud where you can launch AWS resources. These resources can be public facing with **internet gateway** so they have access to the internet, or private with no internet access but accessible privately via **virtual private gateway**. _The public and private grouping of resources are known as subnets_ and they are ranges of IP addresses in your VPC. A VPC is launched in a specific region and spans all availability zones in a region. Each subnet can be placed in a different AZ. 

**AWS Transit Gateway** is a way to connect multiple VPCs through a central hub. It avoids complex peering relationships (1:1 connections). Data is encrypted--it is not the public internet.

Imagine there multiple EC2 instances that should be grouped and be able to talk to each other, but should not be able to be connected to via the internet. A tag could be used to group instances, but what a VPC provides is networking configuration at the group level--a subnet.

Networking is achieved but setting up **subnets** within a VPC. It's at the subnet level that network access is enforced: public subnets have public connectivity, private subnets are not connected to the internet. Public subnets contain resources that need to be accessible by the public, such as an online store’s website. Private subnets contain resources that should be accessible only through your private network, such as a database that contains customers’ personal information and order histories.

A public subnet is connected to the internet with an **Internet Gateway**. That is, an internet Gateway is a connection to the public internet. A **NAT gateway** allows private subnets can connect to outside services but outside services cannot connect to them. A router directs traffic between the subnets and the Internet Gateway. A secure VPN connection can be made between the Internet and **Customer Gateway**s.

NAT service allows instances in private subnets to initiate a connection and connect to services outside the VPC. (External services cannot initiate a connection with those instances however). There are two connectivity types, "public" and "private". Basically it's all about IP address translation, "Both private and public NAT gateways map the source private IPv4 address of the instances to the private IPv4 address of the NAT gateway, but in the case of a public NAT gateway, the internet gateway then maps the private IPv4 address of the public NAT Gateway to the Elastic IP address associated with the NAT Gateway."

- public: an elastic IP is associated with the NAT Gateway and traffic is routed from the NAT gateway to the internet gateway for the VPC, to other VPCs, or an on-prem network throgh a transit or virtual private gateway.
- private: You cannot associate an elastic IP address with a private NAT gateway. Basically it's like the public one minus the internet connection.

**Network access control lists (NACLs)** are firewalls applied at the subnet level. They are analogous to a passport control officer, checking packets on entry _and_ exit. NACLs are a firewall for a subnet that checks every incoming and outgoing requests and sometimes blocks based on certain rules. NACLs are "stateless" in that it has no memory of wether it allowed an packet to enter--it checks it again on exit. There is one NACL per subnet.

By default, your account’s default network ACL allows all inbound and outbound traffic, but you can modify it by adding your own rules. For custom network ACLs, all inbound and outbound traffic is denied until you add rules to specify which traffic should be allowed. Additionally, all network ACLs have an explicit deny rule. This rule ensures that if a packet doesn’t match any of the other rules on the list, the packet is denied.

NACLs enforce the subnet boundary, but different EC2 instances can also have different entry regulations. For this there are security groups, which are like a door attendant. A **security group** is a firewall for a single EC2 instance that checks incoming and outgoing requests and sometimes blocks them. It is "stateful" in that if a packet was allowed once, it will always allowed to exit and renter. There can be multiple security groups for an instance. By default, a security group denies all inbound traffic and allows all outbound traffic. You can add custom rules to configure which traffic should be allowed; any other traffic would then be denied.

### Misc. networking

- **Private Link**: AWS' internet. Doesn't use _the internet_. Uses VPC endpoints.
- **Customer gateway device**: a physical or software appliance that you own or manage in your on-premises network on your side of a Site-to-Site VPN connection.
- **Transit Gateway**: For multi-region VPCs, AWS Transit Gateway connects your Amazon Virtual Private Clouds (VPCs) and on-premises networks through a "hub and spoke" model. "You can also take advantage of the hub-and-spoke architecture created by Transit Gateway to centralize access to shared services such as traffic inspection, interface VPC endpoint access, or egress traffic through a NAT gateway or NAT instances. This centralization simplifies the complexity of managing these resources in several VPCs, and allow for a better control as you extend your footprint in AWS."
- **Virtual private gateway associations**: Use AWS Direct Connect gateway to connect your AWS Direct Connect connection over a _private virtual interface_ to one or more VPCs in any account that are located in the same or different Regions.
- **VPN**: A secure connection between your on-premises equipment and your VPCs. By default, instances that you launch into an Amazon VPC can't communicate with your own (remote) network. You can enable access to your remote network from your VPC by creating an AWS Site-to-Site VPN (Site-to-Site VPN) connection, and configuring routing to pass traffic through the connection.
- **AWS Direct Connect**: is an alternative to connecting to a VPC via the internet and it helps support hybrid cloud architectures. _Direct Connect has a higher bandwidth compared to a managed VPN, but takes weeks to months to setup and is much more expensive_. As it does not use the internet, performance is consistent. Direct Connect An AWS Direct Connect connection is a private, dedicated link to AWS. "AWS Direct Connect links your internal network to an AWS Direct Connect location over a standard Ethernet fiber-optic cable. One end of the cable is connected to your router, the other to an AWS Direct Connect router." Bypass ISPs to connect directly to AWS services.