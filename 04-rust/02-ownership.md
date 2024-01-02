# Ownership

## Rules of ownership

Each value in Rust has an owner.
There can only be one owner at a time.
One Lord of the Ring.
When the owner goes out of scope, the value will be dropped.
A scope is the range within a program for which a value is valid.

## Stack and heap

In an executing program, data can be placed on the stack or heap, i.e. there is stack data and heap data.
Values with a known size at compile time are stored entirely on the stack, so copies of the actual values are quick to make. Stack facts:
- All data stored on the stack must have a known, fixed size.
- Data is pushed or popped off the FIFO stack. 
- Accessing data in the stack is faster than the heap because you have don't have to follow a pointer to get there or jump around in memory.
- pointer is pushed onto the stack when data is allocated to the heap. The memory allocator must return a pointer to the address a.k.a. a big enough empty spot on the heap.

In the case of a string literal, since the contents are known at compile time the text is hardcoded right into the final executable.
On the other hand with a String type, an amount of memory needs to be allocated on the heap, in order to support a mutable, growable piece of text.
The memory needs to be requested from the allocator and returned when it no longer in use.
Once the variable that owns the data goes out of scope, memory is automatically returned during program execution.
Deallocating resources at the end of an item’s lifetime is called Resource Acquisition Is Initialization (RAII).

## Move

You’ve probably heard the terms shallow copy and deep copy.
The concept of copying the pointer, length, and capacity without copying the data probably sounds like making a shallow copy.
But because Rust also invalidates the first variable, instead of being called a shallow copy, it’s known as a move.
Assigning a variable allocated to the heap to a new variable invalidates the first and is called "moving" a variable.
An argument passed to a function without explicitly returning it is called "moving" a variable.

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