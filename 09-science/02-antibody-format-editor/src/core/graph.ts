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
    // @ts-expect-error: es2025 update
    const nodeSet: Set<UUID> = this.#nodes.getOrInsert(type, new Set());
    nodeSet.add(id)
  }

  public addEdge(typeSrc: TypesNode, typeEdge: TypesEdges, typeTgt: TypesNode, idSrc: UUID, idTgt: UUID) {
    // Ensure nodes exist first
    this.addNode(typeSrc, idSrc);
    this.addNode(typeTgt, idTgt);

    const edgeKey: [TypesNode, TypesEdges, TypesNode] = [typeSrc, typeEdge, typeTgt];
    // @ts-expect-error: es2025 update
    const edgesMap: Map<UUID, Set<UUID>> = this.#edges.getOrInsert(edgeKey, new Map());
    // @ts-expect-error: es2025 update
    const nodeAdjList: Set<UUID> = edgesMap.getOrInsert(idSrc, new Set());
    nodeAdjList.add(idTgt)
  }

  public getNeighbors() {
    // TODO
    const it = this.#edges.entries()
    for (const entry of it) {
      console.log(entry)
    }
  }
}

export { HeteroGraph }