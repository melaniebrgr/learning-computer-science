# Error handling

The impact of an error depends on the JavaScript runtime environment. An uncaughte exception can crash a single-page application, or terminate a Node.js process.

> The fundamental tools JavaScript gives us for handling errors are the `try...catch` statement, the `throw` keyword and the `Error` object.

The approach is simple:

1. Catch the error
2. Log the error, e.g. to console or a logging service
3. Show the user/client an error message

## Resources

- [On JavaScript Errors](https://www.haydenbleasel.com/blog/on-javascript-errors?utm_source=ECMAScript.news&utm_medium=Weekly+Newsletter&utm_campaign=2025-06-04)