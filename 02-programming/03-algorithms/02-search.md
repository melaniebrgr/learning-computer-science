# Search algorithms

The simplest search implementation is to just iterate through the list from the beginning and check each value in turn. This a `LinearSearch` and has a `O(N)`. However, if the array is ordered, it's not necessary to start searching from the beginning. In fact it often allows us to find clever ways to split up the search of the array.

For example, when searching if a value is in an array, we can divide the array by two, check the middle value, determine if larger or smaller, and then divide the left or right side by two until there are no halves left and the value is found. Mathematically it's like going N/2, N/4, N/8 and so on, or N/2^x. To solve for x we do, `log2(N) = x`. Therefore finding the value in an array 4096 elements long takes _12 steps_, `log2(4096) = 12`. This is a `BinarySearch` and has a `O(log n)`.

In the 2 crystal balls problem example (given two crystal balls, how to find the height the ball breaks at), you also technically have a sorted list of `[false, false, false, true, ... ]`. The general strategy is to make sequential jumps and when it breaks, walk back to the last known good point. Jumping by N gives a O(N), whereas jumping by the square root of N gives, O(√N).

## Simple search, O(n)

Walk the data structure checking each value.