# Ownership

You can have

- the value
- a reference to a value
- a mutable reference to a value

## Rules of ownership

Each value in Rust has an owner.
There can only be one owner at a time.
One Lord of the Ring.
When the owner goes out of scope, the value will be dropped.
A scope is the range within a program for which a value is valid.
Deallocating resources at the end of an item’s lifetime is called Resource Acquisition Is Initialization (RAII).

In the case of a string literal, since the contents are known at compile time the text is hardcoded right into the final executable and is available for the duration of the program.
On the other hand, with a String type, memory needs to be allocated on the heap in order to support a potentially mutable, growable piece of text.
The memory needs to be requested from the allocator and returned to the allocator when it no longer in use.

When a variable on the heap goes out of scope, the value will be cleaned by dropping it, unless ownership of the data has been moved to another variable.
That is, once the variable that owns the data goes out of scope, memory is automatically returned during program execution by calling `Drop`.
Anything that requires allocation implements `Drop`, and therefore cannot implement `Copy`.

Values that implement the `Copy` trait:

- The Boolean type
- All integer types, e.g. `u32`
- All the floating-point e.g. `f64`
- The character type, `char`
- Tuples if they only contain types that implement Copy

## Move

Assignment of a non-Copy value moves the value from one location to another. Otherwise, Rust would be forced to implicitly do a copy and break its promise to make allocations explicit.
So, the rule of thumb is to prefer to keep references to the original data - to 'borrow' it.
But a reference must not outlive the owner!

When a variable allocated to the heap is reassigned to a new variable, first variable is invalidated.
This is therefore a "move" instead of a shallow copy where the first variable is still valid.
Passing a variable to a function, without explicitly returning it, will also move or copy, just as assignment does.

```rust
fn write_string(text: String) {
    println!("{}", text);
}

fn main() {
    let s = String::from("hello dolly");
    write_string(s);
    write_string(s);
}

// error[E0382]: use of moved value: `s`
//  --> src/main.rs:8:18
//   |
// 6 |     let s = String::from("hello dolly");
//   |         - move occurs because `s` has type `String`, which does not implement the `Copy` trait
// 7 |     write_string(s);
//   |                  - value moved here
// 8 |     write_string(s);
//   |                  ^ value used here after move
//   |
// note: consider changing this parameter type in function `write_string` to borrow instead if owning the value isn't necessary
//  --> src/main.rs:1:23
```

To use the data that was moved to a function either 
1. Make another, separate version of the data.
2. Make the function borrow its argument instead of taking ownership of it, and then copy the data within the function in order to return an owned.

## Reference and borrow

- value, `let x = 5;`
- immutable reference or immutable borrow, `y = &x;`
- mutable reference or mutable borrow, `y = &mut x`

References are explicitly created with `&`.
When passed to a function references are explicitly dereferenced with `*`.
Passing by reference is important when we have a large object and don't want to copy it.
Borrowing is the name given whenever you pass something by reference.

```rust
fn modifies(x: &mut f64) {
    *x += 1.0;
}

fn main() {
    let mut res = 0.0;
    println!("res is {}", res); // res is 0
    modifies(&mut res);
    println!("res is {}", res); // res is 1
    modifies(&mut res);
    println!("res is {}", res); // res is 2
}
```