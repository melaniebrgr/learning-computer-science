import type { UUID } from "./uuid";

const TYPES_NODE = ['domain', 'sugar', 'drug', 'hinge', 'linker', 'tag'] as const;
type TypesNode = (typeof TYPES_NODE)[number];

const TYPES_EDGES = ['backbone-peptide', 'sidechain-disulfide'] as const;
type TypesEdges = (typeof TYPES_EDGES)[number];

class HeteroGraph {
  #nodes = new Map<TypesNode, UUID>();
}