# Strings and compound types

- String
- `&str`
- string literal

Any system language has two kinds of string, a static one known at compile time, and dynamic one allocated at runtime.
Rust is is the same it has a static string literal `str` type, and dynamic **S**tring.
A String also has a close relationship with its borrowed counterpart `str`.
String can be thought of as a `Vec<u8>` and &str as a `&[u8]` view into a String.
Both always hold or reference **a valid UTF-8** sequence.

## String

Characteristics:

- allocated on the heap
- have an address, size, capacity
- do not implement the Copy trait / get moved

Components:

- a pointer,
- a length, and
- a capacity.

If you squint, a vector and a String are nearly the same thing.
Both are allocated dynamically to the heap.
While a vector can be anything, a String is restricted to UTF-8 data.
The pointer points to an internal buffer that String uses to store its data.
The length is the number of bytes currently stored in the buffer.
The capacity is the size of the buffer in bytes.
The length will therefore always be less than or equal to the capacity.
The buffer is stored on the heap.
The pointer, length and capacity can be inspected with the `as_ptr`, `len`, and `capacity` methods.
A String can even be (unsafely) built out of ptr, len, and capacity.
Mostly Strings are created from literals.

```rust
fn main() {
  let s = "Hello".to_string();
  let s = String::from("world");
  let s: String = "also this".into();
}
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

### Working with Strings

A new String can be created from existing values by concatenating, or appending  `chars` or `str`s with `push` and `push_str` methods respectively.
Strings have many methods: <https://doc.rust-lang.org/std/string/struct.String.html#method.trim>

- creating:
  - `let s = "Hello".to_string();`
  - `let s = String::from("world");`
  - `let s: String = "also this".into();`
- concatenating:
  - `let message = s + " world!";`
  - `hello.push('w')`
  - `hello.push_str("orld!")`

## &str, &'static str

Characteristics:

- allocated on the stack
- have an address, size
- implement the Copy trait

Components:

- a pointer to some bytes (inspect with the `as_ptr` method), and
- a length (`len`).

A `str` can be rebuilt--unsafely--out of a ptr and len.
It is usually seen in its borrowed form, `&str` and string literal form `&'static str`.
When the data of the string is in the code itself (it doesn't come from a file or user input or another program) it has a `'static` lifetime.
Having a static lifetime, means that it is guaranteed to be valid for the duration of the entire program.

```rust
let s: String = "hello world".to_string(); // String from literal
let s_slice: &str = &s // str from String
let hello_world = "Hello, World!"; // str from literal
let hello_world: &'static str = "Hello, world!";
```

Any function called on a string slice may assume that it is valid UTF-8.
This means that a non-UTF-8 string slice can lead to undefined behavior.

### Working with strs

Strs have many, many methods: <https://doc.rust-lang.org/std/primitive.str.html#implementations>

## string literal

String literals are stored inside the binary.
The type of a string literal is `&str`.
It’s a slice pointing to that specific point of the binary.
This is why string literals are immutable; `&str` is an immutable reference.
