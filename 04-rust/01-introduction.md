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

There are two types of variables, immutable and mutable.
Variables are declared with `let`, e.g. `let foo = 5;` and are immutable by default.
Mutable variables are declared by adding `mut`, e.g. `let mut foo = 5;`.
Immutable variables can also be declared with `const`, e.g. `const WELCOME: &str = r"Welcome to RUSTLINGS";`
Variables declared with `const` can't be used with `mut` and must be type annotated.
By convention, `const` variable names are all uppercase and snakecase.

In rust variables can be shadowed, where second variable with the same name "overshadows" the first.
The second declaration takes any use of the variable name to itself.
The shadowed variable can still be immutable.
Types can be changed with shadowing.

```rust: shadowing
    let file = get_file(args); // Filehandle
    let file = read_file(file); // String
    let file = tokenize(file); // Vec<string>
```

## Types

Every value in rust has a type.
All variables types must be known at compile time.
Types can often be infered, but there are times must be specified:
- When declaring with `const`
- function arguments
- when many types are possible, else the compiler will error "type annotations needed".

There are two subsets of data types: scalar and compound.
A scalar type represents a single value, whereas compound types group multiple values into one type.
The four primary scalar types: integers, floating-point numbers, Booleans, and characters.
The two compound types: tuples and arrays.

### Numbers

Integer types have different sizes (8, 16, 32, 64, 128, char) and are signed (`i`) or unsigned (`u`).
For example, `i8` is a signed 8-bit integer and can represent numbers from -128 to 127 (-2^(n - 1) to 2^(n - 1) - 1, where n = 8).
Another example, `u8` is an unsigned 8-bit integer and can represent values from 0 to 255 (0 to 2^(n - 1)).
Number literal types can be denoted with a suffix, and use `_` to make the number more readable, e.g.  `1_000u32`.
Number literal types include: decimal, hex, octal, binary, byte.

There are two floating point primitive: `f32`, `f64`.
The default type is `f64` because on modern CPUs, it’s roughly the same speed as `f32`.

Basic math operations addition, subtraction, multiplication, division, and remainder are supported.
Integer division truncates toward zero to the nearest integer.

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
A struct(ure) defines data, and an impl(ementation) defines behaviour.
Structs hold properties, they are effectively blueprints.
That is, a struct is a property layout, and define exactly what is going to be on that item.
It has a defined size and will have certain amount of bytes associated with it.

```rust
struct Vector {
    x: usize,
    y: usize,
    z: usize
}

let point = Vector {
    x: 1,
    y: 2,
    z: 3,
};

let Vector { x, y, z } = point;

println!("{}, {}, {}", x, y, z)
```

### Impl

```rust
impl Foo {
    // these are static methods
    fn this() // available usage within the file
    pub fn this() // available usage within the file

    // these are instance methods
    fn this(&self)...
    fn this(&mut self)...

    // public instance methods
    pub fn this(self)...
}
```

### Enum

Enums are a way of saying a value is one of a possible set of values.
After creating an enumeration, it is now a custom data type that be used elsewhere in the code.
The name of each enum variant that we define also becomes a function that constructs an instance of the enum.
That is, IpAddr::V4() is a function call that takes a String argument and returns an instance of the IpAddr type. We automatically get this constructor function defined as a result of defining the enum.
each variant can have different types and amounts of associated data.
Any kind of data can be put inside an enum variant: strings, numeric types, structs, other enums for example.
Methods can be defined on enums using `impl`.
That is you can hang methods off yenums using impls.

```rust
enum IpAddrKind {
    V4,
    V6,
}

enum IpAddr {
    V4(String),
    V6(String),
}

enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

impl IpAddr {
    fn call(&self) {
        // method body would be defined here
    }
}

let ip = IpAddr::V6(String::from("::1"));
ip.call();
```

`Option<T>` is an example of an enum.
The Option type encodes the common scenario in which a value could be something or it could be nothing.

```rust
enum Option<T> {
    None,
    Some(T),
}
```

The `Option<T>` enum is still just a regular enum, and `Some(T)` and` Non`e are still variants of type `Option<T>`.
The compiler won’t let us use an `Option<T>` value as if it were definitely a valid value.

"In order to have a value that can possibly be null, you must explicitly opt in by making the type of that value Option<T>. Then, when you use that value, you are required to explicitly handle the case when the value is null. Everywhere that a value has a type that isn’t an Option<T>, you can safely assume that the value isn’t null. This was a deliberate design decision for Rust to limit null’s pervasiveness and increase the safety of Rust code."

## Control flow

### if-else

Same as JavaScript, just drop the parentheses.

```rust
let x = 10;
if x == 10 {
    println!("x is ten!");
} else {
    println!("x is not ten!");
}
```

### Matching

The match expression is a control flow construct that, when used with enums, will run different code depending on which variant of the enum it has.
It can match on Some or None, and ranges, as well as plain values.

## Misc.

- `::` means much the same as does '.' in other languages - it is a fully qualified name and means "using", e.g. `std::env::args`
- An exclamation mark indicate a macro call. A useful macro is `assert_eq!` that asserts that two things must be equal or panic. Another is `format!` for building up strings.
- If you are iterating on code and what to thell the compile to ignore the missing pieces, you can add a `todo!("describe")`.
- Use unreachable as a runtime assertion that a logic branch should never be reached, `unreachable!("how to tell the compiler that this should never happen")`.
- Use `unwrap` to grab the inner value of an option.