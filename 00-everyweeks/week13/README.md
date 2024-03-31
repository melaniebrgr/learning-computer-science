# I did not survive Conway's Game of Life

## Week 13 project journaling

This week I wanted to follow a tutorial for building a WebAssembly app with Rust. I thought if I followed a blessed path I would be able to grok project structure and Rustlang best practises. After completing the first, implemetation section of the tutorial, I'm not confident that I did, and I certainly do not feel empowered to build my own anything.

The [tutorial](https://rustwasm.github.io/docs/book/game-of-life/testing.html) starts off by instructing you to use a template project, `cargo generate --git https://github.com/rustwasm/wasm-pack-template` in order to "start with sane defaults". While you are at least walked through what's inside the repo afterward, I would have prefered to have been guided more deliberatly on project setup. Is it really so complicate that we need to use a template everytime we want to create a Rust-Wasm project? I don't thinks so. I also dislike "needing" to use a template on principle, so there's that.

The next step sunk my opinion of the tutorial even further. To set up the web application side, you run the command, `npm init wasm-app www`, which scaffolds a website page bundled and served with webpack. There was so much magic here, and the explanations were sparser. People new to the project will probably come away with the idea that all this scaffolding, all this boilerplate is necessary, but it really doesn't need to be this complicated with this many layers of indirection, as weeks 12 project showed me, at least. Also webpack. I have a huge amount of respect for webpack, but you do not start a toy project with Webpack in 2024. So now I have a fair signal that project is likely outdated.

...(next day)...

Ok, so I made have a had a slight overations to Webpack that was unfair. Later from the docs:

> Note that webpack is not required for working with Rust and WebAssembly, it is just the bundler and development server we've chosen for convenience here. Parcel and Rollup should also support importing WebAssembly as ECMAScript modules. You can also use Rust and WebAssembly without a bundler if you prefer!

Ok, letting Webpack go, at least the setup should be bullet proof given the automatic boilerplate generation...


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

Welp. Ok, so if this tutorial bakes in best practices, possibly some worst practises are baked in as well. The tech landscape can change sufficiently that tutorials very quickly fall out of date. This is officially not going well now though, since I'm focussion on dev set up instead of Rust + WebAssembly. [Stack Overflow suggested](https://stackoverflow.com/questions/67503242/how-to-fix-node12364-dep0111-deprecationwarning-access-to-process-binding) that Node version compatibility could be the issue: "Downgrading node js version from 16.8.0 to 14.17.5 resolved my issue." I deffinitely won't be doing do that though.

...(next day)...

After running `npm upgrade` the application server spun up happily. Moving on.

> As a general rule of thumb, a good JavaScript↔WebAssembly interface design is often one where large, long-lived data structures are implemented as Rust types that live in the WebAssembly linear memory, and are exposed to JavaScript as opaque handles.

This is interesting. I think it means that ideally we should communicate between JS and Wasm through the shared memory? So, to make computations in WebAssembly efficient we should also model the problem in terms of linear memory space?

...(hours later)...

The implementation sunk me into a depression. It hit hard that there is still a lot of Rust concepts I don't understand.

- traits: Ok, I haven't learned about traits yet, so that's on me.
- `?`: no clue what this is doing
- `(0..width * height).map`: Is this mapping over a tuple?
- `otherwise`: no clue what what this is matching or the consequence or returning whatever otherwise is
- `[self.width - 1, 0, 1].iter().cloned()`: Why is cloning? Is it necessary?
- `as u8`: I did not know you can cast types. It's not as frowned upon as casting types in TypeScript, I assume?
- `memory`: It's fascinating that I can access wasm memory, but I really can't yet appreciate the implications of it yet, or how to consider it was designing wasm-JS interfaces.

I'm doomed. My previous weeks' optimism is cratering. What if I never get this? Is the learning curve just too high, expecially not having a CS background?

...(hours later)...

I decided to go back to learning Rust and only Rust. Trying to add on wasm is a bridge too far for me, when there a still language fundamentals I really should know. Maybe a well-structure Rust tutorial would be a better fit, so I can see how to correctly apply Rustlang features to a problem.

## References

- [Tutorial: Conway's Game of Life](https://rustwasm.github.io/docs/book/game-of-life/introduction.html)
