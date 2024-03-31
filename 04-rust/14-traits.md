# Traits

"A reusable deffinition for implementations to ensure consistent behaviour."
Traits do _not_ specify a common method behaviour like classic OOP but the common method signatures.
Use they when you have e.g. different structs that you want to have a common interface.
After defining a trait you can then implement that trait _for_ a type.

A trait can have a default implementation as well that gets overidden by the specific implementation.
Trait methods can call other trait methods.
functions signatures can be typed to take values that implement specific trait interfaces.
functions signatures can be typed to return values that implement specific trait interfaces.
The composition potential is substantial.

Note that Traits can only be used "if they are in view" in the module, i.e. imported.
It can be thought of as "localised monkey patching".

```rust
```
