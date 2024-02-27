# Macros

Marcos look like functions but their names end with a bang.
An exclamation mark indicates a macro call.
Unlike a function function call, macro source code is expanded on compilation into the source code.

A useful macro is `assert_eq!` that asserts that two things must be equal or panic.
Another is `format!` for building up strings.
