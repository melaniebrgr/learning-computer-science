# (WIP) Rust in JavaScript

## Week 10 project journaling

DevWorld conf in Amsterdam on March 1 was my first "silent disco" conference.
In the main hall, talks were attended by putting on the headphones left on the seat.
One silent disco talk I listened to was on Wasm and serverless.
During the talk the presenter made a pretty compelling case.

How can Rust be used _with_ JavaScript? From Chris Biscardi (1) here are three ways:

1. Embed Rust in a JavaScript package
2. Publish Rust binaries to NPM
3. Compile Rust to wasm

### 1. Embed Rust in a JavaScript program

"NAPI-RS is aiming to provide a complete solution for building Node.js native addons, especially for enterprise users." (2)
Rust code is compiled to native binaries, and NAPI-rs provides the bindings for calling out to the native code from a Node application including the generation of `.d.ts` files, using the `#[napi]` macro. If I understood everything correctly, that is.
The advantage of doing this is to get a more performant Node.js application (3).
Using NAPI-rs incurs a maintainance burden at build time, but not a runtime burden.

### 2. Publish Rust binaries to NPM

This is not so much a way to use Rust within a JavaScript program so much as _on_ one.
In situations where you have a tool built in Rust (or other) that is intended for use primarily by the broader, you may want to distribute that package where it can be conveniently used by the broadest audience: NPM.

Paraphrasing from a blog post (5), the main idea is that binaries are built for different architectures and distributed with NPM. Each NPM package is  responsible for wrapping the target-specific binary and a "base" package is exposed to the end user.

This is what Lefthook does with it's Go code, for example (4). It uses bin path in package.json to lookup the executable depending on the OS and arch. Library creators need to publish multiple optional packages for each target. It's seems a bit tedious and not entirely straighforward.

At the DevWorld conveference Ryan Dahl announced the release of [JSR](https://jsr.io/), a "superset" of the node package resgistry NPM. It will be interesting to see if binaries can be published in a similar fasion there.

### 3. Compile Rust to wasm

Browsers and Node support wasm.
Compiling to wasm is built into the rust compiler, that can be optimised with wasm-opt.
Wasm-bindgen provides the bindings for using wasm in JS.
Rust language mentioned as great compilation to wasm story.
Check out projects: trunk, web-sys

## Stupid questions

1. Where all can I run wasm?
1. Why is Rust apparently popular for generating webassembly?
1. Is Figma using WebAssembly, and how?
1. Is Photoshop-in-the-browser using WebAssembly, and how?

## References

1. These three ways of using Wasm come Rust in JavaScript are mentioned in, "[Why is the JavaScript ecosystem switching to Rust?](https://www.youtube.com/watch?v=dZQMoEWe5uY)".
2. [NAPI-RS](https://napi.rs/)
3. [Node & Rust: Friendship Forever. The NAPI-rs Way.](https://dev.to/valorsoftware/node-rust-friendship-forever-the-napi-rs-way-1kb8)
4. [Lefthook: The fastest polyglot Git hooks manager out there](https://github.com/evilmartians/lefthook/blob/master/packaging/npm/lefthook/package.json)
5. [Packaging Rust Applications for the NPM Registry](https://blog.orhun.dev/packaging-rust-for-npm/)
