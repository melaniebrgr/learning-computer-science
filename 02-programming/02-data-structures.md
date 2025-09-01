# Data structures

There are three flavours of data structures that are useful for collecting data: tuples, lists, and dictionaries. Tuples and lists have in common that they are ordered sequences of objects, e.g. first, second, last. They can be accessed by index or by sequence, e.g. next. Tuples are the simplest. Tupples are immutable while lists are mutable. Mutability, the ability to change object values, is a powerful programming concept but also big source of programming blunders.

Dictionaries or "dicts" are sets of immutable keys and mutable values that are accessed by key. Anything can be a value, and, depending on the language, anything can be a key. Technically a dict can be implemented with a list data structure. However, to find a value all the keys need to be iterated over and the time to find a value would grow with the length of the list. On the other hand, with a dict the time to lookup the value is constant.

## Arrays

**Arrays are contiguous memory space**. Contiguous means it is an unbreaking sequence of memory of a fixed amount of bytes. A "true array" cannot be grown or broken up. Arrays elements can't be deleted (only zero'd out), inserted into (only overwritten), or grown. How the contiguous memory is interpreted depends on the instructions to the compiler, e.g. an array of integers, or an array of strings. When we access an element of an array with, `array[index]` we are telling the computer to go to the memory addess of the array start offset by `index * size_of_element` bytes.

In short, we have zero or more pieces of memory in a row, of a specific type. Considering this, arrays almost seem not like a _real_ data structure but a primitive of computing, and JS arrays are not true arrays.

An ArrayBuffer is an object that represents a fixed-size sequence of bytes in memory. It provides a standardized API for working with raw memory. ArrayBuffers can not be directly read or written to. Instead, views need to be created to read/write data in ArrayBuffers.

```js
const a = new ArrayBuffer(6);  // Create a buffer of 6 bytes
const a8 = new Uint8Array(a); // Create a view of the buffer as an array of 8-bit unsigned integers

a8[0] = 45; // Write the value 45 to the first element of the view
a8[2] = 45; // Write the value 45 to the third element of the view

const a16 = new Uint16Array(a); // Create a view of the buffer as an array of 16-bit unsigned integers
a16[2] = 0x4545; // Write the value 0x4545 to the third element of the view

a16; // -> Uint16Array(3) [45, 0, 17733]
a8; // -> Uint8Array(6) [45, 0, 45, 0, 69, 69]
```

A `Uint8Array` is an array of 8-bit unsigned integers. 1 bit = the smallest unit of data (0 or 1) and 1 byte = 8 bits. Therefore, 1 byte can represent values from 0 to 255 `(2^8 - 1)`. `Uint8Array` and `Uint16Array` provide different views of the same memory:

Memory bytes:    [45,  0, 45,  0, 69, 69]
                  └─────┘       └─────┘
Uint16Array:      [  45,   0,   17733  ]
                              (0x4545)

- `Uint16Array` sees 0x4545 as one 16-bit value = 17733,
- `Uint8Array` sees the same memory as two separate 8-bit values = 69, 69

## Linked list

A linked list is a daisy chain of nodes where each node contains a reference to another node.
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

## Queue

A common data structure is a queue. A queue is just a specific implementation of a linked list. A queue is a first in, first out (FIFO) structure, a.k.a a Canadian line at Tim Hortons. For a queue, a singly-linked list is sufficient to cover the requisit behaviour. The operations of a queue, (pop/dequeue and push/enqueue from the head and tail, respectiely) are constant time.

## Stack

Another common data structure is a stack. A stack is another specific implementation of a linked list. A stack is a last in, first out structure (LIFO) structure, a.k.a a pile of dishes.
