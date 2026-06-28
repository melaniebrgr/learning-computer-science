# abdraw: readme

## Modules

### Chain

"A linked list is a sequences of nodes linked via pointers, which allow for efficient insertions and deletions without rearranging the entire sequence."

### Entity

An **entity** is the main building block of the abdraw canvas. It has a graphic module and an id A domain (VH), a linker, and a drug conjugate are examples of entities.

### Graphic

A graphic module is responsible for actually drawing the pixels. Anything capable of drawing pixels to canvas has a graphic component. For any new drawable, you'll want to extend the base graphic class to create a graphic subclass with custom drawing instructions. This is done by defining a template draw method, `templateDraw`.