### Arrays

Arrays are values packed nose to tail in memory, so that they are efficient to access.
Arrays are indexed from zero.
Arrays can only contain one type of data, `let a: [i32; 5] = [1, 2, 3, 4, 5];`.
An array can be initialised to contain the same value for each element by specifying the initial value, followed by a semicolon, e.g. `let a = [3; 5]; // [3, 3, 3, 3, 3]`.

The type of an array includes its size, i.e. the type of `[10, 20]` would be `[i32; 2]`.
That is, Rust arrays are fixed in size, and the size of an array is known at compile-time.
Because the type of an array includes its size, they are not used that often.
Arrays are useful when you want your data allocated on the stack rather than the heap.

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

Rust checks that any index lookup is within the range of the array at runtime and exits if not.
In orther languages when you provide an incorrect index, invalid memory can be accessed.

### Vector

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

### Iterator

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

### Collection

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

### Slice

Slices are views into an underlying array of values and are used more commonly than arrays.
You have to explicitly say that you want to create a slice with the `&` operator.
Slices all _borrow_ their data, a copy is never made.
Slices can be created from strings and arrays

```rust
// String slice
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];

// Array slice
let a = [1, 2, 3, 4, 5];
let nice_slice = &a[1..=3];
```

How can you safely access slices at run time?
Instead getting by index, use the slice method `get` which does not panic and returns an "Maybe" Some or None option.
(Panics are memory safe because they happen before any illegal access to memory.)
An Option is a box that may contain a value, or nothing (None).
The Option box can be conditionally unwrapped, `*slice.get(5).unwrap_or(&-1);`.