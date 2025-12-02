## Linked list

A linked list is a daisy chain of nodes where each node contains a reference to another node. In a **singly linked list** the connections are undirectional: `Node<{ value: any, next: Node<any> | null }>`. For example, the following singly linked list with 3 nodes:

```js
// singly linked list
const node1 = { value: 1 };
const node2 = { value: 2 };
const node3 = { value: 3 };

node1.next = node2;
node2.next = node3;

͍͍// node1 -> node2 -> node3
```

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

Many operations of a singly linked list are linear time (O(n).), e.g. finding a value, appending a new value (at the end).