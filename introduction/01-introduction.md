# Introduction

> “The computer will always do exactly what you tell them to do.”

There are two kinds of knowledge: declarative and imperative. **Declarative knowledge** is a statement about something that is true, e.g. a chocolate cake is bad for you. While it doesn’t tell you how to do it, but does tell you about how to test correctness. **Imperative knowledge** tells you how to do something, e.g. how to make the chocolate cake. Another example of imperative knowledge is Heron’s method of finding the square root of a number. Hero is a greek experimenter who lived in Alexandria in 50 AD.

An algorithm contains imperative steps on how to perform a computation until it “converges” (a fancy way to say that it’s halted). The recipe of an algorithm:
- converges
- has instructions
- has a clow of control, and
- a termination of control

The initial computers were designed to do very specific things, like computing the square root of a number. These are called **“fixed program computers”**. An example of this is Alan Turing’s enigma code breaker. In a **“stored program computer”** the instructions are the same as data. Once that was possible the machines became infinitely flexible. An “interpreter” is a program that can execute any legal set of instructions.

<img width="278" alt="CONTROL" src="https://user-images.githubusercontent.com/3966076/193446505-27616bb7-9e0c-4b38-acea-cf980a6f3ddd.png">

In a fixed program computer the program and data are kept in the memory (and there's lots of it today). The control unit tells the memory what to do. The arithmetic logic unit does the computations that get stored in the accumulator. The input and output take in and display the accumulated result to the user.

Alan Turing showed that there were six primitive instructions with which you could write all programs. These instructions operated on one bit of information. A programming language provides a set of primitive instructions and control structures—that’s all. **Programming language boil down to simply that: primitive instructions, control flow structures, and how they are combined**. Interpreted languages give errors in the language of the source code (that you wrote in), whereas compiled languages give errors in the compiled object code, which is harder to debug. Compiled languages tend to be more efficient however.

A programming language **syntax** determines whether a string is legal, **static semantics** determine whether the string has meaning, and **semantics** assigns a meaning to a legal sentence. Assuming no static semantic errors, there are three types of program errors:
- crash
- never ends
- gives an incorrect result (the worst possible outcome)

###### Materials
- [x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/pages/unit-1/lecture-1-introduction-to-6-00/ - John Guttag
- [ ] https://frontendmasters.com/courses/go-for-js-devs/installing-go/ (lessons 1 - 7) - Brenna Martenson