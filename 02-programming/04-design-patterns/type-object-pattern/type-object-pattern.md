# Type object pattern

This pattern is useful for cases when you might have hoards of slightly varyting subclasses with similar properties e.g.

- a creature battler card game with many cards of many different creatures that all have attack, health and cost stats, e.g. Inscryption, Magic the Gathering
- a creature battler with many different creatures that all have attack, health and cost stats, e.g. Pokemon

Instead of creating a new subclass for each type, a more easily tunable system is to extract the information as data, e.g. creatureTypes.json, and have a another class the references the creature type.

```bash
# bun run type-object-pattern/index.ts
This spirit has 1 hostility, 0 bravery, and 4 energy
This spirit has 1 hostility, 1 bravery, and 4 energy
This spirit has 0 hostility, 1 bravery, and 4 energy
This spirit has 7 hostility, 0 bravery, and 4 energy
```

```bash
# bun run type-object-pattern/index.ts
This spirit has 1 hostility, 1 bravery, and 4 energy
This spirit has 1 hostility, 1 bravery, and 4 energy
This spirit has 1 hostility, 0 bravery, and 4 energy
This spirit has 0 hostility, 0 bravery, and 4 energy
```
