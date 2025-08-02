# Data synchronization / sync engine

Let's talk about collaboration. Git is a collaboration software. Updates made by others are pulled in manually, conflicts are resolved manually, and your updates are pushed manually. Difference between software back by CRDTs like Yjs is that the conflict resolution is automatic.

## Yjs

"Yjs was designed to solve the hard problem of collaborative editing on the web.

It is based on a sequence CRDT. The YJs core library only handles concurrency, and conflict resolution through its data types. In terms of using Yjs in a project there are two main parts: the **document and provider**. A Yjs document holds all the state. A Yjs provider sends and receives document updates. Usually, a provider involves wrapping a network technology like web sockets in order to send the document between clients, like the Hocuspocus provider. Under the hood, Yjs uses a binary format with some extra metadata so that it can efficiently and reliably sync documents. What the Yjs core library doesn't do:

- communicate to other servers
- store data updates in a database
- provide data bindings to editors and UI frameworks like React

There are separate modules for this in the Yjs ecosystem.

One important piece of metadata is the client ID. It’s a random number that uniquely identifies a client for a session. **Every time you create a Yjs document, you get a new client ID**.

### Document & Data structure

A YDoc document is basically a collection of types. Everyone who defines a type in the collection in the same way shares that type between them. These features are called Shared Types. Shared types are similar to JavaScript data structures such as Map but automatically sync between clients.

Everything in YJs is built on a linked list. In fact, the linked list links model the concurrent behaviour of the CRDT: text insertion is a link insertion. An Item structure is a link in a linked list.

The CRDT model consists of these "Items objects". Each of the Shared Types, like YText, are views on the Items and are responsible for extracting information from the Item structure and representing it to a user. That is, each type, e.g. Text Type, is a _view_ of the CRDT object model.

YText accepts a number of content types, e.g. binary, strings, JSON for encoding. YText implements an Abstract Type. The Abstract Types always defines a list CRDT with a start, end, and list of Items. An item is a representation of the linked list, and is how the sequence CRDT is built.

### Awareness

Awareness is a broad topic and area of research with it's own dedicated journals. There are many different levels of awarenss, for example:

- video conferencing: awareness of who is in the room, what their doing, their body language, how they migh be feeling. This is a very high level of awareness.
- WhatsApp: awareness of whether your messages was delivered, if it was read, who is online, and therefore when you can expect a reply. This is a moderate level of awareness.
- version control systems: awareness only comes after, when you pull in changes you can then see what others have done, what files they worked on, etc. This is a low level of awareness.

In short, awareness fosters collaboration. Awareness also helps with conflict resolution: if you see someone editing a part of the document you will be inclined to wait for then to finish before making your own changes.

Awareness is part of the Yjs ecosystem. It has it's own protocol. A cursor is displayed after a character where the next text will be inserted.

### Data synchronization

In the context of Yjs, **Lamport timestamps** are used to uniquely identify operations like text insertions or deletions. Each character in a YJs document is identified by a combination of a client ID and a Lamport timestamp. Insertion position for concurrent operations is determined by comparing the client ID--like in operational transform--and the Lamport timestamp. The larger client ID follows the smaller one, and the larger Lamport timestamp follows the smaller one.

To be more efficient in JavaScript, YJs makes some performance optimizations. For example, not every character is an object in memory, but some Items are compressed ranges of characters. It gets complicated when you want to insert within the range as then they need to be split up into segments. The fragments can never be merged back together as that would lose the history of changes. As well, when a character is deleted, it is only marked as deleted. However, within a deleted structure a lot of the information can be removed, e.g. the content and subnested structs.

There is an event system on the YDoc where basically a collection of messages are sent to peers.

#### Use common Yjs keys by default

For shared values, start with a common key so everyone is editing the same thing. Use the clientID as a key only when needed for per-client or per-session data. This balances conflict avoidance with the need for collaboration.

In distributed systems like collaborative ones built with Yjs, using the ⁠clientID⁠ as a key is a useful strategy when you want to keep each client’s contributions separate, e.g.

- Counters: Each client increments their own value, and the total is the sum of all client values. This avoids overwriting and lost updates.
- Presence or awareness data: Each client can store their own cursor position, selection, or status under their unique ID.

If you want clients to collaboratively edit a single value (like a shared document title, or a to-do item’s text), you typically use a fixed, well-known key. In these cases, using the clientID would fragment the data, making it hard to merge or display a single, unified value.

**When to use a common key:** When you want all clients to collaborate on the same piece of data (e.g., shared text, lists, or objects).

**When to use clientID as a key:** When each client should have their own independent value (e.g., per-user settings, distributed counters, presence). When you want to avoid conflicts and overwrites between clients.

#### Reordering items in Yjs

Once you add a shared type to a document, it can never be moved. You can change what it contains and you can delete it, but you can’t move it from one place to another. Instead of relying on Y.Arrays ordering, we can solve this by adding an index property to each todo. The ordered list of todos is array sorted by the index property. To move a todo, simply set a new index!

While that sort of works works, it presents a new problem. If you move a todo before another one, wouldn’t you need to change that todo’s index as well? Come to think of it, wouldn’t you need to change every subsequent todo’s index?

The trick is a technique called fractional indexing, in which indices are fractions rather than integers.

Each item receives a fraction between 0 and 1, exclusive. To move an item, simply set its index to a fraction between the two adjacent items’ indices. Usually, that’s as simple as taking the average of the two indices: add them together and divide by two.

The “exclusive” part is important. Because no item will ever have an index of 0 or 1, those numbers can be used to move items to the extremes of the list. Moving an item to the beginning of the list means finding a fraction between 0 and the first item, while moving an item to the end means finding a fraction between the last item and 1.

To prevent the two todos from sharing the same index, we can pick a random number between their indices rather than averaging them. Since Math.random() returns a number that could equal 0, we add `Number.MIN_VALUE` to ensure the resulting index is between the start and end, exclusive (2).

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

1. "Near real-time peer-to-peer shared editing of extensible data types" - Kevin Jahns
2. <https://learn.yjs.dev/lessons/03-todo-list/>
