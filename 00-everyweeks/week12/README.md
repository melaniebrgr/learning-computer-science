# Guess-the-pinyin (feat Rustlings)

## Week 12 project journaling

The goal for this week is simply to elaborate the guess-the-pinyin app.
For every tutorial, rustling or chapter of the Rust book I read I will find someway of incorporating that new knowledge into the app.
I will also complete the list of backlogged features I imagined for the app.
The app should be still be compilable to wasm at the end of the week, and this time I will deploy it somewhere.

Random numbers vs. WebAssembly

> WebAssembly support
>This crate fully supports the wasm32-wasi and wasm32-unknown-emscripten targets. However, the wasm32-unknown-unknown target (i.e. the target used by wasm-pack) is not automatically supported since, from the target name alone, we cannot deduce which JavaScript interface is in use (or if JavaScript is available at all).
>
>Instead, if the js Cargo feature is enabled, this crate will assume that you are building for an environment containing JavaScript, and will call the appropriate methods. Both web browser (main window and Web Workers) and Node.js environments are supported, invoking the methods described above using the wasm-bindgen toolchain.
>
>This can be done even if getrandom is not a direct dependency. Cargo allows crates to enable features for indirect dependencies.
>
>This feature should only be enabled for binary, test, or benchmark crates. Library crates should generally not enable this feature, leaving such a decision to users of their library. Also, libraries should not introduce their own js features just to enable getrandom’s js feature.
>
>This feature has no effect on targets other than wasm32-unknown-unknown.

`<script type="module">`
import and export statements can only be used inside modules
"SyntaxError: import declarations may only appear at top level of a module"

### Stupid questions

- [ ] What does `cdylib` do?
- [ ] What does `wasm-bindgen` do?
- [ ] Why is `extern "C"` used to import functions from browser-land?
- [ ] Can I add a build script to `cargo.toml` like I would `package.json`?
- [ ] How can I debug wasm _well_?
- [ ] How can I deploy a web app?
- [ ] Can I compile to wasm on save?
