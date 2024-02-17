# Data structures

There are three flavours of data structures that are useful for collecting data: tuples, lists, and dictionaries. Tuples and lists have in common that they are ordered sequences of objects, e.g. first, second, last. They can be accessed by index or by sequence, e.g. next. Tuples are the simplest, and are immutable while lists are mutable. Mutability, the ability to change object values, is a powerful programming concept but also big source of programming blunders.

Dictionaries or "dicts" are sets of immutable keys and mutable values that are accessed by key. Anything can be a value, and, depending on the language, anything can be a key. Technically a dict can be implemented with a list data structure. However, to find a value all the keys need to be iterated over and the time to find a value would grow with the length of the list. On the other hand, with a dict the time to lookup the value is constant.

### Go syntax: arrays, slice, map
```go
// initialize an empty array with default values (it can only contain 5 elements of type float)
var myArray [5]float64

// initialize a filled array
myArray := [5]float64{9, 1.5, 4.5, 7, 8}
myArray := [...]float64{9, 1.5, 4.5, 7, 8}

// looping over an array
for _, value := range myArray {
    fmt.Println(value)
}

// variable length arrays (slices) must be initialized to some length
var mySlice []int = make([]int, 5)

// a maximum length (capacity) can be optionally specified
var mySlice []int = make([]int, 5, 10)

// get array length
len(mySlice) // 5

// get array capacity
cap(mySlice) // 10

// slice a section of another array
splicedFruit := fruitArray[1:3]

// add more elements to a slice
moreFruit := append(splicedFruit, "cherries", "lemon")

```