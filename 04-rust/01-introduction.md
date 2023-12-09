# Introduction

Rust is a curly-braces language with semicolons, C++ style comments and a main function.
Rust is statically typed.
In static types the type is known at compile time, and dynamic types are only known at run time.
Rust is strongly typed in order to make it harder to write incorrect programs.
All memory acces is checked.
Write the best possible machine code with full control of memory use.

> In systems languages, program memory comes in two kinds: the stack and the heap. It is very fast to allocate data on the stack, but the stack is limited; typically of the order of megabytes. The heap can be gigabytes, but allocating is relatively expensive, and such memory must be freed later. In so-called 'managed' languages (like Java, Go and the so-called 'scripting' languages) these details are hidden from you by that convenient municipal utility called the garbage collector. Once the system is sure that data is no longer referenced by other data, it goes back into the pool of available memory.

The downsides of garbage collection? The first is that it is wasteful of memory, which matters in those small embedded microchips which increasingly rule our world. The second is that it will decide, at the worst possible time, that a clean up must happen now.

## Basics

Variable declaration, if-else statements, and operators are somewhat similar to JavaScript, but with fewer brackets.
Immutable and mutable variable declaration with `let` and `mut`.
Variable types are not silently converted but must be cast.
Each operator (like +=) corresponds to a trait.
AddAssign is the name of the trait implementing the += operator.

```rust
fn main() {
    for i in 0..5 {
        let even_odd = if i % 2 == 0 {"even"} else {"odd"};
        println!("{} {}", even_odd, i);
    }
}
```

### Functions

The compiler can work out its types with type inference exception functions.
Functions are one place where the compiler will not work out types, inputs must be typed.
The body of the function has the value of its last expression, just like with if-as-an-expression.
Returns are generally only used for returning early from a function.

```rust
// return value is last 
fn abs(x: f64) -> f64 {
    if x > 0.0 {
        x
    } else {
        -x
    }
}
```

## Arrays

All statically-typed languages have arrays, which are values packed nose to tail in memory.
Array values are arranged next to each other in memory so that they are efficient to access.
Arrays are indexed from zero.
Rust arrays are fixed in size.
Rust knows the size of an array at compile-time.
The type of an array includes its size, i.e. the type of `[10, 20]` would be `[i32; 2]`.
Arrays can only contain one type of data.
Because the type of an array includes its size, arrays are not used that often in Rust.

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

Slices are used more commonly.
Slices are views into an underlying array of values.
You have to explicitly say that you want to pass an array as a slice using the & operator.
When slicing a copy of the data is never made.
Slices all borrow their data from their arrays.

```rust
// read as: slice of i32
fn sum(values: &[i32]) -> i32 {
    let mut res = 0;
    for i in 0..values.len() {
        res += values[i]
    }
    res
}

fn main() {
    let arr = [10,20,30,40];
    // look at that &
    let res = sum(&arr);
    println!("sum {}", res);
}
```

How can you safely access slices at run time?
Instead getting by index, use the slice method `get` which does not panic and returns an "Maybe" Some or None option.
(Panics are memory safe because they happen before any illegal access to memory.)
An Option in a box that may contain a value, or nothing (None).
The Option box can be conditionally unwrapped, `*slice.get(5).unwrap_or(&-1);`.

## Vectors

Vectors are re-sizeable arrays.
Sslice borrow the memory from the vector.
When the vector dies or drops, it lets the memory go.
Vectors compare with each other and with slices by value.
Vectors have a size and a capacity. If you clear a vector, its size becomes zero, but it still retains its old capacity.
You can insert values into a vector at arbitrary positions with insert, and remove with remove.
This is not as efficient as pushing and popping since the values will have to be moved to make room.
Many vector operations are done in place so use clone to copy vectors.

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

## Iterators

`rustc` does a lot of optimizations in order to make it more efficient to iterate over an array or slice.

```rust
fn main() {
    let sum: i32  = (0..5).sum();
    println!("sum was {}", sum);

    let sum: i32 = [0, 1, 2].iter().sum();
    println!("sum was {}", sum);
}
```

## Strings

A system language has to have two kinds of string, allocated dynamically at runtime or static.
Under the hood, String is basically a Vec<u8> and &str is &[u8], but those bytes must represent valid UTF-8 text.
Where u8 is a string of characters.

```rust
fn main() {
    let text = "hello dolly";  // the string slice
    let s = text.to_string();  // it's now an allocated string

    dump(text);
    dump(&s);
}
```

## Referencing or borrowing

References are explicitly passed into functions with `&` and explicitly dereferenced with `*`.
Passing by reference is important when we have a large object and don't want to copy it.
Borrowing is the name given whenever you pass something by reference.

```rust
fn modifies(x: &mut f64) {
    *x += 1.0;
}

fn main() {
    let mut res = 0.0;
    println!("res is {}", res);
    modifies(&mut res);
    println!("res is {}", res);
    modifies(&mut res);
    println!("res is {}", res);
}

// res is 0
// res is 1
// res is 2
```

## Matching

Like a switch statement, I think.
But you can do more, like matching on Some or None, and ranges, instead of just values.

## Misc.

- `::` means much the same as does '.' in other languages - it is a fully qualified name and means "using", e.g. `std::env::args`
- An exclamation mark indicate a macro call. A useful macro is `assert_eq!` that asserts that two things must be equal or panic. Another is `format!` for building up strings.

### Resources

- [Rust gentle introduction](https://stevedonovan.github.io/rust-gentle-intro/readme.html)
  - [x] Basics
  - [ ]Structs, Enums and Matching
  - [ ]Filesystem and Processes
  - [ ]Modules and Cargo
  - [ ]Standard Library Containers
  - [ ]Error Handling
  - [ ]Threads, Networking and Sharing
  - [ ]Object-Oriented Programming
  - [ ] Parsing with Nom
  - [ ]Pain Points