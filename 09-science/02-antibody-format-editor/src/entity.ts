import { Graphic } from "./graphic";
import type { EntityType } from "./entity.type";

class Entity {
  #id: string;
  #type: EntityType;
  #graphic: Graphic;

  public constructor(type: EntityType, graphic: Graphic) {
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

export { Entity }