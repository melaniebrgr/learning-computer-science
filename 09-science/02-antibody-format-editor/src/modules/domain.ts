import { Graphic } from "./graphic";
import type { Type } from "./domain.type";
import type { Drawable, Identifiable, UUID } from "./traits.type";

class Domain implements Drawable, Identifiable {
  #id: UUID;
  #type: Type;
  #graphic: Graphic;

  public constructor(type: Type, graphic: Graphic) {
    this.#id = crypto.randomUUID();
    this.#type = type;
    this.#graphic = graphic;
  }

  public get id() {
    return this.#id;
  }

  public get type() {
    return this.#type;
  }

  public draw() {
    this.#graphic.draw();
  }
}

export { Domain }