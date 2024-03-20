# Compound types

- tuples
- arrays

Compound types can group multiple values into one type.
Rust has two primitive compound types: tuples and arrays.

## Tuple (`(T1, T2, ...)`)

A tuple is a way of grouping together values of different types into one compound type.
Like arrays, tuples have a fixed length and once declared, they cannot grow or shrink in size.
Unlike arrays, tuples can contain multiple different types.
An example is the Iterator `enumerate` that creates tuples of the key and value.

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
