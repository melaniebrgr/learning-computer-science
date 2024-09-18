import { TerrainObservable } from "./src/observable";
import { RandomEncounterObserver } from "./src/observer";

const terrainObservable = new TerrainObservable();

const randomEncounterObserver = new RandomEncounterObserver(terrainObservable);

terrainObservable.attachObserver(randomEncounterObserver); // observer is subscribed to the observable

terrainObservable.terrainUpdatedToWater(); // should log to console
terrainObservable.terrainUpdatedToWater(); // should log to console
terrainObservable.terrainUpdatedToWater(); // should log to console

terrainObservable.detachObserver(randomEncounterObserver); // observer is unsubscribed from the observable

terrainObservable.terrainUpdatedToWater(); // should NOT log to console