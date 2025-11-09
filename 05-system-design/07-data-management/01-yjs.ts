import * as Y from 'yjs'

const doc = new Y.Doc();
// Every time you create a Yjs document, you get a new client ID.
console.log(">>> clietnIDs", doc.clientID);

// A top level type because it is directly attached to the Doc
const example = doc.getMap("example");

// Using a map to store an array of todos
const todos = doc.getArray("todos");
const item = { text: "Buy milk", done: true };
todos.push([item]);
console.log(">>> todos", doc.getArray("todos").toJSON());

// Each shared type holds a reference to its parent
const top = doc.getMap('parent');
const child = new Y.Map();
top.set('child', child);
console.log("child references parent", child.parent === top);
console.assert(child.parent === top);