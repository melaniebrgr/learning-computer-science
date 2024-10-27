const version = 5;

function init() {
  let db;
  let objectStore;

  const NotesIDBOpenRequest = indexedDB.open('NotesDB', version);

  NotesIDBOpenRequest.addEventListener('error', (error) => {
    console.error(error);
  });

  NotesIDBOpenRequest.addEventListener('success', (event) => {
    db = event.target.result;
    console.log(">> success", db);
  });

  NotesIDBOpenRequest.addEventListener('upgradeneeded', (event) => {
    db = event.target.result;
    console.log(">> upgradeneeded", db);
    console.info(`DB updated from ${event.oldVersion} to ${event.newVersion}`)

    if (!db.objectStoreNames.contains('notesStore')) {
      objectStore = db.createObjectStore('notesStore', {
        keyPath: 'id',
      })
    }

    if (!db.objectStoreNames.contains('metadataStore')) {
      objectStore = db.createObjectStore('metadataStore', {
        keyPath: 'id',
      })
    }

    if (db.objectStoreNames.contains('summaryStore')) {
      objectStore = db.deleteObjectStore('summaryStore', {
        keyPath: 'id',
      })
    }
  });

  NotesIDBOpenRequest.addEventListener('blocked', (event) => {
    console.log(">> upgradeneeded");
  })
}

init();

