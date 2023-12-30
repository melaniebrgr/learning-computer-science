# Ownership

## Rules of ownership

Each value in Rust has an owner.
There can only be one owner at a time.
When the owner goes out of scope, the value will be dropped.
A scope is the range within a program for which an item is valid

In Rust, when an argument is passed to a function and it's not explicitly returned, you can't use the original variable anymore, this is called "moving" a variable. To use the data that was moved to a function either 
1. Make another, separate version of the data.
2. Make the function borrow its argument instead of taking ownership of it, and then copy the data within the function in order to return an owned.

## Stack vs. heap

In an executing program data can be placed on the stack or heap.
- Data is pushed or popped off the FIFO stack. All data stored on the stack must have a known, fixed size.
- Data is allocated to the heap and a pointer is returned and pushed onto the stack. The memory allocator must return a pointer to the address a.k.a. a big enough empty spot on the heap.
- Accessing data in the stack is faster than the heap because you have don't have to follow a pointer to get there or jump around in memory.

## String example

In the case of a string literal, since the contents are known at compile time it is hardcoded right into the final executable.
With the String type, an amount of memory needs to be allocated on the heap, in order to support a mutable, growable piece of text.
The memory needs to be requested from the allocator and returned when it no longer used during program run time.
In Rust memory is automatically returned once the variable that owns it goes out of scope. 
Deallocating resources at the end of an item’s lifetime is sometimes called Resource Acquisition Is Initialization (RAII).

```rust
fn write_string(text: String) {
    println!("{}", text);
}

fn main() {
    let s = String::from("hello dolly");
    write_string(s);
    write_string(s);
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