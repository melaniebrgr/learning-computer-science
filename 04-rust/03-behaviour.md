# Behaviour

1. Functions
1. Traits
1. Generics

## Functions

Are defined with the keyword `fn`.
The body of the function has the value of its last expression.
Returns are generally only used for returning early from a function.
Function inputs and outputs _must be_ typed.
(Functions are one place where the compiler will not infer the type.)

```rust
fn abs(x: f64) -> f64 {
    if x > 0.0 {
        x
    } else {
        -x
    }
}
// Last value is return value, e.g. abs(-1.0) -> 1.0
```

### Closures

Uses a bar instead of parentheses

```typescript
(x) => {
  return x;
};

(x) => x + 1;
```

```rust
|x| {
    return x;
}

|x| x + 1
```

## Traits

Traits define a set of functions that types can implement.
Types can implement multiple traits, and traits can have default implementations for functions.
Traits are used to define behaviour, e.g. implement methods on structs.
A trait is most similar to an interface in TypeScript.
They enable composition.
In TypeScript a Class can implement an interface, which requires that all properties and methods of the interface be implemented on the class.

```typescript
interface Area {
  area(): number;
}

class Rectangle implements Area {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  area(): number {
    return this.width * this.height;
  }
}
```

## Generics

Functions that don't take a specific type as a parameter, but some type that implements a given trait.
