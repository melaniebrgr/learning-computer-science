import { IObservable, IObserver } from "./types";

class Observable implements IObservable {
  #observers: IObserver[] = [];

  attachObserver(observer: IObserver) {
    this.#observers.push(observer);
  }
  
  detachObserver(observer: IObserver) {
    this.#observers = this.#observers.filter(o => o !== observer);
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