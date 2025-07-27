# Error handling

The impact of an error depends on the JavaScript runtime environment. An uncaughte exception can crash a single-page application, or terminate a Node.js process. In JavaScript, errors propagate through the call stack until they’re either caught by a try/catch block or reach the global scope. This is called "bubbling". This bubbling mechanism can be both useful and risky. On one hand, it allows you to catch errors centrally, letting outer layers handle error management—such as displaying user-friendly messages or logging detailed stack traces. On the other hand, an uncaught error means it can propagate further than intended, potentially reaching users or crashing critical systems.

## Implementation

The general pattern:

1. Catch the error
2. Log the error, e.g. to console or a logging service
3. Show the user/client an error message

> The fundamental tools JavaScript gives us for handling errors are the `try...catch` statement, the `throw` keyword and the `Error` object.

JavaScript lets you throw anything. Not just Error objects – you can throw a string, a number, an object, you name it. As a result, a catch (err) in JS has to be prepared for anything – an Error, a string, even undefined. TypeScript requires that a caught error be typed as any or unknown because it can’t know the type of thrown errors ahead of time. However, it’s generally considered bad practice to throw non-Error values, since throwing plain strings means no stack trace or no consistent message.

### Options

1. Just use `try...catch` and an adapter. It's the developer's responsibility to ensure that the error is properly handled and transformed into a user-friendly message.
2. Use a library like `neverthrow`, which provides a Rust-inspired Result type for TypeScript. The function always returns an object with a value or error. Error handling is enforced.
3. Effect is a full-fledged functional effect system for TypeScript, the key idea with Effect is that your computations become descriptions of what to do, including how to handle errors, and the library’s runtime ensures that errors are tracked and handled in a principled way. Because the error type is in the signature, the TypeScript compiler knows exactly which errors can happen and will make you handle them. It's closer to adopting a “new programming language” inside TypeScript than just npm installing a library.

## Resources

- [On JavaScript Errors](https://www.haydenbleasel.com/blog/on-javascript-errors?utm_source=ECMAScript.news&utm_medium=Weekly+Newsletter&utm_campaign=2025-06-04)
