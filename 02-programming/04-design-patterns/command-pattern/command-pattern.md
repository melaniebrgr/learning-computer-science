# Command pattern

Actualising the actions of your system into discrete objects with a common interface ("command packets"), so that they can be attached to different events, passed around, queued, dispatched or whatever else you can imagine. On implementing the Command pattern, you will have in your system many command packets pinging around with the following shape:

```js
// stabCommand
{
  execute: (enemy) => { actor.stab(enemy); }
  undo: (enemy) => { enemy.heal(); }
}
```

The advantages of the Command pattern are the utter convenience of attaching and unattaching commands to certain events, undoing and redoing individual commands, or undoing and redoing chains of commands assuming commands are stored in a queue. See full example from `./index.ts`.

## References

- [x] "Game Programming Patterns" by Rober Nystrom, Chapter 2
- [ ] Headfirst Design Patterns
- [x] [Command Pattern – Design Patterns (ep 7)](https://www.youtube.com/watch?v=9qA5kw8dcSU)
- [ ] [Refactoring Guru](https://refactoring.guru/design-patterns/command)
