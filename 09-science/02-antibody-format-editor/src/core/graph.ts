/*

bonds = {
[disulfide]: [{ id: string, nodes: [idSrc, idTrg] }]

}

*/


class HeteroGraph<TNode, TEdge, TId> {
  #nodes: Map<TNode, Set<TId>> = new Map();
  #edges: Map<[TNode, TEdge, TNode], Map<TId, TId[]>> = new Map();

  protected addNode(type: TNode, id: TId) {
    // @ts-expect-error: es2025 update
    const nodeSet: Set<TId> = this.#nodes.getOrInsert(type, new Set());
    nodeSet.add(id)
  }

  protected addEdge(typeSrc: TNode, typeEdge: TEdge, typeTgt: TNode, idSrc: TId, idTgt: TId) {
    this.addNode(typeSrc, idSrc);
    this.addNode(typeTgt, idTgt);

    const edgeKey: [TNode, TEdge, TNode] = [typeSrc, typeEdge, typeTgt];
    // @ts-expect-error: es2025 update
    const edgesMap: Map<TId, Set<TId>> = this.#edges.getOrInsert(edgeKey, new Map());
    // @ts-expect-error: es2025 update
    const nodeAdjList: TId[] = edgesMap.getOrInsert(idSrc, []);
    nodeAdjList.push(idTgt)
  }

  getNeighbors() {
    // TODO
    const it = this.#edges.entries()
    for (const entry of it) {
      console.log(entry)
    }
  }
}

export { HeteroGraph }