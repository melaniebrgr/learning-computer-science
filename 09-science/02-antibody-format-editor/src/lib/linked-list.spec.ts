import { describe, expect, test } from 'vitest'
import { LinkedList } from "./linked-list";

describe("LinkedList", () => {
  describe("introspections", () => {
    describe("toString", () => {
      test("gets node data as a string representation (size = 0)", () => {
        const l = new LinkedList();
        expect(l.toString()).toBe('LinkedList (0)')
      })
      test("gets node data as a string representation (size = 2)", () => {
        const l = new LinkedList();
        l.addLast(1)
        l.addLast(2)
        expect(l.toString()).toBe('LinkedList (2): Node: 1, Node: 2')
      })
    })
    describe("toArray", () => {
      test("gets node data as an array representation (size = 0)", () => {
        const l = new LinkedList();
        expect(l.toArray()).toEqual([])
      })
      test("gets node data as an array representation (size = 2)", () => {
        const l = new LinkedList();
        l.addLast(1)
        l.addLast(2)
        expect(l.toArray()).toEqual([1, 2])
      })
    })
  })
  describe("insertions", () => {
    describe("addFirst", () => {
      test("inserts node at head", () => {
        const l = new LinkedList();
        l.addFirst(1);
        expect(l.size).toBe(1);
        expect(l.toString()).toBe('LinkedList (1): Node: 1');
      })
      test("inserts nodes at head", () => {
        const l = new LinkedList();
        l.addFirst(1);
        l.addFirst(2);
        expect(l.size).toBe(2);
        expect(l.toString()).toBe('LinkedList (2): Node: 2, Node: 1');
      })
    })
    describe("addLast", () => {
      test("inserts node at tail", () => {
        const l = new LinkedList();
        l.addFirst(1);
        expect(l.size).toBe(1);
        expect(l.toString()).toBe('LinkedList (1): Node: 1');
      })
      test("inserts nodes at tail", () => {
        const l = new LinkedList();
        l.addLast(1);
        l.addLast(2);
        expect(l.size).toBe(2);
        expect(l.toString()).toBe('LinkedList (2): Node: 1, Node: 2');
      })
    })
    describe("add", () => {
      test("inserts node at index position 0", () => {
        const l = new LinkedList();
        l.add(1);
        l.add(2);
        l.add(3, 0);
        expect(l.size).toBe(3);
        expect(l.toString()).toBe('LinkedList (3): Node: 3, Node: 1, Node: 2');
      })
      test("inserts node at index position 1", () => {
        const l = new LinkedList();
        l.add(1);
        l.add(2);
        l.add(3, 1);
        expect(l.size).toBe(3);
        expect(l.toString()).toBe('LinkedList (3): Node: 1, Node: 3, Node: 2');
      })
      test("inserts node at the tail", () => {
        const l = new LinkedList();
        l.add(1);
        l.add(2);
        l.add(3);
        expect(l.size).toBe(3);
        expect(l.toString()).toBe('LinkedList (3): Node: 1, Node: 2, Node: 3');
      })
    })
  })
  describe("getters", () => {
    describe("getFirst", () => {
      test("gets node data at head (size = 0)", () => {
        const l = new LinkedList();
        expect(l.getFirst()).toBeNull();
      })
      test("gets node data at head (size = 2)", () => {
        const l = new LinkedList(), data = 1;
        l.add(data)
        l.add(2)
        expect(l.getFirst()).toBe(data);
      })
    })
    describe("getLast", () => {
      test("gets node data at tail (size = 0)", () => {
        const l = new LinkedList();
        expect(l.getLast()).toBeNull();
      })
      test("gets node data at tail (size = 2)", () => {
        const l = new LinkedList(), data = 2;
        l.add(1)
        l.add(data)
        expect(l.getLast()).toBe(data);
      })
    })
  })
})