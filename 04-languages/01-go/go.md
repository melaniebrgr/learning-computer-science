# Go

## Variables and assignments

- string: string
- boolean: bool
- numeric: int8, uint8 (byte), int16, uint16, int32 (rune), uint32, int64, uint64, int, uint, uintptr, float32, float64, complex64, complex128

```go
// variable declaration and assignment
var firstName, lastName string

// variable declaration and assignment
var name string = "Name"
var name = "Name"
name := "Name"
```

### Examples: Variables and assignments

1. [hello world](./go-for-js-devs/01-hello-world.go)
2. [entering and printing your name](./go-for-js-devs/02-entering-and-printing-your-name.go)

## Arrays, slice, map

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

## Control flow

```go
// if statements
num := -1

if num > 0 {
    fmt.Println(quote.Go())
} else {
    fmt.Println(quote.Hello())
}

// if statements with assignment
if err := someFunction(); err != nil {
    fmt.Println(err.Error())
}

// switch statements
var city string = "c"

switch city {
case "a":
    fmt.Println("A")
case "b", "c":
    fmt.Println("B or C")
default:
    fmt.Println("Z")
}

// switch statements with conditionals
var i int = 1

switch {
case 1 != 10:
    fmt.Println("! 10")
    fallthrough
case i > 10:
    fmt.Println("> 10")
case i < 10:
    fmt.Println("< 10")
default:
    fmt.Println("= 10")
}

// for loop
for i := 1; i <= 10; i++ {
    fmt.Println(i)
}

// while loop
i := 1

for i <= 100 {
    fmt.Println(i)
    i++
}

// looping over ranges
sentence := "Today we are going sailing."

for i, letter := range sentence {
    fmt.Println(i, " ", string(letter))
}

// functions
func add(a int, b int) int {
    return a + b
}

func printAge(age int) (ageOfSally int, ageOfBob int) {
    ageOfBob = 21
    ageOfSally = 16
    return
}

func printAges(ages ...int) int {
    return
}
```

### Examples: Control flow

- paying off credit card debt, [problem](https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/mit6_00scs11_ps1/), [solution](./go-for-js-devs/03-paying-off-credit-card-debt.go)
