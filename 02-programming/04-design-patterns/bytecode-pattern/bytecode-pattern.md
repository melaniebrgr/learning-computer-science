# Bytecode pattern

Is like creating a system within a system. A domain specific instruction set.

> Use it when you have a lot of behaviour you need to define and the implementation language isn't a good fit.

For example if you want to create a interface that will allow modding of elements of a game. In this example a stack-based. VM is implemented. The VM is passed an instruction set that can be used with a stack-based VM.

```bash
bun run index.ts
Setting wizard 0 health to 10
Setting wizard 0 agility to 42
Getting wizard 0 health of 69
Setting wizard 0 wisdom to 69
```
