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
Its not necessary to create an index for every "column", just the columns you know you will need to sort or filter.

Cursors are analogous to a for loop. Value or values are returned sequentially to do something with.
However as a transaction it is not long-lived. The transaction wants to complete.

#### Third-party libs

[IDB-Keyval](https://www.npmjs.com/package/idb-keyval/v/3.0.0)

By Jake Archibald. This is only a keyval store, so tiny at 0.5 kB. For iteration & indexing a different library is necessary. The IDB-Keyval and ID library is very clean, clear and easy to use. Could be the fastest most convenient way to go that is sufficient to our needs. <https://snyk.io/advisor/npm-package/idb-keyval>

[IDB](https://www.npmjs.com/package/idb)

Also by Jake Archibald. Health: <https://snyk.io/advisor/npm-package/idb>

- 82.5 kB unpacked
- 43 issues, last updated a year ago, snyk health 79/100
- TS support

[Dexie](https://dexie.org/)

Was used in a [SvelteKit PWA app example](https://www.closingtags.com/enabling-persistent-storage-in-indexeddb/). "Dexie doesn’t provide a way to instantiate or mark a database as 'persistent.'" Health: <https://snyk.io/advisor/npm-package/dexie>.

- Lightweight and minimalistic wrapper
- 2.98 MB unpacked, 29 kB minified and gzipped
- 558 issues, last updated a week ago, snyk health 95
- Promise-based API
- Provides transactions, indexes, and querying
- Well-documented
- TS support

#### Storage persistence

Storage limits are specific to each browser and its underlying data storage implementation.
When the limit is reached, either non persistent data will get evicted, depending on persistence, or new data will fail to be written to the storage.
You might want to show your user how much storage is available, or you might want to take actions when storage reaches a certain percent of available storage.

Browsers use a Least Recently Used (LRU) policy to deal data eviction. The data from the least recently used origin is deleted and on.

##### Persistence "level 1": Best-effort (default)

IndexedDB is a “best-effort” database. The data that's stored by IndexedDB is managed by a storage management system that's specific to each browser. Different browsers have different storage quotas and eviction policies.

> research from the Chrome team shows that data is very rarely deleted by the browser. If a user visits a website regularly, there is very little chance that its stored data, even in best-effort mode, will get evicted by the browser.

So in general, if a user visits a website regularly, there is very little chance that its stored data in best-effort mode will get evicted by the browser. However there are no guarantees and at anytime the user’s browser or user themselves could remove IDB data store.

While typically only happens when device storage is running low, e.g. in situations of low disk space or for another website's data that was used more recently. In these case the browser can delete the database without notifying the user. Users of the application could be fairly upset to discover their precious data have mysteriously disappeared.

##### Persistence "level 2": Persistent (with Storage API)

Data stored this way is only evicted, or deleted, if the user chooses to, by using their browser's settings. If persistent storage is necessary, e.g. when building a web app that relies on critical data that isn't persisted anywhere else, then using the StorageManager API can help make sure the data is persisted. In the app boostrap code the `StorageManager API` needs to be called:

```js
async function persist() {
  return await navigator.storage && navigator.storage.persist &&
    navigator.storage.persist();
}
```

This is still not a guarantee though as in some browsers a prompt is displayed to the user that they can decline. There also may no be enough space on disk. A message can be displayed to the user so they are aware if it is persisted or no.

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
- For "best-effort" storage maximum storage capacity is 10% of the total disk size where the profile of the user is stored, or 10 GiB for all origins that are part of the same group, whichever is smaller.
- For "persistent" storage capacity is 50% of the total disk size, capped at 8 TiB, and are not subject to a group limit.

Chrome/Chromium

- Chrome automatically approves or denies the request based on the user's history of interaction with the site and does not show any prompts to the user.
- an origin can store up to 60% of the total disk size in both persistent and best-effort modes.
- In Chrome, the “persistent” or “best-effort” mode is not decided by the end user but is based on how the user has interacted with the application, so it might actually be the case that your application is already allowed to be “persistent” without prompting the user for that permission.
- An origin can store up to 60% of the total disk size in both persistent and best-effort modes.

Safari

- Safari automatically approves or denies the request based on the user's history of interaction with the site and does not show any prompts to the user.
- Safari proactively evicts data when cross-site tracking prevention is turned on.
- If an origin has no user interaction, such as click or tap, in the last seven days of browser use, its data created from script will be deleted.
- Safari allots up to around 20% of the total disk space for each origin.
- When cross-site tracking prevention is turned on, Safari proactively evicts data in 7 days.

Mobile browsers???

## TL;DR

- IDB is a document store that can be accessed transactionally (get, update, delete)
- Store JS data including numbers, strings, and Files and Blobs
- Suitable for storing, updating, getting records (see example, `index.html`)
- Provides conveniences of RDBMS', e.g. indexing and cursors
- Two levels of storage, "with little change of data eviction in practise"

Proposal:
Levelrage it for rapid prototyping of returning user experience and iteration. Data persistance sounds sufficient for this purpose. At the same time store the data that will be necessary to recreate the experience in future to AWS BE (filenames, title added to metadata.json). It's not a long term solution but neither would be AWS BE. Would still need to hold a reference to a "guest ID" that can be cleared.

Advantages: Fast for user, no network, can iterate on design more rapidly, can convert to more robust BE arch later, privacy, same permanence as AWS BE solution effectively.

Disadvantages: Effectively permanent is not permanent. Users can always clear their storage, browsers could always evict it

## References

1. https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
2. https://web.dev/articles/origin-private-file-system
3. Persistence
    1. https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
    2. https://dexie.org/docs/StorageManager
