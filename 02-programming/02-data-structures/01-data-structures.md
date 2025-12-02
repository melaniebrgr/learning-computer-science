# Data structures

There are three flavours of data structures that are useful for collecting data: tuples, lists, and dictionaries. Tuples and lists have in common that they are ordered sequences of objects, e.g. first, second, last. They can be accessed by index or by sequence, e.g. next. Tuples are the simplest. Tupples are immutable while lists are mutable. Mutability, the ability to change object values, is a powerful programming concept but also big source of programming blunders.

Dictionaries or "dicts" are sets of immutable keys and mutable values that are accessed by key. Anything can be a value, and, depending on the language, anything can be a key. Technically a dict can be implemented with a list data structure. However, to find a value all the keys need to be iterated over and the time to find a value would grow with the length of the list. On the other hand, with a dict the time to lookup the value is constant.

We can empirically evaualte which type of data structure is used under the hood by running operations on progressively large data sets, e.g. how much actually time do pop and shift operations take at increasing sizes of input?

### Queue

A common data structure is a queue. A queue is just a specific implementation of a linked list. A queue is a first in, first out (FIFO) structure, a.k.a a Canadian line at Tim Hortons. For a queue, a singly-linked list is sufficient to cover the requisit behaviour. The operations of a queue, (pop/dequeue and push/enqueue from the head and tail, respectively) are constant time.

### Stack

Another common data structure is a stack. A stack is another specific implementation of a linked list. A stack is a last in, first out structure (LIFO) structure, a.k.a a pile of dishes.

## Array list

Uses the array as the fundamental data type instead of a node. array lists have a length and a capacity. The length is the number of values in the array list. The capacity is how much room there is to grow.

Given there is a length, push and pop operations are fast (`O(1)`). You just need to use the length. If the length would exceed the capacity, the array needs to be reallocated to an area with e.g. double the memory capacity. When poping, the data does not actually _need_ to be "zeroed" out.

Queue and deque operations on the otherhand are slower. To queue, each value needs to be shifted down, and to deque each value needs to be shifted up, which is a `O(n)` operation.

With an array list random access at a index is much faster compared to a linked list. With a linked list adding and removing items is faster, particularly at the ends.

## Ring buffer

A ring buffer, also known as a circular buffer, is a data structure that operates like an array but with a fixed size, where the ends are connected to form a "ring." It uses index-based head and tail pointers to track the start and end of the data. Unlike an ArrayList, where the head is at index 0 and the tail is at the length, a ring buffer allows the head and tail to be anywhere in the array, wrapping around using the modulo operator if they exceed the array's bounds. This enables efficient O(1) operations for adding (push, unshift) or removing (pop, shift) elements from either end, making it ideal for scenarios like queues or log batching.

When the buffer fills (tail meets head), it requires resizing by copying elements into a larger buffer while maintaining order. Ring buffers are fast, maintain order, and are useful for performance-critical applications like log batching or object pooling, though they may need careful handling to avoid issues with concurrent access.