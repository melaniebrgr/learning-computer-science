# Data structures

Data structures can often be divided into linear and non-linear. Examples of linear data structures are linked lists, stacks, queues and arrays. Non-linear data structures are graphs and trees, which are special restricted version of a graph.

Which type of data structure is suitable for a dataset can be empirically evaluated by running operations on progressively larger sets of data, e.g. how much actual time does it take to pop and shift operations take at increasing sizes of input?

## Linear data structures

For collecting data tuples, lists, and dictionaries are useful. Tuples and lists have in common that they are ordered sequences of objects, e.g. first, second, last. They can be accessed by index or by sequence, e.g. next. Tuples are the simplest. Tuples are immutable while lists are mutable. Mutability, the ability to change object values, is a powerful programming concept but also big source of programming blunders.

Dictionaries or "dicts" are sets of immutable keys and mutable values accessed by key. Anything can be a value, and depending on the language, anything can be a key. Technically a dict can be implemented with a list data structure. However, to find a value all the keys need to be iterated over and the time to find a value would grow with the length of the list. On the other hand, with a dict the time to lookup the value is constant.

## Non-linear data structures


