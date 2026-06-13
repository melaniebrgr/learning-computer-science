class Node {
  #data: any;
  #pointer: null | Node = null;

  constructor(data: any, pointer: null | Node) {
    this.#data = data, this.#pointer = pointer;
  }

  toString() {
    return `Node: ${this.#data}`
  }
}

class LinkedList() {
  construc
}