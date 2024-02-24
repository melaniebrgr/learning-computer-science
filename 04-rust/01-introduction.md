# Introduction

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

Rust distinguishes between expressions and statements.
Expressions return a value based on their operand(s).
Statements simply return a `()` type which behaves just like `void` in C/C++ language.
For example, `num * num` is an expression while `return num * num;` is a statement.

## Logging

```rust
println!("{} {}", string, num);
println!("{:?} {:?}", vector, slice);
```

## Comments

### Comments for humans

```rust
// This is a comment. Line comments look like this...
// and extend multiple lines like this.

/* Block comments
  /* can be nested. */ */

/// Documentation comments look like this and support markdown notation.
/// # Examples
///
/// ```
/// let five = 5
/// ```
```

### Comments for the machine

When working on the code, to the compiler to ignore unfinished parts, a `todo!("describe")` can be added.
For a logic branch can never be reached, and unreachable runtime assertion, a `unreachable!("how to tell the compiler that this should never happen")` can be added.