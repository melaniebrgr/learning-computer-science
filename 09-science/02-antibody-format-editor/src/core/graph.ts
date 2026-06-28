import type { UUID } from "./uuid";

const TYPES_NODE = ['domain', 'sugar', 'drug', 'his-tag', 'biotin'] as const;
type TypesNode = (typeof TYPES_NODE)[number];

const TYPES_EDGES = ['disulfide', 'generic'] as const;
type TypesEdges = (typeof TYPES_EDGES)[number];

class HeteroGraph {
  // Stores nodes: {node_type: set(node_ids)}
  // e.g. { domain: [ 'uuid1', 'uuid2', 'uuid3' ] }
  #nodes: Map<TypesNode, Set<UUID>> = new Map();
  // Stores edges: {(src_type, rel_type, tgt_type): dict(src_id -> set(tgt_ids))}
  // e.g. { ['domain', 'disulfide', 'domain']: { 'uuid1': ['uuid2'] } }
  #edges: Map<[TypesNode, TypesEdges, TypesNode], Map<UUID, Set<UUID>>> = new Map();

  public addNode(type: TypesNode, id: UUID) {
    // if (!this.#nodes.has(type)) {
    //   this.#nodes.set(type, new Set())
    // }
    // @ts-expect-error: es2025 update
    const set: Set<UUID> = this.#nodes.getOrInsert(type, new Set());
    set.add(id)
  }
}

export { HeteroGraph }