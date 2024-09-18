import { IObservable, IObserver } from "./types";

class Observer implements IObserver {
  observable;

  constructor(observable: IObservable) {
    this.observable = observable;
  }

  onNotify(): void {}
}

const TERRAIN = {
  山: '山', // shān 🏔️ mountain
  草: '草', // cǎo 🌱 plain
  滨: '滨', // bīn 🏝️ beach
  水: '水', // shuǐ 🌊 water
} as const;

export class RandomEncounterObserver extends Observer {
  onNotify(): void {

    if (this.observable.state === TERRAIN.水) {
      console.log('Fed the sharks.');
    }

    if (this.observable.state === TERRAIN.山) {
      console.log('Climbed a mountain.');
    }
  }
}