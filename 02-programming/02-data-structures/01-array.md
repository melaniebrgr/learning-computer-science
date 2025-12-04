# Arrays

**Arrays are contiguous memory space**. Contiguous means it is an unbreaking sequence of memory of a fixed amount of bytes. A "true array" cannot be grown or broken up.

How the contiguous memory is interpreted depends on the instructions to the compiler, e.g. an array of integers, or an array of strings. When we access an element of an array with, `array[index]` we are telling the computer to go to the memory addess of the array start, offset by the index multiplied by the memory sie of the data type, `index * size_of_element` bytes. In short, we have zero or more pieces of memory in a row, of a specific type.

 Arrays elements

- can't be deleted (only zero'd out),
- can't inserted into (only overwritten), and
- can't be grown (only reallocated).

JS arrays, which permit these operations, and therefore JS arrays are not true arrays. Considering this, true arrays almost seem not like a _real_ data structure but a primitive of computing.

## ArrayBuffer

Node does have something like an array, an **ArrayBuffer**.

An ArrayBuffer is an object that represents a fixed-size sequence of bytes in memory. It provides a standardized API for working with raw memory. ArrayBuffers can not be directly read or written to. Instead, views need to be created to read/write data in ArrayBuffers.

```js
const a = new ArrayBuffer(6);  // Creates a buffer of 6 bytes
const a8 = new Uint8Array(a); // Creates a view of the buffer of an array of 8-bit unsigned integers

a8[0] = 45; // Write the value 45 to the first element of the view
a8[2] = 45; // Write the value 45 to the third element of the view

const a16 = new Uint16Array(a); // Create a view of the buffer as an array of 16-bit unsigned integers
a16[2] = 0x4545; // Write the value 0x4545 to the third element of the view

a16; // -> Uint16Array(3) [45, 0, 17733]
a8; // -> Uint8Array(6) [45, 0, 45, 0, 69, 69]
```

`Uint8Array` and `Uint16Array` provide different views of the same memory:

Uint8Array:     [45,  0, 45,  0, 69, 69]
                  └─────┘      └─────┘
Uint16Array:      [  45,   0,   17733  ]
                              (0x4545)

- `Uint8Array` sees the same memory as two separate 8-bit values = 69, 69
- `Uint16Array` sees 0x4545 as one 16-bit value = 17733

This is illustrative of the difference between an array and a list. Its contiguous memory such that different views or interpretations of it can yield different result values.