# Ownership

Who owns the value and how long does it live for?
Some languages use garbage collection to manage memory, in others programmers explicitely manage memory.
Rust follows a different strategy, using ownership rules to decide how to manage memory.
This is how we get "automatic memory management", or "garbage collection at the compiler level".

## Rules of ownership

**Each value in Rust has an owner.**
**There can only be one owner at a time**--one Lord of the Ring.
There can be unlimited immutable borrows (references), _or_ only one mutable borrow.
That is, you can read the value as many times as you want _or_ write the value in once place.
If we have an immutable reference to something, we cannot also take a mutable reference in the same scope.

A scope is the range within a program for which a value is valid.
**When the owner goes out of scope, the value will be dropped.**
In rust a scope is created with curly brace blocks.
Deallocating resources at the end of an item’s lifetime is called Resource Acquisition Is Initialization (RAII).
**References must always be valid.**
A reference must not outlive the owner!
A reference's scope starts from where it is introduced and continues through the last time that reference is used.
No dangles! A reference also cannot outlive its value, i.e. no references to empty, or wrong memory.

## Drop

Dropping means releasing memory.
When a variable on the heap goes out of scope the value is cleaned by dropping it, unless ownership of the data has been moved to another variable.
Once the variable that owns the data goes out of scope, memory is automatically returned during program execution by calling `Drop`.
Anything that requires allocation implements `Drop`.

## Copy

Assignment of a non-Copy value moves the value from one location to another.
Otherwise, Rust would be forced to implicitly do a copy and break its promise to make allocations explicit.
Values that implement the `Copy` trait:

- The Boolean type
- All integer types, e.g. `u32`
- All the floating-point e.g. `f64`
- The character type, `char`
- Tuples if they only contain types that implement Copy

## Move

Assignment of a non-copy value moves the value from one location to another. Otherwise, Rust would be forced to implicitly do a copy and break its promise to make allocations explicit.
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

## Reference

Passing by reference is important when we have a large object and don't want to copy it.
Unlike a pointer, a reference is guaranteed to point to a valid value of a particular type for the life of that reference.
Because it does not own it, the value the references points to will not be dropped when the reference stops being used.

Ampersands represent references and they allow you to refer to some value without taking ownership of it.
References are explicitly created with `&`.
Add `&` prefix to a variable on instantiation, or to the parameter type signature if passed to a function.

The opposite of referencing by using `&` is dereferencing, which is accomplished with the dereference operator, `*`.
When passed to a function references are explicitly dereferenced with `*`.
Borrowing is the name given whenever you pass something by reference.

- a value, `let x = 5;`
- an immutable reference or immutable borrow, `y = &x;`
- mutable reference or mutable borrow, `y = &mut x`

If you have a mutable reference to a value, you can have no other references to that value.
A reference’s scope starts from where it is introduced and continues through the last time that reference is used.

```rust
let mut x = 100;
let y = &mut x;
*y += 100;
let z = &mut x; // this is ok because scope of y has ended
*z += 1000;
assert_eq!(x, 1200);
```

## Misc

You can have

- the value
- a reference to a value
- a mutable reference to a value

In the case of a string literal, since the contents are known at compile time the text is hardcoded right into the final executable and is available for the duration of the program.
With a String type, memory needs to be allocated on the heap in order to support a potentially mutable, growable piece of text.
The memory needs to be requested from the allocator and returned to the allocator when it no longer in use.