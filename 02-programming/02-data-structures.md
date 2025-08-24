# Data structures

There are three flavours of data structures that are useful for collecting data: tuples, lists, and dictionaries. Tuples and lists have in common that they are ordered sequences of objects, e.g. first, second, last. They can be accessed by index or by sequence, e.g. next. Tuples are the simplest. Tupples are immutable while lists are mutable. Mutability, the ability to change object values, is a powerful programming concept but also big source of programming blunders.

Dictionaries or "dicts" are sets of immutable keys and mutable values that are accessed by key. Anything can be a value, and, depending on the language, anything can be a key. Technically a dict can be implemented with a list data structure. However, to find a value all the keys need to be iterated over and the time to find a value would grow with the length of the list. On the other hand, with a dict the time to lookup the value is constant.

## Arrays

Arrays are contiguous memory space. Contiguous means an unbreaking sequence of memory of a certain amount of bytes. It cannot be grown or broken up. How the continuous memory is interpreted depends on the instructions to the compiler, e.g. an array of integers, or an array of strings. So we have zero or more pieces of memory of a specific type in a row.

So, when we access an element of an array with, `array[index]` we are telling the computer to go to the memory addess of A offset by `index * size_of_element` bytes.

An ArrayBuffer is an object that represents a fixed-size sequence of bytes in memory. It provides a standardized API for working with raw memory. ArrayBuffers can not be directly read or written to. Instead, views need to be created to read/write data in ArrayBuffers.

```js
const a = new ArrayBuffer(6);  // Create a buffer of 6 bytes
const a8 = new Uint8Array(a); // Create a view of the buffer as an array of 8-bit unsigned integers

a8[0] = 45; // Write the value 45 to the first element of the view
a8[2] = 45; // Write the value 45 to the third element of the view

const a16 = new Uint16Array(a); // Create a view of the buffer as an array of 16-bit unsigned integers
a16[2] = 0x4545; // Write the value 0x4545 to the third element of the view

a16; // -> Uint16Array(3) [45, 0, 17733]
a8; // -> Uint8Array(6) [45, 0, 45, 0, 69, 69]
```

A `Uint8Array` is an array of 8-bit unsigned integers. 1 bit = the smallest unit of data (0 or 1) and 1 byte = 8 bits. Therefore, 1 byte can represent values from 0 to 255 `(2^8 - 1)`. `Uint8Array` and `Uint16Array` provide different views of the same memory:

Memory bytes:    [45,  0, 45,  0, 69, 69]
                  └─────┘       └─────┘
Uint16Array:      [  45,   0,   17733  ]
                              (0x4545)

- `Uint16Array` sees 0x4545 as one 16-bit value = 17733,
- `Uint8Array` sees the same memory as two separate 8-bit values = 69, 69
