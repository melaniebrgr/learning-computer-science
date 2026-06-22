/** Class representing a node */
class Node<TData> {
  #pointer: null | Node<TData> = null;
  #data: TData;

  constructor(data: any, pointer: null | Node<TData>) {
    this.#data = data, this.#pointer = pointer;
  }

  /**
   * Setter method: Set next node to pointer.
   * @param {Node} node - The node.
   */
  set pointer(node: Node<TData>) {
    this.#pointer = node
  }

  /**
   * Getter method: Get next node from pointer.
   * @return {Node} The node.
   */
  get pointer() {
    return this.#pointer
  }

  /**
   * Getter method: Get data.
   * @return {TData} The data.
   */
  get data() {
    return this.#data
  }

  /**
   * Introspection method: Get the node as a string.
   * @return {string} The node.
   */
  public toString() {
    return `Node: ${this.data}`
  }
}

export { Node }