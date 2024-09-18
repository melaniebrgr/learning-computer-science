import { Clone } from "./monster.ts";

export class Spawner {
  #prototype;

  constructor(prototype: Clone) {
    this.#prototype = prototype;
  }

  spawn() {
    return this.#prototype.clone();
  }
}