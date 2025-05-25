# Application architecture

A client is a machine or process that requests data from another machine.
In the context of web applications, a common client is a browser or another server.
A server is a machine or process that listens for requests and provides data or a service in return.
A client and server process can co-exist on the same machine.
The client-server model underpins the web: clients request data or a services from servers, and servers provide data or services to clients.
clients and servers can be segmented and organised following many different patterns.

## Layered architecture

A technical partitioning where components are organised into horizontal layers, e.g. presentation, business, persistence, and database.
MVP or model, presenter, view is another example. The model layer encapsulates data access and business logic, presenter bridges the view and mode to ensure clean data transfer, and the view implements the user interface.
The layers of the architectures aren’t necessarily deployed together.
Domain logic tends to get spread through each layer.
Tends to be the architecture “by default”.
Strengths: time, cost, simplicity
Weaknesses: scalability, elasticity, evolvability, fault tolerance

## Pipeline Architecture

Components are organised into a serial, one-way, bucket brigade of pipes and filters.
Filters are stateless, ideally single purpose, operations carried out on the payload that is piped between them.
Pipes are the communication channels between the filters.
There are four common categories of filters: producer, transformer, tester (conditional outputs), and consumer.
Ideal for one-way processing tasks, e.g. ETLs
Strengths: time, cost, simplicity
Weaknesses: scalability, elasticity, fault tolerance

## Microkernel Architecture

A core system that can have any number of components plugged in to provide optional, additional functionality.
The core system is either the minimum functionality required, or the main happy path.
Plugins can not only provide functionality, but are a good way to isolate volatile code.
Generally the core interacts with plugins through a synchronous function call, but can be over the network as well.
With this architecture some sort of registry is required to track and apply plugins.
Examples include most IDEs, and most browsers.
Suitable for problems that require different configurations for each location or client.
Strengths: Cost
Weaknesses: scalability, elasticity, fault tolerance

## Service-Based Architecture

It’s the simplest of the distributed architectures.
A presentation layer interacting with 4-12 coarse grained services, which in turn interact with 1 centrally shared database.
Topologically it looks like a meatball sandwich.
There are two service designs, 1) direct access design: each module exposes a RESTful endpoint that the API layer accesses, and 2) API access design where there’s and API access facade.
“Services are just name-spaces”
A API-gateway for BFF can be added between the clients and services to consolidate cross-cutting concerns like security, metrics.
It is helpful yo logically partition into finer grained domains so the services only rely on a subset and changes to the DB only affect a subset.
Strengths: good initial scalability, good time to market, good fault tolerance
Weaknesses: Not too many, some duplication since services are coarse grained.

## Event-Driven Architecture

For complex and dynamic workflows that are in response to some initiating event.
Events are produced and consumed by loosely couple services.
A “request” is synchronous and deterministic, and an event-based model reacts to it event in 1-n different ways. 
There are two variations: broker a.k.a fire and forget, and mediator, a.k.a central command.
A brokered event-driven architecture is  “an uncontrolled chain reaction” that is highly scalable and performant.
A mediated event-driven architecture is “a centrally managed message delivery” that “can take a corrective action if there’s a failure”.
It can be a standalone application or embedded into others.
The pub-sub model is common used in event-driven architecture.

## Space-Based Architecture

“A style for dramatic swings in concurrent users”, such as concerns ticket applications, or live auctions.
The database is removed as a synchronous constraint in the system which instead uses replicated in-memory data grids.
Strengths: elasticity, scalability
Weaknesses: complicated, expensive and hard to test

## Microservices Architecture

“A currently very popular style invented by Martin Fowler, inspired by DDD’s concept of the bounded context.
Involves the functional decomposition of an application.
The services contain everything it needed to operate (including a DB) and are independently deployable.
The services “sidecar” in cross-cutting operational concerns like monitoring and logging are controlled via a service mesh, i.e. there is some operational coupling.
There is optionally an API layer.
Each microservice should be able to call another following the same standard, although they may use a different technology stack.
Examples: GitHub, Netflix, Amazon, Ebay, Soundcloud, Yelp, Uber
Pros: Modular, deployable, evolvable
Cons: Complexity, cost and performance

### References

1. Fundamentals of Software architecture
2. <https://learn.microsoft.com/en-us/azure/architecture/patterns/>
3. https://www.youtube.com/watch?v=f6zXyq4VPP8