# 03 Cloud services

## Compute scaling

### Auto scaling groups

Autoscaling groups are collections of Amazon EC2 instances that enable automatic scaling. For example if an instance fails a health check, or if the cloud watch monitoring service detects that CPU usage is above a certain threshold in an **AWS Auto Scaling Group** a new instance is spawned.

A scaling plan defines the triggers for when a new instance should be de/provisioned. You configure settings for a group and its instances as well as define the group’s minimum, maximum, and desired capacity. Setting different minimum and maximum capacity values forms the bounds of the group, which allows the group to scale as the load on your application spikes higher or lower, based on demand.

### Elastic load balancing (ELB)

Loading balancing determines where the load is distributed, whereas auto-scaling adjusts the number of servers able to take load. A load balancer is a device that is internet facing and has a single endpoint that redistributes incoming client requests to different servers based on some algorithm.

ELB is an Amazon load balancing service. It also sends health checks to the servers and if one fails to respond in time, it knows to route additional requests to different servers. Load balancers help ensure availability. AWS has three different kinds of ELB: application, network and classic. Classic is being phased out. Application inspects domain names and forwards requests accordingly. Network load balances work at the TCP/UDP/TLS protocol level.

There are two types of load balancers: **application load balancer (ALB)** and **network load balancer (NLB)**. An ALB is generally suitable for HTTP applications and is very feature rich with a wide variety of possible forward rules and cusotmisations. NLB is more suited for non-HTTP applications and has a more limited feature set.
