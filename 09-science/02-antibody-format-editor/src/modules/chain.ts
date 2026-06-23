import { LinkedList } from "../core/linked-list/linked-list";
import type { Drawable } from "./graphic";

class Chain<TData> extends LinkedList<TData> implements Drawable {
  public constructor() {
    super()
  }

  draw() { }
}

export { Chain }
