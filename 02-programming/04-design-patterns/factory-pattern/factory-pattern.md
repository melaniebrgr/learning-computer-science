# Factory pattern

The Factory Method pattern replaces direct object construction calls (using the new operator) with calls to a special factory method. The objects are still created via the new operator, but it’s being called from within the factory method. Objects returned by a factory method are often referred to as products.

the Factory Method can be used for creating cross-platform UI elements without coupling the client code to concrete UI classes.

## Prerequisits

- Creator interface: Abstract class that defines an abstract factory method. The abstract factory method pumps out the products.
- Product interface: A common product interface so they can be used interchangeably by consumers of all products

## Implementation

- Concrete creators: Creator subclasses must implement the factory method subclass. The products it produces respect some common product interface
- Concrete products: Note that the factory method can be parameterised to create more variations

For example, we implement NYPizzaStore and ChicagoPizzaStore concrete creators that products unique sets of pizza products. NYPizzaStore and ChicagoPizzaStore stores produce their own style of cheese, pepperoni, clam, and veggie pizzas.

## References

1. https://refactoring.guru/design-patterns/factory-method