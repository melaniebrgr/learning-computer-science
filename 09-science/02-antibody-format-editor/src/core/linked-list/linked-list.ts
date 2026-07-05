import { Node } from './node'

/** 
 * Class representation of a Linked List
 * The LinkedList methods never expose the nodes directly, on their data. All operations to the linked list is throuch class methods.
 * inpired by https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html#LinkedList--
 */

class LinkedList<TData> {
  #head: null | Node<TData> = null;
  #size: number = 0;

  constructor() { }

  /**
   * Utility method: Gets a list iterator of the nodes in the linked list in sequence from the index position.
   * @param {undefined | number} pos The start index position.
   * @return {Iterator} The list iterator.
   */
  *[Symbol.iterator](pos?: number) {
    let current = this.#head;
    if (pos) {
      if (this.size <= pos) throw new RangeError()
      // Fast forwards to the start index position.
      for (let i = 0; i < pos; i++) {
        current = current.pointer;
      }
    }
    while (current) {
      yield current.data;
      current = current.pointer;
    }
  }

  /**
   * Utility method: Gets a list iterator of the nodes in the linked list in sequence from the index position.
   * @param {undefined | number} pos The start index position.
   * @return {Iterator} The list iterator.
   */
  public values(pos?: number) {
    const it = this[Symbol.iterator](pos)
    return it;
  }

  /**
   * Utility method: Gets the linked list as a string representation.
   * @return {string} The linked list string.
   */
  public toString() {
    return `LinkedList (${this.size})`;
  }

  /**
   * Utility method: Gets the linked list as a array representation.
   * It returns an array containing all node data in the linked list in proper sequence (from first to last).
   * @param {undefined | number} pos The start index position.   
   * @return {array} The linked list array.
   */
  public toArray(pos?: number) {
    const it = this.values(pos)
    return [...it]
  }

  /**
   * Insertion method: Inserts node at head.
   * @param {TData} data The node data.
   */
  public addFirst(data: TData) {
    const node = new Node(data, this.#head);
    this.#head = node;
    this.#size++;
  }

  /**
   * Insertion method: Inserts node at tail.
   * @param {TData} data The node data.
   */
  public addLast(data: TData) {
    if (this.size === 0) {
      this.addFirst(data)
    } else {
      const node = new Node<TData>(data, null)
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
   * @param {TData} data The node data.
   * @param {undefined | number} pos The index position.
  */
  public add(data: TData, pos?: number) {
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
      const node = new Node<TData>(data, current.pointer)
      current.pointer = node
      this.#size++;
    }
  }

  /**
   * Getter method: Gets node at head.
   * @return {null | Node<TData>} The first node's data.
   */
  public getFirst() {
    if (this.size === 0) {
      return null;
    }
    return this.#head.data
  }

  /**
   * Getter method: Gets node at tail.
   * @return {null | Node<TData>} The last node's data.
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
   * @return {null | Node<TData>} The node data.
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