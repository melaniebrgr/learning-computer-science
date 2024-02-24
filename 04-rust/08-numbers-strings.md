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

Basic math operations addition, subtraction, multiplication, division, and remainder are supported. Note that integer division truncates toward zero to the nearest integer.

## Character

Rust’s `char` type is the language’s most primitive alphabetic type. It is four bytes in size and represents a Unicode Scalar Value.
The Unicode Scalar Values range from U+0000 to U+D7FF and U+E000 to U+10FFFF inclusive.
The char literal is specified with single quotes, as opposed to string literals, which use double quotes.

## String

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
