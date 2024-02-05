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

### Struct

In rust the behaviour and the data are defined in seperate block: a struct and an implementation.
Structs hold properties.
A struct is a property layout, and define exactly what is going to be on that item.
They are blueprints.
It has a defined size, that has a certain amount of bytes associated with it.

```rust
fn main() {
    struct Vector {
        x: usize,
        y: usize,
        z: usize
    }

    let point = Vector {
        x: 1,
        y: 2,
        z: 3,
    };
    
    let Vector { x, y, z } = point;

    println!("{}, {}, {}", x, y, z)
}
```

```rust
impl Foo {
    // these are both static methods
    fn this() // available usage within the file
    pub fn this() // available usage within the file

    // you should be able to understand this before the end
    // of the day..
    //
    // and all of this can add pub
    // these are instance methods
    fn this(&self)...
    fn this(&mut self)...

    // public instance methods
    pub fn this(self)...
}
```

### Trait (interface)

A trait is effectively an interface.
A trait is an implementation of a method on that struct.
It allows for composing.