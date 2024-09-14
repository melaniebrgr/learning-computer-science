import { Spawner } from "./src/spawner";
import { gremlin } from "./src/monster";

// A spawner containing a prototype

const gremlin1 = new Spawner(gremlin).spawn();
gremlin.sustainDamage(2);
const gremlin2 = new Spawner(gremlin).spawn();

console.log('Example 1: A spawner containing a prototype')
console.log(`Gremlin 1 spawned with uninjured gremlin has ${gremlin1.health} health`);
console.log(`Gremlin 2 spawned with injured gremlin has ${gremlin2.health} health`);
