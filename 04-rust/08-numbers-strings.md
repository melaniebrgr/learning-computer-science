# Types

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

## Numbers

**Integer** types have different sizes (8, 16, 32, 64, 128, char) and are signed (`i`) or unsigned (`u`). For example, `i8` is a signed 8-bit integer value from -128 to 127 (-2^7 to 2^7 - 1, or 00000000 to 11111111 in binary ).
A `usize` is a "pointer-sized" unsiged integer. It's size depends on the target, e.g. on a 64 bit target the `usize` is 8 bytes (equivalent to `u64`). Therefore the maximum `usize` value depends on the system.

There are two floating point primitives, `f32` and `f64`. The default type is `f64` because on modern CPUs, it's roughly the same speed as `f32`.

| type             | min                                      | max                                     |
| ---------------- | ---------------------------------------- | --------------------------------------- |
| `u8`             |                                        0 |                                     255 |
| `i8`             |                                     -128 |                                     127 |
| `u16`            |                                        0 |                                   65535 |
| `i16`            |                                   -32768 |                                   32767 |
| `u32`            |                                        0 |                              4294967295 |
| `usize` (32-bit) |                                        0 |                              4294967295 |
| `i32`            |                              -2147483648 |                              2147483647 |
| `u64`            |                                        0 |                    18446744073709551615 |
| `usize` (64-bit) |                                        0 |                    18446744073709551615 |
| `i64`            |                     -9223372036854775808 |                     9223372036854775807 |
| `u128`           |                                        0 | 340282366920938463463374607431768211455 |
| `i128`           | -170141183460469231731687303715884105728 | 170141183460469231731687303715884105727 |
| `f32`            |                                 -3.4E+38 |                                -3.4E+38 |
| `f64`            |                  -17976931348623157E+292 |                  17976931348623157E+292 |

Number literal types include decimal, hex, octal, binary, and byte. Number literal types can be denoted with a type suffix, and use `_` to make the number more readable, e.g.  `1_000u32`.

### Arithmetic

Basic math operations addition, subtraction, multiplication, division, and remainder are supported, e.g. `let sum = x + y + 13;`. Note that integer division truncates toward zero to the nearest integer.

## Stringish

Any system language has two kinds of string, one static and known at compile time, and dynamically allocated at runtime.
Rust is no exception: it has a static string literal (`str`) type, and dynamic **S**tring.
Under the hood, String is basically a `Vec<u8>` and &str is `&[u8]`, always holding or referencing a valid UTF-8 sequence.

### Character

Rust's `char` type is the language’s most primitive alphabetic type. It is four bytes in size and represents a Unicode Scalar Value.
The Unicode Scalar Values range from U+0000 to U+D7FF and U+E000 to U+10FFFF inclusive.
The char literal is specified with single quotes, as opposed to string literals, which use double quotes.

### String

The String type is the most common string type that has ownership over the contents of the string.
Strings are always valid UTF-8.
Because UTF-8 is a variable width encoding, Strings are typically smaller than an array of the same chars.
A String also has a close relationship with its borrowed counterpart `str`; a `str` can be a view into a String.

A `String` is heap-allocated, and made up of three components:

1. a pointer to some bytes,
2. a length, and
3. a capacity.

The pointer points to an internal buffer String uses to store its data.
The length is the number of bytes currently stored in the buffer.
The capacity is the size of the buffer in bytes.
The length will therefore always be less than or equal to the capacity.
The buffer is stored on the heap.
The pointer, length and capacity can be inspected with the `as_ptr`, `len`, and `capacity` methods.
A String can even be (unsafely) built out of ptr, len, and capacity.
Strings can be created from literals.

```rust
fn main() {
  let s = "Hello".to_string();
  let s = String::from("world");
  let s: String = "also this".into();
}
```

A new String can also be created from existing values by concatenating, or appending  `chars` or `str`s with `push` and `push_str` methods respectively.

```rust
let s = "Hello".to_string();
let message = s + " world!"; 

let mut hello = String::from("Hello, ");
hello.push('w');

hello.push_str("orld!");
```

If a String does not have enough capacity, adding elements to it will re-allocate the String in memory.
Note, the `with_capacity` method can be used to allocate the correct capacity initially, e.g. `let mut s = String::with_capacity(25);`

```rust
let mut s = String::new();

println!("{}", s.capacity());

for _ in 0..5 {
    s.push_str("hello");
    println!("{}", s.capacity());
}

// Outputs

0 // no memory allocated at all at first
8 // as the strings is appended to it increases its capacity
16
16
32
32
// if the correct capacity, 25, had been pre-allocated more would not have been re-allocated in the loop
```

### str

The `str` type, also called a 'string slice', is the most primitive string type.
A string slice is an immutable view into another string, like a view `&[u8]` into `Vec<T>`
It is usually seen in its borrowed form, `&str` and string literals form `&'static str` (string literals are string slices).
String literals have a static lifetime, which means that it is guaranteed to be valid for the duration of the entire program.
A string slices lifetime can be specified as well.

```rust
let s: String = "hello world".to_string(); // String from literal
let s_slice: &str = &s // str from String
let hello_world = "Hello, World!"; // str from literal
let hello_world: &'static str = "Hello, world!";
```

A `&str` is made up of two components:

1. a pointer to some bytes (inspect with the `as_ptr` method), and
2. a length (`len`).

A `str` can be rebuilt--unsafely--out of a ptr and len.

Any function called on a string slice may assume that it is valid UTF-8, which means that a non-UTF-8 string slice can lead to undefined behavior.
