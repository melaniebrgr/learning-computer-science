import { Domain } from "./domain";
import type { Drawable, Identifiable, UUID } from "./traits.type";
import { LinkedList } from "../core/linked-list/linked-list";

class Chain extends LinkedList<Domain> implements Drawable, Identifiable {
  #id: UUID;

  public constructor() {
    super()
    this.#id = crypto.randomUUID();
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
