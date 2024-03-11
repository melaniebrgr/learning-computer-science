# Macros

Metaprogramming is where a program to manipulate or generate code during compile or runtime. Macros are a way to write code the modifies or generates code during compilation.
This allows the language to be extended.

Rust supports metaprogramming in the form of macros.
Macros look like a function call but their names end with a bang (!).
Unlike function calls though, macro source code is instead expanded on compilation into the source code.

Some useful Rust macros:

- `println!("{}", value)`, `println!("{:?}", value)`, or `println!("{:?}", value)` (might need to pair with `#[derive(Debug)]`)
- `dbg!(value)`
- `assert_eq!` asserts that two things must be equal or panics
- `format!` builds up strings
- `todo!("describe")` tells the compile to ignore unfinished parts to be added later
- `unreachable!("this should never happen")` is an unreachable runtime assertion that that logic branch can never be reached.
