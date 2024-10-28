# IndexedDB (IDB) vs origin private file system (OPFS)

## Week 44 project journaling

We could store the summary File/string/Blob received from OpenAI on the user's device
The S3 object key could be used as they client storage key.
With OPFS instead of waiting for stream to complete we can stream to the file system.

### IDB

IndexedDB (IDB) provides client-side storage for significant amounts of structured data, including files/blobs (1).
It is a transactional database system similar to a SQL RDBMS' but JavaScript-based and document (object) oriented (1).
IndexedDB follows a same-origin policy meaning data can only be accessed if it is on the same domain (HTTPS protocol, hostname and port).
IndexedDB can be accessed from service worker connected to the page and therefore can be used as PWAs.
Interaction with IndexedDB is request-based, and operations are asynchronous so they don't block the browser.
Anything that is structured clonable can be saved in IDB including numbers, dates, objects, Files and blobs, i.e. anything that can be copied.

Basic steps:

1. Open a connection to IDB DB and create a store/collection.
2. Use a series of transactions to retrieve and update data within the database.
3. Use versioning to make updates to the database schema

Changing the version number is the only thing that triggers the `upgradeneeded` event.
The `upgradeneeded` event is the only place a DB store can be created.
in upgradeneeded you can not do anything with the data itself, it is just for creating the DB, creating, stores/collections, indexes.
Since the script is executed when an upgrade is detected you need to make sure it is safe to run multiple times.
Everytime the database is opened, a success callback is triggered regardless of the version number.
Callback functions can be triggered if something goes wrong opening or creating the DB.

Adding a key-value will insert a new record: pay attention that the key is unique or you will get an error.
Which key should be used to uniquely identify object can optionally be specified.
Attempting to store more than an origin's quota using will fail with a QuotaExceededError exception.
Deleting a record requires the key only.
Updating requires a valid key and updates the corresponding record.
The abort method allows you to kill a transaction.

Can create an index for a particular key path for more convenient look up of the data in a collection.
An index can be created for a property like "last_updated", then IDB utilities like lower bound and upboound can be used get records with the range.
So when getting adn displaying records, setting up an index for it is a no brainer.

#### Third-party libs

- [IDB-Keyval](https://www.npmjs.com/package/idb-keyval/v/3.0.0): By Jake Archibald. This is only a keyval store, so tiny at 0.5 kB. For iteration & indexing a different library is necessary. The IDB-Keyval and ID library is very clean, clear and easy to use. Could be the fastest most convenient way to go that is sufficient to our needs.
- [IDB](https://www.npmjs.com/package/idb): Also by Jake Archibald.
- [Dexie](https://dexie.org/): Was used in a [SvelteKit PWA app example](https://www.closingtags.com/enabling-persistent-storage-in-indexeddb/), but "Dexie doesn’t provide a way to instantiate or mark a database as 'persistent.'"

#### Storage persistence

##### Persistence "level 1": Default

IndexedDB by default is just a “best-effort” database. At anytime the user’s browser could remove IDB data stored within application’s database. This typically only happens when device storage is running low, i.e. in situations of low disk space on a device it can be erased or for another website's data that was used more recently. In these case the browser can delete the database without notifying the user in case it needs to free up space. Users of the application could be fairly upset to discover their precious summaries has mysteriously disappeared.

If a user visits a website regularly, there is very little chance that its stored data, even in best-effort mode, will get evicted by the browser.

If, for any reason, developers need persistent storage (e.g., when building a web app that relies on critical data that isn't persisted anywhere else), they can do so by using the navigator.storage.persist() method of the Storage API.

The data that's stored by using other web technologies, such as IndexedDB, Cache API, or File System API (which defines the Origin Private File System), is managed by a storage management system that's specific to each browser.
Different browsers have different storage quotas and eviction policies.

##### Persistence "level 2": Storage API

Whether the client-side database is persistent can be checked with a call to isStoragePersisted().
prompt the user to enable persistent storage and in the prompt’s callback, call persist(). This then triggers the browser prompt which asks the user if it’s alright to enable persistent storage for the application.

```js
async function persist() {
  return await navigator.storage && navigator.storage.persist &&
    navigator.storage.persist();
}

```

```js
onMount(async() => {
  const status = await isStoragePersisted();
  if(!status) {
    confirmDialog('Make storage persistent now?', persist, console.log('denied'), true); // Toast?
  }
});
```

##### Persistence "level 3": Service Worker

Setting up a PWA is the only way to make it more permanent.

##### Browser differencdes

Firefox

- In Firefox, when a site chooses to use persistent storage, the user is notified with a UI popup that their permission is requested.

Chrome/Chromium

- Safari and most Chromium-based browsers, such as Chrome or Edge, automatically approve or deny the request based on the user's history of interaction with the site and do not show any prompts to the user.
- an origin can store up to 60% of the total disk size in both persistent and best-effort modes.

Safari

- Safari and most Chromium-based browsers, such as Chrome or Edge, automatically approve or deny the request based on the user's history of interaction with the site and do not show any prompts to the user.
- Data is evicted roactively, for origins that aren't used regularly, only in Safari.
- Safari proactively evicts data when cross-site tracking prevention is turned on.
- If an origin has no user interaction, such as click or tap, in the last seven days of browser use, its data created from script will be deleted.

Mobile browsers?

### Questions

1. While working with IndexedDB data (setting, updating); the data may become stale. How to keep it fresh?

## References

1. https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
2. https://web.dev/articles/origin-private-file-system
3. Persistence
    1. https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
