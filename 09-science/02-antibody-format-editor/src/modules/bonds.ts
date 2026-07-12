import { HeteroGraph } from "@core/graph-hetero";
import type { UUID } from "@core/uuid";
import { Entity } from "./entity";
import type { TypeEntity } from "./entity.type";
import { type TypeBond } from "./bonds.type";

class Bonds extends HeteroGraph<TypeEntity, TypeBond, UUID> {
  constructor() {
    super()
  }

  add(entity1: Entity, typeBond: TypeBond, entity2: Entity) {
    this.addEdge(entity1.type, typeBond, entity2.type, entity1.id, entity2.id)
  }
}

export { Bonds }