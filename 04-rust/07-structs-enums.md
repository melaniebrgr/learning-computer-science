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

println!("Full name: {} {}", p.first_name, p.last_name);
```

(Note, `#[derive(Debug)]` directive can be used to debug structs.)
Structs can contain nested structs, nested tuples and so on.

```rust
struct Point {
    x: u8,
    y: u8,
}

struct State {
    color: (u8, u8, u8),
    position: Point,
    quit: bool,
    message: String,
}
```

It’s often useful to create a new instance of a struct that includes most of the values from another instance, but changes some. You can do this using struct update syntax.
The syntax .. specifies that the _remaining fields not explicitly set_ should have the same value as the fields in the given instance.

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

An enum is an _enumeration of possible values_.
Enums are a way of saying a value is one of a definite set of possible values.
For example, direction has only four values: up, down, left, right.

```rust
enum Direction { // ← type
    Up, // ← variant
    Down, // ← variant
    Left, // ← variant
    Right, // ← variant
}

let start = Direction::Left; // `start` is has a type of `Direction`
```

An instance of one of the four direction variants can be created using the same identifier.
Enums are instantiated with the `Type::NameOfVariant`, in case there are other enums in the same scope.
Enum variants can also be used without manual scoping with the `use` keyword, e.g. `use crate::Status::{Poor, Rich};`
Although the have different values, they have the _same type_.
Effectively, and enum becomes a custom data type.
Enum variants can have other types of data inside them, called a payload.
Any kind of data can be put inside an enum variant, e.g. strings, numeric types, tuples, structs, and other enums.
Each variant can have different types and amounts of associated data.

```rust
enum Message {
    Move { x: i32, y: i32 },
    Echo(String),
    ChangeColor(u8, u8, u8),
    Quit,
}

impl Message {
    fn call(&self) {
        println!("{:?}", self);
    }
}

fn main() {
    let messages = [
        Message::Move { x: 10, y: 30 },
        Message::Echo(String::from("hello world")),
        Message::ChangeColor(200, 255, 255),
        Message::Quit,
    ];

    for message in &messages {
        message.call();
    }
}
```

An enum can also be used to consicely represent not only the type but the value too.
Put another way, each enum variant can become a function that constructs an enum instance.
We automatically get this constructor function defined as a result of defining the enum.

```rust
    enum IpAddr {
        V4(String),
        V6(String),
    }

    let home = IpAddr::V4(String::from("127.0.0.1"));
    let loopback = IpAddr::V6(String::from("::1"));
```

Enums can also have an explicit discriminator.
Only "primitive representations" can be used as explicit discriminators: u8, u16, u32, u64, u128, usize, i8, i16, i32, i64, i128, and isize.

```rust
enum Color {
    Red = 0xff0000,
    Green = 0x00ff00,
    Blue = 0x0000ff,
}
```

### Option

Option represents the possible absense of a value.
`Option<T>` is an example of an enum.
The Option type encodes the common scenario in which a value could be something or nothing.
Because Options are so common they are built into the standard library and the variants can be used without namespacing, e.g. `let email: Option<String> = Some(email_str);`

```rust
enum Option<T> { // T is a type parameter
    None,
    Some(T),
}
```

### Result

Result represents an operation that could have failed, i.e. an error.
An error is an enum, and it's variants, `Err` and `Ok` are first class citizens
Everything that can be an error must be explicitely handled in Rust.

```rust
enum Result<O, E> {
    Ok(O),
    Err(E),
}
```

Results can also be used without namespacing.
You can do a bunch of things with errors.

```rust
match a_function_that_can_error() {
  Ok(value) => println!("{}", value);
  Err(e) = eprintln!("{}", value);
}

let foo = a_function_that_can_error().unwrap(); // yolo
let foo = a_function_that_can_error().expect("should never fail"); // respectful yolo
let foo = a_function_that_can_error().unwrap_or(0); // default value
let foo = a_function_that_can_error().ok(); // convert to Option
let foo = a_function_that_can_error()
  .and_then(|value| only_executed_if_no_error(value)) // chaining
let foo = a_function_that_can_error().ok();
let foo = a_function_that_can_error()?;
```
