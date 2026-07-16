import { HeteroGraph } from "@core/graph-hetero";
import type { UUID } from "@core/uuid";
import { Entity, EntityBond } from "./entity";
import { type TypeEntity, type TypeBond, TYPE_ENTITY } from "./entity.type";
import { GraphicBond } from "./graphic-bond";
import { type Drawable } from "./traits.type"
import { canvasCtx2D } from "./canvas"

const c = canvasCtx2D.getInstance("canvas");
class Bonds extends HeteroGraph<TypeEntity, TypeBond, UUID> implements Drawable {
  #bonds: EntityBond[] = []

  constructor() {
    super()
  }

  public add(entity1: Entity, typeBond: TypeBond, entity2: Entity) {
    this.addEdge(entity1.type, typeBond, entity2.type, entity1.id, entity2.id)
    const bond = new EntityBond(TYPE_ENTITY.SS, new GraphicBond(c, { x: 10, y: 10, lineColour: 'yellow' }))
    this.#bonds.push(bond)
    return bond
  }

  public draw() {
    // TO DO
  }
}

export { Bonds }