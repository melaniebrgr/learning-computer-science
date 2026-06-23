import type { Drawable } from "./graphic.type";
import type { EntityType } from "./entity.type";

class Entity {
  #id: string;
  #type: EntityType;
  #drawable: Drawable;

  public constructor(type: EntityType, drawable: Drawable) {
    this.#id = crypto.randomUUID();
    this.#type = type;
    this.#drawable = drawable;
  }

  public get id() {
    return this.#id;
  }

  public get type() {
    return this.#type;
  }

  public draw() {
    this.#drawable.draw();
  }
}

export { Entity }