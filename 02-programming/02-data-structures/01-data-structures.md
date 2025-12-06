# Data structures

There are three flavours of data structures that are useful for collecting data: tuples, lists, and dictionaries. Tuples and lists have in common that they are ordered sequences of objects, e.g. first, second, last. They can be accessed by index or by sequence, e.g. next. Tuples are the simplest. Tupples are immutable while lists are mutable. Mutability, the ability to change object values, is a powerful programming concept but also big source of programming blunders.

Dictionaries or "dicts" are sets of immutable keys and mutable values that are accessed by key. Anything can be a value, and, depending on the language, anything can be a key. Technically a dict can be implemented with a list data structure. However, to find a value all the keys need to be iterated over and the time to find a value would grow with the length of the list. On the other hand, with a dict the time to lookup the value is constant.

We can empirically evaualte which type of data structure is used under the hood by running operations on progressively large data sets, e.g. how much actually time do pop and shift operations take at increasing sizes of input?

### Queue

A common data structure is a queue. A queue is just a specific implementation of a linked list. A queue is a first in, first out (FIFO) structure, a.k.a a Canadian line at Tim Hortons. For a queue, a singly-linked list is sufficient to cover the requisit behaviour. The operations of a queue, (pop/dequeue and push/enqueue from the head and tail, respectively) are constant time.

### Stack

Another common data structure is a stack. A stack is another specific implementation of a linked list. A stack is a last in, first out structure (LIFO) structure, a.k.a a pile of dishes.
