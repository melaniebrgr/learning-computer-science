# Rust

## Introduction

Rust is a programming language developed by Mozilla Research and first released in 2012.

> Rust offers safety guarantees and low-level control over performance with high-level language ergonomics and without having a garbage collector or runtime."

Ok... but what does any of that mean? Let's break it down.

### safety guarantees

> Memory safety bugs are responsible for the majority (~70%) of errors in C/C++ code bases.

In JavaScript memory is automatically allocated when variables are declare, and automatically freed by the garbage collector when not needed and garbage collection is scheduled.

Browsers are probably the most exposed piece of software nowadays, and the vendors already do a lot of work to provide secure sandboxing. When using JavaScript, you're using a memory-safe language, in a sandboxed environment.

Rust is a statically typed, meaning types known at compile time, while dynamic types are only known at run time. JavaScript and TypeScript are dynamically typed languages. Don't anyone fool you into believing otherwise. Rust's strong typing makes it harder to write incorrect programs.
Rust knows what might be an error and what might be undefined and forces you to do something about it. (Even it's you just `.unwrap()` it, at least you are aware of your footgun.)

### low-level control over performance with high-level language ergonomics

Zero-cost abstractions: don't pay for what you don't use. High-level language abstractions like vectors don't incur runtime overhead or performance penalties like loops. Other languages like python need to make additional run time checks during iteration, because the iterable can change in shape and size.

In JavaScript we just create things, we don't think about how they're laid out in memory.
In Rust, the language syntax itself determines how memory is allocated.

### without a garbage collector

> In systems languages, program memory comes in two kinds: the stack and the heap. It is very fast to allocate data on the stack, but the stack is limited; typically of the order of megabytes. The heap can be gigabytes, but allocating is relatively expensive, and such memory must be freed later. In so-called 'managed' languages (like Java, Go and the so-called 'scripting' languages) these details are hidden from you by that convenient municipal utility called the garbage collector. Once the system is sure that data is no longer referenced by other data, it goes back into the pool of available memory.

Garbage collection frees us from thinking about allocating and deallocating memory. A downside of garbage collection is that it is wasteful of memory, which particularly matters in small embedded systems, and it can be scheduled at potentially the worst possible time.

Rust follows the Resource Acquisition Is Initialisation (RAII) pattern from C++. Resources, like allocated memory, file handles, and database connections are created when a variable comes into scope, and dropped when it goes out of scope. RAII is enforced in Rust through ownership rules and borrowing rules. In terms of ownership: every value has an owner, there can be only one at a time, and the value is dropped when the owner goes out of scope. In terms of borrowing: you can have as many immutable references as you want or only one mutable reference out at a time, and references must be valid. This avoids "null pointer dereferencing". Whatever that is.

### without a runtime

Rust is ahead-of-time compiled to binary executables that run natively on machines and can be given to someone else to execute. "Where do you want to spend your slow? Pre-compile or on prod?" - Primeagen

## Installation

The `rustup` tool installs rust and manages the rust toolchain.
Installing rustup will give you out of the box the latest stable compiler with your host platform as a target.
`rustup update` updates the rust toolchain, which is recommended to do periodically.
A new version of the compiler is released on the stable channel every six weeks, for example.

## Compilation

Rust ships with a compiler `rustc`.
The main purpose of the Rust compiler is to convert Rust code into machine code a.k.a binary executables, which is a set of instructions that CPUs and operating systems can understand and execute.
The Rust project strives to support a broad range of compilation targets with various level of guarantees.
Targets are split into tiers, from “guaranteed-to-work” Tier 1 to “best-effort” Tier 3.

```bash
rustc main.rs # compile
./main # execute
```

## Creating a project

Rust has a build system and package manager called `cargo`.
Use cargo to manage building, compilation, and configuration.
`cargo new` with a project name and optional flags will create a new project.
`--bin` will setup a binary program (the default) and `--lib` will set up a library.

```bash
cargo new hello_world # creates a new directory and project
cargo init # for a directory with an existing project
```

Setting up a project with cargo will add a Cargo.toml, which is analogous to package.json.
It contains a package configuration and dependencies list.

## Building and compiling a program

```bash
cargo check # checks but does not compile
cargo build # compiles debug executable to `target/debug/...`
cargo build --release # compiles optimised release executable
cargo run # compiles and runs executable
```

Cargo puts the binary it generates in a directory named debug because the default build is a debug build.
