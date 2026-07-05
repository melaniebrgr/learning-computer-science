/*
  #nodes
    └─ 'vh'  →  [vh.id, vh.id]
  #edges
    └─ 'disulfide'  →  [[vl.id, vh.id], [ch.id, ch.id]]
*/

class HeteroGraph<TNode, TEdge, TId> {
  #nodes: Map<TNode, Set<TId>> = new Map()
  #edges: Map<TEdge, [TId, TId][]> = new Map()

  /**
   * Insertion method: Adds a node to the graph.
   */
  protected addNode(type: TNode, id: TId) {
    // @ts-expect-error: es2025 update
    const nodeSet: Set<TId> = this.#nodes.getOrInsert(type, new Set());
    nodeSet.add(id)
  }

  /**
   * Insertion method: Adds an edge to the graph.
   */
  protected addEdge(typeSrc: TNode, typeEdge: TEdge, typeTgt: TNode, idSrc: TId, idTgt: TId) {
    this.addNode(typeSrc, idSrc);
    this.addNode(typeTgt, idTgt);

    // @ts-expect-error: es2025 update
    const edgesList: [TId, TId][] = this.#edges.getOrInsert(typeEdge, []);
    edgesList.push([idSrc, idTgt])
  }

  /**
   * Utility method: Gets the hetero graph as a string representation.
   * @return {string} The hetero graph string.
   */
  toString() {
    const nodesCount = this.#nodes.size
    const edgesCount = [...this.#edges.values()].flat().length
    if (nodesCount === 0) return `HeteroGraph (nodes 0, edges 0)`
    const edgeTypes = [...this.#edges.keys()]
    return `HeteroGraph (nodes ${nodesCount}, edges ${edgesCount}): ${edgeTypes.join(', ')}`
  }
}

export { HeteroGraph }