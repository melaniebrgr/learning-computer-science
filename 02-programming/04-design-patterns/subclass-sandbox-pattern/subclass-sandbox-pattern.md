# Subclass sandbox pattern

Consists of a base class with

- a (virtual and abstract in C++) sandboxed method that must be overriden by the subclass(es)
- operations provided by the parent for the subclasses to call in the sandboxed method.

The provided operations are "common behaviour primitives" for the subclasses to play with.

The advantages of this pattern is that it avoids alot of redundant code between the base classes, consolidates code that pokes or can be affected by changes in various subsystems, and helps define invariant behaviour between subclasses.

The biggest risk of this pattern is the growing the complexity and coupling of the base class to outside systems. Base class complexity can be checked by

- only providing operations that a majority of subclasses actually use
- clustering some of the methods over to other classes, e.g. a soundplayer class.