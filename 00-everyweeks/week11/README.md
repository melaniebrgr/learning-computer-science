# Rust in JavaScript (JS)

## Week 10 project journaling

The [DevWorld conference](https://devworldconference.com/) in Amsterdam on March 1 was my first "silent disco" conference. To attend talks in the main hall, you put on the headphones left on the seat, which were pretuned to that stages' radio transmission. (I assume but honestly not sure if that was the exact setup.) Anyway, one of the silent disco talks was on WebAssembly (wasm) and serverless, "A Greener, Cost-Effective Cloud with Serverless WebAssembly", by Sohan Maheshwar and he made a compelling case for it (8).

I've been curious about wasm for a long time, but after listening to some talks and reading articles about it, I still haven't been able to wrap my head around it. I think part my problem was is WebAssembly felt overloaded and when people discussed WebAssembly they might be refering to a different aspect of it depending on the context. There's wasm the bytecode itself, wasm the estoric description ("a binary instruction format for a stack-based virtual machine"), and wasm the ongoing project of supporting non-JS code across browsers. Not to mention that surrounding wasm is dizzying number of related projects and tools: WASI, WABT, Wasmer, Wasmtime ... it's a lot.

The lure of building web applications with native-like performance was one of my main motivationss, maybe unintuitively, for learning Rust though. I knew that wasm was being used to create the Figma application—[it made a big spash in the dev world several years ago](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/)—and Rust was coming up a lot as being well-positioned for wasm development. So, for this "everyweek" I wanted to finally pick at the idea for myself.

I started with the initial assumption that porting Rust to wasm was the only way to "use Rust with JS". According to Chris Biscardi (1) there are three ways in fact,

1. embed Rust in a JS package,
2. publish Rust binaries to NPM, and
3. compile Rust to wasm.

### 1. Embed Rust in a JS program

Rust code is compiled to native binaries and [NAPI-RS](https://napi.rs/), "a framework for building pre-compiled Node.js addons in Rust", provides the bindings for calling out to the native code from a Node application. `NAPI_RS` automatically generates `.d.ts` files, using the `#[napi]` macros (if I understand everything correctly). The goal of the project is "to provide a complete solution for building Node.js native addons, especially for enterprise users" (2). The purpose of going this route is to get a more performant Node.js application (3), since using NAPI-rs incurs a maintainance burden at build time, but not a runtime burden.

The project has impressive sponsorship. I'm super curious where and how it might be getting used in production.

### 2. Publish Rust binaries to NPM

This is not so much a way to use Rust _in_ a JS program so much as _on_ one, i.e. you created a tool for the JS ecosystem in Rust and want to distribute it where JS developers are: NPM. Paraphrasing from a blog post (5), the idea is that binaries are built for different architectures and distributed with NPM, and each NPM package is responsible for wrapping the target-specific binary and a "base" package that is exposed to the end user. This is what Lefthook does with it's Go code, for example (4). It uses bin path in `package.json` to lookup the executable depending on the OS and arch. Library creators need to publish multiple optional packages for each target. It's a bit tedious and not always straighforward.

As a side note, at the DevWorld conveference Ryan Dahl announced the release of [JSR](https://jsr.io/), a "superset" of the node package resgistry NPM. It will be interesting to see if binaries can be published in a similar fashion there.

### 3. Compile Rust to Wasm

> "For the third year running, Rust is the most frequently used language for WebAssembly. Rust has always been a good fit for WebAssembly; it is a modern system-level language that has broad popularity (the Stack Overflow revealed it is the most desired language seven years in a row), it also happens to be a popular language for authoring WebAssembly runtimes and platforms." (6)

Why has Rust been repeatedly mentioned as having a great compilation to wasm story? For one, because it "lacks a runtime and no extra bloat like a garbage collector, enabling small `.wasm` sizes." For two, it's relatively easy to do: compiling to wasm is built directly into the rust compiler. The wasm that `rustc` generates can be further optimised with `wasm-opt`. In fact, this is done automatically if you use `wasm-pack` to build the wasm lib. `wasm-pack` seems the recommened way to generat wasm. It "wraps up that WebAssembly file into a module the browser can understand" (7). Lastly, `wasm-bindgen` cargo crate has great support for bridging JS and Rust code.

To get started I followed the instructions on MDN (7):

1. Run `$ cargo new --lib guess-the-pinyin`,
2. updated the TOML file with the lib type (`cdylib`) and dependencies (`wasm-bindgen`),
3. replaced the generated code with some simple Rust code in `lib.rs`,
4. built the wasm file, `wasm-pack build --target web`,
5. created a simple HTML file that loads the JS module that loads the wasm file that `wasm-pack` just generated, and
6. 派对！(pàiduì! a.k.a party!)

Here's the full snippet of input Rust code, modified from the previous "everyweek":

```rust
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    pub fn alert(s: &str);

    pub fn prompt(s: &str) -> String;
}

#[wasm_bindgen]
pub fn main() -> String {
    let pinyin_to_hanzi = HashMap::from([
        ("wǒ".to_string(), "我".to_string()),
        ("nǐ".to_string(), "你".to_string()),
        ("hǎo".to_string(), "好".to_string()),
        ("zài".to_string(), "再".to_string()),
        ("jiàn".to_string(), "见".to_string()),
        ("jiào".to_string(), "叫".to_string()),
        ("lǐ".to_string(), "李".to_string()),
    ]);

    let hanzi_pick = pinyin_to_hanzi.values().nth(0).unwrap();
    let input = prompt(&format!("What is the pinyin for {}?", &hanzi_pick));
    let hanzi_maybe = pinyin_to_hanzi.get(input.trim());
    let you_are_right = "你不错了！👍".to_string();
    let you_are_wrong = "你错了！👎".to_string();
    let result;

    match hanzi_maybe {
        Some(hanzi) => {
            if hanzi == hanzi_pick {
                result = you_are_right;
            } else {
                result = you_are_wrong;
            }
        }
        None => result = you_are_wrong,
    }

    return result;
}
```

and here's the full snippet HTML code using the output wasm module:

```html
<!doctype html>
<html lang="en-US">

<head>
  <meta charset="utf-8" />
</head>

<body>
  <script type="module">
    import init, { main } from "./pkg/guess_the_pinyin.js";
    init().then(() => {
      const result = main();
      document.getElementById("result").textContent = result;
    });
  </script>
  <h1>Week 11</h1>
  <p id="result"></p>
</body>

</html>
```

Yahtzee. It really, actually worked!

![The prompt dialog is triggered from the wasm module](./assets/screenshot-1.png)
![User input is compared to the value in the wasm module and the result is returned](./assets/screenshot-2.png)

In conclusion, yes, compiling Rust to a functional wasm module was a cake walk. Granted it was a toy application, but still. I'm excited to see what else I can write in Rust and run in the browser.

## Q. Stupid questions

1. ✅ How do I even execute wasm in the browser?
1. ⬜️ How is Figma using WebAssembly?
1. ⬜️ What is all that stuff in the JS module `wasm-bindgen` generated?

### How do I even execute wasm in the browser?

Starting from a very basic handwritten `wat` file, a `wasm` file can be generated and loaded by JS.

I created a `hello.wat` file and copied in some basic wat code. Then I generated the `wasm` bytecode file using the `wat2wasm` tool from the WebAssembly Binary Toolkit (`wabt`). Because it's not so obvious for basic JS developers like myself, here are the steps I took to install the `wabt` tools on my Mac:

  1. Git clone the repo [as instructed](https://github.com/WebAssembly/wabt?tab=readme-ov-file#cloning).
  2. Install `cmake` with brew, `$ brew install cmake`, restart the old terminal, and check the installation, `$ cmake --version`.
  3. Build the executable [as instructed](https://github.com/WebAssembly/wabt?tab=readme-ov-file#building-using-cmake-directly-linux-and-macos).
  4. Add the folder to the PATH, e.g. to my `.zshrc` I added `export PATH="/path/to/wabt/build/:$PATH"`, then applied the changes to terminal, `$ source ~/.zshrc` (or you can restart again).
  5. Then running `$ wat2wasm hello.wat` created `hello.wasm`. Great success.

To run `hello.wasm` in the browser, the wasm file needed to be loaded by JS, the JS needed to be bootstrapped by HTML, and the HTML needed served from a server and not just the local filesystem. (The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VSCode extension was nice for this because is has live reloading.)

## References

1. [Why is the JS ecosystem switching to Rust?](https://www.youtube.com/watch?v=dZQMoEWe5uY)
2. [NAPI-RS](https://napi.rs/)
3. [Node & Rust: Friendship Forever. The NAPI-rs Way.](https://dev.to/valorsoftware/node-rust-friendship-forever-the-napi-rs-way-1kb8)
4. [Lefthook: The fastest polyglot Git hooks manager out there](https://github.com/evilmartians/lefthook/blob/master/packaging/npm/lefthook/package.json)
5. [Packaging Rust Applications for the NPM Registry](https://blog.orhun.dev/packaging-rust-for-npm/)
6. [The State of WebAssembly 2023](https://blog.scottlogic.com/2023/10/18/the-state-of-webassembly-2023.html)
7. [Compiling from Rust to WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm)
8. This isn't the talk from DevWorld, but is the same take he gave at another conference, [A Greener, Cost-Effective Cloud with Serverless WebAssembly](https://www.youtube.com/watch?v=QVfKt7aIZO8)
