# Volatility-based System Design

System design fundamentals
By Juval Lowy

“When all you have is a hammer everything looks like a nail, even when it’s your toes.”

Architecture is always an act of decomposition. You’re taking a big nebulous idea and breaking it into units of modularity.

Most software systems today are decomposed based on functionality (buy, sell, report), which is wrong. Functional decomposition is not a scalable approach and will end up impeding the business. This is because logic required to organise the functions will end up baked into the clients or others components and limit further clients and functionality to be added in future as the complexity grows. Additionally, the more valuable tests test integration, but testing functionally decomposed systems is also very hard. Unit testing is “like searching for your keys only where a spotlight is shining”.

Never design against the requirements. The universe is not put together with features implemented against requirements. Decompose based on volatility. It is a universal principle of good design. The human body is an example of decomposition based on volatility: the heart handles all the volatility of pumping blood. By doing so you isolate the risk of making changes. By contrast in functional decomposition you are more likely to need to change multiple places and have a greater system impact.

The challenge is that volatility is not self-evident and you need to put it effort. We need ways to identify and list areas of volatility. Walk through use cases and examine axes of volatility. A use case (not a user case, because there may not be an actual person involved) is a series of actions that need to be performed, a workflow.
- As users change over time, what is likely to change in the system?
- As the system is “moved” to different regions, what is likely to change?
- For different types of users, what is likely to change?
- How differently are competitors doing it (the differences are areas of potential volatility, the things that are the same are intrinsic to the nature of the business.).
You could and should spend several days creating a list of areas of volatility. 

Translating areas of volatility to services is hardly ever 1:1. Start with the most obvious thing—some mappings are straight forward. You might be tempted to encapsulate everything that changes, resist this by recognising that changes related to the business are less likely to change, e.g. business is single family or hotel.

“The transition from the list of volatile areas to components of the architecture is hardly ever one to one. Sometimes a single component can encapsulate more than one area of volatility. Some areas of volatility may not be mapped directly to a component but rather to an operational concept such as queuing or publishing an event. At other times, the volatility of an area may be encapsulated in a third-party service.”

More like, draw boxes in your diagram of some sort for each area of volatility.

A layer pattern may be a good starting point for thinking about service structure, and there are some patterns involved in organising services in those layer to encapsulate volatility.
- client: a good way to encapsulate the common volatility of having different consumers
- Business: capture volatility in required business behaviour
    - Managers: “nouns” that encapsulate volatility in use case/workflow sequence (order, conditional, duplication), e.g. A-B-C vs, A-(B or C).
    - Engine: “verbs” that encapsulate volatility in the activities of the workflow. e.g. A1 vs A2.
- Resource access: encapsulates volatility in how the resource is accessed. A classic mistake is to expose the CRUDs, insert, select, delete. These verbs don’t carry over to different resources. Instead expose atomic business verbs, which pertain to types of business, e.g. credit, and debit.
- Resources: physical resources
- Utilities: common infra, e.g. security, logging, hosting, message bus

How to validate your architecture? Take the list of use cases you identified and see if a call chain diagram can be created for each use case. Another diagram is a sequence diagram, but they take longer to create. Typically there are never more than 6 core uses cases to a system. Image a 1-page brochure for the system, a.k.a start with the press release. Find the smallest set of building blocks to satisfy the core use cases. All other uses cases are variations of the core use case and will be captured as different interactions of existing building blocks. For a maximum of 6 use cases, the number of components that satisfy them is about 10.

Making sure who, what, how and where are captured by the clients, managers, engines/resource accessors, and resources is another way to validate the architecture.

Lastly, check against the design donts list.

Exercise:
Go through design patterns and identify what kind of volatility they encapsulate
