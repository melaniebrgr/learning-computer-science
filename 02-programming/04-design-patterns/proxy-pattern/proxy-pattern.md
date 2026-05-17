# Proxy pattern

> Generally speaking, a proxy means a stand-in for someone else. Instead of speaking to that person directly, you’ll speak to the proxy person who will represent the person you were trying to reach. 

Instead of clients speaking to the subject directly they speak to a proxy delegate instead. Example proxy delegates:

- **security (firewall) proxy**: Controls access to resources, protecting them from bad clients, e.g. seen with corporate firewalls, load balancers (reverse proxy)
- **remote proxy**: Abstracts network communication so a client can speak to an object as if it were a local resource, but the resource is actually remote.
- **caching proxy**: Temporary storage for expensive operations so that clients can share, reducing compute and network latency, e.g. seen in server reverse proxies for content management systems
- **virtual proxy**: Acts as a surrogate object that is expensive to create, acting in its stead before and while the object is being created.

## In Javascript 

The Proxy is part of the JS standard library. 

> The Proxy object allows you to create an object that can be used in place of the original object, but which may redefine fundamental Object operations like getting, setting, and defining properties. Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs, and so on.

The API is straightforward, pass to Proxy the object to proxy and a handler.
The Proxy takes an object as a target, e.g. object, arrays, functions, another proxy.
The Handlers are where so called "traps" are defined. 
There is a trap for every operation--they trap calls to the target object.
The Reflect API is commonly used to work with the proxied object.
Reflect as the same interface as an object as well.
We can recreate a pure relay for an object, but of course the advantage is overloading existing methods and extending behaviour without modifying the underlying object itself.

> Reflect.set (and friends) is the “canonical function form” of what JavaScript normally does with property access and assignment, including all the weird edge cases around accessors, inheritance, receivers, and return values. Using it in proxies means “do whatever JS would have done if there were no proxy”, which is exactly what you usually want after your custom logic.

The main idea is that in a JS proxy trap, `target[prop] = value;` does not actually reproduce the engine’s full [[Set]] semantics.
Reflect.set also returns a boolean indicating whether the set succeeded, which is exactly what the set trap is supposed to return.

## References

1. https://www.patterns.dev/vanilla/proxy-pattern/
2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
