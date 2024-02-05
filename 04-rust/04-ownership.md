# Ownership

## Rules of ownership

Each value in Rust has an owner.
There can only be one owner at a time.
One Lord of the Ring.
When the owner goes out of scope, the value will be dropped.
A scope is the range within a program for which a value is valid.

## The stack and heap

In an executing program, data can be placed on the stack or heap, i.e. there is stack data and heap data.
Values with a known size at compile time are stored entirely on the stack, so copies of the actual values are quick to make. Stack facts:
- All data stored on the stack must have a known, fixed size.
- Data is pushed or popped off the FIFO stack. 
- Accessing data in the stack is faster than the heap because you have don't have to follow a pointer to get there or jump around in memory.
- pointer is pushed onto the stack when data is allocated to the heap. The memory allocator must return a pointer to the address a.k.a. a big enough empty spot on the heap.

In the case of a string literal, since the contents are known at compile time the text is hardcoded right into the final executable.
On the other hand, with a String type, an amount of memory needs to be allocated on the heap, in order to support a mutable, growable piece of text.
The memory needs to be requested from the allocator and returned when it no longer in use.
When a variable that includes data on the heap goes out of scope, the value will be cleaned up by drop unless ownership of the data has been moved to another variable.

Once the variable that owns the data goes out of scope, memory is automatically returned during program execution by calling `Drop`.
Anything that requires allocation or is some form of resource implements a `Drop` and cannot therefore implement `Copy`.
Values that implement the `Copy` trait:
- The Boolean type
- All integer types, e.g. `u32`
- All the floating-point e.g. `f64`
- The character type, `char`
- Tuples, if they only contain types that also implement Copy

Deallocating resources at the end of an item’s lifetime is called Resource Acquisition Is Initialization (RAII).

## Move

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