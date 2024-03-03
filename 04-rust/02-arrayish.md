# Data structures

1. Tuple
1. Array
1. Slice
1. Vector
1. Iterator
1. Range

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

## Arrayn (`[T; length]`)

In Rust, and array is primitive _compound_ type.
THe only oother primitive compound type is a tuple.

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

## Slice

Slices are similar to arrays, but their length is not known at compile time.
They are a view into an underlying array of values and have a type signature `&[T]`.
Slices are used more commonly than arrays in order to borrow a section of one.

Slices always _borrow_ their data and never copy it.
You have to explicitly say that you want to create a slice with the `&` operator.
Slices can be created from both strings and arrays

```rust
// String slice
let s = String::from("hello world");
let hello = &s[0..5]; // slices from 0 (incluse) to 5 (exclusize)
// -> "hello"

// Array slice
let a = [1, 2, 3, 4, 5];
let nice_slice = &a[1..=3]; // slices from 1 (incluse) to 3 (exclusize)
// -> [2, 3, 4]
```

How can you safely access slices at run time?
Instead getting by index, use the slice method `get` which does not panic and returns an "Maybe" (Some or None option).
(Panics are memory safe because they happen before any illegal access to memory.)

## Vector

Vectors are re-sizeable arrays.
They have a size and a capacity, meaning that if a vector is emptied, its size becomes zero, but it still retains its capacity.
In Rust, there are two ways to define a Vector.

1. One way is to use the `Vec::new()` function to create a new vector and fill it with the `push()` method.
2. The second way, which is simpler is to use the `vec![]` macro and define your elements inside the square brackets.

A vector is similar to a collection type provided by the standard library.
A vector is allowed to grow or shrink in size, but must decalred as mutable to do so.
When the vector dies or drops, the memory is let go.
Values can be insterted into a vector at arbitrary positions with insert, and removed with remove.
This is not as efficient as pushing and popping since the values will have to be moved to make room.
Many vector operations are done in place.
Use clone to copy vectors.

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

To iterate over values in a vector use a for loop.
It is possible to iterate immutably and mutably, using `mut` and a dereference operator `*`.
The reference to the vector that the for loop holds prevents simultaneous modification of the whole vector.

```rust
let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50;
}
```

## Iterator

The general pattern for interators: data structure A -> iterator -> data structure B
An iterator is _a seperate data structure_, it is not the thing itself.
An iterator only refers to the thing itself.
If a data structure has an order, like a vector, an iterator can walk through it.
An iterator has a pointer to a structure it can iterate, an index, and a next method.
`rustc` makes optimizations that make it more efficient to iterate over a array or slice.

```rust
fn main() {
    let sum: i32  = (0..5).sum();
    println!("sum was {}", sum);

    let sum: i32 = [0, 1, 2, 3, 4, 5]
        .iter()
        .sum();
    println!("sum was {}", sum);
}
```

Rust is performs "pull" operations while Javascript performs "push".
Where rust will lazily iterate over an iterator while conditions are met, javascript will loop over an entire array regardless of whether it is still necessary or not.
With iterators rust pulls the value through the list of operations one a time and filly collects them into something at the end.

## Collection

After iterating over a value you still have a iterator data structure.
To get it into a(nother) usable shape it needs to be collected into that type.
Collect simply iterates over the iterator and pushes each value in to the new data type, one by one.

```rust
fn main() {
    let my_list: Vec<_> = vec![1, 2, 3]
        .iter()
        .map(|x| x + 1)
        .collect();
    
    println!("{:?}", my_list);
}
```

The value returned by collect can be coerced by the type definition.
`into_iter` can be used to create an iterator instead of just refering to it.

```rust
fn main() {
    let foo: Vec<_> = vec!["Hello", "world", "!"]
        .into_iter()
        .collect();
        
    println!("{:?}", foo); // ["Hello", "world", "!"]
}

fn main() {
    let foo: String = vec!["Hello", "world", "!"]
        .into_iter()
        .collect();
        
    println!("{:?}", foo); // "Helloworld!"
}

fn main() {
    let foo: HashSet<isize> = vec![1, 2, 3]
        .into_iter()
        .collect();
        
    println!("{:?}", foo); // {1, 2, 3}
}
```

## Range

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
