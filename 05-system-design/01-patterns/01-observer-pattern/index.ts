import { TerrainObservable } from "./src/observable";
import { RandomEncounterObserver } from "./src/observer";

const terrainObservable = new TerrainObservable();

const randomEncounterObserver = new RandomEncounterObserver(terrainObservable);

terrainObservable.attachObserver(randomEncounterObserver);

terrainObservable.terrainUpdatedToWater(); // should log to console
terrainObservable.terrainUpdatedToWater(); // should log to console
terrainObservable.terrainUpdatedToWater(); // should log to console

terrainObservable.detachObserver(randomEncounterObserver);

terrainObservable.terrainUpdatedToWater(); // should NOT log to console