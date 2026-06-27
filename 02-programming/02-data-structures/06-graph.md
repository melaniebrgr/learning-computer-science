### Graph

A data structure to represent relationships between entities. Conceptually, a graph is made of nodes or vertices and edges, e.g. in a social network can represented as a graph where people are the nodes and the edges are the connections between them. There are diferent types of graphs:

- directed: edges have a direction `A → B` but B does not point to A
- undirected: edges are bidrectional `A → B` and `A ← B`
- weighted: edges have extra data associated with them, like a cost
- unweighted: edges do no have extra data
- cyclic: has at least one cycle where by following edges you can arrive back at a node you had visited before
- acyclic: a directed acyclic graph (DAG) does not have any cycles

The simplest way to store a graph concepturally is to add a vertex and edges to a set, i.e.g via a simple `GraphEdgeSet` class. If you only care about drawing the edges and vertices, not finding neighbours, this is a sufficient data structure. For large and dens graphs, there are more time efficient reprensentations, such as an **adjacency graph** and **adjacency matrix**.

Graphs can be represented in an **adjacency matrix**, a V ⨉ V 2D array were V is the number of vertices. If there is an edge between nodes then the value is 1 at that position. If the graph is weighted then the weights are listed instead of simple binary. Adjacency matrices are good for dense graphs or when you need to check if an edge exists between two nodes. In an **adjacency list**, each list item stores a list of neighbours which is more space effecient and better suited for sparse graphs.


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

### References

1. [A gentled introduction to graph data structure](https://www.youtube.com/watch?v=xN5VGzK9_FQ)
2.[Data Structures: Undirected Graphs, EdgeSet Graph Data Structure](https://www.youtube.com/watch?v=3SkK2aNa2V8)