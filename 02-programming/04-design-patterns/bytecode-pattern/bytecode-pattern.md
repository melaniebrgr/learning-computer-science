# Bytecode pattern

The Bytecode pattern is about how behavior is represented and executed at runtime (instructions + interpreter/VM). While it introduces a mini architecture, the key benefit is changing behavior by swapping instruction streams (data). It creates a domain specific instruction set.

Use it when you have a lot of behaviour you need to define and the implementation language isn't a good fit for the target user. For example, **if you want to create a interface that will allow modding** of elements of a game. The instructions become data--integers in this example instead of bytecode--and the behaviour is interpreted by the VM with a stack-based machine.

A stack-based VM is one, albeit over very simple way to reason about interpretation of instructions.

A related pattern is "Interpretor", YAML is an example of a DSL format.

References

- https://sourcemaking.com/design_patterns/interpreter