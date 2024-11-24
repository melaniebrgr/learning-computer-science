# Bytecode pattern

Is like creating a system within a system. A domain specific instruction set.

**Use it when you have a lot of behaviour you need to define and the implementation language isn't a good fit for the target user.**

For example, if you want to create a interface that will allow modding of elements of a game, like a wizard wand. The instructions become data--integers in this example instead of bytecode--and the behaviour is interpreted by the VM with a stack-based machine.

A stack-based VM is one, albeit over very simple way to reason about interpretation of instructions.