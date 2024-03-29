# Conway's Game of Life

## Week 13 project journaling

I really disliked this Tutorial.
They lost me at `npm init wasm-app www`
There's a bit too much magic here from `wasm-app`.
which scaffolds a website page bundled and served with webpack.
Using webpack is a signal the project is probably outdated.

People new to the project will probably come away with the idea that all this scaffolding, all this boilerplate is necessary.
Or that the complexity is necessary and get discouraged.
But it really doesn't need to be this complicated with this many layers of indirection as weeks 12 project showed.

Credit where but they did include this point in the onboarding docs though

> Note that webpack is not required for working with Rust and WebAssembly, it is just the bundler and development server we've chosen for convenience here. Parcel and Rollup should also support importing WebAssembly as ECMAScript modules. You can also use Rust and WebAssembly without a bundler if you prefer!

If it does bake in best practices, its not obvious what they are, and poor practises are baked in as well.

Launching the app a minute later though.

```bash
npm run start

> create-wasm-app@0.1.0 start
> webpack-dev-server

(node:48817) [DEP0111] DeprecationWarning: Access to process.binding('http_parser') is deprecated.
(Use `node --trace-deprecation ...` to show where the warning was created)
ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /Path/to/wasm-game-of-life/www
node:internal/crypto/hash:68
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
...
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```

(The site "could not be reached")
[Stack Overflow suggested](https://stackoverflow.com/questions/67503242/how-to-fix-node12364-dep0111-deprecationwarning-access-to-process-binding) that it's a Node "version compatibility could be the issue.
Downgrading node js version from 16.8.0 to 14.17.5 resolved my issue."
I deffinitely won't do that though.

I'll see if upgrading helps.
But not a great start. I'm focussion on dev set up and tooling over learning better how Rust and WebAssembly can work together, which was the point of completing a step-by-step tutorial.

### 2. What is a workflow for developing polyglot programs

Made from Rust, WebAssembly, JavaScript, HTML, and CSS.
Start with sane defaults by using a template project, `cargo generate --git https://github.com/rustwasm/wasm-pack-template`

### 3. How to design APIs JS-Wasm APIs

### 4. How to debug WebAssembly modules compiled from Rust

### 5. How to time profile Rust and WebAssembly programs

### 6. How to size profile Rust and WebAssembly programs

to make .wasm binaries smaller and faster to download over the network.

## Stupid questions

- [ ] What other project templates are there that might be useful?
- [ ] Is `wasm-app` recommended to bootstrap projects in general?
- [ ] When was this thing last updated or maintained?
- [ ] Would a good next everyweek be creating a Rust -> Wasm project in 2024 and beyon? (Is it possible to create a more future proof version?)

## References

- [Tutorial: Conway's Game of Life](https://rustwasm.github.io/docs/book/game-of-life/introduction.html)
