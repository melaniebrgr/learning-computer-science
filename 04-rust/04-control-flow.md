# Control flow

## if-else

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

## Matching

Matching is based on expressions.
Rust has an extremely powerful control flow construct called match.
It will execute code against a matching pattern.
When used with enums, the match expression runs different code depending on which variant of the enum it has.
Matches can match on enums (like Options), ranges, and plain values.