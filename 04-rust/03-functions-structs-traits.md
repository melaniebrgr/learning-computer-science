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

### Trait (interface)

A trait is effectively an interface.
A trait is an implementation of a method on that struct.
It allows for composing.