# Array List

An array with a capacity. You can push values into the array as long as the subsequent length doesn't exceed the capacity. For example

const arr = [2, , ] # length: 1, capactiy: 3
arr.push(42) # [2,42, ], length: 2, capactiy: 3 ... OK

As long as the push operation is within the cpacity of the array, it's O(1). As soon as the push operation excedes the capacity