# Data synchronization / sync engine

## Yjs

YJs was designed to solve the hard problem of collaborative editing on the web. It is based on a sequence CRDT.

There are two parts to Yjs: **documents and providers**. A Yjs document holds all the state. Documents receive updates using providers. Usually, that involves wrapping a network technology like WebSockets in order to send documents between clients, like the Hocuspocus provider. Under the hood, Yjs uses a binary format with some extra metadata so that it can reliably sync documents.

Yjs has types that are manipulated and synced automatically, these features  are called shared types. Shared types are similar to JavaScript data structures such as Map but automatically sync between clients.

One important piece of metadata is the client ID. It’s a random number that uniquely identifies a client for a session. **Every time you create a Yjs document, you get a new client ID**.

### Document

### Data structure

A YDoc document is basically a collection of types. Everyone who defines the a type in the collection in the same way shares it between them.

Everything in YJs is built on a linked list. In fact, the linked list links model the concurrent behaviour of the CRDT: text insertion is a link insertion. An Item structure is a link in a linked list.

The CRDT model consists of these "Items objects". Each of the Shared Types, like YText, are views on the Items and are responsible for extracting information from the Item structure and representing it to a user. That is, each type, e.g. Text Type, is a _view_ of the CRDT object model.

YText accepts a number of content types, e.g. binary, strings, JSON for encoding. YText implements an Abstract Type. The Abstract Types always defines a list CRDT with a start, end, and list of Items. An item is a representation of the linked list, and is how the sequence CRDT is built.

### Data synchronization

In the context of Yjs, **Lamport timestamps** are used to uniquely identify operations like text insertions or deletions. Each characted in a YJs document is identified by a combination of a client ID and a Lamport timestamp. Insertion position for concurrent operations is determined by comparing the client ID--like in operational transform--and the Lamport timestamp. The larger client ID follows the smaller one, and the larger Lamport timestamp follows the smaller one.

To be more effecient in Javascript, YJs makes some performance optimizations. For example, not every character is an object in memory, but some Items are compressed ranges of characters. It get's complicated when you want to insert within the range as then they need to be split up into segments. The fragments can never be merged back together as that would lose the history of changes. As well, when a character is deleted, it is only marked as deleted. However, within a deleted structure a lot of the information can be removed, e.g. the content and subnested structs.

There is an event system on the YDoc where basically a collection of messages are sent to peers.

## Lamport timestamp

A Lamport timestamp is a logical clock used to order events in distributed systems. A Lamport timestamp is a concept introduced by computer scientist Leslie Lamport to help determine the order of events in distributed systems, where there is no single global clock. Instead of relying on physical time, Lamport timestamps use a simple counter to track the sequence of events. Lamport Timestamps help resolve the “happened-before” relationship in distributed systems. How Lamport Timestamps work:

- Each process in a distributed system maintains its own counter (the Lamport clock).
- When a process performs an event (like sending a message), it increments its counter.
- When a process sends a message, it includes its current counter value with the message.
- When a process receives a message, it sets its counter to the maximum of its own value and the received value, then increments it by one.

Example, suppose you have two processes, A and B:

1. A starts with counter = 0, B starts with counter = 0.
2. A sends a message to B: A increments its counter to 1, then sends the message with timestamp 1.
3. B receives the message, sets its counter to max(0,1) = 1, and increments by 1, so its counter = 2. Now, B knows that the event from A happened before its own event.

This way, Lamport timestamps provide a partial ordering of events, ensuring that if one event causally precedes another, its timestamp will be smaller. They do not provide a total order of all events, but they guarantee that causally related events are ordered correctly.

YJs is more resilient to offline and asynchronous operations because it relies on relative position of operations instead of absolute positioning. It is possible to more accurately and predictively order operations when they are based on the relative position in sequence instead of absolute. Taking a string of text to be a list.

## References

- "Near real-time peer-to-peer shared editing of extensible data types" - Kevin Jahns
