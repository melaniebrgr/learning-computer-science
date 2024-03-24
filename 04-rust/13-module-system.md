# Module system

- modules
  - pub
- paths
- use / as
- crates
- packages
- workspaces

## Modules

Modules are units of organisation, reuse, and privacy.
Modules and use let you control the organization, scope, and privacy of paths.
Related functionality can be grouped in a module, imported elsewhere and access to internals must be explicitely provided.
Module internal are private my default, but can be exposed for external code reuse by making them public.
To sum up, a module wraps functionality and only explicity exposes `pub`lic functionality.

A modules can contain other modules.
Items in a parent module can’t use the private items inside child modules, but items in child modules can use the items in their ancestor modules.
The source code,

```rust
// src/lib.rs
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
        fn seat_at_table() {}
    }
}
```

translates to a module tree where the entire tree is rooted under the implicit module named crate,

```txt
crate
 └── front_of_house
     └── hosting
         ├── add_to_waitlist
         └── seat_at_table
```

### Pub

The pub keywork is used to specific the public access of a value in a module.
Structs have visibility level with their fields, with a default private visibility that can be overridden with the pub modifier.
There are many variations:

- `pub fn function()`: the `pub` modifier to override default visibility
- `pub mod nested`: nested modules can be published
- `pub(in crate::my_mod) fn public_function_in_my_mod()`: the path must be a parent or ancestor module and the function is only visible within that path.
- `pub(self) fn public_function_in_nested()`: only visible within the current module, which is the same as leaving them private
- `pub(super) fn public_function_in_super_mod()`: only visible within the parent module

## Paths

Paths are way of naming an item, such as a struct, function, or module.
Path identifiers are seperated by `::`.
Absolute paths either begin from the crate root, the literal `crate` or with the name of the external crate.
relative paths begin from the current module and use `self` or `super`.

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}
```

## Use, as

The the 'use' and 'as' keywords can be used to bind a full path to a new name, for easier access.
It just creates shortcuts to items to reduce repetition of long paths.
It's useful for not only getting values more conveniently, but also exposing values more conveniently.

```rust
use crate::deeply::nested::{
    my_first_function,
    my_second_function,
    AndATraitType
};

use deeply::nested::function as other_function;
```

```rust
mod delicious_snacks {
    pub use self::fruits::PEAR as fruit;

    mod fruits {
        pub const PEAR: &'static str = "Pear";
    }
}
```

## Crates

A crate is the smallest amount of code that the Rust compiler considers at a time.
A crate can come in one of two forms: a binary crate or a library crate.

**Binary crates** are programs that compile to an executable.
They must have a main function.

**Library crates** don’t compile to an executable, and don’t have a main function.
They define functionality intended to be shared with multiple projects.
Usually speaking about a crate implies a library crate.

Binary and library compilation begins at the crate root.
Cargo passes the crate root files to rustc to build the library or binary.

## Packages

A package is a bundle of one or more crates that provides a set of functionality.
A Cargo.toml gives us a package.
If a package contains src/main.rs and src/lib.rs, it has two crates: a binary and a library, both with the same name as the package.
A package can have multiple binary crates by placing files in the src/bin directory: each file will be a separate binary crate.