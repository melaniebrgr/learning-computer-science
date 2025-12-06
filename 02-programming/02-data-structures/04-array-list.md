## Array list

Uses the array as the fundamental data type instead of a node. array lists have a length and a capacity. The length is the number of values in the array list. The capacity is how much room there is to grow.

Given there is a length, push and pop operations are fast (`O(1)`). You just need to use the length. If the length would exceed the capacity, the array needs to be reallocated to an area with e.g. double the memory capacity. When poping, the data does not actually _need_ to be "zeroed" out.

Queue and deque operations on the otherhand are slower. To queue, each value needs to be shifted down, and to deque each value needs to be shifted up, which is a `O(n)` operation.

With an array list random access at a index is much faster compared to a linked list. With a linked list adding and removing items is faster, particularly at the ends.

---

A Array List is an array with a length and capacity. Values can be pushed into the array with O(1) until the length reaches the capacity. Once capacity is achieved then the array is reallocated in memory

[2, , ]  # length: 1, capactiy: 3, then push(42)
[2,42, ] # length: 2, capactiy: 3 ... OK, then push(1)
[2,42,1] # length: 3, capactiy: 3 ... UH OH, better reallocate

As soon as the push operation excedes the capacity the array needs to be reallocated with a larger capacity.

While push and pop operations from the end of the Array List are fast, queue, dequeue and insertion operations require existing values to be shifted in memory with O(n).

So with an array list you need random access, but not shift and unshift from the front: "efficient random access but slow insertions/deletions at the beginning."

The implementation of a Javascript array is an Array List.