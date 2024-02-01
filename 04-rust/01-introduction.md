# Introduction

Rust is a statically typed, curly-braces language with semicolons, C++ style comments and a main function.
(Static types are when types known at compile time, while dynamic types are only known at run time.)
Rust is strongly typed in order to make it harder to write incorrect programs.

In JavaScript we just create things, we don't think about how they're laid out in memory.
In Rust you need to define the blueprint of exactly how things are going to be laid out in memory.

> In systems languages, program memory comes in two kinds: the stack and the heap. It is very fast to allocate data on the stack, but the stack is limited; typically of the order of megabytes. The heap can be gigabytes, but allocating is relatively expensive, and such memory must be freed later. In so-called 'managed' languages (like Java, Go and the so-called 'scripting' languages) these details are hidden from you by that convenient municipal utility called the garbage collector. Once the system is sure that data is no longer referenced by other data, it goes back into the pool of available memory.

The downsides of garbage collection are that it is wasteful of memory, which matters in small embedded microchips that increasingly rule our world. The second is that it will decide, potentially at the worst possible time, that a clean up must happen.

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

### Function

Are defined with the keyword `fn`.
Functions are one place where the compiler will not work out types with type inference: inputs and outputs must be typed.
The body of the function has the value of its last expression, just like with if-as-an-expression.
Returns are generally only used for returning early from a function.

```rust
// return value is last 
fn abs(x: f64) -> f64 {
    if x > 0.0 {
        x
    } else {
        -x
    }
}
```

### Closure

Uses bar instead of parentheses

```typescript
(x) => {
  return x;
};

(x) => x + 1;
```

```rust
|x| {
    return x;
}

|x| x + 1
```

### Class

In rust the behaviour and the data are defined in seperate block: a struct and an implementation.

### Struct

Structs hold properties.
A struct is a property layout, and define exactly what is going to be on that item.
They are blueprints.
It has a defined size, that has a certain amount of bytes associated with it.

```rust
fn main() {
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
}
```

```rust
impl Foo {
    // these are both static methods
    fn this() // available usage within the file
    pub fn this() // available usage within the file

    // you should be able to understand this before the end
    // of the day..
    //
    // and all of this can add pub
    // these are instance methods
    fn this(&self)...
    fn this(&mut self)...

    // public instance methods
    pub fn this(self)...
}
```

### Trait (interface)

A trait is effectively an interface.
A trait is an implementation of a method on that struct.
It allows for composing.

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

### Range

```rust
// Exclusive range: up to and not including 10
for i in 0..10 {
    println!("Ring! Call number {}", i + 1);
}

// Inclusive range: up to and including 10
for i in 0..=10 {
    println!("Ring! Call number {}", i + 1);
}
```

### While

```rust
while true { }
```

### Matching

Like a switch statement, I think.
But you can do more, like matching on Some or None, and ranges, instead of just values.

## Misc.

- `::` means much the same as does '.' in other languages - it is a fully qualified name and means "using", e.g. `std::env::args`
- An exclamation mark indicate a macro call. A useful macro is `assert_eq!` that asserts that two things must be equal or panic. Another is `format!` for building up strings.
- If you are iterating on code and what to thell the compile to ignore the missing pieces, you can add a `todo!("describe")`.
- Use unreachable as a runtime assertion that a logic branch should never be reached, `unreachable!("how to tell the compiler that this should never happen")`.
- Use `unwrap` to grab the inner value of an option.