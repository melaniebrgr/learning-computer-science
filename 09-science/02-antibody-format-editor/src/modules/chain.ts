import { Domain } from "./domain";
import type { Drawable, Identifiable } from "./traits.type";
import { LinkedList } from "@core/linked-list/linked-list";
import { type UUID, uuid } from "@core/uuid";

class Chain extends LinkedList<Domain> implements Drawable, Identifiable {
  #id: UUID;

  public constructor() {
    super()
    this.#id = uuid();
  }

  draw() {
    const it = this.values()
    for (const data of it) {
      data.draw()
    }
  }

  public get id() {
    return this.#id;
  }
}

export { Chain }
