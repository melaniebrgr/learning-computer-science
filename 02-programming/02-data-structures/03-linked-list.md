# Linked list

A linked list is a daisy chain of nodes where each node contains a reference to another node. The most common or basic list type is a linear linked list.

A circular linked list is a data structure where the last node points back to the first node, creating a continuous loop. This is different from a regular linked list, where the last node points to NULL.

The structure allows for endless traversal and is used in applications like round-robin scheduling.

Linked list interface,

```ts
interface LinkedList<T> {
    get length(): number;
    insertAt(index: number, item: T): void;
    removeAt(index: number): T | undefined;
    prepend(item: T): void;
    append(item: T): void;
    remove(item: T): T | undefined;
    get(index: number): T | undefined;
}
```

## Linear singly linked list

In a **singly linked list** the connections are undirectional: `Node<{ value: any, next: Node<any> | null }>`. For example, the following singly linked list with 3 nodes:

```js
// singly linked list
const node1 = { value: 1 };
const node2 = { value: 2 };
const node3 = { value: 3 };

node1.next = node2;
node2.next = node3;

͍͍// node1 -> node2 -> node3
```

Many operations of a singly linked list are linear time (O(n).), e.g. finding a value, appending a new value (at the end).

## Linear doubly linked list

A **doubly linked list** has bidirectional connections: `Node<{ value: any, next: Node<any> | null, prev: Node<any> | null }>`. For example, the following doubly linked list with 3 nodes:

```js
// doubly linked list

const node1 = { value: 1 };
const node2 = { value: 2 };
const node3 = { value: 3 };

node1.next = node2;
node2.next = node3;
node2.prev = node1;
node3.prev = node2;͍

͍͍// node1 <-> node2 <-> node3
```

## Circular singly linked list

In Circular Singly Linked List, each node has just one pointer called the "next" pointer. The next pointer of the last node points back to the first node and this results in forming a circle. In this type of Linked list, we can only move through the list in one direction.

## Circular doubly linked list

In circular doubly linked list, each node has two pointers prev and next, similar to doubly linked list. The prev pointer points to the previous node and the next points to the next node. Here, in addition to the last node storing the address of the first node, the first node will also store the address of the last node.