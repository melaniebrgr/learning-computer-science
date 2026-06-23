import { Domain } from "./domain";
import type { Drawable } from "./traits.type";
import { LinkedList } from "../core/linked-list/linked-list";

class Chain extends LinkedList<Domain> implements Drawable {
  public constructor() {
    super()
  }

  draw() {
    const it = this.values()
    for (const data of it) {
      data.draw()
    }
  }
}

export { Chain }
