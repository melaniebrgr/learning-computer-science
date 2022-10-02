###### Learning path resources
- http://blog.agupieware.com/2014/05/online-learning-bachelors-level.html
- http://blog.agupieware.com/2014/06/online-learning-intensive-bachelors.html
- https://github.com/ossu/computer-science#introduction-to-computer-science
- https://thecrashcourse.com/topic/computerscience

# Introduction

> “The computer will always do exactly what you tell them to do.”

There are two kinds of knowledge: declarative and imperative. Declarative knowledge is a statement about something that is true, e.g. a chocolate cake is bad for you. While it doesn’t tell you how to do it, but does tell you about how to test correctness. Imperative knowledge tells you how to do something, e.g. how to make the chocolate cake. Another example of imperative knowledge is Heron’s method of finding the square root of a number. Hero is a greek experimenter who lived in Alexandria in 50 AD.

An algorithm contains imperative steps on how to perform a computation until it “converges” (a fancy way to say that it’s halted). The recipe of an algorithm:
- converges
- Has instructions
- Has a clow of control, and
- A termination of control

The initial computers were designed to do very specific things like this, computing the square root of a number. These are called “fixed program computers”. An example of this is Alan Turing’s enigma code breaker. In a “stored program computer” the instructions are the same as data. Once that was possible the machines became infinitely flexible. Finally, an “interpreter” is a program that can execute any legal set of instructions.

<img width="278" alt="CONTROL" src="https://user-images.githubusercontent.com/3966076/193446505-27616bb7-9e0c-4b38-acea-cf980a6f3ddd.png">

In a “fixed program computer” The program and the data are all kept in the memory (lots of it today). The control unit tells the memory what to do. The arithmetic logic unit does the computations that get stored in the accumulator. The input and output take in and display the result to the user.

Alan Turing showed that there were six primitive instructions with which you could write all programs. These instructions operated on one bit of information. A programming language provides a set of primitive instructions and control structures—that’s all. Programming language boil down to just that: primitive instructions, control flow structures, and how they are combined. Interpreted languages give errors in the language of the source code (that you wrote in), whereas compile languages give errors in the compiled, object code, which is harder to debug. Compiled languages tend to be more efficient however.

Syntax determines whether a string is legal, static semantics determine whether the string has meaning, and semantics assigns a meaning to a legal sentence (assuming no static semantic errors).
Problematic programs can…
- Crash
- Never end
- Give an incorrect result (the worst possible outcome)

###### Materials
- [x] https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/pages/unit-1/lecture-1-introduction-to-6-00/ - John Guttag, MIT lecturer
