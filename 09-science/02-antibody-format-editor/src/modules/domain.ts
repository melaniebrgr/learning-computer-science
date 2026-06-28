import { Graphic } from "./graphic";
import type { Type } from "./domain.type";
import type { Drawable, Identifiable, } from "./traits.type";
import { type UUID, uuid } from "../core/uuid";

class Domain implements Drawable, Identifiable {
  #id: UUID;
  #type: Type;
  #graphic: Graphic;

  public constructor(type: Type, graphic: Graphic) {
    this.#id = uuid();
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