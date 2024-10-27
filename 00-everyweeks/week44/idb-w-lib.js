import { createStore, del, get, set, update, keys, values, entries } from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm';

const store = createStore('mels-store', 'mels');

// Set inserts or updates a value in the store specified
set('user_id', 1, store);

set('user_id', 3);

set('user_info', {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@email.com',
});

// Get the value for specific key
get('user_info')
  .then(console.log)
  .catch(console.warn);

// Get the value and adjust it
update('user_id', (id) => id + 1);

get('user_id')
  .then(console.log)
  .catch(console.warn);

// Deletes the key
del('user_id');

keys()
  .then(console.log)
  .catch(console.warn);

values()
  .then(console.log)
  .catch(console.warn);

// Get all entries as an array
entries()
  .then(console.log)
  .catch(console.warn);

const file1 = new File(['Hello, World!'], 'hello-world.txt', { type: 'text/plain' });
const file2 = new File(['Hello, World!!!'], 'hello-world-again.txt', { type: 'text/plain' });

set('file', file1, store);

get('file')
  .then(console.log)
  .catch(console.warn);

update('file', () => file2);

get('file')
  .then(console.log)
  .catch(console.warn);