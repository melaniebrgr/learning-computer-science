# Visitor pattern

Use visitor when you need to do a calculation across complex data structures.
This is a rarer pattern, but one that is used every day for compiled languages.

Example problem:
A menu has menu items, and each menu item has ingredients, creating a tree like structure. It could be a graph from a composite patterns or simply a complex graph of nodes. You need to iterate and/or over each node