# Algorithms

## Types of algorithms

An algorithm contains imperative steps on how to perform a computation until it “converges” (a fancy way to say that it’s halted). The recipe of an algorithm:

- it converges,
- has instructions and flow controls, and
- a termination of control.

Assuming no static semantic errors, there are three types of errors a program can have:

- it crashes
- it never terminates
- it gives an incorrect result (the worst possible outcome)

How do we know if **looping program**, e.g. a "for" loop or a "while" loop, will terminate? A looping function that has all the following features will always terminate:

1. it maps a set of program variables to an integer
2. it starts with a non-negative value
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

### Examples

3. paying off credit card debt, [problem](https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/mit6_00scs11_ps1/), [solution](./03-paying-off-credit-card-debt.go)

## Speeding up algorithms

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
