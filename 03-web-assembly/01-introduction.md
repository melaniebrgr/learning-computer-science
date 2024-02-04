# Web Assembly

Is a way to run code on web pages in languages other than JavaScript (2).

> WebAssembly is a drop-in replacement for asm.js that is more efficient in every way. But it still maps 1:1 with asm.js so it has the same limitations. Since it can only load and store numbers, it needs to call out to JavaScript code to do anything interesting (create DOM nodes, make network connections, etc.) WebAssembly code is still inside the browser sandbox and can only use the browser APIs that JavaScript has access to. (1)

## Applications

> It’s natural and expected to create web apps that use both JavaScript and WebAssembly modules. For example, if you want universal JPEG 2000 support, you no longer have to wait for it to be supported in all browsers. Just cross-compile a decoder to WebAssembly and call it from JavaScript! It should be just as fast as if it were part of the browser itself. This could potentially improve iteration time of the web platform. Browsers can focus on exposing low-level hardware primitives (WebGL, Bluetooth, USB, etc.) and leave the development of higher-level libraries to the community, which can evolve at a faster pace. (1) 