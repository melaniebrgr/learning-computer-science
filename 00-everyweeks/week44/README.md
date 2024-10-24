# IndexedDB (IDB) vs origin private file system (OPFS)

## Week 44 project journaling

### IDB

IDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs (1).
It is a transactional database system, like an SQL-based RDBMS, but JavaScript-based and object-oriented (1).
IndexedDB follows a same-origin policy meaning data within a domain can be accessed but not across different domains.

IndexedDB can be accessed from service worker
therefore can be used as PWAs
therefore can be persistent client data source.
Contrast with localstorage, cached content that can be cleared at will and are cleared regularly by some browsers after 1-2 weeks.
Different browsers have different storage quotas and eviction policies.
PWAs can "protect" the indexed DB.

The database schema needs to be specified
A connection to your database needs to be opened
A series of transactions will retrieve and update data within the database.
Interaction with IndexedDB is request based.
Operations are asynchronous so they don't block the browser.

### OPFS



## References

1. https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
2. https://web.dev/articles/origin-private-file-system