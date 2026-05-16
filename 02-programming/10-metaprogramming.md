# Metaprogramming

Two main types: macros and reflection

## Macros

For example, using sweet.js to write code that add's new capabilities to the language. The code needs to be compiled or turned into the file output before execution or "macro expansion time".

## Reflection

Takes place during code run time.

- Introspection: Introspection is read-only. The code inspects itself at run time.
- Self-modification: Self‑modification is about rewriting the program’s own code or behavior “from the inside” as it runs. Code modifies itself at run time, e.g. the “grumpy sum” example replaces its own implementation after a certain condition is passed (`a > 5`).
- Intercession: Intercession is write-capable: the program can modify the reified representation of itself or its runtime so that execution changes. In JavaScript, Proxies are a canonical intercession mechanism: they let you trap operations like property get/set, call, or construct and implement custom behavior

This can be useful, we want "as much expressivity as possible to solve out problems".