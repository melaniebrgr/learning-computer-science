# Chain of responsibility pattern

A common example is the handling HTTP requests, where requests are passed along a chain of handlers.
Upon receiving the request, each handler decides either to process the request or to pass it to the next handler in the chain.

This pattern can be used to build a chain of filters.
It's similar to decorator pattern in the sense that a value if handed off between functions, but Decorator is more for layering on logging and monitoring functionality.