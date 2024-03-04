# Introduction

"Where do you want to spend your slow? Pre-compile or prod?" - the Primeagens case for Rust.
There is no getting around errors and undefined: you always know when they can happen and must do something about them.

Rust is a programming language developed by Mozilla Research.
It was first released in 2012.
Rust offers safety guarantees and low-level control over performance with high-level language ergonomics and without having a garbage collector or runtime.
Rust is a compiled language, that is rust programs are compiled to binary executables that run natively on machines.
JavaScript by contrast

Rust is a statically typed, curly-braces language with semicolons, and a main function.
(Static types are when types known at compile time, while dynamic types are only known at run time.)
Rust is strongly typed in order to make it harder to write incorrect programs.

In JavaScript we just create things, we don't think about how they're laid out in memory.
In Rust you need to define the blueprint of exactly how things are going to be laid out in memory.

> In systems languages, program memory comes in two kinds: the stack and the heap. It is very fast to allocate data on the stack, but the stack is limited; typically of the order of megabytes. The heap can be gigabytes, but allocating is relatively expensive, and such memory must be freed later. In so-called 'managed' languages (like Java, Go and the so-called 'scripting' languages) these details are hidden from you by that convenient municipal utility called the garbage collector. Once the system is sure that data is no longer referenced by other data, it goes back into the pool of available memory.

The downsides of garbage collection are that it is wasteful of memory, which matters in small embedded microchips that increasingly rule our world. The second is that it will decide, potentially at the worst possible time, that a clean up must happen.

## Running a program

The `rustup` tool installs rust and manages the rust toolchain.
Installing rustup will give you out of the box the latest stable compiler with your host platform as a target.
`rustup update` updates the rust toolchain, which is recommended to do periodically.
A new version of the compiler is released on the stable channel every six weeks, for example.
Rust is an ahead-of-time compiled language. A program gets compiled before it can executed or be given to someone else to execute.
Rust ships with a compiler `rustc`.
The main purpose of the Rust compiler is to convert Rust code into machine code a.k.a binary executables, which is a set of instructions that CPUs and operating systems can understand and execute.
The Rust project strives to support a broad range of compilation targets with various level of guarantees.
Targets are split into tiers, from “guaranteed-to-work” Tier 1 to “best-effort” Tier 3.

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

## Variables

Some rules:

- One variable must own the the data (an uninitialized variable is not allowed)
- One variable can change the data
- Many variables can look at the data
- You cannot look at and change the data simultaneously
- You cannot look at something that has been dropped

### let

The `let` and `const` keywords create new variable bindings.
Variables are immutable by default when declared with `let`, e.g. `let foo = 5;`.
Trying to assign a new value to `foo` results in a compiler error.
That is, the "regular" keyword for variable binding makes the value immutable.

### const

Immutable variables can also be declared with `const`, e.g. `const WELCOME: &str = r"Welcome to RUSTLINGS";`.
Variables declared with `const` must be type annotated.
By convention, `const` variable names are all upper, snakecase.

### mut

Mutable variables are declared by including `mut`, e.g. `let mut foo = 5;`.
Variables declared with `const` can't be used with `mut`.

### shadowing

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

Rust distinguishes between expressions and statements.
Expressions return a value based on their operand(s).
Statements simply return a `()` type which behaves just like `void` in C/C++ language.
For example, `num * num` is an expression while `return num * num;` is a statement.

## Comments

```rust
// This is a comment. Line comments look like this...
// and extend multiple lines like this.

/* Block comments
  /* can be nested. */
*/

/// Documentation comments look like this and support markdown notation.
/// # Examples
///
/// ```
/// let five = 5
/// ```
```

## Printing

Printing is handled by a series of macros defined in `std::fmt`.
`std::fmt::Display`: Uses the `{}` marker.
`std::fmt::Debug:` Uses the `{:?}` marker. Format text for debugging purposes.
Rust also provides "pretty printing" with `{:#?}`.

Only types that implement `fmt::Display` can be formatted with `{}`.
Not all types implement `fmt::Display` because there is no ideal style for all types, so the std library doesn't presume to dictate one.
For example, `fmt::Display` is not implemented for `Vec<T>` or for any other generic containers, so `fmt::Debug` must be used for these cases.

The `println!` macro takes a string formatter as the first argument.
The variables to render within it are any following arguments.

```rust
println!("{} {}", string, num);
println!("{:?} {:?}", vector, slice);
println!("{0}, this is {1}. {1}, this is {0}", "Alice", "Bob");
println!("{subject} {verb} {object}",
  object="the lazy dog",
  subject="the quick brown fox",
  verb="jumps over");
```

- format!: write formatted text to String
- print!: same as format! but the text is printed to the console (io::stdout).
- println!: same as print! but a newline is appended.
- eprint!: same as print! but the text is printed to the standard error (io::stderr).
- eprintln!: same as eprint! but a newline is appended.

## Errors

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
