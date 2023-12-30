# Introduction

Rust is a statically typed, curly-braces language with semicolons, C++ style comments and a main function.
(Static types are when types known at compile time, while dynamic types are only known at run time.)
Rust is strongly typed in order to make it harder to write incorrect programs.

In JavaScript we just create things, we don't think about how they're laid out in memory.
In Rust you need to define the blueprint of exactly how things are going to be laid out in memory.

> In systems languages, program memory comes in two kinds: the stack and the heap. It is very fast to allocate data on the stack, but the stack is limited; typically of the order of megabytes. The heap can be gigabytes, but allocating is relatively expensive, and such memory must be freed later. In so-called 'managed' languages (like Java, Go and the so-called 'scripting' languages) these details are hidden from you by that convenient municipal utility called the garbage collector. Once the system is sure that data is no longer referenced by other data, it goes back into the pool of available memory.

The downsides of garbage collection are that it is wasteful of memory, which matters in small embedded microchips that increasingly rule our world. The second is that it will decide, potentially at the worst possible time, that a clean up must happen.

## Variables

Variable declaration, if-else statements, and operators are similar to JavaScript with fewer brackets.
All variables must be initialised.
There are two types of variables, immutable and mutable.
Variables are immutable by default and are declared with `let`, e.g. `let foo = 5;`.
Mutable variables are declared by adding `mut` after the `let`, e.g. `let mut foo = 5;`.
Immutable variables are also declared with `const`, e.g. `const WELCOME: &str = r"Welcome to RUSTLINGS";`
Variables declared with `const` are immutable, can't be used with `mut` with them and must be type annotated.
By convention, `const` variable names are all uppercase with underscores between words.

In rust it is possible to shadow variables.
Shadowing is where a second variable with the same name "overshadows" the first, taking any uses of the variable name to itself.
Shadowing allows you to change types:

```rust
    // The shadowed variable is still immutable
    let file = get_file(args); // Filehandle
    let file = read_file(file); // String
    let file = tokenize(file); // Vec<string>
```

## Types

Every value in rust has a type.
All variables types ust be known at compile time.
Types can usually be infered, but must be specified for `const` and function arguments.
When many types are possible a type annotation must be added, and the compiler will error: "type annotations needed".

There are two data type subsets: scalar and compound.
A scalar type represents a single value.
There are four primary scalar types: integers, floating-point numbers, Booleans, and characters.
Compound types gropu multiple values into one type.
There are two compound types: tuples and arrays.

### Numbers

Integer types have different sizes (8, 16, 32, 64, 128, char) and are signed (`i`) or unsigned (`u`).
For example, `i8` is a signed 8-bit integer and can represent numbers from -128 to 127 (-2^(n - 1) to 2^(n - 1) - 1, where n = 8).
Another example, `u8` is an unsigned 8-bit integer and can represent values from 0 to 255 (0 to 2^(n - 1)).
Number literal types can be denoted with a suffix, and use `_` to make the number more readable, e.g.  `1_000u32`.
Number literal types include: decimal, hex, octal, binary, byte.

There are two floating point primitive: `f32`, `f64`.
The default type is `f64` because on modern CPUs, it’s roughly the same speed as `f32`.

Basic math operations addition, subtraction, multiplication, division, and remainder are supported.
Integer division truncates toward zero to the nearest integer.

### Character

Rust’s `char` type is the language’s most primitive alphabetic type. It is four bytes in size and represents a Unicode Scalar Value. THe Unicode Scalar Values range from U+0000 to U+D7FF and U+E000 to U+10FFFF inclusive. The char literal is specified with single quotes, as opposed to string literals, which use double quotes.

### String

Any system language has two kinds of string, one static and known at compile time, and dynamically allocated at runtime.
Rust is no exception: it has a static string literal (`str`) type, and dynamic capital "S" **S**tring.
Said another way, there is a **S**tring with a pointer, a length and a capacity, and a `str` view into a string.
Under the hood, String is basically a Vec<u8> and &str is &[u8], where those bytes represent valid UTF-8 text. 

```rust
fn main() {
    let text = "hello dolly";  // the string literal
    let s = String::from(text);  // it's now an allocated string
}
```

### Tuple

A tuple is a way of grouping together a number of values with different types into one compound type.
Tuples have a fixed length and once declared, they cannot grow or shrink in size.
Tuples can be accessed by destructuring or using a period (`.`) notation.
Start at 0 when accessing by dot notation.
The tuple without any values is called a unit `()` and represent an empty value or an empty return type.

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;
let five_hundred = tup.0;
```

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

### Vector

Vectors are re-sizeable arrays.
They have a size and a capacity, i.e. if a vector is emptied, its size becomes zero, but it still retains its capacity.
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

`rustc` does a lot of optimizations in order to make it more efficient to iterate over an array or slice.

```rust
fn main() {
    let sum: i32  = (0..5).sum();
    println!("sum was {}", sum);

    let sum: i32 = [0, 1, 2].iter().sum();
    println!("sum was {}", sum);
}
```

### Collection

```rust
for x in &some_array { }

vec![1, 2, 3]
    .iter()
    .map()
    .collect::<Vec<i32>>(); // become a data structure of this type at the end
```

### Function

Are defined with the keyword `fn`.
Functions are one place where the compiler will not work out types with type inference: inputs and outputs must be typed.
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

### Closure

Uses bar instead of parentheses

```typescript
(x) => {
  return x;
};

(x) => x + 1;
```

```rust
|x| {
    return x;
}

|x| x + 1
```

### Class

In rust the behaviour and the data are defined in seperate block: a struct and and implementation.
Struct is a concrete item.
It has a defined size, that has a certain amount of bytes associated with it.

### Struct

Structs hold properties.
A struct is a property layout, exactly what is going to be on that item.

```rust
struct Foo {
    properties ...
    pub properties ...
}

impl Foo {
    // these are both static methods
    fn this() // available usage within the file
    pub fn this() // available usage within the file

    // you should be able to understand this before the end
    // of the day..
    //
    // and all of this can add pub
    // these are instance methods
    fn this(&self)...
    fn this(&mut self)...

    // public instance methods
    pub fn this(self)...
}
```

### Trait (interface)

A trait is effectively an interface.
A trait is an implementation of a method on that struct.
It allows for composing.

## Control flow

### if-else

Same as JavaScript, just drop the parentheses.

```rust
let x = 10;
if x == 10 {
    println!("x is ten!");
} else {
    println!("x is not ten!");
}
```

### Range

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

### While

```rust
while true { }
```

### Matching

Like a switch statement, I think.
But you can do more, like matching on Some or None, and ranges, instead of just values.

## Misc.

- `::` means much the same as does '.' in other languages - it is a fully qualified name and means "using", e.g. `std::env::args`
- An exclamation mark indicate a macro call. A useful macro is `assert_eq!` that asserts that two things must be equal or panic. Another is `format!` for building up strings.