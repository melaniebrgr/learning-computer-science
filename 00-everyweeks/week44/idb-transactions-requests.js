import { v4 as uuid } from 'https://jspm.dev/uuid';

const DB_ID = 'NotesDB';
const DB_STORE_ID = 'notesStore';
const version = 1;

let db;
let objectStore;

(function initApp() {
  initDB();
  document.getElementById('form').addEventListener('submit', handleSubmit);
})();

function initDB() {
  const NotesIDBOpenRequest = indexedDB.open(DB_ID, version);

  NotesIDBOpenRequest.addEventListener('error', (error) => {
    console.error(error);
  });

  NotesIDBOpenRequest.addEventListener('success', (event) => {
    db = event.target.result;
    renderFileList();
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

  NotesIDBOpenRequest.addEventListener('blocked', noop);
};

function handleSubmit (event) {
  event.preventDefault();
  const formData = Object.fromEntries((new FormData(this)).entries());

  const tx = createTxForStore(DB_STORE_ID, 'readwrite', () => {
    clearForm();
  });

  const request = tx.add({
    id: uuid(),
    ...formData,
  });

  request.onsuccess = noop;

  request.onerror = noop;
}

function noop () {};

function createTxForStore(storeId, mode, successCallback) {
  const tx = db.transaction(storeId, mode);

  tx.onerror = noop

  if (successCallback) tx.oncomplete = successCallback;

  return tx.objectStore(DB_STORE_ID);
}

function clearForm(event) {
  if (event) event.preventDefault();
  document.getElementById('form').reset();
}

function renderFileList() {
  const fileList = document.getElementById('file-list');
  fileList.innerHTML = '<li>Loading...</li>';

  const tx = createTxForStore(DB_STORE_ID, 'readonly');

  const request = tx.getAll();

  request.onsuccess = (event) => {
    fileList.innerHTML = '';
    event.target.result.forEach((file) => {
      const li = document.createElement('li');
      li.setAttribute('id', file.id);
      li.textContent = file.title;
      li.addEventListener('click', () => {
        const tx = createTxForStore(DB_STORE_ID, 'readonly');
        const request = tx.get(file.id);
        request.onsuccess = () => {
          const p = document.getElementById('file-picked');
          p.textContent = JSON.stringify(file, null, 2);
        };
      });
      fileList.appendChild(li);
    });
  };

  request.onerror = noop;
}
