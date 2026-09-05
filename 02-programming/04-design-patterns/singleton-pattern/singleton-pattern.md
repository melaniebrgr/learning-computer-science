# Singleton pattern

👷 Creational design pattern

> Ensure a class has a single instance and provide a global point of access to it.

The singleton pattern is one of the most used design patterns. It ensures that only a single instance of an object exists and that is has only a single point of access. An example is a database connection where a singleton connections instance is created and reused.

The Singleton pattern is actually considered by some to be a code smell and best avoided for the sames reasons that we avoid globals:

1. They make it harder to reason about the code since we need to understand all the points that modify it when there's a bug
2. Encourage coupling between modules
3. Aren't concurrency friendly
4. Are difficult to refactor, since they require touching every file the singleton is accessed.

## References

- [x] "Game Programming Patterns" by Robert Nystrom, Chapter 6
- [x] [Singleton Pattern – Design Patterns (ep 6)](https://www.youtube.com/watch?v=9qA5kw8dcSU)
- [ ] [The Singleton Pattern Explained and Implemented in Java | Creational Design Patterns | Geekific](https://www.youtube.com/watch?v=tSZn4wkBIu8&list=PLlsmxlJgn1HJpa28yHzkBmUY-Ty71ZUGc&index=2)