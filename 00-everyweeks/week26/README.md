# Iterators, Generators their async versions and fucking Streams

## Week 26 project journaling

### Iterators

Anything that implements the "iterable protocol", which is the spec for the "shape" of an iterator if you like, can be iterated over.
This means that it can be looped over in a `for...of` loop.
The iterable protocol specifies that to be iterable, the object must have a method with key, `Symbol.iterator`.
The iterator method must also

- not take parameters
- return an object
- return an object with at least a value and done properties
- the `value` property is the value
- the `done` property is whether there is another value

The special iterator method that returns the special iterator with a next method that returns the special iterator object is what makes the type an iterable:
`iterable[Symbol.iterator]() -> iterator.next() -> { value, done }`
(Objects all the way down.)
A next method is not the only method an iterable may return.
If a return method is implemented, this will get called if the consumer exits the `for...of` loop early with a `break` or `return`.

Some native JavaScript types implement an iterator method out-of-the-box:

- Arrays
- Strings
- Sets
- Maps
- TypedArrays, e.g. Uint8Array, Float32Array
- NodeLists

To repeat, these JavaScript types are iterable because they implement a method `Symbol.iterator` properly so that it returns an iterator.

To see this in action, you could invoke the iterator method on the object directly to get the iterator, and call the next method sequentially.
Notes that this is essentially what `for...of` is doing under the hood.
`for...of` is calling the iterator's next method until the `done` property is `true`.

If you don't feel like coding iterators by hand, generators are syntatic sugar for iterator creation.
This is typically how people write them.
There are some differences between hand-rolled iterators and those created from generators.
One is what happens during to early exit from a `for...of` loop.
In the case of a hand-rolled iterable the iterator without a return method, the iterator is not finished yet and if it is used in a second loop it will continue from where the first one left off.
On the other hand generators implement a return() method, which causes the generator function to early return when the loop exits.
This makes generators not reusable between loops.

### AsyncIterators

Synchronous iterators return an object on calling `next`.
Asynchronous iterators return a promise that resolve to an object.

This means that async iterables iterate over promises.
That is, the next method of an AsyncIterator returns "a promise fulfilling to an iterator result object" a.k.a the usual `{ value: any, done: boolean }` object:
`iterable[Symbol.asyncIterator]() -> iterator.next() -> Promise<{ value, done }>`

They can be looped over like iterators but in a `for await...of` loop.
the `for await...of` loop will wait for each promise it receives to resolve before moving on to the next promise.
Like `Symbol.Iterator`, `Symbol.asyncIterator` can be added manually to an object.

While there are quite a few examples of JavaScript types that are iterable, there are none that are async iterable (unless you count was is returned from async generator functions).
The web APIs have some built in however, like the `ReadableStream`.
