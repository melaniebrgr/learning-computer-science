# Behaviour

1. Functions
1. Impls
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

## Impls

Implementations are the associated function of a struct.
An `impl` can use a reference self argument, i.e. `&self` is short for `self: &Person`.

```rust
struct Person {
    first_name: String,
    last_name: String
}

impl Person {
    fn new(first: &str, name: &str) -> Person {
        Person {
            first_name: first.to_string(),
            last_name: name.to_string()
        }
    }
    fn full_name(&self) -> String {
        format!("{} {}", self.first_name, self.last_name)
    }
}

let p = Person::new("John","Smith");
println!("fullname {}", p.full_name()); // fullname John Smith
```

To summarize

- no `self` argument: you can associate functions with structs, like the new "constructor".
- `&self` argument: can use the values of the struct, but not change them
- `&mut self` argument: can modify the values
- `self` argument: will consume the value, which will move.

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
