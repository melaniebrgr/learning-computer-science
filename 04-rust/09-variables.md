# Basics

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

## Logging

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
