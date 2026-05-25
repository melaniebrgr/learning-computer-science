# Builder pattern

Builder lets you construct complex objects step by step, allowing the production of different types and representations of an object using the same construction code.

> The Builder pattern suggests that you extract the object construction code out of its own class and move it to separate objects called builders.

```ts
class House {
  buildWalls()
  buildDoors()
  buildWindows()
  buildRoof()
  buildGarage()
  getResult(): House
}
```

Several different builder classes that implement the same set of building steps, but in a different manner can be set up.
You can go further and extract a series of calls to the builder steps you use to construct a product into a separate class called director.
The director class defines the order in which to execute the building steps, while the builder provides the implementation for those steps.
However, the director class might be a good place to put various construction routines so you can reuse them across your program.

## Resources

1. https://refactoring.guru/design-patterns/builder