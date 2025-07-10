# Python Syntax Learning Outline

## 1. Python Basics

### 1.1 Introduction

- What is Python?
- Python philosophy and PEP 8
- Installing Python and setting up environment
- Python interpreter and REPL

Python is a simple interpreted programming language commonly used for data analysis, artificial intelligence, and scientific computing. Python follows the philosophy of "The Zen of Python," which emphasizes readability and simplicity. PEP 8 is the official style guide for Python code, providing conventions for writing clean code.

To install Python, visit [python.org](https://www.python.org/) and download the latest version. Tools like `pyenv` or Anaconda can help manage Python versions and environments. The Python interpreter executes Python code interactively. You can access the REPL (Read-Eval-Print Loop) by typing `python` or `python3` in your terminal. The REPL is useful for testing small code snippets and learning Python syntax.

### 1.2 Basic Syntax

- Indentation and code blocks
- Comments (single-line `#` and multi-line `"""`)
- Statements and expressions
- Line continuation with `\`

Python uses indentation to define code blocks instead of braces or keywords. Indentation is mandatory, and inconsistent indentation results in a syntax error. Single-line comments start with `#`, while multi-line comments are enclosed in triple quotes (`"""`). Comments are ignored by the Python interpreter.

For long statements, Python provides a line continuation character (`\`). This allows you to split a statement across multiple lines for better readability. Alternatively, you can use parentheses, brackets, or braces.

```python
# Correct indentation
if True:
    print("Indented block")

# This is a single-line comment
"""
This is a multi-line comment
spanning multiple lines.
"""

# Statement
x = 5

# Expression
result = x + 10

# Multiple statements on one line (not recommended)
x = 5; y = 10; print(x + y)

# Using \ for line continuation
long_string = "This is a very long string " \
              "that spans multiple lines."

# Using parentheses for implicit line continuation
long_string = (
    "This is a very long string "
    "that spans multiple lines."
)
```

### 1.3 Variables and Assignment

- Variable naming conventions
- Constants (by convention)
- Multiple assignment
- Dynamic typing

Python variables follow the conventions outlined in PEP 8. CamelCase is typically used for class names, while snake_case is preferred for variable and function names. Variable names can include letters, numbers, and underscores but cannot start with a number. Python does not have built-in support for constants, but by convention constants are defined with uppercase variables indicate they should not be changed.

Python allows you to assign values to multiple variables in a single line. This can be useful for initializing variables or swapping values. Python is a dynamically typed language. The type is inferred based on the value assigned to the variable.

```python
# Variable names
validVariable = 1
another_valid_Variable = 2
2invalid-variable-name = 3  # syntax error
PI = 3.14159
GRAVITY = 9.8

# Multiple assignment
a, b, c = 1, 2, 3
print(a, b, c)  # Output: 1 2 3

# Swapping values
x, y = y, x

# Dynamic typing
x = 10  # x is an integer
x = "Hello"  # Now x is a string
```

## 2. Data Types and Literals

### 2.1 Numeric Types

- Integers (`int`)
- Floating-point numbers (`float`)
- Complex numbers (`complex`)

```python
# Integer example
x = 10
print(type(x))  # Output: <class 'int'>

# Arithmetic operations with integers
y = x + 5 # Output: 15

# Float example
pi = 3.14159
print(type(pi))  # Output: <class 'float'>

# Arithmetic operations with floats
radius = 5.0
area = pi * (radius ** 2) # Output: 78.53975

# Complex number example
z = 2 + 3j
print(type(z))  # Output: <class 'complex'>

# Arithmetic operations with complex numbers
z_conjugate = z.conjugate()
print(z_conjugate)  # Output: (2-3j)

magnitude = abs(z)
print(magnitude)  # Output: 3.605551275463989
```

### 2.2 Strings

- String literals (single, double, triple quotes)
- String formatting (f-strings, `.format()`, `%`)
- String methods and operations
- Escape sequences
- Raw strings

### 2.3 Misc. Types

- Boolean (`bool`)
- `None` keyword

## 3. Collections and Data Structures

### 3.1 Lists

- Creating lists
- List indexing and slicing
- List methods (`append`, `extend`, `insert`, `remove`, etc.)
- List comprehensions
- Nested lists

**Lists** are ordered, mutable collections that can store elements of different types and allow duplicates. **List indexing** uses square brackets with zero-based indices, while **slicing** extracts subsequences using start:stop:step notation. **List methods** provide built-in functionality for adding, removing, and manipulating elements efficiently. **List comprehensions** offer a concise way to create new lists by applying expressions and filters to existing iterables. **Nested lists** allow you to create multi-dimensional data structures like matrices or tables.

```python
# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty_list = []
list_constructor = list("hello")  # Creates ['h', 'e', 'l', 'l', 'o']

# List indexing and slicing
print(fruits[0])        # Output: apple (first element)
print(fruits[-1])       # Output: orange (last element)
print(numbers[1:4])     # Output: [2, 3, 4] (slicing)
print(numbers[::2])     # Output: [1, 3, 5] (every second element)
print(numbers[::-1])    # Output: [5, 4, 3, 2, 1] (reverse)

# List methods
colors = ["red", "green"]
colors.append("blue")           # Add single element: ["red", "green", "blue"]
colors.extend(["yellow", "purple"])  # Add multiple elements
colors.insert(1, "orange")     # Insert at specific index
colors.remove("green")         # Remove first occurrence
popped = colors.pop()          # Remove and return last element
colors.sort()                  # Sort in place
colors.index("red")     # Find index of element
colors.count("blue")    # Count occurrences

# List comprehensions
squares = [x**2 for x in range(1, 6)]
print(squares)  # Output: [1, 4, 9, 16, 25]

# Filter even numbers and square them
even_squares = [x**2 for x in range(1, 11) if x % 2 == 0] # Output: [4, 16, 36, 64, 100]

# Nested lists
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
students_grades = [
    ["Alice", [85, 92, 78]],
    ["Bob", [90, 88, 95]],
    ["Charlie", [87, 91, 89]]
]

# Accessing nested list elements
print(matrix[1][2])              # Output: 6 (row 1, column 2)
print(students_grades[0][1][0])  # Output: 85 (Alice's first grade)

# Modifying nested lists
matrix[0][0] = 10               # Change first element
students_grades[1][1].append(92)  # Add grade to Bob's list
```

### 3.2 Tuples

- Creating tuples
- Tuple unpacking
- Named tuples
- Immutability

### 3.3 Dictionaries

- Creating dictionaries
- Dictionary methods (`get`, `keys`, `values`, `items`, etc.)
- Dictionary comprehensions
- Nested dictionaries

**Dictionaries** are Python's key-value pair data stores. Create dictionaries with curly braces `{}` and colon-separated key-value pairs, or with the `dict()` constructor. Methods for manipulation and access include

- `get()` for safe key retrieval with optional default values,
- `keys()` to access all dictionary keys,
- `values()` to retrieve all values, and
- `items()` to get key-value pairs as tuples for iteration.

**Dictionary comprehensions** provide a concise way to create new dictionaries by applying expressions to existing iterables, similar to list comprehensions but with key-value syntax.

For complex data structures, dictionaries can be **nested** within other dictionaries, allowing you to represent hierarchical data like JSON-like structures.

```python
# Creating dictionaries
person = {"name": "Alice", "age": 30, "city": "New York"}
empty_dict = {}
dict_constructor = dict(name="Bob", age=25)

# Dictionary methods
print(person.get("name"))  # Output: Alice
print(person.get("country", "Unknown"))  # Output: Unknown (default value)

print(person.keys())    # Output: dict_keys(['name', 'age', 'city'])
print(person.values())  # Output: dict_values(['Alice', 30, 'New York'])
print(person.items())   # Output: dict_items([('name', 'Alice'), ('age', 30), ('city', 'New York')])

# Iterating through dictionary items
for key, value in person.items():
    print(f"{key}: {value}")

# Dictionary comprehensions
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filter even numbers and square them
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print(even_squares)  # Output: {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}

# Nested dictionaries
students = {
    "Alice": {
        "grades": [85, 92, 78],
        "major": "Computer Science",
        "year": 3
    },
    "Bob": {
        "grades": [90, 88, 95],
        "major": "Mathematics",
        "year": 2
    }
}

# Accessing nested dictionary values
print(students["Alice"]["major"])  # Output: Computer Science
print(students["Bob"]["grades"][0])  # Output: 90

# Adding to nested dictionary
students["Alice"]["gpa"] = 3.8
```

### 3.4 Sets

- Creating sets
- Set operations (union, intersection, difference)
- Set methods
- Set comprehensions

Python sets are more similar to JavaScript sets. Python lists are much closer JavaScript arrays.

**Sets** are unordered collections of unique elements that provide fast membership testing and automatic duplicate elimination. Sets are created using curly braces `{}` or the `set()` constructor. Sets support mathematical operations like union, intersection, and difference for comparing and combining datasets.

**Set methods** provide additional functionality for adding, removing, and testing elements. **Set comprehensions** offer a concise way to create new sets by filtering and transforming existing iterables.

```python
# Creating sets
fruits = {"apple", "banana", "orange"}
empty_set = set()  # Note: {} creates an empty dict, not set
numbers = set([1, 2, 3, 3, 4])  # Duplicates automatically removed
print(numbers)  # Output: {1, 2, 3, 4}

# Set operations (union, intersection, difference)
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

union = set1 | set2          # or set1.union(set2)
print(union)                 # Output: {1, 2, 3, 4, 5, 6}

intersection = set1 & set2   # or set1.intersection(set2)
print(intersection)          # Output: {3, 4}

difference = set1 - set2     # or set1.difference(set2)
print(difference)            # Output: {1, 2}

symmetric_diff = set1 ^ set2 # or set1.symmetric_difference(set2)
print(symmetric_diff)        # Output: {1, 2, 5, 6}

# Set methods
colors = {"red", "green", "blue"}
colors.add("yellow")         # Add single element
colors.update(["purple", "orange"])  # Add multiple elements
colors.remove("red")         # Remove element (raises KeyError if not found)
colors.discard("pink")       # Remove element (no error if not found)

print("green" in colors)     # Output: True (membership testing)
print(len(colors))           # Output: 5

# Set comprehensions
squares = {x**2 for x in range(1, 6)}
print(squares)  # Output: {1, 4, 9, 16, 25}

# Filter even numbers from a list and create a set
even_set = {x for x in range(1, 11) if x % 2 == 0}
print(even_set)  # Output: {2, 4, 6, 8, 10}
```

## 4. Operators

### 4.1 Arithmetic Operators

`+`, `-`, `*`, `/`, `//`, `%`, `**`

### 4.2 Comparison Operators

- `==`, `!=`, `<`, `>`, `<=`, `>=`
- `is` and `is not`
- `in` and `not in`

### 4.3 Logical Operators

- `and`, `or`, `not`
- Short-circuit evaluation

### 4.4 Assignment Operators

- `=`, `+=`, `-=`, `*=`, `/=`, etc.

### 4.5 Bitwise Operators

- `&`, `|`, `^`, `~`, `<<`, `>>`

## 5. Control Flow

### 5.1 Conditional Statements

- `if`, `elif`, `else`
- Ternary operator (`x if condition else y`)
- Nested conditions

### 5.2 Loops

- `for` loops
  - Iterating over sequences
  - `range()` function
  - `enumerate()` and `zip()`
- `while` loops
- Loop control: `break`, `continue`, `pass`
- `else` clause with loops

### 5.3 Match Statement (Python 3.10+)

- Pattern matching syntax
- Guard conditions
- Structural patterns

```python
# Basic pattern matching syntax
def process_data(data):
    match data:
        case 0:
            return "Zero"
        case int() if data > 0:  # Guard condition
            return f"Positive integer: {data}"
        case int() if data < 0:
            return f"Negative integer: {data}"
        case str() if len(data) > 0:
            return f"Non-empty string: {data}"
        case []:
            return "Empty list"
        case [x] if isinstance(x, int):
            return f"List with one integer: {x}"
        case [x, y]:
            return f"List with two items: {x}, {y}"
        case [x, *rest]:  # Structural pattern
            return f"List starting with {x}, rest: {rest}"
        case {"name": str(name), "age": int(age)}:  # Dictionary pattern
            return f"Person: {name}, age {age}"
        case _:  # Default case
            return f"Unknown type: {type(data)}"

# Examples
print(process_data(42))             # Positive integer: 42
print(process_data(-5))             # Negative integer: -5
print(process_data("hello"))        # Non-empty string: hello
print(process_data([1, 2, 3]))      # List starting with 1, rest: [2, 3]
print(process_data({"name": "Alice", "age": 30}))  # Person: Alice, age 30

# Pattern matching with classes
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

def analyze_point(point):
    match point:
        case Point(x=0, y=0):
            return "Origin"
        case Point(x=0, y=y):
            return f"On Y-axis at {y}"
        case Point(x=x, y=0):
            return f"On X-axis at {x}"
        case Point(x=x, y=y) if x == y:
            return f"On diagonal at ({x}, {y})"
        case Point(x=x, y=y):
            return f"Point at ({x}, {y})"
        case _:
            return "Not a point"

print(analyze_point(Point(0, 0)))    # Origin
print(analyze_point(Point(3, 3)))    # On diagonal at (3, 3)
```

## 6. Functions

### 6.1 Function Definition

- `def` keyword
- Function parameters and arguments
- Default parameters
- Variable-length arguments (`*args`, `**kwargs`)
- Keyword-only arguments

### 6.2 Return Values

- `return` statement
- Multiple return values
- Functions without explicit return

### 6.3 Scope and Namespaces

- Local vs global scope
- `global` and `nonlocal` keywords
- LEGB rule (Local, Enclosing, Global, Built-in)

### 6.4 Advanced Function Concepts

- Lambda functions
- Nested functions
- Closures
- Decorators

## 7. Object-Oriented Programming

### 7.1 Classes and Objects

- Class definition with `class`
- Instance creation
- Instance variables and methods
- `self` parameter

### 7.2 Special Methods

- `__init__` constructor
- `__str__` and `__repr__`
- Other magic methods

### 7.3 Inheritance

- Single inheritance
- Method overriding
- `super()` function
- Multiple inheritance and MRO

### 7.4 Class Features

- Class variables vs instance variables
- Static methods (`@staticmethod`)
- Class methods (`@classmethod`)
- Properties (`@property`)

## 8. Exception Handling

### 8.1 Basic Exception Handling

- `try`, `except`, `else`, `finally`
- Catching specific exceptions
- Multiple except blocks

### 8.2 Exception Types

- Built-in exceptions
- Custom exceptions
- Exception hierarchy

### 8.3 Raising Exceptions

- `raise` statement
- Re-raising exceptions

## 9. Modules and Packages

`%pip install` is the recommended approach for installing packages in Jupyter notebooks because it installs directly into the same Python environment that's running your notebook kernel, ensuring packages are immediately available. In contrast, `!pip install` runs as a shell command and may install into a different Python environment than your notebook is using, potentially causing issues where packages appear installed but aren't accessible in your current session. The `%pip` magic command was introduced specifically to solve the common problem of packages being installed but not found in notebook environments.

### 9.1 Modules

- Creating modules
- `import` statement variations
- Module search path
- `if __name__ == "__main__"`

### 9.2 Packages

- Package structure
- `__init__.py` files
- Relative imports
- Namespace packages

### 9.3 Standard Library Overview

- Common modules (`os`, `sys`, `datetime`, `json`, etc.)

## 10. File I/O and Context Managers

### 10.1 File Operations

- Opening and closing files
- Reading and writing files
- File modes
- Working with different file types

### 10.2 Context Managers

- `with` statement
- Creating custom context managers
- `__enter__` and `__exit__` methods

## 11. Iterators and Generators

### 11.1 Iterators

- Iterator protocol
- `iter()` and `next()`
- Creating custom iterators

### 11.2 Generators

- Generator functions with `yield`
- Generator expressions
- `yield from`

## 12. Advanced Topics

### 12.1 Comprehensions

- List comprehensions
- Dictionary comprehensions
- Set comprehensions
- Generator expressions

### 12.2 Built-in Functions

- `map()`, `filter()`, `reduce()`
- `zip()`, `enumerate()`
- `sorted()`, `reversed()`
- `any()`, `all()`

### 12.3 Type Hints (Optional)

- Variable annotations
- Function annotations
- `typing` module
- Generic types

**Variable annotations** are used to specify the expected type of a variable, improving readability and enabling static type checking tools like `mypy`. Python does not enforce these types at runtime however, they serve as documentation only. Optional **function annotations** clarify the expected input and output of a function. The **`typing` module** provides advanced type hints for complex data structures and scenarios. The module includes types like `List`, `Dict`, `Tuple`, `Union`, and more.

**Generic types** allow you to define functions and classes that work with multiple types. This is useful for creating reusable and type-safe code. Generics are commonly used in libraries and frameworks to provide flexibility while maintaining type safety.

```python
# Variable annotations
x: int = 10
name: str = "Alice"

# Function annotations
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Using the typing module for complex types
from typing import List, Dict

def process_data(data: List[int]) -> Dict[str, int]:
    return {"sum": sum(data), "count": len(data)}

# Generic types
from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self):
        self.items: List[T] = []

    def push(self, item: T):
        self.items.append(item)

    def pop(self) -> T:
        return self.items.pop()
```

Python type hints are not used for runtime validation by default. They are primarily intended for static type checking with, e.g. `mypy`, which catch type-related errors during development. However, **third-party libraries like pydantic or typeguard** can be used to perform runtime validation based on type hints.

`typechecked` works at the function level. It checks types for function arguments and return values during execution. It is lightweight and simple and does not support complex validation rules or transformations. It raises a `TypeError` if a type mismatch is detected.

`pydantic` works at the object level. It validates attributes of data models and can also parse and transform input data into the desired format. It supports complex validation rules, default values, and can parse various formats, e.g. JSON. It raises a `ValidationError` with detailed information about the validation failure.

```python
# Using typeguard for runtime type checking
from typeguard import typechecked

@typechecked
def add_numbers(a: int, b: int) -> int:
    return a + b

add_numbers(1, 2)  # Works fine
add_numbers("1", 2)  # Raises a TypeError

# Using pydantic for data validation
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

user = User(name="Alice", age=30)  # Works fine
user = User(name="Alice", age="30")  # Raises a ValidationError
```

## 13. Best Practices and Style

### 13.1 Code Style

- PEP 8 guidelines
- Naming conventions
- Code organization

### 13.2 Documentation

- Docstrings
- Comments
- Type hints for documentation

### 13.3 Error Handling

- When to use exceptions
- Specific vs general exception handling
- Logging vs printing

## Practice Projects

1. Calculator with basic operations
2. Text-based adventure game
3. File organizer script
4. Simple web scraper
5. Data analysis with CSV files
6. Basic class hierarchy (shapes, animals, etc.)
7. Decorator examples
8. Context manager implementation

## Next Steps

- Explore specific libraries (NumPy, Pandas, Django, Flask)
- Learn testing with unittest/pytest
- Study asynchronous programming
- Dive into metaclasses and advanced OOP
- Performance optimization techniques
