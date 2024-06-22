# Iterators, Generators their async versions and fucking Streams

## Week 26 project journaling

Anything that implements the "iterable protocol", a spec for the shape of an iterator, can be looped over in a `for...of` loop
The iterable protocol says the object must have a method with key `Symbol.iterator`
The iterator method must

- not take parameters
- return an object
- the returned object must have at least a value and done properties
- the value is the value
- done is whether there is another value

They are called iterables because they have this special iterator method.
Some JavaScript types implement an iterator method out-of-the-box:

- Arrays
- Strings
- Sets
- Maps
- TypedArrays (e.g., Uint8Array, Float32Array)
- NodeLists

These JavaScript types are iterable because they implement a method, `Symbol.iterator`, that returns an iterator object.
You could invoke the method on the object directly to get the iterator, and call the next method sequentially.
This is essentially what `for...of` is doing under the hood: calling the iterator's next method until the `done` property is `true`.

If you don't feel like coding iterators by hand, generators are syntatic sugar for iterator creation.