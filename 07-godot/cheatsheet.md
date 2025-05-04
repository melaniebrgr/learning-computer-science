# GDScript Cheatsheet

Example project: <https://github.com/melaniebrgr/brackeys-platformer>

## Features

- python-like syntax
- tabs determine code structure
- new lines do not need to terminate with semi-colons
- block scoping (functions, if statements)
- dynamically typed, but static and infered types are possible
- supports inheritance _and_ composition
- best practise is to call down and signal up, and use parents to communicate between siblings

## Working with Nodes

For convenience, drag a node from the Scene Graph into a script to access and update the node values programmatically. Parents can modify child nodes programmatically. It is generally bad practise for child nodes to reach up and modify parent nodes. In such cases you might want to create a global.

A node can be assigned to a variable. Use the `@onready` decorator if you do so. The dollar sign prefising the node is short for the `get_node` function.

## Variables

Assigment and updating:

```py
var health = 100 # Can be modified
health += 1
health -= 1
health *= 1
health /= 1

const SPEED = 3.0 # Cannot be modified
```

Casting to different types is possible. Types can be statically typed, or typed through inference:

```py
var damage: int = 15 # static typing
var damage := 15 # infered typing (convenient, still give type warnings)
```

### Get and set

Variables can be set up with getters and setters to execute some logic whenever we try to get or set a variable. The class example is health:

```py
const MAX_HEALTH := 200
var health := 100
    set(value):
        health = clamp(value, 0, 100)
        health_changed.emit(health)
var health_percent: float
    get:
        return health/MAX_HEALTH
```

## Data types

- bool
- int
- float
- string
- Vectors: `Vector2(x,y)`, `Vector3(x,y,z)`
- Arrays: `[]`
- Dictionaries, `{}`
- Enums, `enum {}`

*Arrays* can be mixed types, e.g. `["Potion", 1, 2]`, or a single type with types, e.g. `var items: Array[String]: ["Potion", "Helmet", "Sword"]`. Arrays are accessed by index. Arrays have methods, e.g. `remove_at`, `append`.

*Dictionaries* (like JS objects) are collections of key value pairs, e.g. `var players = { "Villain": 35 }`, that are access by key, e.g. `players["Villain"]`. Dictionaries can be looped over with for-in loops like arrays. Dictionaries can contain mixed data types and other Dictionaries.

*Enums* are versatile and convenient for tags or states, e.g. `enum { ALLY, NEUTRAL, ENEMY }`. They can be named, e.g. `enum Alignment { ALLY, NEUTRAL, ENEMY }`. They are dot `.` accessed. A cool functionality is specifying the type of an exported variable to be a name enum, which automatically becomes a drop-down list in the Inspector.

## Conditionals

Comparisons: `x==y, x>y, x>=y. x!=y, x<y, x>=y`, `x==y and a==b`, `x==y or a==b`

```py
if x:
    doX()
elif y:
    doY()
else:
    doDefault()
```

## Loops

```py
for item in items:
    if item.length() > 6:
        print(item)

for n in 8:
    print(n)

while glass < 0.5:
    glass += randf_range(0.01, 0.2)
```

Use `break` and `continue` to break from and continue to the next iteration of the loop respectively.

## Match

Comparable to switch statements, quite useful with enums:

```py
match my_alignment:
    Alignment.ALLY:
        greet()
    Alignment.NEUTRAL:
        ignore()
    Alignment.ENEMY:
        attack()
    _:
        default()
```

## Decorators

- `@export`: Exposes the variable in the Inspector and is very useful when setting up a new class.
- `@onready`: Ensures Godot waits until all child nodes have been created before the variable is updated.

## Functions

```py
func jump() -> void:
    # add upward force
    # play boing sound
    # play jumo animation
    print('JUMP')

func add(a: int, b: int) -> int:
    return a + b
```

Use `pass` in a function body to do nothing (for now). You can't have an empty function.

### Built-in functions

Functions that are preceded by an `_` underscore are not activated or called by us, but byt he engine itself. This includes all signals.

#### Called by the engine

- `_ready`: Ready is called when a node enters the scene for the first time, i.e. gameplay starts. Place code here that shoul dbe run once, and immediately. It's like an onMount method in React.
- `_process`: ...
- `_input`: Is called whenever input is received, e.g. mouse, keyboard, etc. Typically you'll want to set up an action before hand that ties specific input types to some action, e.g. "jump". Then in the input method you can check the state of the action, e.g. pressed or released, and execute code accordingly.

#### Signals

Custom functions that are called by the engine. Signals are messages Nodes can pass to each other, to notify other Nodes/Scenes that an event occured. It is Godot's observable system. Under "Node", all possible signals a node can emit are shown. Double clicking on one presents a menu of which script it should be connected to, adding it to that script. Signals can also be connected with code, `leveled_up.connect(_on_leveled_up)`

Create a new signal,

```py
signal leveled_up
leveled_up.emit()
leveled_up.connect(_on_leveled_up)
leveled_up.disconnect(_on_leveled_up)
```

#### Called by us

- `get_node`: Get a reference to Node specified by the string identifier
- `print`: Print to console
- `randf`: Random fraction
- `randi_range`: Random integer within some range
- `randf_range`: Random float within some range

## Classes

`class_name MyClass`
A pretty useful way of creating multiple custom instances based on a prototype. Then a variable can be exported based on that class to be set on the UI, and manipulated in the script, e.g.

```py
@export var character_to_kill: Character

func _ready():
    character_to_kill.die()
```

Inner classes can be created for organisation.
