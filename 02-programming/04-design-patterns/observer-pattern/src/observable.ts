import { IObservable, IObserver } from "./types";

class Observable implements IObservable {
  #observers: IObserver[] = [];

  attachObserver(observer: IObserver) {
    this.#observers.push(observer);
  }
  
  detachObserver(observer: IObserver) {
    const i = this.#observers.indexOf(observer);
    this.#observers.splice(i, 1);
  }
  
  notify() {
    this.#observers.forEach(o => o.onNotify())
  }
}

export class TerrainObservable extends Observable {
  #state = '水';

  terrainUpdatedToWater() {
    this.notify();
  }

  get state() {
    return this.#state;
  }
}