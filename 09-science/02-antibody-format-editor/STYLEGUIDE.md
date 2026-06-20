# abdraw: style guide

> "...simple and elegant systems tend to be easier and faster to design and get right, more efficient in execution, and much more reliable, [but] require hard work and discipline to achieve…” — Edsger Dijkstra

Coding guidelines for the abdraw application inspired by https://tigerstyle.dev/.

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