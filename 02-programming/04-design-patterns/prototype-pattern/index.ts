import { Spawner } from "./src/spawner.ts";
import { gremlin } from "./src/monster.ts";

// 1. A spawner class containing a prototype

const gremlinSpawned1 = new Spawner(gremlin).spawn();
gremlin.sustainDamage(2);
const gremlinSpawned2 = new Spawner(gremlin).spawn();

console.log('Example 1: A spawner containing a prototype')
console.log(`gremlinSpawned1 spawned with uninjured gremlin has ${gremlinSpawned1.health} health`);
console.log(`gremlinSpawned2 spawned with injured gremlin has ${gremlinSpawned2.health} health`);

const gremlinAssigned = Object.assign({}, gremlin);
// Errors: TypeError: Cannot access invalid private field (evaluating 'this.#health')
// console.log(`gremlinAssigned asigned with injured gremlin has ${gremlinCreated.health} health`);

const gremlinStructureCloned = structuredClone(gremlin);
// gremlinStructureCloned cloned with injured gremlin has undefined health
// console.log(`gremlinStructureCloned cloned with injured gremlin has ${gremlinStructureCloned.health} health`);

const gremlinCreated = Object.create(gremlin);
// Errors: TypeError: Cannot access invalid private field (evaluating 'this.#health')
// console.log(`gremlinCreated created with injured gremlin has ${gremlinCreated.health} health`);
