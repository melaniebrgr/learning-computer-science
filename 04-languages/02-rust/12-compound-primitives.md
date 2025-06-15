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
