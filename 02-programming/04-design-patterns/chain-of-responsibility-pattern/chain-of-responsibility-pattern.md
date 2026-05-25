# Chain of responsibility pattern

Used commonly in hanndling HTTP requests, where requests are passed along a chain of handlers.
Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.
If you built a server with request and response, maybe the chain of responsibility pattern was used.


Can be used to build a chain of filters.
In Java/Kotlin system can be used for this.
Similar to decorator pattern in the sense that value if handed off between functions, but decorator is more for layering on logging and monitoring.