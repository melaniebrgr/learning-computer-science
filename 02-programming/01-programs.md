# Programs

> “Computational processes are abstract beings that inhabit computers. As they evolve, processes manipulate other abstract things called data. The evolution of a process is directed by a pattern of rules called a program” - Structure and Interpretation of Computer Programs

> “A powerful programming language is more than just a means for instructing a computer to perform tasks. The language also serves as a framework within which we organize our ideas about processes. Thus, when we describe a language, we should pay particular attention to the means that the language provides for combining simple ideas to form more complex ideas”

> “The computer will always do exactly what you tell them to do.”

There are two kinds of knowledge: declarative and imperative. **Declarative knowledge** is a statement about something that is true, e.g. a chocolate cake is bad for you. While it doesn’t tell you how to do it, it does tell you about how to test correctness. **Imperative knowledge** tells you how to do something, e.g. how to make the chocolate cake. Another example of imperative knowledge is Heron’s method of finding the square root of a number. Heron proposed a formula that could be repeated iteratively until it converged on the value of the square root. Hero is a greek experimenter who lived in Alexandria in 50 AD.

## Fixed and stored programs

The initial computers were designed to do very specific things, like computing the square root of a number. These are called **“fixed program computers”**. An example of this is Alan Turing’s enigma code breaker. In a **“stored program computer”** the instructions are the same as data. Once it was possible machines became infinitely flexible. An “interpreter” is a program that can execute any legal set of instructions.

<img width="278" alt="CONTROL" src="https://user-images.githubusercontent.com/3966076/193446505-27616bb7-9e0c-4b38-acea-cf980a6f3ddd.png">

In a fixed program computer the program and data are kept in the memory (and there's lots of it today). The control unit tells the memory what to do. The arithmetic logic unit does the computations that get stored in the accumulator. The input and output take in and display the accumulated result to the user.

Alan Turing showed that there were six primitive instructions with which you could write all programs. These instructions operated on one bit of information. A programming language provides a set of primitive instructions and control structures. That’s all. All programming language boil down to this: primitive instructions, control flow structures, and how they are combined. A programming language's **syntax** determines whether a string is legal, **static semantics** determine whether the string has meaning, and **semantics** assigns a meaning to a legal sentence.

Interpreted languages give errors in the language of the source code (that you wrote in), whereas compiled languages give errors in the compiled object code, which is harder to debug. However, compiled languages tend to be more efficient.

## Go syntax: variables and assignments

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

### Examples

1. [hello world](./01-hello.go)
2. [entering and printing your name](./02-entering-and-printing-your-name.go)

## The great big world of applications

### Cloud Native

What is a cloud-native applications? This is what we expect them to do:
• To achieve high-availability while running in fault-prone environments;
• To allow us to continuously release new versions with zero downtime;
• To handle dynamic workloads (e.g. request volumes).

"These requirements have a deep impact on the viable solution space for the architecture of our software." The cloud, is by nature a fault prone environment, so to achieve high availability multiple instances of the application need to be running on multiple machines. To handle dynamic workloads the application needs to be able to scale up to meet demand, then scale back down to minimise costs. This then means we cannot hold state on the application servers. Databases need to be used for persistence.
