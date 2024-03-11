# Methods

Functions used to operation on structured related data are known as methods.
Methods are like functions int hat the are defined with `fn`, take params, have return values, and run code when called.
Methods are unlike functions in that they are defined in the context of a `struct`.

## Impls

All functions defined within an impl block are called associated functions because they’re associated with the type named after the impl.
To define a function in the context of a `struct`, we start with an `impl`
The `impl` or implementation keyword is used to associate a method to a struct.

```rust
struct Person {
    first_name: String,
    last_name: String
}

impl Person {
    fn new(first: &str, name: &str) -> Person {
        Person {
            first_name: first.to_string(),
            last_name: name.to_string()
        }
    }
    fn full_name(&self) -> String {
        format!("{} {}", self.first_name, self.last_name)
    }
}

let p = Person::new("John","Smith");
println!("fullname {}", p.full_name()); // fullname John Smith
```

To use the instance values, methods should take a parameter named self of type Self for their first parameter.
Methods that take multiple parameters should add the extra params to the signature after the self parameter.
Associated functions that don't take `self` are not methods, technically, and cane be called with the `::` syntax.

For example, the following argument types are possible:

- no `self` argument: The method is simply associated, e.g. the `new` "constructor".
- `&self` argument: The method can use the values of the struct, but not change them.
- `&mut self` argument: The method can modify the values.
- `self` argument: The method will consume the value, moving it.

Often when a method is given the same name as a field we want it to only return the value in the field and do nothing else. Methods like this are called getters.
