# Control flow

## If/else

Same as JavaScript, just drop the parentheses.
Every arm of an `if` expression has to return the same type of value.
Make sure the type is consistent across all arms.

```rust
let x = 10;
if x == 10 {
    println!("x is ten!");
} else {
    println!("x is not ten!");
}
```

## Ternary

Kinda? Just use if/else

```rust
if condition { true_branch } else { false_branch }
```

## Matching

Rust has an extremely powerful control flow construct called match.
It will execute code against a matching pattern.
Matching is based on expressions.
Matches can match on enums (like Options), ranges, and plain values.
When used with enums, the match expression runs different code depending on which variant of the enum it has.

```rust
let foo = OptionalI32::AnI32(1);
match foo {
    OptionalI32::AnI32(n) => println!("it’s an i32: {}", n),
    OptionalI32::Nothing  => println!("it’s nothing!"),
}
```

```rust
struct FooBar { x: i32, y: OptionalI32 }
let bar = FooBar { x: 15, y: OptionalI32::AnI32(32) };

match bar {
    FooBar { x: 0, y: OptionalI32::AnI32(0) } =>
        println!("The numbers are zero!"),
    FooBar { x: n, y: OptionalI32::AnI32(m) } if n == m =>
        println!("The numbers are the same"),
    FooBar { x: n, y: OptionalI32::AnI32(m) } =>
        println!("Different numbers: {} {}", n, m),
    FooBar { x: _, y: OptionalI32::Nothing } =>
        println!("The second number is Nothing!"),
}
```
