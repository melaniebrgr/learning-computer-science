# IndexedDB (IDB) vs origin private file system (OPFS)

## Week 44 project journaling

We could store the summary File/string/Blob received from OpenAI on the user's device
The S3 object key could be used as they client storage key.
With OPFS instead of waiting for stream to complete we can stream to the file system.

### IDB

IDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs (1).
It is a transactional database system, like an SQL-based RDBMS, but JavaScript-based and object-oriented (1).
IndexedDB follows a same-origin policy meaning data within a domain can be accessed but not across different domains.

IndexedDB can be accessed from service worker connected to the page.
therefore can be used as PWAs.
therefore can be persistent client data source.
Contrast with localstorage, indexeddb, and cached content that can be cleared at will and are cleared regularly by some browsers after 1-2 weeks.
Different browsers have different storage quotas and eviction policies.
PWAs can "protect" the indexed DB.

The database schema needs to be specified
A connection to your database needs to be opened
A series of transactions will retrieve and update data within the database.
Interaction with IndexedDB is request based.
Operations are asynchronous so they don't block the browser.

Anything that is structured clonable can be saved in IDB including numbers, dates, objects, Files and blobs, i.e. anything that can be copied.

#### versioning, creating, deleting stores
  // Triggered if something goes wrong opening or creating the DB
  // Everytime the database is opened, success is triggered regardless of the version number
  // ONLY changing the version number will trigger the upgradeneeded event
  // I.e. it is executed only if a new version is detected
  // This event is the only place a DB store can be created
  // Since the script is executed when an upgrade is detected need to make sure it is safe to run multiple times
  // Optionally specify which key shouldbe the unique identifying object

#### Observations

The IDB library is very clean, clear and easy to use. Could be the fastes most convenient way to go.

- [IDB-Keyval](https://www.npmjs.com/package/idb-keyval/v/3.0.0): By Jake Archibald. This is only a keyval store, so tiny at 0.5 kB. For iteration & indexing a different library is necessary. Ideally this is sufficient for our needs.
- [IDB](https://www.npmjs.com/package/idb): Also by Jake Archibald.

### OPFS

There are two ways of using the origin private file system: on the main thread or in a Web Worker. Web Workers cannot block the main thread, which means in this context APIs can be synchronous, a pattern generally disallowed on the main thread.

With OPFS we can stream data into a file by calling createWritable() which creates a FileSystemWritableFileStream to that you then write() the contents and theb close() the stream.

### Questions

1. While working with IndexedDB data (setting, updating); the data may become stale. How to keep it fresh?

## References

1. https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
2. https://web.dev/articles/origin-private-file-system