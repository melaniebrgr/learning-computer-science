# Introduction to computer science and programming

- MIT 6.00SC Unit 1,
- Front-End Masters "Go for JavaScript Developers"

> “The computer will always do exactly what you tell them to do.”

There are two kinds of knowledge: declarative and imperative. **Declarative knowledge** is a statement about something that is true, e.g. a chocolate cake is bad for you. While it doesn’t tell you how to do it, it does tell you about how to test correctness. **Imperative knowledge** tells you how to do something, e.g. how to make the chocolate cake. Another example of imperative knowledge is Heron’s method of finding the square root of a number. Heron proposed a formula that could be repeated iteratively until it converged on the value of the square root. Hero is a greek experimenter who lived in Alexandria in 50 AD.

### Fixed and stored programs

The initial computers were designed to do very specific things, like computing the square root of a number. These are called **“fixed program computers”**. An example of this is Alan Turing’s enigma code breaker. In a **“stored program computer”** the instructions are the same as data. Once it was possible machines became infinitely flexible. An “interpreter” is a program that can execute any legal set of instructions.

<img width="278" alt="CONTROL" src="https://user-images.githubusercontent.com/3966076/193446505-27616bb7-9e0c-4b38-acea-cf980a6f3ddd.png">

In a fixed program computer the program and data are kept in the memory (and there's lots of it today). The control unit tells the memory what to do. The arithmetic logic unit does the computations that get stored in the accumulator. The input and output take in and display the accumulated result to the user.

Alan Turing showed that there were six primitive instructions with which you could write all programs. These instructions operated on one bit of information. A programming language provides a set of primitive instructions and control structures. That’s all. All programming language boil down to this: primitive instructions, control flow structures, and how they are combined. A programming language's **syntax** determines whether a string is legal, **static semantics** determine whether the string has meaning, and **semantics** assigns a meaning to a legal sentence.

Interpreted languages give errors in the language of the source code (that you wrote in), whereas compiled languages give errors in the compiled object code, which is harder to debug. However, compiled languages tend to be more efficient.

### Go syntax: variables and assignments
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

#### Examples
1. [hello world](./01-hello.go)
2. [entering and printing your name](./02-entering-and-printing-your-name.go)

### Types of algorithms

An algorithm contains imperative steps on how to perform a computation until it “converges” (a fancy way to say that it’s halted). The recipe of an algorithm:
- it converges,
- has instructions and flow controls, and
- a termination of control.

Assuming no static semantic errors, there are three types of errors a program can have:
- it crashes
- it never terminates
- it gives an incorrect result (the worst possible outcome)

How do we know if **looping program**, e.g. a "for" loop or a "while" loop, will terminate? A looping function that has all the following features will always terminate:
1. it maps a set of program variables to an integer,
2. it starts with a non-negative value,
3. a value is decreased on each iteration
4. the loop terminates when it reaches 0 

This is a **decrementing function**. A decrementing function guarantees to stop a loop execution. It can be a useful pattern for "searching for a solution". The solution must be within the search space of the looping program however, or the program will run forever. When writing a loop, think carefully about the conditions for termination mentioned above. Loops can be used for exhaustive enumeration.

**Exhaustive enumeration** or "guess and check" is a type of algorithm. The guessing is not actually random, the space of possible answers is exhausted systematically. A program that relies on this is called a **brute force algorithm**, and despite its name it is often the correct way to solve a problem because today's computers are _fast_. There are however some circumstances under which a brute force algorithm will start to take too long.

### Go syntax: if, switch, looping, functions
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
#### Examples
3. paying off credit card debt, [problem](https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/mit6_00scs11_ps1/), [solution](./03-paying-off-credit-card-debt.go)

### Speeding up algorithms

Can we figure out how long an algorithm will take to run (algorithmic analysis)? Yes, we can look at what the run time depends on:
- desired answer precision
- how big the steps are that we take through the algorithm are

We can change both of these levers to adjust the run speed. Taking bigger steps allows us to more rapidly cut through the search space. One algorithmic technique to change the step size is called, "**bisection search**", where the step is half the search space. With algorithmic analysis we can actually know how long a computation will take to run, which permits us to decide if it's worth the time.

Most of the time we want to make the code shorter, not longer. Afterall, the more code we have, the harder it is to get it to work. Therefore, we measure productivity in terms of the amount of functionality introduced with _less_ code, rather than the number of lines written. Goor programmers "write less code". When a computation in a program needs to be repeated many times, we can use introduce a language mechanism that provides decomposition and abstraction in order to reuse that computation.
- decomposition: creates structure, by allowing us to break our program into modules (functions, classes, etc.), that are self-contained, reusable, and hopefully coherent.
- abstraction: suppresses detail, allows us to use a piece of code as if it were a black box and reuse it easily. "Where ignorance is bliss, Tis folly to be wise" - Thomas Gray
A function is effectively provides new language primitives, and for modular abstraction.

We can make most problems simpler by breaking them into small problems:

> "divide and rule" - Julia Caesar

> "We must all hang together, or assuradely we will hang seperately" - Ben Franklin

One great technique for divide and conquer algorithms is recursion.

> it is legal for one function to call another ... it is also legal for a function to call itself. It may not be obvious why that is a good thing, but it turns out to be one of the most magical and interesting things a program can do

Recursion provides an framework for describing a problem and also implementing a solution. How can you progressively solve smaller versions of the same or similar problem until a base case is reached.

When the interpreter calls a function the formal parameter is bound to the value of actual parameter. Upon entry into the function a new scope is created. A scope is a mapping from names to values in memory. When executing a program the interpreter creates a main scope, and scopes for each function. Each of these scopes is called a stack frame because each scope gets added to the top of a stack during execution, then removed from it when execution is complete. "Last in first out" (LIFO) is the definition of a stack.

### Data structures

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

## Materials

Original MIT introduction to computer science course was archived [here](https://dspace.mit.edu/handle/1721.1/150601)

[x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/pages/unit-1/lecture-1-introduction-to-6-00/ - John Guttag

[x] https://frontendmasters.com/courses/go-for-js-devs/installing-go/ (introduction & printing, lessons 1 introduction - 9 printing) - Brenna Martenson

[x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/lecture-3-problem-solving/ - John Guttag

[x] https://frontendmasters.com/courses/go-for-js-devs/control-structures-if-else/ (basic go syntax, lessons 10 types - 19 functions) - Brenna Martenson

[x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/pages/unit-1/lecture-4-machine-interpretation-of-a-program/ - John Guttag

[x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/pages/unit-1/lecture-5-objects-in-python/ - John Guttag

[ ] Problems: https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/mit6_00scs11_ps1/ - John Guttag

[ ] https://frontendmasters.com/courses/go-for-js-devs/arrays/ (arrays, lesson 20 - complex structures lesson 25) - Brenna Martenson

[x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/lecture-6-recursion/ - Eric Grimson

[ ] https://frontendmasters.com/courses/go-for-js-devs/arrays/ (go toolkit, lessons 26 - 30) - Brenna Martenson

[ ] Problems: https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/mit6_00scs11_ps2/

[ ] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/pages/unit-1/lecture-7-debugging/ - John Guttag