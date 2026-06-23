import type { Drawable } from "./graphic.type";
import { LinkedList } from "../core/linked-list/linked-list";

class Chain<TData> extends LinkedList<TData> implements Drawable {
  public constructor() {
    super()
  }

  draw() { }
}

export { Chain }
