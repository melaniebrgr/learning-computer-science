### Graph

A simple definition of a graph is a network that helps visualise relationships between components. The components are refered to as vertices or nodes, and the connecting line between them are edges.

> A graph `G = (V,E)` is a sert of vertices `V` and edges `E` where each edge (u,v) is a connection between vertices, `u,v ϵ V`.

More formally, a graph is a non-linear data structure representing a pair of two sets: G={V, E}, where V is the set of vertices (nodes), and E the set of edges (arrows). Vertices are neightbours if an edge connects them. The degree of a vertex is the number of neighbours a vertex has. Paths are some sequence of vertices connected by edges. A vertex can only appear once in path and the path length is the number of vertices in it.

Graphs can be used to model and solve a large range of problems:

- **mapping applications**: Each road intersection is a vertex and the edge between vertices are the roads between.
- **social networks**: Each node represents and individual and the edges are the vertices between them. Friend recommendations are easily solve with graphs.

There are diferent types of graphs:

- **directed**: edges have a direction `A → B` but B does not point to A
- **undirected**: edges are bidrectional `A → B` and `A ← B`
- **weighted**: edges have extra data associated with them, like a cost
- **unweighted**: edges do no have extra data
- **cyclic**: has at least one cycle where by following edges you can arrive back at a node you had visited before
- **acyclic**: a directed acyclic graph (DAG) does not have any cycles
- **homogeneous**: all nodes and edges have the same type
- **heterogeneous**: nodes and edges can have 2 or more types, e.g. nodes are authors or papers, and edges are citations or likes

There are three different ways to represent graphs:

- **adjacency matrix**: The vertices are the columns and rows, if an edge exists, the cell at that coordinate is "filled in".
- **edge set**: The simplest representation. A set that contains tuples of the verticles indicating each edge in the set.
- **adjacency list**: The most common representation. The node is the key and the neighbours list are the values

The simplest way to store a graph concepturally is to add a vertex and edges to a set, or a simple `GraphEdgeSet` class. If you only care about drawing the edges and vertices, not finding neighbours, this is a sufficient data structure. For large and dens graphs, there are more time efficient reprensentations, such as an **adjacency graph** and **adjacency matrix**.

Graphs can be represented in an **adjacency matrix**, a V ⨉ V 2D array were V is the number of vertices. If there is an edge between nodes then the value is 1 at that position. If the graph is weighted then the weights are listed instead of simple binary. Adjacency matrices are good for dense graphs or when you need to check if an edge exists between two nodes. In an **adjacency list**, each list item stores a list of neighbours which is more space efficient and better suited for sparse graphs.


```
    0    1    2    3    4
  +----+----+----+----+----+
0 |  0 |  1 |  1 |  0 |  0 |
  +----+----+----+----+----+
1 |  0 |  0 |  1 |  0 |  0 |
  +----+----+----+----+----+
2 |  0 |  0 |  0 |  0 |  0 |
  +----+----+----+----+----+
```

A heterogenous graph implementation:

```py
class HeteroGraph:
  def __init__(self):
    # Stores nodes: {node_type: set(node_ids)}
    self.nodes = {}
    # Stores edges: {(src_type, rel_type, tgt_type): dict(src_id -> set(tgt_ids))}
    self.edges = {}

  def add_node(self, node_type, node_id):
    if node_type not in self.nodes:
      self.nodes[node_type] = set()
    self.nodes[node_type].add(node_id)

  def add_edge(self, src_type, rel_type, tgt_type, src_id, tgt_id):
    # Ensure nodes exist first
    self.add_node(src_type, src_id)
    self.add_node(tgt_type, tgt_id)
    
    edge_key = (src_type, rel_type, tgt_type)
    if edge_key not in self.edges:
      self.edges[edge_key] = {}
    if src_id not in self.edges[edge_key]:
      self.edges[edge_key][src_id] = set()
        
    self.edges[edge_key][src_id].add(tgt_id)

  def get_neighbors(self, src_type, rel_type, tgt_type, src_id):
    edge_key = (src_type, rel_type, tgt_type)
    return self.edges.get(edge_key, {}).get(src_id, set())
```

### References

1. [A gentled introduction to graph data structure](https://www.youtube.com/watch?v=xN5VGzK9_FQ)
2.[Data Structures: Undirected Graphs, EdgeSet Graph Data Structure](https://www.youtube.com/watch?v=3SkK2aNa2V8)