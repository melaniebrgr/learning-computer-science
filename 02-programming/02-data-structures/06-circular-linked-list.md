# Circular linked list

A circular linked list is a data structure where the last node points back to the first node, creating a continuous loop. This is different from a regular linked list, where the last node points to NULL.

The structure allows for endless traversal and is used in applications like round-robin scheduling.

## Circular singly linked list

In Circular Singly Linked List, each node has just one pointer called the "next" pointer. The next pointer of the last node points back to the first node and this results in forming a circle. In this type of Linked list, we can only move through the list in one direction.

## Circular doubly linked list

In circular doubly linked list, each node has two pointers prev and next, similar to doubly linked list. The prev pointer points to the previous node and the next points to the next node. Here, in addition to the last node storing the address of the first node, the first node will also store the address of the last node.