# 03 Cloud services

## Cloud management

### Amazon Virtual Private Cloud (VPC)

"Isolated Cloud Resources". Amazon Virtual Private Cloud (VPC) is an isolated virtual network — your own datacenter — in the AWS cloud. A VPC is launched in a specific region and spans all availability zones in a region. The goal of a VPC is best understood by example. Imagine a scenario where there multiple EC2 instances that should be grouped and be able to talk to each other, but should not be able to be connected to via the internet. A tag could be used to group instances, but what a VPC provides is networking configuration at the group level.

Networking is achieved but setting up subnets within a VPC. It's at the subnet level that control connectivity / network access is set: public subnets have public connectivity, private subnets are not connected to the internet. Each subnet can be placed in a different AZ. All subnets can still speak to each other. A public subnet is connected to the internet with an Internet Gateway. (An internet Gateway is a connection to the public internet.) A NAT gateway also can be set, so that private subnets can connect to outside services but outside services cannot connect to them. A router directs traffic between the subnets and the Internet Gateway. A secure VPN connection can be made between the Internet and Customer Gateways.

A VPC has a collection of IP addresses associated with it, and subnets have a subset of those. **Network Address Translation (NAT)** Gateway can be created in a public subnet that communicates with an EC2 instance in a private subnet and with the Internet Gateway. The same problem can be similarly solved by a NAT Instance but it is self managed. **AWS Transit Gateway** is a way to connect multiple VPCs through a central hub. It avoids complex peering relationships (1:1 connections). Data is encrypted--it is not the public internet.

Every instance in a subnet has a private IP address and if it's in a public subnet it will have a public address. When the instance is stopped and restarted it will lose and get a new public IP. If you don't want to lose the public IP, you can create a permanent elastic IP.