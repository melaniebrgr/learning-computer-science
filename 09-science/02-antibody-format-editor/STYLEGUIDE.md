# abdraw: style guide

> If method by which the biologic is created in the natural world can be reflected in data structure used to model it and the algorithms that operate on it in the digital world, then the system is more likely to be remain coherent and extensible in future, and be more intuitive to use by the scientific and scientifically minded operators. - me

> When design the data model, consider how nature designed the data model. If you see a reflection of the natural in your code, there's at least millions of years of evolutionary evidence that it can sustain the brief the brief lifespan of your application. - also me

This is not that novel of an ideal, after all graphs are used to model social networks, but the challenge in science is that the domain is often well understood by the developers modelling it.

> "...simple and elegant systems tend to be easier and faster to design and get right, more efficient in execution, and much more reliable, [but] require hard work and discipline to achieve…” — Edsger Dijkstra

## General

- Zero technical debt: "do it right the first time to the best that you know how, because you may not get another chance, and because quality builds momentum".
- The happiest path handles the error first, the empty case second, and data case last.

## Variables

- Use camelCase.
- Names should be big edian, by most significant word first. If it helps imagine variables as dates, a good variable name is yearMonthDayTime.
- Define variables closest to usage to close semantic gaps in time and space.

## Classes

- Within a class definition favour method reuse over reimplementation to achieve operation predictability.
- Utility methods in Classes should be private and only used by other methods in the class.
- Utility methods in Classes should only depend on other private utility methods, never public methods.

## Canvas drawing

- Always open with a new path `beginPath()`.
- Apply styles as close as possible, e.g. right before drawing.

## Errors

- Input errors throw instead of falling back.
- Errors are codified like TypeScript's.

## Documentation

- Code in `/lib` should use JSDocs (https://jsdoc.app/)

## Folder structure

`/src` - root directory
 ⎿ `/core` - core functionality
 ⎿ `/modules` - domain specific functionality

Modules can import from core, but core cannot import from modules.

## Patterns

abdraw leverages several design patterns and datastructures. To work effective on the project you'll need to learn them:

- [template method pattern](https://refactoring.guru/design-patterns/template-method): Graphic class and Graphic subclasses
- [composite pattern](https://refactoring.guru/design-patterns/composite): drawing Domains in a Chain
- linked list: Chain class
- singleton: Canvas class