# Observer pattern (or subject-observer, or publisher-subscriber)

Useful when one or more components need to react to a change in state of another component.
Has two components: a observable and it's observer. The observable notifies all its observers that it has changed. The observer in turn does something about it.

> The observer pattern is a great way to let those mostly unrelated lumps (like physics and notifications) talk to each other without them merging into one big lump. It's less useful within a single lump of code dedicated to one feature or aspect.

- **Observable (publisher/subject)**: A subject maintains a list of observers that are interested in its state by exposing public methods for adding and removing observers. When the subject's state changes, it executes its list of observers. One observable can have many observers, i.e. it has a one to many relationship.
- **Observer (subscriber)**: An observer wants to get notified when one or more subjects in a system changes state. For example, an "Achievements" observer wants to get notified and take an action when a user kills 100 monsters, completes a quest, or finds a hidden path. In order to accomplish this, it needs to observe the MonsterSubject, the QuestSubject, and MapSubject. One observer can be registered to many different subjects.

There are variations on the implementation of the pattern. For example, a reference _could_ be passed into the observer on instantiation, so that on notify the observer can get the state of the observable directly. However, this couples the observable to the observer. In another variation, the observer is a plain function and the observable passes data to the observer when they're called.

## References

- [ ] Game Programming Patterns: Chapter 4, Observer
- [ ] [Observer Pattern Tutorial](https://www.youtube.com/watch?v=cR8P1HZAyP8)
