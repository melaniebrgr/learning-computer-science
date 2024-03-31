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

## Impl (methods)

Functions used to operation on structured related data are known as methods.
Methods are like functions int hat the are defined with `fn`, take params, have return values, and run code when called.
Methods are unlike functions in that they are defined in the context of a `struct`.

All functions defined within an impl block are called associated functions because they’re associated with the type named after the impl.
To define a function in the context of a `struct`, we start with an `impl`
The `impl` or implementation keyword is used to associate a method to a struct.

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

To use the instance values, methods should take a parameter named self of type Self for their first parameter.
Methods that take multiple parameters should add the extra params to the signature after the self parameter.
Associated functions that don't take `self` are not methods, technically, and cane be called with the `::` syntax.

For example, the following argument types are possible:

- no `self` argument: The method is simply associated, e.g. the `new` "constructor".
- `&self` argument: The method can use the values of the struct, but not change them.
- `&mut self` argument: The method can modify the values.
- `self` argument: The method will consume the value, moving it.

Often when a method is given the same name as a field we want it to only return the value in the field and do nothing else. Methods like this are called getters.

Methods are used to define behaviour..
Behaviour can be defined for a `struct` and a `enum` with an `impl`.
They enable composition.
Methods are essentially namespaced functions.
`self` and `Self` are special values in Rust and can only be used within an `impl`.
Self refers to the instance of the struct or enum.
It enables "method syntax".
Properly, a method is anything that takes self as an argument.

To summarize:

- no `self` argument: associates a function with the struct or enum, like a new "constructor"
- `&self` argument: uses values but does not change them
- `&mut self` argument: changes values
- `self` argument: consumes the value, moving it

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
