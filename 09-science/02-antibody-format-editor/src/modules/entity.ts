import { type UUID, uuid } from "@core/uuid";
import type { TypeEntity, TypeDomain, TypeDecorator, TypeRegion, TypeBond } from "./entity.type";
import { Graphic } from "./graphic";
import type { Drawable, Identifiable, } from "./traits.type";

class Entity implements Drawable, Identifiable {
  #id: UUID;
  #type: TypeEntity;
  #graphic: Graphic;

  public constructor(type: TypeEntity, graphic: Graphic) {
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

class EntityDomain extends Entity {
  public constructor(type: TypeDomain, graphic: Graphic) {
    super(type, graphic)
  }
}

class EntityRegion extends Entity {
  public constructor(type: TypeRegion, graphic: Graphic) {
    super(type, graphic)
  }
}

class EntityDecorator extends Entity {
  public constructor(type: TypeDecorator, graphic: Graphic) {
    super(type, graphic)
  }
}

class EntityBond extends Entity {
  public constructor(type: TypeBond, graphic: Graphic) {
    super(type, graphic)
  }
}

export { Entity, EntityDomain, EntityRegion, EntityDecorator, EntityBond }