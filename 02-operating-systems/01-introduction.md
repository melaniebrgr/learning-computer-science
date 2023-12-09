# Introduction

- Operating Systems: Principles & Practice, 2ed, Thomas Anderson and Michael Dahlin
- [Lectures on Operating Systems, IIT Bombay](https://www.cse.iitb.ac.in/~mythili/os/)
- [Berkeley CS 162: Operating Systems](https://www.youtube.com/playlist?list=PLRdybCcWDFzCag9A0h1m9QYaujD0xefgM)

## Operating systems

Operating systems (OSs) are some of the largest and most complex codebases. Many of the core concepts for the development of OS can be applied to the development of other software. OSs manage a computer's resources, such as CPU, memory, disk and I/O devices like the mouse and keyboard and abstract them for use for users and their applications. There are different types of opperating systems depending on the design goals:

- Desktop, laptop and netbook OSs: Are single user, many application and various I/O devices and therefore need good abstractions, fault isolation and performance. Examples are Windows 10, MacOS 16 (Ventura), and Linux.
- Smartphone OSs: Are also single user, support many more applications, have a limited battery and therefore need to have greate developer abstractions, be resource efficient and

are general purpose OSs used in smartphones and desktop computers and also more and more specialised embedded OSs inside gaming systems, appliances and vehicles. 

A quick overview of how a program is run.

1. A high level programs is compiled into an executable that contains instructions for that hardware's instruction set architecture (ISA), and data, e.g. all the program variables.
2. The instructions and data are loaded into memory from disk.
3. They are then are retrieved and run on the CPU and the output is stored back into memory.

During the execution of a program an OS plays three main "roles": 1. referee, 2. illusionist, and 3. glue.

1. As a **Referee** OSs conveniently abstract the hardware resources while isolating the running process from each other.
2. As a **Illusionist** OSs provide the illusion to each application that they have full resources at their disposal while efficiently managing their usage.
3. As **Glue** OSs provide a common set of services for applications to use and manages communication between applications.

Another analogy for an operating system is a government: OSs create and enforce laws, build and maintain infrastructure for users to use, and are intended to serve the people.

## History

OSs began as a standard library providing common functionality to applications and the applications ran one at a time. They evolved into a system that provides greater security (it has more priviledges than the programs that call it) and isolation and can run multiple programs concurrently.

## Materials

- [x] Operating Systems: Principles & Practice, Chapter 1 "Introduction" - Anderson & Dahlin
- [x] [Operating Systems Lecture 1: Introduction, IIT Bombay](https://www.youtube.com/watch?v=aCJ3YgoolHQ)
- [x] [Lecture 01. Overview (CS 162, Fall 2013, UC Berkeley)](https://www.youtube.com/watch?v=hry_qqXLej8&list=PLRdybCcWDFzCag9A0h1m9QYaujD0xefgM&index=1)

