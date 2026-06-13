import { Node } from './node'

/** 
 * Class representation a linked list
 * inpired by https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html#LinkedList--
 * 
 * To do:
 * insert all nodes at index or tail, addAll
 * get node at tail, getLast
 * get node at index or tail, get
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
   * Insertion method: Insert node at the tail or at index position.
   * @param {any} data - The node data
   * @param {undefined | number} pos - The index position
  */
  public add(data: any, pos?: number) {
    if (pos === 0) {
      this.addFirst(data)
    } else if (this.size === 0 || this.size < pos || !pos) {
      this.addLast(data);
    } else {
      let current = this.#head;
      let i = 0;
      while (i < pos - 1) {
        current = current.pointer
        i++
      }
      const node = new Node(data, current.pointer)
      current.pointer = node
      this.#size++;
    }
  }

  /**
   * Getter method: Get node at head.
   */
  public getFirst() {
    if (this.size === 0) {
      return null
    }
    return this.#head.data
  }

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
    return `LinkedList (${this.size}): ${str.join(', ')}`;
  }
}

export { LinkedList }