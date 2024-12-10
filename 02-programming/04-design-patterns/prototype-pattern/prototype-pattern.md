# Prototype pattern

Because of confusing terminology overlap with the JS prototype, I hereby dub this the spawner pattern. The prototype pattern works my creating new objects from a prototypical instance.

Need to spawn mutiple clones of an entity? Or have one off special items that vary slightly from a base version? The prototype pattern offers ans easy way to create lots of rich variations in the game world environment and items.

## What about JavaScript?

JavaScript is a bit special in that it has concept of a prototype or `__proto__` build in. Every object and indeed every primitive is an object that inherits fields and methods from it's proto. Even numbers,

```js
let three = 3;
> undefined

three.__proto__;
> Number { 
  constructor: ƒ Number()
  toExponential: ƒ toExponential()
  toFixed: ƒ toFixed()
  toLocaleString: ƒ toLocaleString()
  toPrecision: ƒ toPrecision()
  toString: ƒ toString()
  valueOf: ƒ valueOf()
  [[Prototype]]: Object[[PrimitiveValue]]: 0
}
```

The fields and methods are sequentially looked up, or rather down, the prototype chain until it terminates at `null`. Because it's a prototype based language, the prototype pattern effectively comes out of the box. Let's review the ways for copying objects to start:

### Object.assign

`Object.assign({}, prototype)` shallowly copies _only_ enumerable and own properties from a source object (prototype) to a target object. Because properties on the prototype chain and non-enumerable properties cannot be copied, and only the reference to _reference_ values is copied, the target object outcome can be an incomplete imitation of it's source. It is not suitable for the prototype pattern.

### structuredClone

`structuredClone` does a little better than Object.assign, but not by much. It recursively walks through an object and can copy complex nested values (or move them, if indicated). However, like `Object.assign` the prototype chain is not walked or duplicated. Neither are getter, setters or Class private properties duplicated. It is not suitable for the prototype pattern.

### Object.create

> The Object.create() static method creates a new object, using an existing object as the prototype of the newly created object.
> Object.create() allows fine-tuned control over the object creation process ... the second parameter maps keys to property descriptors — this means you can control each property's enumerability, configurability, etc. as well.

Sounds promising. It works perfectly for all public properties and methods, but again private ones are not included, so it cannot be used as a 1:1 spawner.

## The prototype pattern in JavaScript

All the ways of implementing the prototype pattern are hereby listed.

1. A spawner class containing a prototype: The prototype contains a clone method that the spawner calls to stamp exact replicas of the current prototype. You need to implement and decide how deep the clone the properties. (See example from `index.ts`.)
2. A spawner class containing a spawner method: The function doesn't retain the state of the prototype, however.
3. Use `Object.create` > `structureClone` > `Object.assign` depending on the fidelity needed of the clone.

## Prototype pattern-based data modelling

  ```JSON
  {
    "name": "goblin grunt",
    "weakness": ["fire", "light"]
  },
    {
    "name": "goblin wizard",
    "spells": ["fire ball", "lightning bolt"],
    "prototype": "goblin grunt"
  }
  ```
