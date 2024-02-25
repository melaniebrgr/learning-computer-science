# The stack and the heap (the hair and the tortoise)

In an executing program, there is a pointer walking through the code, going line by line.
At some point you need to jump into a function and store data, such as a return address, parameters, and a return value.
There are two places a running program can store data: the stack 🐇 and the heap 🦣.

- 🐇 Think of the stack like a finite memory space but quick.
- 🦣 Think of the heap as a giant memory space but ponderous.

If we know the size a variable is going to be, and that it won't change, it can be stored on the stack.
In fact, values with a known size at compile time are stored entirely on the stack.
Incidentally, this makes copies of the actual values quick; because their size is known they go on the stack.
If a variable can grow in size, it is instead allocated to the heap, where it can do so, and a _pointer_ to the heap address is stored on the stack, as well as a length and capacity so when it needs to be resized is known.
(A reference is a 64-bit system wide number, that is used as an address?)
For everything that gets stored on the heap, something on the stack is pointing to it.
This means that as memory is cleaned from the stack, memory on the heap can be cleaned as well.
There will always be one place on the stack that has ownership.

Stack memory is limited though, and can run out of memoery or stack overflow quickly.
This is commonly observed with recursive calls.

Stack facts:

- All data stored on the stack must have a known, fixed size.
- Data is pushed or popped off the FIFO stack.
- Accessing data in the stack is faster than the heap because you have don't have to follow a pointer to get there or jump around in memory.
- pointer is pushed onto the stack when data is allocated to the heap. The memory allocator must return a pointer to the address a.k.a. a big enough empty spot on the heap.
