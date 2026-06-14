import { Node } from './node'

/** 
 * Class representation a linked list
 * inpired by https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html#LinkedList--
 * The LinkedList methods never expose the node itself. All operations to the linked list must done throuch class methods.
 * 
 * To do:
 * insert all nodes at index or tail, addAll
 * update note at index or tail, set
 * delete node at head, removeFirst
 * delete node at tail, removeLast
 * delete node at index or tail, remove
 * delete all nodes, clear
 * indexOf
 * contains
 */

class LinkedList {
  #head: null | Node = null;
  #size: number = 0;

  constructor() { }

  /**
   * Utility method: Gets a list iterator of the nodes in the linked list in sequence, starting at the specified index position.
   * @param {undefined | number} pos The start index position.
   * @return {Iterator} The list iterator.
   */
  *[Symbol.iterator](pos?: number) {
    if (pos && this.size <= pos) throw new RangeError()
    let current = this.#head;
    // Fast forwards to the start index position.
    for (let i = 0; i < pos; i++) {
      current = current.pointer;
    }
    while (current) {
      yield current.data;
      current = current.pointer;
    }
  }

  /**
   * Utility method: Gets the linked list as a string representation.
   * @return {string} The linked list string.
   */
  public toString() {
    if (this.size === 0) return `LinkedList (${this.size})`;
    let str = [];
    const it = this[Symbol.iterator]()
    for (const node of it) {
      str.push(`${node}`);
    }
    return `LinkedList (${this.size}): ${str.join(', ')}`;
  }

  /**
   * Utility method: Gets the linked list as a array representation.
   * It returns an array containing all node data in the linked list in proper sequence (from first to last).
   * @param {undefined | number} pos The start index position.   
   * @return {array} The linked list array.
   */
  public toArray(pos?: number) {
    const it = this[Symbol.iterator](pos)
    return [...it]
  }

  /**
   * Insertion method: Inserts node at head.
   * @param {any} data The node data.
   */
  public addFirst(data: any) {
    const node = new Node(data, this.#head);
    this.#head = node;
    this.#size++;
  }

  /**
   * Insertion method: Inserts node at tail.
   * @param {any} data The node data.
   */
  public addLast(data: any) {
    if (this.size === 0) {
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
   * Insertion method: Inserts node at the tail or at index position.
   * @param {any} data The node data.
   * @param {undefined | number} pos The index position.
  */
  public add(data: any, pos?: number) {
    const outOfRange = this.size < pos;
    if (outOfRange) throw new RangeError()
    if (pos === 0 || this.size === 0) {
      this.addFirst(data)
    } else if (pos === undefined) {
      this.addLast(data);
    } else {
      let current = this.#head;
      // Fast forwards to node before insertion index position.
      for (let i = 0; i < pos - 1; i++) {
        current = current.pointer
      }
      const node = new Node(data, current.pointer)
      current.pointer = node
      this.#size++;
    }
  }

  /**
   * Getter method: Gets node at head.
   * @return {null | Node} The first node's data.
   */
  public getFirst() {
    if (this.size === 0) {
      return null;
    }
    return this.#head.data
  }

  /**
   * Getter method: Gets node at tail.
   * @return {null | Node} The last node's data.
   */
  public getLast() {
    if (this.size === 0) {
      return null
    }
    let current = this.#head;
    while (current.pointer) {
      current = current.pointer;
    }
    return current.data;
  }

  /**
   * Getter method: Gets node at the specified index position.
   * @param {undefined | number} pos The position of the node data to return.
   * @return {null | Node} The node data.
   */
  public get(pos: number = 0) {
    const outOfRange = pos < 0 || this.size <= pos;
    if (outOfRange) {
      return null
    }
    const empty = this.size === 0;
    if (empty) {
      return null
    }
    let current = this.#head;
    for (let i = 0; i < pos - 1; i++) {
      current = current.pointer
    }

    return current.data;
  }

  /**
   * Introspection method: Gets the number of nodes in the linked list.
   * @return {number} The size value.
   */
  public get size() {
    return this.#size;
  }
}

export { LinkedList }