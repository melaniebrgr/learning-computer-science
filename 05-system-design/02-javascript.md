# 02 JavaScript

## Classes

### Static

- **Static members** cannot be directly accessed on instances of the class but on the class itself.
- Static members are evaluated at class evaluation time synchronously and sequentially, so if they refer to each other the reference must precede the referer.
- Static members are not directly accessible using the this keyword from non-static methods, they need to be called with the class name instead.
- **Static fields** are useful for caches, fixed config, or data that doesn't need replicated across instances.
- Static field names can be computed and their values initialised.
- **Static methods** can be useful for utility functions.
- **Static initialisation blocks** are more flexible than fields, e.g. `try...catch` can be used within them.
- Like private members, if the static member is private only the class that defines it can access the field, which can cause unexpected behaviour when calling `this` in subclasses.
