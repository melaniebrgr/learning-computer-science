# Algebraic data types (ADTs)

1. structs
1. tuple structs
1. unit-like structs
1. enums

ADTs allow us to model complex data structures and enforce constraints at the type level.

## Structs

A struct is an example of a "product" algebraic type that allows to group related types into a logical domain.

A struct, or structure, lets you package together and name multiple related values to make up a meaningful group.
A struct is a property layout, essentially a blueprint, that defines exactly what is going to be on that item.
Structs and enums are the building blocks for creating new types in your program’s domain.
The struct definition is like a general template for the type, and instances fill in that template with particular data to create values of the type.

```rust
#[derive(Debug)] 
struct Person {
    first_name: String,
    last_name: String, 
    age: u32,
}

let p = Person {
    first_name: "John".to_string(),
    last_name: "Smith".to_string(),
    age: 16,
};
```

(Note, `#[derive(Debug)]` directive can be used to debug structs.)

It’s often useful to create a new instance of a struct that includes most of the values from another instance, but changes some. You can do this using struct update syntax.

```rust
let user2 = User {
    email: String::from("another@example.com"),
    ..user1
};
```

Structs have a defined size and will have certain amount of bytes associated with it.
The values of a struct will be placed next to each other in memory.
While a `struct` specifies the data shape and size, and an `impl` defines behaviour.
Data and behaviour are defined in seperate blocks in Rust.

## Tuple structs

Tuple structs have added meaning from the struct name, but don’t have named fields.
They are useful when you want to give the whole tuple a name to differentiate it from other tuples.
Even if another Tuple struct has the same type signature, a function that takes a parameter a tuple struct of one type cannot take another.
Tuple structs are accessed like tuples.

```rust
struct Color(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
}
```

## Unit-like structs

Unit-like structs are structs that don’t have fields.
Theya re useful when it is necessary to implement a trait on a type but don't have data to store in the type itself.
Unit-like structs behave like `()`.

```rust
struct AlwaysEqual;
```

## Enums

An enum is an example of a "sum" type, that is a type that can be one of several variants.

Enums are a way of saying a value is one of a definite set of possible values.
For example direction has only four values: up, down, left, right.
An enum becomes a custom data type to be used elsewhere in the code.
An instance of one of the four direction variants can be created using the same identifier, and conseqently they have the same type.

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right
}
// `start` is type `Direction`
let start = Direction::Left;
```

Like `structs`, behaviour can be defined for an `enum` with an `impl`.

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

An enum can also be used to consicely represent not only the type kind but the value too.
Put another way, each enum variant can become a function that constructs an enum instance.

```rust
    enum IpAddr {
        V4(String),
        V6(String),
    }

    let home = IpAddr::V4(String::from("127.0.0.1"));

    let loopback = IpAddr::V6(String::from("::1"));
```

We automatically get this constructor function defined as a result of defining the enum.
Any kind of data can be put inside an enum variant, e.g. strings, numeric types, structs, and other enums.
Each variant can have different types and amounts of associated data.

```rust
enum IpAddr {
    V4(String),
    V6(String),
}

enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let ip = IpAddr::V6(String::from("::1"));
```

Fun fact: `Option<T>` is an example of an enum.
The Option type encodes the common scenario in which a value could be something or nothing.

### Errors

Everything that can be an error must be explicitely handled in Rust.
An error is an enum, and it's variants, `Err` and `Ok` are first class citizens

You can do a bunch of things with errors

```rust
if let Ok(value) = a_function_that_can_error() { ... }
match a_function_that_can_error() {
  Ok(value) => println!("{}", value);
  Err(e) = eprintln!("{}", value);
}
_ = a_function_that_can_error();
let foo = a_function_that_can_error().unwrap(); // yolo
let foo = a_function_that_can_error().expect("should never fail"); // respectful yolo
let foo = a_function_that_can_error().unwrap_or(0); // default value
let foo = a_function_that_can_error().ok(); // convert to Option
let foo = a_function_that_can_error()
  .and_then(|value| only_executed_if_no_error(value)) // chaining
let foo = a_function_that_can_error().ok();
let foo = a_function_that_can_error()?;
```
