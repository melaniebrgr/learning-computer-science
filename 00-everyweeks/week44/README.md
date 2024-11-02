# IndexedDB (IDB)

## Week 44 project journaling: Beginner's guide to IndexedDB

## TL;DR

- IDB is a document store that can be accessed transactionally and supports indexs and cursors.
- It stores JS data including numbers, strings, and Files and Blobs--anything that can be copied (structured clonable).
- Two levels of storage persistence, "best effort" and "persistent" but even "best effort" has "little chance of data eviction in practise".

## Introduction

IndexedDB (IDB) provides client-side storage for significant amounts of structured data (1). It is a transactional database system similar to a SQL RDBMS' but is JavaScript-based and document (object) oriented (1). Anything that is structured clonable can be saved in IDB including numbers, dates, objects, Files and blobs, i.e. anything that can be copied.

Interaction with IndexedDB is request-based, and operations are asynchronous so they don't block the browser. Several libraries wrap IDB in a promise-based chainable API for convenience.

IndexedDB can be used from a service worker connected to the page and therefore in PWAs. IndexedDB follows a same-origin policy meaning data can only be accessed by script on the same domain (HTTPS protocol, hostname and port).

### Basic usage

1. Open a connection to IDB DB and create a collection.
2. Use a series of transactions to retrieve and update data within the collection.
3. Apply database schema updates with versioning.

Every time the database connection is opened, a success callback is triggered.
Conversely the only thing that triggers the `upgradeneeded` event is increasing the version number.

The `upgradeneeded` event callback is the only place a DB collection can be created, and in that callback you cannot not do anything with the data itself, it is just for creating collections, indexes, and changing the schema.

Since the success, error and `upgradeneeded` callbacks are repeatedly executed they must safe to run multiple times, i.e. should not try to create a collection of the same name if it already exists.

Adding a key and value to collection inserts a new record.
What key should be used to uniquely identify a record can optionally be specified, but must be unique or you will get an error.
IDB storage capacity is some percentage of the client's device disk space. The exact amount depends on the browser.
Attempting to store more than an origin's quota will cause the translation to fail with a QuotaExceededError exception.

Records can be deleted and updated using their key.
Any in progress transaction can be aborted.

Indexes for particular "columns" can be configure if you need to access or data in a collection that is sorted, or within a certain range.
For example, for a property like "last_updated", if it is indexed then IDB utilities like lower bound and upper bound can be used get records within a range.
It's not necessary to create an index for every "column", but for columns that need to sorted or filtered it's a no brainer.

Cursors are IDB feature available. They are analogous to a for loop and sequentially return a value or values.
However, as a transaction cursors are not long-lived and cannot be used with async callback functions.
The transaction "wants to complete".

What about observing changes. Well, [not so great](https://github.com/WICG/indexed-db-observers/blob/gh-pages/EXPLAINER.md).

> IndexedDB doesn't have any observer support. This could normally be implemented by the needed website (or third party) as a wrapper around the database. However, IDB spans browsing contexts (tabs, workers, etc), and implementing a javascript wrapper that supports all of the needed features would be very difficult and performance optimization of the features would be impossible. This project aims to add IndexedDB observers as part of the specification.

#### Storage persistence

The data that's stored by IDB is handled by a storage management system that's specific to each browser. Different browsers have different storage quotas and eviction policies. When the browser's limit is reached, either data will get evicted, or new data will fail to be written to the storage. Generally browsers use a Least Recently Used (LRU) policy to deal data eviction. It is possible to find how much storage is available and take some action when a percent of available storage is reached.

##### Persistence "level 1": Best-effort (default)

IndexedDB is a “best-effort” database by default.

> [R]esearch from the Chrome team shows that data is very rarely deleted by the browser. If a user visits a website regularly, there is very little chance that its stored data, even in best-effort mode, will get evicted by the browser.

There are no absoluate guarantees that at anytime the user themselves or the users' browsers won't remove the IDB data store. In the case of low disk space, the browser can delete the database without even notifying the user. Users of the application might be reasonably upset to discover their data have mysteriously disappeared.

##### Persistence "level 2": Persistent (with Storage API)

When `persist` is enabled, data is only evicted if the user chooses to. If persistent storage is necessary, e.g. when building a web app that relies on critical data that isn't persisted anywhere else, then using the StorageManager API can help make sure the data is persisted. In the app the `StorageManager API` needs to be called,

```js
async function persist() {
  return await navigator.storage && navigator.storage.persist &&
    navigator.storage.persist();
}
```

This is still not a perfect guarantee that data will be stored, as some browsers may prompt the user to approve the storage first, which they can decline. There also may no be enough space on disk.

To prompt the user to enable persistent storage and in the prompt’s callback, call `persist()`. This then can trigger a prompt asking the user if it’s alright to enable persistent storage for the application. Whether the client-side database is persistent can be checked with a call to `isStoragePersisted()`.

```js
onMount(async() => {
  const status = await isStoragePersisted();
  if(!status) {
    confirmDialog('Make storage persistent now?', persist, console.log('denied'), true); // Toast?
  }
});
```

##### Persistence "level 3": Service Worker

Setting up a PWA is the only way to make it more permanent. Or so I heard. I didn't check this out further though. Level 1 is probably already good enough!

##### Browser differencdes

##### Firefox

- For "best-effort" storage maximum storage capacity is 10% of the total disk size where the profile of the user is stored, or 10 GiB for all origins that are part of the same group, whichever is smaller.
- For "persistent" storage capacity is 50% of the total disk size, capped at 8 TiB, and are not subject to a group limit.
- In Firefox, when a site chooses to use persistent storage, the user is notified with a UI popup that their permission is requested.

##### Chrome/Chromium

- An origin can store up to 60% of the total disk size in both persistent and best-effort modes.
- In Chrome, the “persistent” or “best-effort” mode is not decided by the end user but is based on how the user has interacted with the application, so it might actually be the case that an application is already allowed to be “persistent” without prompting the user for that permission.
- Chrome automatically approves or denies the persist request based on the user's history of interaction with the site and does not show any prompts to the user.

##### Safari

- Safari allots up to around 20% of the total disk space for each origin.
- Safari automatically approves or denies the request based on the user's history of interaction with the site and does not show any prompts to the user.
- When cross-site tracking prevention is turned on, Safari proactively evicts data in 7 days.

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

## Conclusion

IDB is well-positioned for rapid prototyping and evolving the data schema. At a later time the data on the device that is necessary to recreate the finalised user experience can be uploaded to a "permanent" BE.

Advantages: performant user experience, no network delays, iterate on design more rapidly and convert to a robust BE architectire later, high data privacy.

Disadvantages: no guaranteed to persist as users can always clear their storage, and browsers could always evict it.

## References

1. https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
2. https://web.dev/articles/origin-private-file-system
3. Persistence
    1. https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
    2. https://dexie.org/docs/StorageManager
