# Prototype pattern

The prototype pattern works my creating new objects from a prototypical instance.

Need to spawn mutiple clones of an entity? Or have one off special items that very slightly from a base version? The prototype pattern offers ans easy way to lots of rich variations in the game world environment and items.

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

The fields and methods are sequentially looked up, or rather down, the prototype chain until it terminates at `null`. Because it s a prototype based language, the prototype pattern effectively comes out of the box. Still, all the ways of setting out the prototype pattern
