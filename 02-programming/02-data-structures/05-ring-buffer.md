# Ring Buffer

An array with a head and tail. The head and tail are initially somewhere in the middle of the memory allocation. Pushing, popping, shifting and deshifting are all O(1) operations.

[ , , , , , , , , , , , , , , ]
0 <----[head , , , tail]----> n

If values appended exceed the buffer size then it is prepended to the front.

---

A ring buffer, also known as a circular buffer, is a data structure that operates like an array but with a fixed size, where the ends are connected to form a "ring." It uses index-based head and tail pointers to track the start and end of the data. Unlike an ArrayList, where the head is at index 0 and the tail is at the length, a ring buffer allows the head and tail to be anywhere in the array, wrapping around using the modulo operator if they exceed the array's bounds. This enables efficient O(1) operations for adding (push, unshift) or removing (pop, shift) elements from either end, making it ideal for scenarios like queues or log batching.

When the buffer fills (tail meets head), it requires resizing by copying elements into a larger buffer while maintaining order. Ring buffers are fast, maintain order, and are useful for performance-critical applications like log batching or object pooling, though they may need careful handling to avoid issues with concurrent access.


