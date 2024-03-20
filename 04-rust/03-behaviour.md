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

## Methods

Methods are used to define behaviour..
Behaviour can be defined for a `struct` and a `enum` with an `impl`.
They enable composition.
Methods are essentially namespaced functions.
`self` and `Self` are special values in Rust and can only be used within an `impl`.
Self refers to the instance of the struct or enum.
It enables "method syntax".
Properly, a method is anything that takes self as an argument.

```rust
enum Color { ... }

impl Color {
  fn rgb(color: Color) -> (u8, u8, u8) {}
  fn new(r: u8, g: u8, b: u8) -> Color { ... }
}

let red = Color::new(250, 0, 0);
let (r, g, b) = Color::rgb(purple); // this is the same
let (r, g, b) = red.rgb(); // as this (but this is more amenabell to chaining, a syntactive convenience)
```

```rust
impl Direction {
    fn as_str(&self) -> &'static str {
        match *self { // *self has type Direction
            Direction::Up => "Up",
            Direction::Down => "Down",
            Direction::Left => "Left",
            Direction::Right => "Right"
        }
    }
}
```

## Generics

Functions that don't take a specific type as a parameter, but some type that implements a given trait.
