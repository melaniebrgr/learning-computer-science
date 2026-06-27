# abdraw: readme

## Modules

### Graphic

A Graphic module is responsible for actually drawing the pixels. Anything capable of drawing pixels to canvas has a graphic component, for example, a Domain instance has a **graphic** module. Note that you'll want to extend the base Graphic class to create a Graphic object with custom drawing instructions, by defining a template draw method (`templateDraw`).

### Domain

An **domain** is the main building block of the abdraw canvas. It has a graphic component and a data component, for example a domain (VH), or a linker.

### Chain

"A linked list is a sequences of nodes linked via pointers, which allow for efficient insertions and deletions without rearranging the entire sequence."

## Patterns

abdraw leverages several design patterns and datastructures:

- [template method pattern](https://refactoring.guru/design-patterns/template-method): Graphic class and Graphic subclasses
- [composite pattern](https://refactoring.guru/design-patterns/composite): drawing Domains in a Chain
- linked list: Chain class
- singleton: Canvas class