# Ownership

- The rules
- Memory operations
- Owner
- Reference
- Dereference
- Misc

Who owns the a heap allocated value and how long does it live for?
A universally acknowledge truth is tha memory requested from the allocator must eventually be returned to the allocator when it no longer in use, or it will leak everywhere.
Some languages use garbage collection to manage memory, in others programmers explicitely manage memory.
Rust follows a different strategy, using ownership rules to decide how to manage memory.
This is how we get "automatic memory management" without memory management errors (use after free and double free), security risks, or garbage collection pauses.
Essentially ownership in Rust refers to "whose responsibility is it to deallocate this memory".
"Moving" in Rust simply means transfering deallocation responsibility from one scope to another.
The "automatic" part is a lie. You as the programmer as still managing the memory within the borrow checkers guardrails.

## The rules

The rules of ownership apply only to heap allocated variables.

**Every value in Rust has an owner.**
Because deallocation happens automatically based on the owners scope, someone must be responsible for or own the value for Rust to know what scope it is in.
A scope is the range within a program for which a value is valid.

**When the owner goes out of scope, the value will be dropped.**
In rust a scope is created with curly brace blocks.
Deallocating resources at the end of an item’s lifetime is called Resource Acquisition Is Initialization (RAII).

**There can only be one owner at a time**--one Lord of the Ring.
If there was more than one owner we could have double free deallocation errors! Bad!
This has implications for mutable and immutable references.
You can read the value as many times as you want _or_ write the value in one place.
There can be unlimited references (immutable borrows), _or_ only one mutable borrow.
If we have an immutable reference to something, we cannot also take a mutable reference in the same scope.

**References must always be valid.**
A reference must not outlive the owner! No dangles!
If a reference could outlive its value we would have no references to empty or wrong memory.
A reference's scope starts from where it is introduced and continues until the last time that reference is used.

## Owner

"This is mine. I will clean it up."

- an owned value, `let x = 5;`
- an immutable reference, `y = &x;`
- a mutable borrow, `y = &mut x`

## Immutable reference (`&`, borrow)

"I want to have access to this thing, but not actually own it. I'm not going to clean it up. I'm only going to look at it and give it back eaxctly like how I got it."

Passing by reference is important when we have a large object and don't want to copy it or muck up the code by returning it.
In Rustland referencing a value is called borrowing.
Unlike a pointer, a reference is guaranteed to point to a valid value of a particular type for the life of that reference.
The value the references points to will not be dropped when the reference goes out of scope because the references does not own it.
References are explicitly created and denoted with `&`.
Add `&` prefix to a variable on instantiation, or to the parameter type signature if passed to a function.

If you have a mutable reference to a value, you can have no other references to that value.
A reference’s scope starts from where it is introduced and continues through the last time that reference is used.

## Mutable reference (`&mut`, mutable borrow)

"I want to have access to this thing, and I want to change it, but not actually own it. When you get it back it's going to look a bit different."

Example, `mutable_years.clear()` while it borrows the reference to the vector from the owner it has elevated permissions to make changes to it. Clear empties out a vec.
Mutable references have additional restrictions though.
Rust prevents you have a reference to a value while an immutable reference to it is out, so that it can not change surprisingly from underneath you.
It's also to prevent race conditions.

- one mutable reference at a time, or
- as many immutable references as you want

## Dereference (`*`)

The opposite of referencing is dereferencing with the dereference operator, `*`.

```rust
let mut x = 100;
let y = &mut x;
*y += 100;
let z = &mut x; // this is ok because scope of y has ended
*z += 1000;
assert_eq!(x, 1200);
```

## Memory operations

### Drop

Dropping means releasing memory.
When a variable on the heap goes out of scope the value is cleaned by dropping it, unless ownership of the data has been moved to another variable.
Once the variable that owns the data goes out of scope, memory is automatically returned during program execution by calling `Drop`.
Anything that requires allocation implements `Drop`.

### Copy

Assignment of a non-Copy value moves the value from one location to another.
Otherwise, Rust would be forced to implicitly do a copy and break its promise to make allocations explicit.
Values that implement the `Copy` trait:

- The Boolean type
- All integer types, e.g. `u32`
- All the floating-point e.g. `f64`
- The character type, `char`
- Tuples if they only contain types that implement Copy

### Move

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

## Misc

In the case of a string literal, since the contents are known at compile time the text is hardcoded right into the final executable and is available for the duration of the program.
