# Function

Are defined with the keyword `fn`.
The body of the function has the value of its last expression.
Returns are generally only used for returning early from a function.
Function inputs and outputs _must be_ typed.
(Functions are one place where the compiler will not infer the type.)

```rust
fn abs(x: f64) -> f64 {
    if x > 0.0 {
        x
    } else {
        -x
    }
}
// Last value is return value, e.g. abs(-1.0) -> 1.0
```

## Closure

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

## Trait (interface)

A trait is effectively an interface.
A trait is an implementation of a method on that struct.
It allows for composing.
