# Scalar primitives

- integers
- floating-point numbers
- Booleans
- characters

Rust has four primary scalar types: integers, floating-point numbers, Booleans, and characters

## Numbers

**Integer** types have different sizes (8, 16, 32, 64, 128, char) and are signed (`i`) or unsigned (`u`).
For example, `i8` is a signed 8-bit integer value from -128 to 127 (-2^7 to 2^7 - 1, or 00000000 to 11111111 in binary ).
A `usize` is a "pointer-sized" unsiged integer.
It's size depends on the target, e.g. on a 64 bit target the `usize` is 8 bytes (equivalent to `u64`).
(There are 8 bits in a byte, so 8 bytes = 8 bytes * 8 bits = 64 bits.)
Therefore the maximum `usize` value depends on the system.

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

Basic math operations addition, subtraction, multiplication, division, and remainder are supported, e.g. `let sum = x + y + 13;`. Note that integer division truncates toward zero to the nearest integer.

## Boolean

A Boolean type in Rust has two possible values: true and false.
The Boolean type in Rust is specified using `bool`.
Booleans are one byte in size.

## Char

Rust's `char` type is the language’s most primitive alphabetic type. It is four bytes in size and represents a Unicode Scalar Value.
The Unicode Scalar Values range from U+0000 to U+D7FF and U+E000 to U+10FFFF inclusive.
The char literal is specified with single quotes, as opposed to string literals, which use double quotes.
A char can be alphabetical `'爱'`, numerical `'4'`, or neither '🐓'.
