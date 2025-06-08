# Application architecture

A client is a machine or process that requests data from another machine. In the context of web applications, a common client is a browser or another server. A server is a machine or process that listens for requests and provides data or a service in return. A client and server process can co-exist on the same machine. The client-server model is the foundation of the web: clients request data or a services from servers, and servers provide data or services to clients. Clients and servers can be segmented and organised in different patterns.

## Layered architecture

A Layered architecture is technical partitioning where components are organised into horizontal layers such as presentation, business, persistence, and database. Model, presenter, view (MVP) is another example. The model layer encapsulates data access and business logic, presenter bridges the view and model to ensure clean data transfer, and the view implements the user interface. The layers of the architectures aren’t necessarily deployed together. In layered architectures domain logic tends to get spread through each layer. Tends to be the architecture “by default”.

- Strengths: time, cost, simplicity
- Weaknesses: scalability, elasticity, evolvability, fault tolerance

## Pipeline Architecture

Components are organised into a serial, one-way, bucket brigade of pipes and filters. Filters are stateless, ideally single purpose, operations carried out on the payload that is piped between them. Pipes are the communication channels between the filters. There are four common categories of filters: producer, transformer, tester (conditional outputs), and consumer. A pipeline architecture is ideal for one-way processing tasks, e.g. ETLs.

- Strengths: time, cost, simplicity
- Weaknesses: scalability, elasticity, fault tolerance

## Microkernel Architecture

A core system that can have any number of components plugged in to provide optional, additional functionality.
The core system is either the minimum functionality required, or the main happy path. Plugins can not only provide functionality, but are a good way to isolate volatile code. Generally the core interacts with plugins through a synchronous function call, but can be over the network as well. With this architecture some sort of registry is required to track and apply plugins. Examples include most IDEs, and most browsers. Microkernel architecture is suitable for problems that require different configurations for each location or client.

- Strengths: Cost
- Weaknesses: scalability, elasticity, fault tolerance

## Service-Based Architecture

It’s the simplest of the distributed architectures. A presentation layer interacting with 4-12 coarse grained services, which in turn interact with 1 centrally shared database. Topologically it looks like a meatball sandwich. There are two service designs,

1) direct access design: each module exposes a RESTful endpoint that the API layer accesses, and 
2) API access design where there’s an API access facade.

“Services are just name-spaces” A API-gateway for BFF can be added between the clients and services to consolidate cross-cutting concerns like security, metrics. It is helpful to logically partition into finer grained domains so the services only rely on a subset and changes to the DB only affect a subset.

- Strengths: good initial scalability, good time to market, good fault tolerance
- Weaknesses: Not too many, some duplication since services are coarse grained.

## Event-Driven Architecture

Event-Driven Architectures are for complex and dynamic workflows that are in response to some initiating event. Events are produced and consumed by loosely coupled services. A “request” is synchronous and deterministic, and an event-based model reacts to it event in 1-n different ways. There are two variations: 

1) broker a.k.a fire and forget, and
2) mediator, a.k.a central command.

A brokered event-driven architecture is  “an uncontrolled chain reaction” that is highly scalable and performant. A mediated event-driven architecture has “a centrally managed message delivery” that “can take a corrective action if there’s a failure”. It can be a standalone application or embedded into others. The pub-sub model is common used in event-driven architecture.

## Space-Based Architecture

“A style for dramatic swings in concurrent users”, such as concerns ticket applications, or live auctions.
The database is removed as a synchronous constraint in the system which instead uses replicated in-memory data grids.

- Strengths: elasticity, scalability
- Weaknesses: complicated, expensive and hard to test

## Microservices Architecture

“A currently very popular style invented by Martin Fowler, inspired by DDD’s concept of the bounded context,
involving the functional decomposition of an application. The services contain everything needed to operate (including a DB) and are independently deployable. The services “sidecar” in cross-cutting operational concerns like monitoring and logging are controlled via a service mesh, so there is some operational coupling. There is optionally an API layer. Each microservice is able to call another following the same standard, although they may use a different technology stacks internally. Examples: GitHub, Netflix, Amazon, Ebay, Soundcloud, Yelp, Uber

- Pros: Modular, deployable, evolvable
- Cons: Complexity, cost and performance

## Local-first Architecture

A local-first architecture (4) is a design pattern that prioritises local data storage and processing on the client side, while still allowing for synchronisation with remote servers when necessary. This approach is particularly useful in scenarios where network connectivity may be unreliable or intermittent, as it enables users to continue working with their data even when offline. The architecture typically involves using technologies like IndexedDB or SQLite for local storage, and WebSockets or REST APIs for synchronisation with remote servers. The seven ideals of local-first architecture are:

1. **No spinners**: The primary copy of the data is on the local device, not loaded from the cloud.
2. **Your work is not trapped on one device**: Data is accessible across all of the devices on which a user does their work by synchronising it with other devices in the background.
3. **The network is optional**: Users can read and write this data anytime, even while offline. The data is synchronized with other devices later, when a network connection is available. The data synchronization need not necessarily go via the Internet: local-first apps could also use Bluetooth or local WiFi to sync data to nearby devices.
4. **Seamless collaboration with colleagues**: The app supports real-time collaboration on par with the best cloud apps today, or better.
5. **The long now**: In order to read file formats and preserve interactivity far intor the future, you need to be able to run the original software (if necessary, in a virtual machine or emulator).
6. **Security and privacy by default**: Many professionals cannot use cloud apps due to regulatory compliance and confidentiality obligations, e.g. medical professionals. Local-first apps avoid the centralized cloud database holding everybody’s data. Local-first apps can use end-to-end encryption so that any servers that store a copy of your files only hold encrypted data that they cannot read.
7. **You retain ultimate control and ownership**: In cloud apps, the ways in which you can access and modify your data are limited by the APIs, user interfaces, and terms of service of the service provider. With local-first software, all of the bytes that comprise your data are stored on your own device, so you have the freedom to process this data in arbitrary ways. Access can never be restricted. However, "with data ownership comes responsibility: maintaining backups or other preventative measures against data loss, protecting against ransomware, and general organizing and managing of file archives".

In summary a local-first architectured entails data being stored locally first, synced secondly, and is _still_ multiplayer by Conflict-free Replicated Data Types (CRDTs), "general-purpose data structures, like hash maps and lists, but ... multi-user from the ground up." (4).

Aaron Boodman describes three circles of local-first aaplications in achievability:

┌───────────────────────────────────────────────────────┐
│                                                       │
│  ┌────────────────────────────────────────────────┐   │
│  │                                                │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │                                         │   │   │
│  │  │            Local First                  │   │   │
│  │  │            (7 ideals)                   │   │   │
│  │  │                                         │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                │   │
│  │              Offline-first                     │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│                      Synced                           │
│                                                       │
└───────────────────────────────────────────────────────┘

### References

1. Fundamentals of Software architecture
2. <https://learn.microsoft.com/en-us/azure/architecture/patterns/>
3. https://www.youtube.com/watch?v=f6zXyq4VPP8
4. <https://www.inkandswitch.com/essay/local-first/>