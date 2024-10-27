import { v4 as uuid } from 'https://jspm.dev/uuid';

const DB_ID = 'NotesDB';
const DB_STORE_ID = 'notesStore';
const version = 1;

let db;
let objectStore;

(function initDB() {
  const NotesIDBOpenRequest = indexedDB.open(DB_ID, version);

  NotesIDBOpenRequest.addEventListener('error', (error) => {
    console.error(error);
  });

  NotesIDBOpenRequest.addEventListener('success', (event) => {
    db = event.target.result;
    console.log(">> success", db);
  });

  NotesIDBOpenRequest.addEventListener('upgradeneeded', (event) => {
    db = event.target.result;
    console.info(`>> upgradeneeded: DB updated from ${event.oldVersion} to ${event.newVersion}`, db)

    if (!db.objectStoreNames.contains(DB_STORE_ID)) {
      objectStore = db.createObjectStore(DB_STORE_ID, {
        keyPath: 'id',
      })
    }
  });

  NotesIDBOpenRequest.addEventListener('blocked', (event) => {
    console.log(">> blocked");
  })
})();

(function initApp() {
  document.getElementById('form').addEventListener('submit', handleSubmit);
})();

function handleSubmit (event) {
  event.preventDefault();
  const formData = Object.fromEntries((new FormData(this)).entries());
  console.log('>>> form data:', formData);

  const txStore = createTxStore(DB_STORE_ID, 'readwrite', (event) => {
    console.log('>>> tx complete', event);
  });

  const txRequest = txStore.add({
    id: uuid(),
    ...formData,
  });

  txRequest.onsuccess = (event) => {
    console.log('>>> tx request success:', event);
  };

  txRequest.onerror = (event) => {
    console.error('>>> tx request error:', event);
  };
}

function createTxStore(storeId, mode, successCallback) {
  const tx = db.transaction(storeId, mode);
  const txStore = tx.objectStore(DB_STORE_ID);

  tx.onerror = (event) => {
    console.error('>>> tx error:', event);
  };

  tx.oncomplete = successCallback

  return txStore;
}
