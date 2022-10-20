# Introduction to programming

> “The computer will always do exactly what you tell them to do.”

There are two kinds of knowledge: declarative and imperative. **Declarative knowledge** is a statement about something that is true, e.g. a chocolate cake is bad for you. While it doesn’t tell you how to do it, it does tell you about how to test correctness. **Imperative knowledge** tells you how to do something, e.g. how to make the chocolate cake. Another example of imperative knowledge is Heron’s method of finding the square root of a number. Heron proposed a formula that could be repeated iteratively until it converged on the value of the square root. Hero is a greek experimenter who lived in Alexandria in 50 AD.

An algorithm contains imperative steps on how to perform a computation until it “converges” (a fancy way to say that it’s halted). The recipe of an algorithm:
- converges
- has instructions
- has flow controls, and
- a termination of control

Aside: As a general pattern, imperative information can be encapsulated in a declarative statement.

The initial computers were designed to do very specific things, like computing the square root of a number. These are called **“fixed program computers”**. An example of this is Alan Turing’s enigma code breaker. In a **“stored program computer”** the instructions are the same as data. Once that was possible the machines became infinitely flexible. An “interpreter” is a program that can execute any legal set of instructions.

<img width="278" alt="CONTROL" src="https://user-images.githubusercontent.com/3966076/193446505-27616bb7-9e0c-4b38-acea-cf980a6f3ddd.png">

In a fixed program computer the program and data are kept in the memory (and there's lots of it today). The control unit tells the memory what to do. The arithmetic logic unit does the computations that get stored in the accumulator. The input and output take in and display the accumulated result to the user.

Alan Turing showed that there were six primitive instructions with which you could write all programs. These instructions operated on one bit of information. A programming language provides a set of primitive instructions and control structures—that’s all. **Programming language boil down to simply that: primitive instructions, control flow structures, and how they are combined**. Interpreted languages give errors in the language of the source code (that you wrote in), whereas compiled languages give errors in the compiled object code, which is harder to debug. Compiled languages tend to be more efficient however.

A programming language **syntax** determines whether a string is legal, **static semantics** determine whether the string has meaning, and **semantics** assigns a meaning to a legal sentence. 

#### Go program examples
1. [hello world](./01-hello.go) - an example first program in Go
2. [entering and printing your name](./02-entering-and-printing-your-name.go) - an example of getting user input, assigning it to a variable and using it to form a new string

Assuming no static semantic errors, there are three types of program errors:
- a crash
- it never terminates
- gives an incorrect result (the worst possible outcome)

How do we know what values a *looping program*, e.g. a "for" loop or a "while" loop, will terminate for? A function like the following will always terminate:
1. maps a set of program variables to an integer
2. starts with a non-negative value
3. a value is decreased on each iteration
4. when the loop reaches 0 it terminates
This is a decrementing function. When writing a loop, think about these conditions for termination. Loops can be used for exhaustive enumeration.

**Exhaustive enumeration** ("guess and check") is a type of algorithm. The guessing is not actually random, the space of possible answers is exhausted systematically. A program that relies on this is called a brute force algorithm, and despite its name it is often the correct way to solve a problem because today's computers are _fast_. There are still circumstances in which a brute force algorithm will start to take a long time.

Can we figure out how long an algorithm will take to run (algorithmic analysis)? Yes, we can look at what the run time depends on:
- desired answer precision
- how big the steps are that we take through the algorithm are
We can change both of these levers to adjust the run speed. Taking bigger steps allows us to more rapidly cut through the search space. One algorithmic technique to change the step size is called, "**bisection search**", where the step is half the search space. With algorithmic analysis we can actually know how long a computation will take to run, which permits us to decide if it's worth the time.

#### Go program examples
3. paying off credit card debt, [problem](https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/mit6_00scs11_ps1/)

Most of the time we want to make the code shorter, not longer. Afterall, the more code we have, the harder it is to get it to work. Therefore, we measure productivity in terms of the amount of functionality introduced with _less_ code, rather than the number of lines written. When a computation in a program needs to be repeated many times, we can use introduce a language mechanism that provides decomposition and abstraction in order to reuse that computation.
- decomposition: creates structure, by allowing us to break our program into modules (functions, classes, etc.), that are self-contained and reusable.
- abstraction: suppresses detail, allows us to use a piece of code as if it were a black box: 

### Materials
- [x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/pages/unit-1/lecture-1-introduction-to-6-00/ - John Guttag
- [x] https://frontendmasters.com/courses/go-for-js-devs/installing-go/ (introduction & printing, lessons 1 introduction - 9 printing) - Brenna Martenson
- [x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/lecture-3-problem-solving/ - John Guttag
- [ ] https://frontendmasters.com/courses/go-for-js-devs/control-structures-if-else/ (basic go syntax, lessons 10 types - 19 functions) - Brenna Martenson
- [ ] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/ - John Guttaglecture-4-machine-interpretation-of-a-program/ - John Guttag
