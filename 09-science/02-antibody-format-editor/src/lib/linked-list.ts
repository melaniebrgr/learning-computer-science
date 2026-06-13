// Implements partial LinkedList spec, https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html#LinkedList--

/** Class representing a node in a linked list */
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

  set pointer(node: Node) {
    this.#pointer = node
  }
}

/** Class representation a linked list */
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

  /**
   * Insertion method: Insert node at tail.
   * @param {any} data - The node data.
   */
  public addLast(data: any) {
    if (!this.#head) {
      this.addFirst(data)
    } else {
      const node = new Node(data, null)
      let current = this.#head;
      while (current.pointer) {
        current = current.pointer;
      }
      current.pointer = node;
      this.#size++;
    }
  }

  /**
   * Insertion method: Insert node at index position or at the tail.
   * @param {any} data - The node data
   * @param {undefined | number} pos - The index position
  */
  public add(data: any, pos?: number) {
    if (!this.#head) {
      this.addFirst(data)
    } else if (!pos) {
      this.addLast(data);
    } else {
      let current = this.#head;
      if (pos === 0) {
        const node = new Node(data, current);
        this.#head = node;
      }

      if (pos === 1) {
        const node = new Node(data, current.pointer)
        this.#head.pointer = node
      }

      if (pos === 2) {
        const node = new Node(data, current.pointer.pointer)
        this.#head.pointer.pointer = node
      }
    }
  }

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

  /**
   * Introspection method: Get the LinkedList length.
   * @return {number} The size value.
   */
  public get size() {
    return this.#size
  }

  /**
   * Introspection method: Get the LinkedList as a string.
   * @return {string} The LinkedList.
   */
  public toString() {
    let current = this.#head;
    let str = [];
    while (current) {
      str.push(`${current}`);
      current = current.pointer;
    }
    return `LinkedList (${this.#size}): ${str.join(', ')}`;
  }
}

const ll = new LinkedList();
ll.addFirst(100)
ll.addFirst(200)
ll.addFirst(300)
ll.addLast(-100)
ll.add(-200)
ll.add(250, 1)

console.log('>>', ll.toString())