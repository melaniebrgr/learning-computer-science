# Primitives

- numbers
- string literal
- char
- String
- str
- tuples
- arrays
- slices

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

## Char

Rust's `char` type is the language’s most primitive alphabetic type. It is four bytes in size and represents a Unicode Scalar Value.
The Unicode Scalar Values range from U+0000 to U+D7FF and U+E000 to U+10FFFF inclusive.
The char literal is specified with single quotes, as opposed to string literals, which use double quotes.
A char can be alphabetical `'爱'`, numerical `'4'`, or neither '🐓'.

## string literal

String literals are stored inside the binary.
The type of a string literal is `&str`.
It’s a slice pointing to that specific point of the binary.
This is why string literals are immutable; `&str` is an immutable reference.

## String

Any system language has two kinds of string, one static and known at compile time, and dynamically allocated at runtime.
Rust is no exception: it has a static string literal (`str`) type, and dynamic **S**tring.
Under the hood, String is basically a `Vec<u8>` and &str is `&[u8]`, always holding or referencing a valid UTF-8 sequence.

If you squint, a vector and a String are nearly the same thing.
Both are allocated dynamically to the heap.
A String is just restricted to UTF-8 data, whereas a vector can be anything.
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

## str

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

## Tuple (`(T1, T2, ...)`)

A tuple is a way of grouping together values of different types into one compound type.
Like arrays, tuples have a fixed length and once declared, they cannot grow or shrink in size.
Unlike arrays, tuples can contain multiple different types.

Tuples are constructed using parentheses ()
Tuples can be a useful way to return multiple values from a function.
Tuples can be accessed in two ways

- by destructuring
- by "tuple indexing" using a period (`.`) notation

Note, "key" names start at 0 when accessing by dot notation.
The tuple without any values is called a unit `()` and represent an empty value or an empty return type.

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;
let five_hundred = tup.0;
```

## Arrays (`[T; length]`)

In Rust, and array is primitive _compound_ type.
The only other primitive compound type is a tuple.

An array is a collection of objects of the same type that is stored in contiguous memory.
What is contiguous memory is when values are packed nose-to-tail in memory, so that they are efficient to access.
Arrays are created using brackets [], and a length.
The type of an array always includes its size, i.e. the signature of `[10, 20]` is `[i32; 2]`.

Like all arrays, Rust arrays are indexed from zero.
Arrays can contain one data type, `let a: [i32; 5] = [1, 2, 3, 4, 5];`.
An array can be initialised to contain a each element by specifying an initial value, followed by a semicolon and size, e.g. `let a = [3; 5]; // [3, 3, 3, 3, 3]`.


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

Rust arrays are fixed in size, and the size of an array is known at compile-time.
Rust checks that any index lookup is within the range of the array at runtime and exits if it is not.
In other languages when you provide an incorrect index, invalid memory can be accessed.
While arrays are useful when you want your data allocated on the stack, because an array cannot change in size, it is not used that often.

## Slices (`&[T]`)

A string slice is a reference to part of a String.
They are a view into an underlying array of values and have a type signature `&[T]`.
If a String is updated, so is the view of it.
We create slices using a range within brackets by specifying `[starting_index..ending_index]`.
`starting_index` is the first position in the slice and `ending_index` is one more than the last position in the slice.
The `..` is the range syntax.
Slices are similar to arrays, but their length is known at compile time.
Slices are used more commonly than arrays in order to borrow a section of one.

Slices always _borrow_ their data and never copy it.
You have to explicitly say that you want to create a slice with the `&` operator.
Slices can be created from both strings and arrays

```rust
// String slice
let s = String::from("hello");
let hello = &s[0..5]; // slices from 0 (incluse) to 5 (exclusize)
hello = &s[..5]; // equivalent to &s[0..5] 
hello = &s[0..]; // equivalent to &s[0..5]
hello = &s[..]; // equivalent to &s[0..5]
// -> "hello"
```

Arrays can be sliced as well as strings.

```rust
// Array slice
let a = [1, 2, 3, 4, 5];
let nice_slice = &a[1..=3]; // slices from 1 (incluse) to 3 (inclusive)
// -> [2, 3, 4]
```

How can you safely access slices at run time?
Instead getting by index, use the slice method `get` which does not panic and returns an "Maybe" (Some or None option).
(Panics are memory safe because they happen before any illegal access to memory.)
