import { Clone } from "./monster";

export class Spawner {
  #prototype;

  constructor(prototype: Clone) {
    this.#prototype = prototype;
  }

  spawn() {
    return this.#prototype.clone();
  }
}