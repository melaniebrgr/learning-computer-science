# Data structures

There are three kinds of data structures that are useful for collecting data: tuples, lists, and dictionaries. Tuples and lists have in common that they are ordered sequences of objects, e.g. first, second, last. They can be accessed by index or by sequence, e.g. next. Tuples are the simplest. Tuples are immutable while lists are mutable. Mutability, the ability to change object values, is a powerful programming concept but also big source of programming blunders.

Dictionaries or "dicts" are sets of immutable keys and mutable values that are accessed by key. Anything can be a value, and, depending on the language, anything can be a key. Technically a dict can be implemented with a list data structure. However, to find a value all the keys need to be iterated over and the time to find a value would grow with the length of the list. On the other hand, with a dict the time to lookup the value is constant.

We can empirically evaualte which type of data structure is used under the hood by running operations on progressively large data sets, e.g. how much actually time do pop and shift operations take at increasing sizes of input?

### First-class language citizen

Not sure where else to put this. When something is a first-class citizen in a programming language, it means **it can be treated like any other ordinary value in that language**. It can assigned to variable, passed as a function argument, be returned from a function, be stored on an object, and another data structure does not need to constructed to use it, i.e. in Java to define a function, and object must be defined first.