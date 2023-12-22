# Introduction

Rust is a curly-braces language with semicolons, C++ style comments and a main function.
Rust is statically typed.
In static types the type is known at compile time, and dynamic types are only known at run time.
Rust is strongly typed in order to make it harder to write incorrect programs.
All memory acces is checked.
Write the best possible machine code with full control of memory use.

> In systems languages, program memory comes in two kinds: the stack and the heap. It is very fast to allocate data on the stack, but the stack is limited; typically of the order of megabytes. The heap can be gigabytes, but allocating is relatively expensive, and such memory must be freed later. In so-called 'managed' languages (like Java, Go and the so-called 'scripting' languages) these details are hidden from you by that convenient municipal utility called the garbage collector. Once the system is sure that data is no longer referenced by other data, it goes back into the pool of available memory.

The downsides of garbage collection? The first is that it is wasteful of memory, which matters in those small embedded microchips which increasingly rule our world. The second is that it will decide, at the worst possible time, that a clean up must happen now.

## Basics: Types

Every value in rust has a type.
All variables types ust be known at compile time.
Types can usually be infered, but must be specified for `const` and function arguments.
When many types are possible a type annotation must be added, and the compiler will error: "type annotations needed".

There are two data type subsets: scalar and compound.
A scalar type represents a single value.
There are four primary scalar types: integers, floating-point numbers, Booleans, and characters.
Compound types gropu multiple values into one type.
There are two compound types: tuples and arrays.

### Variables

Variable declaration, if-else statements, and operators are similar to JavaScript with fewer brackets.
All variables must be initialised.
There are two types of variables, immutable and mutable.
Variables are immutable by default and are declared with `let`, e.g. `let foo = 5;`.
Mutable variables are declared by adding `mut` after the `let`, e.g. `let mut foo = 5;`.
Immutable variables are also declared with `const`, e.g. `const WELCOME: &str = r"Welcome to RUSTLINGS";`
Variables declared with `const` are immutable, can't be used with `mut` with them and must be type annotated.
By convention, `const` variable names are all uppercase with underscores between words.

In rust it is possible to shadow variables.
Shadowing is where a second variable with the same name "overshadows" the first, taking any uses of the variable name to itself.
Shadowing allows you to change types:

```rust
    // The shadowed variable is still immutable
    let file = get_file(args); // Filehandle
    let file = read_file(file); // String
    let file = tokenize(file); // Vec<string>
```

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

Rust’s `char` type is the language’s most primitive alphabetic type. It is four bytes in size and represents a Unicode Scalar Value. THe Unicode Scalar Values range from U+0000 to U+D7FF and U+E000 to U+10FFFF inclusive. The char literal is specified with single quotes, as opposed to string literals, which use double quotes.

### Strings

A system language has to have two kinds of string, allocated dynamically at runtime or static.
Under the hood, String is basically a Vec<u8> and &str is &[u8], but those bytes must represent valid UTF-8 text.
Where u8 is a string of characters.

```rust
fn main() {
    let text = "hello dolly";  // the string slice
    let s = text.to_string();  // it's now an allocated string

    dump(text);
    dump(&s);
}
```

### Tuple

A tuple is a general way of grouping together a number of values with a variety of types into one compound type.
Tuples have a fixed length: once declared, they cannot grow or shrink in size.
Tuples can be accessed by destructuring or using a period (`.`) notation.
The tuple without any values is called a unit `()` and represent an empty value or an empty return type.

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;
let five_hundred = tup.0;
```

### Array-ish

#### Arrays

Arrays are values packed nose to tail in memory, so that they are efficient to access.
Arrays are indexed from zero.
Arrays can only contain one type of data, `let a: [i32; 5] = [1, 2, 3, 4, 5];`.
An array can be initialised to contain the same value for each element by specifying the initial value, followed by a semicolon, e.g. `let a = [3; 5]; // [3, 3, 3, 3, 3]`.

The type of an array includes its size, i.e. the type of `[10, 20]` would be `[i32; 2]`.
That is, Rust arrays are fixed in size, and the size of an array is known at compile-time.
Because the type of an array includes its size, they are not used that often.
Arrays are useful when you want your data allocated on the stack rather than the heap.

```rust
fn main() {
    let arr = [10, 20, 30, 40];
    let first = arr[0];
    println!("first {}", first);

    for i in 0..4 {
        println!("[{}] = {}", i,arr[i]);
    }
    println!("length {}", arr.len());
}
```

Rust checks that any index lookup is within the range of the array at runtime and exits if not.
In orther languages when you provide an incorrect index, invalid memory can be accessed.

#### Slices

Slices are used more commonly.
Slices are views into an underlying array of values.
You have to explicitly say that you want to pass an array as a slice using the & operator.
When slicing a copy of the data is never made.
Slices all borrow their data from their arrays.

```rust
// read as: slice of i32
fn sum(values: &[i32]) -> i32 {
    let mut res = 0;
    for i in 0..values.len() {
        res += values[i]
    }
    res
}

fn main() {
    let arr = [10,20,30,40];
    // look at that &
    let res = sum(&arr);
    println!("sum {}", res);
}
```

How can you safely access slices at run time?
Instead getting by index, use the slice method `get` which does not panic and returns an "Maybe" Some or None option.
(Panics are memory safe because they happen before any illegal access to memory.)
An Option in a box that may contain a value, or nothing (None).
The Option box can be conditionally unwrapped, `*slice.get(5).unwrap_or(&-1);`.

#### Vectors

Vectors are re-sizeable arrays.
A vector is a similar collection type provided by the standard library that is allowed to grow or shrink in size.
Slice borrow the memory from the vector.
When the vector dies or drops, it lets the memory go.
Vectors compare with each other and with slices by value.
Vectors have a size and a capacity. If you clear a vector, its size becomes zero, but it still retains its old capacity.
You can insert values into a vector at arbitrary positions with insert, and remove with remove.
This is not as efficient as pushing and popping since the values will have to be moved to make room.
Many vector operations are done in place so use clone to copy vectors.

```rust
fn main() {
    let mut v = Vec::new();
    v.push(1.0);
    v.push(2.0);
    v.push(3.0);

    let slice = &v[1..];
    println!("{:?}", slice);
    // [2.0, 3.0]
}
```

```rust
fn main() {
    let mut v1 = vec![10, 20, 30, 40];
    v1.pop();

    let mut v2 = Vec::new();
    v2.push(10);
    v2.push(20);
    v2.push(30);

    assert_eq!(v1, v2);

    v2.extend(0..2);
    assert_eq!(v2, &[10, 20, 30, 0, 1]);
}
```

#### Iterators

`rustc` does a lot of optimizations in order to make it more efficient to iterate over an array or slice.

```rust
fn main() {
    let sum: i32  = (0..5).sum();
    println!("sum was {}", sum);

    let sum: i32 = [0, 1, 2].iter().sum();
    println!("sum was {}", sum);
}
```

### Functions

Functions are one place where the compiler will not work out types with type inference--inputs and outputs must be typed.
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

#### Passing variables to functions: Referencing or borrowing

References are explicitly passed into functions with `&` and explicitly dereferenced with `*`.
Passing by reference is important when we have a large object and don't want to copy it.
Borrowing is the name given whenever you pass something by reference.

```rust
fn modifies(x: &mut f64) {
    *x += 1.0;
}

fn main() {
    let mut res = 0.0;
    println!("res is {}", res);
    modifies(&mut res);
    println!("res is {}", res);
    modifies(&mut res);
    println!("res is {}", res);
}

// res is 0
// res is 1
// res is 2
```

## Basics: control flow

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

Like a switch statement, I think.
But you can do more, like matching on Some or None, and ranges, instead of just values.

## Misc.

- `::` means much the same as does '.' in other languages - it is a fully qualified name and means "using", e.g. `std::env::args`
- An exclamation mark indicate a macro call. A useful macro is `assert_eq!` that asserts that two things must be equal or panic. Another is `format!` for building up strings.

### Resources

- [Rust gentle introduction](https://stevedonovan.github.io/rust-gentle-intro/readme.html)
    - [x] Basics
    - [ ] Structs, Enums and Matching
    - [ ] Filesystem and Processes
    - [ ] Modules and Cargo
    - [ ] Standard Library Containers
    - [ ] Error Handling
    - [ ] Threads, Networking and Sharing
    - [ ] Object-Oriented Programming
    - [ ] Parsing with Nom
    - [ ] Pain Points
- [Rust-lang book](https://doc.rust-lang.org/)
    - [ ] 1.0 Getting Started
    - [ ] 2.0 Programming a guessing game
    - [ ] 3.0 Common Programming Concepts
        - [x] 3.1 Variables and Mutability
        - [x] 3.2 Data Types
- [ ] [Rustlings](https://github.com/rust-lang/rustlings)
- [ ] [Rust for TypeScript Devs](https://frontendmasters.com/courses/rust-ts-devs)
    - [ ] Basics
        