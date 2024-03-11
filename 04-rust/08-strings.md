# Strings and compound types

- string literal
- String
- str

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
