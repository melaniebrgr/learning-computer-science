# Introduction

Rust is a statically typed, curly-braces language with semicolons, C++ style comments and a main function.
(Static types are when types known at compile time, while dynamic types are only known at run time.)
Rust is strongly typed in order to make it harder to write incorrect programs.

In JavaScript we just create things, we don't think about how they're laid out in memory.
In Rust you need to define the blueprint of exactly how things are going to be laid out in memory.

> In systems languages, program memory comes in two kinds: the stack and the heap. It is very fast to allocate data on the stack, but the stack is limited; typically of the order of megabytes. The heap can be gigabytes, but allocating is relatively expensive, and such memory must be freed later. In so-called 'managed' languages (like Java, Go and the so-called 'scripting' languages) these details are hidden from you by that convenient municipal utility called the garbage collector. Once the system is sure that data is no longer referenced by other data, it goes back into the pool of available memory.

The downsides of garbage collection are that it is wasteful of memory, which matters in small embedded microchips that increasingly rule our world. The second is that it will decide, potentially at the worst possible time, that a clean up must happen.

## Running a program

The `rustup` tool is used to install rust, and periodically update it via `rustup update`.
Rust is an ahead-of-time compiled language, meaning you can compile a program and give the executable to someone else.
To run a program written in Rust it first needs to be compiled.
Rust ships with a compiler `rustc` that compiles rust files to binary executables.

```bash
rustc main.rs # compile
./main # execute
```

Rust has a build system and package manager called `cargo`.
Setting up a project with cargo with add a Cargo.toml, which is analogous to package.json.
It contains a package configuration and dependencies list.

```bash
cargo new my_program # creates a new directory and project
cargo init # for a directory with an existing project
```

Cargo puts the binary it generates in a directory named debug because the default build is a debug build.

```bash
cargo check ... # checks but does not compile
cargo build ... # compiles executable
cargo build --release # compiles optimised executable
cargo run ... # compiles and runs executable
```

## Variables

The `let` or `const` keyword is necessary to create a new variable binding.
Immutable variables are declared with `let`, e.g. `let foo = 5;`.
That is, the "regular" keyword for variable binding makes the value immutable by default.
trying to assign a new value to foo will result in a compiler error.

Immutable variables can also be declared with `const`, e.g. `const WELCOME: &str = r"Welcome to RUSTLINGS";`
Mutable variables are declared by including `mut`, e.g. `let mut foo = 5;`.
Variables declared with `const` can't be used with `mut` and must be type annotated.
By convention, `const` variable names are all upper, snakecase.
Using or capturing an uninitialized variable is not allowed.
This saves us from trying the use a variable that effectively doesn't exist.

Variables can be shadowed, meaning a second variable with the same name "overshadows" the first.
The second declaration takes any use of the variable name to itself.
The shadowed and shadowing variable can be immutable.
Types can change with shadowing.

```rust: shadowing
    let file = get_file(args); // Filehandle
    let file = read_file(file); // String
    let file = tokenize(file); // Vec<string>
```

## Expressions and statements

Rust distinguishes between expressions and statements: expressions return a value based on their operand(s), and statements simply return a `()` type which behaves just like `void` in C/C++ language. For example, `num * num` is an expression while `return num * num;` is a statement.

## Types

Every value in rust has a type.
All variables types must be known at compile time.
Types can often be infered, but there are times must be specified:
- when declaring with `const`
- function arguments
- when many types are possible

When the compiler cannot infer the type, it will ask with the error "type annotations needed".
Often the compiler can infer the type from the assigned value.

There are two subsets of data types: scalar and compound.
A scalar type represents a single value, whereas compound types group multiple values into one type.
The four primary scalar types: integer, floating-point number, Boolean, and character.
The two compound types: tuple and array.

### Numbers

**Integer** types have different sizes (8, 16, 32, 64, 128, char) and are signed (`i`) or unsigned (`u`). For example, `i8` is a signed 8-bit integer value from -128 to 127 (-2^7 to 2^7 - 1, or 00000000 to 11111111 in binary ).

There are two floating point primitives, `f32` and `f64`. The default type is `f64` because on modern CPUs, it's roughly the same speed as `f32`.

| type   | min                                      | max                                     |
| ------ | ---------------------------------------- | --------------------------------------- |
| `u8`   |                                        0 |                                     255 |
| `i8`   |                                     -128 |                                     127 |
| `u16`  |                                        0 |                                   65535 |
| `i16`  |                                   -32768 |                                   32767 |
| `u32`  |                                        0 |                              4294967295 |
| `i32`  |                              -2147483648 |                              2147483647 |
| `u64`  |                                        0 |                    18446744073709551615 |
| `i64`  |                     -9223372036854775808 |                     9223372036854775807 |
| `u128` |                                        0 | 340282366920938463463374607431768211455 |
| `i128` | -170141183460469231731687303715884105728 | 170141183460469231731687303715884105727 |
| `f32`  |                                 -3.4E+38 |                                -3.4E+38 |
| `f64`  |                  -17976931348623157E+292 |                  17976931348623157E+292 |

Number literal types include decimal, hex, octal, binary, and byte. Number literal types can be denoted with a type suffix, and use `_` to make the number more readable, e.g.  `1_000u32`.

Basic math operations addition, subtraction, multiplication, division, and remainder are supported. Note that integer division truncates toward zero to the nearest integer.

### Character

Rust’s `char` type is the language’s most primitive alphabetic type. It is four bytes in size and represents a Unicode Scalar Value.
The Unicode Scalar Values range from U+0000 to U+D7FF and U+E000 to U+10FFFF inclusive.
The char literal is specified with single quotes, as opposed to string literals, which use double quotes.

### String

Any system language has two kinds of string, one static and known at compile time, and dynamically allocated at runtime.
Rust is no exception: it has a static string literal (`str`) type, and dynamic capital "S" **S**tring.
Said another way, there is a **S**tring with a pointer, a length and a capacity, and a `str` view into a string.
Under the hood, String is basically a Vec<u8> and &str is &[u8], where those bytes represent valid UTF-8 text. 

```rust
fn main() {
    let text = "hello dolly";  // the string literal
    let s = String::from(text);  // it's now an allocated string
}
```

### Tuple

A tuple is a way of grouping together values of different types into one compound type.
Unlike arrays, tuples can contain multiple different types.
They can be a useful way to return multiple values from a function.
Tuples have a fixed length and once declared, they cannot grow or shrink in size.
Tuples can be accessed by destructuring or using a period (`.`) notation.
Start at 0 when accessing by dot notation.
The tuple without any values is called a unit `()` and represent an empty value or an empty return type.

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;
let five_hundred = tup.0;
```

### Struct

Data and behaviour are defined in seperate blocks in Rust.
A struct(ure) specifies the data shape and size, and an impl(ementation) defines behaviour.
Rust structs contain named fields that hold properties.
A struct is a property layout, essentially a blueprint, that defines exactly what is going to be on that item.
It has a defined size and will have certain amount of bytes associated with it.
The values of a struct will be placed next to each other in memory.

```rust
struct Person {
    first_name: String,
    last_name: String
}

let p = Person {
    first_name: "John".to_string(),
    last_name: "Smith".to_string()
};

println!("person {} {}", p.first_name,p.last_name);
```

The `#[derive(Debug)]` directive can be used to debug structs.

```rust
#[derive(Debug)]
struct Person {
    first_name: String,
    last_name: String
}
```

### Impl

Implementations are the associated function of a struct.
An `impl` can use a reference self argument, i.e. `&self` is short for `self: &Person`.

```rust
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

To summarize:

- no `self` argument: you can associate functions with structs, like the new "constructor".
- `&self` argument: can use the values of the struct, but not change them
- `&mut self` argument: can modify the values
- `self` argument: will consume the value, which will move.

### Enum

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

## Misc.

- `::` means much the same as does '.' in other languages - it is a fully qualified name and means "using", e.g. `std::env::args`
- An exclamation mark indicate a macro call. A useful macro is `assert_eq!` that asserts that two things must be equal or panic. Another is `format!` for building up strings.
- If you are iterating on code and what to thell the compile to ignore the missing pieces, you can add a `todo!("describe")`.
- Use unreachable as a runtime assertion that a logic branch should never be reached, `unreachable!("how to tell the compiler that this should never happen")`.
- Use `unwrap` to grab the inner value of an option.