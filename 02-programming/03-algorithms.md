# Algorithms

## What is an algorithm?

A algorthm is a set of instructions carried out to solve a problem. An algorithm:

- has instructions and flow controls,
- converges (a fancy way to say that it concludes), and
- has a termination of control, usually when it converges.

In the context of computer science, an algorithm contains well-defined implementable instructions on how to perform a computation until it converges. We call this programs.

Assuming no static semantic errors, a program can have three types of errors:

1. a crashes,
2. a failure to terminate,
3. an incorrect result (the worst possible outcome).

## Algorithm termination

How do we know if **looping program**, e.g. a "for" loop or a "while" loop, will terminate? A looping function with all of the following features will always terminate:

1. it maps a set of program variables to an integer
2. it starts with a non-negative value
3. a value is decreased on each iteration
4. the loop terminates when it reaches 0

This is a **decrementing function**. A decrementing function guarantees to stop a loop execution. It can be a useful pattern for "searching for a solution". The solution must be within the search space of the looping program however, or the program will never converge. When writing a loop, think carefully about the conditions for termination.

Loops can be used for exhaustive enumeration. **Exhaustive enumeration** or "guess and check" is a type of algorithm. The guessing is not random. The space of possible answers is exhausted systematically. A program that relies on this is called a **brute force algorithm**, and despite its name it is often the correct way to solve a problem because today's computers are _fast_. However, there are _some_ circumstances under which a brute force algorithm will start to take too long.

## Big O analysis

Big O analysis is just a way for computer scientists to categorize different algorithms by how they slow down as the input size to the algorithm grows. It enables us to talk about how slow or how fast algorithms can run. And to be very specific, it is the worst-case runtime. In short,

- Predict how an algorithm will perform as data size increases.
- Compare the efficiency of different algorithms.
- Identify potential bottlenecks in code.

### Constant time, O(1)

![graph of constant time](./assets/bigo--constant.png "Constant time")

- No matter how big the input is, the algorithm takes the same time.
- Always 1 step, even if the array has 10 or 10 million elements.
- The graph is a flat line, constant regardless of input.

```python
def get_first_element(arr):
    return arr[0]
```

### Linear time, O(n)

![graph of linear time](./assets/bigo--linear.png "Linear time")

- The running time grows directly with the input size.
- If array has 5 elements it has 5 operations. If it has 1,000 elements, 1,000 operations.
- The graph is a straight line, and grows proportionally with input size.
- If there is a single loop in the algorithm, it is a clue that has linear complexity.

```python
def print_all_elements(arr):
    for x in arr:
        print(x)
```

### Logarithmic time, O(log n)

![graph of logarithmic time](./assets/bigo--logarithmic.png "Logarithmic time")

- Each step cuts the problem in half (common in binary search).
- Searching in 1,000,000 elements takes only ~20 steps.
- Slightly steeper than linear initially, but grows much slower for large inputs.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

### Linearithmic time, O(n log n)

- Split a problem into parts and then process each part (common in sorting algorithms, Merge Sort, and QuickSort).

```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr)//2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
```

### Quadratic time, O(n²)

![graph of quadratic time](./assets/bigo--quadratic.png "Quadratic time")

- For each element, the algorithm loops over all elements again.
- If array has 10 elements, it has ~100 steps. If 1,000, it has ~1,000,000 steps.
- The graph curves upward quickly. It is inefficient for large inputs.

```python
def print_all_pairs(arr):
    for x in arr:
        for y in arr:
            print(x, y)
```

### Exponential time, O(2^n)

- Each call spawns 2 more calls resulting in exponential growth.

```python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```

### Factorial time, O(n!)

- Explores every possible ordering of inputs (permutations).
- For example, `!5 = 5 * 4 * 3 * 2 * 1 = 120`.
- Grows faster than exponential and is completely impractical for even modest n (e.g., 20! ≈ 2.4 quintillion).

```js
function permute(arr) {
  if (arr.length === 0) return [[]];
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    let perms = permute(rest);
    for (let p of perms) {
      result.push([arr[i], ...p]);
    }
  }
  return result;
}
```

![graph summary of big O](./assets/bigo--summary.png "Summary")

## Speeding up algorithms

Can we figure out how long an algorithm will take to run (algorithmic analysis), by looking at what the run time depends on:

- desired answer precision
- how big the steps are that we take through the algorithm

We can change both of these levers to adjust the run speed. Taking bigger steps allows us to more rapidly cut through the search space. One algorithmic technique to change the step size is called, "bisection search", where the step is half the search space. With algorithmic analysis we can actually know how long a computation will take to run, which permits us to decide if it's worth the time.

Most of the time we want to make the code shorter, not longer. Afterall, the more code we have, the harder it is to get it to work. Therefore, **we measure productivity in terms of the amount of functionality introduced with _less_ code, rather than the number of lines written. Good programmers "write less code".** When a computation in a program needs to be repeated many times, we can use introduce a language mechanism that provides decomposition and abstraction in order to reuse that computation.

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

## Search algorithms

The simplest search implementation is to just iterate through the list from the beginning and check each value in turn. This a `LinearSearch` and has a `O(N)`. However, if the array is ordered, it's not necessary to start searching from the beginning. Instead we can divide the array by two, check the middle value, determine if larger or smaller, and then divide the left or right side by two until there are no halves left and the value is found.

Mathematically it's like going N/2, N/4, N/8 and so on, or N/2^x. To solve for x we do, `log2(N) = x`. Therefore finding the value in an array 4096 elements long takes _12 steps_, `log2(4096) = 12`. This is a `BinarySearch` and has a `O(log n)`. Note that is we were scanning the input after halving the search space we would have `O(n log n)`.
