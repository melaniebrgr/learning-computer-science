# Macros

Marcos look like functions but their names end with a bang.
An exclamation mark indicates a macro call.
Unlike a function function call, macro source code is expanded on compilation into the source code.

A useful macro is `assert_eq!` that asserts that two things must be equal or panic.
Another is `format!` for building up strings.
When working on the code, to the compiler to ignore unfinished parts, a `todo!("describe")` can be added.
For a logic branch can never be reached, and unreachable runtime assertion, a `unreachable!("how to tell the compiler that this should never happen")` can be added.
