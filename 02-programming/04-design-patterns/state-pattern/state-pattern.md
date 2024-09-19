# State pattern

A Finite State Machine (FSM)

- has a finite number of states
- can be in exactly one state at any given time
- each state has a set of _transitions_ that point to a new state
- changes from one state to another are in response to some input

State machines are memoryless; they make decisions (transition) based soley on where they are currently.

An FSM can be completely described by a list of all its states, an initial state, and the inputs that trigger each transition. A change from one state to another is called a transition. There are of two types for FSMs: deterministic and non-deterministic.

## How to represent a FSM

1. **A graph**: A finite state machine can be visualised by a graph of verteces and directed edges where each vertex is a finite state and each edge is transition to the next state. An end state is represented as a double circle.
2. **A table**: A table can be used to enumerate all the possible states and how to get to the in one convenient lookup table.

Example: a traffic light 🔴🟡🟢

```txt
  q₁           q₂              q₃              q₁
 (o)⎯⎯⎯⎯⎯⎯⎯o⎯⎯⎯⎯⎯⎯⎯⎯⎯o⎯⎯⎯⎯⎯⎯⎯⎯⎯o
🔴⚫️⚫️ --go--> ⚫️⚫️🟢 --wait--> ⚫️🟡⚫️ --stop--> 🔴⚫️⚫️
```

## Implementation

The simplest way to implement a FSM is with an enum and a switch statement.

Use the State pattern when you need to update multiple functions or add data to a parent that only belongs to one finite state.

## Resources

- [x] [Introduction to Finite State Machine Theory](https://www.youtube.com/watch?v=05zp5vbYXSQ)
