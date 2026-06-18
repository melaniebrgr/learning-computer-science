# Composite pattern

> Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.

The Composite pattern ensures that leaf nodes and container nodes in a tree-like (or army-like) data structure can be addressed through a common interface.

> An army consists of several divisions. A division is a set of brigades, a brigade consists of platoons, and platoons consist of squads. A squad is a small group of real soldiers.

For instance, using the common interface it would be possible to calculate the total cost of all products (leafs).
The Composite pattern does this by running a behavior recursively over all components of an object tree.
The goal of this pattern is to not need to care about the concrete classes of objects that compose the tree; they can all be treated the same way.
When a method is called, the objects themselves pass the request down the tree.

> The Composite pattern provides you with two basic element types that share a common interface: simple leaves and complex containers. A container can be composed of both leaves and other containers. This lets you construct a nested recursive object structure that resembles a tree.

## Structure

## References

1. https://refactoring.guru/design-patterns/composite