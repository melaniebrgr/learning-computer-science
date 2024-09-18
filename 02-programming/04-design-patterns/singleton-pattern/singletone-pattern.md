# Singleton pattern

> Ensure a class has a single instance and provide a global point of access to it.

The Singleton pattern is acutally considered to be a code smell and best avoided for the reasons the we avoid globals in general:

1. They make it harder to reason about the code since we need to understand all the points that modiffy it when there's a bug
2. Encourage coupling between modules
3. Aren't concurrency friendlt
4. Are difficult to refactor, since they require touching every file the singleton is accessed.

## References

- [x] "Game Programming Patterns" by Rober Nystrom, Chapter 6
- [x] [Singleton Pattern – Design Patterns (ep 6)](https://www.youtube.com/watch?v=9qA5kw8dcSU)