// Implements the LinkedList spec, https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html#LinkedList--

class Node {
  #data: any;
  #pointer: null | Node = null;

  constructor(data: any, pointer: null | Node) {
    this.#data = data, this.#pointer = pointer;
  }

  public toString() {
    return `Node: ${this.#data}`
  }

  get pointer() {
    return this.#pointer
  }
}

class LinkedList {
  #head: null | Node = null;
  #size: number = 0;

  constructor() { }

  /**
   * Insertion method: Insert node at head.
   * @param {any} data - The node data.
   */
  public addFirst(data: any) {
    const node = new Node(data, this.#head);
    this.#head = node;
    this.#size++;
  }
  // insert node at tail, addLast
  // insert node at index or tail, add
  // insert all nodes at index or tail, addAll

  // get node at head, getFirst
  // get node at tail, getLast
  // get node at index or tail, get

  // update note at index or tail, set

  // delete node at head, removeFirst
  // delete node at tail, removeLast
  // delete node at index or tail, remove
  // delete all nodes, clear

  // contains
  // size

  public toString() {
    let current = this.#head;
    let str = [];
    while (current) {
      str.push(`${current}`);
      current = current.pointer;
    }
    return `LinkedList: ${str.join(', ')}`;
  }
}

const ll = new LinkedList();
ll.addFirst(100)
ll.addFirst(200)
ll.addFirst(300)

console.log('>>', ll.toString())