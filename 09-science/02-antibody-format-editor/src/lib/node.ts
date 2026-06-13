/** Class representing a node in a linked list */
class Node {
  #pointer: null | Node = null;
  #data: any;

  constructor(data: any, pointer: null | Node) {
    this.#data = data, this.#pointer = pointer;
  }

  get pointer() {
    return this.#pointer
  }

  set pointer(node: Node) {
    this.#pointer = node
  }

  get data() {
    return this.#data
  }

  public toString() {
    return `Node: ${this.#data}`
  }
}

export { Node }