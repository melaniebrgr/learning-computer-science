# Update method pattern

The game loop loops but it also needs to update every player and entity a turn to do something. Where to stuff the update logic though? The update method assumes the game world is a collection of objects. Then each object can implement an abstract update method that simulates one frame of the object's behavior.

Tradeoffs and challenges:

- How will you split the behaviour into frames?
- How will the pause and resume state get stored?
- Objects are updated sequentially but are rendered as if concurrently (a single frame), need to take care when different objects interact with each on update
- Careful updating the objects list during an object update loop

Nts. Iterators with their yield statements might make good update method fodder in JS.