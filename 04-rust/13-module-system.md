# Module system

- modules
  - use
  - paths
- crates
- packages
- workspaces

## Modules

Modules and use let you control the organization, scope, and privacy of paths.
Modules are units of organisation, reuse, and privacy.
Related functionality can be grouped in a module, imported elsewhere and access to internals must be explicitely provided.
Module internal are private my default, but can be exposed for external code reuse by making them public.
To sum up, a module wraps functionality and only explicity exposes `pub`lic functionality.

Modules are useful for splitting code in logical units (modules), and manage visibility (public/private).
A modules can contain other modules.
Code within a module is private from its parent modules by default. To make a module public, declare it with pub mod instead of mod.

The source code,

```rust
// src/lib.rs
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}
        fn serve_order() {}
        fn take_payment() {}
    }
}
```

translates to a module tree where the entire tree is rooted under the implicit module named crate,

```txt
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

Items in a parent module can’t use the private items inside child modules, but items in child modules can use the items in their ancestor modules. 

### Use

Within a scope, the `use` keyword creates shortcuts to items to reduce repetition of long paths.
You can bring module paths into scopes and provide new names for them with the 'use' and 'as' keywords.

```rust
mod delicious_snacks {
    pub use self::fruits::PEAR as fruit;
    pub use self::veggies::CUCUMBER as veggie;

    mod fruits {
        pub const PEAR: &'static str = "Pear";
        pub const APPLE: &'static str = "Apple";
    }

    mod veggies {
        pub const CUCUMBER: &'static str = "Cucumber";
        pub const CARROT: &'static str = "Carrot";
    }
}
```

### Paths

Paths are way of naming an item, such as a struct, function, or module.
Path identifiers are seperated by `::`.
Absolute paths either begin from the crate root, the literal `crate`
or with the name of the external crate.
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