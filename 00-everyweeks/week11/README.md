# Rust in JavaScript (JS)

## Week 10 project journaling

DevWorld conf in Amsterdam on March 1 was my first "silent disco" conference.
In the main hall, talks were attended by putting on the headphones left on the seat.
One silent disco talk I listened to was on Wasm and serverless.
During the talk the presenter made a pretty compelling case.

How can Rust be used _with_ JS? From Chris Biscardi (1) here are three ways:

1. Embed Rust in a JS package
2. Publish Rust binaries to NPM
3. Compile Rust to wasm

### 1. Embed Rust in a JS program

"NAPI-RS is aiming to provide a complete solution for building Node.js native addons, especially for enterprise users." (2)
Rust code is compiled to native binaries, and NAPI-rs provides the bindings for calling out to the native code from a Node application including the generation of `.d.ts` files, using the `#[napi]` macro. If I understood everything correctly, that is.
The advantage of doing this is to get a more performant Node.js application (3).
Using NAPI-rs incurs a maintainance burden at build time, but not a runtime burden.

### 2. Publish Rust binaries to NPM

This is not so much a way to use Rust within a JS program so much as _on_ one.
In situations where you have a tool built in Rust (or other) that is intended for use primarily by the broader, you may want to distribute that package where it can be conveniently used by the broadest audience: NPM.

Paraphrasing from a blog post (5), the main idea is that binaries are built for different architectures and distributed with NPM. Each NPM package is  responsible for wrapping the target-specific binary and a "base" package is exposed to the end user.

This is what Lefthook does with it's Go code, for example (4). It uses bin path in package.json to lookup the executable depending on the OS and arch. Library creators need to publish multiple optional packages for each target. It's seems a bit tedious and not entirely straighforward.

At the DevWorld conveference Ryan Dahl announced the release of [JSR](https://jsr.io/), a "superset" of the node package resgistry NPM. It will be interesting to see if binaries can be published in a similar fasion there.

### 3. Compile Rust to Wasm

The Rust language has repeatedly been mentioned as great compilation to wasm story.
One reason Rust is a popular language to compile to wasm is that it, "lacks a runtime, enabling small .wasm sizes because there is no extra bloat included like a garbage collector."
Compiling to wasm is built into the rust compiler, that can be optimised with wasm-opt.
Wasm-bindgen provides the bindings for using wasm in JS.

## Stupid questions

1. Can I even execute wasm in the browser?

Yes, starting from a very basic handwritten `wat` file, a `wasm` file can be generated and loaded by JS.
I wrote the simpled `hello.wat` file, and generated the bytecode `wasm` file using the `wat2wasm` tool from the WebAssembly Binary Toolkit (wabt).
Because it's probably not so obvious for basic JS developers like me, here are the exact steps to install `wabt` tools on MacOS 14.4:

  1. Git clone the repo [as instructed](https://github.com/WebAssembly/wabt?tab=readme-ov-file#cloning).
  2. Install `cmake` with brew, `$ brew install cmake`, and restart the old terminal to check the installation, `$ cmake --version`.
  3. Build the executable [as instructed](https://github.com/WebAssembly/wabt?tab=readme-ov-file#building-using-cmake-directly-linux-and-macos).
  4. Add the folder to your PATH, e.g. to my `.zshrc` I added `export PATH="/path/to/wabt/build/:$PATH"`, then applied the changes to terminal, `$ source ~/.zshrc ` (or you can restart again).
  5. Then `$ wat2wasm hello.wat` created `wat2wasm hello.wasm`. Great success.

To run `hello.wasm` in the browser, The wasm file needed to be loaded by JS, which needed to be bootstrapped by HTML, which needed served from a server and not just the local filesystem. The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VSCode extension is nice for this because is does live reloading.

1. Why is Rust such a popular language for using for WebAssembly?

"For the third year running, Rust is the most frequently used language for WebAssembly. Rust has always been a good fit for WebAssembly; it is a modern system-level language that has broad popularity (the Stack Overflow revealed it is the most desired language seven years in a row), it also happens to be a popular language for authoring WebAssembly runtimes and platforms." (6)

1. How is Figma using WebAssembly?
1. How is Photoshop-in-the-browser using WebAssembly?
1. What are these related projects I hear about, trunk, web-sys?

## References

1. [Why is the JS ecosystem switching to Rust?](https://www.youtube.com/watch?v=dZQMoEWe5uY)
2. [NAPI-RS](https://napi.rs/)
3. [Node & Rust: Friendship Forever. The NAPI-rs Way.](https://dev.to/valorsoftware/node-rust-friendship-forever-the-napi-rs-way-1kb8)
4. [Lefthook: The fastest polyglot Git hooks manager out there](https://github.com/evilmartians/lefthook/blob/master/packaging/npm/lefthook/package.json)
5. [Packaging Rust Applications for the NPM Registry](https://blog.orhun.dev/packaging-rust-for-npm/)
6. [The State of WebAssembly 2023](https://blog.scottlogic.com/2023/10/18/the-state-of-webassembly-2023.html)
