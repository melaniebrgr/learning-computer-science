# List Data Types

1. Vector
1. Iterator
1. Range

## Vector (`Vec<T>`)

Characteristics:

- allocated on the heap
- have an address (index of the first element), size, capacity

Components:

- a pointer,
- a length, and
- a capacity.

A vector is like a tuple but with consistent types, which is what allows us to iterate over them.
Vectors are a data structure for storing multiple values of the same type in a contiguous section of the heap.
They have a size and a capacity.
If a vector is emptied its size becomes zero, but it retains its capacity.
Vectors can only store values of the same type, or else we would know how to iterate over them (unknown memory sizes).

Often though Rust can infer the type from the items initially passed to the Vec.
If items aren't placed in a vector on instantiation, it must be type annotated.

```rust
let v: Vec<i32> = Vec::new();
```

In Rust, there are two ways to define a Vector.

1. One way is to use the `Vec::new()` function to create a new vector and fill it with the `push()` method.
2. The second way, which is simpler is to use the `vec![]` macro and define your elements inside the square brackets.

If you are able to, it is considered a best practise to indicate the size of a vector at compile time, so it can be properly allocated on the heap.

```rust
let mut v = Vec::new();
v.push(1.0);
v.push(2.0);
v.push(3.0);

let slice = &v[1..];
println!("{:?}", slice);
// [2.0, 3.0]
```

```rust
let mut v1 = vec![10, 20, 30, 40];
v1.pop();

let mut v2 = Vec::new();
v2.push(10);
v2.push(20);
v2.push(30);

assert_eq!(v1, v2);

v2.extend(0..2);
assert_eq!(v2, &[10, 20, 30, 0, 1]);
```

Vectors are re-sizeable.
Vectors are allowed to grow or shrink in size, but it must declared as mutable.
Values can be insterted into a vector at arbitrary positions with insert, and removed with remove.
This is not as efficient as pushing and popping since the values will have to be moved to make room.
Many vector operations are done in place, but Vectors can be copied by cloning.

If you want to store different types in a vector, you can use an enum.
If you don’t know the exhaustive set of types a program will get at runtime to store in a vector, the enum technique won’t work and a trait object can be used instead.

```rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```

There are two ways to reference a value stored in a vector: via indexing (`[0]`) or using the `.get(0)` method.
The `.get` method returns an option.
Access via index when you want the program to panic for an out-of-bounds request.
Access via get when you want to provide user friendly feedback for an out-of-bounds request.

```rust
let v = vec![1, 2, 3, 4, 5];

let third: &i32 = &v[2];
println!("The third element is {third}");

let third: Option<&i32> = v.get(2);
match third {
    Some(third) => println!("The third element is {third}"),
    None => println!("There is no third element."),
}
```

To access all elements in turn we iterate over them.
A for loop is used to iterate over values in a vector.

```rust
let v = vec![100, 32, 57];
for i in &v {
    println!("{i}");
}
```

It is possible to iterate immutably and mutably, using `mut` and a dereference operator `*`.
To change the value that the mutable reference refers to, we have to use the * dereference operator.

```rust
let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50;
}
```

## Slices (`&[T]`)

Slices are a way to piggy-back off an existing allocation.
You don't have to go back to the book keeping system to find a slot in the heap.
A string slice is a _reference_ to part of a String.
A vector slice is a _reference_ to part of a Vector.
They are a view into an underlying array of values and have a type signature `&[T]`.
If a String is updated, so is the view of it.
Slices always _borrow_ their data and never copy it.
You have to explicitly say that you want to create a slice with the `&` operator.
Slices can be created from strings, arrays and vectors.

We create slices using a range within brackets by specifying `[starting_index..ending_index]`.
`starting_index` is the first position in the slice and `ending_index` is one more than the last position in the slice.
The `..` is the range syntax.
Slices are similar to arrays, but their length is known at compile time.
Slices are used more commonly than arrays in order to borrow a section of one.

```rust
// String slice
let s = String::from("hello");
let hello = &s[0..5]; // slices from 0 (incluse) to 5 (exclusize)
hello = &s[..5]; // equivalent to &s[0..5] 
hello = &s[0..]; // equivalent to &s[0..5]
hello = &s[..]; // equivalent to &s[0..5]
// -> "hello"

// Array slice
let a = [1, 2, 3, 4, 5];
let a_slice = &a[1..=3]; // slices from 1 (incluse) to 3 (inclusive)
// -> [2, 3, 4]

// Vector slice
let b = vec![1,2,3];
let b_slice = &nums[0..2];
```

How can you safely access slices at run time?
Instead getting by index, use the slice method `get` which does not panic and returns an "Maybe" (Some or None option).
(Panics are memory safe because they happen before any illegal access to memory.)

## Iterator

An interator is a struct with a next method that may return Some or None.
In the process the iterator itself gets modified, it keeps the state for the iteration (like next index).
The data being iterated over _usually_ is not modified.
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

Rust performs "pull" operations while Javascript performs "push".
Where rust will lazily iterate over an iterator while conditions are met, javascript will loop over an entire array regardless of whether it is still necessary or not.
With iterators rust pulls the value through the list of operations one a time and finally collects them into something at the end.

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
